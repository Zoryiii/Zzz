/* ========================================
   毓 · 个人工作台 - 主应用
   ======================================== */

// ========================================
// 存储工具
// ========================================
const Storage = {
  get(key) {
    try {
      const item = localStorage.getItem(`zjy_${key}`);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(`zjy_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error('Storage error:', e);
    }
  },
  remove(key) {
    localStorage.removeItem(`zjy_${key}`);
  }
};

// ========================================
// 全局状态
// ========================================
const State = {
  accounting: Storage.get('accounting') || [],
  tasks: Storage.get('tasks') || [],
  calligraphyLogs: Storage.get('calligraphyLogs') || [],
  goodCharacters: Storage.get('goodCharacters') || [],
  lyricCollections: Storage.get('lyricCollections') || [],
  speakingLogs: Storage.get('speakingLogs') || [],
  englishLogs: Storage.get('englishLogs') || [],
  englishDiary: Storage.get('englishDiary') || [],
  englishGrammar: Storage.get('englishGrammar') || [],
  films: Storage.get('films') || [],
  photos: Storage.get('photos') || [],
  inspirations: Storage.get('inspirations') || [],
  sports: Storage.get('sports') || [],
  dailyReflections: Storage.get('dailyReflections') || [],
  daily: Storage.get('daily') || {
    goals: DEFAULT_GOALS,
    logs: [],
    currentWeek: getWeekRange(new Date())
  }
};

function saveState(key) {
  Storage.set(key, State[key]);
}

// ========================================
// 工具函数
// ========================================
function getWeekRange(date) {
  const d = new Date(date);
  const day = d.getDay() || 7;
  const monday = new Date(d);
  monday.setDate(d.getDate() - day + 1);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return {
    start: monday.toISOString().split('T')[0],
    end: sunday.toISOString().split('T')[0]
  };
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function getWeekDates(weekStart) {
  const dates = [];
  const start = new Date(weekStart);
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function compressImage(file, maxWidth) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round(height * maxWidth / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// APP深度链接配置
const APP_LINKS = {
  douyin: { scheme: 'snssdk1128://', intent: 'snssdk1128://', web: 'https://www.douyin.com' },
  bilibili: { scheme: 'bilibili://', intent: 'bilibili://', web: 'https://www.bilibili.com' },
  netease: { scheme: 'neteasecloudmusic://', intent: 'neteasecloudmusic://', web: 'https://music.163.com' },
  eudic: { scheme: 'eudic://', intent: 'eudic://', web: 'https://www.eudic.net' },
  doubao: { scheme: 'doubao://', intent: 'doubao://', web: 'https://www.doubao.com' }
};

function openAppOrWeb(appKey, webUrl) {
  const app = APP_LINKS[appKey] || { scheme: appKey, intent: appKey, web: webUrl };
  const ua = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isAndroid = /android/.test(ua);
  
  if (isAndroid) {
    // Android: 使用更可靠的方式
    const intentUrl = `intent://#Intent;scheme=${app.scheme.replace('://','')};package=com.netease.cloudmusic;end`;
    const startTime = Date.now();
    
    // 创建隐藏iframe尝试打开
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = app.intent;
    document.body.appendChild(iframe);
    
    // 备用方案：直接跳转
    setTimeout(() => {
      if (!document.hidden && Date.now() - startTime < 2000) {
        window.location.href = webUrl || app.web;
      }
      document.body.removeChild(iframe);
    }, 1500);
    
    // 如果页面隐藏说明APP打开成功
    window.addEventListener('pagehide', () => {
      document.body.removeChild(iframe);
    }, { once: true });
    
  } else if (isIOS) {
    // iOS: 使用location.href + timeout
    const startTime = Date.now();
    
    // 创建临时链接
    const link = document.createElement('a');
    link.href = app.scheme;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
      if (!document.hidden && Date.now() - startTime < 2000) {
        window.location.href = webUrl || app.web;
      }
      document.body.removeChild(link);
    }, 1500);
    
  } else {
    // 桌面端: 直接打开网页
    window.open(webUrl || app.web, '_blank');
  }
}

// 便捷函数
function openDouyinApp(searchQuery) {
  const url = searchQuery ? `https://www.douyin.com/search/${encodeURIComponent(searchQuery)}` : 'https://www.douyin.com';
  openAppOrWeb('douyin', url);
}

function openBilibiliApp(searchQuery) {
  const url = searchQuery ? `https://search.bilibili.com/all?keyword=${encodeURIComponent(searchQuery)}` : 'https://www.bilibili.com';
  openAppOrWeb('bilibili', url);
}

function openNeteaseApp(searchQuery) {
  const url = searchQuery ? `https://music.163.com/#/search/m/?s=${encodeURIComponent(searchQuery)}` : 'https://music.163.com';
  openAppOrWeb('netease', url);
}

function openEudicApp(searchQuery) {
  const url = searchQuery ? `https://www.eudic.net/v4/en/worddetail/${encodeURIComponent(searchQuery)}` : 'https://www.eudic.net';
  openAppOrWeb('eudic', url);
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  toast.innerHTML = `<span>${icons[type] || 'ℹ'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function showModal(contentHTML, onMount) {
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  content.innerHTML = contentHTML;
  overlay.classList.add('active');
  if (onMount) onMount(content);
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}

// ========================================
// 路由系统
// ========================================
const Router = {
  routes: {},
  register(path, handler) {
    this.routes[path] = handler;
  },
  navigate(path) {
    window.location.hash = `#${path}`;
  },
  handle() {
    const hash = window.location.hash.slice(1) || '/';
    const path = hash.split('?')[0];
    const params = hash.includes('?') 
      ? Object.fromEntries(new URLSearchParams(hash.split('?')[1])) 
      : {};
    
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.route === path);
    });
    
    const main = document.getElementById('mainContent');
    
    // 更新主题背景类
    main.className = 'main-content';
    if (path === '/') {
      main.classList.add('theme-home');
    } else {
      const moduleKey = path.replace('/', '');
      main.classList.add(`theme-${moduleKey}`);
    }
    
    const handler = this.routes[path];
    main.innerHTML = '';
    
    if (handler) {
      handler(main, params);
    } else {
      main.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🔍</div><div class="empty-state-text">页面不存在</div></div>';
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

window.addEventListener('hashchange', () => Router.handle());

// ========================================
// 渲染辅助
// ========================================
function createPageHeader(title, subtitle, theme) {
  const themeClass = theme ? `page-theme-${theme}` : '';
  return `
    <div class="page-header ${themeClass}">
      <h1 class="page-title">${title}</h1>
      <p class="page-subtitle">${subtitle}</p>
    </div>
  `;
}

function getDailyIndex(arr) {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day % arr.length;
}

// ========================================
// 首页
// ========================================
function renderHome(main) {
  const today = new Date();
  const greeting = today.getHours() < 12 ? '早上好' : today.getHours() < 18 ? '下午好' : '晚上好';
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日 周${['日','一','二','三','四','五','六'][today.getDay()]}`;
  
  // 计算统计
  const todayStr = getToday();
  const pendingTasks = State.tasks.filter(t => t.status !== 'done').length;
  const dailyQuote = DAILY_QUOTES[getDailyIndex(DAILY_QUOTES)];
  
  main.innerHTML = `
    <div class="home-hero">
      <div class="home-hero-bg"></div>
      <div class="home-hero-content">
        <h2>毓 · ${greeting}</h2>
        <p>愿今日也是温柔而充实的一天</p>
        <div class="home-date">${dateStr}</div>
      </div>
      <div class="home-hero-mascot">🐰</div>
    </div>
    
    <div class="quote-card">
      <span class="quote-star">✦</span>
      <span class="quote-label">今日一句</span>
      <div class="quote-text">${dailyQuote}</div>
    </div>
    
    <div class="home-todo-section">
      <div class="home-todo-header">
        <span class="home-todo-title">📋 今日待办</span>
        <a href="#/tasks" class="home-todo-more">全部任务 →</a>
      </div>
      <div class="home-todo-list">
        ${pendingTasks === 0 ? `
          <div style="color: var(--color-text-light); font-size: 13px; padding: 12px 0; text-align: center;">暂无待办任务 🎉</div>
        ` : State.tasks.filter(t => t.status !== 'done').slice(0, 6).map(task => `
          <div class="home-todo-item" onclick="toggleTaskHome('${task.id}')">
            <span class="todo-checkbox">${task.status === 'done' ? '✅' : '⬜'}</span>
            <span class="todo-text ${task.status === 'done' ? 'done' : ''}">${task.title}</span>
            ${task.priority === 'high' ? '<span class="todo-priority-tag high">高</span>' : task.priority === 'medium' ? '<span class="todo-priority-tag medium">中</span>' : ''}
          </div>
        `).join('')}
        ${State.tasks.filter(t => t.status !== 'done').length > 6 ? `<div style="font-size: 12px; color: var(--color-text-light); margin-top: 4px; text-align: center;">还有 ${State.tasks.filter(t => t.status !== 'done').length - 6} 项任务，<a href="#/tasks" style="color: var(--tasks-primary);">点击查看</a></div>` : ''}
      </div>
    </div>
    
    <h2 style="font-family: var(--font-title); margin-bottom: 20px; font-size: 22px;">功能模块</h2>
    <div class="modules-grid">
      ${MODULES.map(m => `
        <a href="#/${m.key}" class="module-card shape-${m.shape}">
          <div class="module-cover">
            <img src="${m.cover}" alt="${m.name}" loading="lazy" onerror="this.style.background='${m.theme.bg}';this.removeAttribute('src');">
            <div class="module-icon-badge">${m.icon}</div>
          </div>
          <div class="module-body">
            <div class="module-info">
              <h3>${m.name}</h3>
              <p>${m.description}</p>
            </div>
            <span class="module-arrow">→</span>
          </div>
        </a>
      `).join('')}
    </div>
  `;
}

window.toggleTaskHome = function(taskId) {
  const task = State.tasks.find(t => t.id === taskId);
  if (!task) return;
  if (task.status === 'done') {
    task.status = 'todo';
    task.completedAt = null;
  } else {
    task.status = 'done';
    task.completedAt = new Date().toISOString();
  }
  saveState('tasks');
  Router.handle();
};

// ========================================
// 记账模块
// ========================================
function renderAccounting(main) {
  const totalExpense = State.accounting.filter(a => a.type === 'expense').reduce((s, a) => s + a.amount, 0);
  const totalIncome = State.accounting.filter(a => a.type === 'income').reduce((s, a) => s + a.amount, 0);
  
  const categoryStats = {};
  State.accounting.filter(a => a.type === 'expense').forEach(a => {
    categoryStats[a.category] = (categoryStats[a.category] || 0) + a.amount;
  });
  
  // 获取历史月度汇总
  function getMonthlySummaries() {
    const months = {};
    State.accounting.forEach(a => {
      const d = new Date(a.date);
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!months[monthKey]) {
        months[monthKey] = { expense: 0, income: 0, records: [], categories: {} };
      }
      months[monthKey].records.push(a);
      if (a.type === 'expense') {
        months[monthKey].expense += a.amount;
        months[monthKey].categories[a.category] = (months[monthKey].categories[a.category] || 0) + a.amount;
      } else {
        months[monthKey].income += a.amount;
      }
    });
    return Object.entries(months).sort((a, b) => b[0].localeCompare(a[0]));
  }
  
  const monthlySummaries = getMonthlySummaries();
  
  main.innerHTML = `
    ${createPageHeader('记账', '记录生活中的每一笔', 'accounting')}
    
    <div class="stats-grid">
      <div class="stat-box">
        <div class="stat-box-label">总支出</div>
        <div class="stat-box-value expense">¥${totalExpense.toFixed(2)}</div>
      </div>
      <div class="stat-box">
        <div class="stat-box-label">总收入</div>
        <div class="stat-box-value income">¥${totalIncome.toFixed(2)}</div>
      </div>
      <div class="stat-box">
        <div class="stat-box-label">结余</div>
        <div class="stat-box-value balance">¥${(totalIncome - totalExpense).toFixed(2)}</div>
      </div>
      <div class="stat-box">
        <div class="stat-box-label">记录笔数</div>
        <div class="stat-box-value" style="color: var(--accounting-primary);">${State.accounting.length}</div>
      </div>
    </div>
    
    <div class="module-tabs accounting-tabs">
      <button class="module-tab active" data-tab="detail">💰 明细</button>
      <button class="module-tab" data-tab="finance">📈 理财</button>
    </div>
    
    <div class="module-tab-content active" id="tab-detail">
      <div class="history-summary-card" onclick="openHistoryDetail()" style="cursor: pointer;">
        <div class="history-summary-icon">📊</div>
        <div class="history-summary-info">
          <div class="history-summary-title">历史总结</div>
          <div class="history-summary-hint">点击查看过往每月账目详情</div>
        </div>
        <div class="history-summary-arrow">→</div>
      </div>
      
      ${Object.keys(categoryStats).length > 0 ? `
        <div class="chart-container">
          <div class="chart-title">分类占比</div>
          <div class="ring-chart">
            <svg viewBox="0 0 36 36">
              ${generateRingChart(categoryStats, totalExpense)}
            </svg>
            <div class="ring-legend">
              ${Object.entries(categoryStats).map(([cat, amt], i) => {
                const colors = ['#B54A3A', '#E8A87C', '#87CEEB', '#8BA888', '#D4A574', '#FF7F50', '#9FC4C4', '#C45A5A'];
                const pct = totalExpense > 0 ? ((amt / totalExpense) * 100).toFixed(1) : 0;
                const catInfo = ACCOUNT_CATEGORIES.expense.find(c => c.id === cat);
                return `<div class="ring-legend-item"><div class="ring-legend-color" style="background:${colors[i % colors.length]}"></div>${catInfo?.name || cat} ¥${amt.toFixed(0)} (${pct}%)</div>`;
              }).join('')}
            </div>
          </div>
        </div>
      ` : ''}
      
      <div style="display:flex; justify-content:space-between; align-items:center; margin: 16px 0;">
        <h2 style="font-size: 18px; font-weight: 600;">账目明细</h2>
        <button class="btn btn-primary" onclick="openAccountingModal()">+ 添加记录</button>
      </div>
      
      <div class="accounting-list">
        ${State.accounting.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">💰</div>
            <div class="empty-state-text">还没有记录，点击上方按钮开始记账吧</div>
          </div>
        ` : State.accounting.map(item => {
          const catList = ACCOUNT_CATEGORIES[item.type];
          const cat = catList.find(c => c.id === item.category) || { name: item.category, icon: '📝' };
          return `
            <div class="accounting-item ${item.type}">
              <div class="accounting-icon">${cat.icon}</div>
              <div class="accounting-details">
                <div class="accounting-category">${cat.name}</div>
                ${item.note ? `<div class="accounting-note">${item.note}</div>` : ''}
              </div>
              <div>
                <div class="accounting-amount">${item.type === 'income' ? '+' : '-'}¥${item.amount.toFixed(2)}</div>
                <div class="accounting-date">${formatDate(item.date)}</div>
              </div>
              <button class="btn btn-ghost" onclick="deleteAccounting('${item.id}')" style="margin-left: 8px;">🗑️</button>
            </div>
          `;
        }).join('')}
      </div>
    </div>
    
    <div class="module-tab-content" id="tab-finance">
      <div class="tip-card">
        <div class="tip-icon">🐷</div>
        <div class="tip-content">
          <div class="tip-title">理财小知识</div>
          <div class="tip-text">${FINANCIAL_TIPS[getDailyIndex(FINANCIAL_TIPS)]}</div>
        </div>
      </div>
      
      <h2 style="font-size: 18px; font-weight: 600; margin: 24px 0 14px;">📚 理财学习中心</h2>
      <div>
        ${FINANCE_ARTICLES.map(article => `
          <div class="finance-article-simple">
            <div class="finance-article-icon">${article.icon}</div>
            <div class="finance-article-info">
              <div class="finance-article-title">${article.title}</div>
              <div class="finance-article-desc">${article.desc}</div>
            </div>
            <a href="${article.url}" target="_blank" class="finance-article-read">阅读全文</a>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  document.querySelectorAll('.module-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.module-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.module-tab-content').forEach(c => c.classList.remove('active'));
      document.getElementById(`tab-${tab}`).classList.add('active');
    });
  });
}

