# 📊 TrendSpot
> **소상공인을 위한 스마트 창업 인사이트 플랫폼**
> 
<div align="center">
  <img width="982" height="412" alt="TrendSpot Main Image" src="https://github.com/user-attachments/assets/b8291e22-79ab-47e0-a7a9-d029af510b4c" />
</div>

---

## 🌟 프로젝트 개요

<div align="center">
  <img src="https://github.com/user-attachments/assets/28ae8aa6-ab33-46b7-97b0-680146afc638" alt="Persona_image" width="80%" />
</div>

<br/>

> **TrendSpot**은 소상공인의 성공적인 창업을 위해, **TrendCore 팀**이 직접 데이터를 수집하고 분석하여 만든 **데이터 기반 창업 인사이트 플랫폼**입니다.

---

## 🧭 왜 TrendSpot인가요?

✅ **막연한 직감은 이제 그만 ❌**  
데이터가 말하는 소비 흐름을 바탕으로, 정확한 창업 전략을 설계하세요!

✅ **누구나 이해할 수 있는 시각화된 인사이트**  
복잡한 수치를 차트와 그래프로 직관적으로 제공합니다!

✅ **지역·업종·기간별 맞춤형 분석**  
2024년 기준 **경기 서부 지역 (부천·안양·광명·시흥)**의 카드 소비 데이터를 활용해 **정확한 시장 파악과 타겟팅**이 가능합니다!

---

## 🌱 이런 분들에게 추천드려요!

- 🏪 처음 창업을 준비하는 예비 사장님  
- 🔁 업종 전환을 고민하는 소상공인  
- 📊 상권과 트렌드 분석이 필요한 마케터

---

## 👥 TrendCore 팀

<div align="center">
  
