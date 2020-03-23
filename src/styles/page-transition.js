import { cubicOut } from "svelte/easing";
import { standard } from "../util/bezier";
import { headerOffset } from '../stores/page';
import { get } from 'svelte/store';

const m = 1;
const short = 75 * m;
const medium = 150 * m;
const halflong = 175 * m;
const long = 350 * m;
export const length = {short, medium, halflong, long};

export const lateral = (node, {fadeIn = false, y = 0, ...params}) => {
  const style = getComputedStyle(node);
  const transform = style.transform === 'none' ? '' : style.transform;
  return {
    duration: long,
    easing: cubicOut,
    ...params,
    css: (t, u) => `
      transform: ${transform} translate(0, ${u * y}px);
      opacity: ${u}
    `
  };
};

export const stack = (node, { x = 100 }) => {
  const style = getComputedStyle(node);
  const transform = style.transform === 'none' ? '' : style.transform;
  return {
    duration: long,
    easing: standard,
    css: (t, u) => `transform: ${transform} translate3d(${u * x}%, 0, 0);`
  };
};

// https://github.com/sveltejs/svelte/blob/master/src/runtime/transition/index.ts#L209
// modified code from svelte source 
export function shift({ fallback, ...defaults }) { 
	const to_receive = new Map();
	const to_send = new Map();

	function crossfade(from, node, params) {
    const merged = {...defaults, ...params};
		const {
			delay = 0,
			duration = d => Math.sqrt(d) * 30,
			easing = cubicOut
		} = merged;

		const to = node.getBoundingClientRect();
		const dx = from.left - to.left;
		const dy = from.top - to.top;
    const d = Math.sqrt(dx * dx + dy * dy);
    headerOffset.set(Math.abs(dx));

		const style = getComputedStyle(node);
		const transform = style.transform === 'none' ? '' : style.transform;
    const opacity = +style.opacity;

		return {
			delay,
			duration: typeof duration === 'function' ? duration(d) : duration,
			easing,
			css: (t, u) => `
				opacity: ${t * opacity};
				transform-origin: center left;
				transform: ${transform} translate(${u * dx}px,0);
			`
		};
	}

	function transition(items, counterparts, intro) {
		return (node, params) => {
			items.set(params.key, {
				rect: node.getBoundingClientRect()
			});

			return () => {
				if (counterparts.has(params.key)) {
					const { rect } = counterparts.get(params.key);
					counterparts.delete(params.key);

					return crossfade(rect, node, params);
				}

				// if the node is disappearing altogether
				// (i.e. wasn't claimed by the other list)
				// then we need to supply an outro
				items.delete(params.key);
				return fallback && fallback(node, params, intro);
			};
		};
	}

	return [
		transition(to_send, to_receive, false),
		transition(to_receive, to_send, true)
	];
}

export const crossfade = shift({
  duration: long,
  easing: standard,
  fallback(node, params) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;
    const dx = get(headerOffset);
    const opacity = +style.opacity;
    return {
      duration: long,
      easing: standard,
      css: (t, u) => `
        opacity: ${t * opacity};
        transform: ${transform} translate(${u * dx}px, 0);
      `
    };
  }
});