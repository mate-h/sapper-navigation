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
  import { active } from './active';
  export let round = false;
  export let outline = false;
  export let raised = false;
  export let fill = false;
</script>

<button
  use:active
  style
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
