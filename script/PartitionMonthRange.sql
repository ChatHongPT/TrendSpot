CREATE TABLE partition_month_range (
    id INT AUTO_INCREMENT,
    tr_date DATE NOT NULL,
    city_name VARCHAR(20) NOT NULL,
    category_main VARCHAR(50) NOT NULL,
    category_sub VARCHAR(50) NOT NULL,
    gender VARCHAR(50) NOT NULL,
    age_group INT NOT NULL,
    sales_amount INT NOT NULL,
    sales_count INT NOT NULL,
    PRIMARY KEY (id, tr_date)
)
PARTITION BY RANGE (TO_DAYS(tr_date)) (
    PARTITION p2024m01 VALUES LESS THAN (TO_DAYS('2024-02-01')),
    PARTITION p2024m02 VALUES LESS THAN (TO_DAYS('2024-03-01')),
    PARTITION p2024m03 VALUES LESS THAN (TO_DAYS('2024-04-01')),
    PARTITION p2024m04 VALUES LESS THAN (TO_DAYS('2024-05-01')),
    PARTITION p2024m05 VALUES LESS THAN (TO_DAYS('2024-06-01')),
    PARTITION p2024m06 VALUES LESS THAN (TO_DAYS('2024-07-01')),
    PARTITION p2024m07 VALUES LESS THAN (TO_DAYS('2024-08-01')),
    PARTITION p2024m08 VALUES LESS THAN (TO_DAYS('2024-09-01')),
    PARTITION p2024m09 VALUES LESS THAN (TO_DAYS('2024-10-01')),
    PARTITION p2024m10 VALUES LESS THAN (TO_DAYS('2024-11-01')),
    PARTITION p2024m11 VALUES LESS THAN (TO_DAYS('2024-12-01')),
    PARTITION p2024m12 VALUES LESS THAN (TO_DAYS('2025-01-01')),
    PARTITION pmax VALUES LESS THAN MAXVALUE
);

LOAD DATA INFILE '/var/lib/mysql-files/combined_preprocessing_final.csv'
INTO TABLE partition_month_range
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(tr_date, city_name, category_main, category_sub, gender, age_group, sales_amount, sales_count);

-- 분기 vs 월별
-- 쿼리① 1분기 총 매출 7.936s
SELECT
  SUM(sales_amount) AS total_sales
FROM
  partition_month_range
WHERE
  tr_date BETWEEN '2024-01-01' AND '2024-03-31';

-- 쿼리② 1월 단일월 매출 2.228s
SELECT
  SUM(sales_amount) AS january_sales
FROM
  partition_month_range
WHERE
  tr_date BETWEEN '2024-01-01' AND '2024-01-31';

-- 쿼리③ 월별 매출 트렌드  1m 26s
SELECT
  DATE_FORMAT(tr_date, '%Y-%m') AS month,
  SUM(sales_amount) AS total_sales
FROM
  partition_month_range
WHERE
  tr_date BETWEEN '2024-01-01' AND '2024-06-30'
GROUP BY
  month
ORDER BY
  month;

-- 쿼리④ 1분기 학원 매출 5.670s
SELECT
  category_sub,
  SUM(sales_amount) AS study_sales
FROM
  partition_month_range
WHERE
  tr_date BETWEEN '2024-01-01' AND '2024-03-31'
  AND category_main = '학문/교육'
GROUP BY
  category_sub
ORDER BY
  study_sales DESC;

-- range vs hash
-- 쿼리① 3월 단일월 매출 3.705s
SELECT
  SUM(sales_amount) AS march_sales
FROM
  partition_month_range
WHERE
  tr_date BETWEEN '2024-03-01' AND '2024-03-31';

-- 쿼리② 2~4월 매출 13s
SELECT
  SUM(sales_amount) AS q2_sales
FROM
  partition_month_range
WHERE
  tr_date BETWEEN '2024-02-01' AND '2024-04-30';

-- 쿼리③ 월별 매출 트렌드 1m 59s
SELECT
  DATE_FORMAT(tr_date, '%Y-%m') AS month,
  SUM(sales_amount) AS total_sales
FROM
  partition_month_range
WHERE
  tr_date BETWEEN '2024-01-01' AND '2024-06-30'
GROUP BY
  month
ORDER BY
  month;

-- 쿼리④ 3월 업종별 매출 32s
SELECT
  category_sub,
  SUM(sales_amount) AS total_sales
FROM
  partition_month_range
WHERE
  tr_date BETWEEN '2024-03-01' AND '2024-03-31'
GROUP BY
  category_sub
ORDER BY
  total_sales DESC;


-- ① “3월 한 달 매출만 보면 카페가 잘 될까?”
SELECT
  category_sub,
  SUM(sales_amount) AS total_sales,
  COUNT(*) AS transactions
FROM
  partition_month_range
WHERE
  tr_date BETWEEN '2024-03-01' AND '2024-03-31'
  AND category_main = '음식'
GROUP BY
  category_sub
ORDER BY
  total_sales DESC;

-- ② “3월에 어떤 업종이 제일 잘 팔렸을까?”
SELECT
  category_main,
  SUM(sales_amount) AS total_sales
FROM
  partition_month_range
WHERE
  tr_date BETWEEN '2024-03-01' AND '2024-03-31'
GROUP BY
  category_main
ORDER BY
  total_sales DESC
LIMIT 1;

-- ③ “2~4월까지 누적으로 보면 어느 업종이 더 탄탄하지?”
SELECT
  category_main,
  SUM(sales_amount) AS total_sales,
  COUNT(*) AS transactions
FROM
  partition_month_range
WHERE
  tr_date BETWEEN '2024-02-01' AND '2024-04-30'
GROUP BY
  category_main
ORDER BY
  total_sales DESC;


-- ⑤ “분기 단위로 분석하면 내가 진입할 시점을 잡을 수 있을까?”
SELECT
  CONCAT(YEAR(tr_date), ' Q', QUARTER(tr_date)) AS quarter,
  category_main,
  SUM(sales_amount) AS total_sales
FROM
  partition_month_range
GROUP BY
  quarter,
  category_main
ORDER BY
  quarter ASC, total_sales DESC;

