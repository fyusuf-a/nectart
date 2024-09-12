<script lang="ts">
  import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
  import { mplTokenMetadata, fetchAllDigitalAssetWithTokenByOwner, type DigitalAssetWithToken } from '@metaplex-foundation/mpl-token-metadata'
  import { publicKey } from '@metaplex-foundation/umi'
  import { createQuery } from '@tanstack/svelte-query';

  const address = import.meta.env.VITE_PUBLIC_KEY;

  const umi = createUmi(`https://mainnet.helius-rpc.com/?api-key=${import.meta.env.VITE_HELIUS_API_KEY}`).use(mplTokenMetadata())

  const nftQuery = createQuery({
    queryKey: ['nfts', address],
    queryFn: async () => {
      return fetchAllDigitalAssetWithTokenByOwner(umi, publicKey(address))
    },
  });

  let nfts: DigitalAssetWithToken[] = [];
  nftQuery.subscribe((result) => {
    nfts = result.data || [];
  });


</script>

{#each nfts as nft}
  <div>
    <p>{nft.metadata.name}</p>
  </div>
{/each}