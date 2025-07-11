// 전역 변수 선언
let currentFileIndex = 0;

// SQL 파일 목록과 대응하는 PNG 파일들
const sqlFiles = [
  {
    sql: "sql/partition_month_hash_script.sql",
    png: "dashboard/image.png",
    title: "파티션 월별 해시 스크립트",
  },
  {
    sql: "sql/query2.sql",
    png: "dashboard/chart2.png",
    title: "고객 트렌드 분석",
  },
  {
    sql: "sql/query3.sql",
    png: "dashboard/chart3.png",
    title: "지역별 매출 비교",
  },
  {
    sql: "sql/query4.sql",
    png: "dashboard/chart4.png",
    title: "상품별 성과 분석",
  },
  {
    sql: "sql/query5.sql",
    png: "dashboard/chart5.png",
    title: "시간대별 매출 패턴",
  },
];

// SQL 파일 읽기 함수
async function loadSQLFile(sqlPath) {
  console.log(`🔍 SQL 파일 로딩 시도: ${sqlPath}`);

  try {
    // 절대 경로로 시도
    const fullPath = window.location.origin + "/" + sqlPath;
    console.log(`📍 전체 경로: ${fullPath}`);

    const response = await fetch(sqlPath);
    console.log(`📡 응답 상태: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      throw new Error(
        `파일을 찾을 수 없습니다: ${response.status} ${response.statusText}`
      );
    }

    const sqlContent = await response.text();
    console.log(`📄 파일 내용 길이: ${sqlContent.length} 문자`);

    // 빈 파일 체크
    if (!sqlContent.trim()) {
      throw new Error("파일이 비어있습니다");
    }

    return sqlContent;
  } catch (error) {
    console.error(`❌ SQL 파일 로딩 실패: ${sqlPath}`, error);

    // 파일이 없을 때 샘플 SQL 반환
    const sampleSQL = getSampleSQL(sqlPath);
    console.log(`🔄 샘플 SQL 사용: ${sqlPath}`);
    return sampleSQL;
  }
}

// 샘플 SQL 생성 함수
function getSampleSQL(sqlPath) {
  const fileName = sqlPath.split("/").pop();

  if (fileName.includes("partition")) {
    return `-- 파티션 월별 해시 스크립트 (샘플)
-- 실제 파일: ${sqlPath}

-- 테이블 파티션 생성
CREATE TABLE sales_partitioned (
    id INT AUTO_INCREMENT,
    order_date DATE,
    customer_id INT,
    amount DECIMAL(10,2),
    PRIMARY KEY (id, order_date)
)
PARTITION BY RANGE (YEAR(order_date) * 100 + MONTH(order_date)) (
    PARTITION p202401 VALUES LESS THAN (202402),
    PARTITION p202402 VALUES LESS THAN (202403),
    PARTITION p202403 VALUES LESS THAN (202404),
    PARTITION p202404 VALUES LESS THAN (202405),
    PARTITION p202405 VALUES LESS THAN (202406),
    PARTITION p202406 VALUES LESS THAN (202407),
    PARTITION p202407 VALUES LESS THAN (202408),
    PARTITION p202408 VALUES LESS THAN (202409),
    PARTITION p202409 VALUES LESS THAN (202410),
    PARTITION p202410 VALUES LESS THAN (202411),
    PARTITION p202411 VALUES LESS THAN (202412),
    PARTITION p202412 VALUES LESS THAN (202501),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- 파티션별 데이터 조회
SELECT 
    TABLE_NAME,
    PARTITION_NAME,
    TABLE_ROWS,
    DATA_LENGTH,
    INDEX_LENGTH
FROM INFORMATION_SCHEMA.PARTITIONS 
WHERE TABLE_NAME = 'sales_partitioned' 
AND PARTITION_NAME IS NOT NULL;

-- 월별 해시 함수 예제
SELECT 
    YEAR(order_date) * 100 + MONTH(order_date) as partition_key,
    COUNT(*) as record_count,
    SUM(amount) as total_amount
FROM sales_partitioned 
GROUP BY YEAR(order_date) * 100 + MONTH(order_date)
ORDER BY partition_key;`;
  }

  return `-- SQL 파일을 찾을 수 없습니다: ${sqlPath}
-- 
-- 해결 방법:
-- 1. 웹서버에서 실행하고 있는지 확인 (http://localhost:8000)
-- 2. 파일 경로가 올바른지 확인
-- 3. 파일이 실제로 존재하는지 확인
-- 
-- 샘플 SQL:
SELECT 
    'TrendSpot Dashboard' as platform,
    '${fileName}' as missing_file,
    NOW() as current_time;
    
-- 이 메시지가 보인다면 실제 SQL 파일이 로드되지 않은 것입니다.`;
}

// 쿼리 표시 함수
async function displayQuery(sqlPath) {
  const queryDisplay = document.getElementById("queryDisplay");
  const statusElement = document.querySelector(".query-status span:last-child");

  if (!queryDisplay || !statusElement) {
    console.error("필수 DOM 요소를 찾을 수 없습니다");
    return;
  }

  // 로딩 상태 표시
  statusElement.textContent = "로딩 중...";
  queryDisplay.textContent =
    "-- SQL 파일을 로딩 중...\n-- 잠시만 기다려주세요.";

  try {
    const sqlContent = await loadSQLFile(sqlPath);
    queryDisplay.textContent = sqlContent;
    statusElement.textContent = "로드 완료";

    // 로딩 완료 후 실행 상태 시뮬레이션
    setTimeout(() => {
      statusElement.textContent = "실행 준비";
    }, 500);

    console.log(`✅ SQL 표시 완료: ${sqlPath}`);
  } catch (error) {
    // 이 부분은 더 이상 실행되지 않을 것임 (loadSQLFile에서 fallback 처리)
    queryDisplay.textContent = `-- 예상치 못한 오류 발생
-- 파일 경로: ${sqlPath}
-- 오류 내용: ${error.message}`;

    statusElement.textContent = "오류 발생";
    console.error(`❌ SQL 표시 실패: ${sqlPath}`, error);
  }
}

// 대시보드 이미지 변경 함수
function displayDashboard(pngPath, title) {
  const dashboardImg = document.getElementById("dashboardImg");
  const chartTitle = document.getElementById("chartTitle");

  if (!dashboardImg || !chartTitle) {
    console.error("대시보드 DOM 요소를 찾을 수 없습니다");
    return;
  }

  // 차트 제목 업데이트
  chartTitle.textContent = title || "데이터 시각화";

  dashboardImg.onload = function () {
    console.log(`✅ 이미지 로드 성공: ${pngPath}`);
  };

  dashboardImg.onerror = function () {
    console.warn(`⚠️ 이미지 로드 실패: ${pngPath}`);
    // 에러 시 placeholder 이미지 생성
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");

    // 배경 그리기
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 테두리
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

    // 텍스트
    ctx.fillStyle = "#64748b";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      "차트 이미지가 없습니다",
      canvas.width / 2,
      canvas.height / 2 - 20
    );
    ctx.font = "14px Arial";
    ctx.fillText(`파일: ${pngPath}`, canvas.width / 2, canvas.height / 2 + 10);
    ctx.fillText(
      "dashboard 폴더에 PNG 파일을 추가해주세요",
      canvas.width / 2,
      canvas.height / 2 + 35
    );

    // canvas를 이미지로 변환
    dashboardImg.src = canvas.toDataURL();
    chartTitle.textContent = `${title} (이미지 없음)`;
  };

  dashboardImg.src = pngPath;
}

// UI 업데이트 함수
function updateUI(index) {
  const currentFileElement = document.getElementById("currentFile");
  const totalFilesElement = document.getElementById("totalFiles");

  if (currentFileElement) currentFileElement.textContent = index + 1;
  if (totalFilesElement) totalFilesElement.textContent = sqlFiles.length;

  // 퀵 네비게이션 버튼 활성화 상태 업데이트
  document.querySelectorAll(".quick-btn").forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });
}

// 특정 파일 세트 로드 함수 (전역 함수로 선언)
function loadFileSet(index) {
  console.log(`🔄 loadFileSet 호출됨: ${index}`);

  if (index < 0 || index >= sqlFiles.length) {
    console.error("❌ 잘못된 파일 인덱스:", index);
    return;
  }

  currentFileIndex = index;
  const fileSet = sqlFiles[index];

  console.log(`📁 파일 세트 ${index + 1} 로딩:`, fileSet);

  // UI 업데이트
  updateUI(index);

  // SQL 쿼리와 PNG 이미지 동시 로드
  displayQuery(fileSet.sql);
  displayDashboard(fileSet.png, fileSet.title);
}

// 다음 파일 세트로 이동
function nextFileSet() {
  const nextIndex = (currentFileIndex + 1) % sqlFiles.length;
  loadFileSet(nextIndex);
}

// 이전 파일 세트로 이동
function prevFileSet() {
  const prevIndex = (currentFileIndex - 1 + sqlFiles.length) % sqlFiles.length;
  loadFileSet(prevIndex);
}

// 전체화면 토글 함수
function toggleFullscreen() {
  const img = document.getElementById("dashboardImg");

  if (!img) {
    console.error("이미지 요소를 찾을 수 없습니다");
    return;
  }

  if (!document.fullscreenElement) {
    img.requestFullscreen().catch((err) => {
      console.log(`전체화면 모드 실패: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

// 키보드 이벤트 처리
document.addEventListener("keydown", function (event) {
  // 입력 필드에 포커스가 있을 때는 키보드 단축키 비활성화
  if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
    return;
  }

  console.log(`⌨️ 키 입력: ${event.key}`);

  switch (event.key) {
    case "ArrowRight":
    case " ":
      event.preventDefault();
      nextFileSet();
      break;
    case "ArrowLeft":
      event.preventDefault();
      prevFileSet();
      break;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
      event.preventDefault();
      const num = parseInt(event.key) - 1;
      if (num < sqlFiles.length) {
        loadFileSet(num);
      }
      break;
    case "f":
    case "F":
      event.preventDefault();
      toggleFullscreen();
      break;
    case "Escape":
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      break;
  }
});

// 자동 슬라이드쇼 기능 (선택사항)
let autoSlideInterval = null;

function startAutoSlide(intervalMs = 10000) {
  stopAutoSlide();
  autoSlideInterval = setInterval(() => {
    nextFileSet();
  }, intervalMs);
  console.log(`자동 슬라이드 시작 (${intervalMs / 1000}초 간격)`);
}

function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
    console.log("자동 슬라이드 중지");
  }
}

// 페이지 가시성 변경 시 자동 슬라이드 제어
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    stopAutoSlide();
  }
});

