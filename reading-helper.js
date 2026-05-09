// ==UserScript==
// @name         Reading Helper
// @namespace    http://www.mikesbytes.net/userscripts
// @version      1.0.0
// @description  Makes reading text on websites a more pleasant experience
// @author       Michael Moreno
// @homepageURL  todo
// @match        http://*/*
// @match        https://*/*
// @license      GPL-3.0
// ==/UserScript==

function createLinksToHeadings(headingType) {
  const h2Tags = document.querySelectorAll(headingType);

  for (let i = 0; i < h2Tags.length; i++) {
    const tag = h2Tags[i];

    if (tag.closest("a")) {
      continue;
    }

    const newLink = document.createElement("a");
    newLink.className = "reading-helper-link";
    newLink.style.color = "inherit";
    newLink.style.textDecoration = "none";

    const existingTagId = tag.id;

    if (existingTagId) {
      newLink.href = `#${existingTagId}`;
    } else {
      const customId = `reading-helper-${headingType}-${i + 1}`;

      tag.id = customId;

      newLink.href = `#${customId}`;
    }

    tag.before(newLink);

    newLink.appendChild(tag);
  }
}

function main() {
  for (let i = 1; i < 7; i++) {
    createLinksToHeadings(`h${i}`);
  }
}

main();
