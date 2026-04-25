(function () {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const toast = (message) => {
    let node = $('#toast');
    if (!node) {
      node = document.createElement('div');
      node.id = 'toast';
      node.className = 'toast';
      document.body.appendChild(node);
    }
    node.textContent = message;
    node.classList.add('is-visible');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => node.classList.remove('is-visible'), 1400);
  };

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (_err) {}
      textarea.remove();
      return ok;
    }
  }

  $$('[data-copy-target]').forEach((button) => {
    button.addEventListener('click', async () => {
      const target = document.getElementById(button.dataset.copyTarget);
      const ok = target ? await copyText(target.textContent.trim()) : false;
      toast(ok ? '복사 완료' : '복사 실패');
    });
  });

  $$('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const ok = await copyText(button.dataset.copy || '');
      toast(ok ? '복사 완료' : '복사 실패');
    });
  });

  $$('[data-print]').forEach((button) => {
    button.addEventListener('click', () => window.print());
  });

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  const searchInput = $('#siteSearchInput');
  const searchCount = $('#siteSearchCount');
  const searchItems = $$('.js-search-item');
  const clearButton = $('#siteSearchClear');

  function normalize(value) {
    return String(value || '').toLowerCase().replace(/\s+/g, ' ').trim();
  }
  function tokens(value) {
    return normalize(value).split(/[\s,\/]+/).filter(Boolean);
  }
  function applySearch() {
    if (!searchInput || !searchItems.length) return;
    const q = tokens(searchInput.value);
    let visible = 0;
    searchItems.forEach((item) => {
      const haystack = normalize(item.dataset.search + ' ' + item.textContent);
      const hit = q.length === 0 || q.every((token) => haystack.includes(token));
      item.hidden = !hit;
      if (hit) visible += 1;
    });
    if (searchCount) searchCount.textContent = `총 ${visible}건`;
  }

  if (searchInput) {
    searchInput.addEventListener('input', applySearch);
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') event.preventDefault();
    });
    if (clearButton) clearButton.addEventListener('click', () => {
      searchInput.value = '';
      applySearch();
      searchInput.focus();
    });
    applySearch();
  }
})();
