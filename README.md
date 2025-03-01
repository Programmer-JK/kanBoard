# Kanban Board Project

간단하고 효율적인 칸반 보드 프로젝트입니다. 프로젝트 관리와 작업 진행 상황을 시각적으로 추적할 수 있습니다.

## 목차

- [프로젝트 개요](#프로젝트-개요)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [설치 및 실행](#설치-및-실행)
- [구현 상세](#구현-상세)

## 프로젝트 개요

이 프로젝트는 직관적인 드래그 앤 드롭 기능을 갖춘 칸반 보드를 구현한 것으로, 사용자가 태스크를 효과적으로 관리할 수 있도록 도와줍니다.

## 주요 기능

### 기본 기능

- ✅ 프로젝트 제목 수정
- ✅ 컬럼 추가 및 삭제 (기본 컬럼 보호)
- ✅ 카드 관리 (추가/수정/삭제)
- ✅ 드래그 앤 드롭으로 카드 이동
- ✅ 로컬 스토리지를 통한 상태 저장
- ✅ 반응형 디자인 지원

### 추가 기능

- ✅ 태그 관리 시스템 (8가지 색상 지원)
- ✅ 애니메이션 효과
  - 드래그 시 부드러운 이동 (모바일)
- ✅ 페이지 배포
  - nginx 서버 배포 (http://81.testdomain.co.kr/kanboard/)

## 기술 스택

- React + TypeScript + Zustand
- Vite
- tailwindCSS (반응형 디자인)
- Local Storage

## 프로젝트 구조

```
src/
├── assets/              # 정적 자원 (이미지, 글로벌 CSS)
├── component/
│   ├── add_card/       # 카드 추가 컴포넌트
│   ├── board/          # 보드 관련 컴포넌트
│   ├── card/           # 카드 컴포넌트
│   ├── card_info-modal/# 카드 정보 모달
│   ├── color-picker/   # 색상 선택기
│   ├── header/         # 헤더 컴포넌트
│   ├── modal/          # 모달 관련 컴포넌트
│   └── pending-card/   # 대기 상태 카드
├── const/              # 상수 정의
├── store/              # 상태 관리
├── type/               # TypeScript 타입 정의
└── util/               # 유틸리티 함수
```

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 린트 검사
npm run lint

# 빌드 프리뷰
npm run preview
```

## 구현 상세

### 상태 관리 구조

```typescript
projectBoard: {
  name: "",
  columns: {
    pending: [],
    planned: [],
    ongoing: [],
    completed: [],
  },
}
```

### 작업 상태 구분

- pending: 컬럼에만 있는 경우
- planned: 시작 전
- ongoing: 진행 중
- completed: 완료

### 사용자 인터페이스

- 카드 클릭 시 수정/삭제 팝업 표시
- 직관적인 드래그 앤 드롭 인터페이스
- 8가지 색상을 지원하는 태그 시스템

### 반응형 디자인

- 모바일, 태블릿, 데스크톱 해상도 지원
- 자연스러운 UI 레이아웃 조정
