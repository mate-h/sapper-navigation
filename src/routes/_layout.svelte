<style lang="less" global>
  @import (reference) 'src/styles/global.less';
  @import 'src/styles/typography.less';
  @import 'framework7/framework7.less';
  @import 'framework7/components/dialog/dialog.less';
  @import 'framework7/components/card/card.less';
  @import 'framework7/components/smart-select/smart-select.less';
  @import 'framework7/components/radio/radio.less';
  @import 'src/styles/baseline.less';
  /* @import 'src/styles/google-sans-base64.less'; */
  .md {
    --f7-bars-border-color: var(--f7-card-outline-border-color);
  }
  .list .item-title {
    .body1();
  }
  :root {
    --f7-card-border-radius: 8px;
    --f7-page-navbar-offset: calc(
      var(--f7-navbar-height) + var(--f7-safe-area-top)
    );
  }

  #app {
    background-color: var(--f7-page-bg-color);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .debug {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10000;
    background-color: white;
    opacity: 0.76;
  }
</style>

<script>
  import Tabbar from '../components/tabbar.svelte';
  import DialogQueue from '../components/dialog-queue.svelte';
  import { init } from '../stores/page';
  init();
  export let segment;
</script>

<div class="view view-main safe-areas">
  <slot />
  <Tabbar {segment} />
  <!-- <code class="debug">
    {JSON.stringify($prev)}
    <br>
    {JSON.stringify($current)}
  </code> -->
</div>

<DialogQueue />
