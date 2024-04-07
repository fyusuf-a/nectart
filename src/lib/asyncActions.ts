import { wagmiConfig } from '$lib/chain';
import { readContract, writeContract } from '@wagmi/core';
import type { ReadContractParameters } from '@wagmi/core';
import auctionAbi from '../deployments/chain-1440002/artifacts/AuctionContract.json';
import { formatEther } from 'viem';

export async function bid(bid: number) {
  writeContract(wagmiConfig, {
              abi: auctionAbi.abi as any,
              address: '0x0BB9569dDD9650Baf976b308165F13734596b92B',
              functionName: 'bid',
              args: [0, BigInt(bid) * 1_000_000_000_000_000_000n]
            });
}

const params: ReadContractParameters = {
  abi: auctionAbi.abi as any,
  address: '0x0BB9569dDD9650Baf976b308165F13734596b92B',
  functionName: 'auctions',
  args: [0]
};

export async function readHighestBid() {
  console.log('readHighestBid');
  let result = await readContract(wagmiConfig, params);
  return formatEther((result as any[])[4]);
}
