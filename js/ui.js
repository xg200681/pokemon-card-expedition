// ============================================================
// UI 渲染
// ============================================================
import { state } from './game.js';
import { getEnemyIntent, getCardCost, getCardDamagePreview } from './battle.js';
import { getNodeById, computeGeometry, getTraversedEdges, NODE_META } from './map.js';
import {
  STARTERS, KEYWORDS, TYPE_INFO, RARITY_INFO, CARD_TYPE_INFO,
  ENEMIES, BOSSES,
} from './data.js';
import { creatureArt, artSVG } from './art.js';
import { isMuted, setMuted, SFX } from './fx.js';

const $ = id => document.getElementById(id);

// ---------- 屏幕切换 ----------
export function showScreen(name) {
  hideTip();
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  const screen = $(name + '-screen');
  if (screen) {
    screen.classList.add('active', 'fade-in');
    setTimeout(() => screen.classList.remove('fade-in'), 320);
  }
  document.body.dataset.screen = name;
}

// ---------- 全局 tooltip ----------
let tipEl = null;
export function hideTip() { if (tipEl) tipEl.classList.remove('show'); }
function ensureTip() {
  if (!tipEl) {
    tipEl = document.createElement('div');
    tipEl.className = 'tooltip';
    document.body.appendChild(tipEl);
  }
  return tipEl;
}
export function initUI() {
  ensureTip();
  document.addEventListener('mouseover', (e) => {
    const t = e.target.closest('[data-tip]');
    if (!t) return;
    const tip = ensureTip();
    tip.innerHTML = t.dataset.tip;
    tip.classList.add('show');
    positionTip(t, tip);
  });
  document.addEventListener('mousemove', (e) => {
    if (!tipEl || !tipEl.classList.contains('show')) return;
    const t = e.target.closest('[data-tip]');
    if (t) positionTip(t, tipEl);
  });
  document.addEventListener('mouseout', (e) => {
    const t = e.target.closest('[data-tip]');
    if (!t) return;
    const to = e.relatedTarget;
    if (to && to.closest && to.closest('[data-tip]') === t) return;
    ensureTip().classList.remove('show');
  });
  document.addEventListener('click', (e) => {
    if (e.target.closest('button, .card, .map-node, .starter-card, .reward-card, .event-choice, .rest-choice')) {
      SFX.click();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const overlay = document.querySelector('.overlay:not(.hidden)');
      if (overlay) overlay.dispatchEvent(new CustomEvent('overlay-close'));
    }
  });
}
function positionTip(target, tip) {
  const r = target.getBoundingClientRect();
  const tw = tip.offsetWidth, th = tip.offsetHeight;
  let x = r.left + r.width / 2 - tw / 2;
  let y = r.top - th - 10;
  if (y < 8) y = r.bottom + 12;
  x = Math.max(8, Math.min(window.innerWidth - tw - 8, x));
  tip.style.left = x + 'px';
  tip.style.top = y + 'px';
}

// ---------- 通用 ----------
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function kwTip(text) {
  return `<b>${text}</b>`;
}

function fmtDesc(text) {
  const kwMap = {
    '消耗': KEYWORDS.exhaust.desc, '保留': KEYWORDS.retain.desc, '虚无': KEYWORDS.ethereal.desc,
    '固有': KEYWORDS.innate.desc, '易伤': '受到的攻击伤害提高 50%，回合结束时减 1 层。',
    '虚弱': '造成的攻击伤害降低 25%，回合结束时减 1 层。', '中毒': '回合开始受到等同层数的伤害（无视护甲），然后减 1 层。',
    '灼伤': '回合开始受到等同层数的伤害（无视护甲），然后减 1 层。', '力量': '每层使攻击伤害 +2。',
    '敏捷': '每层使获得的护甲 +1。', '荆棘': '受到攻击时对攻击者造成等同层数的伤害。',
    '金属化': '每回合开始时获得等同层数的护甲。', '护甲': '抵挡伤害，回合开始时清空。',
  };
  let html = esc(text);
  html = html.replace(/(消耗|保留|虚无|固有|易伤|虚弱|中毒|灼伤|力量|敏捷|荆棘|金属化|护甲)/g,
    m => `<span class="kw" data-tip="${esc(kwMap[m] || '')}">${m}</span>`);
  html = html.replace(/(\d+)/g, '<b>$1</b>');
  return html;
}

function keywordChips(card) {
  if (!card.keywords || !card.keywords.length) return '';
  return `<div class="card-keywords">${card.keywords.map(k => {
    const kk = KEYWORDS[k];
    if (!kk) return '';
    return `<span class="kw-chip" data-tip="${esc(kk.desc)}">${kk.name}</span>`;
  }).join('')}</div>`;
}

