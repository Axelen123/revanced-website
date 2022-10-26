import type { PageLoad } from './$types';

import { slug_to_url } from '$lib/documentation.shared';
import { parse } from 'marked';

export const load: PageLoad = async ( { params, fetch }) => {
  let slug = params.slug;

  const response = await fetch(slug_to_url(slug));
  const json = await response.json();

  return { content: parse(json.content), slug };
}
