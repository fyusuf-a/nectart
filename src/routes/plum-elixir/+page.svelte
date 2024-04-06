<script lang="ts">
  import Section1 from './CeruleanSky.svelte';
  import Section2 from './Smile.svelte';
  import Section3 from './Whisper.svelte';
  import { account, supported_chains, wagmiConfig } from '$lib/chain'
  import { watchAccount, getBalance } from '@wagmi/core';
  import type { GetBalanceReturnType } from '@wagmi/core';
  import { formatEther } from 'viem';

  let balance: string;
  

  watchAccount(wagmiConfig, {
    onChange: async(value) => {
      if (!value) {
        balance = '';
      }
      else {
        let truc: GetBalanceReturnType = await getBalance(wagmiConfig, {
          address: '0x798dA095f4026160DA8c04AC6d28270a6c548660' //'0x7F510cdc40e8c07dd8Fb8031F9c2670bBCDF95bC'
        });
        balance = formatEther(truc.value);
      }
    }
  });
</script>

<div style="color: #fff;background-color:red;z-index:10;margin-top:5cm">
  { balance }
</div>

<!-- <Section1 /> -->
<!-- <Section2 /> -->
<!-- <Section3 /> -->


<style>
	#title {
		font-weight: 500;
	}

	.wallet-icon {
		width: 40px;
		height: auto;
	}
</style>
