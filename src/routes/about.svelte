<script>
  import Nav from '../components/nav.svelte';
  import Page from '../components/page.svelte';
</script>

<svelte:head>
  <title>About</title>
</svelte:head>
<Page>
  <div slot="navbar">
    <Nav title="About" />
  </div>
  <div class="block">
    <h4 class="headline4">About this site</h4>
    <p use="subtitle1">This is the 'about' page. There's not much here.</p>
  </div>
</Page>
