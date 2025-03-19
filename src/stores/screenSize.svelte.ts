import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/../tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);
export const breakpoints: { key: number, value: string }[] = [];
for (const [key, value] of Object.entries(fullConfig.theme.screens)) {
  breakpoints.push({ key: parseInt(value.replace('px', '')), value: key });
}
breakpoints.sort((a, b) => a.key - b.key);

const findBreakpoint = (width: number) => {
  let breakpoint: string | null = null
  for (const breakpoint_ of breakpoints) {
    if (width > breakpoint_.key) {
      breakpoint = breakpoint_.value;
    } else {
      return breakpoint;
    }
  }
  return breakpoint;
}

export const createScreenWidthStore = () => {
  const width = $state({ value: 1 });
  const breakpoint = $state({ value: null });

  const updateWidth = () => {
    width.value = window.innerWidth;
  }

  $effect(() => {
    console.log('effect');
    width.value = window.innerWidth;
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    }
  });

  $effect(() => {
    const breakpoint_ = findBreakpoint(width.value);
    breakpoint.value = breakpoint_;
  });

  return {
    width,
    breakpoint,
  };
}
