<script lang="ts">
  // CSS is from the docs layout. TODO: move it here...
  import type { DocumentTree } from '$lib/documentation';
  import { is_tree } from '$lib/documentation.shared';

  import DocsNavNode from '$lib/components/atoms/DocsNavNode.svelte';

  export let tree: DocumentTree;
  // How deeply nested this is.
  export let nesting = 0;
</script>

<ul>
  <li>
    <!-- Index is always first. -->
    <DocsNavNode info={tree.index} />
  </li>
  {#if nesting > 1}
    <!-- Collapse/Expand arrow here perhaps... -->
  {/if}
  {#each tree.nodes as node}
    <!-- Looks better without them for now. Might change when someone writes proper CSS for this -->
    <!-- <li> -->
      {#if is_tree(node)}
        <!-- Recursion here is fine. We are not dealing with a tree the size of a linux root file system. -->
        <svelte:self tree={node} nesting={nesting + 1} />
      {:else}
        <DocsNavNode info={node} />
      {/if}
      <!-- </li> -->
  {/each}
</ul>
