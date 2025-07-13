CREATE DATABASE IF NOT EXISTS sales_data;
USE sales_data;

-- 월별 해시 파티셔닝 테이블 생성
CREATE TABLE partition_month_hash (
    id INT AUTO_INCREMENT,
    tr_date DATE NOT NULL,
    month_no INT NOT NULL,                -- 월 컬럼 추가
    city_name VARCHAR(20) NOT NULL,
    category_main VARCHAR(50) NOT NULL,
    category_sub VARCHAR(50) NOT NULL,
    gender VARCHAR(50) NOT NULL,
    age_group INT NOT NULL,
    sales_amount INT NOT NULL,
    sales_count INT NOT NULL,
    PRIMARY KEY (id, tr_date, month_no)  -- month_no 포함해서 PK 설정
)
PARTITION BY HASH (month_no)
PARTITIONS 12;


-- 임시 테이블 생성: 원본 CSV 데이터를 먼저 여기에 로드
CREATE TABLE tmp_sales (
    id INT AUTO_INCREMENT,
    tr_date DATE NOT NULL,
    city_name VARCHAR(20) NOT NULL,
    category_main VARCHAR(50) NOT NULL,
    category_sub VARCHAR(50) NOT NULL,
    gender VARCHAR(50) NOT NULL,
    age_group INT NOT NULL,
    sales_amount INT NOT NULL,
    sales_count INT NOT NULL,
    PRIMARY KEY (id)
);


--  CSV 파일 데이터를 임시 테이블(tmp_sales)에 적재
LOAD DATA INFILE '/var/lib/mysql-files/combined_preprocessing_final.csv'
INTO TABLE tmp_sales
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(tr_date, city_name, category_main, category_sub, gender, age_group, sales_amount, sales_count);


-- partition_month_hash 테이블에 월 컬럼을 추가해서 삽입
INSERT INTO partition_month_hash (tr_date, month_no, city_name, category_main, category_sub, gender, age_group, sales_amount, sales_count)
SELECT tr_date, MONTH(tr_date), city_name, category_main, category_sub, gender, age_group, sales_amount, sales_count
FROM tmp_sales;


use sales_data;

-- 쿼리① 3월 단일월 매출
-- 1 row(s) fetched - 42s, on 2025-07-11 at 15:29:07
SELECT
  SUM(sales_amount) AS march_sales
FROM
  partition_month_hash
WHERE
  tr_date BETWEEN '2024-03-01' AND '2024-03-31';



-- 쿼리② 2~4월 매출
-- 1 row(s) fetched - 41s, on 2025-07-11 at 15:30:29
SELECT
  SUM(sales_amount) AS q2_sales
FROM
  partition_month_hash
WHERE
  tr_date BETWEEN '2024-02-01' AND '2024-04-30';



-- 쿼리③ 월별 매출 트렌드
-- 6 row(s) fetched - 2m 28s, on 2025-07-11 at 15:33:14
SELECT
  DATE_FORMAT(tr_date, '%Y-%m') AS month,
  SUM(sales_amount) AS total_sales
FROM
  partition_month_hash
WHERE
  tr_date BETWEEN '2024-01-01' AND '2024-06-30'
GROUP BY
  month
ORDER BY
  month;



-- 쿼리④ 3월 업종별 매출
-- 72 row(s) fetched - 1m 19s, on 2025-07-11 at 15:34:53
SELECT
  category_sub,
  SUM(sales_amount) AS total_sales
FROM
  partition_month_hash
WHERE
  tr_date BETWEEN '2024-03-01' AND '2024-03-31'
GROUP BY
  category_sub
ORDER BY
  total_sales DESC;

