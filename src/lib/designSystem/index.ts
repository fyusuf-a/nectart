const sizeClasses = [
  "text-scale-0-0",
  "text-scale-0-1",
  "text-scale-0-2",
  "text-scale-1-0",
  "text-scale-1-1",
  "text-scale-1-2",
  "text-scale-2-0",
  "text-scale-2-1",
  "text-scale-2-2",
];

export const sizes = sizeClasses.map((sizeClass) => ({
  sizeClass,
  octave: sizeClass.split("-")[2],
  note: sizeClass.split("-")[3],
}));

const fonts = [
  "font-display",
  "font-sans",
];

