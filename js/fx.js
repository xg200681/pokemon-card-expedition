// ============================================================
// 战斗特效引擎 — Canvas 粒子 / 斩击 / 元素弹道 / 音效
// ============================================================
import { TYPE_INFO } from './data.js';

let canvas, ctx;
let W = 0, H = 0, DPR = 1;
let rafId = null;
let lastTime = 0;
let particles = [];
let rings = [];
let slashes = [];
let floaters = [];
let beams = [];
let projectiles = [];
let flashes = [];
const MAX_PARTICLES = 900;

const ELEMENT_STYLE = {
  fire:     { core: '#fff3c4', main: '#ff7a18', alt: '#ffd54f', shape: 'spark' },
  water:    { core: '#e3f7ff', main: '#2f9bff', alt: '#7fd6ff', shape: 'circle' },
  grass:    { core: '#eaffd8', main: '#4caf50', alt: '#a5e86b', shape: 'leaf' },
  electric: { core: '#fffde7', main: '#ffd600', alt: '#a0e9ff', shape: 'spark' },
  ice:      { core: '#eaffff', main: '#6ee7f5', alt: '#b4f4ff', shape: 'shard' },
  fighting: { core: '#ffe6d5', main: '#ff7043', alt: '#ffb59b', shape: 'spark' },
  psychic:  { core: '#fbe4ff', main: '#d46bff', alt: '#8e7dff', shape: 'circle' },
  dark:     { core: '#e3dcff', main: '#7c5cff', alt: '#3b2f66', shape: 'smoke' },
  dragon:   { core: '#efe6ff', main: '#9f7bff', alt: '#6a4bff', shape: 'spark' },
  normal:   { core: '#ffffff', main: '#cfd8dc', alt: '#90a4ae', shape: 'spark' },
  poison:   { core: '#f3e5ff', main: '#b45cff', alt: '#7d3fbf', shape: 'bubble' },
};

// ---------- 音效 ----------
let audioCtx = null;
let muted = false;
try { muted = localStorage.getItem('pkmn_fx_muted') === '1'; } catch (e) { /* ignore */ }

export function unlockAudio() {
  if (audioCtx) return;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) audioCtx = new AC();
  } catch (e) { audioCtx = null; }
}

export function setMuted(v) {
  muted = v;
  try { localStorage.setItem('pkmn_fx_muted', v ? '1' : '0'); } catch (e) { /* ignore */ }
  const btn = document.getElementById('btn-sound');
  if (btn) btn.textContent = muted ? '🔇' : '🔊';
}

export function isMuted() { return muted; }

function ac() {
  if (!audioCtx) unlockAudio();
  return audioCtx;
}

