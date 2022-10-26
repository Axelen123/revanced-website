import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

import { parse } from 'marked';

import { acquire } from '$lib/documentation';

export const prerender = true;

export const GET: RequestHandler = ( { params }) => {
  const markdown = acquire(params.slug);

  if (markdown === null) {
    throw error(404);
  }

  return json({
    content: parse(markdown)
  });
}
