import { browser } from '$app/environment';

import fs, { existsSync as exists } from 'fs';
import path from 'path';

import { is_tree } from './documentation.shared';

export interface Document {
  title: string;
  content: string;
  // fileformat: something;
}

export interface DocumentInfo {
  title: string;
  slug: string;
}

export type DocsTreeNode = DocumentationTree|DocumentInfo;

// A tree representing the `docs` folder.
export interface DocsTree {
  // index.whatever
  index: DocumentInfo;
  // Everything except index.whatever
  nodes: DocsTreeNode[];
  // docs: DocumentInfo[];
  // // Folders below this one.
  // subcategories: {
  //   [key:string]: DocumentTree
  // };
}

function not_browser() {
  if (browser) {
    throw Error('SvelteKit has skill issues');
  }
}

function is_directory(item: string): boolean {
  return fs.lstatSync(item).isDirectory();
}

function get_slug_of_node(node: DocsTreeNode): string {
  if (is_tree(node)) {
    return node.index.slug;
  }

  return node.slug;
}

export function acquire(pagename: string): Document|null {
  not_browser();
  let target = path.join("docs", pagename);

  if (exists(target) && is_directory(target)) {
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

function process_file(fname: string): DocumentInfo {
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
}

// Returns a document tree.
function process_folder(dir: string): DocumentationTree {
  let tree: DocumentationTree = {
    index: null,
    nodes: []
    // docs: [],
    // subcategories: {}
  };

  // List everything in the directory.
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const itemPath = path.join(dir, item);

    const is_dir = is_directory(itemPath);
    const node = is_dir ? process_folder(itemPath) : process_file(itemPath);

    if (!is_dir && item == "index.md") {
      tree.index = node;
    } else {
      tree.nodes.push(node);
    }
    // if (isDir(itemPath)) {
    //   // Recursively index it.
    //   // tree.subcategories[item] = process_folder(itemPath);
    // } else {
    //   // Index the file and add it to the tree.
    //   const doc = process_file(itemPath);
    //   if (item == "index.md") {
    //     tree.index = doc;
    //   } else {
    //     // tree.docs.push(doc);
    //   }
    // }
  }

  if (tree.index === null) {
    throw Error(`${dir} has no index file.`);
  }

  // `numeric: true` because we want to be able to specify
  // the order if necessary by prepending a number to the file name.
  tree.nodes.sort(
    (a, b) => get_slug_of_node(a).localeCompare(get_slug_of_node(b), "en", { numeric: true })
  );

  return tree;
}

// Returns the document tree.
export function index_content(): DocumentationTree {
  not_browser();
  const tree = process_folder("docs");
  console.log(tree);
  return tree;
}
