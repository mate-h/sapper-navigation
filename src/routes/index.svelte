<style>
  .row {
    display: flex;
  }
  :global(.row > :first-child) {
    margin-right: var(--f7-card-footer-padding-horizontal);
  }
  :global(.narrow) {
    width: auto;
  }
</style>

<script>
  import { onMount } from 'svelte';
  import { openDialog } from '../components/dialog-queue.svelte';
  import { f7 as Navbar } from '../components/navbar';
  import Page from '../components/page.svelte';
  const themes = [
    {
      id: 'ios',
      name: 'iOS',
    },
    {
      id: 'md',
      name: 'Material',
    },
    {
      id: 'aurora',
      name: 'Aurora',
    },
  ];
  let selectedTheme = 'ios';
  // effectful code; runs when selectedTheme changes
  $: {
    try {
      const cl = document.documentElement.classList;
      ['md', 'ios', 'aurora'].forEach(s => cl.remove(s));
      cl.add(selectedTheme);
      if (selectedTheme === 'ios') cl.add('ios-translucent-bars', 'ios-translucent-modals');
      else cl.remove('ios-translucent-bars', 'ios-translucent-modals');
    } catch (e) {}
  }

  import { f7 as Button} from '../components/button';
  import Dialog from '../components/dialog.svelte';

  const handleClick = () => {
    openDialog({
      id: 'alert-1',
      component: Dialog,
      props: {
        onClose: () => {
          console.log('Dialog callback');
        },
      },
    });
  };
  const refreshTheme = () => {
    setTimeout(() => location.reload(true), 10);
  };
</script>

<svelte:head>
  <title>Navigation</title>
</svelte:head>

<Page>
  <div slot="navbar">
    <Navbar title="Main screen" />
  </div>
  <div class="card card-outline">
    <div class="card-header">
      <span class="headline6">
        Themes: {(themes.find(t => t.id === selectedTheme) || {}).name}
      </span>
    </div>
    <div class="list card-content">
      <ul>
        {#each themes as theme}
          <li>
            <label class="item-radio item-content">
              <input
                type="radio"
                bind:group="{selectedTheme}"
                value="{theme.id}"
              />
              <i class="icon icon-radio"></i>
              <div class="item-inner">
                <div class="item-title">{theme.name}</div>
              </div>
            </label>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <div class="card card-outline">
    <div class="card-header">
      <span class="headline6">Dialog demos</span>
    </div>
    <div class="card-content card-content-padding body2">
      Card with header and footer. Card headers are used to display card titles
      and footers for additional information or just for custom actions.
    </div>
    <div class="card-footer row">
      <Button class="narrow" fill on:click="{handleClick}">Svelte dialog</Button>
    </div>
  </div>
</Page>