function generateRingChart(stats, total) {
  if (total === 0) return '';
  const colors = ['#B54A3A', '#E8A87C', '#87CEEB', '#8BA888', '#D4A574', '#FF7F50', '#9FC4C4', '#C45A5A'];
  let cumulative = 0;
  return Object.values(stats).map((val, i) => {
    const pct = val / total;
    const dash = pct * 100;
    const offset = cumulative * 100;
    cumulative += pct;
    return `<circle cx="18" cy="18" r="15.915" fill="transparent" stroke="${colors[i % colors.length]}" stroke-width="4" stroke-dasharray="${dash}, 100" stroke-dashoffset="${-offset}" transform="rotate(-90 18 18)"/>`;
  }).join('');
}

window.openAccountingModal = function() {
  const today = getToday();
  showModal(`
    <h2 style="font-family: var(--font-title); margin-bottom: 20px; font-size: 22px;">添加记录</h2>
    <div class="input-group">
      <label>类型</label>
      <select id="accType">
        <option value="expense">支出</option>
        <option value="income">收入</option>
      </select>
    </div>
    <div class="input-group">
      <label>金额</label>
      <input type="number" id="accAmount" placeholder="0.00" step="0.01" min="0">
    </div>
    <div class="input-group">
      <label>分类</label>
      <select id="accCategory"></select>
    </div>
    <div class="input-group">
      <label>日期</label>
      <input type="date" id="accDate" value="${today}">
    </div>
    <div class="input-group">
      <label>备注</label>
      <textarea id="accNote" placeholder="添加备注..."></textarea>
    </div>
    <button class="btn btn-primary btn-block" onclick="saveAccounting()">保存</button>
  `, (content) => {
    const typeSel = content.querySelector('#accType');
    const catSel = content.querySelector('#accCategory');
    const updateCategories = () => {
      const cats = ACCOUNT_CATEGORIES[typeSel.value];
      catSel.innerHTML = cats.map(c => `<option value="${c.id}">${c.icon} ${c.name}</option>`).join('');
    };
    typeSel.addEventListener('change', updateCategories);
    updateCategories();
  });
};

window.saveAccounting = function() {
  const type = document.getElementById('accType').value;
  const amount = parseFloat(document.getElementById('accAmount').value);
  const category = document.getElementById('accCategory').value;
  const date = document.getElementById('accDate').value;
  const note = document.getElementById('accNote').value;
  
  if (!amount || amount <= 0) {
    showToast('请输入有效金额', 'error');
    return;
  }
  
  State.accounting.unshift({
    id: generateId(),
    type, amount, category, date, note,
    createdAt: new Date().toISOString()
  });
  
  saveState('accounting');
  closeModal();
  showToast('记录已保存', 'success');
  Router.handle();
};

window.openFinanceArticle = function(articleId) {
  const article = FINANCE_ARTICLES.find(a => a.id === articleId);
  if (!article) return;
  showModal(`
    <div style="max-height: 70vh; overflow-y: auto;">
      <div style="text-align:center; margin-bottom: 16px;">
        <div style="font-size:48px; margin-bottom:8px;">${article.icon}</div>
        <h2 style="font-family: var(--font-title); font-size: 22px; margin-bottom: 8px;">${article.title}</h2>
        <span style="display:inline-block; padding:4px 12px; background: var(--accounting-bg); color: var(--accounting-primary); font-size:12px; font-weight:700; border-radius: 12px;">${article.tag}</span>
      </div>
      <p style="color: var(--color-text-light); font-size: 14px; line-height: 1.8; margin-bottom: 16px;">${article.desc}</p>
      <div style="padding: 16px; background: linear-gradient(135deg, rgba(255,245,240,0.9), rgba(250,219,208,0.6)); border-radius: 12px; border-left: 4px solid var(--accounting-primary); margin-bottom: 16px;">
        <div style="font-size: 13px; font-weight: 700; color: var(--accounting-primary); margin-bottom: 4px;">💡 核心要点</div>
        <div style="font-size: 14px; color: #555; line-height: 1.7;">${article.point}</div>
      </div>
      <p style="font-size: 12px; color: var(--color-text-light); text-align:center;">理财先理脑，每天学一点，复利思维改变人生。</p>
    </div>
    <div style="display:flex; gap: 12px; justify-content: center; margin-top: 16px;">
      <button class="btn btn-primary" onclick="closeModal()">我知道了</button>
    </div>
  `);
};

window.deleteAccounting = function(id) {
  if (!confirm('确定删除这条记录？')) return;
  State.accounting = State.accounting.filter(a => a.id !== id);
  saveState('accounting');
  showToast('已删除', 'success');
  Router.handle();
};

