(function () {
  if (window.__GO_OFFICER_STANDARD_FOOTER_LOADED__) return;
  window.__GO_OFFICER_STANDARD_FOOTER_LOADED__ = true;

  const FALLBACK = {
    masterBrand: "업무천재 고주무관에게 칼퇴를!",
    editionTitle: "자기의 일은 스스로 하자.",
    operatorName: "업무천재 고주무관",
    contactEmail: "edusproutcomics@naver.com",
    trustMessage: "이 웹페이지는 도교육청에서 배포한 게 아닌 비공식 사설 페이지입니다. 최종 기준은 공문·지침·계약서 등 공식 자료를 우선합시다.",
    affectionLine: "방해되지 마라.",
    playfulAlias: "업무천재 고주무관",
    routes: { home: "/", notice: "/notice/", faq: "/faq/", contact: "/contact/" }
  };

  function mergeBrand(raw) {
    const cfg = raw || {};
    return Object.assign({}, FALLBACK, cfg, {
      routes: Object.assign({}, FALLBACK.routes, cfg.routes || {})
    });
  }

  function loadBrand(done) {
    if (window.SITE_BRAND) {
      done(mergeBrand(window.SITE_BRAND));
      return;
    }

    const existing = document.querySelector('script[data-brand-config-loader="true"]');
    if (existing) {
      existing.addEventListener("load", function onLoad() {
        existing.removeEventListener("load", onLoad);
        done(mergeBrand(window.SITE_BRAND));
      });
      existing.addEventListener("error", function onError() {
        existing.removeEventListener("error", onError);
        done(mergeBrand(FALLBACK));
      });
      return;
    }

    const script = document.createElement("script");
    script.src = "/static/brand-config.js";
    script.async = false;
    script.setAttribute("data-brand-config-loader", "true");
    script.addEventListener("load", function () { done(mergeBrand(window.SITE_BRAND)); });
    script.addEventListener("error", function () { done(mergeBrand(FALLBACK)); });
    document.head.appendChild(script);
  }

  function isHomePage() {
    const path = String(location.pathname || "/").toLowerCase();
    return path === "/" || path === "/index.html" || path === "/index.htm";
  }

  function toElement(html) {
    const tpl = document.createElement("template");
    tpl.innerHTML = html.trim();
    return tpl.content.firstElementChild;
  }

  function removeLegacyUi() {
    document.querySelectorAll(".home-link-wrap, footer.site-footer, footer.simple-footer").forEach(function (node) {
      node.remove();
    });
    document.querySelectorAll("#brandBackToTop, #back-to-top-fab, #back-to-top, #backToTop, .back-to-top, .scroll-top, .go-top, .btn-top").forEach(function (node) {
      node.remove();
    });
  }

  function injectHomeLink(cfg) {
    if (isHomePage()) return;
    const link = toElement([
      '<div class="home-link-wrap" data-standard-home-link="true">',
      '  <a class="btn-home" href="' + (cfg.routes.home || "/") + '">메인으로 돌아가기</a>',
      '</div>'
    ].join(""));
    document.body.appendChild(link);
  }

  function injectFooter(cfg) {
    const year = new Date().getFullYear();
    const html = [
      '<footer class="site-footer" data-standard-footer="true">',
      '  <div class="shell">',
      '    <p class="footer-brand-line"><span class="footer-brand-name">© ' + year + '. ' + cfg.masterBrand + '</span><span class="footer-brand-pill">' + cfg.playfulAlias + '</span></p>',
      '    <p>' + cfg.editionTitle + ' · 운영자: ' + cfg.operatorName + ' · Contact: ' + cfg.contactEmail + '</p>',
      '    <p>' + cfg.trustMessage + '</p>',
      '    <p>' + cfg.affectionLine + '</p>',
      '  </div>',
      '</footer>'
    ].join("");
    document.body.appendChild(toElement(html));
  }

  function ensureBackToTop() {
    const styleId = "brand-back-to-top-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = [
        "@media print{#brandBackToTop{display:none !important;}}",
        "#brandBackToTop{position:fixed;right:16px;bottom:16px;z-index:2147483646;display:none;}",
        "#brandBackToTop.is-visible{display:block;}",
        "#brandBackToTop .btn{border-radius:999px;padding:10px 14px;box-shadow:0 10px 24px rgba(0,0,0,.14);}"
      ].join("");
      document.head.appendChild(style);
    }

    const wrap = toElement('<div id="brandBackToTop" aria-label="페이지 상단으로 이동"><button type="button" class="btn">위로</button></div>');
    document.body.appendChild(wrap);

    const button = wrap.querySelector("button");
    button.addEventListener("click", function () {
      try { window.scrollTo({ top: 0, behavior: "smooth" }); }
      catch (_) { window.scrollTo(0, 0); }
    });

    const toggle = function () {
      const y = window.pageYOffset || document.documentElement.scrollTop || 0;
      wrap.classList.toggle("is-visible", y > 240);
    };

    window.addEventListener("scroll", toggle, { passive: true });
    window.addEventListener("resize", toggle);
    window.addEventListener("orientationchange", toggle);
    toggle();
  }

  function init(cfg) {
    removeLegacyUi();
    injectHomeLink(cfg);
    injectFooter(cfg);
    ensureBackToTop();
  }

  function boot() { loadBrand(init); }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
