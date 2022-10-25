import { prerendering, dev } from '$app/environment';

import fs from 'fs';
import path from 'path';

function ensure_prerendering() {
  const shouldnt_explode = dev || prerendering;
  if (!shouldnt_explode) {
    throw new Error("The devs have skill issues");
  }
}

export function acquire(pagename: string): string {
  ensure_prerendering();
  let target = path.join("docs", pagename);

  if (fs.existsSync(target)) {
    if (!fs.lstatSync(target).isDirectory()) {
      throw Error(`Bad filename: ${target}`);
    }

    // Use index.md of the directory.
    target = path.join(target, "index.md");
  } else {
    target = `${target}.md`;
  }

  return fs.readFileSync(target, 'utf-8');
}
