import type { PageServerLoad } from './$types';

import { index_content } from '$lib/documentation.server';

// TODO: add note here about api impl and prerendering...
export const prerender = true;

export const load: PageServerLoad = () => ({ tree: index_content() });
