export function getNodeSelector(node) {
  const selectors = [];

  while (node !== document.documentElement) {
    const parent = node.parentNode;

    // Only add selectors for element nodes
    if (node.nodeType === 1) {
      let selector = node.nodeName.toLowerCase();

      // If the node has an ID, add it to the selector
      if (node.id) {
        selector += `#${node.id}`;
        selectors.unshift(selector);
        break;

      // If the node has classes, add them to the selector
      } else if (node.classList?.length > 0) {
        selector += `.${Array.from(node.classList).join('.').replace(/[^\w-\.]/g, '\\\\$&')}`;
      }

      // If the node has siblings, add the nth-child selector
      const sibilings = Array.from(parent.childNodes).filter((child) => child.nodeType === 1);
      if (sibilings.length > 1) {
        const index = sibilings.indexOf(node) + 1;
        selector += `:nth-child(${index})`;
      }

      selectors.unshift(selector);
    }

    // Move up to the parent node
    node = parent;
  }

  // Join the selectors tree into a single selector
  return selectors.join('>');
}
