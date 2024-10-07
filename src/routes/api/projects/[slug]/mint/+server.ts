import { prisma } from '@/lib/api/prisma';
import { umi } from '@/lib/blockchain/backendUmi';
import { error, RequestHandler } from '@sveltejs/kit';
import { base58 } from '@metaplex-foundation/umi/serializers';
import { divideAmount, isPositiveAmount, sol, SolAmount, subtractAmounts } from '@metaplex-foundation/umi';
import { BigIntError, convertBigIntToNumberOrThrow } from '@/lib/blockchain/utils';

class TransactionAlreadyUsedError extends Error {
  constructor() {
    super('Transaction already used');
  }
}

export const POST: RequestHandler = async({ request, params }) => {
  const slug = params.slug as string;
  const project = await prisma.project.findUnique({
    where: {
      id: slug,
    },
  });
  if (!project) {
    throw error(404, 'Not found');
  }
  const { transactionSignature } = await request.json();
  const transaction = await umi.rpc.getTransaction(base58.serialize(transactionSignature));
  if (!transaction) {
    throw error(400, 'Transaction not found');
  }
  const accounts = transaction.message.accounts;
  if (accounts.length < 2) {
    throw error(400, 'Invalid transaction');
  }
  const destinationAccount = accounts[1];
  if (destinationAccount !== umi.identity.publicKey) {
    throw error(400, 'Invalid transaction');
  }
  const sourceAccount = accounts[0];
  const preBalance = transaction?.meta?.preBalances[1];
  const postBalance: SolAmount = transaction?.meta?.postBalances[1];
  const difference = subtractAmounts(postBalance, preBalance);
  if (!isPositiveAmount(difference)) {
    throw error(400, 'Invalid transaction');
  }
  const budget = sol(project.budgetInSol);
  const tokenPrice = divideAmount(budget, project.tokenNumber);
  const wantedAmount = divideAmount(difference, tokenPrice.basisPoints);
  let numberWantedAmount: number = 0;
  try {
    numberWantedAmount = convertBigIntToNumberOrThrow(wantedAmount.basisPoints);
  } catch (error_) {
    if (error_ instanceof BigIntError) {
      throw error(400, 'Invalid amount');
    }
    throw error(500, 'Could not determine amount');
  }
  const remainingTokens = project.tokenNumber - project.boughtTokens;
  const allowedAmount = Math.min(numberWantedAmount, remainingTokens);

  let response = null;
  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.upsert({
        where: {
          address: sourceAccount,
        },
        update: {},
        create: {
          address: sourceAccount,
        },
      });
      const existingTransaction = await tx.transferTransaction.findFirst({
        where: {
          signature: transactionSignature,
        },
      });
      if (existingTransaction) {
        throw new TransactionAlreadyUsedError();
      }
      await tx.transferTransaction.create({
        data: {
          signature: transactionSignature,
          userId: user.id,
        },
      });
      response = await tx.projectBacker.upsert({
        where: {
          projectId_userId: {
            projectId: slug,
            userId: user.id,
          },
        },
        update: {
          amount: {
            increment: allowedAmount,
          },
        },
        create: {
          amount: allowedAmount,
          projectId: slug,
          userId: user.id,
        },
      });
      await tx.project.update({
        data: {
          boughtTokens: {
            increment: allowedAmount,
          },
        },
        where: {
          id: slug,
        },
      });
    });
  } catch (e) {
    if (e instanceof TransactionAlreadyUsedError) {
      throw error(400, 'Invalid transaction');
    }
    throw error(500, 'Could not update project');
  }
  return new Response(JSON.stringify(response), { status: 200 });
}
