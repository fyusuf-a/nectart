<script>
  import { disconnect, getAccount } from '@wagmi/core'
  import { wagmiConfig, modal } from '$lib/chain'

  
  let connected = 'Connect';
  function connect() {
    if (getAccount(wagmiConfig).isConnected) {
      disconnect(wagmiConfig)
      connected = 'Connect'
    } else {
      modal.open()
      const task = setInterval(() => {
        if (getAccount(wagmiConfig).isConnected)
        {
          connected = 'Disconnect'
          clearInterval(task);
        }
      }, 1000)
    }
  }
</script>

<div>
  <span
    class="button"
    id="btn"
    role="button"
    tabindex="0"
    on:keydown={(e) => {
      if (e.key === 'Enter') {
        connect()
      }
    }}
    on:click={async () => {
        connect()
    }}
  >
    { connected }
    <div class="underline" />
  </span>
</div>

<style lang="scss">
  @import 'src/styles/link.scss';
</style>
