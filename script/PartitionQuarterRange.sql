CREATE TABLE partition_quarter_range (
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
    PARTITION p2024q1 VALUES LESS THAN (TO_DAYS('2024-04-01')),
    PARTITION p2024q2 VALUES LESS THAN (TO_DAYS('2024-07-01')),
    PARTITION p2024q3 VALUES LESS THAN (TO_DAYS('2024-10-01')),
    PARTITION p2024q4 VALUES LESS THAN (TO_DAYS('2025-01-01')),
    PARTITION pmax VALUES LESS THAN MAXVALUE
);


LOAD DATA INFILE '/var/lib/mysql-files/combined_preprocessing_final.csv'
INTO TABLE partition_quarter_range
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(tr_date, city_name, category_main, category_sub, gender, age_group, sales_amount, sales_count);

-- 분기 vs 월별
-- 쿼리① 1분기 총 매출 7.264s
SELECT
  SUM(sales_amount) AS total_sales
FROM
  partition_quarter_range
WHERE
  tr_date BETWEEN '2024-01-01' AND '2024-03-31';

-- 쿼리② 1월 단일월 매출 7.400s
SELECT
  SUM(sales_amount) AS january_sales
FROM
  partition_quarter_range
WHERE
  tr_date BETWEEN '2024-01-01' AND '2024-01-31';

-- 쿼리③ 월별 매출 트렌드 1m 24s
SELECT
  DATE_FORMAT(tr_date, '%Y-%m') AS month,
  SUM(sales_amount) AS total_sales
FROM
  partition_quarter_range
WHERE
  tr_date BETWEEN '2024-01-01' AND '2024-06-30'
GROUP BY
  month
ORDER BY
  month;

-- 쿼리④ 1분기 카페 매출 7.149s
SELECT
  category_sub,
  SUM(sales_amount) AS study_sales
FROM
  partition_quarter_range
WHERE
  tr_date BETWEEN '2024-01-01' AND '2024-03-31'
  AND category_main = '학문/교육'
GROUP BY
  category_sub
ORDER BY
  study_sales DESC;

