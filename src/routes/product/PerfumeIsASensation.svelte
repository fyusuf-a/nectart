<script lang="ts">
  import Subsection1 from './perfume-is-a-sensation/Subsection1.svelte';
  import Subsection2 from './perfume-is-a-sensation/Subsection2.svelte';
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';

  onMount(() => {
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
        trigger: '#perfume-is-a-sensation',
        onEnter: () => bouncingTimeline.play(),
        onLeave: () => bouncingTimeline.pause(),
        onEnterBack: () => bouncingTimeline.play(),
        onLeaveBack: () => bouncingTimeline.pause(),
        invalidateOnRefresh: true
      });
    });

    return () => {
      gsapContext.revert();
    };
  });
</script>

<div id="perfume-is-a-sensation">
  <Subsection1 />
  <Subsection2 />
</div>
