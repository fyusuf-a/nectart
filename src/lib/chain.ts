import type { Chain } from 'viem'
import { http, createConfig } from '@wagmi/core'
import { reconnect } from '@wagmi/core'
import { createWeb3Modal } from '@web3modal/wagmi';
import { getAccount, watchAccount } from '@wagmi/core';
import { readable, writable } from 'svelte/store';

const CUSTOM_WALLET = 'wc:nectart_wallet';

const projectId = '0717fb8ed954b593fc73965a35a386e4';

let storedCustomWallet;
if (typeof window !== 'undefined') {
  storedCustomWallet = localStorage.getItem(CUSTOM_WALLET);
}

const customWallets = storedCustomWallet ? [JSON.parse(storedCustomWallet)] : undefined;

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
  },
} as const satisfies Chain

export const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  }
});
reconnect(wagmiConfig);

export const provider = readable<unknown | undefined>(
	undefined,
	(set) =>
		watchAccount(wagmiConfig, {
			onChange: async (account) => {
				if (!account.connector) return set(undefined)
				set(await account.connector?.getProvider())
			},
		}),
)

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

export const account = readable(getAccount(wagmiConfig), set => 
  watchAccount(wagmiConfig, { onChange: set }),
);

export const customWallet = writable({
  id: undefined,
  name: undefined,
  homepage: undefined,
  image_url: undefined,
  mobile_link: undefined,
  desktop_link: undefined,
  webapp_link: undefined,
  app_store: undefined,
  play_store: undefined
})

export const supported_chains = writable<string[]>([])