// ---------- 卡牌 ----------
export function renderCardHTML(card, opts = {}) {
  if (!card) return '';
  const isX = card.keywords && card.keywords.includes('xcost');
  const cost = opts.hand ? getCardCost(card) : card.cost;
  const costLabel = isX ? 'X' : cost;
  const dmgPreview = opts.hand ? getCardDamagePreview(card) : 0;
  const typeInfo = CARD_TYPE_INFO[card.type] || CARD_TYPE_INFO.skill;
  const rarity = RARITY_INFO[card.rarity] || RARITY_INFO.common;
  const el = TYPE_INFO[card.element] || TYPE_INFO.normal;
  const cantPlay = opts.hand && !opts.playable ? ' cant-play' : '';
  const upgraded = card.upgraded ? ' upgraded' : '';
  const damaged = opts.hand && dmgPreview > 0 && card.effects.damage ? ' has-damage' : '';
  const kwNames = (card.keywords || []).map(k => (KEYWORDS[k] || {}).name).filter(Boolean);
  const kwTips = (card.keywords || []).map(k => (KEYWORDS[k] || {}).desc).filter(Boolean).join('<br>');
  const typeLabel = typeInfo.name + (kwNames.length ? ' · ' + kwNames.join(' / ') : '');

  return `
  <div class="card rarity-${card.rarity} type-${card.type} element-${card.element}${upgraded}${cantPlay}${damaged}"
       data-index="${opts.index ?? ''}" data-uid="${card.uid ?? ''}"
       data-tip="${esc(`<b style="color:${rarity.color}">${esc(card.name)}</b> · ${typeInfo.name}<br>${esc(card.description)}${kwTips ? '<br><span style=\'color:#ffd54f\'>' + kwTips + '</span>' : ''}${card.upgraded ? '<br><span style=\'color:#7dd87d\'>已升级</span>' : ''}`)}">
    <div class="card-glow" style="--el:${el.color}"></div>
    <div class="card-cost" data-tip="费用：打出此牌需要消耗的能量">${costLabel}</div>
    <div class="card-head">
      <span class="card-name">${esc(card.name)}</span>
      <span class="card-element" title="${el.name}">${el.icon}</span>
    </div>
    <div class="card-art" style="--el:${el.color}">
      <span class="card-art-emoji">${card.emoji || el.icon}</span>
      <span class="card-type-tag" ${kwTips ? `data-tip="${esc(kwTips)}"` : ''}>${typeLabel}</span>
      ${opts.hand && dmgPreview > 0 ? `<span class="card-dmg-preview">预计 ${dmgPreview}${card.effects.hits > 1 ? '×' + card.effects.hits : ''}</span>` : ''}
    </div>
    <div class="card-body">
      <div class="card-desc">${fmtDesc(card.description)}</div>
      <div class="card-watermark">${card.emoji || el.icon}</div>
      <div class="card-foot"><span>${rarity.name}</span><span>${card.upgraded ? '已升级' : typeInfo.name}</span></div>
    </div>
  </div>`;
}

// ---------- 标题 ----------
export function renderTitle(onStart) {
  const el = $('title-screen');
  const heroes = [
    { art: 'charmander', element: 'fire' },
    { art: 'squirtle', element: 'water' },
    { art: 'bulbasaur', element: 'grass' },
  ];
  el.innerHTML = `
    <div class="title-bg"><span></span><span></span><span></span></div>
    <div class="title-heroes">
      ${heroes.map((h, i) => `<div class="title-hero hero-${i}">${creatureArt(h, { size: 'md', className: 'title-portrait' })}</div>`).join('')}
    </div>
    <div class="title-content">
      <div class="title-kicker">POKÉMON · ROGUELIKE DECKBUILDER</div>
      <h1>宝可梦<span>卡牌远征</span></h1>
      <p class="subtitle">构筑你的牌组，征服三层地区，成为冠军。</p>
      <div class="title-actions">
        <button class="btn btn-primary btn-big" id="btn-start">开始远征</button>
        <button class="btn" id="btn-howto">玩法说明</button>
      </div>
      <div class="title-foot">
        <span>属性克制</span><i>·</i><span>卡牌构筑</span><i>·</i><span>遗物收集</span><i>·</i><span>分支路线</span>
      </div>
    </div>
  `;
  $('btn-start').onclick = onStart;
  $('btn-howto').onclick = () => showHowTo();
}

function showHowTo() {
  const body = `
    <div class="howto">
      <div class="howto-block">
        <h3>🎯 目标</h3>
        <p>从常磐森林出发，击败三层的 BOSS。每层结束会进入更强的一层，卡牌、遗物与金币会保留。</p>
      </div>
      <div class="howto-block">
        <h3>🎴 卡牌与能量</h3>
        <p>每回合获得 3 点能量，抽 5 张牌。打出卡牌消耗能量，回合结束时手牌弃置。卡牌类型分为 <b>攻击</b>、<b>技能</b>、<b>能力</b>。</p>
        <p>卡牌可被<b>升级</b>（休息点 / 事件），升级后名称带 +，效果增强。卡面上的关键字（消耗 / 保留 / 虚无 / 固有 / 多段 / X费）悬停可查看说明。</p>
      </div>
      <div class="howto-block">
        <h3>⚔️ 战斗</h3>
        <p>敌人头上的意图会预告下回合行动（攻击数值、护甲、增益、减益）。<b>易伤</b>使受到伤害 +50%，<b>虚弱</b>使造成伤害 -25%，<b>中毒/灼伤</b>每回合扣血。</p>
        <p>属性克制：效果拔群 ×1.5，效果不好 ×0.75。护甲会在你的回合开始时清空。</p>
      </div>
      <div class="howto-block">
        <h3>🗺️ 路线</h3>
        <p>地图从下往上推进，金色的节点是可以前往的下一站，连线表示可达路径。精英战胜利可获得遗物，商店可购买/移除卡牌，休息点可回血或升级卡牌。</p>
      </div>
    </div>`;
  showOverlay(body, '玩法说明');
}

