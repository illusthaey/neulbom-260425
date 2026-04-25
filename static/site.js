(function () {
  "use strict";

  const CONFIG = window.NEULBOM_SITE_CONFIG || {
    site: { name: "업무천재 고주무관의 늘봄학교 행정 실무 가이드", shortName: "고", homeHref: "/" },
    navigation: [],
    pages: {},
    footer: { brand: "늘봄학교 행정 실무 가이드", note: "업무 공부 열심히 합시다." },
    topButton: { label: "위로", ariaLabel: "페이지 위로 이동", showAfter: 320 }
  };

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function toAttributeString(attrs) {
    if (!attrs) return "";
    return Object.entries(attrs)
      .map(([key, value]) => {
        if (value === false || value == null) return "";
        if (value === true || value === "") return ` ${escapeHtml(key)}`;
        return ` ${escapeHtml(key)}="${escapeHtml(value)}"`;
      })
      .join("");
  }

  function normalizePath(path) {
    let normalized = String(path || "/").split("?")[0].split("#")[0];
    if (!normalized.startsWith("/")) normalized = "/" + normalized;
    normalized = normalized.replace(/index\.html?$/i, "");
    if (!normalized.endsWith("/")) normalized += "/";
    normalized = normalized.replace(/\/{2,}/g, "/");
    return normalized;
  }

  function currentPageKey() {
    const declared = document.body?.dataset?.pageKey;
    if (declared) return declared;

    const path = normalizePath(location.pathname);
    const navHit = (CONFIG.navigation || []).find((item) => normalizePath(item.href) === path);
    if (navHit) return navHit.key;
    if (path === "/") return "home";
    return "not-found";
  }

  function pageConfig() {
    return CONFIG.pages?.[currentPageKey()] || {};
  }

  function setDocumentMetadata() {
    const page = pageConfig();
    const site = CONFIG.site || {};

    if (page.browserTitle) {
      document.title = page.browserTitle;
    } else if (page.hero?.title) {
      document.title = `${page.hero.title} | ${site.titleSuffix || site.name || ""}`.trim();
    }

    const description = page.description || page.hero?.lead || site.description;
    if (description) {
      let meta = $('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }
  }

  function renderHeader() {
    const mount = $("[data-site-header]");
    if (!mount) return;

    const site = CONFIG.site || {};
    const nav = CONFIG.navigation || [];
    const active = currentPageKey();

    const navHtml = nav.map((item) => {
      const isActive = active === item.key || normalizePath(location.pathname) === normalizePath(item.href);
      return `<a class="btn-home" href="${escapeHtml(item.href)}"${isActive ? ' aria-current="page"' : ""}>${escapeHtml(item.label)}</a>`;
    }).join("");

    mount.innerHTML = `
      <header class="brand-site-header no-print">
        <div class="shell">
          <a class="brand-home-link" href="${escapeHtml(site.homeHref || "/")}" aria-label="${escapeHtml(site.homeAriaLabel || site.name || "홈")}">
            <span>${escapeHtml(site.name || "늘봄학교 행정 실무 가이드")}</span>
          </a>
          <nav class="brand-site-header__nav" aria-label="주요 메뉴">${navHtml}</nav>
        </div>
      </header>
    `;
  }

  function renderAction(action) {
    const variant = action.variant || "ghost";
    const className = `btn ${variant}`.trim();
    const attrs = toAttributeString(action.attrs);
    const label = escapeHtml(action.label || "");

    if (action.type === "button" || !action.href) {
      return `<button class="${className}" type="button"${attrs}>${label}</button>`;
    }
    return `<a class="${className}" href="${escapeHtml(action.href)}"${attrs}>${label}</a>`;
  }

  function renderHero() {
    const mount = $("[data-page-hero]");
    if (!mount) return;

    const page = pageConfig();
    const hero = page.hero;
    if (!hero) {
      mount.innerHTML = "";
      return;
    }

    const actionsHtml = (hero.actions || []).length
      ? `<div class="action-row hero-actions no-print">${hero.actions.map(renderAction).join("")}</div>`
      : "";

    if (hero.type === "home") {
      const title = hero.titleHtml || escapeHtml(hero.title || "");
      mount.innerHTML = `
        <section class="section home-hero" aria-labelledby="hero-title">
          <div class="home-hero-inner">
            <p class="home-kicker">${escapeHtml(hero.kicker || "")}</p>
            <h1 id="hero-title">${title}</h1>
            <p class="subtitle">${escapeHtml(hero.lead || "")}</p>
            ${actionsHtml.replace("hero-actions", "home-hero-actions")}
          </div>
          ${hero.image ? `<figure class="hero-figure" aria-hidden="true"><img src="${escapeHtml(hero.image)}" alt="" loading="eager" /></figure>` : ""}
        </section>
      `;
      return;
    }

    const breadcrumbLabel = hero.breadcrumb || hero.title || "";
    const tocHtml = (hero.toc || []).length
      ? `<nav class="local-nav no-print" aria-label="페이지 목차"><div class="chip-row">${
          hero.toc.map((item) => `<a class="chip" href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`).join("")
        }</div></nav>`
      : "";

    mount.innerHTML = `
      <section class="page-hero" aria-labelledby="page-title">
        <div class="breadcrumb"><a href="/">홈</a><span>/</span><span>${escapeHtml(breadcrumbLabel)}</span></div>
        <p class="page-kicker">${escapeHtml(hero.kicker || "")}</p>
        <h1 id="page-title">${escapeHtml(hero.title || "")}</h1>
        <p class="page-lead">${escapeHtml(hero.lead || "")}</p>
        ${actionsHtml}
        ${tocHtml}
      </section>
    `;
  }

  function renderQuickNav() {
    const mount = $("[data-page-quick-nav]");
    if (!mount) return;

    const page = pageConfig();
    const quickNav = page.quickNav;
    if (!quickNav || !(quickNav.items || []).length) {
      mount.innerHTML = "";
      return;
    }

    mount.innerHTML = `
      <nav class="quick-nav local-nav no-print" aria-label="${escapeHtml(quickNav.ariaLabel || "빠른 이동")}">
        <div class="chip-row">${
          quickNav.items.map((item) => `<a class="chip" href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`).join("")
        }</div>
      </nav>
    `;
  }

  function renderFooter() {
    if ($("footer.site-footer[data-generated-footer]")) return;

    const footer = CONFIG.footer || {};
    const page = pageConfig();
    const year = new Date().getFullYear();
    const node = document.createElement("footer");
    node.className = "site-footer no-print";
    node.setAttribute("data-generated-footer", "true");
    node.innerHTML = `
      <div class="shell">
        <p class="footer-brand-line"><span class="footer-brand-name">© ${year} ${escapeHtml(footer.brand || "늘봄학교 실무 허브")}</span><span class="footer-brand-pill">${escapeHtml(page.footerLabel || footer.note || "비공식 실무 보조 사이트")}</span></p>
        ${footer.trustMessage ? `<p>${escapeHtml(footer.trustMessage)}</p>` : ""}
      </div>
    `;
    document.body.appendChild(node);
  }

  function toast(message) {
    let node = $("#toast");
    if (!node) {
      node = document.createElement("div");
      node.id = "toast";
      node.className = "toast";
      document.body.appendChild(node);
    }
    node.textContent = message;
    node.classList.add("is-visible");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => node.classList.remove("is-visible"), 1400);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      let ok = false;
      try { ok = document.execCommand("copy"); } catch (_err) {}
      textarea.remove();
      return ok;
    }
  }

  function bindCopyButtons() {
    $$('[data-copy-target]').forEach((button) => {
      if (button.dataset.copyBound === "true") return;
      button.dataset.copyBound = "true";
      button.addEventListener("click", async () => {
        const target = document.getElementById(button.dataset.copyTarget);
        const ok = target ? await copyText(target.textContent.trim()) : false;
        toast(ok ? "복사 완료" : "복사 실패");
      });
    });

    $$('[data-copy]').forEach((button) => {
      if (button.dataset.copyBound === "true") return;
      button.dataset.copyBound = "true";
      button.addEventListener("click", async () => {
        const ok = await copyText(button.dataset.copy || "");
        toast(ok ? "복사 완료" : "복사 실패");
      });
    });
  }

  function bindPrintButtons() {
    $$('[data-print]').forEach((button) => {
      if (button.dataset.printBound === "true") return;
      button.dataset.printBound = "true";
      button.addEventListener("click", () => window.print());
    });
  }

  function initLegacyYear() {
    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
  }

  function initSearch() {
    const searchInput = $("#siteSearchInput");
    const searchCount = $("#siteSearchCount");
    const searchItems = $$(".js-search-item");
    const clearButton = $("#siteSearchClear");
    if (!searchInput || !searchItems.length) return;

    const normalize = (value) => String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
    const tokens = (value) => normalize(value).split(/[\s,\/]+/).filter(Boolean);

    function applySearch() {
      const queryTokens = tokens(searchInput.value);
      let visible = 0;

      searchItems.forEach((item) => {
        const haystack = normalize(`${item.dataset.search || ""} ${item.textContent || ""}`);
        const hit = queryTokens.length === 0 || queryTokens.every((token) => haystack.includes(token));
        item.hidden = !hit;
        if (hit) visible += 1;
      });

      if (searchCount) searchCount.textContent = `총 ${visible}건`;
    }

    searchInput.addEventListener("input", applySearch);
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") event.preventDefault();
    });

    if (clearButton) {
      clearButton.addEventListener("click", () => {
        searchInput.value = "";
        applySearch();
        searchInput.focus();
      });
    }

    applySearch();
  }

  function initCardLinks() {
    $$('[data-card-href]').forEach((card) => {
      if (card.dataset.cardBound === "true") return;
      card.dataset.cardBound = "true";
      card.classList.add("is-card-link");
      card.setAttribute("tabindex", "0");
      card.addEventListener("click", (event) => {
        if (event.target.closest("a, button, input, select, textarea")) return;
        location.href = card.dataset.cardHref;
      });
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          location.href = card.dataset.cardHref;
        }
      });
    });
  }

  function ensureBackToTop() {
    if ($("#backToTopButton")) return;

    const cfg = CONFIG.topButton || {};
    const button = document.createElement("button");
    button.id = "backToTopButton";
    button.className = "back-to-top no-print";
    button.type = "button";
    button.setAttribute("aria-label", cfg.ariaLabel || "페이지 위로 이동");
    button.textContent = cfg.label || "위로";
    document.body.appendChild(button);

    button.addEventListener("click", () => {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (_) {
        window.scrollTo(0, 0);
      }
    });

    const showAfter = Number(cfg.showAfter || 320);
    const toggle = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop || 0;
      button.classList.toggle("is-visible", y > showAfter);
    };

    window.addEventListener("scroll", toggle, { passive: true });
    window.addEventListener("resize", toggle);
    toggle();
  }

  function init() {
    setDocumentMetadata();
    renderHeader();
    renderHero();
    renderQuickNav();
    renderFooter();
    bindCopyButtons();
    bindPrintButtons();
    initLegacyYear();
    initSearch();
    initCardLinks();
    ensureBackToTop();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
