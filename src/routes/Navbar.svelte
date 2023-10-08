<script>
  export let theme;
  const style = `background-color: ${theme.backgroundColor}; color: ${theme.color};`;
</script>

<nav {style}>
  <div class="link-container">
    <a href="/">Our product</a>
    <a href="/plum-elixir">Plum elixir</a>
  </div>
  <div class="link-container">
    <a href="/contact">Contact</a>
  </div>
</nav>

<style lang="scss">
  a {
    @include impact;
    font-size: 12px;
  }

  nav {
    padding: 40px 60px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .link-container {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    gap: 40px;
  }
</style>
