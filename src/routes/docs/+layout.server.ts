import type { PageServerLoad } from './$types';

// documentation.ts should probably be renamed...
import { index_content } from '$lib/documentation';

// TODO: add note here about api impl and prerendering...
export const prerender = true;

export const load: PageServerLoad = () => ({ tree: index_content() });
