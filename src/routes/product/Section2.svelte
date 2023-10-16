<div id="section2">
  <div class="current">
    <video id="pine-video" autoplay loop>
    <source src="videos/victor-rogov.mp4" type="video/mp4" />
    </video>
  </div>
</div>

<style lang="scss">
  #section2 {
    background-color: var(--White);
    z-index: 3;
    height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .current {
    position: relative;
    width: circle-size(0.9);
    height: circle-size(0.9);
    border-radius: 50%;
    overflow: hidden;
    background-color: white;
  }

  .current video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
