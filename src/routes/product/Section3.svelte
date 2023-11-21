<script lang="ts">
  import Subsection1 from './section3/Subsection1.svelte';
  import Subsection2 from './section3/Subsection2.svelte';
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';

  let container: HTMLDivElement;
  let centeringContainer: HTMLDivElement;

  onMount(() => {
    container = document.querySelector('#bottle-container')!;
    centeringContainer = document.querySelector('#bottle-centering-container')!;

    const gsapContext = gsap.context(() => {
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
        onEnter: () => bouncingTimeline.play(),
        onLeave: () => bouncingTimeline.pause(),
        onEnterBack: () => bouncingTimeline.play(),
        onLeaveBack: () => bouncingTimeline.pause(),
        invalidateOnRefresh: true,
      });
    });
 
    return () => {
      gsapContext.revert();
    };
  });
</script>

<div id="section3">
  <Subsection1 />
  <Subsection2 />
</div>
