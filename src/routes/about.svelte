<script>
  import { f7 as Navbar } from '../components/navbar';
  import Page from '../components/page.svelte';
</script>

<svelte:head>
  <title>About</title>
</svelte:head>
<Page>
  <div slot="navbar">
    <Navbar title="About" />
  </div>
  <div class="block">
    <h4 class="headline4">About this site</h4>
    <p use="subtitle1">This is the 'about' page. There's not much here.</p>
  </div>
</Page>
