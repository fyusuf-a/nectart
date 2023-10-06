<script>
  export let backgroundColor = "black";
  export let color = "white";

  const style = `background-color: ${backgroundColor}; color: ${color};`;
</script>

<nav style="{ style }">
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</nav>

<style lang="scss">
  a {
    @include impact;
  }
</style>
