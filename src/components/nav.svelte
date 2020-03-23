<style lang="less">
  @import (reference) 'src/styles/typography.less';
  @import (reference) 'framework7/less/mixins.less';

  :global(.md .navbar-bg) {
    .hairline(
      bottom,
      var(--f7-navbar-border-color, var(--f7-bars-border-color))
    );
  }

  .navbar {
    position: absolute;
    top: 0;
  }

  .navbar .left,
  .navbar .right {
    z-index: 11;
  }

  .title-text,
  .back-text {
    display: inline-block;
  }

  :global(.ios) .title {
    position: absolute;
    left: 0;
    right: 0;
  }
</style>

<script>
  import { length, crossfade } from '../styles/page-transition';
  import { isLateral } from '../stores/page';
  import { fade } from 'svelte/transition';
  let send, receive;
  $: {
    send = (n, p) => {
      if (isLateral()) return fade(n, { duration: length.short, ...p });
      return crossfade[0](n, p);
    };
    receive = (n, p) => {
      if (isLateral()) return fade(n, { duration: length.short, delay: length.short, ...p });
      return crossfade[1](n, p);
    };
  }
  export let title = '';
  export let backLink = false;
  export let key = 'root';
  export let backKey = 'root';
  let activeState = false;
</script>

<svelte:window on:mouseup="{() => (activeState = false)}" />

<div class="navbar no-shadow">
  <div class="navbar-bg" 
    in:fade={{ duration: length.halflong }}
    out:fade={{ duration: length.halflong, delay: length.halflong }}
  />
  <div class="navbar-inner">
    <div class="left">
      {#if backLink}
        <a
          href="{backLink}"
          class="link back external"
          class:active-state="{activeState}"
          on:mousedown="{() => (activeState = true)}"
        >
          <i
            class="icon icon-back"
            transition:fade="{{ duration: length.halflong }}"
          ></i>
          <span
            class="back-text if-not-md"
            in:receive="{{ key: backKey }}"
            out:send="{{ key: backKey }}"
          >
            Back
          </span>
        </a>
      {/if}
    </div>
    <div class="title">
      <span
        class="title-text headline6"
        in:receive="{{ key }}"
        out:send="{{ key }}"
      >
        {title}
      </span>
    </div>
    <div class="right"></div>
  </div>
</div>
