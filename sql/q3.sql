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