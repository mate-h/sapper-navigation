<script>
	export let segment;
	export let self = null;
	export let top = false;
	export let bottom = false;
	export let style = '';
  let className = '';
	export { className as class };
</script>

<style>
	nav {
		position: fixed;
		left: 0;
		right: 0;
		z-index: 1;
		background-color: #fafafa;
	}
	nav.top {
		top: 0;
	}
	nav.bottom {
		bottom: 0;
	}
</style>

<nav 
	{style}
	bind:this={self}
	class:top
	class:bottom
	class={`${className} divider-bottom`}
>
	<slot {segment}/>
</nav>
