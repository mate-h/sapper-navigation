<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === 'development';
  if (dev) console.error(error);
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<h2 class="headline2">{status}</h2>
<p class="body2">{error.message}</p>
{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
