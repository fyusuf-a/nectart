<script>
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { onMount } from 'svelte';

  const tryToPlay = () => {
    document.getElementById('pine-video').volume = 0.3;
    document.getElementById('pine-video').muted = false;
    document.getElementById('pine-video').play()
      .then(() => {
        console.log('started');
        // Autoplay started!
      })
      .catch((error) => {
        console.log(error);
        console.log('prevented');
        // Autoplay was prevented.
        // Show a "Play" button so that user can start playback.
      });
  }

  const mute = () => {
    document.getElementById('pine-video').muted = true;
  }


  onMount(() => {
    ScrollTrigger.create({
      trigger: '#section2',
      start: 'top center',
      end: 'bottom center',
      onEnter: tryToPlay,
      onLeave: mute,
      onEnterBack: tryToPlay,
      onLeaveBack: mute,
    });
  });
</script>

<div id="section2">
  <div class="current">
    <video id="pine-video" autoplay muted loop>
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
