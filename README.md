# 포트폴리오 웹사이트

Next.js와 Framer Motion을 활용한 인터랙티브한 프론트엔드 개발자 포트폴리오 웹사이트입니다.

## 🌟 주요 특징

### 🎨 동적 테마 시스템

- **스크롤 기반 테마 변경**: Work Experience 섹션에서 자동으로 다크 테마로 전환
- **부드러운 전환 효과**: 배경, 텍스트, 헤더 색상이 자연스럽게 변화
- **섹션별 최적화**: 각 섹션에 맞는 색상 테마 적용

### ✨ 고급 애니메이션

- **Framer Motion 기반**: 부드럽고 성능 최적화된 애니메이션
- **스크롤 인터랙션**: 이미지 그리드의 패럴랙스 효과와 카드 분산 애니메이션
- **호버 효과**: 마우스 인터랙션에 반응하는 세련된 효과
- **반복 가능한 애니메이션**: 스크롤할 때마다 새롭게 보이는 애니메이션

### 📱 반응형 디자인

- **모바일 최적화**: 모든 디바이스에서 완벽한 사용자 경험
- **Tailwind CSS**: 일관성 있는 디자인 시스템
- **성능 최적화**: GPU 가속을 통한 부드러운 애니메이션

### 🔗 상세 프로젝트 문서

- **Notion 연동**: 각 프로젝트의 핵심 기능별 상세 문서 링크
- **인터랙티브 링크**: 특정 기술이나 기능에 대한 개별 문서 제공
- **실무 경험 상세화**: 구체적인 성과와 기술적 도전 과제 소개

## 🛠 기술 스택

### Frontend

- **Next.js 14** - React 기반 풀스택 프레임워크
- **React 18** - 최신 React 기능 활용
- **TypeScript** - 타입 안전성과 개발 효율성
- **Tailwind CSS** - 유틸리티 퍼스트 CSS 프레임워크

### 애니메이션 & 인터랙션

- **Framer Motion** - 고급 애니메이션 라이브러리
- **Lucide React** - 아이콘 시스템

### UI 컴포넌트

- **Shadcn/ui** - 재사용 가능한 컴포넌트 라이브러리
- **Radix UI** - 접근성을 고려한 기본 컴포넌트

## 🎯 주요 섹션

### 1. Home

- **개인 소개**: 프론트엔드 개발자로서의 철학과 비전
- **이미지 그리드**: 개인적인 취미와 라이프스타일을 보여주는 인터랙티브 갤러리
- **스크롤 애니메이션**: 패럴랙스와 회전 효과가 적용된 동적 이미지 그리드

### 2. Work Experience

- **다크 테마**: 프로페셜한 분위기의 어두운 배경
- **프로젝트별 상세 링크**: 각 기능의 구현 과정을 담은 Notion 문서 연결
- **5개 주요 프로젝트**: CIS, KICE, 한국쌀가공식품협회, 삼성화재, KRFA 홈페이지

### 3. Featured Projects

- **개인 블로그**: Next.js 15와 Supabase를 활용한 현대적인 블로그 플랫폼
- **기술 스택 시각화**: 각 프로젝트에 사용된 기술들을 태그로 표시
- **라이브 링크**: 실제 배포된 프로젝트 바로가기

### 4. Skills & Expertise

- **카테고리별 정리**: Languages, Frameworks, UI Libraries, Tools
- **반복 애니메이션**: 스크롤할 때마다 새롭게 나타나는 스킬 카드

### 5. Education

- **학습 이력**: 코드스테이츠 부트캠프, 재직자 교육과정
- **프로젝트 경험**: 실무형 프로젝트와 협업 경험

## 🎨 디자인 시스템

### 색상 팔레트

- **Light Theme**: Amber 계열 (#f5f1eb, #92400e)
- **Dark Theme**: Slate 계열 (#0f172a, #1e293b, #334155)
- **Accent**: Amber-400 (#fbbf24)

### 타이포그래피

- **Primary Font**: Inter (시스템 폰트 폴백)
- **Weight**: Light (300), Normal (400), Medium (500)

### 애니메이션 원칙

- **Duration**: 0.2s~0.8s (용도에 따라 조절)
- **Easing**: easeOut 중심의 자연스러운 움직임
- **Performance**: GPU 가속 (`willChange`, `backfaceVisibility`) 적용

## 🔧 성능 최적화

### 애니메이션 최적화

```typescript
// GPU 가속 적용
style={{
  willChange: 'transform',
  backfaceVisibility: 'hidden',
  perspective: '1000px'
}}
```

### 스크롤 성능

- **Throttled Scroll**: 스크롤 이벤트 최적화
- **Viewport Detection**: 화면에 보이는 요소만 애니메이션 실행
- **Early Detection**: 500px 미리 감지하여 자연스러운 테마 전환

### 이미지 최적화

- **적절한 비율**: aspect-ratio 활용
- **Object-fit**: contain/cover 적절한 선택
- **Lazy Loading**: Next.js Image 컴포넌트 활용 고려

## 📱 반응형 브레이크포인트

```css
- Mobile: ~ 768px
- Tablet: 768px ~ 1024px
- Desktop: 1024px ~
```

## 🌐 배포

이 프로젝트는 Vercel에 최적화되어 있으며, 다음 플랫폼에서 배포 가능합니다:

- **Vercel** (권장)
- **Netlify**
- **GitHub Pages**

## 📝 라이선스

© 2025 KIM JANGKYUM. All rights reserved.

---

**개발자**: 김장겸 (KIM JANGKYUM)  
**이메일**: [codedot28@gmail.com]  
**GitHub**: [https://github.com/JangKyum]  
**Blog**: [https://codedot-blog.vercel.app/]
