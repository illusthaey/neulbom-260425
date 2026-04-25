# 늘봄학교 행정·회계 실무 허브

늘봄 관련 내용만 분리한 독립 정적 사이트입니다. 별도 빌드 과정 없이 HTML/CSS/JS 파일을 새 도메인에 업로드하면 됩니다.

## 구성

```text
/
├─ index.html
├─ study-method/index.html
├─ training-proposal/index.html
├─ admin-accounting-guide/index.html
├─ references/index.html
├─ file-download/docs/
│  ├─ 2025-neulbom-work-scope.pdf
│  ├─ 2026-the-jarram-neulbom-plan.pdf
│  ├─ 2026-grade3-afterschool-support-guide.pdf
│  ├─ 2026-gangwon-neulbom-guide.pdf
│  ├─ neulbom-work-division-detail.pdf
│  ├─ 2026-the-jarram-afterschool-plan.pdf
│  ├─ 2026-school-administration-handbook.pdf
│  ├─ 2026-school-budget-guideline.pdf
│  └─ gangwon-public-school-accounting-rules.pdf
├─ static/style.css
├─ static/site.js
├─ static/alien.jpg
├─ static/favicon.ico
├─ 404.html
├─ robots.txt
├─ CNAME.example
└─ sitemap.xml.example
```

## 배포 방법

### GitHub Pages

1. 이 폴더의 내용을 새 저장소 루트에 업로드합니다.
2. `CNAME.example` 파일명을 `CNAME`으로 바꾸고 안의 `example.com`을 실제 도메인으로 변경합니다.
3. `sitemap.xml.example` 파일명을 `sitemap.xml`으로 바꾸고 `https://example.com`을 실제 도메인으로 변경합니다.
4. GitHub Pages를 `main` 브랜치 루트로 설정합니다.

### Cloudflare Pages / Netlify

1. 이 폴더를 그대로 업로드합니다.
2. Build command는 비워 둡니다.
3. Publish directory는 업로드한 루트 폴더입니다.
4. 도메인을 연결한 후 `sitemap.xml.example`을 실제 도메인으로 수정합니다.

## 운영 메모

- Google Analytics 등 추적 스크립트는 넣지 않았습니다. 새 도메인용 측정 ID가 생기면 각 HTML의 `<head>`에 별도로 추가하세요.
- PDF 파일을 갱신할 때는 기존 파일명을 유지하면 내부 링크를 수정하지 않아도 됩니다.
- 이 사이트는 강원특별자치도교육청 기준의 비공식 실무 보조 자료입니다. 최종 기준은 해당 연도 공문, 학교 자체 운영계획, 학교운영위원회 심의자료, 계약서, K-에듀파인 처리 기준, 행정실 검토 결과를 우선합니다.
