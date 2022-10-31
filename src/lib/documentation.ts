import { browser, prerendering } from '$app/environment';

import fs, { existsSync as exists } from 'fs';
import path from 'path';

import { is_tree } from './documentation.shared';

import { parse as parse_md } from 'marked';

export interface Document {
  title: string;
  // HTML
  content: string;
}

export interface DocumentInfo {
  title: string;
  slug: string;
}

const supported_formats = new Map();
supported_formats.set("md", parse_md);

export type DocsTreeNode = DocumentationTree|DocumentInfo;

let docs_folder = process.env.REVANCED_DOCS_FOLDER;
if (docs_folder === undefined) {
  if (prerendering) { console.warn("Using testing docs in production build") }
  docs_folder = "testing-docs";
}

// A tree representing the `docs` folder.
export interface DocsTree {
  // index.whatever
  index: DocumentInfo;
  // Everything except index.whatever
  nodes: DocsTreeNode[];
}

if (browser) {
  throw Error('SvelteKit has skill issues');
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

// Only used by get()
function find_file_of_supported_format(prefix: string) {
  const dir = path.dirname(prefix);

  for (const item of fs.readdirSync(dir)) {
    const full_path = path.join(dir, item);
    // Get file extension
    const ext = path.extname(item).substring(1);

    // Ignore if it is not what we are looking for.
    const desired_path = `${prefix}.${ext}`;
    if (is_directory(full_path) || ext <= 1 || desired_path != full_path) {
      continue;
    }

    // Return if file extension is supported.
    if ([...supported_formats.keys()].includes(ext)) {
      return {
        path: full_path,
        ext,
      };
    }
  }

  return null;
}

// Get a document. Returns null if it does not exist.
export function get(slug: string): Document|null {
  let target = path.join(docs_folder, slug);
  if (exists(target) && is_directory(target)) {
    target += "/index";
  }
  const file_info = find_file_of_supported_format(target);

  if (file_info === null) {
    return null;
  }

  const data = fs.readFileSync(file_info.path, 'utf-8');
  let lines = data.split('\n');
  // Title is the first line. Read and remove it.
  const title = lines.splice(0, 1)[0];
  // Process it. We already know it is supported thanks to `find_file_of_supported_format`.
  const content = supported_formats.get(file_info.ext)(
    lines.join('\n')
  );

  return { title, content };
}

// Get file information
function process_file(fname: string): DocumentInfo {
  const prefix_len = `${docs_folder}/`.length;
  // Remove docs folder prefix and file extension suffix, then split it.
  const parts = fname
    .substring(`${docs_folder}/`.length, fname.length - path.extname(fname).length)
    .split("/");

  // Remove `index` suffix if present.
  const last_index = parts.length - 1;
  if (parts[last_index] == "index") {
    parts.pop();
  }

  const slug = parts.join("/");
  const title = get(slug).title;

  return { slug, title };
}

const ignored_items = ["assets", "README.md"];

// Returns a document tree.
function process_folder(dir: string): DocumentationTree {
  let tree: DocumentationTree = {
    index: null,
    nodes: []
  };

  // List everything in the directory.
  const items = fs.readdirSync(dir);

  for (const item of items) {
    if (ignored_items.includes(item)) {
      continue;
    }

    const itemPath = path.join(dir, item);

    const is_dir = is_directory(itemPath);
    let can_process = is_dir;
    let is_index_file = false;

    if (!is_dir) {
      for (const format of supported_formats.keys()) {
        // Ignore files we cannot process.
        if (item.endsWith(format)) {
          can_process = true;
        }

        if (item == `index.${format}`) {
          is_index_file = true;
        }
      }
    }

    if (!can_process) {
      continue;
    }

    const node = is_dir ? process_folder(itemPath) : process_file(itemPath);

    if (is_index_file) {
      tree.index = node;
    } else {
      tree.nodes.push(node);
    }
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
  return process_folder(docs_folder);
}
