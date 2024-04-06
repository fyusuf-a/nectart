import type { Chain } from 'viem'
import { http, createConfig } from '@wagmi/core'
import { reconnect } from '@wagmi/core'
import { createWeb3Modal } from '@web3modal/wagmi';

const projectId = import.meta.env.VITE_PROJECT_ID;

const metadata = {
  name: 'Nectart',
  description: 'Nectart creates olfactive masterpieces',
  url: 'https://nectart.io/nectart.png',
  icons: ['https://nect.art/logo.png'],
};
 
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
    nftToken: {
      address: import.meta.env.VITE_NFT_TOKEN_ADDRESS
    },
    auctionAddress: {
      address: import.meta.env.VITE_AUCTION_ADDRESS
    }
  },
} as const satisfies Chain

export const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  }
});
reconnect(wagmiConfig);

export const modal = createWeb3Modal({
  wagmiConfig,
  projectId,
  metadata,
  enableOnramp: true,
  themeVariables: {
    '--w3m-font-family': 'Avantt',
    '--w3m-border-radius-master': '0px'
  }
});
