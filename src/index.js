import { createContext } from './helpers.js';

console.time('DOM traversal');
const contentBlocks = [];
const walker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_TEXT,
  null,
  false
);

let node;
while (node = walker.nextNode()) {
  if (node.textContent.trim().length > 0) {
    const context = createContext(node);
    contentBlocks.push(context);
  }
}

console.log(contentBlocks);
console.timeEnd('DOM traversal');
console.log('staticpage/index.js');
