import React, { useEffect, useState } from "react";

const TableOfContents = () => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    // Detect and store headings within the parent container
    const headingElements = Array.from(
      document.querySelectorAll("main h1, main h2, main h3")
    );

    const newHeadings = getNestedHeadings(headingElements);
    setHeadings(newHeadings);
  }, []);

  const getNestedHeadings = (headingElements) => {
    const nestedHeadings = [];
    let currentH1 = null;
    let currentH2 = null;

    headingElements.forEach((heading, index) => {
      const { innerText: title, id } = heading;

      if (heading.nodeName === "H1") {
        currentH1 = { id, title, items: [], depth: 1 };
        nestedHeadings.push(currentH1);
        currentH2 = null;
      } else if (heading.nodeName === "H2") {
        if (currentH1) {
          currentH2 = { id, title, items: [], depth: 2 };
          currentH1.items.push(currentH2);
        } else {
          currentH2 = { id, title, items: [], depth: 1 };
          nestedHeadings.push(currentH2);
        }
      } else if (heading.nodeName === "H3" && currentH2) {
        currentH2.items.push({ id, title, depth: 3 });
      }
    });

    return nestedHeadings;
  };

  return (
    <nav aria-label="Table of contents">
      <ul>
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: `${heading.depth * 20}px` }}>
            <a href={`#${heading.id}`}>{heading.title}</a>
            {heading.items.length > 0 && (
              <ul>
                {heading.items.map((child) => (
                  <li
                    key={child.id}
                    style={{ paddingLeft: `${child.depth * 20}px` }}
                  >
                    <a href={`#${child.id}`}>{child.title}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
