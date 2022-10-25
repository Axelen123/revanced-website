export const prerender = true;

// This is some lame shit right here.
export async function load({ data, fetch }) {
    for (const thingIwantToPrerenderSoBadly of data.urls) {
        // SvelteKit refuses to prerender server routes that have parameters.
        // Adding it to `svelte.config.js` prerender entries does not work.
        // I have to fetch it in the shared `load` function of a prerendered page...
        // Pointing `a` tags towards the server route also works.
        console.log(`Force prerender: ${thingIwantToPrerenderSoBadly}`);
        await (await fetch(thingIwantToPrerenderSoBadly)).json();
    }

    return { link: 'https://media.tenor.com/9PTGVf4BLwYAAAAC/crying-emoji-dies.gif' };
}
