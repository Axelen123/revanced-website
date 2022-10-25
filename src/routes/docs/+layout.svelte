<script lang="ts">
  import '$lib/documentation.scss';

  import Button from '$lib/components/atoms/Button.svelte';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
</script>

<section id="doc-section-main" in:fly={{ y: 10, easing: quintOut, duration: 700 }}>
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
