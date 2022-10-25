import type { DocsTreeNode } from "./documentation";

// Get URL for a documentation slug.
export function slug_to_url(slug: string) {
  return `/docs/_content/files/${slug}/page.json`.replace("//", "/");
}

export function is_tree(node: DocsTreeNode) {
  return node.hasOwnProperty('nodes');
}
