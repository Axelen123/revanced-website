import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  return {
    pagename: params.pagename as string
  };
}
