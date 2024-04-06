import type { Chain } from 'viem'
import { http, createConfig } from '@wagmi/core'
import { reconnect } from '@wagmi/core'
import { createWeb3Modal } from '@web3modal/wagmi';
 
export const mainnet: Chain = {
  id: 1440002,
  name: 'XRPL',
  nativeCurrency: { name: 'XRP', symbol: 'XRP', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc-evm-sidechain.xrpl.org'] },
  },
  blockExplorers: {
    default: { name: 'EVM Sidechain Explorer', url: 'https://evm-sidechain.xrpl.org' },
  },
  contracts: {
  },
} as const satisfies Chain

const projectId = '0717fb8ed954b593fc73965a35a386e4';

const metadata = {
  name: 'Nectart',
  description: 'Nectart creates olfactive masterpieces',
  url: 'https://nectart.io/nectart.png',
  icons: ['https://nect.art/logo.png'],
};


export const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  }
});
reconnect(config);

export const modal = createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableOnramp: true,
  themeVariables: {
    '--w3m-font-family': 'Avantt',
    '--w3m-border-radius-master': '0px'
  }
});
