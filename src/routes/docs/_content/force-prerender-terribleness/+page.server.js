import { index_content } from '$lib/documentation';
import { slug_to_url } from '$lib/documentation.shared';

export const prerender = true;

export async function load({ fetch }) {
    // Not actually sure if we are going to need this terribleness anyway.
    // index_content().map(slug_to_url)
    return { urls: ["/docs/_content/files/page.json"] };
}
