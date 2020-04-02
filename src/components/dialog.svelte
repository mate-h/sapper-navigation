<style lang="less">
  @import (reference) 'src/styles/typography.less';
  .dialog-title {
    .headline6();
  }
  :global(.aurora) .dialog-title {
    .subtitle1();
    font-weight: 700;
  }
  :global(.ios) .dialog-title {
    text-transform: capitalize;
  }
  .dialog-text {
    .body2();
  }
  .dialog-button {
    .button();
    line-height: var(--f7-dialog-button-height);
  }

  .dialog {
    transition-duration: 4000ms;
  }
</style>

<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { active } from '../lib/actions/active';

  let mounted = false;
  onMount(() => {
    mounted = true;
  });
  function shrink(node, { duration, stage }) {
    const style = getComputedStyle(node);
    const isTheme = theme =>
      [...document.documentElement.classList].includes(theme);
    const pickTheme = (o, d) => {
      return (
        Object.entries(o)
          .map(([k, v]) => {
            if (isTheme(k)) return v;
            else return false;
          })
          .filter(a => a)[0] || d
      );
    };
    const transform = style.transform === 'none' ? '' : style.transform;
    return {
      duration,
      easing: quintOut,
      css: t => {
        const lerp = (a, b) => a + (b - a) * t;
        const outT = pickTheme({ ios: 1, md: 1 }, lerp(0.815, 1));
        const inT = pickTheme({ md: lerp(0.815, 1) }, lerp(1.185, 1));
        const scale = stage === 'in' ? inT : outT;
        return `
          transform: ${transform} scale(${scale});
          opacity: ${t}
        `;
      },
    };
  }
  export let onClose = () => {};
</script>

<!-- ESC or ENTER on keyboard also dispatches onClose -->
<svelte:window on:keydown="{e => [27, 13].includes(e.keyCode) && onClose()}" />

<div
  in:shrink="{{ duration: 500, stage: 'in' }}"
  out:shrink="{{ duration: 500, stage: 'out' }}"
  class="dialog dialog-buttons-1 modal-in"
  style="display: block;"
>
  <div class="dialog-inner">
    <div class="dialog-title">Current location not available</div>
    <div class="dialog-text">
      Your current location cannot be determined at this time.
    </div>
  </div>
  <div class="dialog-buttons">
    <span use:active class="dialog-button dialog-button-bold button" on:click="{onClose}">
      OK
    </span>
  </div>
</div>
