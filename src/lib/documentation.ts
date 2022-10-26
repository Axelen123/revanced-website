import { browser } from '$app/environment';

import fs, { existsSync as exists } from 'fs';
import path from 'path';

function not_browser() {
  if (browser) {
    throw Error('SvelteKit has skill issues');
  }
}

function isDir(item: string): boolean {
  return fs.lstatSync(item).isDirectory();
}

export function acquire(pagename: string): string|null {
  not_browser();
  let target = path.join("docs", pagename);

  if (exists(target) && isDir(target)) {
    // Get the index.md of the folder.
    target = path.join(target, "index.md");
  } else {
    target = `${target}.md`;
  }

  if (!exists(target)) {
    return null;
  }

  return fs.readFileSync(target, 'utf-8');
}

// Returns a list of all valid doc page slugs.
export function index_content(): string[] {
  not_browser();

  let files = [];
  let dirs = ["docs"];

  // Recursively index all directories.
  while (dirs.length != 0) {
    const dir = dirs.pop();

    const items = fs.readdirSync(dir);

    for (const item of items) {
      const itemPath = path.join(dir, item);
      if (isDir(itemPath)) {
        dirs.push(itemPath);
      } else {
        files.push(itemPath);
      }
    }
  }

  return files
    // Remove `docs/` prefix
    .map(fname => fname.substring("docs/".length))
    // Remove `.md` suffix
    .map(name => name.substring(0, name.length - 3))
    // For `index.md` to work correctly.
    .map(name => {
      const parts = name.split("/");
      if (parts[parts.length - 1] == "index") {
        parts.pop();
      }
      return parts.join("/");
    });
}
