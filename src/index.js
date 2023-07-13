import { getNodeSelector } from './helpers.js';

// Step 1: Select the HTML container element
const containerElement = document.body; // You can modify this as needed

// Step 2: Traverse the DOM tree and select relevant elements
const textNodes = [];
const walker = document.createTreeWalker(
  containerElement,
  NodeFilter.SHOW_TEXT,
  null,
  false
);

let node;
while (node = walker.nextNode()) {
  if (node.textContent.trim().length > 0) {
    textNodes.push(node);
  }
}

// Step 3: Extract the text content along with context and CSS selector
const mappedText = [];
textNodes.forEach(node => {
  const context = {
    type: node.parentNode.tagName, // Add the type of content (e.g., tag name) as context
    text: node.textContent.trim(), // Extract and store the text content
    selector: getNodeSelector(node) // Get the CSS selector of the node
  };
  mappedText.push(context);
});

console.log(mappedText); // The mapped text content with associated context and CSS selector

console.log('staticpage/index.js');
