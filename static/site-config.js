/* static/site-config.js
 * 사이트 전체에서 반복되는 제목, 메뉴, 페이지 상단 문구, 목차, 푸터 문구를 한 곳에서 관리합니다.
 * 개별 HTML은 body의 data-page-key만 지정하고, 상단 헤더·페이지 히어로·목차·푸터는 site.js가 이 설정을 읽어 렌더링합니다.
 */
window.NEULBOM_SITE_CONFIG = {
  site: {
    name: "업무천재 고주무관의 늘봄학교 실무 가이드",
    shortName: "고",
    titleSuffix: "업무천재 고주무관",
    homeHref: "/",
    homeAriaLabel: "늘봄학교 실무 가이드 홈",
    description: "문서등록대장으로 업무 공부하는 방법, 늘봄지원실장·늘봄학교전담사 역량 강화 연수 제안서, 늘봄 운영 관련 행정·회계 업무 처리 가이드를 모은 비공식 실무 보조 사이트입니다."
  },

  navigation: [
    { key: "study-method", label: "업무 공부", href: "/study-method/" },
    { key: "training-proposal", label: "연수 제안", href: "/training-proposal/" },
    { key: "admin-accounting-guide", label: "행정·회계", href: "/admin-accounting-guide/" },
    { key: "references", label: "근거자료", href: "/references/" }
  ],

  pages: {
    home: {
      browserTitle: "늘봄학교 실무 가이드 | 업무천재 고주무관",
      footerLabel: "비공식 실무 보조 사이트",
      hero: {
        type: "home",
        kicker: "Gangwon Neulbom Practical Site",
        titleHtml: "늘봄업무,<br />자료 확인부터 완성자료 제출까지",
        lead: "늘봄 관련 내용만 분리한 독립 사이트입니다. 업무 공부 방법, 늘봄지원실장·전담사 실무연수 제안서, 행정·회계 처리 가이드를 세 가지 트랙으로 구성했습니다.",
        image: "/static/alien.jpg",
        actions: [
          { label: "세 가지 구성 보기", href: "#modules", variant: "primary" },
          { label: "업무 경계 보기", href: "#boundary", variant: "ghost" },
          { label: "통합 검색", href: "#search", variant: "ghost" }
        ]
      },
      quickNav: {
        ariaLabel: "빠른 이동",
        items: [
          { label: "사이트 구성", href: "#modules" },
          { label: "업무 경계", href: "#boundary" },
          { label: "통합 검색", href: "#search" },
          { label: "근거자료", href: "#references" },
          { label: "배포 메모", href: "#deploy" }
        ]
      }
    },

    "study-method": {
      browserTitle: "업무 공부하는 방법 | 늘봄학교 실무 가이드",
      footerLabel: "업무 공부하는 방법",
      hero: {
        breadcrumb: "업무 공부하는 방법",
        kicker: "Track 01 · Self Study",
        title: "업무 공부하는 방법",
        lead: "목표는 구두로 다시 설명받는 것이 아니라, 담당자가 스스로 근거를 찾고 전년도 최종본을 확인한 뒤 행정실에는 회계처리 가능한 완성자료를 제출하게 만드는 것입니다.",
        actions: [
          { label: "인쇄하기", type: "button", variant: "ghost", attrs: { "data-print": "" } },
          { label: "행정·회계 가이드로 이동", href: "/admin-accounting-guide/", variant: "primary" }
        ],
        toc: [
          { label: "기본 원칙", href: "#principle" },
          { label: "확인 자료", href: "#sources" },
          { label: "문서등록대장 검색", href: "#records-search" },
          { label: "질문 양식", href: "#question-template" },
          { label: "4주 계획", href: "#four-weeks" },
          { label: "월별 루틴", href: "#monthly-routine" },
          { label: "자기점검표", href: "#checklist" }
        ]
      }
    },

    "training-proposal": {
      browserTitle: "역량 강화 연수 제안서 | 늘봄학교 실무 가이드",
      footerLabel: "역량 강화 연수 제안서",
      hero: {
        breadcrumb: "역량 강화 연수 제안서",
        kicker: "Track 02 · Training Proposal",
        title: "늘봄지원실장 및 늘봄학교전담사 역량 강화 연수 제안서",
        lead: "연수는 정책 설명회가 아니라, 늘봄지원실이 행정실에 회계처리 가능한 완성자료를 제출할 수 있게 만드는 실습형 연수여야 합니다.",
        actions: [
          { label: "인쇄하기", type: "button", variant: "ghost", attrs: { "data-print": "" } },
          { label: "요청 문구 복사", type: "button", variant: "primary", attrs: { "data-copy-target": "officialRequest" } }
        ],
        toc: [
          { label: "핵심 방향", href: "#direction" },
          { label: "필수 주제", href: "#topics" },
          { label: "대상별 교육", href: "#by-target" },
          { label: "초3 지원", href: "#grade3" },
          { label: "컨설팅", href: "#consulting" },
          { label: "요청 문구", href: "#request-text" }
        ]
      }
    },

    "admin-accounting-guide": {
      browserTitle: "행정·회계 업무 가이드 | 늘봄학교 실무 가이드",
      footerLabel: "행정·회계 업무 가이드",
      hero: {
        breadcrumb: "행정·회계 업무 가이드",
        kicker: "Track 03 · Admin & Accounting",
        title: "늘봄 업무 처리 시 필요한 행정·회계 업무 가이드",
        lead: "행정실이 바로 회계처리할 수 있도록 늘봄지원실에서 완성해야 할 자료의 기준을 정리했습니다. 계약·징수·환불·지급은 근거, 대상, 금액, 증빙, 결재선이 핵심입니다.",
        actions: [
          { label: "인쇄하기", type: "button", variant: "ghost", attrs: { "data-print": "" } },
          { label: "징수요구 예시 복사", type: "button", variant: "primary", attrs: { "data-copy-target": "feeTemplate" } }
        ],
        toc: [
          { label: "업무 구분", href: "#roles" },
          { label: "운영계획·예산", href: "#plan-budget" },
          { label: "계약 요구", href: "#contract" },
          { label: "수강료 징수", href: "#fee-collection" },
          { label: "초3 지원", href: "#grade3" },
          { label: "환불", href: "#refund" },
          { label: "강사료 지급", href: "#instructor-payment" },
          { label: "결재·공람", href: "#approval" },
          { label: "최종점검", href: "#final-check" }
        ]
      }
    },

    references: {
      browserTitle: "근거자료 | 늘봄학교 실무 가이드",
      footerLabel: "근거자료",
      hero: {
        breadcrumb: "근거자료",
        kicker: "Reference Documents",
        title: "근거자료",
        lead: "사이트 내용의 근거로 사용한 늘봄·방과후·학교회계 관련 자료입니다. 최종 판단은 원문 공문과 학교 자체 운영계획을 우선합니다.",
        actions: [
          { label: "인쇄하기", type: "button", variant: "ghost", attrs: { "data-print": "" } },
          { label: "다운로드 폴더 페이지", href: "/file-download/docs/", variant: "primary" }
        ]
      }
    },

    "not-found": {
      browserTitle: "페이지를 찾을 수 없습니다 | 늘봄학교 실무 가이드",
      footerLabel: "404",
      hero: {
        breadcrumb: "404",
        kicker: "404",
        title: "페이지를 찾을 수 없습니다.",
        lead: "주소를 확인하거나 메인으로 돌아가 필요한 자료를 다시 선택해 주세요.",
        actions: [
          { label: "메인으로 돌아가기", href: "/", variant: "primary" },
          { label: "업무 공부", href: "/study-method/", variant: "ghost" },
          { label: "연수 제안", href: "/training-proposal/", variant: "ghost" },
          { label: "행정·회계 가이드", href: "/admin-accounting-guide/", variant: "ghost" }
        ]
      }
    }
  },

  footer: {
    brand: "늘봄학교 실무 허브",
    note: "비공식 실무 보조 사이트",
    trustMessage: "최종 기준은 원문 공문, 학교 자체 운영계획, 계약서, 교육지원청 안내를 우선합니다."
  },

  topButton: {
    label: "위로",
    ariaLabel: "페이지 위로 이동",
    showAfter: 320
  }
};
