<script lang="ts">
  import type { DocumentInfo } from '$lib/documentation';
  export let info: DocumentInfo;
  // TODO: move the associated CSS here...
</script>

<!-- Always part of a list -->
<li>
  <div class="doc-section">
    <a href="/docs/{info.slug}"><h3>{info.title}</h3></a>
  </div>
</li>
