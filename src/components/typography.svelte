<style>
  span {
    height: auto;
  }

  .omitLineHeight {
    line-height: normal;
  }
</style>

<script>
  export let use = 'body2';
  export let omitLineHeight = false;
</script>

<span class="{use}" class:omitLineHeight>
  <slot />
</span>
