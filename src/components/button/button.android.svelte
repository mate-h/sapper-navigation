<script>
  import { getTargetPosition, debounceType, isTouch } from '.';
  import { createEventDispatcher } from 'svelte';
  import { Ripple, numbers } from '../ripple';
  import styleProps from '../../lib/actions/style-props';

  export let bounded = true;
  export let style = '';
  let className;
  export { className as class };
  
	// TODO: bug - double click and drag out, then release
  // export let rippleColor = 'black';
  
  const dispatch = createEventDispatcher();
  let ripples = [];
  let pressed = false;
  let hovered = false;
  let focused = false;

  $: styleVars = {
    overflow: bounded ? 'hidden' : 'visible',
    background: `rgba(0, 0, 0, ${hovered ? 0.04 : 0})`
  };

  function getOverlayAlpha() {
    if (pressed) return 0.12;
    // dragged or selected => 0.08
    return 0;
  }

  // slot is either: open, visible, or exit
  let rippleSlots = new Array(numbers.MAX_RIPPLES).fill('open');
  let previousActivationEvent;
  const handleDown = debounceType(evt => {
    if (rippleSlots.filter(s => s !== 'open').length >= numbers.MAX_RIPPLES) {
      // This should never happen unless the user is tapping like a maniac
      // or there is a bug that's preventing ripples from being removed.
      return;
    }
    // slot is available if its value is false
    const slotIndex = rippleSlots.findIndex(s => s === 'open');

    const startingPosition = getTargetPosition(evt);
    const activeRipple = {
      target: evt.target,
      startingX: startingPosition.x,
      startingY: startingPosition.y,
      introEnd: () => {
        // slot is NOT available until ripple finished exiting
        const shouldExit = !pressed || rippleSlots.includes('pending');
        if (shouldExit) {
          rippleSlots[slotIndex] = 'exit';
        }
        else rippleSlots[slotIndex] = 'pending';
      },
      outroEnd: () => {
        rippleSlots[slotIndex] = 'open';
      }
    };
    
    rippleSlots[slotIndex] = 'visible';
    ripples[slotIndex] = activeRipple;
    pressed = true;

    previousActivationEvent = evt;
  });

  const exitPending = () => {
    if (rippleSlots.includes('pending')) {
      rippleSlots = rippleSlots.map(slot => {
        if (slot === 'pending') return 'exit';
        return slot;
      });
    }
  }
  const handleUp = debounceType(evt => {
    exitPending();
    dispatch('click', evt);

    pressed = false;
    focused = false;
  });
  const handleEnter = evt => {
    if (!isTouch(evt)) {
      hovered = true;
    }
  };
  const handleLeave = evt => {
    if (!isTouch(evt)) {
      exitPending();
      hovered = false;
    }
  };
  const handleFocus = evt => {
    focused = true;
  };
  const handleBlur = evt => {
    focused = false;
  };
</script>

<style>
  button {
    overflow: var(--overflow);
    position: relative;
    transition: background-color 75ms;
    cursor: pointer;

    padding: 0;
    background: var(--background);
    border: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;

    touch-action: none;
    -webkit-touch-action: none;
  }
  button > :global(*) {
    pointer-events: none;
  }
</style>

<!-- 
 on:touchend={pressed && handleUp}
  on:mouseup={pressed && handleUp}

  on:mousedown={handleDown}
  on:touchstart={handleDown}
 -->

<svelte:window 
  on:pointerup={pressed && handleUp} 
  on:touchend={pressed && handleUp} 
  on:contextmenu={pressed && handleUp}
/>

<button 
  {style}
  class={className}
  use:styleProps={styleVars}
  on:pointerdown={handleDown}
  on:touchstart={handleDown}
  on:pointerenter={handleEnter}
  on:pointerleave={handleLeave}
  on:focus={handleFocus}
  on:blur={handleBlur}>
  <slot />
  {#each rippleSlots as slot, i}
    {#if slot === 'visible' || slot === 'pending'}
      <Ripple alpha={0.12 - (hovered ? 0.04 : 0)} {bounded} ripple={ripples[i]}/>
    {/if}
  {/each}
</button>