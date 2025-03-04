## 📢프로젝트 소개

Hash Cafe (해시카페)는 사용자의 현재 위치를 기반으로 주변 카페를 지도 위에 마커로 표시해, 손쉽게 인근 카페 정보를 탐색할 수 있는 애플리케이션입니다. 마커를 클릭하면 해당 카페의 상호, 주소, 전화번호 등 상세 정보를 확인할 수 있음과 동시에 사용자는 태그 선택으로 자신이 그 카페에 느낀 인상을 간편하게 후기로 남길 수 있습니다. 더하여, 댓글을 통해 추가 후기를 남길 수도 있습니다.
각 카페는 사용자들에게 선택된 상위 4개의 태그까지 노출됩니다. 그를 통해 해당 카페의 특장점을 한눈에 파악할 수 있습니다.
가고 싶은 카페를 북마크하여 저장할 수 있습니다.
더하여 마이페이지에서 프로필를 관리 할 수 있으며, 자신이 북마크한 카페와 어떤 태그를 가장 많이 선택하였는지 조회할 수 있어 관심사 파악에 용이합니다.
이처럼 해시카페는 사용자가 주변 카페를 쉽고 편리하게 발견하고, 경험을 소통할 수 있도록 도와줍니다.

## 📅프로젝트 기간

- **2025.02.26 ~ 2025.03.05**

## [프로젝트 계기]

- 혼자 공부하거나 친구와 이야기를 나누고, 아이와 함께 외출하는 등 다양한 이유로 카페를 방문하지만, 방문한 공간이 기대와 다르거나 노키즈 정책 등으로 불편을 겪는 경우가 많았습니다.
- 사용자가 사전에 카페의 분위기와 편의 정보를 쉽게 확인할 수 있도록 플랫폼을 개발하게 되었습니다.
- **사용자 위치를 기반**으로 주변 카페의 상호, 주소, 전화번호 등의 기본 정보와 함께, 사용자들이 간편하게 **태그를 선택해 인상을 남기고,** 후기를 댓글로 추가할 수 있는 기능을 제공합니다.
- 이를 통해, 각 카페의 특색을 미리 파악하여 **본인에게 맞는 공간을 선택하는 데 도움**을 주고자 합니다.

## 💏멤버 소개

<table>
  <tbody>
    <tr>
      <td width="300px" align="center">
        <a href="https://github.com/ijooha16">
        <img src="https://avatars.githubusercontent.com/u/169261852?v=4" width="80" alt="Juha Yoon"/>
        <br />
        <sub><b>윤주하</b></sub>
        </a>
        <br />
      </td>
         <td width="300px" align="center">
        <a href="https://github.com/noodlewd">
        <img src="https://avatars.githubusercontent.com/u/115952622?v=4" width="80" alt="Dongwoo Kim"/>
        <br />
        <sub><b>김동우</b></sub>
        </a>
        <br />
      </td>
      <td width="300px" align="center">
        <a href="https://github.com/PureunKang">
        <img src="https://avatars.githubusercontent.com/u/144876018?v=4" width="80" alt="Pureun Kang"/>
        <br />
        <sub><b>강푸른</b></sub>
        </a>
        <br />
      </td>
    </tr>
    <tr>
      <td align="center">
        <b>자기 맡은 분야 작성</b> <br/>
        <b>홈 페이지 코드 총괄</b> <br/>
      </td>
      <td align="center">
        <b>자기 맡은 분야 작성</b> <br/>
        <b>마이페이지</b> <br/>
      </td>
      <td align="center">
        <b>자기 맡은 분야 작성</b> <br/>
        <b>스플레쉬 페이지</b> <br/>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/123456466">
        <img src="https://avatars.githubusercontent.com/u/190455341?v=4" width="80" alt="Jiseon Choi"/>
        <br />
        <sub><b>최지선</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <a href="https://github.com/Sumin-Lee12">
        <img src="https://avatars.githubusercontent.com/u/189125496?v=4" width="80" alt="Sumin Lee"/>
        <br />
        <sub><b>이수민</b></sub>
        </a>
        <br />
      </td>
    </tr>
    <tr>
      <td align="center">
        <b>자기 맡은 분야 작성</b> <br/>
        <b>로그인 및 회원가입 페이지</b> <br/>
      </td>
      <td align="center">
        <b>자기 맡은 분야 작성</b> <br/>
        <b>검색 페이지</b> <br/>
      </td>
      <td align="center">
    </tr>
  </tbody>
