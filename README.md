# 📊 TrendSpot
> **소상공인을 위한 스마트 창업 인사이트 플랫폼**

<div align="center">
  <img width="982" height="412" alt="TrendSpot Main Image" src="https://github.com/user-attachments/assets/b8291e22-79ab-47e0-a7a9-d029af510b4c" />
</div>

---

## 🌟 프로젝트 개요

**TrendSpot**은 데이터 기반의 창업 인사이트를 제공하여 소상공인들의 성공적인 사업 시작을 돕는 혁신적인 플랫폼입니다.

## 👥 TrendCore 팀

<div align="center">
  
| **임유진** | **서민지** | **정다빈** | **최홍석** |
| :---: | :---: | :---: | :---: |
| <img width="160px" src="https://avatars.githubusercontent.com/u/156065214?v=4" /> | <img width="160px" src="https://avatars.githubusercontent.com/u/124131845?v=4" /> | <img width="160px" src="https://avatars.githubusercontent.com/u/88383179?v=4"/> | <img width="160px" src="https://avatars.githubusercontent.com/u/129854575?v=4"/> |
| [@imewuzin](https://github.com/imewuzin) | [@menzzi](https://github.com/menzzi) | [@ddddabi](https://github.com/ddddabi) | [@ChatHongPT](https://github.com/ChatHongPT) |

</div>

---

## ⚒️ Tech Stack

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-rounded&logo=python&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat-rounded&logo=pandas&logoColor=white)
![MySQL](https://img.shields.io/badge/-MySQL-05122A?style=flat&logo=mysql)&nbsp;
![DBeaver](https://img.shields.io/badge/DBeaver-28a745?style=flat-rounded&logo=dbeaver&logoColor=white)

---

## 🏗️ System Architecture

<div align="center">
  <img width="800" alt="TrendSpot Architecture" src="https://github.com/user-attachments/assets/67e83a91-45a5-4822-a4d4-7226b681303e" />
</div>

### 아키텍처 구성요소
- **📦 Containerization**: VirtualBox + Ubuntu 환경에서 일관된 개발 환경 구축
- **🔬 Data Analysis**: Google Colab을 활용한 데이터 분석 
- **💾 Database Management**: MySQL + DBeaver를 통한 효율적인 데이터 관리

---

## ⚒️ Tech Stack

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-rounded&logo=python&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat-rounded&logo=pandas&logoColor=white)
![MySQL](https://img.shields.io/badge/-MySQL-05122A?style=flat&logo=mysql)&nbsp;
![DBeaver](https://img.shields.io/badge/DBeaver-28a745?style=flat-rounded&logo=dbeaver&logoColor=white)

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

---


---

## 📈 Data Flow

1. **🔄 Data Processing**: Pandas를 활용한 데이터 전처리 및 정제
2. **💾 Data Storage**: MySQL 데이터베이스에 분석 결과 저장
3. **📊 Visualization**: 사용자 친화적인 대시보드로 인사이트 제공

---

## 🛠️ Troubleshooting Table
| 번호 | 카테고리 | 이슈 내용                     | 원인                                  | 해결 방법                                                                | 해결 여부 |
|-------|-----------|-------------------------|-----------------------------------|------------------------------------------------------------------------|-----------|
| 1     | DB      | 🔥 Oracle 파티셔닝 이슈   | Oracle 라이선스 및 실습 환경 제한 | MySQL 전환하면서 업종으로 Range, Hash 단일 파티셔닝으로 변경              | ✅ 완료    |
| 2     | DB      | 🔥 Oracle 파티셔닝 외래키 이슈 | 파티셔닝된 테이블에서 외래 키 미지원 | 단일 테이블로 작업                                                    | ✅ 완료    |
| 3     | DB      | 🔥 대용량 데이터 insert 이슈 | 100만건 insert 시 OS 용량 부족 및 속도 문제 | Load Data Infile into table로 bash에서 실행 (약 10분 소요)            | ✅ 완료    |
| 4     | 협업    | 💾 Colab 파일 공유 문제   | Colab 개별 업로드 시 업로더만 접근 가능 | 구글 드라이브 공유 폴더 생성 및 Colab 마운트                        | ✅ 완료    |
| 5     | 협업    | 💾 Google Drive CSV 업로드 문제 | Google Docs로 자동 변환         | Google Drive 설정 > ‘업로드된 파일을 Google Docs 형식으로 변환’ 체크 해제 | ✅ 완료    |
| 6     | 협업    | 💾 Google Drive 업로드 속도 이슈 | 대용량 파일 업로드 시 느린 속도    | (공유 폴더로 해결 및 Colab 마운트)                                    | ✅ 완료    |
| 7     | 데이터 | 🔄 데이터 범위 조정         | 경기도 전체 데이터 사용 시 과부하  | 경기 서부(부천, 안양, 광명, 시흥)로 범위 축소                       | ✅ 완료    |
| 8     | 데이터 | 🔄 데이터 타입 변환         | sales_amount 컬럼 decimal(12,2) 타입 | ALTER 명령으로 int 타입으로 변환                                     | ✅ 완료    |
