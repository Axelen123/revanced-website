import type { DocumentInfo } from '$lib/documentation';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch("/docs/_content/index.json");
  const index: DocumentInfo[] = await response.json();

  return { index };
}
