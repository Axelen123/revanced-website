import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { prerendering } from '$app/environment';

// This file should probably be renamed...
import { index_content } from '$lib/documentation';

export const prerender = true;

export const GET: RequestHandler = async ({ fetch }) => {
  return json(index_content());
}
