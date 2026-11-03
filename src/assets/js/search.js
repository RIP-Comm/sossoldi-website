/* Site search: Pagefind, loaded on demand. */
(() => {
  const dialog = document.getElementById("search-dialog");
  const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");
  if (!dialog || !input || !results) return;

  const strings = {
    loading: dialog.dataset.loading || "Searching…",
    empty: dialog.dataset.empty || "Nothing found.",
  };

  let pagefindPromise = null;
  let timer = null;
  let counter = 0;

  function loadPagefind() {
    if (!pagefindPromise) {
      pagefindPromise = import("/pagefind/pagefind.js").catch((error) => {
        pagefindPromise = null;
        throw error;
      });
    }
    return pagefindPromise;
  }

  async function run(query) {
    const id = ++counter;
    results.setAttribute("aria-busy", "true");
    results.innerHTML = `<p class="search-hint">${strings.loading}</p>`;
    try {
      const pagefind = await loadPagefind();
      await pagefind.init();
      const response = await pagefind.search(query);
      const slices = await Promise.all(response.results.slice(0, 10).map((result) => result.data()));
      if (id !== counter) return;
      if (!slices.length) {
        results.innerHTML = `<p class="search-hint">${strings.empty}</p>`;
        return;
      }
      results.innerHTML = slices
        .map((page) => {
          const lang = (page.meta && page.meta.lang) || "";
          return `<a class="search-result" href="${page.url}">
            ${lang ? `<span class="search-lang">${lang.toUpperCase()}</span>` : ""}
            <strong>${page.meta?.title || page.url}</strong>
            <p>${page.excerpt}</p>
          </a>`;
        })
        .join("");
    } catch (error) {
      if (id !== counter) return;
      results.innerHTML = `<p class="search-hint">Search is not available in this build (run <code>npm run build</code>).</p>`;
    } finally {
      if (id === counter) results.removeAttribute("aria-busy");
    }
  }

  function open() {
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    setTimeout(() => input.focus(), 30);
  }

  document.querySelectorAll("[data-open-search]").forEach((button) => {
    button.addEventListener("click", open);
  });

  input.addEventListener("input", () => {
    const query = input.value.trim();
    clearTimeout(timer);
    if (query.length < 2) {
      results.innerHTML = "";
      return;
    }
    timer = setTimeout(() => run(query), 160);
  });

  dialog.addEventListener("close", () => {
    input.value = "";
    results.innerHTML = "";
  });

  // Click on the backdrop (the dialog element itself, outside its children) closes.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  document.addEventListener("keydown", (event) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || "");
    if ((event.key === "k" || event.key === "K") && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      open();
    } else if (event.key === "/" && !typing) {
      event.preventDefault();
      open();
    }
  });
})();
