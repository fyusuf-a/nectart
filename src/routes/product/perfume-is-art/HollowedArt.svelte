<svg
  version="1.1"
  width="100%"
  xmlns="http://www.w3.org/2000/svg"
>
  <text
    x="50%"
    y="0%"
    text-anchor="middle"
  >
    Art
  </text>
  <defs>
  <linearGradient id="paint0_linear_377_166" x1="0%" y1="90%" x2="0%" y2="-20%">
  <stop/>
  <stop offset="100%" stop-color="white"/>
  </linearGradient>
  </defs> 
</svg>
  
<style lang="scss">
$text-height: $impact-line-height * scale(4,1);

svg {
  height: $text-height;
}

svg text {
  @include impact;
  @include typographic-scale(4, 1);
  transform: translate(0, $text-height);
  stroke-width: 1px;
  stroke: url(#paint0_linear_377_166);
}

</style>
