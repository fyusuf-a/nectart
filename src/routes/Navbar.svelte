<script>
  export let theme;
  const style = `background-color: ${theme.backgroundColor}; color: ${theme.color};`;
</script>

<nav {style} id="navbar">
    <a href="/">Our product</a>
    <a href="/plum-elixir">Plum elixir</a>
    <a href="/contact">Contact</a>
</nav>

<style lang="scss">
  a {
    width: 10em;
    text-align: center;
    @include impact;
    @include typographic-scale(0, 0);
  }

  nav {
    padding: #{$navbar-vertical-padding} 0px;
    @include sm {
      padding: #{$navbar-vertical-padding} 60px;
    }
    box-sizing: border-box;
    position: fixed;
    top: 0;
    width: 100vw;
    height: navbar-height();
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    z-index: 100;
    transition: top 1s;
  }
</style>
