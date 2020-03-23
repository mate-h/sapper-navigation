<style>
  .row {
    display: flex;
  }
  :global(.row > :first-child) {
    margin-right: var(--f7-card-footer-padding-horizontal);
  }
</style>

<script>
  // import { app } from '../stores.js';
  import { onMount } from 'svelte';
  import { openDialog } from '../components/dialog-queue.svelte';
  import Nav from '../components/nav.svelte';
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
    } catch (e) {}
  }

  import Button from '../components/button.svelte';
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
  const handleClickF7 = () => {
    app.dialog.alert(
      'Your current location cannot be determined at this time.',
      'Current location not available',
      () => {
        console.log('Hello world callback');
      }
    );
  };
  const refreshTheme = () => {
    setTimeout(() => location.reload(true), 10);
  };
</script>

<svelte:head>
  <title>Test framework7</title>
</svelte:head>

<Page>
  <div slot="navbar">
    <Nav title="Test framework7" />
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
      <Button fill on:click="{handleClick}">Svelte dialog</Button>
      <Button fill on:click="{handleClickF7}">F7 dialog</Button>
    </div>
  </div>
</Page>
