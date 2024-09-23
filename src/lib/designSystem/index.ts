export let sizeClasses = [
  "text-scale-0-0",
  "text-scale-0-1",
  "text-scale-0-2",
  "text-scale-0-3",
  "text-scale-1-0",
  "text-scale-1-1",
  "text-scale-1-2",
  "text-scale-1-3",
];

export let sizes = sizeClasses.map((sizeClass) => ({
  sizeClass,
  octave: sizeClass.split("-")[2],
  note: sizeClass.split("-")[3],
}));
