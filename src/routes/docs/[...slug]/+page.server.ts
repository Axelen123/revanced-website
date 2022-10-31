import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

import { acquire } from '$lib/documentation';
import { parse } from 'marked';

// See also: ../+layout.server.ts
export const prerender = true;

export const load: PageServerLoad = ({ params }) => {
  const document = acquire(params.slug);
  if (document === null) {
    error
    throw error(404);
  }

  return {
    ...document,
    content: parse(document.content),
  };
}