function tone({ freq = 440, to = null, dur = 0.16, type = 'sine', gain = 0.12, delay = 0 }) {
  if (muted) return;
  const c = ac(); if (!c) return;
  try {
    const t0 = c.currentTime + delay;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (to) osc.frequency.exponentialRampToValueAtTime(Math.max(30, to), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(c.destination);
    osc.start(t0); osc.stop(t0 + dur + 0.02);
  } catch (e) { /* ignore */ }
}

function noise({ dur = 0.18, gain = 0.12, freq = 1200, q = 1, delay = 0, slideTo = null, type = 'bandpass' }) {
  if (muted) return;
  const c = ac(); if (!c) return;
  try {
    const t0 = c.currentTime + delay;
    const len = Math.floor(c.sampleRate * dur);
    const buf = c.createBuffer(1, Math.max(1, len), c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = c.createBufferSource();
    src.buffer = buf;
    const filter = c.createBiquadFilter();
    filter.type = type;
    filter.frequency.setValueAtTime(freq, t0);
    if (slideTo) filter.frequency.exponentialRampToValueAtTime(Math.max(60, slideTo), t0 + dur);
    filter.Q.value = q;
    const g = c.createGain();
    g.gain.setValueAtTime(gain, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(filter).connect(g).connect(c.destination);
    src.start(t0); src.stop(t0 + dur + 0.02);
  } catch (e) { /* ignore */ }
}

export const SFX = {
  click: () => tone({ freq: 620, to: 900, dur: 0.07, type: 'triangle', gain: 0.06 }),
  card: () => { noise({ dur: 0.12, gain: 0.05, freq: 2600, slideTo: 700 }); tone({ freq: 520, to: 760, dur: 0.1, type: 'triangle', gain: 0.05 }); },
  hit: (element = 'normal') => {
    noise({ dur: 0.16, gain: 0.16, freq: 2400, slideTo: 380, q: 0.8 });
    tone({ freq: 150, to: 62, dur: 0.18, type: 'sine', gain: 0.16 });
    const map = { fire: [220, 110], water: [520, 300], grass: [660, 420], electric: [1200, 500], ice: [880, 640], fighting: [110, 55], psychic: [700, 1100], dark: [200, 90], dragon: [400, 180], poison: [330, 220], normal: [300, 160] };
    const [f, t] = map[element] || map.normal;
    tone({ freq: f, to: t, dur: 0.2, type: 'sawtooth', gain: 0.05, delay: 0.01 });
  },
  block: () => { tone({ freq: 980, to: 1320, dur: 0.12, type: 'triangle', gain: 0.07 }); noise({ dur: 0.08, gain: 0.05, freq: 5000, type: 'highpass' }); },
  heal: () => { [523, 659, 784, 1046].forEach((f, i) => tone({ freq: f, dur: 0.16, type: 'sine', gain: 0.06, delay: i * 0.06 })); },
  buff: () => { [392, 523, 659].forEach((f, i) => tone({ freq: f, dur: 0.18, type: 'triangle', gain: 0.05, delay: i * 0.05 })); },
  debuff: () => { [440, 330, 240].forEach((f, i) => tone({ freq: f, dur: 0.16, type: 'sawtooth', gain: 0.04, delay: i * 0.05 })); },
  hurt: () => { noise({ dur: 0.22, gain: 0.18, freq: 900, slideTo: 200 }); tone({ freq: 120, to: 60, dur: 0.24, type: 'square', gain: 0.09 }); },
  death: () => { [330, 262, 196, 130].forEach((f, i) => tone({ freq: f, to: f * 0.7, dur: 0.3, type: 'sine', gain: 0.08, delay: i * 0.1 })); },
  victory: () => { [523, 659, 784, 1046, 1318].forEach((f, i) => tone({ freq: f, dur: 0.28, type: 'triangle', gain: 0.07, delay: i * 0.11 })); },
  error: () => tone({ freq: 180, to: 120, dur: 0.18, type: 'square', gain: 0.05 }),
};

// ---------- 初始化 ----------
export function initFX() {
  if (canvas) return;
  canvas = document.createElement('canvas');
  canvas.id = 'fx-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position: 'fixed', inset: '0', width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: '60',
  });
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
  resize();
  window.addEventListener('resize', resize);
  lastTime = performance.now();
  rafId = requestAnimationFrame(loop);
}

function resize() {
  if (!canvas) return;
  DPR = Math.min(2, window.devicePixelRatio || 1);
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = Math.floor(W * DPR);
  canvas.height = Math.floor(H * DPR);
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}

function anchor(el) {
  if (!el) return { x: W / 2, y: H / 2, w: 120, h: 120 };
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height, top: r.top, bottom: r.bottom, left: r.left, right: r.right };
}

function getAnchors() {
  const playerEl = document.getElementById('player-art');
  const enemyEl = document.getElementById('enemy-art');
  const p = anchor(playerEl);
  const e = anchor(enemyEl);
  // 立绘视觉中心略偏上
  return { player: { ...p, y: p.y - p.h * 0.06 }, enemy: { ...e, y: e.y - e.h * 0.06 } };
}

// ---------- 绘制原语 ----------
function spawnParticle(p) {
  if (particles.length >= MAX_PARTICLES) particles.shift();
  particles.push({ vx: 0, vy: 0, gravity: 0, drag: 0.98, size: 4, color: '#fff', shape: 'circle', rot: 0, vr: 0, glow: 0, ...p, life: p.life ?? 0.6, maxLife: p.life ?? 0.6 });
}

