// import type { Patch } from 'src/data/types';

// import { api_url } from '$lib/utils';

// import { readable } from 'svelte/store';

// export async function load({
//   fetch
// }): Promise<PatchesData> {
// 	const response = await fetch(api_url('patches'));
// 	const patches = await response.json();
// 	let packages: string[] = [];

// 	// gets packages
// 	for (let i = 0; i < patches.length; i++) {
// 		patches[i].compatiblePackages.forEach((pkg: Patch) => {
// 			let index = packages.findIndex((x) => x == pkg.name);
// 			if (index === -1) {
// 				packages.push(pkg.name);
// 			}
// 		});
// 	}
// 	return { patches, packages };
// };

import type { PageLoad } from './$types';

import { patches } from '../../data/api';

export const load: PageLoad = patches.page_load_impl();
