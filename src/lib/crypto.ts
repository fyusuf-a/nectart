import type { Umi } from "@metaplex-foundation/umi";
import bs58 from 'bs58';

const encoder = new TextEncoder();

export const signMessage = async(umi: Umi, message: string) => {
  const encodedMessage = encoder.encode(message);
  const signedMessage = await umi.identity.signMessage(encodedMessage);
  return bs58.encode(signedMessage);
}
