<script lang="ts">
  import '$lib/documentation.scss';

  import type { PageData } from './$types';

  import Button from '$lib/components/atoms/Button.svelte';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  export let data: PageData;
</script>

<section id="doc-section-main" in:fly={{ y: 10, easing: quintOut, duration: 700 }}>
	<div class="menu">
    {#each data.index as page}
      <div class="doc-section">
        <a href="/docs/{page}"><h3>Link to : /{page}</h3></a>
      </div>
    {/each}
	</div>
  <div class="content">
    <slot></slot>
  </div>
</section>