function burst(style, x, y, opts = {}) {
  const s = ELEMENT_STYLE[style] || ELEMENT_STYLE.normal;
  const count = opts.count || 26;
  const power = opts.power || 1;
  for (let i = 0; i < count; i++) {
    const ang = Math.random() * Math.PI * 2;
    const spd = (1.2 + Math.random() * 4.2) * power;
    const colors = [s.main, s.alt, s.core];
    spawnParticle({
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
      vx: Math.cos(ang) * spd,
      vy: Math.sin(ang) * spd - 1.2,
      gravity: 0.09,
      size: 2 + Math.random() * 6 * power,
      color: colors[(Math.random() * colors.length) | 0],
      shape: s.shape === 'leaf' ? 'leaf' : s.shape === 'shard' ? 'shard' : s.shape === 'smoke' ? 'smoke' : s.shape === 'bubble' ? 'bubble' : 'spark',
      life: 0.45 + Math.random() * 0.55,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 10,
      glow: style === 'electric' || style === 'fire' ? 16 : 0,
    });
  }
  rings.push({ x, y, r: 8, maxR: (opts.radius || 70) * power, life: 0.35, maxLife: 0.35, color: s.core, width: 3 });
  rings.push({ x, y, r: 4, maxR: (opts.radius || 95) * power, life: 0.5, maxLife: 0.5, color: s.main, width: 2 });
  flashes.push({ color: s.main, alpha: opts.flash ?? 0.16, life: 0.22, maxLife: 0.22 });
}

function castBeam(style, from, to) {
  const s = ELEMENT_STYLE[style] || ELEMENT_STYLE.normal;
  const beats = [];
  const steps = 8;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const jitter = i === 0 || i === steps ? 0 : (Math.random() - 0.5) * 26;
    beats.push({
      x: from.x + (to.x - from.x) * t + jitter,
      y: from.y + (to.y - from.y) * t + (Math.random() - 0.5) * 18,
    });
  }
  beams.push({ points: beats, life: 0.24, maxLife: 0.24, color: s.main, core: s.core, width: 9, style });
  projectiles.push({
    x1: from.x, y1: from.y, x2: to.x, y2: to.y,
    t: 0, dur: 0.2, color: s.main, core: s.core, style,
    size: style === 'fire' ? 16 : 12,
  });
  // 沿途粒子
  for (let i = 1; i < steps; i++) {
    const p = beats[i];
    spawnParticle({ x: p.x, y: p.y, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2, size: 2 + Math.random() * 4, color: s.alt, shape: 'circle', life: 0.35, glow: 10 });
  }
  // 出手端爆发
  for (let i = 0; i < 12; i++) {
    spawnParticle({
      x: from.x + (Math.random() - 0.5) * 24, y: from.y + (Math.random() - 0.5) * 24,
      vx: (to.x - from.x) * 0.004 + (Math.random() - 0.5) * 2,
      vy: (to.y - from.y) * 0.004 + (Math.random() - 0.5) * 2,
      size: 2 + Math.random() * 4, color: s.core, shape: 'spark', life: 0.3, glow: 12,
    });
  }
  // 命中爆发（弹道抵达后）
  setTimeout(() => {
    burst(style, to.x, to.y, { count: 24, power: 1.1, radius: 76, flash: 0.1 });
  }, 190);
}

function slash(x, y, opts = {}) {
  const count = opts.count || 2;
  for (let i = 0; i < count; i++) {
    slashes.push({
      x, y,
      angle: (opts.angle ?? -0.6) + (Math.random() - 0.5) * 0.7 + i * 0.9,
      len: (opts.len || 130) + Math.random() * 40,
      life: 0.22, maxLife: 0.22,
      width: 3 + Math.random() * 3,
      color: opts.color || '#fff',
      offsetY: (i - (count - 1) / 2) * 16,
    });
  }
}

function floater(x, y, text, opts = {}) {
  floaters.push({
    x, y, text, life: opts.life || 0.95, maxLife: opts.life || 0.95,
    color: opts.color || '#fff', size: opts.size || 34,
    vy: opts.vy || -1.5, vx: opts.vx || 0, weight: opts.weight || '800', delay: opts.delay || 0,
  });
}

