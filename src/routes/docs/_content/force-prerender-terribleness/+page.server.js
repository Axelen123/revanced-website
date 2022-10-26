import { index_content } from '$lib/documentation';
import { slug_to_url } from '$lib/documentation.shared';

export const prerender = true;

export async function load({ fetch }) {
    return { urls: index_content().map(slug_to_url) };
}