| **임유진** | **서민지** | **정다빈** | **최홍석** |
| :---: | :---: | :---: | :---: |
| <img width="160px" src="https://avatars.githubusercontent.com/u/156065214?v=4" /> | <img width="160px" src="https://avatars.githubusercontent.com/u/124131845?v=4" /> | <img width="160px" src="https://avatars.githubusercontent.com/u/88383179?v=4"/> | <img width="160px" src="https://avatars.githubusercontent.com/u/129854575?v=4"/> |
| [@imewuzin](https://github.com/imewuzin) | [@menzzi](https://github.com/menzzi) | [@ddddabi](https://github.com/ddddabi) | [@ChatHongPT](https://github.com/ChatHongPT) |

</div>


## ⚒️ Tech Stack

### 🧑‍💻 Frontend
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Recharts](https://img.shields.io/badge/Recharts-FF6384?style=flat&logo=chart.js&logoColor=white)

### 📦 Container & OS
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=flat&logo=ubuntu&logoColor=white)
![VirtualBox](https://img.shields.io/badge/VirtualBox-183A61?style=flat&logo=virtualbox&logoColor=white)

### 🔬 Data Preprocessing
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat&logo=pandas&logoColor=white)
![Google Colab](https://img.shields.io/badge/Colab-F9AB00?style=flat&logo=google-colab&logoColor=white)

### 💾 Database
![MySQL](https://img.shields.io/badge/MySQL-05122A?style=flat&logo=mysql&logoColor=white)
![DBeaver](https://img.shields.io/badge/DBeaver-28a745?style=flat&logo=dbeaver&logoColor=white)

### 🔁 Deployment & CI/CD
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat&logo=github-actions&logoColor=white)

---

## ⛓️ Dataset
행정안전부에서 제공하는 [경기도 지역 카드 소비 데이터셋](https://www.data.go.kr/data/15128475/fileData.do?recommendDataYn=Y#) 중, 2024년 1월부터 12월까지의 데이터를 기반으로 구성되었습니다.
이 데이터는 민간 카드사의 소비 데이터를 바탕으로, 시군구 및 행정동 단위에서 업종별 소비 패턴을 분석할 수 있도록 설계되어 있습니다.

이를 통해 지역별·기간별·업종별 소비 밀집도와 성향을 구체적으로 분석하고, 소상공인이 데이터 기반의 창업 전략을 기획할 수 있는 근거 자료로 활용할 수 있습니다.

---


## 🏗️ System Architecture

<div align="center">
  <img width="800" alt="TrendSpot Architecture" src="https://github.com/user-attachments/assets/866e89fd-421f-4a25-9d3a-65a76067d55c" />
</div>


## 🔹 구성요소 설명

### 🧑‍💻 사용자 인터페이스 (Frontend)
- **React.js** 기반 SPA (Single Page Application)
- 시각화는 **Recharts** 라이브러리를 사용하여 직접 구현

### 📦 개발 환경 (Containerization)
- **VirtualBox** 내의 **Ubuntu**에서 일관된 개발 환경 구성

### 🔬 데이터 전처리 (Preprocessing)
- 데이터 수집 및 정제는 **Google Colab**에서 수행
- Colab에서 전처리된 데이터는 **CSV 형식**으로 저장되어 DB에 Import됨

### 💾 데이터베이스 및 관리
- **MySQL**을 통해 정제된 데이터 저장
- **DBeaver**를 통해 파티셔닝 수행

### 🔁 CI/CD 파이프라인
- **GitHub Actions** 기반 자동화 빌드 및 배포
- 소스 코드 푸시 시 → 빌드 & 배포 자동 실행

---

## 💾 ERD
<div align="center">
  <img width="660" height="417" alt="ERD" src="https://github.com/user-attachments/assets/6fc23a05-1cbc-4c38-b880-a66d2ee51931" />
</div>

### 주요 엔티티
- **Primary Key**: id (고유번호)
- **지역 정보**: city_name (도시 이름)
- **시간 데이터**: tr_date (거래날짜)
- **업종 분류**: category_main, category_sub (주업종, 세부업종)
- **고객 정보**: gender, age_group (성별, 연령대)
- **판매 지표**: sales_amount, sales_count (매출금액, 매출건수)




### **단일 파티셔닝 테이블 (기간 기준)**

1. **분기별 RANGE 파티셔닝 (1월-3월/4월-6월/7월-9월/10월-12월)**
    
    → 거래 월을 기준으로 1년을 **4개의 분기 구간**으로 나누어 파티셔닝.
    
    → 각 분기에 해당하는 데이터만 조회해 성능을 높이고 관리 용이성 확보.
    
2. **월별 RANGE 파티셔닝 (1월 ~ 12월)**
    
    → 월 단위로 범위를 나눈 파티션 구성.
    
    → **시간 순 분석**이나 **월별 통계 처리**에 유리함.
    
3. **월별 HASH 파티셔닝 (1월 ~ 12월)**
    
    → 월(`month_no`) 값을 기반으로 **HASH 함수를 적용**해 12개 파티션에 분산 저장.
    
    → 데이터가 고르게 분포되어 **동시 처리 성능**과 **로드 밸런싱**에 효과적.
---


## 📈 Data Flow

1. **🔄 Data Processing**: Pandas를 활용한 데이터 전처리 및 정제
2. **💾 Data Storage**: MySQL 데이터베이스에 분석 결과 저장
3. **📊 Visualization**: 사용자 친화적인 대시보드로 인사이트 제공


### 🔄 Data Processing

<details>
<summary><h4>✅ 날짜는 SQL 표준에 맞게 변환</h4></summary>

- 기존 형태: `%Y%m%d` (예: 20241001)  
- 변경 형태: `%Y-%m-%d`  
- 이유: DATE 타입 및 SQL 표준에 맞춤

</details>

<details>
<summary><h4>✅ 연령대는 가독성과 분석 용이성을 위해 두 자릿수로 변경</h4></summary>

- 기존: 1, 2, 3... (앞자리만 존재)
- 변경: 10, 20, 30... (뒤에 0을 붙여서 연령대 완성)
- 예: 2 → 20, 3 → 30

</details>

<details>
<summary><h4>✅ 시군구코드 → 지역명으로 매핑</h4></summary>

| 지역  | 컬럼명    | 시군구코드 |
|-------|----------|-----------|
| 부천시 | city_name | 41192    |
| 안양시 | city_name | 41171    |
| 광명시 | city_name | 41210    |
| 시흥시 | city_name | 41390    |

</details>


<details>
<summary><h4>✅ 컬럼명은 가독성을 높여 이해하기 쉽게 변경</h4></summary>

| 기존 컬럼명     | 새로운 컬럼명    | 주석 (한글 설명)   | 예시 데이터    |
|----------------|---------------|----------------|--------------|
| -         | id            | 고유번호       | 1           |
| ta_ymd         | tr_date       | 기준년월일     | 2024-10-01 |
| cty_rgn_no     | city_name     | 시군구코드 → 지역명 | 부천시      |
| card_tpbuz_nm_1 | category_main | 카드사 업종대분류명 | 소매/유통 |
| card_tpbuz_nm_2 | category_sub  | 카드사 업종중분류명 | 건강/기호식품 |
| sex            | gender        | 성별          | F or M    |
| age            | age_group     | 연령별        | 20         |

</details>

<details>
<summary><h4>✅ 특정 업종은 분석에서 제외</h4></summary>

  - 업종 제외 리스트: `의료/건강`, `공공/기업/단체`

</details>


---

## 👌 결과

### 1. 월별 RANGE PARTITION vs 월별 HASH PARTITION
👉 월 기준 범위조회와 해시 파티션의 성능 차이
| 항목        | 월별 RANGE PARTITION | 월별 HASH PARTITION | Non-Partitioned Table |
| :-------- | :----------------: | :---------------: | :-------------------: |
| 3월 단일월 매출 |       3.705s       |        42s        |          36s          |
| 2\~4월 매출  |         13s        |        41s        |          36s          |
| 월별 매출 트렌드 |       1m 59s       |       2m 28s      |         2m 5s         |
| 3월 업종별 매출 |         32s        |       1m 19s      |         1m 4s         |


### 2.  월별 RANGE PARTITION vs 분기 RANGE PARTITION 
👉 범위 조회에서 분기 기준과 월 기준 파티션의 효율성
| 항목        | 월별 RANGE PARTITION | 분기별 RANGE PARTITION | Non-Partitioned Table |
| :-------- | :----------------: | :-----------------: | :-------------------: |
| 1분기 총 매출  |       7.936s       |        7.264s       |          38s          |
| 1월 단일월 매출 |       2.228s       |        7.400s       |          35s          |
| 월별 매출 트렌드 |       1m 26s       |        1m 24s       |         2m 2s         |
| 1분기 학원 매출 |       5.679s       |        7.149s       |          29s          |



### ✅ 결론

- `HASH 파티션`은 모든 상황에서 빠르지 않고, 잘못 쓰면 일반 테이블보다 **오히려 느릴 수 있음**.
- `RANGE 파티션`은 시간 기반 분석에는 훨씬 효율적이며, MySQL이 파티션 프루닝도 잘 함

<details>
  <summary>✅ 언제 <code>HASH</code> 파티셔닝이 유리할까?</summary>

  <br>

  | 상황 | 예시 |
  |------|------|
  | 🎯 **동일한 분포로 데이터를 나눌 때** | 예: `user_id % N`으로 균등 분산 |
  | 🎯 **정확한 파티션 키로 조회할 때** | 예: `WHERE month_no = 3` (정확히 해시 대상 컬럼 필터링) |
  | 🎯 **데이터 양이 많고 병렬 처리 필요할 때** | 파티션별 병렬 쿼리 최적화 가능 |

</details>

---  
## 🖥️ 화면 소개

### 🔐 로그인 화면

<div align="center">
  <img width="800" alt="Login Page" src="https://github.com/user-attachments/assets/eb8fe430-a568-40a4-b666-9402ff0eb391" />
</div>

---

### 📊 대시보드 화면

<div align="center">
  <img width="800" alt="Dashboard Page" src="https://github.com/user-attachments/assets/350e4d7c-a897-4ea5-a619-85d01dd3bf2b" />
</div>

### 🎬 실행 화면

<div align="center">
    <img width="800" alt="Dashboard Page" src="https://github.com/user-attachments/assets/af9a57a9-3ed8-4429-b6a2-8ea5d717e2b3" />
</div>

---

## 🔗 배포 주소
👉 https://chathongpt.github.io/TrendSpot

>PC 크롬 환경 기준에 최적화된 대시보드를 확인해보세요!

<details>
  <summary><h4>🔐 테스트 계정</h4></summary>
  ID : fisa<br>
  PW : fisa
</details>

---

## 🛠️ Troubleshooting Table
|  NO | 카테 <br> 고리  | 이슈 내용 | 원인 | 해결 방법 |
|-------:|:--------|:---------|:-----|:---------|
| 1 | DB | 🔥 Oracle 파티셔닝 이슈 | Oracle 라이선스 및 <br> 실습 환경 제한 | MySQL 전환 → Range/Hash <br> 단일 파티셔닝 |
| 2 | DB | 🔥 Oracle 파티셔닝 <br> 외래키 | 파티셔닝 테이블은 <br> 외래키 미지원 | 단일 테이블로 작업 |
| 3 | DB | 🔥 대용량 데이터 insert | 100 만 건 insert 시 <br> OS 용량 부족·속도 문제 | LOAD DATA INFILE (≈10 분) |
| 4 | 협업 | 💾 Colab 파일 공유 | Colab 개별 업로드는<br>업로더만 접근 가능 | 공유 폴더 생성 → Colab 마운트 |
| 5 | 협업 | 💾 Drive CSV 업로드 | Google Docs로 자동 변환 | Drive 설정 → “업로드 <br> 파일 변환” 해제 |
| 6 | 협업 | 💾 Drive 업로드 속도 | 대용량 파일 업로드 느림 | 공유 폴더 + Colab 마운트 |
| 7 | 데이터 | 🔄 데이터 범위 조정 | 경기도 전체 데이터 사용 시 <br> 과부하 | 경기 서부(부천·안양·광명·시흥)로 <br> 축소 |
| 8 | 데이터 | 🔄 데이터 타입 변환 | sales_amount decimal(12,2) | ALTER TABLE → INT |