// ---------- 主循环 ----------
function loop(now) {
  rafId = requestAnimationFrame(loop);
  const dt = Math.min(0.05, (now - lastTime) / 1000 || 0.016);
  lastTime = now;
  ctx.clearRect(0, 0, W, H);
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';

  // 背景闪光
  for (let i = flashes.length - 1; i >= 0; i--) {
    const f = flashes[i];
    f.life -= dt;
    if (f.life <= 0) { flashes.splice(i, 1); continue; }
    ctx.globalAlpha = (f.life / f.maxLife) * f.alpha;
    ctx.fillStyle = f.color;
    ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1;
  }

  // 弹道
  for (let i = beams.length - 1; i >= 0; i--) {
    const b = beams[i];
    b.life -= dt;
    if (b.life <= 0) { beams.splice(i, 1); continue; }
    const a = b.life / b.maxLife;
    ctx.globalAlpha = a;
    ctx.lineCap = 'round';
    ctx.shadowBlur = 20;
    ctx.shadowColor = b.color;
    ctx.strokeStyle = b.color;
    ctx.lineWidth = b.width * a;
    ctx.beginPath();
    b.points.forEach((p, idx) => idx ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
    ctx.stroke();
    ctx.strokeStyle = b.core;
    ctx.lineWidth = Math.max(1, b.width * a * 0.4);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  // 飞行道具
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const p = projectiles[i];
    p.t += dt;
    if (p.t >= p.dur) { projectiles.splice(i, 1); continue; }
    const k = easeOut(p.t / p.dur);
    const x = p.x1 + (p.x2 - p.x1) * k;
    const y = p.y1 + (p.y2 - p.y1) * k + Math.sin(k * Math.PI) * -18;
    ctx.globalAlpha = 0.85;
    const g = ctx.createRadialGradient(x, y, 0, x, y, p.size * 2.6);
    g.addColorStop(0, p.core);
    g.addColorStop(0.45, p.color);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, p.size * 2.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = p.core;
    ctx.beginPath();
    ctx.arc(x, y, p.size * 0.55, 0, Math.PI * 2);
    ctx.fill();
    for (let j = 0; j < 2; j++) {
      spawnParticle({
        x, y, vx: (Math.random() - 0.5) * 1.4, vy: (Math.random() - 0.5) * 1.4,
        size: 2 + Math.random() * 4, color: j ? p.color : p.core, shape: 'spark', life: 0.3, glow: 12,
      });
    }
    ctx.globalAlpha = 1;
  }

  // 斩击
  for (let i = slashes.length - 1; i >= 0; i--) {
    const s = slashes[i];
    s.life -= dt;
    if (s.life <= 0) { slashes.splice(i, 1); continue; }
    const a = s.life / s.maxLife;
    ctx.globalAlpha = a;
    ctx.strokeStyle = s.color;
    ctx.lineWidth = s.width * a;
    ctx.lineCap = 'round';
    ctx.shadowBlur = 18;
    ctx.shadowColor = s.color;
    const dx = Math.cos(s.angle) * s.len / 2;
    const dy = Math.sin(s.angle) * s.len / 2;
    ctx.beginPath();
    ctx.moveTo(s.x - dx, s.y + s.offsetY - dy);
    ctx.quadraticCurveTo(s.x, s.y + s.offsetY, s.x + dx, s.y + s.offsetY + dy);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  // 冲击环
  for (let i = rings.length - 1; i >= 0; i--) {
    const r = rings[i];
    r.life -= dt;
    if (r.life <= 0) { rings.splice(i, 1); continue; }
    const t = 1 - r.life / r.maxLife;
    const radius = r.r + (r.maxR - r.r) * easeOut(t);
    ctx.globalAlpha = (1 - t) * 0.85;
    ctx.strokeStyle = r.color;
    ctx.lineWidth = r.width * (1 - t) + 0.5;
    ctx.shadowBlur = 16;
    ctx.shadowColor = r.color;
    ctx.beginPath();
    ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  // 粒子
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.life -= dt;
    if (p.life <= 0) { particles.splice(i, 1); continue; }
    p.x += p.vx * dt * 60;
    p.y += p.vy * dt * 60;
    p.vy += p.gravity * dt * 60;
    p.vx *= p.drag;
    p.vy *= p.drag;
    p.rot += p.vr * dt;
    const a = Math.min(1, p.life / p.maxLife * 1.6);
    ctx.globalAlpha = a;
    ctx.fillStyle = p.color;
    if (p.glow) { ctx.shadowBlur = p.glow; ctx.shadowColor = p.color; }
    drawParticle(p);
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  ctx.globalCompositeOperation = 'source-over';

  // 伤害数字
  for (let i = floaters.length - 1; i >= 0; i--) {
    const f = floaters[i];
    if (f.delay > 0) { f.delay -= dt; continue; }
    f.life -= dt;
    if (f.life <= 0) { floaters.splice(i, 1); continue; }
    f.y += f.vy * dt * 60;
    f.x += f.vx * dt * 60;
    f.vy *= 0.985;
    const t = 1 - f.life / f.maxLife;
    const scale = t < 0.18 ? 0.6 + (t / 0.18) * 0.6 : 1.1 - (t - 0.18) * 0.16;
    ctx.globalAlpha = t > 0.72 ? (1 - t) / 0.28 : 1;
    ctx.font = `900 ${Math.round(f.size * scale)}px "Segoe UI", "Microsoft YaHei", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'rgba(8,4,16,0.9)';
    ctx.strokeText(f.text, f.x, f.y);
    ctx.fillStyle = f.color;
    ctx.shadowBlur = 16;
    ctx.shadowColor = f.color;
    ctx.fillText(f.text, f.x, f.y);
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

function drawParticle(p) {
  const s = p.size;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);
  switch (p.shape) {
    case 'leaf':
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 1.5, s * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'shard':
      ctx.beginPath();
      ctx.moveTo(0, -s * 1.8);
      ctx.lineTo(s * 0.8, 0);
      ctx.lineTo(0, s * 1.5);
      ctx.lineTo(-s * 0.8, 0);
      ctx.closePath();
      ctx.fill();
      break;
    case 'smoke':
      ctx.globalAlpha *= 0.4;
      ctx.beginPath();
      ctx.arc(0, 0, s * 1.7, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'bubble':
      ctx.beginPath();
      ctx.arc(0, 0, s * 1.2, 0, Math.PI * 2);
      ctx.globalAlpha *= 0.6;
      ctx.fill();
      ctx.globalAlpha = Math.min(1, ctx.globalAlpha * 2.4);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1;
      ctx.stroke();
      break;
    case 'spark':
      ctx.beginPath();
      ctx.moveTo(0, -s * 3);
      ctx.lineTo(s * 0.9, 0);
      ctx.lineTo(0, s * 2.2);
      ctx.lineTo(-s * 0.7, 0);
      ctx.closePath();
      ctx.fill();
      break;
    default:
      ctx.beginPath();
      ctx.arc(0, 0, s, 0, Math.PI * 2);
      ctx.fill();
  }
  ctx.restore();
}

function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

function shakeEl(el, cls = 'hit-shake') {
  if (!el) return;
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), 480);
}

// ---------- 对外：播放战斗事件 ----------
export function playFxList(entries) {
  if (!entries || !entries.length) return;
  const { player, enemy } = getAnchors();
  let delay = 0;

  for (const ev of entries) {
    schedule(() => handleFx(ev, player, enemy), delay);
    if (ev.kind === 'card') delay += 70;
    else if (ev.kind === 'enemyHit' && ev.hit > 1) delay += 90;
    else if (ev.kind === 'turnStart' || ev.kind === 'enemyTurn') delay += 0;
    else delay += 60;
  }
}

function schedule(fn, delay) {
  if (delay <= 0) { fn(); return; }
  setTimeout(fn, delay);
}

function handleFx(ev, player, enemy) {
  switch (ev.kind) {
    case 'card': {
      playCardVisual(ev, player, enemy);
      break;
    }
    case 'enemyHit': {
      const s = ELEMENT_STYLE[ev.element] || ELEMENT_STYLE.normal;
      const x = enemy.x, y = enemy.y;
      if (ev.dot) {
        burst(ev.element, x, y, { count: 12, power: 0.7, radius: 46, flash: 0.05 });
        floater(x + (Math.random() - 0.5) * 60, y - 30, `-${ev.damage}`, { color: s.main, size: 26 });
      } else {
        slash(x, y, { color: s.core, count: ev.hits > 1 ? 1 : 2, angle: -0.7 });
        burst(ev.element, x, y, { count: 30, power: ev.damage > 18 ? 1.35 : 1, radius: 80 });
        floater(x + (Math.random() - 0.5) * 56, y - 24, `-${ev.damage}`, {
          color: ev.strong ? '#ffe082' : '#fff', size: ev.damage >= 20 ? 46 : 36,
          delay: 0.02,
        });
        if (ev.strong) floater(x, y + 40, '效果拔群!', { color: '#ffca28', size: 20, vy: -1.1, life: 0.8, delay: 0.12 });
        if (ev.weak) floater(x, y + 40, '效果不好…', { color: '#90a4ae', size: 18, vy: -1, life: 0.8, delay: 0.12 });
        shakeEl(document.getElementById('enemy-art'), 'hit-shake');
        SFX.hit(ev.element);
      }
      break;
    }
    case 'enemyBlocked': {
      burst('ice', enemy.x, enemy.y, { count: 10, power: 0.5, radius: 40, flash: 0.03 });
      floater(enemy.x + 40, enemy.y - 60, `格挡 ${ev.amount}`, { color: '#7fd6ff', size: 20 });
      break;
    }
    case 'enemyBlock': {
      rings.push({ x: enemy.x, y: enemy.y, r: 20, maxR: 90, life: 0.4, maxLife: 0.4, color: '#7fd6ff', width: 4 });
      burst('ice', enemy.x, enemy.y, { count: 14, power: 0.6, radius: 55, flash: 0.04 });
      floater(enemy.x, enemy.y - 80, `护甲 +${ev.amount}`, { color: '#7fd6ff', size: 22 });
      SFX.block();
      break;
    }
    case 'enemyHeal': {
      burst('grass', enemy.x, enemy.y, { count: 16, power: 0.6, radius: 50, flash: 0.03 });
      floater(enemy.x, enemy.y - 70, `+${ev.amount}`, { color: '#7dff9b', size: 24 });
      SFX.heal();
      break;
    }
    case 'enemyBuff': {
      rings.push({ x: enemy.x, y: enemy.y + 20, r: 10, maxR: 100, life: 0.45, maxLife: 0.45, color: '#ffca28', width: 3 });
      floater(enemy.x, enemy.y - 80, `💪 ${ev.text}`, { color: '#ffca28', size: 20 });
      SFX.buff();
      break;
    }
    case 'playerHit': {
      const color = ev.self ? '#ffab91' : ev.poisonTick ? '#c58cff' : ev.burnTick ? '#ff8a50' : '#ff5252';
      floater(player.x + (Math.random() - 0.5) * 40, player.y - 40, `-${ev.damage}`, { color, size: ev.damage >= 15 ? 40 : 32 });
      burst(ev.poisonTick ? 'poison' : ev.burnTick ? 'fire' : 'fighting', player.x, player.y, { count: 18, power: 0.8, radius: 60, flash: 0.06 });
      shakeEl(document.getElementById('player-art'), 'hit-shake');
      if (ev.hits > 1) {
        // 多段时轻一点
      }
      SFX.hurt();
      break;
    }
    case 'playerDebuff': {
      floater(player.x, player.y - 80, `⬇️ ${ev.text}`, { color: '#c58cff', size: 20 });
      burst('dark', player.x, player.y, { count: 14, power: 0.6, radius: 45 });
      SFX.debuff();
      break;
    }
    case 'block': {
      rings.push({ x: player.x, y: player.y - 10, r: 14, maxR: 105, life: 0.45, maxLife: 0.45, color: '#7fd6ff', width: 4 });
      rings.push({ x: player.x, y: player.y - 10, r: 40, maxR: 78, life: 0.55, maxLife: 0.55, color: '#e3f7ff', width: 2 });
      burst('water', player.x, player.y, { count: 18, power: 0.7, radius: 60, flash: 0.04 });
      floater(player.x, player.y - 90, `🛡️ +${ev.amount}`, { color: '#8fe3ff', size: 24 });
      SFX.block();
      break;
    }
    case 'heal': {
      burst('grass', player.x, player.y, { count: 22, power: 0.8, radius: 70, flash: 0.03 });
      floater(player.x, player.y - 60, `+${ev.amount}`, { color: '#7dff9b', size: 30 });
      SFX.heal();
      break;
    }
    case 'buff': {
      rings.push({ x: player.x, y: player.y + 10, r: 12, maxR: 110, life: 0.5, maxLife: 0.5, color: '#ffca28', width: 3 });
      burst('electric', player.x, player.y, { count: 16, power: 0.7, radius: 55, flash: 0.05 });
      floater(player.x, player.y - 95, `✦ ${ev.text}`, { color: '#ffd54f', size: 20 });
      SFX.buff();
      break;
    }
    case 'debuff': {
      burst('poison', enemy.x, enemy.y, { count: 18, power: 0.7, radius: 55 });
      floater(enemy.x, enemy.y, `☠ ${ev.text}`, { color: '#d8a5ff', size: 20, delay: 0.05 });
      SFX.debuff();
      break;
    }
    case 'draw': {
      floater(player.x + 90, player.y + 20, `抽 ${ev.amount} 张`, { color: '#8fe3ff', size: 18, vy: -1 });
      break;
    }
    case 'energy': {
      floater(player.x - 80, player.y, `+${ev.amount} 能量`, { color: '#ffd54f', size: 20 });
      break;
    }
    case 'enemyDeath': {
      burst('dark', enemy.x, enemy.y, { count: 46, power: 1.5, radius: 130, flash: 0.1 });
      rings.push({ x: enemy.x, y: enemy.y, r: 20, maxR: 220, life: 0.9, maxLife: 0.9, color: '#fff', width: 5 });
      floater(enemy.x, enemy.y, '击破！', { color: '#ffe082', size: 40, life: 1.2 });
      const el = document.getElementById('enemy-art');
      if (el) el.classList.add('death-fade');
      SFX.death();
      break;
    }
    case 'playerDeath': {
      const el = document.getElementById('player-art');
      if (el) el.classList.add('death-fade');
      SFX.death();
      break;
    }
    case 'thorns': {
      burst('grass', enemy.x, enemy.y, { count: 12, power: 0.6, radius: 40 });
      floater(enemy.x, enemy.y - 30, `荆棘 -${ev.amount}`, { color: '#a5e86b', size: 18 });
      break;
    }
    case 'battleStart': {
      if (ev.boss) {
        const banner = document.createElement('div');
        banner.className = 'boss-intro-banner';
        banner.textContent = ev.text || '';
        document.body.appendChild(banner);
        setTimeout(() => banner.remove(), 2400);
      }
      break;
    }
    case 'bossIntro': {
      // 与 battleStart 共用
      break;
    }
    case 'turnStart': {
      showTurnBanner(`第 ${ev.turn} 回合 · 你的回合`, 'player');
      break;
    }
    case 'enemyTurn': {
      showTurnBanner('敌方回合', 'enemy');
      break;
    }
    case 'enemyIntent': break;
    case 'turnEnd': break;
  }
}

function playCardVisual(ev, player, enemy) {
  const s = ELEMENT_STYLE[ev.element] || ELEMENT_STYLE.normal;
  SFX.card();
  // 卡牌残影
  const rect = ev.rect;
  if (rect) {
    const cardEl = document.createElement('div');
    cardEl.className = 'fx-flying-card';
    cardEl.style.left = rect.left + 'px';
    cardEl.style.top = rect.top + 'px';
    cardEl.style.width = rect.width + 'px';
    cardEl.style.height = rect.height + 'px';
    cardEl.style.setProperty('--fly-x', (enemy.x - rect.left - rect.width / 2) + 'px');
    cardEl.style.setProperty('--fly-y', (enemy.y - rect.top - rect.height / 2) + 'px');
    cardEl.style.borderColor = s.main;
    cardEl.style.color = s.core;
    cardEl.style.boxShadow = `0 0 28px ${s.main}`;
    cardEl.textContent = ev.card && ev.card.emoji ? ev.card.emoji : '';
    document.body.appendChild(cardEl);
    setTimeout(() => cardEl.remove(), 520);
  }
  // 出手爆发
  burst(ev.element, player.x + 20, player.y - 10, { count: 12, power: 0.8, radius: 50, flash: 0.03 });
  if (ev.type === 'attack' || ev.type === 'skill') {
    castBeam(ev.element, { x: player.x + 30, y: player.y - 30 }, { x: enemy.x, y: enemy.y - 20 });
  } else {
    rings.push({ x: player.x, y: player.y, r: 20, maxR: 150, life: 0.7, maxLife: 0.7, color: s.main, width: 4 });
  }
}

export function showTurnBanner(text, side = 'player') {
  let banner = document.getElementById('turn-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'turn-banner';
    document.body.appendChild(banner);
  }
  banner.className = 'turn-banner ' + side;
  banner.textContent = text;
  banner.classList.remove('show');
  void banner.offsetWidth;
  banner.classList.add('show');
  clearTimeout(banner._timer);
  banner._timer = setTimeout(() => banner.classList.remove('show'), 1100);
}

// 供 UI 调用：手牌被点击时记录位置
export function setCardOrigin(el) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  pendingCardRect = { left: r.left, top: r.top, width: r.width, height: r.height };
}
let pendingCardRect = null;
export function consumeCardOrigin() {
  const r = pendingCardRect;
  pendingCardRect = null;
  return r;
}