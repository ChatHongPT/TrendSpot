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