<style lang="less" global>
  @import (reference) 'src/styles/global.less';
  @import (reference) 'framework7/components/page/page.less';
  .page-shadow {
    z-index: 2;
    &:after {
      .page-fake-shadow();
      animation: ios-page-element-fade-in 350ms forwards;
    }
  }
  .page-scrim {
    &:after {
      // Fake opacity
      .page-fake-opacity();
      animation: ios-page-element-fade-in 350ms forwards;
    }
  }
  .page-shadow-out {
    z-index: 2;
    &:after {
      .page-fake-shadow();
      animation: ios-page-element-fade-out 350ms forwards;
    }
  }
  .page-scrim-out {
    &:after {
      // Fake opacity
      .page-fake-opacity();
      animation: ios-page-element-fade-out 350ms forwards;
    }
  }
</style>

<script>
  import { lateral, length, stack } from '../lib/transitions';
  import { fly, fade } from 'svelte/transition';
  import { current, isBack, isLateral } from '../stores/page';

  let pageEnter, pageExit;
  let scrimIn, scrimOut, shadowIn, shadowOut;
  const reset = () => {
    scrimIn = false;
    scrimOut = false;
    shadowIn = false;
    shadowOut = false;
  };
  const introStart = () => {
    const b = isBack();
    if (!isLateral()) {
      if (isBack()) scrimOut = true;
      else shadowIn = true;
    }
  };
  const outroStart = () => {
    if (!isLateral()) {
      if (isBack()) shadowOut = true;
      else scrimIn = true;
    }
  };
  $: {
    pageEnter = (n, p) => {
      const back = isBack();
      const lateralRoute = isLateral();
      if (lateralRoute) {
        return fly(n, {
          duration: length.medium,
          delay: length.short,
          y: 8,
          ...p,
        });
      }
      return stack(n, {
        x: back ? -20 : 100,
        ...p,
      });
    };
    pageExit = (n, p) => {
      const back = isBack();
      const lateralRoute = isLateral();
      if (lateralRoute) {
        return fade(n, {
          duration: length.short,
          ...p,
        });
      }
      return stack(n, {
        x: back ? 100 : -20,
        ...p,
      });
    };
  }
</script>

<slot name="navbar" />
<main
  on:introstart="{introStart}"
  on:introend="{reset}"
  on:outrostart="{outroStart}"
  on:outroend="{reset}"
  class:page-shadow="{shadowIn}"
  class:page-scrim="{scrimIn}"
  class:page-shadow-out="{shadowOut}"
  class:page-scrim-out="{scrimOut}"
  in:pageEnter
  out:pageExit
  class="page"
>
  <div class="page-content">
    <slot />
  </div>
</main>
