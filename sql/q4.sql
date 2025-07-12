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