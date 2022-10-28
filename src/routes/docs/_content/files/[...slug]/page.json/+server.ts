import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

import { parse } from 'marked';

import { acquire } from '$lib/documentation';

export const prerender = true;

export const GET: RequestHandler = ( { params }) => {
  const document = acquire(params.slug);

  if (document === null) {
    throw error(404);
  }

  return json({
    title: document.title,
    content: parse(document.content)
  });
}
