// ============================ SQL 관리 ============================

let currentFileIndex = 0;

const sqlFiles = [
  { sql: "sql/q1.sql", title: "월별 해시 스크립트" },
  { sql: "sql/q2.sql", title: "고객 트렌드 분석" },
  { sql: "sql/q3.sql", title: "지역별 매출 비교" },
  { sql: "sql/q4.sql", title: "상품별 성과 분석" },
  { sql: "sql/q4.sql", title: "시간대별 매출 패턴" }
];

async function loadSQLFile(sqlPath) {
  try {
    const response = await fetch(sqlPath);
    if (!response.ok) throw new Error(`파일을 찾을 수 없습니다: ${response.status}`);
    const sqlContent = await response.text();
    return sqlContent.trim() ? sqlContent : getSampleSQL(sqlPath);
  } catch {
    return getSampleSQL(sqlPath);
  }
}

function getSampleSQL(sqlPath) {
  return `-- 샘플 SQL: ${sqlPath}\nSELECT NOW();`;
}

async function displayQuery(sqlPath) {
  const queryDisplay = document.getElementById("queryDisplay");
  const statusElement = document.querySelector(".query-status span:last-child");
  statusElement.textContent = "로딩 중...";
  queryDisplay.textContent = "-- SQL 파일을 로딩 중...";

  const sqlContent = await loadSQLFile(sqlPath);
  queryDisplay.textContent = sqlContent;
  statusElement.textContent = "실행 준비";
}

function updateUI(index) {
  document.getElementById("currentFile").textContent = index + 1;
  document.getElementById("totalFiles").textContent = sqlFiles.length;
}

function loadFileSet(index) {
  currentFileIndex = index;
  const fileSet = sqlFiles[index];
  updateUI(index);
  displayQuery(fileSet.sql);
}

function nextFileSet() {
  loadFileSet((currentFileIndex + 1) % sqlFiles.length);
}

function prevFileSet() {
  loadFileSet((currentFileIndex - 1 + sqlFiles.length) % sqlFiles.length);
}

// ============================ CSV 차트 관리 ============================

async function loadCSV(url) {
  const res = await fetch(url);
  const text = await res.text();
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",");
  return lines.slice(1).map(line => {
    const cols = line.split(",");
    const obj = {};
    headers.forEach((header, idx) => obj[header] = cols[idx]);
    return obj;
  });
}

// q1.csv: category_sub,total_sales,transactions 사용
async function renderQuarterChart() {
  const data = await loadCSV("data/q1.csv");
  console.log("💬 raw data", data);

  const categories = data.map(d => d.category_sub);
  const sales = data.map(d => parseInt(d.total_sales) / 1e8);

  new Chart(document.getElementById("quarterChart"), {
    type: "bar",
    data: {
      labels: categories,
      datasets: [{
        label: "매출 (억 원)",
        backgroundColor: "#36A2EB",
        data: sales
      }]
    },
    options: {
      plugins: { title: { display: true, text: "2024년 업종별 매출 (억 원)" }},
      responsive: true,
      scales: { x: { beginAtZero: true }, y: { beginAtZero: true } }
    }
  });
}

async function renderMarchRankChart() {
  const data = await loadCSV("data/q2.csv");
  const categories = data.map(d => d.category_main);
  const sales = data.map(d => parseInt(d.total_sales) / 1e8);

  new Chart(document.getElementById("marchRankChart"), {
    type: "bar",
    data: {
      labels: categories,
      datasets: [{
        label: "매출 (억 원)",
        backgroundColor: "#36A2EB",
        data: sales
      }]
    },
    options: {
      indexAxis: 'y',
      plugins: { title: { display: true, text: "2024년 3월 업종별 매출 순위" }},
      responsive: true,
      scales: { x: { beginAtZero: true } }
    }
  });
}

async function renderCafeCard() {
  const data = await loadCSV("data/q3.csv");
  const cafeData = data.find(d => d.category_sub === "커피/음료");
  const card = document.getElementById("cafeCard");

  if (!cafeData) {
    card.innerHTML = "<p>데이터를 찾을 수 없습니다.</p>";
    return;
  }

  card.innerHTML = `
    <div style="background:#f2f2f2; padding:20px; border-radius:8px; text-align:center;">
      <h4>2024년 3월 커피/음료 매출</h4>
      <p><strong>${(parseInt(cafeData.total_sales) / 1e8).toFixed(0)} 억 원</strong></p>
      <p>거래: ${parseInt(cafeData.transactions).toLocaleString()} 건</p>
    </div>
  `;
}

async function renderSeasonChart() {
  const data = await loadCSV("data/q4.csv");
  const categories = data.map(d => d.category_main);
  const sales = data.map(d => parseInt(d.total_sales) / 1e8);

  new Chart(document.getElementById("seasonChart"), {
    type: "pie",
    data: {
      labels: categories,
      datasets: [{
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E7E9ED'],
        data: sales
      }]
    },
    options: {
      plugins: { title: { display: true, text: "2024년 2~4월 누적 업종별 매출 비율" }},
      responsive: true
    }
  });
}

// ============================ 페이지 초기화 ============================

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", async () => {
    console.log("✨ TrendSpot 대시보드 준비 완료!");
    loadFileSet(0);
    await renderQuarterChart();
    await renderMarchRankChart();
    await renderCafeCard();
    await renderSeasonChart();
    console.log("✅ CSV 차트 및 대시보드 초기화 완료");
  });
} else {
  loadFileSet(0);
  renderQuarterChart();
  renderMarchRankChart();
  renderCafeCard();
  renderSeasonChart();
}

// 전역 함수 등록
window.loadFileSet = loadFileSet;
window.nextFileSet = nextFileSet;
window.prevFileSet = prevFileSet;

console.log("📜 JavaScript 로드 완료 - 통합 완료");
