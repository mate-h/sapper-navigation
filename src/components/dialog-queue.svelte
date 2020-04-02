<script context="module">
  export const dialogs = writable([]);
  export const openDialog = ({ id, component, props }) => {
    const currentDialog = {
      id,
      component,
      props: {
        ...props,
        onClose: () => {
          dialogs.update(d => d.filter(o => o.id !== id));
          if (props && typeof props.onClose === 'function') props.onClose();
        },
      },
    };
    dialogs.update(d => [...d, currentDialog]);
  };
</script>

<script>
  import Dialog from './dialog.svelte';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
</script>

{#if $dialogs[0]}
  <div
    in:fade="{{ duration: 150 }}"
    out:fade="{{ duration: 75 }}"
    class="dialog-backdrop backdrop-in"
  ></div>
  <svelte:component this="{$dialogs[0].component}" {...$dialogs[0].props} />
{/if}
