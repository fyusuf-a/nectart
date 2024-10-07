import { setComputeUnitPrice } from '@metaplex-foundation/mpl-toolbox';
import { TransactionBuilder, type Umi } from '@metaplex-foundation/umi';

export class BigIntError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BigIntError";
  }
}

export const sendAndConfirmTransaction = async (umi: Umi, tx: TransactionBuilder) => {
  const blockhash = await umi.rpc.getLatestBlockhash({
    commitment: "confirmed",
  });

  const transactions = tx
    .add(setComputeUnitPrice(umi, { microLamports: BigInt(100_000) }))
    .setBlockhash(blockhash);

  const signedTx = await transactions.buildAndSign(umi);

  let signature;
  try {
    signature = await umi.rpc
      .sendTransaction(signedTx, {
        preflightCommitment: "confirmed",
        commitment: "confirmed",
        skipPreflight: false,
      });
  } catch (error) {
    throw new Error(`Transaction failed ${error}`);
  }

  const confirmation = await umi.rpc.confirmTransaction(signature, {
    strategy: { type: "blockhash", ...blockhash },
    commitment: "finalized",
  });
  return {
    signature: signature,
    confirmation,
  };
};

export const convertBigIntToNumberOrThrow = (bigInt: bigint) => {
  if (bigInt > Number.MAX_SAFE_INTEGER) {
    throw new BigIntError("BigInt is too large to convert to number");
  }
  if (bigInt < Number.MIN_SAFE_INTEGER) {
    throw new BigIntError("BigInt is too small to convert to number");
  }
  return Number(bigInt);
}
