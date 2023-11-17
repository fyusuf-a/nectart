<div class="section-title">
  <div class="dance">
    A sultry dance&mdash;of aromas
  </div>
  <div class="whisper">
    A sweet whisper
  </div>
</div>

<style lang="scss">
  #whisper {
    width: 100vw;
    height: 100vh;
  }

  .dance {
    @include typographic-scale(2,1);
    @include accent;
    text-align: center;
  }

  .whisper {
    @include typographic-scale(3,1);
    @include impact;
    text-align: center;
  }

  .section-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
    gap: 5vh;
  }
    
</style>
