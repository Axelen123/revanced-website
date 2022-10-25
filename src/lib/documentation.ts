import { browser } from '$app/environment';

import fs from 'fs';
import path from 'path';

function not_browser() {
  if (browser) {
    throw Error('svelte kit has skill issues');
  }
}

export function acquire(pagename: string): string|null {
  not_browser();
  let target = path.join("docs", pagename + ".md");

  if (!fs.existsSync(target)) {
    return null;
  }

  return fs.readFileSync(target, 'utf-8');
}
