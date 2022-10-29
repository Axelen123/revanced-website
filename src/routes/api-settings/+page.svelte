<script lang="ts">
  import { api_base_url, set_api_base_url } from '../../data/api/settings';
  let url = api_base_url();
</script>

<section class="settings">
  <input name="api-url" type="text" bind:value={url} />
  <button on:click={() => set_api_base_url(url)}>Save</button>
</section>

<style>
  .settings {
    padding-top: 5rem;
  }
</style>
