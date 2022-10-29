// import type { Repository } from 'src/data/types';
import type { PageLoad } from './$types';

import { contributors } from '../data/api';

export const prerender = true;

export const load: PageLoad = contributors.page_load_impl();

// export async function load({
//   fetch
// }): Promise<ContribData> {
// 	const response = await fetch(api_url('contributors'));
// 	const data = await response.json();
// 	return data;
// };
