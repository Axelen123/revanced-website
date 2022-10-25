import type { PageServerLoad } from './$types';

import { acquire } from '$lib/documentation';

import marked from 'marked';

export const prerender = true;

export const load: PageServerLoad = ( { params }) => {
  let pagename = params.pagename;

  const markdown = acquire(pagename);
  return { content: marked.parse(markdown), pagename };
}
