// ==UserScript==
// @name         Reading Helper
// @namespace    http://www.mikesbytes.net/userscripts
// @version      1.0.1
// @description  Makes reading text on websites a more pleasant experience
// @author       Michael Moreno
// @homepageURL  https://greasyfork.org/en/scripts/577351-reading-helper
// @match        http://*/*
// @match        https://*/*
// @license      GPL-3.0
// ==/UserScript==

function createLinksToHeadings(headingType) {
  const h2Tags = document.querySelectorAll(headingType);

  for (let i = 0; i < h2Tags.length; i++) {
    const tag = h2Tags[i];

    // Header is inside link, move on.
    if (tag.closest("a")) {
      continue;
    }

    // Header contains link, move on.
    const childLink = tag.querySelector("a");
    if (
      childLink &&
      childLink.hasAttribute("href") &&
      childLink.getAttribute("href").trim() !== ""
    ) {
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
