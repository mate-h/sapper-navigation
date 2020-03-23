<style lang="less">
  @import (reference) 'src/styles/typography.less';
  .tab-link-active {
    font-weight: 700 !important;
  }

  .tabbar .tab-link {
    .button2();
    text-transform: none;
  }
  :global(.aurora) .tabbar .tab-link:not(.tab-link-active) {
    background-color: transparent;
  }
</style>

<script>
  import Icon from './icon.svelte';

  export let segment;
</script>

<div class="toolbar tabbar toolbar-bottom no-shadow">
  <div class="toolbar-inner">
    <a
      class="tab-link external"
      class:tab-link-active="{segment === undefined}"
      href="."
    >
      Home
    </a>
    <a
      class="tab-link external"
      class:tab-link-active="{segment === 'about'}"
      href="about"
    >
      About
    </a>
    <a
      class="tab-link external"
      rel="prefetch"
      class:tab-link-active="{segment === 'blog'}"
      href="blog"
    >
      Blog
    </a>
  </div>
</div>
