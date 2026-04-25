# 늘봄학교 실무 가이드

새 도메인에 바로 올릴 수 있는 정적 사이트 소스입니다. 기존 `/static/style.css` 디자인 시스템을 기준으로 UI를 통일했고, 공통 헤더·히어로·목차·푸터는 `static/site-config.js`와 `static/site.js`에서 관리합니다.

## 구성

```text
.
├─ index.html
├─ study-method/index.html
├─ training-proposal/index.html
├─ admin-accounting-guide/index.html
├─ references/index.html
├─ file-download/docs/index.html
├─ static/
│  ├─ style.css
│  ├─ site-config.js
│  ├─ site.js
│  ├─ alien.jpg
│  └─ favicon.ico
├─ 404.html
├─ CNAME
├─ CNAME.example
├─ robots.txt
├─ sitemap.xml
├─ sitemap.xml.example
└─ FILE-MANIFEST.md
```

## 수정 방법

### 사이트명, 메뉴, 페이지 상단 문구 수정

`static/site-config.js`만 수정합니다.

```js
window.NEULBOM_SITE_CONFIG = {
  site: { ... },
  navigation: [ ... ],
  pages: { ... }
};
```

### 개별 페이지 연결 기준

각 HTML의 `body data-page-key` 값이 `site-config.js`의 `pages` 키와 같아야 합니다.

```html
<body class="brand-site" data-page-key="study-method">
```

```js
pages: {
  "study-method": { ... }
}
```

### UI 기준

새로 추가한 그리드, 카드, 페이지 히어로, 브레드크럼, 위로 버튼 보정 CSS는 `/static/style.css` 맨 아래의 `Neulbom standalone fixes` 섹션에 있습니다.

## 배포

GitHub Pages 기준으로는 저장소 루트에 그대로 업로드하면 됩니다. 현재 `CNAME`은 다음 도메인으로 되어 있습니다.

```text
neulbomworkhaey.co.kr
```

다른 도메인에 올릴 경우 `CNAME`과 `sitemap.xml`의 도메인을 교체하세요.

## Google Analytics

각 HTML `<head>`에 GA 태그가 들어 있습니다. 측정 ID를 바꾸려면 HTML의 `G-566QGFH7NZ`를 새 측정 ID로 교체하세요.

## 주의

본 사이트는 비공식 실무 보조 자료입니다. 최종 기준은 원문 공문, 학교 자체 운영계획, 계약서, 교육지원청 안내를 우선합니다.
