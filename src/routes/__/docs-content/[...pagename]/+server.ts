import type { RequestHandler } from './$types';

import { acquire } from '$lib/documentation';

import { parse } from 'marked';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const GET: RequestHandler = ( { params }) => {
  const markdown = acquire(params.pagename);
  if (markdown === null) {
    throw error(404);
  }
  return new Response(parse(markdown));
}
