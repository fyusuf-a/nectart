import { prisma } from '@/lib/api/prisma';
import { umi } from '@/lib/blockchain/backendUmi';
import { error, RequestHandler } from '@sveltejs/kit';
import { base58 } from '@metaplex-foundation/umi/serializers';
import { amountToString, divideAmount, isPositiveAmount, sol, SolAmount, subtractAmounts } from '@metaplex-foundation/umi';
import { BigIntError, convertBigIntToNumberOrThrow } from '@/lib/blockchain/utils';

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
  const { tokenNumber, transactionSignature } = await request.json();
  const transaction = await umi.rpc.getTransaction(base58.serialize(transactionSignature));
  if (!transaction) {
    throw error(400, 'Transaction not found');
  }
  const accounts = transaction.message.accounts;
  if (accounts.length < 2) {
    throw error(400, 'Invalid transaction');
  }
  const destinationAccount = accounts[1];
  const preBalance = transaction?.meta?.preBalances[1];
  const postBalance: SolAmount = transaction?.meta?.postBalances[1];
  const difference = subtractAmounts(postBalance, preBalance);
  if (!isPositiveAmount(difference)) {
    throw error(400, 'Invalid transaction');
  }
  console.log('difference', amountToString(difference));
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

  const response = await prisma.project.update({
    data: {
      boughtTokens: {
        increment: allowedAmount,
      },
    },
    where: {
      id: slug,
    },
  });
  return new Response(JSON.stringify(response), { status: 200 });
}
