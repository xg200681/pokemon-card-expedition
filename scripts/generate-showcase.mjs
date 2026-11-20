// Generate the SVG sources for the README illustrations using existing game art.
// Run: node scripts/generate-showcase.mjs
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const source = await readFile(new URL('js/art/starters.js', root), 'utf8');
const { ART_STARTERS } = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
const font = 'Microsoft YaHei, Noto Sans CJK SC, sans-serif';
const wrap = (height, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="${height}" viewBox="0 0 1440 ${height}"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#111a34"/><stop offset="1" stop-color="#202741"/></linearGradient></defs><rect width="1440" height="${height}" rx="28" fill="url(#bg)"/><g font-family="${font}" fill="#eef2ff">${body}</g></svg>`;
const text = (x, y, size, value, color = '#eef2ff') => `<text x="${x}" y="${y}" font-size="${size}" fill="${color}">${value}</text>`;
const names = ['小火龙', '杰尼龟', '妙蛙种子'];
const ids = ['charmander', 'squirtle', 'bulbasaur'];
const colors = ['#ff9466', '#72c8f9', '#98dca5'];
const roles = ['灼伤 · 爆发', '格挡 · 防御', '状态 · 消耗'];
let hero = text(80, 70, 19, 'POKÉMON • CARD EXPEDITION', '#a6b8db');
hero += text(80, 142, 58, '宝可梦 · 卡牌远征');
hero += text(80, 190, 24, '选择伙伴，构筑牌组，在分支路线中挑战三层首领。', '#bac9e7');
ids.forEach((id, i) => {
  const x = 80 + i * 435;
  hero += `<rect x="${x}" y="240" width="410" height="410" rx="24" fill="#ffffff" fill-opacity="0.035" stroke="${colors[i]}" stroke-opacity="0.5"/>`;
  hero += `<svg x="${x + 50}" y="250" width="310" height="285" viewBox="0 0 200 200">${ART_STARTERS[id]('hero' + i)}</svg>`;
  hero += text(x + 40, 579, 32, names[i], colors[i]) + text(x + 40, 622, 22, roles[i], '#bdcce3');
});
hero += text(80, 710, 21, '原生前端 / SVG 立绘 / Canvas 特效 / WebAudio 音效', '#bac9e7');
hero += text(80, 753, 16, '非官方同人学习项目 · 游戏内立绘展示海报，非实机截图', '#8296bb');
const steps = [
  ['01', '选择伙伴', '了解初始牌组', '确定战斗风格'],
  ['02', '规划路线', '战斗 / 事件 / 商店', '精英 / 休息点'],
  ['03', '回合战斗', '观察敌人意图', '分配能量与格挡'],
  ['04', '构筑成长', '选牌 / 遗物 / 强化', '形成组合与策略'],
  ['05', '挑战首领', '逐层推进', '完成三层远征'],
];
let flow = text(65, 75, 40, '一次远征，五步展开');
flow += text(65, 119, 22, '每次选择，都在塑造你的下一场战斗。', '#bac9e7');
steps.forEach((s, i) => {
  const x = 65 + i * 270;
  flow += `<rect x="${x}" y="175" width="230" height="235" rx="20" fill="#ffffff" fill-opacity="0.04" stroke="#53658e"/>`;
  flow += text(x + 24, 220, 26, s[0], '#edcb77');
  flow += text(x + 24, 275, 28, s[1]);
  flow += text(x + 24, 330, 19, s[2], '#bac9e7');
  flow += text(x + 24, 365, 19, s[3], '#bac9e7');
  if (i < 4) flow += `<path d="M${x + 238} 287 h24 m-8 -8 8 8 -8 8" stroke="#edcb77" stroke-width="3" fill="none"/>`;
});
flow += text(65, 467, 19, '玩法流程示意图 · 战斗中结合属性克制、卡牌关键字与状态效果', '#8296bb');
await mkdir(new URL('docs/images/', root), { recursive: true });
await writeFile(new URL('docs/images/hero.svg', root), wrap(800, hero));
await writeFile(new URL('docs/images/gameplay.svg', root), wrap(515, flow));
console.log('Generated hero.svg and gameplay.svg');
