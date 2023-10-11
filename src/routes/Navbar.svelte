<script>
  export let theme;
  const style = `background-color: ${theme.backgroundColor}; color: ${theme.color};`;
</script>

<nav {style}>
    <a href="/">Our product</a>
    <a href="/plum-elixir">Plum elixir</a>
    <a href="/contact">Contact</a>
</nav>

<style lang="scss">
  a {
    @include impact;
    @include typographic-scale(0, 0);
  }

  nav {
    padding: 40px 60px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    z-index: 100;
  }
</style>
