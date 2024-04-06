import { createPublicClient, http } from 'viem';
import { mainnet } from './chain';

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
});
