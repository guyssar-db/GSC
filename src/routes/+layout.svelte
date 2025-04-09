<script>
	let { children } = $props();
	import "../app.css";
	import { writable } from 'svelte/store';
  
    let point = writable(0);
  
    function toggleMenu() {
      point.update(currentPoint => currentPoint === 1 ? 0 : 1);
    }
</script>
<nav class="w-full bg00183e text-white px-4 py-3 flex items-center justify-between">
	<div class="text-xl font-bold px-5">
		<a class="" href="/">EduSite</a>
	</div>

	<div class="hidden md:flex gap-6 font-bold text-center">
		<a class="py-3 w-[100px] hover-underline-animation left" href="/">Home</a>
		<a class="py-3 w-[100px] hover-underline-animation left" href="/learning">Learning</a>
		<a class="py-3 w-[100px] hover-underline-animation left" href="/about">About</a>
	</div>

	<button class="md:hidden focus:outline-none" onclick={toggleMenu} aria-label="Toggle menu">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
		</svg>
	</button>
</nav>

<!--    มือถือ -->
{#if $point === 1}
	<div class="md:hidden bg00296b text-white flex flex-col items-start px-4 py-3 gap-2 ">
		<a class="w-full py-3 border-b border-white text-center" href="/" onclick={() => $point = 0}>Home</a>
		<a class="w-full py-3 border-b border-white text-center" href="/learning" onclick={() => $point = 0}>Learning</a>
		<a class="w-full py-3 border-b border-white text-center" href="/about" onclick={() => $point = 0}>About</a>
	</div>
{/if}

<!-- <main class="min-h-screen bg-white text-black">

</main> -->
	{@render children()}