// ---------- 选择初始宝可梦 ----------
export function renderSelect(starters, onSelect) {
  hideTip();
  const el = $('select-screen');
  el.innerHTML = `
    <div class="select-head">
      <h2>选择你的旅伴</h2>
      <p>每只宝可梦拥有不同的初始牌组，决定了你的构筑方向。</p>
    </div>
    <div class="starter-container">
      ${starters.map(s => {
        const el2 = TYPE_INFO[s.element] || TYPE_INFO.normal;
        return `
        <div class="starter-card element-${s.element}" data-id="${s.id}" style="--el:${el2.color}">
          <div class="starter-art">${creatureArt({ art: s.art, element: s.element, name: s.name }, { size: 'lg' })}</div>
          <div class="starter-badge">${el2.icon} ${el2.name}</div>
          <div class="name">${s.name}</div>
          <div class="title">${s.title}</div>
          <div class="desc">${s.description}</div>
          <div class="starter-meta">
            <span>❤️ ${s.hp} HP</span>
            <span>🎴 ${s.starterCards.length} 张初始牌</span>
          </div>
          <div class="starter-passives">${s.passives.map(p => `<span>${p}</span>`).join('')}</div>
          <div class="starter-pick">选择 →</div>
        </div>`;
      }).join('')}
    </div>
  `;
  el.querySelectorAll('.starter-card').forEach(card => {
    card.onclick = () => onSelect(card.dataset.id);
  });
}

