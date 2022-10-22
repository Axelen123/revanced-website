<script lang="ts">
	import NavHost from "$lib/components/molecules/Navigation.svelte";
	import '../app.css';

  import { navigating } from '$app/stores'
  import { onMount } from "svelte";
  import Spinner from '$lib/components/atoms/Spinner.svelte';

  let timeout = 0;

  let show_spinner = false;

  onMount(() => {
    // Show spinner if we are still waiting for navigation after 150ms
    navigating.subscribe(nav => {
      // cancel current timer, if any
      clearTimeout(timeout);
      // null after navigation finishes
      if (nav != null) {
        timeout = setTimeout(() => {
          show_spinner = true;
        }, 150);
      } else {
        // navigation finished
        show_spinner = false;
      }
    });
  });
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="og:title" content="ReVanced"/>
	<meta name="og:image" itemprop="image" content="/embed.png">
	<meta property="og:description" content="An extensible framework for building application mods.">
	<meta name="twitter:image" itemprop="image" content="/embed.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="theme-color" content="#0f111a">
	<title>ReVanced</title>
</svelte:head>

<NavHost/>
{#if show_spinner}
  <Spinner />
{/if}
<slot />