// DOM이 로드되면 초기화
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("🎯 TrendSpot 대시보드 초기화 중...");
    loadFileSet(0);
    console.log("✨ TrendSpot 대시보드 준비 완료!");
    console.log(
      "📋 사용법: 화살표키(←→), 스페이스바, 숫자키(1-5), F키(전체화면)"
    );
  });
} else {
  // 이미 로드된 경우 즉시 실행
  console.log("🎯 TrendSpot 대시보드 즉시 초기화...");
  loadFileSet(0);
  console.log("✨ TrendSpot 대시보드 준비 완료!");
}

// DOM이 로드되면 초기화
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("🎯 TrendSpot 대시보드 초기화 중...");
    loadFileSet(0);
    console.log("✨ TrendSpot 대시보드 준비 완료!");
    console.log(
      "📋 사용법: 화살표키(←→), 스페이스바, 숫자키(1-5), F키(전체화면)"
    );
  });
} else {
  // 이미 로드된 경우 즉시 실행
  console.log("🎯 TrendSpot 대시보드 즉시 초기화...");
  loadFileSet(0);
  console.log("✨ TrendSpot 대시보드 준비 완료!");
}

// 전역 함수로 노출 (HTML onclick에서 사용 가능)
window.loadFileSet = loadFileSet;
window.nextFileSet = nextFileSet;
window.prevFileSet = prevFileSet;
window.toggleFullscreen = toggleFullscreen;
window.startAutoSlide = startAutoSlide;
window.stopAutoSlide = stopAutoSlide;

console.log("📜 JavaScript 로드 완료 - 모든 함수가 전역으로 노출됨");
