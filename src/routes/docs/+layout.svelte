<script>
import Button from '$lib/components/atoms/Button.svelte';
import { fly } from 'svelte/transition';
import { quintOut } from 'svelte/easing';
</script>

<section in:fly={{ y: 10, easing: quintOut, duration: 700 }}>
	<div class="menu">
		<div class="doc-section-selected">
			<h3>Prerequisites</h3>
		</div>
		<div class="doc-section">
			<h3>Using ReVanced CLI and installiing ReVanced</h3>
		</div>
	</div>
  <div class="content">
    <slot></slot>
  </div>
</section>

<style>
section {
	display: grid;
	grid-template-columns: 300px 3fr;
}

a {
	text-decoration: none;
	color: var(--white);
	border-bottom: 1.5px solid var(--accent-color);
	padding: 0px 5px;
	transition: all 0.4s var(--bezier-one);
}

a:hover {
	background-color: var(--accent-color);
	border-radius: 6px;
	color: var(--grey-four);
}

.menu,
.content {
	height: 100vh;
	width: 100%;
}

.menu {
	padding: 90px 15px 0px 15px;
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.content {
	padding: 100px 30px 0px 30px;
}

.doc-section {
	background-color: var(--grey-one);
	border-radius: 12px;
	padding: 15px 20px;
}

.doc-section-selected {
	background-color: var(--grey-three);
	border-radius: 12px;
	padding: 15px 20px;
}

.doc-section-selected > h3 {
	color: var(--white);
}

.button-wrapper {
	width: 30rem;
}

ul {
	padding-left: 2rem;
}

h4 {
	margin-bottom: 0.5rem;
}
</style>