// ---------- 地图 ----------
export function renderMap(handlers) {
  hideTip();
  const el = $('map-screen');
  const m = state.map;
  const p = state.player;
  if (!m || !p) return;

  const { width, height, pos } = computeGeometry(m);
  const traversed = new Set(getTraversedEdges().map(([a, b]) => a + '>' + b));
  const current = getNodeById(m.currentNodeId);
  const nextIds = new Set(m.rows.flat().filter(n => n.available).map(n => n.id));

  // 边
  let edgesSvg = '';
  for (const row of m.rows) {
    for (const node of row) {
      const a = pos.get(node.id);
      for (const cid of node.connections) {
        const b = pos.get(cid);
        if (!a || !b) continue;
        const done = traversed.has(node.id + '>' + cid);
        const open = current && current.id === node.id;
        const isNext = (m.currentNodeId === null && node.row === 0 && nextIds.has(node.id)) || (m.currentNodeId !== null && node.id === m.currentNodeId && nextIds.has(cid));
        const cls = done ? 'edge done' : isNext || open ? 'edge open' : 'edge';
        const midY = (a.y + b.y) / 2;
        edgesSvg += `<path class="${cls}" d="M ${a.x} ${a.y - 26} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y + 26}" />`;
      }
    }
  }

  // 节点
  const nodesHtml = m.rows.map((row, r) => row.map(node => {
    const pt = pos.get(node.id);
    const meta = NODE_META[node.type] || {};
    const cls = ['map-node', `type-${node.type}`];
    if (node.visited) cls.push('visited');
    if (node.available) cls.push('available');
    if (node.id === m.currentNodeId) cls.push('current');
    if (node.type === 'boss') cls.push('boss');
    const enemyTpl = node.enemyId ? (state.battle ? null : null) : null;
    const tipText = `<b>${meta.label}</b><br>${meta.desc}${node.type === 'battle' || node.type === 'elite' || node.type === 'boss' ? `<br><span style="color:${meta.color}">${esc(getEnemyName(node))}</span>` : ''}`;
    return `
      <div class="${cls.join(' ')}" data-id="${node.id}" style="left:${pt.x}px;top:${pt.y}px;--node-color:${meta.color}"
           ${node.available ? `data-tip="${esc(tipText)}"` : `data-tip="${esc(tipText + (node.visited ? '<br><i style="color:#888">已通过</i>' : ''))}"`}>
        <div class="node-ring"></div>
        ${node.available ? '<span class="node-avail">可前往</span>' : ''}
        <div class="node-core"><span class="node-icon">${meta.icon}</span></div>
        <div class="node-label">${meta.label}</div>
        ${node.id === m.currentNodeId ? `<div class="node-token">${artSVG(p.pokemon.art, {})}</div>` : ''}
        ${node.visited && node.id !== m.currentNodeId ? '<div class="node-check">✓</div>' : ''}
      </div>`;
  }).join('')).join('');

  // 遗物
  const relicsHtml = p.relics.map(r => `<span class="relic-item" data-tip="${esc(`<b>${r.name}</b><br>${r.description}`)}">${r.emoji}</span>`).join('');

  // 楼层进度
  const floorPips = [0, 1, 2].map(i => {
    const cfgName = ['常磐森林', '月见山', '冠军之路'][i];
    const active = i === state.currentFloor;
    const done = i < state.currentFloor;
    return `<span class="floor-pip${active ? ' active' : ''}${done ? ' done' : ''}"><i>${done ? '✓' : i + 1}</i>${cfgName}</span>`;
  }).join('<span class="pip-sep"></span>');

  el.innerHTML = `
    <div class="map-header">
      <div class="map-title">
        <div class="floor-name">${m.floorEmoji} ${m.floorName}</div>
        <div class="floor-pips">${floorPips}</div>
      </div>
      <div class="player-bar">
        <div class="player-chip">
          <div class="chip-art">${artSVG(p.pokemon.art)}</div>
          <div class="chip-info">
            <span class="chip-name">${p.pokemon.name}</span>
            <span class="chip-hp">❤️ ${p.hp}/${p.maxHp}</span>
          </div>
        </div>
        <div class="stat-pill" data-tip="金币：在商店购买卡牌或服务">🪙 <b>${p.gold}</b></div>
        <div class="stat-pill" data-tip="牌组：点击查看你的全部卡牌">🎴 <b>${p.deck.length}</b></div>
        <div class="player-relics">${relicsHtml || '<span class="relic-empty">遗物</span>'}</div>
        <button class="icon-btn" id="btn-deck-map" data-tip="查看牌组">📖</button>
        <button class="icon-btn" id="btn-sound-map" data-tip="音效开关">${isMuted() ? '🔇' : '🔊'}</button>
      </div>
    </div>
    <div class="map-legend">
      ${Object.entries(NODE_META).map(([k, v]) => `<span class="legend-item"><i style="background:${v.color}">${v.icon}</i>${v.label}</span>`).join('')}
      <span class="legend-sep"></span>
      <span class="legend-hint">沿连线向上推进 · 金圈为可前往节点</span>
    </div>
    <div class="map-scroll" id="map-scroll">
      <div class="map-canvas" style="width:${width}px;height:${height}px">
        <svg class="map-lines" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
          <defs>
            <linearGradient id="edgeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#ffd54f" stop-opacity="0.95"/>
              <stop offset="100%" stop-color="#ff8a65" stop-opacity="0.5"/>
            </linearGradient>
          </defs>
          ${edgesSvg}
        </svg>
        ${nodesHtml}
      </div>
    </div>
    <div class="map-footer">
      <span>📍 当前位置：${current ? (NODE_META[current.type] || {}).label + ' 节点' : '起点'}</span>
      <span>🎯 目标：击败 ${m.floorName} 的 ${esc(getBossName(m))}</span>
      <span>剩余可前往：${nextIds.size} 条路线</span>
    </div>
  `;

  el.querySelectorAll('.map-node.available').forEach(nodeEl => {
    nodeEl.onclick = () => handlers.onNodeClick(parseInt(nodeEl.dataset.id));
  });
  $('btn-deck-map').onclick = () => handlers.onDeck();
  $('btn-sound-map').onclick = (e) => { setMuted(!isMuted()); e.currentTarget.textContent = isMuted() ? '🔇' : '🔊'; };

  // 滚动到当前行
  requestAnimationFrame(() => {
    const scroll = $('map-scroll');
    if (!scroll) return;
    const targetNode = current ? getNodeById(current.id) : m.rows[0][0];
    const pt = pos.get(targetNode.id);
    if (pt) scroll.scrollTop = Math.max(0, pt.y - scroll.clientHeight + 140);
  });
}

function getEnemyName(node) {
  const tpl = ENEMIES[node.enemyId] || BOSSES[node.enemyId];
  return tpl ? tpl.name : '';
}
function getBossName(m) {
  const b = BOSSES[m.bossId];
  return b ? b.name : '楼层首领';
}

// ---------- 战斗 ----------
const STATUS_META = {
  strength: { icon: '💪', name: '力量' },
  dexterity: { icon: '🎯', name: '敏捷' },
  thorns: { icon: '🌵', name: '荆棘' },
  plated: { icon: '🔩', name: '金属化' },
  vulnerable: { icon: '💔', name: '易伤', bad: true },
  weak: { icon: '⬇️', name: '虚弱', bad: true },
  poison: { icon: '☠️', name: '中毒', bad: true },
  burn: { icon: '🔥', name: '灼伤', bad: true },
};

function statusChips(obj, opts = {}) {
  const chips = [];
  for (const [k, meta] of Object.entries(STATUS_META)) {
    const v = obj[k];
    if (v > 0) chips.push(`<span class="status-chip ${meta.bad ? 'bad' : 'good'}" data-tip="${esc(`<b>${meta.name} ${v}</b><br>${statusDesc(k)}`)}">${meta.icon}<b>${v}</b></span>`);
  }
  if (obj.block > 0) chips.push(`<span class="status-chip block" data-tip="护甲：抵挡伤害，回合开始时清空">🛡️<b>${obj.block}</b></span>`);
  return chips.join('');
}
function statusDesc(k) {
  return {
    strength: '每层使攻击伤害 +2。',
    dexterity: '每层使获得的护甲 +1。',
    thorns: '受到攻击时，对攻击者造成等同层数的伤害。',
    plated: '每回合开始时获得等同层数的护甲。',
    vulnerable: '受到的攻击伤害提高 50%，回合结束时减 1 层。',
    weak: '造成的攻击伤害降低 25%，回合结束时减 1 层。',
    poison: '回合开始受到等同层数的伤害（无视护甲），然后减 1 层。',
    burn: '回合开始受到等同层数的伤害（无视护甲），然后减 1 层。',
  }[k] || '';
}

function intentHTML(intent) {
  if (!intent) return '';
  return `
    <div class="intent-bubble type-${intent.type}" data-tip="敌人下回合的行动：${esc(intent.lines.map(l => l.text).join(' / '))}">
      <div class="intent-name">${esc(intent.name)}</div>
      <div class="intent-lines">
        ${intent.lines.map(l => `<span class="intent-line ${l.cls}">${l.icon} ${l.text}</span>`).join('')}
      </div>
    </div>`;
}

function stageScenery(theme) {
  if (theme === 'mountain') {
    return `
      <svg class="stage-scenery" viewBox="0 0 1000 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        
        
        <path d="M0 320 L150 190 L240 260 L360 130 L470 300 L560 200 L660 300 L760 180 L880 300 L1000 210 L1000 420 L0 420 Z" fill="#2a2450" opacity="0.55"/>
        <path d="M0 360 L120 280 L230 340 L350 250 L470 345 L600 270 L720 350 L840 285 L1000 350 L1000 420 L0 420 Z" fill="#1b1736" opacity="0.75"/>
        <g fill="#0e0b1d" opacity="0.8">
          <path d="M90 420 L120 330 L150 420 Z"/><path d="M180 420 L205 350 L230 420 Z"/>
          <path d="M790 420 L820 340 L850 420 Z"/><path d="M880 420 L905 355 L930 420 Z"/>
        </g>
        <g fill="#fff" opacity="0.35">
          <circle cx="120" cy="80" r="1.6"/><circle cx="240" cy="130" r="1.2"/><circle cx="380" cy="60" r="1.8"/>
          <circle cx="620" cy="95" r="1.3"/><circle cx="720" cy="45" r="1.5"/><circle cx="920" cy="120" r="1.4"/>
        </g>
      </svg>`;
  }
  if (theme === 'champion') {
    return `
      <svg class="stage-scenery" viewBox="0 0 1000 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <rect x="0" y="0" width="1000" height="420" fill="url(#champGlow)"/>
        <defs>
          <linearGradient id="champGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#ffb74d" stop-opacity="0.10"/>
            <stop offset="1" stop-color="#ff7043" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <g fill="#2a1a2e" opacity="0.65">
          <rect x="40" y="90" width="54" height="330" rx="6"/><rect x="906" y="90" width="54" height="330" rx="6"/>
          <rect x="20" y="70" width="94" height="26" rx="8"/><rect x="886" y="70" width="94" height="26" rx="8"/>
          <rect x="150" y="180" width="30" height="240" rx="5" opacity="0.6"/><rect x="820" y="180" width="30" height="240" rx="5" opacity="0.6"/>
        </g>
        <g fill="#ffb74d" opacity="0.55">
          <circle cx="67" cy="58" r="10"/><circle cx="933" cy="58" r="10"/>
          <circle cx="67" cy="58" r="22" opacity="0.25"/><circle cx="933" cy="58" r="22" opacity="0.25"/>
        </g>
        <path d="M0 380 Q250 330 500 380 T1000 380 L1000 420 L0 420 Z" fill="#1a1020" opacity="0.85"/>
      </svg>`;
  }
  return `
    <svg class="stage-scenery" viewBox="0 0 1000 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      
      
      <g fill="#0d1a16" opacity="0.75">
        <path d="M0 420 L0 220 Q60 190 90 250 L120 420 Z"/>
        <path d="M960 420 L1000 420 L1000 200 Q940 180 910 245 L880 420 Z"/>
        <path d="M420 150 q40 -70 90 -20 q50 -50 90 15 q60 0 55 55 q10 60 -60 55 l-160 0 q-65 0 -55 -55 q-5 -50 40 -50 Z" opacity="0.55"/>
      </g>
      <g fill="#14261f" opacity="0.8">
        <ellipse cx="160" cy="250" rx="120" ry="70"/><ellipse cx="290" cy="300" rx="90" ry="50"/>
        <ellipse cx="760" cy="270" rx="130" ry="76"/><ellipse cx="640" cy="320" rx="80" ry="44"/>
      </g>
      <path d="M0 355 Q200 315 400 355 T800 350 T1000 360 L1000 420 L0 420 Z" fill="#0a1410" opacity="0.9"/>
      <g fill="#b8ffcf" opacity="0.55">
        <circle cx="180" cy="180" r="2"/><circle cx="260" cy="120" r="1.6"/><circle cx="700" cy="150" r="1.8"/>
        <circle cx="760" cy="220" r="1.4"/><circle cx="480" cy="240" r="1.5"/><circle cx="340" cy="200" r="1.3"/>
      </g>
    </svg>`;
}

export function renderBattle(handlers) {
  hideTip();
  const el = $('battle-screen');
  const b = state.battle;
  const p = state.player;
  if (!b) return;
  const enemy = b.enemy;
  const intent = getEnemyIntent();
  const hpPct = Math.max(0, enemy.currentHp / enemy.maxHp * 100);
  const pHpPct = Math.max(0, p.hp / p.maxHp * 100);
  const floor = state.map ? `${state.map.floorEmoji} ${state.map.floorName}` : '';

  const handHtml = b.hand.map((card, i) => {
    const playable = b.isPlayerTurn && !b.battleOver && (getCardCost(card) === 'X' || b.energy >= getCardCost(card));
    return renderCardHTML(card, { hand: true, index: i, playable });
  }).join('');

  const logHtml = b.log.slice(-40).map(l => {
    const cls = { damage: 'log-damage', block: 'log-block', heal: 'log-heal', buff: 'log-buff', debuff: 'log-debuff', turn: 'log-turn', victory: 'log-victory', start: 'log-start' }[l.type] || '';
    return `<div class="log-entry ${cls}">${esc(l.text)}</div>`;
  }).join('');

  const powers = b.powers.map(c => `<span class="power-chip" data-tip="${esc(`<b>${c.name}</b><br>${c.description}`)}">${c.emoji}</span>`).join('');

  const enemyBlock = enemy.block > 0 ? `<div class="block-badge enemy">🛡️ ${enemy.block}</div>` : '';
  const playerBlock = b.block > 0 ? `<div class="block-badge" data-tip="护甲会优先抵挡伤害">🛡️ ${b.block}</div>` : '';

  const turnChip = `<div class="turn-chip ${b.isPlayerTurn ? 'mine' : 'theirs'}">${b.battleOver ? (b.won ? '战斗胜利' : '战斗失败') : (b.isPlayerTurn ? '你的回合' : '敌方回合')}</div>`;

  el.innerHTML = `
    <div class="battle-topbar">
      <div class="battle-loc">${floor}${b.isElite ? ' · <span class="elite-tag">精英</span>' : ''}${enemy.isBoss ? ' · <span class="boss-tag">BOSS</span>' : ''}</div>
      <div class="battle-tools">
        ${turnChip}
        <button class="icon-btn" id="btn-deck-battle" data-tip="查看牌组">📖</button>
        <button class="icon-btn" id="btn-log-toggle" data-tip="战斗日志">📜</button>
        <button class="icon-btn" id="btn-sound-battle" data-tip="音效开关">${isMuted() ? '🔇' : '🔊'}</button>
      </div>
    </div>

    <div class="battle-stage theme-${state.map ? state.map.theme : 'forest'}" id="battle-stage">
      <div class="stage-bg">${stageScenery(state.map ? state.map.theme : 'forest')}</div>
      <div class="combatant player-side">
        <div class="art-wrap" id="player-art">
          ${creatureArt({ art: p.pokemon.art, element: p.pokemon.element, name: p.pokemon.name }, { size: 'player' })}
          ${playerBlock}
          <div class="art-nameplate">${p.pokemon.name}</div>
        </div>
        <div class="status-row">${statusChips({ ...b, block: 0 })}</div>
        <div class="hp-block">
          <div class="hp-label"><span>❤️ ${p.hp} / ${p.maxHp}</span><span class="hp-sub">${p.pokemon.element ? TYPE_INFO[p.pokemon.element].name + '属性' : ''}</span></div>
          <div class="hp-bar-container"><div class="hp-bar${pHpPct < 30 ? ' low' : ''}" style="width:${pHpPct}%"></div></div>
        </div>
      </div>

      <div class="stage-center">
        <div class="vs-mark">VS</div>
      </div>

      <div class="combatant enemy-side">
        ${intentHTML(intent)}
        <div class="art-wrap" id="enemy-art">
          ${creatureArt({ art: enemy.art, variant: enemy.variant, element: enemy.element, name: enemy.name, emoji: enemy.emoji }, { size: enemy.isBoss ? 'boss' : 'enemy' })}
          ${enemyBlock}
          ${enemy.isBoss ? `<div class="boss-crown">👑</div>` : ''}
        </div>
        <div class="enemy-title">
          <div class="enemy-name-row">
            <span class="enemy-name">${esc(enemy.name)}</span>
            <span class="enemy-level">${enemy.isBoss ? 'BOSS' : 'Lv.' + (enemy.tier * 5 + 3)}</span>
          </div>
        </div>
        <div class="status-row">${statusChips(enemy)}</div>
        <div class="hp-block enemy">
          <div class="hp-label"><span>❤️ ${enemy.currentHp} / ${enemy.maxHp}</span><span class="hp-sub">${(TYPE_INFO[enemy.element] || {}).name || ''}属性</span></div>
          <div class="hp-bar-container"><div class="hp-bar enemy${hpPct < 30 ? ' low' : ''}" style="width:${hpPct}%"></div></div>
        </div>
      </div>
    </div>

    <div class="battle-bottom">
      <div class="battle-left">
        <div class="energy-block">
          <div class="energy-orb" data-tip="能量：每回合恢复到上限，用于打出卡牌">
            <span>${b.energy}</span><em>/${b.maxEnergy}</em>
          </div>
          <div class="pile-buttons">
            <button class="pile-btn" data-pile="draw" data-tip="抽牌堆：点击查看">抽<b>${b.drawPile.length}</b></button>
            <button class="pile-btn" data-pile="discard" data-tip="弃牌堆：点击查看">弃<b>${b.discardPile.length}</b></button>
            <button class="pile-btn" data-pile="exhaust" data-tip="消耗堆：点击查看">耗<b>${b.exhaustPile.length}</b></button>
          </div>
        </div>
        <div class="powers-row">${powers}</div>
      </div>

      <div class="hand-area" id="hand-area">${handHtml || '<div class="hand-empty">手牌已空</div>'}</div>

      <div class="battle-right">
        <button class="btn-end-turn${!b.isPlayerTurn || b.battleOver ? ' disabled' : ''}" id="btn-end-turn" ${!b.isPlayerTurn || b.battleOver ? 'disabled' : ''}>
          <span>结束回合</span><em>➤</em>
        </button>
        <div class="hand-count">手牌 ${b.hand.length}</div>
      </div>
    </div>

    <div class="battle-log" id="battle-log-panel">
      <div class="log-head">战斗日志<button class="log-close" id="btn-log-close">✕</button></div>
      <div class="log-body">${logHtml}</div>
    </div>
  `;

  // 手牌点击
  el.querySelectorAll('.card[data-index]').forEach(cardEl => {
    cardEl.onclick = () => {
      const idx = parseInt(cardEl.dataset.index);
      handlers.onPlayCard(idx, cardEl);
    };
  });
  const endBtn = $('btn-end-turn');
  if (endBtn && !endBtn.disabled) endBtn.onclick = handlers.onEndTurn;
  $('btn-deck-battle').onclick = () => handlers.onDeck();
  $('btn-sound-battle').onclick = (e) => { setMuted(!isMuted()); e.currentTarget.textContent = isMuted() ? '🔇' : '🔊'; };
  $('btn-log-toggle').onclick = () => el.classList.toggle('log-open');
  $('btn-log-close').onclick = () => el.classList.remove('log-open');
  el.querySelectorAll('.pile-btn').forEach(btn => {
    btn.onclick = () => handlers.onViewPile(btn.dataset.pile);
  });

  const logEl = $('battle-log-panel');
  if (logEl) logEl.scrollTop = logEl.scrollHeight;
}

// ---------- 奖励 ----------
export function renderReward(gold, cards, handlers) {
  hideTip();
  const el = $('reward-screen');
  const p = state.player;
  el.innerHTML = `
    <div class="reward-head">
      <div class="reward-emblem">🎁</div>
      <div class="reward-kicker">VICTORY</div>
      <h2>战斗胜利！</h2>
      <div class="reward-gold">🪙 +${gold} 金币 <span>（现有 ${p.gold}）</span></div>
    </div>
    <p class="reward-hint">选择一张卡牌加入牌组</p>
    <div class="reward-cards">
      ${cards.map((card, i) => `<div class="reward-card-wrap" data-index="${i}">${renderCardHTML(card, {})}</div>`).join('')}
    </div>
    <div class="reward-actions">
      <button class="btn" id="btn-skip-reward">跳过</button>
      <button class="btn btn-ghost" id="btn-deck-reward">查看牌组</button>
    </div>
  `;
  el.querySelectorAll('.reward-card-wrap').forEach(rc => {
    rc.onclick = () => handlers.onPick(parseInt(rc.dataset.index));
  });
  $('btn-skip-reward').onclick = handlers.onSkip;
  $('btn-deck-reward').onclick = handlers.onDeck;
}

// ---------- 商店 ----------
export function renderShop(cards, prices, removeCost, handlers) {
  hideTip();
  const el = $('shop-screen');
  const p = state.player;
  el.innerHTML = `
    <div class="shop-head">
      <h2>🛒 友好商店</h2>
      <div class="shop-gold">🪙 ${p.gold}</div>
    </div>
    <div class="shop-grid">
      ${cards.map((card, i) => {
        const price = prices[i];
        const canAfford = p.gold >= price && !card.sold;
        return `
        <div class="shop-slot${card.sold ? ' sold' : ''}${canAfford ? '' : ' poor'}" data-index="${i}">
          ${renderCardHTML(card, {})}
          <div class="shop-price">${card.sold ? '已售出' : `🪙 ${price}`}</div>
        </div>`;
      }).join('')}
      <div class="shop-slot service" id="btn-remove-card">
        <div class="service-card">
          <div class="service-icon">🗑️</div>
          <div class="service-name">移除卡牌</div>
          <div class="service-desc">从牌组中永久移除一张卡牌，精简牌组。</div>
          <div class="shop-price">🪙 ${removeCost}</div>
        </div>
      </div>
    </div>
    <div class="shop-actions">
      <button class="btn btn-ghost" id="btn-deck-shop">查看牌组</button>
      <button class="btn" id="btn-leave-shop">离开商店 →</button>
    </div>
  `;
  el.querySelectorAll('.shop-slot[data-index]').forEach(item => {
    item.onclick = () => handlers.onBuyCard(parseInt(item.dataset.index));
  });
  $('btn-remove-card').onclick = handlers.onRemoveCard;
  $('btn-deck-shop').onclick = handlers.onDeck;
  $('btn-leave-shop').onclick = handlers.onLeave;
}

// ---------- 休息 ----------
export function renderRest(handlers) {
  hideTip();
  const el = $('rest-screen');
  const p = state.player;
  const healAmount = Math.floor(p.maxHp * 0.3);
  el.innerHTML = `
    <div class="rest-scene">
      <div class="campfire">🔥</div>
      <h2>🏕️ 休息点</h2>
      <p class="rest-quote">${p.pokemon.name} 在篝火旁打了个哈欠。</p>
      <div class="rest-hp">❤️ ${p.hp} / ${p.maxHp}</div>
    </div>
    <div class="rest-choices">
      <div class="rest-choice" id="rest-heal">
        <div class="emoji">❤️</div>
        <div class="title">休息</div>
        <div class="desc">回复 ${healAmount} 点 HP（30% 最大生命）</div>
      </div>
      <div class="rest-choice" id="rest-upgrade">
        <div class="emoji">⬆️</div>
        <div class="title">修炼</div>
        <div class="desc">永久升级一张卡牌，效果增强</div>
      </div>
      <div class="rest-choice small" id="rest-deck">
        <div class="emoji">📖</div>
        <div class="title">整理牌组</div>
        <div class="desc">查看当前牌组构成</div>
      </div>
    </div>
  `;
  $('rest-heal').onclick = handlers.onHeal;
  $('rest-upgrade').onclick = handlers.onUpgrade;
  $('rest-deck').onclick = handlers.onDeck;
}

// ---------- 事件 ----------
export function renderEvent(event, onChoice) {
  const el = $('event-screen');
  el.innerHTML = `
    <div class="event-art">${event.emoji}</div>
    <h2>${event.title}</h2>
    <div class="event-desc">${event.description}</div>
    <div class="event-choices">
      ${event.choices.map((c, i) => `<div class="event-choice" data-index="${i}"><span class="event-choice-idx">${i + 1}</span>${c.text}</div>`).join('')}
    </div>
  `;
  el.querySelectorAll('.event-choice').forEach(ch => {
    ch.onclick = () => onChoice(parseInt(ch.dataset.index));
  });
}

// ---------- 遗物选择 ----------
export function renderRelicChoice(relics, onPick) {
  hideTip();
  const el = $('relic-screen');
  el.innerHTML = `
    <div class="relic-head"><div class="reward-kicker">TREASURE</div><h2>选择一件遗物</h2></div>
    <div class="relic-choices">
      ${relics.map((r, i) => `
        <div class="relic-choice" data-index="${i}">
          <div class="relic-emoji">${r.emoji}</div>
          <div class="relic-name">${r.name}</div>
          <div class="relic-rarity">${{ common: '普通', uncommon: '稀有', rare: '史诗' }[r.rarity] || ''}</div>
          <div class="relic-desc">${r.description}</div>
        </div>`).join('')}
    </div>
  `;
  el.querySelectorAll('.relic-choice').forEach(rc => {
    rc.onclick = () => onPick(parseInt(rc.dataset.index));
  });
}

// ---------- 结算 ----------
export function renderGameOver(onRestart) {
  const el = $('gameover-screen');
  const p = state.player;
  el.innerHTML = `
    <div class="end-emoji">💀</div>
    <h1>远征失败</h1>
    <p class="end-sub">${p.pokemon.name} 倒在了 ${state.map ? state.map.floorName : '旅途中'}。</p>
    <div class="end-stats">
      <div><b>${state.stats ? state.stats.battlesWon : 0}</b><span>战斗胜利</span></div>
      <div><b>${p.deck.length}</b><span>牌组张数</span></div>
      <div><b>${p.relics.length}</b><span>遗物</span></div>
      <div><b>${p.gold}</b><span>金币</span></div>
    </div>
    <button class="btn btn-primary" id="btn-restart">再来一次</button>
  `;
  $('btn-restart').onclick = onRestart;
}

export function renderVictory(onRestart) {
  const el = $('victory-screen');
  const p = state.player;
  el.innerHTML = `
    <div class="victory-rays"></div>
    <div class="end-emoji">🏆</div>
    <h1>冠军诞生</h1>
    <p class="end-sub">${p.pokemon.name} 与你的牌组，征服了全部三层地区。</p>
    <div class="end-stats">
      <div><b>${p.hp}</b><span>剩余 HP</span></div>
      <div><b>${state.stats ? state.stats.battlesWon : 0}</b><span>战斗胜利</span></div>
      <div><b>${p.deck.length}</b><span>牌组张数</span></div>
      <div><b>${p.relics.length}</b><span>遗物</span></div>
    </div>
    <div class="victory-relics">${p.relics.map(r => `<span data-tip="${esc(`<b>${r.name}</b><br>${r.description}`)}">${r.emoji}</span>`).join('') || '无遗物'}</div>
    <button class="btn btn-primary" id="btn-restart-v">再来一局</button>
  `;
  $('btn-restart-v').onclick = onRestart;
}

// ---------- 覆盖层 ----------
export function showOverlay(innerHTML, title, onClose) {
  hideTip();
  let overlay = document.getElementById('global-overlay');
  if (overlay) overlay.remove();
  overlay = document.createElement('div');
  overlay.id = 'global-overlay';
  overlay.className = 'overlay';
  overlay.innerHTML = `
    <div class="overlay-panel">
      <div class="overlay-head">
        <h2>${title}</h2>
        <button class="overlay-close" id="overlay-close">✕</button>
      </div>
      <div class="overlay-body">${innerHTML}</div>
    </div>`;
  document.body.appendChild(overlay);
  const close = () => { overlay.remove(); if (onClose) onClose(); };
  $('overlay-close').onclick = close;
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  overlay.addEventListener('overlay-close', close);
  return close;
}

export function renderDeckOverlay(deck) {
  const groups = { attack: [], skill: [], power: [], other: [] };
  for (const c of deck) (groups[c.type] || groups.other).push(c);
  const body = `
    <div class="deck-summary">
      <span>共 <b>${deck.length}</b> 张</span>
      <span class="type-count attack">攻击 ${groups.attack.length}</span>
      <span class="type-count skill">技能 ${groups.skill.length}</span>
      <span class="type-count power">能力 ${groups.power.length}</span>
    </div>
    <div class="deck-grid">
      ${deck.map(c => renderCardHTML(c, {})).join('')}
    </div>`;
  showOverlay(body, '📖 当前牌组');
}

export function renderPileOverlay(cards, title) {
  const body = cards.length
    ? `<div class="deck-grid">${cards.map(c => renderCardHTML(c, {})).join('')}</div>`
    : `<p class="empty-note">这里空空如也。</p>`;
  showOverlay(body, `${title} · ${cards.length} 张`);
}

export function renderCardPicker(cards, title, onPick, emptyText = '没有可选择的卡牌') {
  if (!cards.length) {
    showOverlay(`<p class="empty-note">${emptyText}</p>`, title);
    return;
  }
  const body = `<div class="deck-grid picker">${cards.map((c, i) => `<div class="pick-wrap" data-idx="${i}">${renderCardHTML(c, {})}</div>`).join('')}</div>`;
  const close = showOverlay(body, title);
  document.querySelectorAll('#global-overlay .pick-wrap').forEach(wrap => {
    wrap.onclick = () => {
      onPick(cards[parseInt(wrap.dataset.idx)]);
      close();
    };
  });
}

export function showToast(text, type = '') {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
  }
  t.className = 'toast ' + type;
  t.textContent = text;
  t.classList.remove('show');
  void t.offsetWidth;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 1800);
}

// ---------- 兼容旧接口 ----------
export function shakeEnemy() {
  const el = document.getElementById('enemy-art');
  if (el) { el.classList.remove('hit-shake'); void el.offsetWidth; el.classList.add('hit-shake'); }
}
export function showDamageNumber(value, type, targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const num = document.createElement('div');
  num.className = 'damage-number' + (type === 'heal' ? ' heal' : '');
  num.textContent = (type === 'heal' ? '+' : '-') + value;
  el.appendChild(num);
  setTimeout(() => num.remove(), 1000);
}