import './App.css';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faChevronLeft, faChevronRight, faDatabase, faChartLine } from '@fortawesome/free-solid-svg-icons';
import 'chart.js/auto';

function App() {
  useEffect(() => {
    // Chart.js 및 기타 스크립트 초기화는 추후 구현 예정
  }, []);

  return (
    <div className="container">
      {/* 헤더 */}
      <header className="header">
        <div className="logo-section">
          <div className="logo-icon">
            <FontAwesomeIcon icon={faChartBar} />
          </div>
          <div className="logo-text">
            <h1>TrendSpot</h1>
            <p>소상공인 창업 인사이트 플랫폼</p>
            <span className="subtitle">경기 서부 · 소비트렌드 · 데이터분석</span>
          </div>
        </div>
        <div className="trendcore-logo"><span>TrendCore</span></div>
      </header>

      {/* 네비게이션 */}
      <nav className="navigation">
        <div className="nav-controls">
          <button className="nav-btn" title="이전 (←)"><FontAwesomeIcon icon={faChevronLeft} /></button>
          <div className="file-indicator">
            <span id="currentFile">1</span> / <span id="totalFiles">5</span>
          </div>
          <button className="nav-btn" title="다음 (→)"><FontAwesomeIcon icon={faChevronRight} /></button>
        </div>
        <div className="quick-nav">
          {[1,2,3,4,5].map((num, idx) => (
            <button key={num} className={`quick-btn${idx === 0 ? ' active' : ''}`}>{num}</button>
          ))}
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <main className="main-content">
        {/* 쿼리문 섹션 */}
        <section className="query-section">
          <div className="section-header">
            <h2><FontAwesomeIcon icon={faDatabase} /> 쿼리문</h2>
            <div className="query-status">
              <span className="status-dot"></span>
              <span>실행 준비</span>
            </div>
          </div>
          <div className="query-display" id="queryDisplay">
            {/* SQL 파일 내용 표시 */}
          </div>
        </section>

        {/* 대시보드 섹션 */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2><FontAwesomeIcon icon={faChartLine} /> 대시보드</h2>
          </div>
          {/* 분기별 차트 */}
          <canvas id="quarterChart" style={{margin: '20px 0'}}></canvas>
          {/* 3월 업종별 매출 순위 */}
          <canvas id="marchRankChart" style={{margin: '20px 0'}}></canvas>
          {/* 카페 카드 */}
          <div id="cafeCard" style={{margin: '20px 0'}}></div>
          {/* 2~4월 누적 파이 차트 */}
          <canvas id="seasonChart" style={{margin: '20px 0'}}></canvas>
        </section>
      </main>
    </div>
  );
}

export default App;