</table>

## 🛠 **기술스택**

### 📌 **프로그래밍 언어 및 프레임워크**

- **JavaScript**
- **React**

### 🎨 **UI 프레임워크 및 스타일링**

- **Tailwind CSS**
- **React-icons**
- **React-Toasitify**

### ✅ **코드 품질 및 포맷팅**

- **ESLint**
- **Prettier**

### 🗄️ **백엔드 및 데이터베이스**

- **Supabase (PostgreSQL 기반)**
  - **데이터베이스:** 사용자 정보, 태그, 댓글, 북마크 저장 및 관리
  - **인증:** 사용자 로그인 및 회원가입 관리
  - **Storage:** 프로필 이미지 등 파일 업로드 관리

### 🗃️ **상태 관리 및 데이터 패칭**

- **Zustand:** 클라이언트 상태 관리
- **TanStack Query:** 서버 상태 관리 및 데이터 패칭

### 📍 **외부 API**

- **카카오맵 API:** 지도 및 위치 기반 서비스
- **네이버 이미지 검색 API:** 카페 이미지 불러오기

### 🗃️ **버전 관리**

- **Git/GitHub**

### 🚀 **배포**

- **Vercel**

## 📝 **주요 기능**

### 📝 태그 선택 및 각 카페의 대표 태그 조회, 태그별 카페 조회

- 사용자는 지도 상의 마커를 클릭하여 해당 카페의 상세 정보를 확인할 수 있습니다. (상호, 주소, 전화번호 등)
- 각 카페에는 **대표 태그**가 함께 표시되어, 카페의 특성을 직관적으로 파악할 수 있습니다.
- **제공된 태그를 클릭하여**자신이 느낀 인상을 간편하게 후기로 남길 수 있으며, 인기 태그는 실시간으로 업데이트됩니다.

### 📝 북마크 및 댓글 생성

- 사용자는 마음에 드는 카페를 북마크하여 언제든지 쉽게 다시 조회할 수 있습니다.
- 댓글을 통해 추가 후기를 남길 수 있어, 활발한 소통이 가능합니다.

### 🗂️ 태그별 카페 조회

- ‘**혼자 공부하기 좋은**, **좌석 간격이 넓은**, **떠들기 좋은**, **영유아와 함께 갈 수 있는**, **강아지와 함께 갈 수 있는**, **오래 있기에 좋은**, **커피 이외의 음료도 다양한**, **디저트에 특화된**, **조명이 어두운**, **화장실이 깨끗한**’ 태그를 제공합니다.
- 사용자가 관심있는 태그를 선택하여 해당 후기가 많은 카페를 모아 볼 수 있습니다.

### 🧑‍💻 마이페이지

- 프로필 사진, 닉네임 등 개인 정보를 수정할 수 있습니다.
- 사용자가 북마크한 카페와 자신이 남긴 후기를 한눈에 확인하고 관리할 수 있는 대시보드를 제공합니다.

## 📁 **프로젝트 구조**

├── api
├── assets
├── 📁components
│ ├── 📁comment # 댓글 관련 컴포넌트
│ ├── 📁common # 재사용 가능한 공통 컴포넌트
│ └── 📁layout # 레이아웃 관련 컴포넌트
├── 📁data # 앱에서 사용할 정적 데이터
├── 📁pages # 라우트에 따른 개별 페이지 컴포넌트
├── 📁routes # 앱의 라우팅, 프로텍트라우트 설정 파일
├── 📁services # API 호출 및 외부 서비스와 통신하는 로직
├── 📁 stores # Zustand를 활용한 전역 상태 관리
├── 📁 tanstack # TanStack Query 관련 설정
│ ├── 📁mutations # 데이터 변경 (생성/수정/삭제) 관련 로직
│ └── 📁queries # 데이터 조회 및 캐싱 관련 로직
├──📁 supabase # Supabase 클라이언트 설정 및 초기화 코드
├──📁 App.jsx # 애플리케이션 메인 컴포넌트
└──📁 main.jsx # 애플리케이션 렌더링 설정

## 와이어 프레임

(./assets/images/와이어프레임.jpeg)

## ERD

(./assets/images/erd-diagram.jpeg)
