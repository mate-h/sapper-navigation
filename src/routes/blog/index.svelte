<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  import { current, isBack } from '../../stores/page';
  import Nav from '../../components/nav.svelte';
  import Page from '../../components/page.svelte';

  export let posts;

  let activeStates = {};
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<svelte:window on:mouseup="{() => (activeStates = {})}" />

<Page>
  <div slot="navbar">
    <Nav title="Recent posts" key="blog-page" />
  </div>
  <div class="list">
    <ul>
      {#each posts as post}
        <!-- we're using the non-standard `rel=prefetch` attribute to
          tell Sapper to load the data for the page as soon as
          the user hovers over the link or taps it, instead of
          waiting for the 'click' event -->
        <li>
          <a
            class:active-state="{activeStates[post.slug]}"
            on:mousedown="{() => (activeStates[post.slug] = true)}"
            on:mouseleave="{() => (activeStates[post.slug] = false)}"
            class="item-link item-content external"
            rel="prefetch"
            href="blog/{post.slug}"
          >
            <span class="item-inner body2">{post.title}</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</Page>
