export function active(node, className = 'active-state') {
	let x;
  let y;
  const events = {
    mouse: ['mousedown', 'mousemove', 'mouseup'],
    touch: ['touchstart', 'touchmove', 'touchend'],
    pointer: ['pointerdown', 'pointermove', 'pointerup']
  };
  let eventType = 'mouse';
  if ('PointerEvent' in window) eventType = 'pointer';
  else if ('ontouchstart' in window) eventType = 'touch';

	function handleMousedown(event) {
		x = event.clientX;
    y = event.clientY;
    
    node.classList.add(className);
		node.dispatchEvent(new CustomEvent('panstart', {
			detail: { x, y }
		}));

		window.addEventListener(events[eventType][1], handleMousemove);
		window.addEventListener(events[eventType][2], handleMouseup);
	}

	function handleMousemove(event) {
		const dx = event.clientX - x;
		const dy = event.clientY - y;
		x = event.clientX;
		y = event.clientY;

		node.dispatchEvent(new CustomEvent('panmove', {
			detail: { x, y, dx, dy }
		}));
	}

	function handleMouseup(event) {
		x = event.clientX;
    y = event.clientY;

    node.classList.remove(className);
		node.dispatchEvent(new CustomEvent('panend', {
			detail: { x, y }
		}));

		window.removeEventListener(events[eventType][1], handleMousemove);
		window.removeEventListener(events[eventType][2], handleMouseup);
	}

	node.addEventListener(events[eventType][0], handleMousedown);

	return {
		destroy() {
			node.removeEventListener(events[eventType][0], handleMousedown);
		}
	};
}