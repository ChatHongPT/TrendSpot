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