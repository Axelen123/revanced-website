import type { DocumentationTree } from '$lib/documentation';
import type { PageLoad } from './$types';

type ExtendedDocumentInfo = DocumentInfo & { nesting_level: number };

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch("/docs/_content/tree.json");
  const tree: DocumentationTree = await response.json();

  return { tree };
}
