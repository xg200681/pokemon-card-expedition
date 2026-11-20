// ============================================================
// 地图生成与导航 — 分支路线 / 明确路径
// ============================================================
import { state } from './game.js';
import { FLOOR_CONFIG } from './data.js';

export const MAP_WIDTH = 760;
export const ROW_GAP = 104;
export const TOP_PAD = 84;
export const NODE_SIZE = 64;

export const NODE_META = {
  battle: { icon: '⚔️', label: '战斗', color: '#ff8a65', desc: '普通战斗，获得金币与卡牌' },
  elite:  { icon: '💀', label: '精英', color: '#c084fc', desc: '强力敌人，胜利后获得遗物' },
  boss:   { icon: '👑', label: 'BOSS', color: '#ffd54f', desc: '楼层首领，胜利后进入下一层' },
  shop:   { icon: '🛒', label: '商店', color: '#4fc3f7', desc: '购买卡牌、移除卡牌' },
  rest:   { icon: '🏕️', label: '休息', color: '#81c784', desc: '回复生命或升级卡牌' },
  event:  { icon: '❓', label: '事件', color: '#ffb74d', desc: '未知的遭遇，风险与机遇并存' },
};

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 依据所在行的比例生成该行节点类型 */
function makeRowTypes(r, totalRows) {
  if (r === 0) return shuffle(['battle', 'battle', 'battle', 'event']).slice(0, 2 + Math.floor(Math.random() * 2));
  if (r === totalRows - 1) return ['boss'];
  const t = r / (totalRows - 1);
  let pool;
  if (t < 0.28) pool = ['battle', 'battle', 'battle', 'event', 'battle'];
  else if (t < 0.52) pool = ['battle', 'battle', 'battle', 'event', 'elite', 'shop'];
  else if (t < 0.76) pool = ['battle', 'battle', 'elite', 'event', 'shop', 'rest'];
  else pool = ['battle', 'battle', 'elite', 'rest', 'shop', 'event'];

  const count = 2 + Math.floor(Math.random() * 3); // 2~4
  const types = [];
  for (let i = 0; i < count; i++) types.push(pick(pool));
  // 限制同类型数量
  const seen = {};
  for (let i = 0; i < types.length; i++) {
    seen[types[i]] = (seen[types[i]] || 0) + 1;
    if (seen[types[i]] > 2) types[i] = 'battle';
  }
  // 精英不出现在最前段
  if (t < 0.3) return types.map(x => x === 'elite' ? 'battle' : x);
  return types;
}

