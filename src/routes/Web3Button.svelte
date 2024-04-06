<script>
  import { disconnect, getAccount } from '@wagmi/core'
  import { wagmiConfig, modal } from '$lib/chain'

  function connect() {
    if (getAccount(wagmiConfig).isConnected) {
      disconnect(wagmiConfig)
    } else {
      modal.open()
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
    on:click={() => {
      if (getAccount(wagmiConfig).isConnected) {
        disconnect(wagmiConfig)
      } else {
        modal.open()
      }
    }}
  >
    { getAccount(wagmiConfig).isConnected ? 'Disconnect' : 'Connect' }
    <div class="underline" />
  </span>
</div>

<style lang="scss">
  @import 'src/styles/link.scss';
</style>
