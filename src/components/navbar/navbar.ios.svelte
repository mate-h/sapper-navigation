<script>
  import BackIcon from './back-icon.svelte';
  import { ios as Button } from '../button';
  import { onMount } from 'svelte';
  let log;
  onMount(() => {
    handler();
  })
  function handler(evt) {
    try {
      setTimeout(() => {
        log = getComputedStyle(document.documentElement).getPropertyValue('--navbar-height');
      }, 100);
    }
    catch (e) {}
  }
  
  /*
    Values
    iOS Default        44
    iOS iPad           50   Since iOS 12
    iOS Landscape      32
    iOS ModalView      56
    Android Default    48
    Android sw600dp    56   For 7” tablets (600dp wide and bigger)
    Android Landscape  44

    414 x 896  biggest iPhone viewport
    768 x 1024 smallest iPad viewport
  */
  
</script>

<style>
  /* iOS */
  @supports (-webkit-overflow-scrolling: touch) {
    .navbar {
      background-color: rgba(247, 247, 248, 0.8);
      -webkit-backdrop-filter: saturate(1.8) blur(20px);
    }
    /* iPhone */
    @media only screen and (orientation: portrait) {
      :global(:root) {
        --navbar-height: 44px;
      }
    }
    @media only screen and (orientation: landscape) {
      :global(:root) {
        --navbar-height: 32px;
      }
    }
    /* iPad */
    @media only screen 
    and (min-width: 600px) 
    and (orientation: portrait) {
      :global(:root) {
        --navbar-height: 50px;
      }
    }
    @media only screen 
    and (min-width: 1000px) 
    and (orientation: landscape) {
      :global(:root) {
        --navbar-height: 50px;
      }
    }
  }
  @supports not (-webkit-overflow-scrolling: touch) {
    .navbar {
      background-color: #fafafa;
    }
    /* General phone - Android specs */
    @media only screen and (orientation: portrait) {
      :global(:root) {
        --navbar-height: 44px;
        /* --navbar-height: 48px; */
      }
    }
    @media only screen and (orientation: landscape) {
      :global(:root) {
        --navbar-height: 44px;
      }
    }
    /* General tablet - Android specs */
    @media only screen and (min-width: 600px) {
      :global(:root) {
        --navbar-height: 56px;
      }
    }
  }
  
  .navbar {
    display: flex;
    align-items: center;
    position: fixed;
    height: var(--navbar-height);
    top: 0;
		left: 0;
		right: 0;
		z-index: 1;
    color: var(--system-blue);
  }
  .content {
    display: flex;
    width: 100%;
    transform: translateY(-1px);
  }
  .body {
    font-weight: 400;
		font-size: 1.0625rem;
		letter-spacing: 0.024em;
		line-height: 1.375rem;
  }
  .back {
    margin-left: 26px;
  }
  :global(.end) {
    margin: 0 16px 0 auto;
  }
  .title {
    color: black;
    font-weight: 600;
		font-size: 1.0625rem;
		letter-spacing: 0.024em;
    line-height: 1.375rem;
  }
  @supports (-webkit-overflow-scrolling: touch) {
    .back, .end, .title {
      letter-spacing: 0em;
    }
  }
  .title-container {
    display: flex;
    justify-content: center;
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
  }
  .icon-container {
    position: absolute;
    left: 9px;
  }
  :global(.inherit) {
    color: inherit;
  }
</style>

<svelte:window on:orientationchange={handler}/>

<nav class='navbar divider-bottom'>
  <div class='content'>
    <div class='title-container'>
      <span class='title'>Recents</span>
    </div>
    <Button class='inherit'>
      <span class='icon-container'>
        <BackIcon />
      </span>
      <span class='back body'>Albums</span>
    </Button>
    <Button class='inherit end'>
      <span class='body'>Select</span>
    </Button>
  </div>
</nav>