export function generateMap(floorIndex) {
  const cfg = FLOOR_CONFIG[floorIndex];
  if (!cfg) return;

  const totalRows = cfg.rows || 7;
  const rows = [];
  let nodeId = 0;

  for (let r = 0; r < totalRows; r++) {
    const types = makeRowTypes(r, totalRows);
    const row = types.map((type, c) => {
      let enemyId = null;
      if (type === 'battle') enemyId = pick(cfg.normalEnemies);
      else if (type === 'elite') enemyId = pick(cfg.eliteEnemies);
      else if (type === 'boss') enemyId = cfg.boss;
      return {
        id: nodeId++, row: r, col: c, type, enemyId,
        connections: [], incoming: [],
        visited: false, available: false, next: false,
        encounters: null,
      };
    });
    rows.push(row);
  }

  // 保证每层至少有一个商店和休息点
  const allNodes = rows.flat().filter(n => n.type !== 'boss');
  if (!allNodes.some(n => n.type === 'shop')) {
    const mid = allNodes.filter(n => n.row > 1 && n.row < totalRows - 2);
    if (mid.length) mid[Math.floor(Math.random() * mid.length)].type = 'shop';
  }
  if (!allNodes.some(n => n.type === 'rest')) {
    const late = allNodes.filter(n => n.row >= totalRows - 3 && n.row < totalRows - 1);
    if (late.length) late[Math.floor(Math.random() * late.length)].type = 'rest';
  }
  // 重新分配 enemyId（类型可能被覆盖）
  for (const n of allNodes) {
    if (n.type === 'battle') n.enemyId = n.enemyId || pick(cfg.normalEnemies);
    if (n.type === 'elite') n.enemyId = pick(cfg.eliteEnemies);
  }

  // 建立连线
  for (let r = 0; r < totalRows - 1; r++) {
    const cur = rows[r];
    const next = rows[r + 1];
    const norm = (node, row) => row.length <= 1 ? 0.5 : node.col / (row.length - 1);

    for (const node of cur) {
      const sorted = [...next].sort((a, b) => Math.abs(norm(a, next) - norm(node, cur)) - Math.abs(norm(b, next) - norm(node, cur)));
      const count = next.length === 1 ? 1 : (Math.random() < 0.45 ? 2 : 1);
      for (let i = 0; i < Math.min(count, sorted.length); i++) {
        if (!node.connections.includes(sorted[i].id)) node.connections.push(sorted[i].id);
      }
    }
    // 每个下层节点至少一条入边
    for (const target of next) {
      if (cur.some(n => n.connections.includes(target.id))) continue;
      const closest = [...cur].sort((a, b) => Math.abs(norm(a, cur) - norm(target, next)) - Math.abs(norm(b, cur) - norm(target, next)))[0];
      if (closest) closest.connections.push(target.id);
    }
  }
  // 填充 incoming
  for (let r = 0; r < totalRows - 1; r++) {
    for (const node of rows[r]) {
      for (const cid of node.connections) {
        const t = rows[r + 1].find(n => n.id === cid);
        if (t) t.incoming.push(node.id);
      }
    }
  }

  // 起始节点可用
  for (const n of rows[0]) n.available = true;

  state.map = {
    floorIndex,
    floorName: cfg.name,
    floorEmoji: cfg.emoji,
    theme: cfg.theme,
    rows,
    totalRows,
    currentNodeId: null,
    bossId: cfg.boss,
    path: [],
    width: MAP_WIDTH,
    height: TOP_PAD * 2 + (totalRows - 1) * ROW_GAP + 34,
  };
}

export function getNodeById(id) {
  if (!state.map) return null;
  for (const row of state.map.rows) {
    for (const node of row) if (node.id === id) return node;
  }
  return null;
}

export function getAvailableNodes() {
  if (!state.map) return [];
  return state.map.rows.flat().filter(n => n.available && !n.visited);
}

export function getEdgeKey(a, b) { return a + '>' + b; }

/** 记录走过的边，用于高亮已探索路径 */
export function getTraversedEdges() {
  if (!state.map) return [];
  return state.map.path.slice(1).map((id, i) => [state.map.path[i], id]);
}

export function selectNode(nodeId) {
  const node = getNodeById(nodeId);
  if (!node || !node.available || node.visited) return null;

  node.visited = true;
  node.available = false;
  node.next = false;
  state.map.currentNodeId = nodeId;
  state.map.path.push(nodeId);

  // 同层其它节点不可选
  for (const n of state.map.rows[node.row]) {
    if (n.id !== nodeId) n.available = false;
  }
  // 下一层可前往节点
  for (const connId of node.connections) {
    const target = getNodeById(connId);
    if (target && !target.visited) { target.available = true; target.next = true; }
  }
  return node;
}

export function getNodeEmoji(type) { return (NODE_META[type] || {}).icon || '•'; }
export function getNodeLabel(type) { return (NODE_META[type] || {}).label || ''; }
export function getNodeColor(type) { return (NODE_META[type] || {}).color || '#888'; }

export function isFloorComplete() {
  if (!state.map) return false;
  const bossRow = state.map.rows[state.map.rows.length - 1];
  return bossRow[0].visited;
}

export function hasMoreFloors() {
  return state.currentFloor < FLOOR_CONFIG.length - 1;
}

/** 计算地图节点的像素坐标 */
export function computeGeometry(map) {
  const width = MAP_WIDTH;
  const pos = new Map();
  map.rows.forEach((row, r) => {
    const n = row.length;
    const gap = Math.min(170, (width - 200) / Math.max(1, n - 1));
    const y = TOP_PAD + (map.totalRows - 1 - r) * ROW_GAP;
    row.forEach((node, i) => {
      const x = width / 2 + (i - (n - 1) / 2) * gap;
      pos.set(node.id, { x, y });
    });
  });
  return { width, height: map.height, pos };
}