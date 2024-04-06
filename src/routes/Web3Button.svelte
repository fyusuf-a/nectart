<script>
  import { onMount } from 'svelte';
  import { watchAccount, disconnect, getAccount } from '@wagmi/core'
  import { config, modal } from '$lib/chain'

  onMount(() => {
    function connect() {
      if (getAccount(config).isConnected) {
        disconnect(config)
      } else {
        modal.open()
      }
    }

    const btnEl = document.getElementById('btn')
    const userEl = document.getElementById('user')

    btnEl.addEventListener('click', connect)

    // listening for account changes
    watchAccount(config,
      {
        onChange(account) {
          userEl.innerText = account.address ?? ''
          if (account.isConnected) {
            btnEl.innerText = 'Disconnect'
          } else {
            btnEl.innerText = 'Connect'
          }
        }
      }
    )
  })
</script>

<div>
    <button id="btn">Connect</button>
    <span id="user"></span>
</div>
