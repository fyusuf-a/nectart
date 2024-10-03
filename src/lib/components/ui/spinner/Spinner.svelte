<div
  class="spinner border-gray-900 border-scale--1-0 border-solid"
/>

<style>
.spinner {
   width: 56px;
   height: 56px;
   animation: spinner 6s infinite;
}

@keyframes spinner {
   0% {
      transform: rotate(0deg);
   }

   10%, 17% {
      transform: rotate(-90deg);
   }

   25%, 32% {
      transform: rotate(-180deg);
   }

   40%, 47% {
      transform: rotate(-270deg);
   }

   55%, 62% {
      transform: rotate(-360deg);
   }

   100% {
      transform: rotate(0deg);
   }
}
</style>
