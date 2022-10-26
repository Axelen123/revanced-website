import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch("/docs/_content/index.json");
  const index = await response.json();

  return { index };
}