// 历史总结详情
window.openHistoryDetail = function() {
  const months = {};
  State.accounting.forEach(a => {
    const d = new Date(a.date);
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!months[monthKey]) {
      months[monthKey] = { expense: 0, income: 0, records: [], categories: {} };
    }
    months[monthKey].records.push(a);
    if (a.type === 'expense') {
      months[monthKey].expense += a.amount;
      months[monthKey].categories[a.category] = (months[monthKey].categories[a.category] || 0) + a.amount;
    } else {
      months[monthKey].income += a.amount;
    }
  });
  
  const sortedMonths = Object.entries(months).sort((a, b) => b[0].localeCompare(a[0]));
  const years = {};
  sortedMonths.forEach(([month, data]) => {
    const year = month.split('-')[0];
    if (!years[year]) years[year] = [];
    years[year].push({ month, data });
  });
  
  showModal(`
    <h2 style="font-family: var(--font-title); margin-bottom: 20px; font-size: 22px;">📊 历史总结</h2>
    ${Object.keys(years).length === 0 ? `
      <div class="empty-state" style="padding: 32px;">
        <div class="empty-state-icon">📊</div>
        <div class="empty-state-text">还没有记账记录</div>
      </div>
    ` : Object.entries(years).map(([year, months]) => `
      <div class="year-group">
        <div class="year-group-title">${year}年</div>
        <div class="month-list">
          ${months.map(({ month, data }) => {
            const monthNum = month.split('-')[1];
            const topCategory = Object.entries(data.categories).sort((a, b) => b[1] - a[1])[0];
            const topCatName = topCategory ? (ACCOUNT_CATEGORIES.expense.find(c => c.id === topCategory[0])?.name || topCategory[0]) : '-';
            return `
              <div class="month-item" onclick="showMonthDetail('${month}')">
                <div class="month-item-header">
                  <div class="month-item-num">${parseInt(monthNum)}月</div>
                  <div class="month-item-stats">
                    <span style="color: var(--accounting-primary);">支出 ¥${data.expense.toFixed(0)}</span>
                    <span style="color: var(--tasks-primary); margin-left: 12px;">收入 ¥${data.income.toFixed(0)}</span>
                  </div>
                </div>
                <div class="month-item-summary">
                  结余 ¥${(data.income - data.expense).toFixed(0)} · 最多: ${topCatName} · ${data.records.length}笔
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `).join('')}
  `, () => {});
};

window.showMonthDetail = function(monthKey) {
  const months = {};
  State.accounting.forEach(a => {
    const d = new Date(a.date);
    const mKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!months[mKey]) {
      months[mKey] = { expense: 0, income: 0, records: [], categories: {} };
    }
    months[mKey].records.push(a);
    if (a.type === 'expense') {
      months[mKey].expense += a.amount;
      months[mKey].categories[a.category] = (months[mKey].categories[a.category] || 0) + a.amount;
    } else {
      months[mKey].income += a.amount;
    }
  });
  
  const data = months[monthKey];
  if (!data) return;
  
  const [year, month] = monthKey.split('-');
  const topCategory = Object.entries(data.categories).sort((a, b) => b[1] - a[1])[0];
  const topCatName = topCategory ? (ACCOUNT_CATEGORIES.expense.find(c => c.id === topCategory[0])?.name || topCategory[0]) : '-';
  
  showModal(`
    <h2 style="font-family: var(--font-title); margin-bottom: 16px; font-size: 22px;">📅 ${year}年${parseInt(month)}月账目详情</h2>
    
    <div class="month-summary-detail">
      <div class="month-summary-stat">
        <div class="month-summary-value expense">¥${data.expense.toFixed(0)}</div>
        <div class="month-summary-label">总支出</div>
      </div>
      <div class="month-summary-stat">
        <div class="month-summary-value income">¥${data.income.toFixed(0)}</div>
        <div class="month-summary-label">总收入</div>
      </div>
      <div class="month-summary-stat">
        <div class="month-summary-value balance">¥${(data.income - data.expense).toFixed(0)}</div>
        <div class="month-summary-label">结余</div>
      </div>
      <div class="month-summary-stat">
        <div class="month-summary-value" style="color: var(--accounting-primary);">${topCatName}</div>
        <div class="month-summary-label">支出最多</div>
      </div>
    </div>
    
    <h3 style="font-size: 16px; font-weight: 600; margin: 20px 0 12px;">账目明细</h3>
    <div class="accounting-list" style="max-height: 300px; overflow-y: auto;">
      ${data.records.sort((a, b) => new Date(b.date) - new Date(a.date)).map(item => {
        const catList = ACCOUNT_CATEGORIES[item.type];
        const cat = catList.find(c => c.id === item.category) || { name: item.category, icon: '📝' };
        return `
          <div class="accounting-item ${item.type}">
            <div class="accounting-icon">${cat.icon}</div>
            <div class="accounting-details">
              <div class="accounting-category">${cat.name}</div>
              ${item.note ? `<div class="accounting-note">${item.note}</div>` : ''}
            </div>
            <div>
              <div class="accounting-amount">${item.type === 'income' ? '+' : '-'}¥${item.amount.toFixed(2)}</div>
              <div class="accounting-date">${formatDate(item.date)}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `, () => {});
};

// ========================================
// 任务待办模块
// ========================================
function renderTasks(main) {
  const columns = {
    todo: { title: '待办', items: State.tasks.filter(t => t.status === 'todo') },
    'in-progress': { title: '进行中', items: State.tasks.filter(t => t.status === 'in-progress') },
    done: { title: '已完成', items: State.tasks.filter(t => t.status === 'done') }
  };
  
  main.innerHTML = `
    ${createPageHeader('任务待办', '让每一件事都有序进行', 'tasks')}
    
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px;">
      <div style="display:flex; gap: 12px;">
        <select id="taskFilter">
          <option value="all">全部</option>
          <option value="high">高优先级</option>
          <option value="medium">中优先级</option>
          <option value="low">低优先级</option>
        </select>
      </div>
      <button class="btn btn-primary" onclick="openTaskModal()">+ 新建任务</button>
    </div>
    
    <div class="task-board">
      ${Object.entries(columns).map(([key, col]) => `
        <div class="task-column">
          <div class="task-column-title">
            ${col.title}
            <span class="task-count">${col.items.length}</span>
          </div>
          ${col.items.length === 0 ? `
            <div style="text-align:center; padding: 24px; color: var(--color-text-light); font-size: 13px;">
              暂无任务
            </div>
          ` : col.items.map(task => `
            <div class="task-card priority-${task.priority}" onclick="openTaskDetail('${task.id}')">
              <div class="task-card-title">${task.title}</div>
              ${task.description ? `<div class="task-card-desc">${task.description}</div>` : ''}
              <div class="task-card-meta">
                <span class="tag tag-priority-${task.priority}">${task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}优先级</span>
                ${task.dueDate ? `<span>📅 ${formatDate(task.dueDate)}</span>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>
  `;
}

window.openTaskModal = function(taskId) {
  const task = taskId ? State.tasks.find(t => t.id === taskId) : null;
  const isEdit = !!task;
  
  showModal(`
    <h2 style="font-family: var(--font-title); margin-bottom: 20px; font-size: 22px;">${isEdit ? '编辑任务' : '新建任务'}</h2>
    <div class="input-group">
      <label>标题</label>
      <input type="text" id="taskTitle" value="${task?.title || ''}" placeholder="任务标题">
    </div>
    <div class="input-group">
      <label>描述</label>
      <textarea id="taskDesc" placeholder="任务描述...">${task?.description || ''}</textarea>
    </div>
    <div class="input-group">
      <label>优先级</label>
      <select id="taskPriority">
        <option value="low" ${task?.priority === 'low' ? 'selected' : ''}>低</option>
        <option value="medium" ${task?.priority === 'medium' ? 'selected' : ''}>中</option>
        <option value="high" ${task?.priority === 'high' ? 'selected' : ''}>高</option>
      </select>
    </div>
    <div class="input-group">
      <label>截止日期</label>
      <input type="date" id="taskDate" value="${task?.dueDate || ''}">
    </div>
    <div class="input-group">
      <label>状态</label>
      <select id="taskStatus">
        <option value="todo" ${task?.status === 'todo' ? 'selected' : ''}>待办</option>
        <option value="in-progress" ${task?.status === 'in-progress' ? 'selected' : ''}>进行中</option>
        <option value="done" ${task?.status === 'done' ? 'selected' : ''}>已完成</option>
      </select>
    </div>
    <div style="display: flex; gap: 12px; margin-top: 16px;">
      <button class="btn btn-primary" style="flex:1;" onclick="saveTask('${taskId || ''}')">${isEdit ? '保存修改' : '创建任务'}</button>
      ${isEdit ? `<button class="btn btn-outline" onclick="deleteTask('${taskId}')">删除</button>` : ''}
    </div>
  `);
};

window.saveTask = function(taskId) {
  const data = {
    title: document.getElementById('taskTitle').value,
    description: document.getElementById('taskDesc').value,
    priority: document.getElementById('taskPriority').value,
    status: document.getElementById('taskStatus').value,
    dueDate: document.getElementById('taskDate').value || null
  };
  
  if (!data.title.trim()) {
    showToast('请输入任务标题', 'error');
    return;
  }
  
  if (taskId) {
    const idx = State.tasks.findIndex(t => t.id === taskId);
    State.tasks[idx] = { ...State.tasks[idx], ...data };
  } else {
    State.tasks.push({
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
      completedAt: data.status === 'done' ? new Date().toISOString() : null
    });
  }
  
  saveState('tasks');
  closeModal();
  showToast(taskId ? '已更新' : '任务已创建', 'success');
  Router.handle();
};

window.openTaskDetail = function(id) {
  openTaskModal(id);
};

window.deleteTask = function(id) {
  if (!confirm('确定删除此任务？')) return;
  State.tasks = State.tasks.filter(t => t.id !== id);
  saveState('tasks');
  closeModal();
  showToast('已删除', 'success');
  Router.handle();
};

// ========================================
// 练字模块
// ========================================
function renderCalligraphy(main, params) {
  const totalMinutes = State.calligraphyLogs.reduce((sum, log) => sum + log.duration, 0);
  const goodChars = State.goodCharacters.length > 0 ? State.goodCharacters : GOOD_CHARACTERS;
  const lyrics = State.lyricCollections.length > 0 ? State.lyricCollections : LYRIC_COLLECTIONS;
  
  main.innerHTML = `
    ${createPageHeader('练字', '一笔一画见真章', 'calligraphy')}
    
    <div class="stats-row calligraphy-stats-row">
      <div class="stat-card">
        <div class="stat-label">累计练习</div>
        <div class="stat-value"><span class="stat-num">${totalMinutes}</span><span class="stat-unit">分钟</span></div>
      </div>
      <div class="stat-card">
        <div class="stat-label">练习次数</div>
        <div class="stat-value"><span class="stat-num">${State.calligraphyLogs.length}</span><span class="stat-unit">次</span></div>
      </div>
    </div>
    
    <h2 style="font-size: 18px; font-weight: 600; margin: 24px 0 16px;">📚 学习资源</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
      <div onclick="openDouyinApp('练字')" style="padding: 20px; background: linear-gradient(135deg, #fff5f5 0%, #ffe6e6 100%); border-radius: 12px; text-decoration: none; color: inherit; display: flex; align-items: center; gap: 12px; cursor: pointer;">
        <div style="font-size: 36px;">🎵</div>
        <div>
          <div style="font-weight: 600; margin-bottom: 4px;">抖音搜索</div>
          <div style="font-size: 12px; color: #666;">搜索练字视频教程</div>
        </div>
      </div>
      <div onclick="openBilibiliApp('练字教程')" style="padding: 20px; background: linear-gradient(135deg, #e6f4ff 0%, #cceaff 100%); border-radius: 12px; text-decoration: none; color: inherit; display: flex; align-items: center; gap: 12px; cursor: pointer;">
        <div style="font-size: 36px;">📺</div>
        <div>
          <div style="font-weight: 600; margin-bottom: 4px;">B站教程</div>
          <div style="font-size: 12px; color: #666;">丰富练字教学视频</div>
        </div>
      </div>
      <div onclick="openNeteaseApp()" style="padding: 20px; background: linear-gradient(135deg, #f0fff0 0%, #e6ffe6 100%); border-radius: 12px; text-decoration: none; color: inherit; display: flex; align-items: center; gap: 12px; cursor: pointer;">
        <div style="font-size: 36px;">🎶</div>
        <div>
          <div style="font-weight: 600; margin-bottom: 4px;">网易云音乐</div>
          <div style="font-size: 12px; color: #666;">听歌学歌词</div>
        </div>
      </div>
    </div>
    
    <div style="margin-top: 16px; text-align: right;">
      <button class="btn btn-primary" onclick="openLogPracticeModal()">✍️ 记录练习</button>
    </div>
    
    <h2 style="font-size: 18px; font-weight: 600; margin: 24px 0 16px;">✨ 好字收集相册</h2>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <span style="color: #666; font-size: 13px;">拍下你写的好字，留存每一次进步（双击删除）</span>
      <button class="btn btn-primary" onclick="openAddGoodCharModal()">+ 添加照片</button>
    </div>
    <div class="good-char-album">
      ${goodChars.length === 0 ? `
        <div class="empty-state" style="grid-column: 1/-1;">
          <div class="empty-state-icon">📸</div>
          <div class="empty-state-text">还没有收藏好字照片，点击添加吧</div>
        </div>
      ` : goodChars.map((ch, idx) => `
        <div class="good-char-photo" ondblclick="removeGoodChar(${idx})">
          <img src="${ch.photoUrl || ch.char}" alt="${ch.source || '好字'}" onerror="this.style.display='none'">
          <div class="good-char-photo-label">${ch.source || ''}</div>
          ${ch.date ? `<div class="good-char-photo-date">${ch.date}</div>` : ''}
        </div>
      `).join('')}
    </div>
    
    <h2 style="font-size: 18px; font-weight: 600; margin: 32px 0 16px;">📝 经典歌词收录</h2>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <span style="color: #666; font-size: 13px;">收藏喜欢的歌词，练字更有韵味（双击删除）</span>
      <button class="btn btn-primary" onclick="openAddLyricModal()">+ 添加歌词</button>
    </div>
    <div>
      ${lyrics.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state-icon">🎼</div>
          <div class="empty-state-text">还没有收录歌词</div>
        </div>
      ` : lyrics.map((lyric, idx) => `
        <div style="background: #f5f0fa; border-radius: 12px; padding: 16px; margin-bottom: 10px; cursor: pointer;" ondblclick="removeLyric(${idx})">
          <div style="font-size: 15px; line-height: 1.8; font-family: 'KaiTi', '楷体', serif;">${lyric.content}</div>
          <div style="font-size: 12px; color: #999; margin-top: 8px;">${lyric.source || ''} · ${lyric.singer || ''}</div>
        </div>
      `).join('')}
    </div>
    
    ${State.calligraphyLogs.length > 0 ? `
      <h2 style="font-size: 18px; font-weight: 600; margin: 32px 0 16px;">练习记录</h2>
      <div class="accounting-list">
        ${State.calligraphyLogs.slice(-5).reverse().map(log => `
          <div class="accounting-item income">
            <div class="accounting-icon">✍️</div>
            <div class="accounting-details">
              <div class="accounting-category">练习${log.characters ? log.characters.join('、') : '自由'}</div>
              <div class="accounting-note">${log.copybookTitle || '自由练习'} · ${log.duration}分钟</div>
            </div>
            <div class="accounting-date">${formatDate(log.date)}</div>
          </div>
        `).join('')}
      </div>
    ` : ''}
  `;
}

// 练字弹窗计时器
let practiceTimerInterval = null;
let practiceTimerSeconds = 0;
let practiceTimerRunning = false;

window.openLogPracticeModal = function() {
  practiceTimerSeconds = 0;
  practiceTimerRunning = false;
  showModal(`
    <h2 style="font-family: var(--font-title); margin-bottom: 20px; font-size: 22px;">记录练习</h2>
    <div class="input-group">
      <label>练习内容（选填）</label>
      <input type="text" id="practiceContent" placeholder="如：临摹兰亭序">
    </div>
    <div class="input-group">
      <label>练习时长（分钟）</label>
      <div style="display: flex; gap: 10px; align-items: center;">
        <input type="number" id="practiceDuration" value="15" min="1" style="flex: 1;">
        <div class="modal-timer-box" id="modalTimerBox">
          <span class="modal-timer-display" id="modalTimerDisplay">00:00</span>
          <button type="button" class="modal-timer-btn" id="modalTimerBtn" onclick="toggleModalTimer()">▶ 计时</button>
        </div>
      </div>
    </div>
    <button class="btn btn-primary btn-block" onclick="savePracticeLog()">保存记录</button>
  `);
};

window.toggleModalTimer = function() {
  const btn = document.getElementById('modalTimerBtn');
  const display = document.getElementById('modalTimerDisplay');
  const box = document.getElementById('modalTimerBox');
  const durationInput = document.getElementById('practiceDuration');
  
  if (!practiceTimerRunning) {
    practiceTimerRunning = true;
    practiceTimerSeconds = 0;
    btn.textContent = '⏹ 停止';
    box.classList.add('running');
    
    practiceTimerInterval = setInterval(() => {
      practiceTimerSeconds++;
      const mins = Math.floor(practiceTimerSeconds / 60);
      const secs = practiceTimerSeconds % 60;
      display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      durationInput.value = Math.max(1, Math.round(practiceTimerSeconds / 60));
    }, 1000);
  } else {
    clearInterval(practiceTimerInterval);
    practiceTimerRunning = false;
    btn.textContent = '▶ 计时';
    box.classList.remove('running');
    durationInput.value = Math.max(1, Math.round(practiceTimerSeconds / 60));
  }
};

window.savePracticeLog = function() {
  if (practiceTimerRunning) {
    clearInterval(practiceTimerInterval);
    practiceTimerRunning = false;
  }
  
  const content = document.getElementById('practiceContent').value.trim();
  const duration = parseInt(document.getElementById('practiceDuration').value) || 15;
  
  State.calligraphyLogs.push({
    id: generateId(),
    copybookId: 'free',
    copybookTitle: content || '自由练习',
    characters: content ? [content] : [],
    date: getToday(),
    duration,
    createdAt: new Date().toISOString()
  });
  
  saveState('calligraphyLogs');
  closeModal();
  showToast('练习记录已保存', 'success');
  Router.handle();
};

window.openAddGoodCharModal = function() {
  showModal(`
    <h2 style="font-family: var(--font-title); margin-bottom: 20px; font-size: 22px;">添加好字照片</h2>
    <div class="input-group">
      <label>选择照片</label>
      <input type="file" id="goodCharFile" accept="image/*" capture="environment" class="file-upload-btn">
    </div>
    <div class="image-preview" id="goodCharPreview" style="display:none;"></div>
    <div class="input-group">
      <label>备注（选填）</label>
      <input type="text" id="goodCharSource" placeholder="如：临摹《兰亭序》">
    </div>
    <button class="btn btn-primary btn-block" onclick="saveGoodChar()">保存</button>
  `, (content) => {
    const fileInput = content.querySelector('#goodCharFile');
    const preview = content.querySelector('#goodCharPreview');
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const dataUrl = await compressImage(file, 800);
        preview.style.display = 'block';
        preview.innerHTML = `<img src="${dataUrl}" alt="预览" style="max-width:100%; max-height:200px; border-radius:8px;">`;
        preview.dataset.url = dataUrl;
      } catch (err) {
        showToast('图片处理失败', 'error');
      }
    });
  });
};

window.saveGoodChar = function() {
  const preview = document.getElementById('goodCharPreview');
  const photoUrl = preview?.dataset.url;
  const source = document.getElementById('goodCharSource').value.trim();
  
  if (!photoUrl) {
    showToast('请先选择照片', 'error');
    return;
  }
  
  State.goodCharacters.push({
    id: generateId(),
    photoUrl,
    char: photoUrl,
    source,
    date: getToday()
  });
  
  saveState('goodCharacters');
  closeModal();
  showToast('好字照片已收藏', 'success');
  Router.handle();
};

window.removeGoodChar = function(idx) {
  if (!confirm('确定删除这个好字收藏？')) return;
  State.goodCharacters.splice(idx, 1);
  saveState('goodCharacters');
  Router.handle();
};

window.openAddLyricModal = function() {
  showModal(`
    <h2 style="font-family: var(--font-title); margin-bottom: 20px; font-size: 22px;">添加歌词</h2>
    <div class="input-group">
      <label>歌词内容</label>
      <textarea id="lyricContent" placeholder="输入你喜欢的歌词" style="min-height: 80px;"></textarea>
    </div>
    <div class="input-group">
      <label>出处（选填）</label>
      <input type="text" id="lyricSource" placeholder="如：《青花瓷》">
    </div>
    <div class="input-group">
      <label>歌手/作者（选填）</label>
      <input type="text" id="lyricSinger" placeholder="如：周杰伦">
    </div>
    <button class="btn btn-primary btn-block" onclick="saveLyric()">保存</button>
  `);
};

window.saveLyric = function() {
  const content = document.getElementById('lyricContent').value.trim();
  const source = document.getElementById('lyricSource').value.trim();
  const singer = document.getElementById('lyricSinger').value.trim();
  
  if (!content) {
    showToast('请输入歌词内容', 'error');
    return;
  }
  
  State.lyricCollections.push({
    id: generateId(),
    content,
    source,
    singer
  });
  
  saveState('lyricCollections');
  closeModal();
  showToast('歌词已收录', 'success');
  Router.handle();
};

window.removeLyric = function(idx) {
  if (!confirm('确定删除这首歌词？')) return;
  State.lyricCollections.splice(idx, 1);
  saveState('lyricCollections');
  Router.handle();
};

// ========================================
// 英语学习模块
// ========================================
function renderEnglish(main) {
  const todayIdx = getDailyIndex(ENGLISH_DAILY.topics);
  const dailyTopic = ENGLISH_DAILY.topics[todayIdx];
  const dailySentence = ENGLISH_DAILY.dailySentences[getDailyIndex(ENGLISH_DAILY.dailySentences)];
  const grammarPoint = ENGLISH_DAILY.grammarPoints[getDailyIndex(ENGLISH_DAILY.grammarPoints)];
  const todayLog = State.englishLogs.find(l => l.date === getToday()) || null;
  
  main.innerHTML = `
    ${createPageHeader('英语学习', '每日听说读写，与世界对话', 'english')}
    
    <div class="english-tabs">
      <button class="tab-btn active" data-tab="speak">🎙️ 跟读</button>
      <button class="tab-btn" data-tab="learn">📚 学习</button>
      <button class="tab-btn" data-tab="diary">📝 日记</button>
      <button class="tab-btn" data-tab="grammar">📖 语法</button>
    </div>
    
    <div class="tab-content" id="tab-speak">
      <div class="card english-card">
        <div class="english-sentence">
          <div class="sentence-en">"${dailySentence.en}"</div>
          <div class="sentence-zh">${dailySentence.zh}</div>
          <div class="sentence-source">— ${dailySentence.source}</div>
        </div>
        <div class="speak-controls">
          <button class="btn btn-secondary" onclick="speakText('${dailySentence.en}')">🔊 播放示范</button>
          <button class="btn btn-primary" onclick="startShadowing()">🎤 跟读评分</button>
        </div>
        <div id="shadowingResult" style="display:none; margin-top: 20px; padding: 20px; background: var(--english-bg); border-radius: var(--radius-md);">
          <div style="display:flex; align-items:center; gap: 20px;">
            <div class="score-circle-big" id="scoreCircle" style="width:80px; height:80px; border-radius:50%; background:var(--english-primary); color:white; display:flex; align-items:center; justify-content:center; font-size:24px; font-weight:700;">--</div>
            <div style="flex:1;">
              <div style="font-weight:600; margin-bottom:6px;">相似度评分</div>
              <div id="scoreTips" style="font-size:13px; line-height:1.6;"></div>
            </div>
          </div>
        </div>
      </div>
      ${todayLog ? `
        <div class="card">
          <div class="card-title">今日跟读记录</div>
          <div style="display:flex; gap: 16px; margin-top: 12px;">
            <div class="stat-box" style="flex:1;">
              <div class="stat-box-label">最高评分</div>
              <div class="stat-box-value" style="color: var(--english-primary);">${todayLog.bestScore || 0}%</div>
            </div>
            <div class="stat-box" style="flex:1;">
              <div class="stat-box-label">练习次数</div>
              <div class="stat-box-value" style="color: var(--english-secondary);">${todayLog.attempts || 0}</div>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
    
    <div class="tab-content" id="tab-learn" style="display:none;">
      <div class="card english-card">
        <div class="level-badge">${dailyTopic.level}</div>
        <h2 class="topic-title">${dailyTopic.title}</h2>
        <div class="vocab-list">
          <div class="vocab-label">核心词汇</div>
          <div style="display:flex; flex-wrap:wrap; gap:8px;">
            ${dailyTopic.vocab.map(v => `<span style="padding:6px 12px; background:var(--english-bg); border-radius:50px; font-size:13px;">${v}</span>`).join('')}
          </div>
        </div>
        <div style="margin-top: 16px;">
          <div class="vocab-label">今日语法: ${dailyTopic.grammar}</div>
          <div class="example-text" style="margin-top:8px; padding:12px; background:var(--color-bg-alt); border-radius:var(--radius-md);">"${dailyTopic.sentence}"</div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">💬 AI 互动问答</div>
        <div id="chatBox" style="max-height: 250px; overflow-y:auto; margin-bottom: 12px;">
          <div style="background:var(--color-bg-alt); padding:10px 14px; border-radius:var(--radius-md); font-size:14px;">Hi! Today's topic is "${dailyTopic.title}". Feel free to ask me anything!</div>
        </div>
        <div style="display:flex; gap:8px;">
          <input type="text" id="chatInput" style="flex:1; padding:10px; border:1px solid var(--color-border); border-radius:var(--radius-md);" placeholder="Type in English..." onkeypress="if(event.key==='Enter')sendChat()">
          <button class="btn btn-primary" onclick="sendChat()">发送</button>
        </div>
      </div>
      <div class="resource-grid">
        <a class="resource-card" href="https://www.bbclearningenglish.com/" target="_blank">
          <div class="resource-icon">📻</div>
          <div class="resource-name">BBC Learning</div>
          <div class="resource-desc">英语听力与新闻</div>
        </a>
        <a class="resource-card" href="https://www.duolingo.com/" target="_blank">
          <div class="resource-icon">🦉</div>
          <div class="resource-name">Duolingo</div>
          <div class="resource-desc">趣味闯关学英语</div>
        </a>
        <a class="resource-card" href="https://ted.com/" target="_blank">
          <div class="resource-icon">🎤</div>
          <div class="resource-name">TED Talks</div>
          <div class="resource-desc">演讲与口语模仿</div>
        </a>
        <a class="resource-card" href="https://www.grammarly.com/" target="_blank">
          <div class="resource-icon">✏️</div>
          <div class="resource-name">Grammarly</div>
          <div class="resource-desc">写作语法检查</div>
        </a>
        <a class="resource-card" onclick="openEudicApp()" href="javascript:void(0)">
          <div class="resource-icon">📖</div>
          <div class="resource-name">欧路词典</div>
          <div class="resource-desc">英汉双解词典</div>
        </a>
        <a class="resource-card" href="https://www.oxfordlearnersdictionaries.com/" target="_blank">
          <div class="resource-icon">📚</div>
          <div class="resource-name">牛津学习</div>
          <div class="resource-desc">牛津词典在线</div>
        </a>
      </div>
      
      <div class="card" style="margin-top: 16px;">
        <div class="card-title">📻 BBC Learning English 精选</div>
        <div class="bbc-articles">
          ${(BBC_ARTICLES || []).map(article => `
            <a href="${article.url}" target="_blank" class="bbc-article-link">
              <span class="bbc-level-tag">${article.level}</span>
              <span class="bbc-article-title">${article.title}</span>
              <span class="bbc-article-arrow">→</span>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
    
    <div class="tab-content" id="tab-diary" style="display:none;">
      <div class="card">
        <div class="card-title">📝 今日英语日记</div>
        <div style="padding:10px 14px; background:var(--english-bg); border-radius:var(--radius-md); font-size:13px; color:var(--color-text-light); margin-bottom:12px;">
          💡 今日话题: How was your day? Describe your thoughts about "${dailyTopic.title}".
        </div>
        <textarea id="diaryInput" style="width:100%; min-height:150px; padding:12px; border:1px solid var(--color-border); border-radius:var(--radius-md); font-size:14px; resize:vertical;" placeholder="Write your diary here in English..."></textarea>
        <div style="display:flex; gap:12px; margin-top:12px;">
          <button class="btn btn-primary" onclick="submitDiary()">🤖 AI批改</button>
          <button class="btn btn-outline" onclick="saveDiary()">💾 保存日记</button>
        </div>
        <div id="diaryResult" style="margin-top: 16px;"></div>
      </div>
      ${State.englishDiary.length > 0 ? `
        <div class="card">
          <div class="card-title">历史日记</div>
          ${State.englishDiary.slice(-3).reverse().map(d => `
            <div style="padding: 10px 0; border-bottom: 1px solid var(--color-border);">
              <div style="font-size:12px; color:var(--color-text-light);">${formatDate(d.date)}${d.score ? ` · 评分 ${d.score}` : ''}</div>
              <div style="font-size:13px; margin-top:4px; line-height:1.5;">${d.content.slice(0, 80)}${d.content.length > 80 ? '...' : ''}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
    
    <div class="tab-content" id="tab-grammar" style="display:none;">
      <div class="card">
        <div class="card-title">📖 ${grammarPoint.title}</div>
        <p style="line-height:1.8; margin: 12px 0;">${grammarPoint.explanation}</p>
        <div style="background:var(--color-bg-alt); padding:12px; border-radius:var(--radius-md);">
          <div class="vocab-label">例句</div>
          ${grammarPoint.examples.map((ex, i) => `<div style="margin:6px 0; font-size:14px;">${i+1}. ${ex}</div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-title">✏️ 语法练习</div>
        <p style="font-size:13px; color:var(--color-text-light); margin-bottom:12px;">用"${grammarPoint.title}"造句</p>
        <textarea id="quizInput" style="width:100%; min-height:80px; padding:10px; border:1px solid var(--color-border); border-radius:var(--radius-md);" placeholder="Write your sentence..."></textarea>
        <button class="btn btn-primary" style="margin-top:10px;" onclick="submitQuiz()">提交</button>
        <div id="quizResult" style="margin-top: 12px;"></div>
      </div>
    </div>
  `;
  
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
      document.getElementById(`tab-${tab}`).style.display = 'block';
    });
  });
}

window.speakText = function(text) {
  if (!window.speechSynthesis) { showToast('浏览器不支持语音合成', 'error'); return; }
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US'; u.rate = 0.85;
  window.speechSynthesis.speak(u);
};

window.startShadowing = function() {
  const sentence = document.querySelector('.sentence-en')?.textContent || '';
  const resultDiv = document.getElementById('shadowingResult');
  const scoreCircle = document.getElementById('scoreCircle');
  const scoreTips = document.getElementById('scoreTips');
  
  // 显示输入框让用户手动输入朗读的内容
  resultDiv.style.display = 'block';
  scoreCircle.textContent = '?';
  scoreTips.innerHTML = `
    <div style="font-weight:600; margin-bottom:8px;">🎤 跟读评分</div>
    <div style="font-size:13px; margin-bottom:12px;">请朗读句子，然后把你读到的内容输入到下方框中</div>
    <div style="display:flex; gap:8px;">
      <input type="text" id="spokenInput" style="flex:1; padding:10px; border:1px solid var(--color-border); border-radius:var(--radius-md);" placeholder="输入你读到的英文...">
      <button class="btn btn-primary" onclick="scoreSpokenText()">评分</button>
    </div>
  `;
};

window.scoreSpokenText = function() {
  const sentence = document.querySelector('.sentence-en')?.textContent || '';
  const spoken = document.getElementById('spokenInput').value.trim();
  if (!spoken) {
    showToast('请先输入你读到的内容', 'error');
    return;
  }
  
  const target = sentence.replace(/[^a-zA-Z\s']/g, '').toLowerCase().trim();
  const sp = spoken.replace(/[^a-zA-Z\s']/g, '').toLowerCase().trim();
  const tw = target.split(/\s+/).filter(w => w.length > 0);
  const sw = sp.split(/\s+/).filter(w => w.length > 0);
  
  // 计算单词匹配率
  let matches = 0;
  const matchedWords = [];
  tw.forEach(w => {
    if (sw.some(s => s === w || (w.length >= 3 && s.includes(w)))) {
      matches++;
      matchedWords.push(w);
    }
  });
  
  // 计算完全匹配的单词数
  let exactMatches = 0;
  tw.forEach((w, i) => {
    if (sw[i] === w) exactMatches++;
  });
  
  const wordScore = tw.length > 0 ? (matches / tw.length) * 70 : 0;
  const exactScore = tw.length > 0 ? (exactMatches / tw.length) * 30 : 0;
  const score = Math.round(wordScore + exactScore);
  
  const scoreCircle = document.getElementById('scoreCircle');
  const scoreTips = document.getElementById('scoreTips');
  
  scoreCircle.textContent = score;
  let level, tip;
  if (score >= 90) { level = '🌟 极佳！'; tip = '发音非常清晰，继续保持！'; }
  else if (score >= 75) { level = '😊 很好！'; tip = '发音良好，注意语调节奏。'; }
  else if (score >= 60) { level = '👍 不错！'; tip = '基本传达意思，多练习连读。'; }
  else if (score >= 40) { level = '💪 继续加油！'; tip = '建议慢速练习每个单词。'; }
  else { level = '📖 别灰心！'; tip = '从单词发音开始，慢慢来。'; }
  
  scoreTips.innerHTML = `
    <div style="font-weight:600; margin-bottom:8px;">${level}</div>
    <div style="font-size:13px; margin-bottom:8px;">${tip}</div>
    <div style="font-size:12px; color: var(--color-text-light);">
      目标句: ${sentence}<br>
      你的朗读: ${spoken}<br>
      匹配词: ${matches}/${tw.length} 个单词
    </div>
    <button class="btn btn-secondary" style="margin-top:12px;" onclick="startShadowing()">重新评分</button>
  `;
  
  // 保存记录
  const today = getToday();
  let log = State.englishLogs.find(l => l.date === today);
  if (!log) { log = { date: today, attempts: 0, bestScore: 0 }; State.englishLogs.push(log); }
  log.attempts++;
  log.bestScore = Math.max(log.bestScore, score);
  saveState('englishLogs');
  showToast(`评分: ${score}分`, 'success');
};

window.sendChat = function() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim(); if (!text) return;
  const box = document.getElementById('chatBox');
  box.innerHTML += `<div style="background:var(--color-bg); padding:10px 14px; border-radius:var(--radius-md); margin:8px 0 8px auto; max-width:80%; font-size:14px; text-align:right;">${text}</div>`;
  input.value = '';
  const topic = ENGLISH_DAILY.topics[getDailyIndex(ENGLISH_DAILY.topics)];
  setTimeout(() => {
    const reply = text.toLowerCase().includes('grammar') ? `Today's grammar is "${topic.grammar}". Example: "${topic.sentence}"` :
                  text.toLowerCase().includes('vocab') ? `Vocabulary: ${topic.vocab.join(', ')}. Try using them!` :
                  `Great! Let's talk about "${topic.title}". What do you think? Try using "${topic.grammar}".`;
    box.innerHTML += `<div style="background:var(--english-bg); padding:10px 14px; border-radius:var(--radius-md); margin:8px 0; max-width:80%; font-size:14px;">${reply}</div>`;
    box.scrollTop = box.scrollHeight;
  }, 400);
  box.scrollTop = box.scrollHeight;
};

window.submitDiary = function() {
  const diary = document.getElementById('diaryInput').value.trim();
  if (!diary) { showToast('请先写内容', 'error'); return; }
  const words = diary.split(/\s+/).filter(Boolean);
  const wc = words.length; const avgLen = wc > 0 ? words.reduce((s,w)=>s+w.length,0)/wc : 0;
  const score = Math.max(30, Math.min(100, Math.floor(wc * 1.5 + avgLen * 5)));
  const tips = [];
  if (wc < 30) tips.push('📝 字数偏少，建议30词以上');
  if (avgLen > 5) tips.push('✨ 使用了丰富词汇');
  if (!/[.!?]$/.test(diary)) tips.push('⚠️ 记得添加句末标点');
  const topic = ENGLISH_DAILY.grammarPoints[getDailyIndex(ENGLISH_DAILY.grammarPoints)];
  document.getElementById('diaryResult').innerHTML = `
    <div style="padding:16px; background:var(--color-bg-alt); border-radius:var(--radius-md);">
      <div style="display:flex; align-items:center; gap:16px; margin-bottom:12px;">
        <div style="width:60px; height:60px; border-radius:50%; background:var(--english-primary); color:white; display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:700;">${score}</div>
        <div><div style="font-weight:600;">AI批改完成</div><div style="font-size:12px; color:var(--color-text-light);">词数: ${wc} · 平均词长: ${avgLen.toFixed(1)}字母</div></div>
      </div>
      ${tips.map(t => `<div style="font-size:13px; margin:4px 0;">${t}</div>`).join('')}
      <div style="font-size:13px; margin-top:8px; color:var(--color-text-light);">💡 建议使用今日语法: ${topic.title} - ${topic.explanation}</div>
    </div>
  `;
};

window.saveDiary = function() {
  const diary = document.getElementById('diaryInput').value.trim();
  if (!diary) { showToast('请先写内容', 'error'); return; }
  State.englishDiary.push({ id: generateId(), content: diary, date: getToday(), createdAt: new Date().toISOString() });
  saveState('englishDiary'); showToast('日记已保存', 'success'); Router.handle();
};

window.submitQuiz = function() {
  const ans = document.getElementById('quizInput').value.trim();
  const res = document.getElementById('quizResult');
  if (!ans) { res.innerHTML = '<div style="color:var(--color-error);">请先写句子</div>'; return; }
  const gp = ENGLISH_DAILY.grammarPoints[getDailyIndex(ENGLISH_DAILY.grammarPoints)];
  const kws = gp.title.toLowerCase().split(/\s+/);
  const match = kws.some(kw => kw.length > 3 && ans.toLowerCase().includes(kw));
  res.innerHTML = `<div style="padding:12px; background:var(--color-bg-alt); border-radius:var(--radius-md); font-size:13px; line-height:1.6;">${match ? '✅ 包含相关语法，很棒！' : '⚠️ 尝试使用 "' + gp.title + '"'}<br>${gp.explanation}</div>`;
};

// ========================================
// 影集模块
// ========================================
const RECOMMENDED_FILMS = [
  { title: '肖申克的救赎', type: '电影', genre: ['剧情', '励志'], rating: 5, reason: '希望是美好的，也许是人间至善，而美好的事物永不消逝。', year: '1994', director: '弗兰克·德拉邦特' },
  { title: '霸王别姬', type: '电影', genre: ['剧情', '爱情'], rating: 5, reason: '风华绝代，张国荣的程蝶衣成为影史经典。', year: '1993', director: '陈凯歌' },
  { title: '阿甘正传', type: '电影', genre: ['剧情', '励志'], rating: 5, reason: '人生就像一盒巧克力，你永远不知道下一颗是什么味道。', year: '1994', director: '罗伯特·泽米吉斯' },
  { title: '千与千寻', type: '动画', genre: ['奇幻', '治愈'], rating: 5, reason: '宫崎骏的童话世界，成长与勇气的寓言。', year: '2001', director: '宫崎骏' },
  { title: '泰坦尼克号', type: '电影', genre: ['爱情', '剧情'], rating: 5, reason: '你跳，我就跳。经典爱情史诗。', year: '1997', director: '詹姆斯·卡梅隆' },
  { title: '盗梦空间', type: '电影', genre: ['科幻', '悬疑'], rating: 5, reason: '层层嵌套的梦境，烧脑与视觉的双重盛宴。', year: '2010', director: '克里斯托弗·诺兰' },
  { title: '星际穿越', type: '电影', genre: ['科幻', '剧情'], rating: 5, reason: '爱是唯一能够超越时空维度的力量。', year: '2014', director: '克里斯托弗·诺兰' },
  { title: '教父', type: '电影', genre: ['剧情', '犯罪'], rating: 5, reason: '一个拒绝不了的请求。影史黑帮片巅峰。', year: '1972', director: '弗朗西斯·福特·科波拉' },
  { title: '当幸福来敲门', type: '电影', genre: ['剧情', '励志'], rating: 5, reason: '如果你有梦想，就要捍卫它。', year: '2006', director: '加布里尔·穆奇诺' },
  { title: '寻梦环游记', type: '动画', genre: ['奇幻', '治愈'], rating: 5, reason: '请记住我，在爱的记忆消失以前。', year: '2017', director: '李·昂克里奇' },
  { title: '海上钢琴师', type: '电影', genre: ['剧情', '音乐'], rating: 5, reason: '1900的传奇，关于选择与自由的诗意独白。', year: '1998', director: '朱塞佩·托纳多雷' },
  { title: '三傻大闹宝莱坞', type: '电影', genre: ['喜剧', '励志'], rating: 5, reason: 'All is well! 反抗刻板教育，追求自我的成长故事。', year: '2009', director: '拉吉库马尔·希拉尼' }
];

function renderFilms(main) {
  main.innerHTML = `
    ${createPageHeader('影集', '记录每一次观影的感动', 'films')}
    
    <div style="display:flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; align-items: center;">
      <h2 style="font-size: 18px; font-weight: 600; margin: 0;">🎬 我的观影记录</h2>
      <div style="flex:1;"></div>
      <button class="btn btn-primary" onclick="openFilmModal()">+ 添加影片</button>
    </div>
    
    <div class="film-grid" id="filmGrid" style="margin-bottom: 32px;">
      ${State.films.length === 0 ? `
        <div class="empty-state" style="grid-column: 1/-1;">
          <div class="empty-state-icon">🎬</div>
          <div class="empty-state-text">还没有观影记录，从下方推荐开始吧</div>
        </div>
      ` : State.films.map(film => `
        <div class="film-card" onclick="openFilmModal('${film.id}')">
          <div class="film-poster">
            <span style="font-size: 48px;">🎬</span>
            ${film.rating ? `<div class="film-rating">★ ${film.rating}</div>` : ''}
          </div>
          <div class="film-body">
            <div class="film-title">${film.title}</div>
            <div class="film-genre">${film.type}</div>
            ${film.reason ? `<div class="film-reason">💡 ${film.reason}</div>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
    
    <div style="border-top: 1px solid #eee; margin: 24px 0;"></div>
    
    <h2 style="font-size: 18px; font-weight: 600; margin: 0 0 16px;">🏆 高分经典电影推荐</h2>
    <div class="film-grid">
      ${CLASSIC_FILMS.map(film => `
        <div class="film-card">
          <div class="film-poster" onclick="showFilmDetail('${film.id}')" style="background: var(--films-bg);">
            <img src="${film.poster}" alt="${film.title}" referrerpolicy="no-referrer" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\\'font-size:48px;\\'>🎬</span>'">
            <div class="film-rating">★ ${film.rating}</div>
          </div>
          <div class="film-body">
            <div class="film-title">${film.title}</div>
            <div class="film-genre">${film.year} · ${film.director} · ${film.genre}</div>
            <div class="film-reason">💡 ${film.reason}</div>
            <div class="film-card-actions">
              <a href="https://search.bilibili.com/all?keyword=${encodeURIComponent(film.title)}" target="_blank" class="film-watch-link">▶ 观影</a>
              <button class="film-add-btn" onclick="addClassicFilm('${film.id}')">+ 添加到观影记录</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

window.showFilmDetail = function(filmId) {
  const film = CLASSIC_FILMS.find(f => f.id === filmId);
  if (!film) return;
  showModal(`
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="${film.poster}" alt="${film.title}" referrerpolicy="no-referrer" style="width: 160px; height: 220px; object-fit: cover; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.2);" onerror="this.style.display='none'">
      <h2 style="font-family: var(--font-title); margin-top: 16px; font-size: 22px;">${film.title}</h2>
      <div style="font-size: 14px; color: var(--color-text-light); margin-top: 6px;">${film.year} · ${film.director} · ${film.genre}</div>
      <div style="font-size: 20px; font-weight: 700; color: #f5a623; margin-top: 8px;">★ ${film.rating}</div>
    </div>
    <div style="padding: 16px; background: var(--color-bg-alt); border-radius: var(--radius-md); margin-bottom: 16px;">
      <div style="font-size: 13px; color: var(--color-text-light); margin-bottom: 6px;">推荐理由</div>
      <div style="font-size: 14px; line-height: 1.8; font-style: italic;">「${film.reason}」</div>
    </div>
    <div style="display: flex; gap: 12px;">
      <a href="https://search.bilibili.com/all?keyword=${encodeURIComponent(film.title)}" target="_blank" class="btn btn-primary" style="flex:1; text-align: center; text-decoration: none;">▶ 观影链接</a>
      <button class="btn btn-outline" style="flex:1;" onclick="addClassicFilm('${film.id}'); closeModal();">+ 添加到观影记录</button>
    </div>
  `);
};

window.addClassicFilm = function(filmId) {
  const film = CLASSIC_FILMS.find(f => f.id === filmId);
  if (!film) return;
  
  if (State.films.some(f => f.title === film.title)) {
    showToast(`《${film.title}》已在观影记录中`, 'info');
    return;
  }
  
  State.films.push({
    id: generateId(),
    title: film.title,
    type: '电影',
    rating: Math.round(film.rating / 2),
    genre: [film.genre],
    reason: film.reason,
    review: '',
    createdAt: new Date().toISOString()
  });
  
  saveState('films');
  showToast(`已添加《${film.title}》到观影记录`, 'success');
  Router.handle();
};

window.addRecommendedFilm = function(title) {
  const rec = RECOMMENDED_FILMS.find(f => f.title === title);
  if (!rec) return;
  
  State.films.push({
    id: generateId(),
    title: rec.title,
    type: rec.type,
    rating: rec.rating,
    genre: rec.genre,
    reason: rec.reason,
    review: '',
    createdAt: new Date().toISOString()
  });
  
  saveState('films');
  showToast(`已添加《${rec.title}》到观影记录`, 'success');
  Router.handle();
};

window.openFilmModal = function(filmId) {
  const film = filmId ? State.films.find(f => f.id === filmId) : null;
  const isEdit = !!film;
  
  showModal(`
    <h2 style="font-family: var(--font-title); margin-bottom: 20px; font-size: 22px;">${isEdit ? '编辑影片' : '添加影片'}</h2>
    <div class="input-group">
      <label>片名</label>
      <input type="text" id="filmTitle" value="${film?.title || ''}">
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
      <div class="input-group">
        <label>类型</label>
        <select id="filmType">
          ${FILM_TYPES.map(t => `<option value="${t}" ${film?.type === t ? 'selected' : ''}>${t}</option>`).join('')}
        </select>
      </div>
      <div class="input-group">
        <label>评分</label>
        <select id="filmRating">
          <option value="">--</option>
          ${[1,2,3,4,5].map(r => `<option value="${r}" ${film?.rating == r ? 'selected' : ''}>${'★'.repeat(r)}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="input-group">
      <label>风格 (用逗号分隔)</label>
      <input type="text" id="filmGenres" value="${film?.genre.join(', ') || ''}" placeholder="剧情, 治愈, ...">
    </div>
    <div class="input-group">
      <label>推荐理由</label>
      <textarea id="filmReason" placeholder="为什么推荐这部影片？">${film?.reason || ''}</textarea>
    </div>
    <div class="input-group">
      <label>观后感</label>
      <textarea id="filmReview" placeholder="写下你的观影感受...">${film?.review || ''}</textarea>
    </div>
    <div style="display: flex; gap: 12px; margin-top: 16px;">
      <button class="btn btn-primary" style="flex:1;" onclick="saveFilm('${filmId || ''}')">${isEdit ? '保存' : '添加'}</button>
      ${isEdit ? `<button class="btn btn-outline" onclick="deleteFilm('${filmId}')">删除</button>` : ''}
    </div>
  `);
};

window.saveFilm = function(filmId) {
  const data = {
    title: document.getElementById('filmTitle').value,
    type: document.getElementById('filmType').value,
    rating: document.getElementById('filmRating').value ? parseInt(document.getElementById('filmRating').value) : null,
    genre: document.getElementById('filmGenres').value.split(',').map(s => s.trim()).filter(Boolean),
    reason: document.getElementById('filmReason').value,
    review: document.getElementById('filmReview').value
  };
  
  if (!data.title.trim()) {
    showToast('请输入片名', 'error');
    return;
  }
  
  if (filmId) {
    const idx = State.films.findIndex(f => f.id === filmId);
    State.films[idx] = { ...State.films[idx], ...data };
  } else {
    State.films.push({ id: generateId(), ...data, createdAt: new Date().toISOString() });
  }
  
  saveState('films');
  closeModal();
  showToast('已保存', 'success');
  Router.handle();
};

window.deleteFilm = function(filmId) {
  if (!confirm('确定删除？')) return;
  State.films = State.films.filter(f => f.id !== filmId);
  saveState('films');
  closeModal();
  Router.handle();
};

// ========================================
// 相册模块
// ========================================
function renderPhotos(main) {
  main.innerHTML = `
    ${createPageHeader('相册', '定格时光，珍藏回忆', 'photos')}
    
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px;">
      <div style="display:flex; gap: 8px; flex-wrap: wrap;">
        <button class="btn btn-outline" onclick="alert('上传功能需添加图片URL')">📷 添加照片</button>
      </div>
      <button class="btn btn-primary" onclick="openPhotoModal()">+ 新建</button>
    </div>
    
    <div class="photo-wall">
      ${State.photos.length === 0 ? `
        <div class="empty-state" style="column-span: all;">
          <div class="empty-state-icon">📷</div>
          <div class="empty-state-text">还没有照片，开始记录美好瞬间吧</div>
        </div>
      ` : State.photos.map(photo => `
        <div class="photo-item" onclick="viewPhoto('${photo.id}')">
          <img src="${photo.url}" alt="${photo.caption || ''}" onerror="this.style.background='var(--photos-bg)';this.style.height='200px';this.removeAttribute('src');">
          <div class="photo-caption">${photo.caption || ''} ${photo.tags ? '· ' + photo.tags.join(', ') : ''}</div>
        </div>
      `).join('')}
    </div>
  `;
}

window.openPhotoModal = function() {
  showModal(`
    <h2 style="font-family: var(--font-title); margin-bottom: 20px; font-size: 22px;">添加照片</h2>
    <div class="input-group">
      <label>选择照片</label>
      <input type="file" id="photoFile" accept="image/*" capture="environment" class="file-upload-btn">
    </div>
    <div class="image-preview" id="photoPreview" style="display:none;"></div>
    <div class="input-group">
      <label>描述</label>
      <input type="text" id="photoCaption" placeholder="照片描述">
    </div>
    <div class="input-group">
      <label>标签 (逗号分隔)</label>
      <input type="text" id="photoTags" placeholder="旅行, 美食, ...">
    </div>
    <div class="input-group">
      <label>地点</label>
      <input type="text" id="photoLocation" placeholder="拍摄地点">
    </div>
    <button class="btn btn-primary btn-block" onclick="savePhoto()">保存</button>
  `, (content) => {
    const fileInput = content.querySelector('#photoFile');
    const preview = content.querySelector('#photoPreview');
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const dataUrl = await compressImage(file, 800);
        preview.style.display = 'block';
        preview.innerHTML = `<img src="${dataUrl}" alt="预览" style="max-width:100%; max-height:200px; border-radius:8px;">`;
        preview.dataset.url = dataUrl;
      } catch (err) {
        showToast('图片处理失败', 'error');
      }
    });
  });
};

window.savePhoto = function() {
  const preview = document.getElementById('photoPreview');
  const photoUrl = preview?.dataset.url;
  
  if (!photoUrl) {
    showToast('请先选择照片', 'error');
    return;
  }
  
  const data = {
    url: photoUrl,
    caption: document.getElementById('photoCaption').value,
    tags: document.getElementById('photoTags').value.split(',').map(s => s.trim()).filter(Boolean),
    location: document.getElementById('photoLocation').value
  };
  
  State.photos.push({
    id: generateId(),
    ...data,
    date: getToday(),
    createdAt: new Date().toISOString()
  });
  
  saveState('photos');
  closeModal();
  showToast('照片已添加', 'success');
  Router.handle();
};

window.viewPhoto = function(id) {
  const photo = State.photos.find(p => p.id === id);
  if (!photo) return;
  
  showModal(`
    <div style="text-align:center; margin-bottom: 16px;">
      <img src="${photo.url}" style="max-width: 100%; max-height: 400px; border-radius: var(--radius-md);" onerror="this.style.display='none'">
    </div>
    <h3 style="font-size: 18px; margin-bottom: 8px;">${photo.caption || '无描述'}</h3>
    ${photo.location ? `<p style="color: var(--color-text-light); margin-bottom: 8px;">📍 ${photo.location}</p>` : ''}
    ${photo.tags.length ? `<div style="margin-bottom: 16px;">${photo.tags.map(t => `<span class="tag" style="background: var(--photos-bg); color: var(--photos-primary); margin-right:4px;">#${t}</span>`).join('')}</div>` : ''}
    <button class="btn btn-outline btn-block" onclick="deletePhoto('${id}')">删除照片</button>
  `);
};

window.deletePhoto = function(id) {
  if (!confirm('确定删除？')) return;
  State.photos = State.photos.filter(p => p.id !== id);
  saveState('photos');
  closeModal();
  Router.handle();
};

// ========================================
// 灵感模块
// ========================================
function renderInspiration(main) {
  const totalNotes = State.inspirations.length;
  const todayNotes = State.inspirations.filter(n => {
    const d = new Date(n.createdAt);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }).length;
  
  const todayStr = getToday();
  const todayReflection = State.dailyReflections.find(r => r.date === todayStr);
  const pendingTaskCount = State.tasks.filter(t => t.status !== 'done').length;
  
  const savedLearns = State.dailyReflections.filter(r => r.learnPoint).reverse();
  const savedReflections = State.dailyReflections.filter(r => r.reviewGood || r.reviewTweak).reverse();
  const savedTags = [...new Set(State.inspirations.flatMap(n => n.tags))];
  
  main.innerHTML = `
    ${createPageHeader('灵感一现', '捕捉稍纵即逝的想法', 'inspiration')}
    
    <div class="insp-stats">
      <div class="insp-stat-card">
        <div class="insp-stat-num">${totalNotes}</div>
        <div class="insp-stat-label">累计灵感</div>
      </div>
      <div class="insp-stat-card">
        <div class="insp-stat-num">${todayNotes}</div>
        <div class="insp-stat-label">今日记录</div>
      </div>
      <div class="insp-stat-card">
        <div class="insp-stat-num">${pendingTaskCount}</div>
        <div class="insp-stat-label">待办事项</div>
      </div>
      <div class="insp-stat-card">
        <div class="insp-stat-num">${State.dailyReflections.length}</div>
        <div class="insp-stat-label">复盘天数</div>
      </div>
    </div>
    
    <div class="module-tabs inspiration-tabs">
      <button class="module-tab active" data-tab="record">✏️ 记录</button>
      <button class="module-tab" data-tab="history">📖 历史</button>
    </div>
    
    <div class="module-tab-content active" id="tab-record">
      <div style="display:flex; justify-content:flex-end; margin: 0 0 16px;">
        <button class="btn btn-primary" onclick="openInspirationModal()">+ 记录灵感</button>
      </div>
      
      <div class="today-tasks">
        <div class="today-tasks-header">
          <span>📋 今日轻量任务</span>
          <a href="#/tasks" class="today-tasks-hint">管理任务 →</a>
        </div>
        <div class="today-tasks-list">
          ${pendingTaskCount === 0 ? `
            <div class="empty-state" style="padding: 16px;">
              <div class="empty-state-text" style="font-size:13px;">暂无待办，去任务页面添加吧 ✨</div>
            </div>
          ` : State.tasks.filter(t => t.status !== 'done').slice(0, 5).map(task => `
            <div class="today-task-item ${task.status === 'done' ? 'done' : ''}" onclick="toggleTaskInsp('${task.id}')">
              <span class="task-check">${task.status === 'done' ? '✅' : '⬜'}</span>
              <span class="task-name">${task.title}</span>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="reflection-card">
        <div class="reflection-header">
          <span class="reflection-icon">💡</span>
          <span class="reflection-title">今天学到 / 想到的一个点</span>
        </div>
        <div class="reflection-hint">哪怕只是「今天翻了两页」也值得记</div>
        <textarea class="reflection-input" id="todayLearnInput" placeholder="写下今天的一个小收获..." rows="2">${todayReflection?.learnPoint || ''}</textarea>
      </div>
      
      <div class="reflection-card review-card">
        <div class="reflection-header">
          <span class="reflection-icon">📝</span>
          <span class="reflection-title">简短复盘</span>
        </div>
        <div class="reflection-hint">只写两句，写完就放下</div>
        <div class="review-item">
          <label class="review-label">✅ 今天做得不错的 1 个点</label>
          <input type="text" class="review-input" id="reviewGoodInput" placeholder="例如：主动给客户发了跟进消息" value="${todayReflection?.reviewGood || ''}">
        </div>
        <div class="review-item">
          <label class="review-label">🔄 下次想微调的 1 个点</label>
          <input type="text" class="review-input" id="reviewTweakInput" placeholder="例如：报价前先多问一句需求" value="${todayReflection?.reviewTweak || ''}">
        </div>
      </div>
    </div>
    
    <div class="module-tab-content" id="tab-history">
      <div class="history-section">
        <div class="history-section-title">💡 历史灵感 (${State.inspirations.length})</div>
        ${State.inspirations.length === 0 ? `
          <div class="history-item-empty">还没有灵感记录</div>
        ` : State.inspirations.slice(-10).reverse().map(note => `
          <div class="history-item" onclick="viewInspiration('${note.id}')">
            <div>${note.content.replace(/\n/g, '<br>')}</div>
            <div class="history-item-date">${note.tags.map(t => '# ' + t).join(' · ')} · ${new Date(note.createdAt).toLocaleDateString()}</div>
          </div>
        `).join('')}
      </div>
      
      <div class="history-section">
        <div class="history-section-title">💡 历史学到的点 (${savedLearns.length})</div>
        ${savedLearns.length === 0 ? `
          <div class="history-item-empty">还没有学到的点</div>
        ` : savedLearns.slice(0, 10).map(r => `
          <div class="history-item">
            <div>${r.learnPoint}</div>
            <div class="history-item-date">${formatDate(r.date)}</div>
          </div>
        `).join('')}
      </div>
      
      <div class="history-section">
        <div class="history-section-title">📝 历史复盘 (${savedReflections.length})</div>
        ${savedReflections.length === 0 ? `
          <div class="history-item-empty">还没有复盘记录</div>
        ` : savedReflections.slice(0, 10).map(r => `
          <div class="history-item">
            ${r.reviewGood ? `<div>✅ ${r.reviewGood}</div>` : ''}
            ${r.reviewTweak ? `<div>🔄 ${r.reviewTweak}</div>` : ''}
            <div class="history-item-date">${formatDate(r.date)}</div>
          </div>
        `).join('')}
      </div>
      
      ${savedTags.length > 0 ? `
        <div class="history-section">
          <div class="history-section-title">🏷️ 灵感标签</div>
          <div style="display:flex; flex-wrap:wrap; gap:8px;">
            ${savedTags.map(tag => `<span class="tag" style="background: var(--inspiration-bg); color: var(--inspiration-primary);">#${tag}</span>`).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
  
  document.querySelectorAll('.module-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.module-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.module-tab-content').forEach(c => c.classList.remove('active'));
      document.getElementById(`tab-${tab}`).classList.add('active');
    });
  });
  
  const learnInput = document.getElementById('todayLearnInput');
  if (learnInput) {
    learnInput.addEventListener('blur', () => {
      const learnPoint = learnInput.value.trim();
      const todayStr2 = getToday();
      let reflection = State.dailyReflections.find(r => r.date === todayStr2);
      if (reflection) {
        reflection.learnPoint = learnPoint;
      } else {
        State.dailyReflections.push({ id: generateId(), date: todayStr2, learnPoint, reviewGood: '', reviewTweak: '' });
      }
      saveState('dailyReflections');
      showToast('已自动保存', 'success');
    });
  }
  
  const reviewGoodInput = document.getElementById('reviewGoodInput');
  if (reviewGoodInput) {
    reviewGoodInput.addEventListener('blur', () => {
      const reviewGood = reviewGoodInput.value.trim();
      const reviewTweakInput = document.getElementById('reviewTweakInput');
      const reviewTweak = reviewTweakInput ? reviewTweakInput.value.trim() : '';
      const todayStr3 = getToday();
      let reflection = State.dailyReflections.find(r => r.date === todayStr3);
      if (reflection) {
        reflection.reviewGood = reviewGood;
        reflection.reviewTweak = reviewTweak;
      } else {
        State.dailyReflections.push({ id: generateId(), date: todayStr3, learnPoint: '', reviewGood, reviewTweak });
      }
      saveState('dailyReflections');
      showToast('复盘已自动保存', 'success');
    });
  }
  
  const reviewTweakInput = document.getElementById('reviewTweakInput');
  if (reviewTweakInput) {
    reviewTweakInput.addEventListener('blur', () => {
      const reviewTweak = reviewTweakInput.value.trim();
      const reviewGoodInput2 = document.getElementById('reviewGoodInput');
      const reviewGood = reviewGoodInput2 ? reviewGoodInput2.value.trim() : '';
      const todayStr4 = getToday();
      let reflection = State.dailyReflections.find(r => r.date === todayStr4);
      if (reflection) {
        reflection.reviewGood = reviewGood;
        reflection.reviewTweak = reviewTweak;
      } else {
        State.dailyReflections.push({ id: generateId(), date: todayStr4, learnPoint: '', reviewGood, reviewTweak });
      }
      saveState('dailyReflections');
      showToast('复盘已自动保存', 'success');
    });
  }
}

window.toggleTaskInsp = function(taskId) {
  const task = State.tasks.find(t => t.id === taskId);
  if (!task) return;
  if (task.status === 'done') {
    task.status = 'todo';
    task.completedAt = null;
  } else {
    task.status = 'done';
    task.completedAt = new Date().toISOString();
  }
  saveState('tasks');
  Router.handle();
};

window.saveLearnPoint = function() {
  const learnPoint = document.getElementById('todayLearnInput').value.trim();
  const todayStr = getToday();
  let reflection = State.dailyReflections.find(r => r.date === todayStr);
  if (reflection) {
    reflection.learnPoint = learnPoint;
  } else {
    State.dailyReflections.push({ id: generateId(), date: todayStr, learnPoint, reviewGood: '', reviewTweak: '' });
  }
  saveState('dailyReflections');
  showToast('已保存', 'success');
};

window.saveReview = function() {
  const reviewGood = document.getElementById('reviewGoodInput').value.trim();
  const reviewTweak = document.getElementById('reviewTweakInput').value.trim();
  const todayStr = getToday();
  let reflection = State.dailyReflections.find(r => r.date === todayStr);
  if (reflection) {
    reflection.reviewGood = reviewGood;
    reflection.reviewTweak = reviewTweak;
  } else {
    State.dailyReflections.push({ id: generateId(), date: todayStr, learnPoint: '', reviewGood, reviewTweak });
  }
  saveState('dailyReflections');
  showToast('复盘已保存', 'success');
};

window.openInspirationModal = function() {
  showModal(`
    <h2 style="font-family: var(--font-title); margin-bottom: 20px; font-size: 22px;">记录灵感</h2>
    <div class="input-group">
      <label>灵感内容</label>
      <textarea id="inspContent" rows="5" placeholder="写下你的想法..."></textarea>
    </div>
    <div class="input-group">
      <label>标签 (逗号分隔)</label>
      <input type="text" id="inspTags" placeholder="创意, 写作, ..." value="${INSPIRATION_TAGS.slice(0,3).join(', ')}">
    </div>
    <button class="btn btn-primary btn-block" onclick="saveInspiration()">保存</button>
  `);
};

window.saveInspiration = function() {
  const content = document.getElementById('inspContent').value;
  const tags = document.getElementById('inspTags').value.split(',').map(s => s.trim()).filter(Boolean);
  
  if (!content.trim()) {
    showToast('请输入灵感内容', 'error');
    return;
  }
  
  State.inspirations.push({
    id: generateId(),
    content, tags,
    status: 'active',
    createdAt: new Date().toISOString()
  });
  
  saveState('inspirations');
  closeModal();
  showToast('灵感已记录', 'success');
  Router.handle();
};

window.viewInspiration = function(id) {
  const note = State.inspirations.find(n => n.id === id);
  if (!note) return;
  
  showModal(`
    <div style="background: ${['#FFF9E6','#E6F3FF','#FFE6E6'][Math.abs(id.charCodeAt(0)) % 3]}; padding: 24px; border-radius: var(--radius-md); margin-bottom: 16px;">
      <div style="white-space: pre-wrap; font-size: 15px; line-height: 1.8;">${note.content}</div>
    </div>
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px;">
      <div>${note.tags.map(t => `<span class="tag" style="background: var(--inspiration-bg); color: var(--inspiration-primary); margin-right:4px;">#${t}</span>`).join('')}</div>
      <span style="font-size: 12px; color: var(--color-text-light);">${new Date(note.createdAt).toLocaleString()}</span>
    </div>
    <div style="display:flex; gap: 12px;">
      <button class="btn btn-outline" style="flex:1;" onclick="editInspiration('${id}')">编辑</button>
      <button class="btn btn-ghost" onclick="deleteInspiration('${id}')">删除</button>
    </div>
  `);
};

window.editInspiration = function(id) {
  const note = State.inspirations.find(n => n.id === id);
  closeModal();
  setTimeout(() => {
    showModal(`
      <h2 style="font-family: var(--font-title); margin-bottom: 20px; font-size: 22px;">编辑灵感</h2>
      <div class="input-group">
        <label>内容</label>
        <textarea id="inspContent" rows="5">${note.content}</textarea>
      </div>
      <div class="input-group">
        <label>标签</label>
        <input type="text" id="inspTags" value="${note.tags.join(', ')}">
      </div>
      <button class="btn btn-primary btn-block" onclick="saveInspirationEdit('${id}')">保存修改</button>
    `);
  }, 300);
};

window.saveInspirationEdit = function(id) {
  const idx = State.inspirations.findIndex(n => n.id === id);
  State.inspirations[idx].content = document.getElementById('inspContent').value;
  State.inspirations[idx].tags = document.getElementById('inspTags').value.split(',').map(s => s.trim()).filter(Boolean);
  saveState('inspirations');
  closeModal();
  showToast('已更新', 'success');
  Router.handle();
};

window.deleteInspiration = function(id) {
  if (!confirm('确定删除？')) return;
  State.inspirations = State.inspirations.filter(n => n.id !== id);
  saveState('inspirations');
  closeModal();
  Router.handle();
};

// ========================================
// 运动模块
// ========================================
function renderSports(main) {
  const totalDuration = State.sports.reduce((s, x) => s + x.duration, 0);
  const completedDays = new Set(State.sports.map(s => s.date)).size;
  const todaySports = State.sports.filter(s => s.date === getToday());
  
  main.innerHTML = `
    ${createPageHeader('运动集', '动起来，让每一天都充满活力', 'sports')}
    
    <div class="stats-grid sport-stats-row">
      <div class="stat-box">
        <div class="stat-box-label">累计时长</div>
        <div class="stat-box-value" style="color: var(--sports-primary);"><span class="stat-num">${totalDuration}</span><span class="stat-unit">分钟</span></div>
      </div>
      <div class="stat-box">
        <div class="stat-box-label">运动天数</div>
        <div class="stat-box-value" style="color: var(--sports-secondary);"><span class="stat-num">${completedDays}</span><span class="stat-unit">天</span></div>
      </div>
      <div class="stat-box">
        <div class="stat-box-label">今日运动</div>
        <div class="stat-box-value" style="color: var(--sports-primary);"><span class="stat-num">${todaySports.length}</span><span class="stat-unit">次</span></div>
      </div>
    </div>
    
    <h2 style="font-size: 18px; font-weight: 600; margin: 24px 0 16px;">每周训练计划</h2>
    <div class="sport-plan-header">
      <span class="plan-badge">🌸</span>
      <span>新手友好健身计划 · 基础期</span>
    </div>
    <div class="sport-plan-list">
      ${SPORT_PLANS.map(plan => `
        <div class="sport-plan-card">
          <div class="plan-day-label">${plan.day}</div>
          <div class="plan-icon">${plan.icon}</div>
          <div class="plan-info">
            <div class="plan-title">${plan.title}</div>
            <div class="plan-desc">${plan.desc}</div>
          </div>
          ${plan.video ? `<button class="plan-video-btn" onclick="openSportVideo('${plan.video}', '${plan.title}')">▶ 跟练</button>` : `<span class="plan-rest-badge">休息日</span>`}
        </div>
      `).join('')}
    </div>
    
    <h2 style="font-size: 18px; font-weight: 600; margin: 24px 0 16px;">运动分类</h2>
    <div class="sport-category-grid">
      ${SPORT_CATEGORIES.map(cat => `
        <div class="sport-category-card" onclick="startSport('${cat.id}')">
          <div class="sport-icon">${cat.icon}</div>
          <div class="sport-name">${cat.name}</div>
          <div class="sport-duration">${cat.description}</div>
        </div>
      `).join('')}
    </div>
    
    ${State.sports.length > 0 ? `
      <h2 style="font-size: 18px; font-weight: 600; margin: 32px 0 16px;">训练历史</h2>
      <div class="accounting-list">
        ${State.sports.slice(-8).reverse().map(log => {
          const cat = SPORT_CATEGORIES.find(c => c.id === log.category);
          return `
            <div class="accounting-item" style="border-left-color: var(--sports-primary);">
              <div class="accounting-icon">${cat?.icon || '💪'}</div>
              <div class="accounting-details">
                <div class="accounting-category">${cat?.name || log.category}</div>
                <div class="accounting-note">时长 ${log.duration} 分钟 ${log.completed ? '✅' : '⏳'}</div>
              </div>
              <div class="accounting-date">${formatDate(log.date)} ${log.startTime ? log.startTime : ''}</div>
            </div>
          `;
        }).join('')}
      </div>
    ` : ''}
  `;
}

window.openSportVideo = function(videoUrl, title) {
  openBilibiliApp(title || '运动');
};

window.startSport = function(categoryId) {
  const cat = SPORT_CATEGORIES.find(c => c.id === categoryId);
  let seconds = 0;
  let timerInterval = null;
  let isRunning = false;
  
  showModal(`
    <h2 style="font-family: var(--font-title); margin-bottom: 8px; font-size: 22px;">${cat.name}</h2>
    <p style="color: var(--color-text-light); font-size: 13px; margin-bottom: 16px;">${cat.description}</p>
    <div class="sport-timer" style="padding: 24px; background: var(--sports-bg); border-radius: var(--radius-lg);">
      <div class="timer-display" id="sportTimer" style="font-family: var(--font-title); font-size: 56px; color: var(--sports-primary); letter-spacing: 4px;">00:00</div>
    </div>
    ${cat.videoUrl ? `<a href="javascript:void(0)" onclick="openBilibiliApp('${cat.name}')" style="display:block; text-align:center; margin-bottom: 16px; color: var(--sports-primary); font-size: 14px;">📺 跳转教学视频</a>` : ''}
    <div style="display:flex; gap: 12px;">
      <button class="btn btn-secondary" style="flex:1;" id="toggleTimer">▶ 开始</button>
      <button class="btn btn-primary" style="flex:1;" id="finishTimer">完成</button>
    </div>
  `, (content) => {
    const timerEl = content.querySelector('#sportTimer');
    const toggleBtn = content.querySelector('#toggleTimer');
    const finishBtn = content.querySelector('#finishTimer');
    
    toggleBtn.addEventListener('click', () => {
      if (isRunning) {
        clearInterval(timerInterval);
        toggleBtn.textContent = '▶ 继续';
        isRunning = false;
      } else {
        timerInterval = setInterval(() => {
          seconds++;
          const m = String(Math.floor(seconds / 60)).padStart(2, '0');
          const s = String(seconds % 60).padStart(2, '0');
          timerEl.textContent = `${m}:${s}`;
        }, 1000);
        toggleBtn.textContent = '⏸ 暂停';
        isRunning = true;
      }
    });
    
    finishBtn.addEventListener('click', () => {
      if (timerInterval) clearInterval(timerInterval);
      const duration = Math.max(1, Math.round(seconds / 60));
      State.sports.push({
        id: generateId(),
        category: cat.id,
        date: getToday(),
        startTime: new Date(Date.now() - seconds * 1000).toTimeString().slice(0, 5),
        duration,
        completed: true,
        createdAt: new Date().toISOString()
      });
      saveState('sports');
      showToast(`完成${cat.name}！时长 ${duration} 分钟`, 'success');
      closeModal();
      Router.handle();
    });
  });
};

// ========================================
// 日常记录模块
// ========================================
function renderDaily(main) {
  const todayStr = getToday();
  const selectedDate = State.selectedDailyDate || todayStr;
  const reflection = State.dailyReflections.find(r => r.date === selectedDate);
  
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - 14);
  
  const weekDays = [];
  for (let i = 0; i < 30; i++) {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    const dateStr = formatDate(d);
    const reflectionForDay = State.dailyReflections.find(r => r.date === dateStr);
    weekDays.push({
      date: dateStr,
      day: d.toLocaleDateString('zh-CN', { weekday: 'short' }),
      dayNum: d.getDate(),
      isToday: dateStr === todayStr,
      isSelected: dateStr === selectedDate,
      isFuture: d > today,
      hasLearnPoint: reflectionForDay && reflectionForDay.learnPoint,
      hasReview: reflectionForDay && (reflectionForDay.reviewGood || reflectionForDay.reviewTweak)
    });
  }
  
  const completedDays = weekDays.filter(d => !d.isFuture && (d.hasLearnPoint || d.hasReview)).length;
  const totalDays = weekDays.filter(d => !d.isFuture).length;
  const progress = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
  const circumference = 2 * Math.PI * 35;
  
  // 统计历史数据
  const allReflections = State.dailyReflections.filter(r => r.learnPoint || r.reviewGood || r.reviewTweak);
  const totalReflections = allReflections.length;
  const totalLearnPoints = State.dailyReflections.filter(r => r.learnPoint).length;
  const totalReviews = State.dailyReflections.filter(r => r.reviewGood || r.reviewTweak).length;
  
  main.innerHTML = `
    ${createPageHeader('日常记录', '每周习惯养成，点滴积累成长', 'daily')}
    
    <div class="module-tabs daily-tabs">
      <button class="module-tab active" data-tab="record">📝 记录</button>
      <button class="module-tab" data-tab="history">📊 历史</button>
    </div>
    
    <div class="module-tab-content active" id="tab-record">
      <div class="week-summary">
        <div class="week-progress">
          <svg class="progress-ring" viewBox="0 0 80 80">
            <circle class="bg" cx="40" cy="40" r="35"></circle>
            <circle class="fg" cx="40" cy="40" r="35" 
              stroke-dasharray="${circumference}" 
              stroke-dashoffset="${circumference - (progress / 100) * circumference}"></circle>
          </svg>
          <div class="progress-text">
            <h4>${completedDays}/${totalDays}</h4>
            <p>完成度 ${progress}%</p>
          </div>
        </div>
        
        <div style="display:flex; gap: 12px; flex-wrap: wrap;">
          ${State.daily.goals.map(goal => {
            const completedToday = State.daily.logs.find(l => l.date === todayStr)?.completedItems.includes(goal.id);
            return `
              <div style="padding: 10px 16px; border-radius: 50px; background: ${completedToday ? 'var(--daily-bg)' : 'var(--color-bg-alt)'}; display:flex; align-items:center; gap: 8px; font-size: 13px;">
                <span>${goal.icon}</span>
                <span>${goal.title}</span>
                <button onclick="toggleGoal('${goal.id}')" style="background:none; border:none; cursor:pointer; font-size: 16px;">
                  ${completedToday ? '✅' : '⬜'}
                </button>
              </div>
            `;
          }).join('')}
          <button onclick="addGoal()" style="padding: 10px 16px; border-radius: 50px; border: 2px dashed var(--color-border); background: transparent; cursor: pointer; font-size: 13px; color: var(--color-text-light);">+ 添加目标</button>
        </div>
      </div>
      
      <div class="scroll-date-bar" id="scrollDateBar">
        ${weekDays.map(d => `
          <div class="scroll-date-card ${d.isToday ? 'today' : ''} ${d.isSelected ? 'selected' : ''} ${d.isFuture ? 'future' : ''} ${d.hasLearnPoint || d.hasReview ? 'checked' : ''}" 
               onclick="selectDailyDate('${d.date}')">
            <div class="scroll-date-day">${d.day}</div>
            <div class="scroll-date-date">${d.dayNum}</div>
            <div class="scroll-date-status">
              ${d.hasLearnPoint ? '💡' : ''}${d.hasReview ? '📝' : ''}${!d.hasLearnPoint && !d.hasReview && !d.isFuture ? '·' : ''}
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="selected-date-reflection">
        <div class="selected-date-reflection-title">📅 ${formatDate(selectedDate)} ${selectedDate === todayStr ? '（今天）' : ''}</div>
        <div class="reflection-card" style="margin-bottom: 12px;">
          <div class="reflection-header">
            <span class="reflection-icon">💡</span>
            <span class="reflection-title">今天学到 / 想到的一个点</span>
          </div>
          <textarea class="reflection-input" id="selectedLearnInput" placeholder="写下这一天的收获..." rows="2">${reflection?.learnPoint || ''}</textarea>
        </div>
        <div class="reflection-card review-card">
          <div class="reflection-header">
            <span class="reflection-icon">📝</span>
            <span class="reflection-title">简短复盘</span>
          </div>
          <div class="review-item">
            <label class="review-label">✅ 做得不错</label>
            <input type="text" class="review-input" id="selectedReviewGoodInput" placeholder="今天做得好的地方" value="${reflection?.reviewGood || ''}">
          </div>
          <div class="review-item">
            <label class="review-label">🔄 想微调</label>
            <input type="text" class="review-input" id="selectedReviewTweakInput" placeholder="下次想改进的地方" value="${reflection?.reviewTweak || ''}">
          </div>
          <div style="text-align: right; margin-top: 10px;">
            <button class="btn btn-primary btn-sm" onclick="saveDailyReflection('${selectedDate}')">保存</button>
          </div>
        </div>
      </div>
      
      <div class="card" style="margin-top: 16px;">
        <div class="card-title">📝 本周总结</div>
        <div class="input-group">
          <label>总结</label>
          <textarea id="weekSummary" placeholder="本周做了什么？有哪些收获？">${State.daily.weekSummary || ''}</textarea>
        </div>
        <div class="input-group">
          <label>心得反思</label>
          <textarea id="weekReflection" placeholder="反思一下这周的成长和改进方向...">${State.daily.weekReflection || ''}</textarea>
        </div>
        <button class="btn btn-primary" onclick="saveWeekSummary()">保存总结</button>
      </div>
    </div>
    
    <div class="module-tab-content" id="tab-history" style="display:none;">
      <div class="stats-grid" style="margin-bottom: 20px;">
        <div class="stat-box">
          <div class="stat-box-label">总记录天数</div>
          <div class="stat-box-value" style="color: var(--daily-primary);">${totalReflections}</div>
        </div>
        <div class="stat-box">
          <div class="stat-box-label">学到/想到</div>
          <div class="stat-box-value" style="color: var(--color-success);">${totalLearnPoints}</div>
        </div>
        <div class="stat-box">
          <div class="stat-box-label">复盘记录</div>
          <div class="stat-box-value" style="color: var(--tasks-primary);">${totalReviews}</div>
        </div>
      </div>
      
      ${allReflections.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state-icon">📊</div>
          <div class="empty-state-text">还没有记录，开始记录你的成长吧</div>
        </div>
      ` : `
        <div class="history-list">
          ${allReflections.sort((a, b) => b.date.localeCompare(a.date)).map(r => `
            <div class="history-item">
              <div class="history-date">📅 ${formatDate(r.date)} ${r.date === todayStr ? '（今天）' : ''}</div>
              ${r.learnPoint ? `<div class="history-point">💡 <strong>学到:</strong> ${r.learnPoint}</div>` : ''}
              ${r.reviewGood ? `<div class="history-point good">✅ <strong>做得不错:</strong> ${r.reviewGood}</div>` : ''}
              ${r.reviewTweak ? `<div class="history-point tweak">🔄 <strong>想微调:</strong> ${r.reviewTweak}</div>` : ''}
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
  
  // 标签切换
  document.querySelectorAll('.daily-tabs .module-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.daily-tabs .module-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.module-tab-content').forEach(c => c.classList.remove('active'));
      document.getElementById(`tab-${tab}`).classList.add('active');
    });
  });
  
  const scrollBar = document.getElementById('scrollDateBar');
  if (scrollBar) {
    const todayCard = scrollBar.querySelector('.scroll-date-card.today');
    if (todayCard) {
      requestAnimationFrame(() => {
        const cardRect = todayCard.getBoundingClientRect();
        const barRect = scrollBar.getBoundingClientRect();
        const scrollLeft = todayCard.offsetLeft - (barRect.width / 2) + (cardRect.width / 2);
        scrollBar.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      });
    }
  }
  
  const learnInput = document.getElementById('selectedLearnInput');
  if (learnInput) {
    learnInput.addEventListener('blur', () => {
      const learnPoint = learnInput.value.trim();
      let reflection2 = State.dailyReflections.find(r => r.date === selectedDate);
      if (reflection2) {
        reflection2.learnPoint = learnPoint;
      } else {
        State.dailyReflections.push({ id: generateId(), date: selectedDate, learnPoint, reviewGood: '', reviewTweak: '' });
      }
      saveState('dailyReflections');
      showToast('已自动保存', 'success');
    });
  }
}

window.saveTodayReflection = function() {
  const text = document.getElementById('todayReflection').value;
  if (!State.daily.reflections) State.daily.reflections = {};
  State.daily.reflections[getToday()] = text;
  saveState('daily');
  showToast('今日心得已保存', 'success');
};

window.selectDailyDate = function(date) {
  State.selectedDailyDate = date;
  Router.handle();
};

window.saveDailyReflection = function(date) {
  const learnInput = document.getElementById('selectedLearnInput');
  const reviewGoodInput = document.getElementById('selectedReviewGoodInput');
  const reviewTweakInput = document.getElementById('selectedReviewTweakInput');
  
  const learnPoint = learnInput ? learnInput.value.trim() : '';
  const reviewGood = reviewGoodInput ? reviewGoodInput.value.trim() : '';
  const reviewTweak = reviewTweakInput ? reviewTweakInput.value.trim() : '';
  
  let reflection = State.dailyReflections.find(r => r.date === date);
  if (reflection) {
    reflection.learnPoint = learnPoint;
    reflection.reviewGood = reviewGood;
    reflection.reviewTweak = reviewTweak;
  } else {
    State.dailyReflections.push({ id: generateId(), date, learnPoint, reviewGood, reviewTweak });
  }
  saveState('dailyReflections');
  showToast('已保存', 'success');
};

window.toggleGoal = function(goalId) {
  const today = getToday();
  let todayLog = State.daily.logs.find(l => l.date === today);
  if (!todayLog) {
    todayLog = { date: today, completedItems: [] };
    State.daily.logs.push(todayLog);
  }
  
  const idx = todayLog.completedItems.indexOf(goalId);
  if (idx > -1) {
    todayLog.completedItems.splice(idx, 1);
  } else {
    todayLog.completedItems.push(goalId);
  }
  
  saveState('daily');
  Router.handle();
};

window.addGoal = function() {
  const name = prompt('输入新目标名称：');
  if (!name) return;
  const icon = prompt('选择图标 (emoji)：', '🎯') || '🎯';
  State.daily.goals.push({ id: generateId(), title: name, icon });
  saveState('daily');
  Router.handle();
};

window.saveWeekSummary = function() {
  State.daily.weekSummary = document.getElementById('weekSummary').value;
  State.daily.weekReflection = document.getElementById('weekReflection').value;
  saveState('daily');
  showToast('周总结已保存', 'success');
};

window.changeWeek = function(delta) {
  if (delta === 0) {
    State.daily.currentWeek = getWeekRange(new Date());
  } else {
    const currentStart = new Date(State.daily.currentWeek.start);
    currentStart.setDate(currentStart.getDate() + delta * 7);
    State.daily.currentWeek = getWeekRange(currentStart);
  }
  saveState('daily');
  Router.handle();
};

// ========================================
// 每日新闻模块
// ========================================
function renderNews(main) {
  const categories = ['全部', ...DAILY_NEWS.categories];
  main.innerHTML = `
    ${createPageHeader('每日新闻', '全球动态，尽在掌握', 'news')}
    
    <div class="news-filter">
      ${categories.map((cat, i) => `
        <button class="filter-chip ${i === 0 ? 'active' : ''}" onclick="filterNews('${cat}', this)">${cat}</button>
      `).join('')}
    </div>
    
    <div class="news-list" id="newsList">
      ${DAILY_NEWS.items.map(item => `
        <div class="news-card" data-category="${item.category}" onclick="openNewsUrl('${item.url}')">
          <div class="news-cat" style="background: ${getNewsColor(item.category)};">${item.category}</div>
          <div class="news-content">
            <h3 class="news-title">${item.title}</h3>
            <p class="news-summary">${item.summary}</p>
            <div class="news-meta">
              <span>🕐 ${item.time}</span>
              <a href="${item.url}" class="news-link" onclick="event.stopPropagation(); window.open('${item.url}', '_blank')">阅读全文 →</a>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    
    <div class="card" style="margin-top: 24px; text-align: center; padding: 24px;">
      <div style="font-size: 32px; margin-bottom: 8px;">📰</div>
      <div style="font-weight: 600; margin-bottom: 4px;">每日资讯</div>
      <div style="font-size: 13px; color:var(--color-text-light);;">点击新闻卡片可跳转到原文 · 数据来源：综合资讯聚合</div>
    </div>
  `;
}

window.openNewsUrl = function(url) {
  if (url) window.open(url, '_blank');
};

function getNewsColor(cat) {
  const colors = { '科技': '#4A90A4', '财经': '#B54A3A', '文化': '#D4A574', '体育': '#8BA888', '生活方式': '#9FC4C4' };
  return colors[cat] || '#87CEEB';
}

window.filterNews = function(cat, btn) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.news-card').forEach(card => {
    card.style.display = (cat === '全部' || card.dataset.category === cat) ? '' : 'none';
  });
};

// ========================================
// 阅读模块
// ========================================
function renderReading(main) {
  const topics = READING_TOPICS || [];
  const featured = READING_FEATURED || [];
  const categories = [...new Set(topics.map(s => s.category))];
  
  const savedBooks = State.readingList || [];
  
  const catColors = {
    '文学': '#FFB3BA', '历史': '#BAE1FF', '哲学': '#B4F8C8',
    '心理': '#FFF3B0', '商业': '#FFDAC1', '科技': '#C9A7EB',
    '艺术': '#A8E6CF', '生活': '#FFAAA5', '自我成长': '#FFD4BA'
  };
  
  main.innerHTML = `
    ${createPageHeader('阅读', '每日阅读，知识沉淀', 'ai')}
    
    ${featured.length > 0 ? `
      <div class="reading-featured">
        <div class="reading-featured-title">⭐ 今日推荐</div>
        ${featured.map(book => `
          <div class="reading-featured-card">
            <div class="reading-featured-info">
              <div class="reading-featured-book">${book.title}</div>
              <div class="reading-featured-author">${book.author} · ${book.category}</div>
              <div class="reading-featured-summary">${book.summary}</div>
              <div class="reading-featured-meta">
                <span class="reading-level-tag">${book.difficulty}</span>
                <span class="reading-category-tag">${book.category}</span>
              </div>
            </div>
            <a href="${book.url}" target="_blank" class="btn btn-primary btn-sm" style="flex-shrink:0;">阅读 →</a>
          </div>
        `).join('')}
      </div>
    ` : ''}
    
    <div class="ai-search">
      <input type="text" id="readingSearch" placeholder="搜索阅读主题..." oninput="filterReading(this.value)">
    </div>
    
    <div class="ai-filter">
      <button class="filter-chip active" onclick="filterReadingCat('all', this)">全部</button>
      ${categories.map(cat => `<button class="filter-chip" onclick="filterReadingCat('${cat}', this)">${cat}</button>`).join('')}
    </div>
    
    <div class="ai-grid" id="readingGrid">
      ${topics.map(skill => `
        <div class="reading-topic-card" data-category="${skill.category}" data-title="${skill.title}" data-desc="${skill.description}" onclick="openReadingTopic('${skill.id}')">
          <div class="ai-card-deco" style="background:${catColors[skill.category] || '#E8E8E8'}"></div>
          <div class="reading-topic-icon">${skill.icon}</div>
          <div class="reading-topic-info">
            <div class="reading-topic-title">${skill.title}</div>
            <div class="reading-topic-desc">${skill.description}</div>
            <div class="reading-topic-level">${skill.difficulty}</div>
          </div>
        </div>
      `).join('')}
    </div>
    
    <div class="reading-list-section">
      <div class="reading-list-header">
        <div class="reading-list-title">📖 我的读书清单</div>
        <button class="btn btn-primary btn-sm" onclick="openAddBookModal()">+ 添加</button>
      </div>
      ${savedBooks.length === 0 ? `
        <div class="empty-state" style="padding: 20px;">
          <div class="empty-state-text" style="font-size:13px;">还在读书吗？添加一本开始吧</div>
        </div>
      ` : savedBooks.map(book => `
        <div class="reading-list-item">
          <div class="reading-list-item-info">
            <div class="reading-list-item-title">${book.title}</div>
            <div class="reading-list-item-progress">
              <div class="reading-list-item-progress-fill" style="width:${book.progress || 0}%"></div>
            </div>
          </div>
          <div class="reading-list-item-status">${book.progress || 0}%</div>
          <button class="btn btn-ghost" onclick="removeBook('${book.id}')">🗑️</button>
        </div>
      `).join('')}
    </div>
  `;
}

window.filterReading = function(query) {
  query = query.toLowerCase();
  document.querySelectorAll('.reading-topic-card').forEach(card => {
    const text = (card.dataset.title + card.dataset.desc + card.dataset.category).toLowerCase();
    card.style.display = text.includes(query) ? '' : 'none';
  });
};

window.filterReadingCat = function(cat, btn) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.reading-topic-card').forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
  });
};

window.openReadingTopic = function(topicId) {
  const topic = (READING_TOPICS || []).find(s => s.id === topicId);
  if (!topic) return;
  
  showModal(`
    <div style="text-align:center; margin-bottom:16px;">
      <div style="font-size:48px;">${topic.icon}</div>
      <h2 style="font-family: var(--font-title); margin: 8px 0; font-size: 22px;">${topic.title}</h2>
      <p style="color:var(--color-text-light); font-size:13px;">${topic.description}</p>
      <span class="reading-level-tag" style="margin-top:8px; display:inline-block;">${topic.difficulty}</span>
    </div>
    <div class="card">
      <div class="card-title">📚 相关推荐</div>
      <div style="color: var(--color-text-light); font-size: 13px; line-height: 1.6;">
        探索【${topic.category}】领域的经典著作和深度文章，系统地构建你的知识体系。
      </div>
      <div style="margin-top: 12px;">
        <a href="https://www.google.com/search?q=${encodeURIComponent(topic.title + ' 书籍推荐')}" target="_blank" class="btn btn-primary">搜索相关书籍 →</a>
      </div>
    </div>
  `);
};

window.openAddBookModal = function() {
  showModal(`
    <h2 style="font-family: var(--font-title); margin-bottom: 20px; font-size: 22px;">添加书籍</h2>
    <div class="input-group">
      <label>书名</label>
      <input type="text" id="bookTitle" placeholder="例如：深度工作">
    </div>
    <div class="input-group">
      <label>当前进度 (%)</label>
      <input type="number" id="bookProgress" placeholder="0" min="0" max="100" value="0">
    </div>
    <button class="btn btn-primary btn-block" onclick="saveBook()">添加到读书清单</button>
  `);
};

window.saveBook = function() {
  const title = document.getElementById('bookTitle').value.trim();
  const progress = parseInt(document.getElementById('bookProgress').value) || 0;
  if (!title) { showToast('请输入书名', 'error'); return; }
  
  if (!State.readingList) State.readingList = [];
  State.readingList.push({ id: generateId(), title, progress, addedAt: new Date().toISOString() });
  saveState('readingList');
  closeModal();
  showToast('书籍已添加', 'success');
  Router.handle();
};

window.removeBook = function(bookId) {
  if (!State.readingList) return;
  State.readingList = State.readingList.filter(b => b.id !== bookId);
  saveState('readingList');
  showToast('已删除', 'success');
  Router.handle();
};
function init() {
  // 更新日期显示
  const now = new Date();
  const dateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
  document.getElementById('currentDate').textContent = dateStr;
  
  // 注册路由
  Router.register('/', renderHome);
  Router.register('/accounting', renderAccounting);
  Router.register('/tasks', renderTasks);
  Router.register('/calligraphy', renderCalligraphy);
  Router.register('/english', renderEnglish);
  Router.register('/films', renderFilms);
  Router.register('/photos', renderPhotos);
  Router.register('/inspiration', renderInspiration);
  Router.register('/sports', renderSports);
  Router.register('/daily', renderDaily);
  Router.register('/news', renderNews);
  Router.register('/ai', renderReading);
  
  // 品牌图片上传功能
  const brandUpload = document.getElementById('brandUpload');
  const brandSeal = document.getElementById('brandSeal');
  const brandArea = document.getElementById('brandArea');
  
  // 恢复保存的品牌图片
  const savedBrandImage = Storage.get('brandImage');
  if (savedBrandImage) {
    brandSeal.style.backgroundImage = `url(${savedBrandImage})`;
    brandSeal.style.backgroundSize = 'cover';
    brandSeal.style.backgroundPosition = 'center';
    brandSeal.textContent = '';
  }
  
  // 点击品牌区域触发文件选择
  brandArea.addEventListener('click', function() {
    brandUpload.click();
  });
  
  // 双击品牌区域重置为默认
  brandArea.addEventListener('dblclick', function(e) {
    e.preventDefault();
    if (confirm('恢复为默认图标？')) {
      Storage.remove('brandImage');
      brandSeal.style.backgroundImage = '';
      brandSeal.style.backgroundSize = '';
      brandSeal.style.backgroundPosition = '';
      brandSeal.textContent = '鈡';
      showToast('已恢复默认图标', 'info');
    }
  });
  
  brandUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        brandSeal.style.backgroundImage = `url(${event.target.result})`;
        brandSeal.style.backgroundSize = 'cover';
        brandSeal.style.backgroundPosition = 'center';
        brandSeal.textContent = '';
        Storage.set('brandImage', event.target.result);
        showToast('品牌图片已更新', 'success');
      };
      reader.readAsDataURL(file);
    }
  });
  
  // 模态框关闭
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'modalOverlay') closeModal();
  });
  
  // 侧边栏切换
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const app = document.getElementById('app');
  const mainContent = document.getElementById('mainContent');
  
  // 恢复侧边栏状态
  const sidebarHidden = Storage.get('sidebarHidden');
  if (sidebarHidden) {
    sidebar.classList.add('hidden');
    app.classList.add('sidebar-hidden');
    sidebarToggle.textContent = '☰';
  }
  
  sidebarToggle.addEventListener('click', function() {
    sidebar.classList.toggle('hidden');
    app.classList.toggle('sidebar-hidden');
    const isHidden = sidebar.classList.contains('hidden');
    sidebarToggle.textContent = isHidden ? '☰' : '✕';
    Storage.set('sidebarHidden', isHidden);
  });
  
  mainContent.addEventListener('click', function(e) {
    if (!sidebar.classList.contains('hidden')) {
      sidebar.classList.add('hidden');
      app.classList.add('sidebar-hidden');
      sidebarToggle.textContent = '☰';
      Storage.set('sidebarHidden', true);
    }
  });
  
  let lastPinchDist = 0;
  mainContent.addEventListener('touchstart', function(e) {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastPinchDist = Math.sqrt(dx * dx + dy * dy);
    }
  }, { passive: true });
  
  mainContent.addEventListener('touchmove', function(e) {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (lastPinchDist > 0 && Math.abs(dist - lastPinchDist) > 30) {
        sidebar.classList.toggle('hidden');
        app.classList.toggle('sidebar-hidden');
        const isHidden = sidebar.classList.contains('hidden');
        sidebarToggle.textContent = isHidden ? '☰' : '✕';
        Storage.set('sidebarHidden', isHidden);
        lastPinchDist = 0;
      }
    }
  }, { passive: true });
  
  mainContent.addEventListener('touchend', function(e) {
    if (e.touches.length < 2) {
      lastPinchDist = 0;
    }
  });
  
  // AI悬浮窗
  const aiFloatBtn = document.getElementById('aiFloatBtn');
  const aiFloatPanel = document.getElementById('aiFloatPanel');
  const aiFloatClose = document.getElementById('aiFloatClose');
  const aiFloatConfig = document.getElementById('aiFloatConfig');
  const aiFloatSend = document.getElementById('aiFloatSend');
  const aiFloatInput = document.getElementById('aiFloatInput');
  const aiFloat = document.getElementById('aiFloat');
  const aiFloatTab = document.getElementById('aiFloatTab');
  
  // 恢复隐藏状态
  if (Storage.get('aiFloatHidden')) {
    aiFloat.classList.add('docked');
  }
  
  let longPressTimer = null;
  let isLongPress = false;
  
  aiFloatBtn.addEventListener('click', function(e) {
    if (aiFloat.classList.contains('docked')) {
      aiFloat.classList.remove('docked');
      Storage.set('aiFloatHidden', false);
      return;
    }
    if (isLongPress) {
      isLongPress = false;
      return;
    }
    // 单击打开豆包APP
    openDoubaoAPP();
  });
  
  // 长按打开网页内AI对话面板
  aiFloatBtn.addEventListener('touchstart', function(e) {
    longPressTimer = setTimeout(() => {
      isLongPress = true;
      aiFloatPanel.classList.toggle('show');
    }, 600);
  });
  
  aiFloatBtn.addEventListener('touchend', function(e) {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  });
  
  aiFloatBtn.addEventListener('touchmove', function(e) {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  });
  
  // 边缘隐藏：双击按钮贴边隐藏
  aiFloatBtn.addEventListener('dblclick', function() {
    aiFloat.classList.add('docked');
    aiFloatPanel.classList.remove('show');
    Storage.set('aiFloatHidden', true);
  });
  
  // 鼠标长按也打开网页内AI对话
  aiFloatBtn.addEventListener('mousedown', function() {
    longPressTimer = setTimeout(() => {
      isLongPress = true;
      aiFloatPanel.classList.toggle('show');
    }, 600);
  });
  
  aiFloatBtn.addEventListener('mouseup', function() {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  });
  
  aiFloatBtn.addEventListener('mouseleave', function() {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  });
  
  // 点击边缘小标签恢复
  aiFloatTab.addEventListener('click', function() {
    aiFloat.classList.remove('docked');
    Storage.set('aiFloatHidden', false);
  });
  
  aiFloatClose.addEventListener('click', function() {
    aiFloatPanel.classList.remove('show');
  });
  
  aiFloatConfig.addEventListener('click', function() {
    showAIConfigPrompt();
  });
  
  aiFloatSend.addEventListener('click', function() {
    const question = aiFloatInput.value.trim();
    if (!question) return;
    const content = document.getElementById('aiFloatContent');
    const apiKey = Storage.get('doubaoApiKey');
    
    if (!apiKey) {
      showAIConfigPrompt();
      return;
    }
    
    content.innerHTML += `<p style="color: var(--color-text-light);">你: ${question}</p>`;
    aiFloatInput.value = '';
    
    const loadingId = 'ai-loading-' + Date.now();
    content.innerHTML += `<p id="${loadingId}" style="color: var(--color-text-light); font-style: italic;">豆包正在思考中...</p>`;
    content.scrollTop = content.scrollHeight;
    
    fetchDoubaoAI(question, apiKey)
      .then(reply => {
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();
        content.innerHTML += `<p style="color: var(--ai-primary);">豆包: ${reply}</p>`;
        content.scrollTop = content.scrollHeight;
      })
      .catch(err => {
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();
        content.innerHTML += `<p style="color: #e74c3c;">❌ 请求失败: ${err.message || '未知错误'}</p>`;
        content.scrollTop = content.scrollHeight;
      });
  });
  
  aiFloatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') aiFloatSend.click();
  });
  
  // 启动路由
  Router.handle();
}

// 启动应用
document.addEventListener('DOMContentLoaded', init);

// ========================================
// AI悬浮窗快捷操作
// ========================================
window.showAIInspiration = function() {
  const content = document.getElementById('aiFloatContent');
  const apiKey = Storage.get('doubaoApiKey');
  if (apiKey) {
    content.innerHTML += `<p style="color: var(--color-text-light);">💡 灵感生成中...</p>`;
    fetchDoubaoAI('帮我生成5个创意灵感，主题是日常生活中的小美好', apiKey)
      .then(reply => {
        content.innerHTML += `<p style="color: var(--inspiration-primary); font-weight: 600;">💡 ${reply}</p>`;
        content.scrollTop = content.scrollHeight;
      })
      .catch(() => {
        content.innerHTML += `<p style="color: var(--color-text-light);">灵感来自生活的细节，多观察身边的事物</p>`;
      });
  } else {
    const inspirations = [
      '灵感来自生活的细节，多观察身边的事物',
      '尝试跨界思考，将不同领域的知识结合',
      '每天记录一个新想法，即使看似无关紧要',
      '保持好奇心，多问为什么',
      '与不同领域的人交流，获取新视角'
    ];
    const random = inspirations[Math.floor(Math.random() * inspirations.length)];
    content.innerHTML += `<p style="color: var(--inspiration-primary); font-weight: 600;">💡 ${random}</p>`;
  }
  content.scrollTop = content.scrollHeight;
};

window.showAIQuote = function() {
  const content = document.getElementById('aiFloatContent');
  const apiKey = Storage.get('doubaoApiKey');
  if (apiKey) {
    content.innerHTML += `<p style="color: var(--color-text-light);">📝 获取今日一句...</p>`;
    fetchDoubaoAI('给我一句温暖的、有哲理的中文短句，适合作为今日座右铭', apiKey)
      .then(reply => {
        content.innerHTML += `<p style="color: var(--color-text); font-style: italic;">「${reply}」</p>`;
        content.scrollTop = content.scrollHeight;
      })
      .catch(() => {
        const quote = DAILY_QUOTES[getDailyIndex(DAILY_QUOTES)];
        content.innerHTML += `<p style="color: var(--color-text); font-style: italic;">「${quote}」</p>`;
      });
  } else {
    const quote = DAILY_QUOTES[getDailyIndex(DAILY_QUOTES)];
    content.innerHTML += `<p style="color: var(--color-text); font-style: italic;">「${quote}」</p>`;
  }
  content.scrollTop = content.scrollHeight;
};

window.showAIWord = function() {
  const content = document.getElementById('aiFloatContent');
  const apiKey = Storage.get('doubaoApiKey');
  if (apiKey) {
    content.innerHTML += `<p style="color: var(--color-text-light);">📚 获取今日单词...</p>`;
    fetchDoubaoAI('推荐一个适合日常使用的英语单词，包含音标、中文意思和例句', apiKey)
      .then(reply => {
        content.innerHTML += `<p style="color: var(--english-primary); font-weight: 600;">📚 ${reply}</p>`;
        content.scrollTop = content.scrollHeight;
      })
      .catch(() => {
        const word = DAILY_WORDS[getDailyIndex(DAILY_WORDS)];
        content.innerHTML += `<p style="color: var(--english-primary); font-weight: 600;">${word.word}</p><p>${word.phonetic}</p><p style="color: var(--color-text-light);">${word.meaning}</p>`;
      });
  } else {
    const word = DAILY_WORDS[getDailyIndex(DAILY_WORDS)];
    content.innerHTML += `<p style="color: var(--english-primary); font-weight: 600;">${word.word}</p><p>${word.phonetic}</p><p style="color: var(--color-text-light);">${word.meaning}</p>`;
  }
  content.scrollTop = content.scrollHeight;
};

window.showAIPlan = function() {
  const content = document.getElementById('aiFloatContent');
  const apiKey = Storage.get('doubaoApiKey');
  if (apiKey) {
    content.innerHTML += `<p style="color: var(--color-text-light);">🎯 生成今日计划...</p>`;
    fetchDoubaoAI('为我制定一个高效的今日计划，包括学习、运动、休息，给出具体时间安排', apiKey)
      .then(reply => {
        content.innerHTML += `<p style="color: var(--sports-primary); font-weight: 600;">🎯 ${reply}</p>`;
        content.scrollTop = content.scrollHeight;
      })
      .catch(() => {
        const today = new Date();
        const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        content.innerHTML += `<p style="color: var(--color-text-light);">🎯 今日计划 (${dayNames[today.getDay()]}):</p>
          <p>1. 完成最重要的一件事</p>
          <p>2. 学习30分钟</p>
          <p>3. 运动20分钟</p>
          <p>4. 阅读10页书</p>`;
      });
  } else {
    const today = new Date();
    const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    content.innerHTML += `<p style="color: var(--color-text-light);">🎯 今日计划 (${dayNames[today.getDay()]}):</p>
      <p>1. 完成最重要的一件事</p>
      <p>2. 学习30分钟</p>
      <p>3. 运动20分钟</p>
      <p>4. 阅读10页书</p>`;
  }
  content.scrollTop = content.scrollHeight;
};

// 打开豆包APP
function openDoubaoAPP() {
  openAppOrWeb('doubao', 'https://www.doubao.com/');
}

function fetchDoubaoAI(question, apiKey) {
  return fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'doubao-pro-32k',
      messages: [
        { role: 'system', content: '你是一个温暖、专业的个人助手，回答简洁、有深度、富有启发性。' },
        { role: 'user', content: question }
      ]
    })
  }).then(res => {
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    return res.json();
  }).then(data => {
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content;
    }
    throw new Error('API返回格式异常');
  });
}

function showAIConfigPrompt() {
  showModal(`
    <h2 style="font-family: var(--font-title); margin-bottom: 20px; font-size: 22px;">🔑 配置豆包 AI</h2>
    <div style="padding: 16px; background: var(--color-bg-alt); border-radius: var(--radius-md); margin-bottom: 16px; font-size: 13px; line-height: 1.6; color: var(--color-text-light);">
      <div style="margin-bottom: 8px;">使用豆包 AI 服务需要配置 API Key：</div>
      <div>1. 访问 <a href="https://console.volcengine.com/ark" target="_blank" style="color: var(--ai-primary);">火山引擎方舟平台</a></div>
      <div>2. 创建 API Key 并复制</div>
      <div>3. 在下方粘贴 API Key</div>
    </div>
    <div class="input-group">
      <label>API Key</label>
      <input type="password" id="doubaoKeyInput" placeholder="粘贴你的 API Key">
    </div>
    <div style="display: flex; gap: 12px; margin-top: 16px;">
      <button class="btn btn-primary" style="flex:1;" onclick="saveDoubaoKey()">保存并开始使用</button>
      <button class="btn btn-outline" onclick="closeModal()">取消</button>
    </div>
  `);
}

window.saveDoubaoKey = function() {
  const key = document.getElementById('doubaoKeyInput').value.trim();
  if (!key) {
    showToast('请输入 API Key', 'error');
    return;
  }
  Storage.set('doubaoApiKey', key);
  closeModal();
  showToast('豆包 API Key 已保存', 'success');
  const content = document.getElementById('aiFloatContent');
  if (content) {
    content.innerHTML += `<p style="color: var(--ai-primary);">✅ 豆包已配置完成，现在可以开始对话了！</p>`;
    content.scrollTop = content.scrollHeight;
  }
};

window.clearDoubaoKey = function() {
  if (!confirm('确定清除豆包 API Key？')) return;
  Storage.remove('doubaoApiKey');
  showToast('API Key 已清除', 'success');
};