<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';

  onMount(() => {
    const centeringTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#section3',
        start: 'top center',
        end: 'center center',
        scrub: true,
        markers: true,
      }
    });

    centeringTimeline.to('#centering-container', {
      bottom: 'calc(50vh)',
      transform: 'translate(0, 50%)',
    });

    let randomAngle = gsap.utils.random(-5, 5, true);
    let randomTime = gsap.utils.random(3, 5, true);
    const bouncingTimeline = gsap.timeline({
      repeat: -1,
      repeatRefresh: true,
      paused: true
    });

    bouncingTimeline.to('#bottle-container', {
      rotate: randomAngle,
      duration: randomTime,
      ease: 'easeInOut'
    });

    ScrollTrigger.create({
      trigger: '#section3',
      scrub: true,
      onEnter: () => bouncingTimeline.play(),
      onLeave: () => bouncingTimeline.pause(),
      onEnterBack: () => bouncingTimeline.play(),
      onLeaveBack: () => bouncingTimeline.pause()
    });


    return () => {
      centeringTimeline.clear();
      bouncingTimeline.clear();
    };
  });
</script>


<div id="bottle-container">
  <div id="centering-container">
    <div id="bottle-blur"/>
    <img id="bottle-shadow" src="photos/bottle.png" alt="A bottle of water" />
    <img id="bottle" src="photos/bottle.png" alt="A bottle of water" />
  </div>
</div>

<style lang="scss">
  @import "./style.scss";

  #bottle-container {
    position: fixed;
    width: circle-size-with-navbar(0.5);
    left: 50%;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 1;
  }

  #centering-container {
    position: absolute;
    width: 100%;
    bottom: calc(rest-height(0.5));
    transform: translateY(50%);
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
    backdrop-filter: blur(5px);
    z-index: 1;
  }
</style>
