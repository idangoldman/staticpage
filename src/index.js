import { EXCLUDE_TAGS } from './constants.js';
import { createContext } from './helpers.js';

const filterWalkerNodes = (node) => {
  return EXCLUDE_TAGS.includes(node.parentNode.tagName)
    ? NodeFilter.FILTER_REJECT
    : NodeFilter.FILTER_ACCEPT;
}

function domTraversal() {
  const contentBlocks = [];

  // add explude tags into createTreeWalker
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    filterWalkerNodes,
  );

  let node;
  while (node = walker.nextNode()) {
    if (node.textContent.trim().length > 0) {
      contentBlocks.push(
        createContext(node)
      );
    }
  }

  return contentBlocks;
}

console.time('DOM traversal');
console.log(domTraversal.call());
console.timeEnd('DOM traversal');
console.log('staticpage/index.js');
