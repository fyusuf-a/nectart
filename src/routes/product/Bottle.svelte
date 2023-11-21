<div id="bottle-container">
  <div id="bottle-centering-container">
    <div id="bottle-blur"/>
    <img id="bottle-shadow" src="photos/bottle.png" alt="A bottle of water" />
    <img id="bottle" src="photos/bottle.png" alt="A bottle of water" />
  </div>
</div>

<style lang="scss">
  @use "sass:math";
  @import "./style.scss";

  $image-ratio: math.div(477, 727);

  :root {
    --blur: 0px;
  }

  #bottle-container {
    position: fixed;
    width: circle-size-with-navbar(0.5);
    left: 50vw;
    top: 0;
    bottom: 0;
    transform: translate(-50%, 0);
    z-index: 1;
  }

  #bottle-centering-container {
    position: absolute;
    width: 100%;
    bottom: calc(rest-height(0.5));
    height: calc(image-ratio * rest-height(0.5));
    transform: translate(0, 50%);
  }

  #bottle, #bottle-shadow {
    width: 100%;
    height: auto;
    z-index: 200;
  }

  #bottle-shadow {
    visibility: hidden;
  }

  #bottle {
    position: absolute;
    left: 0;
  }

  #bottle-blur {
    position: absolute;
    left: 0;
    top: 0;
    margin-top: 29%;
    margin-left: 2%;
    margin-right: 2%;
    width: 96%;
    height: 79%;
    backdrop-filter: blur(var(--blur));
    z-index: 1;
  }
</style>
