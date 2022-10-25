import type { PageLoad } from './$types';

import { parse } from 'marked';

export const load: PageLoad = async ( { params, fetch }) => {
  let pagename = params.pagename;
  // Will be improved when I add indexing
  if (pagename == '') {
    pagename = 'index';
  }
  const response = await fetch(`/__/docs-content/${pagename}`);
  const markdown = await response.text();

  return { content: parse(markdown), pagename };
}
