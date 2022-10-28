import { browser } from '$app/environment';

import fs, { existsSync as exists } from 'fs';
import path from 'path';

export interface Document {
  title: string;
  content: string;
  // fileformat: something;
}

export interface DocumentInfo {
  title: string;
  slug: string;
}

function not_browser() {
  if (browser) {
    throw Error('SvelteKit has skill issues');
  }
}

function isDir(item: string): boolean {
  return fs.lstatSync(item).isDirectory();
}

export function acquire(pagename: string): Document|null {
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

  const data = fs.readFileSync(target, 'utf-8');
  let lines = data.split('\n');
  // Title is the first line. Read and remove it.
  const title = lines.splice(0, 1)[0];
  const content = lines.join('\n');

  return { title, content };
}

// Returns a list of all valid doc page slugs.
export function index_content(): DocumentInfo[] {
  not_browser();

  let files = [];
  let dirs = ["docs"];

  // Recursively index `docs` directory.
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
    .map(fname => {
      // Remove `docs/` prefix
      let slug = fname
        .substring("docs/".length);
      // Remove `.md` suffix
      slug = slug.substring(0, slug.length - 3);
      // Remove `index` suffix if present.
      const parts = slug.split("/");
      const last_index = parts.length - 1;
      if (parts[last_index] == "index") {
        parts.pop();
        // Make it end with / instead.
        // parts[last_index] = "";
      }
      slug = parts.join("/");

      const title = acquire(slug).title;

      return { slug, title };
    });
}
