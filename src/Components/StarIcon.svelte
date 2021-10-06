<script>
	export let title = 'star';
	export let filled = false;
	export let starId;
</script>
<style>
	.star {
		margin-right: 4px;
        max-width: 80px;
	}
	.starPath {
		fill: #C4C4C4;;
		stroke: #000000;

	}
	.filled {
		fill: url(#grad2) #5AB4F2;
	}
</style>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 48" class="star" on:mouseover on:focus on:mouseleave on:click data-starid={starId} let:class>
	<title>{title}</title>
	    <defs>
    <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#5AB4F2;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#00FFE0;stop-opacity:1" />
    </linearGradient>
  </defs>
	<path class:filled data-starid={starId} class="starPath" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z" />
</svg>
