export { default as ios } from "./button.ios.svelte";
export { default as android } from "./button.android.svelte";
export { default as f7 } from "./button.f7.svelte";

// Shared platform code

/**
 * Values obtained through experimentation in iOS 13.
 */
export const numbers = {
  // Touch debounce timing
  TAP_DELAY: 100,
  // Time until scroll gets locked
  SCROLL_STOP: 500
};

/**
 * Returns the interaction event position relative to the target
 * @param {*} evt Mouse, pointer or touch event
 * @param {*} target The element to measure position against
 */
export function getTargetPosition(evt, target = null) {
  if (!target) target = evt.target;

  const pointerEvents = ["pointerdown", "pointermove", "pointerup"];
  const mouseEvents = ["mousedown", "mousemove", "mouseup"];
  const touchEvents = ["touchstart", "touchmove", "touchend"];
  if (pointerEvents.includes(evt.type) || mouseEvents.includes(evt.type)) {
    return {
      x: evt.offsetX,
      y: evt.offsetY
    };
  } else if (touchEvents.includes(evt.type)) {
    const viewportOffset = target.getBoundingClientRect();
    const documentX = window.pageXOffset + viewportOffset.left;
    const documentY = window.pageYOffset + viewportOffset.top;
    return {
      x: evt.changedTouches[0].pageX - documentX,
      y: evt.changedTouches[0].pageY - documentY
    };
  }
}

/**
 * Standard debounce function from lodash
 * @param {*} func
 * @param {*} wait
 * @param {*} immediate
 */
export function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this,
      args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/**
 * Avoid reacting to follow-on events fired by touch device after an already-processed user interaction.
 * Usage: wrap your handler function and voila.
 * @param {*} func The function to trigger if with the first received event type
 */
export function debounceType(func) {
  let previousEvent;
  return function(evt) {
    const context = this,
      args = arguments;

    const isSameInteraction =
      previousEvent && evt !== undefined && previousEvent.type !== evt.type;
    if (!isSameInteraction) {
      func.apply(context, args);
      previousEvent = evt;
    } else previousEvent = undefined;
  };
}

/**
 * Whether the event came from a touch device
 * @param {Event} evt
 */
export function isTouch(evt) {
  const pointerEvents = ["pointerdown", "pointermove", "pointerup"];
  const touchEvents = ["touchstart", "touchmove", "touchend"];
  return (
    touchEvents.includes(evt.type) ||
    (pointerEvents.includes(evt.type) && evt.pointerType === "touch")
  );
}
