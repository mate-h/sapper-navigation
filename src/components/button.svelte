<style lang="less">
  /* @import (reference) 'framework7/components/button/button.less'; */
  @import (reference) 'src/styles/typography.less';

  button {
    .button2();
    line-height: normal;
    text-transform: none;
  }
</style>

<script>
  import Tappable from './tappable.svelte';
  export let round = false;
  export let outline = false;
  export let raised = false;
  export let fill = false;
  export let active = false;
</script>

<Tappable let:active={activeState}>
  <button
    style
    class:active-state="{activeState}"
    class:button-active="{active}"
    class:button-fill="{fill}"
    class:button-round="{round}"
    class:button-outline="{outline}"
    class:button-raised="{raised}"
    class="button"
    on:click
  >
    <slot />
  </button>
</Tappable>
