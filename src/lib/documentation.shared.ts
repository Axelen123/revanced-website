import type { DocsTreeNode } from "./documentation";

export function is_tree(node: DocsTreeNode) {
  return node.hasOwnProperty('nodes');
}
