<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let subsection: HTMLDivElement;

  const leftSlides = [
    {
      src: 'anuj-yadav-W1jNzyZFmIU-unsplash.jpg'
    },
    {
      src: 'wine.png'
    },
    {
      src: 'loes-klinker-T5VHI-Pj2NQ-unsplash.jpg' 
    },
    {
      src: 'pexels-studio-naae-17795179.jpg' 
    }]

  const rightSlides = [
    {
      src: 'vlad-kutepov-OBR9-lQE_H4-unsplash.jpg' 
    },
    {
      src: 'anthony-salerno-I1hzGTtKMgU-unsplash.jpg' 
    },
    {
      src: 'glasses.png' 
    },
    {
      src: 'monika-grabkowska--1PzCC5XAzo-unsplash.jpg' 
    }
  ]

  onMount(() => {
    // subsection.querySelectorAll('img').forEach((img) => {
    //   img.style.width = '60vw';
    //   img.style.height = '100vh';
    //   img.style.left = '20vw';
    // });


    const gsapContext = gsap.context(() => {

    });
    return () => {
      gsapContext.revert();
    };
  });
</script>

<div class="subsection2" bind:this={subsection}>
  <img class="central" src="photos/whisper/jake-thacker-I63YZy3S9Ns-unsplash.jpg" />
  <div class="external left">
    {#each leftSlides as slide, i}
    <img
      class={`img-container img-${i}`}
      src={`photos/whisper/${slide.src}`}
    />
    {/each}
  </div>
  <div class="external right">
    {#each rightSlides as slide, i}
    <img
      class={`img-container img-${i}`}
      src={`photos/whisper/${slide.src}`}
    />
    {/each}
  </div>
</div>

<style lang="scss">
  $lateral-height: calc(100vh / 17);

  img {
    object-fit: cover;
    object-position: 20% center;
  }

  .subsection2 {
    position: relative;
    height: 100vh;
  }

  .central {
    position: absolute;
    left: 20vw;
    width: 60vw;
    height: 100vh;
  }

  .external {
    position: absolute;
    width: 100vw;
    height: 100vh;
  }

  .external .img-container {
    position: absolute;
    height: #{$lateral-height * 3};
    width: 15vw;
    background-color: red;
  }

  .external.left .img-container {
    left: 0;
  }

  .external.right .img-container {
    right: 0;
  }

  @for $i from 0 to 4 {
    .external .img-#{$i} {
      top: calc(#{(1 + 4 * $i)} * $lateral-height);
    }
  }
</style>
