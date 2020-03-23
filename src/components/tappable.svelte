<script>
	let active;

	function down() {
		active = true;
	}

	function up() {
		active = false;
	}
</script>

<div 
  on:mousedown={down} 
  on:mouseup={up}
  on:touchstart={down}
  on:touchend={up}
>
	<slot active={active}></slot>
</div>