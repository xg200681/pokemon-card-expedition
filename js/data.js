// ============================================================
// 宝可梦 Roguelike 卡牌游戏 — 数据层
// ============================================================

// ---------- 属性 ----------
export const TYPE_INFO = {
  fire:     { name: '火',   icon: '🔥', color: '#ff7043' },
  water:    { name: '水',   icon: '💧', color: '#42a5f5' },
  grass:    { name: '草',   icon: '🌿', color: '#66bb6a' },
  electric: { name: '电',   icon: '⚡', color: '#ffd54f' },
  ice:      { name: '冰',   icon: '❄️', color: '#4dd0e1' },
  fighting: { name: '格斗', icon: '🥊', color: '#ff8a65' },
  psychic:  { name: '超能', icon: '🔮', color: '#ba68c8' },
  dark:     { name: '恶',   icon: '🌑', color: '#7986cb' },
  dragon:   { name: '龙',   icon: '🐉', color: '#9575cd' },
  normal:   { name: '一般', icon: '⭐', color: '#b0bec5' },
  poison:   { name: '毒',   icon: '☠️', color: '#ab47bc' },
};

export const TYPE_CHART = {
  fire:     { strong: ['grass', 'ice'],    weak: ['water'] },
  water:    { strong: ['fire'],            weak: ['grass', 'electric'] },
  grass:    { strong: ['water'],           weak: ['fire', 'ice'] },
  electric: { strong: ['water'],           weak: [] },
  ice:      { strong: ['grass', 'dragon'], weak: ['fire', 'fighting'] },
  fighting: { strong: ['normal', 'ice'],   weak: ['psychic'] },
  psychic:  { strong: ['fighting'],        weak: ['dark'] },
  dark:     { strong: ['psychic'],         weak: ['fighting'] },
  dragon:   { strong: [],                  weak: ['ice', 'dragon'] },
  normal:   { strong: [],                  weak: ['fighting'] },
  poison:   { strong: ['grass'],           weak: ['psychic'] },
};

export function getTypeMultiplier(attackElement, defenderElement) {
  const info = TYPE_CHART[attackElement];
  if (!info) return 1;
  if (info.strong.includes(defenderElement)) return 1.5;
  if (info.weak && info.weak.includes(defenderElement)) return 0.75;
  return 1;
}

// ---------- 关键字 ----------
export const KEYWORDS = {
  exhaust:  { name: '消耗',  desc: '打出后移出本场战斗。' },
  retain:   { name: '保留',  desc: '回合结束时不会被弃掉。' },
  ethereal: { name: '虚无',  desc: '回合结束时若仍在手牌中，则被消耗。' },
  innate:   { name: '固有',  desc: '战斗开始时必定出现在起始手牌中。' },
  multi:    { name: '多段',  desc: '连续命中多次，每段独立结算护甲与增伤。' },
  xcost:    { name: 'X费',   desc: '消耗你当前所有能量，效果随能量提升。' },
};

// ---------- 初始宝可梦 ----------
export const STARTERS = [
  {
    id: 'charmander', name: '小火龙', emoji: '🔥', art: 'charmander',
    element: 'fire', hp: 72, maxHp: 72,
    title: '猛火之心',
    description: '攻击型。火系卡牌伤害更高，擅长灼伤与爆发。',
    passives: ['攻击卡较多', '擅长灼伤'],
    starterCards: ['tackle','tackle','tackle','tackle','ember','ember','curl','curl','curl','fire_fang']
  },
  {
    id: 'squirtle', name: '杰尼龟', emoji: '💧', art: 'squirtle',
    element: 'water', hp: 84, maxHp: 84,
    title: '坚壳壁垒',
    description: '防御型。初始HP更高，拥有大量护甲与回复。',
    passives: ['护甲卡较多', '续航能力强'],
    starterCards: ['tackle','tackle','tackle','tackle','water_gun','water_gun','curl','curl','curl','withdraw']
  },
  {
    id: 'bulbasaur', name: '妙蛙种子', emoji: '🌿', art: 'bulbasaur',
    element: 'grass', hp: 78, maxHp: 78,
    title: '生生不息',
    description: '平衡型。拥有回复与持续伤害，越战越强。',
    passives: ['回复能力', '中毒与虚弱'],
    starterCards: ['tackle','tackle','tackle','tackle','vine_whip','vine_whip','curl','curl','curl','leech_seed']
  }
];

// ---------- 卡牌数据库 ----------
// 效果字段：
//  damage/hits 伤害；xDamage X费每点能量伤害；block 护甲；heal 回复；draw 抽牌；energy 能量；
//  selfDamage 自伤；discards 弃牌；strength/dexterity/thorns/plated 自身状态；
//  vulnerable/weak/poison/burn 施加给敌人；addCards 生成卡牌到手牌
//  up 为升级时的增量（damage/block 等数值），upCost 为升级后费用
const C = (id, o) => ({ id, ...o });

export const CARDS_DB = {
  // ==== 基础 ====
  tackle: C('tackle', { name: '电光一闪', emoji: '⚡', type: 'attack', element: 'normal', cost: 1, rarity: 'basic',
    effects: { damage: 6 }, up: { damage: 3 } }),
  curl: C('curl', { name: '蜷缩', emoji: '🛡️', type: 'skill', element: 'normal', cost: 1, rarity: 'basic',
    effects: { block: 5 }, up: { block: 3 } }),

  // ==== 火系 ====
  ember: C('ember', { name: '火花', emoji: '🔥', type: 'attack', element: 'fire', cost: 1, rarity: 'common',
    effects: { damage: 7, burn: 1 }, up: { damage: 3, burn: 1 } }),
  fire_fang: C('fire_fang', { name: '火焰牙', emoji: '🦷', type: 'attack', element: 'fire', cost: 1, rarity: 'common',
    effects: { damage: 5, hits: 2, burn: 1 }, up: { damage: 2, burn: 1 }, keywords: ['multi'] }),
  flame_wheel: C('flame_wheel', { name: '火焰轮', emoji: '☄️', type: 'attack', element: 'fire', cost: 1, rarity: 'common',
    effects: { damage: 6, block: 4 }, up: { damage: 3, block: 2 } }),
  flamethrower: C('flamethrower', { name: '喷射火焰', emoji: '🔥', type: 'attack', element: 'fire', cost: 2, rarity: 'uncommon',
    effects: { damage: 13, burn: 2 }, up: { damage: 4, burn: 1 } }),
  fire_spin: C('fire_spin', { name: '火焰旋涡', emoji: '🌀', type: 'attack', element: 'fire', cost: 2, rarity: 'uncommon',
    effects: { damage: 6, hits: 2, burn: 3 }, up: { damage: 2, burn: 2 }, keywords: ['multi'] }),
  fire_blast: C('fire_blast', { name: '大字爆炎', emoji: '💥', type: 'attack', element: 'fire', cost: 3, rarity: 'rare',
    effects: { damage: 24, vulnerable: 2 }, up: { damage: 6, vulnerable: 1 } }),
  overheat: C('overheat', { name: '过热', emoji: '🌋', type: 'attack', element: 'fire', cost: 1, rarity: 'rare',
    effects: { damage: 20, selfDamage: 4 }, up: { damage: 6, selfDamage: -1 }, keywords: ['exhaust'] }),
  blaze_dance: C('blaze_dance', { name: '烈焰之舞', emoji: '🕯️', type: 'power', element: 'fire', cost: 2, rarity: 'rare',
    effects: { strength: 2, thorns: 2 }, up: { strength: 1, thorns: 1 } }),

  // ==== 水系 ====
  water_gun: C('water_gun', { name: '水枪', emoji: '💧', type: 'attack', element: 'water', cost: 1, rarity: 'common',
    effects: { damage: 6, block: 3 }, up: { damage: 3, block: 2 } }),
  bubble: C('bubble', { name: '泡沫', emoji: '🫧', type: 'attack', element: 'water', cost: 1, rarity: 'common',
    effects: { damage: 5, weak: 1 }, up: { damage: 3, weak: 1 } }),
  aqua_jet: C('aqua_jet', { name: '水流喷射', emoji: '🌊', type: 'attack', element: 'water', cost: 0, rarity: 'common',
    effects: { damage: 4 }, up: { damage: 3 }, keywords: ['innate'] }),
  withdraw: C('withdraw', { name: '缩壳', emoji: '🐚', type: 'skill', element: 'water', cost: 1, rarity: 'common',
    effects: { block: 8 }, up: { block: 4 } }),
  aqua_ring: C('aqua_ring', { name: '水流环', emoji: '💫', type: 'skill', element: 'water', cost: 1, rarity: 'uncommon',
    effects: { block: 4, heal: 3 }, up: { block: 2, heal: 2 } }),
  surf: C('surf', { name: '冲浪', emoji: '🏄', type: 'attack', element: 'water', cost: 2, rarity: 'uncommon',
    effects: { damage: 11, block: 6 }, up: { damage: 4, block: 3 } }),
  rain_dance: C('rain_dance', { name: '求雨', emoji: '🌧️', type: 'power', element: 'water', cost: 1, rarity: 'rare',
    effects: { dexterity: 2, draw: 1 }, up: { dexterity: 1, draw: 1 } }),
  hydro_pump: C('hydro_pump', { name: '水炮', emoji: '💦', type: 'attack', element: 'water', cost: 3, rarity: 'rare',
    effects: { damage: 25 }, up: { damage: 7 } }),

  // ==== 草系 ====
  vine_whip: C('vine_whip', { name: '藤鞭', emoji: '🌿', type: 'attack', element: 'grass', cost: 1, rarity: 'common',
    effects: { damage: 7 }, up: { damage: 3 } }),
  leech_seed: C('leech_seed', { name: '寄生种子', emoji: '🌱', type: 'skill', element: 'grass', cost: 1, rarity: 'common',
    effects: { damage: 3, heal: 3 }, up: { damage: 2, heal: 2 } }),
  razor_leaf: C('razor_leaf', { name: '飞叶快刀', emoji: '🍃', type: 'attack', element: 'grass', cost: 2, rarity: 'uncommon',
    effects: { damage: 7, hits: 2 }, up: { damage: 3 }, keywords: ['multi'] }),
  synthesis: C('synthesis', { name: '光合作用', emoji: '🌞', type: 'skill', element: 'grass', cost: 1, rarity: 'uncommon',
    effects: { heal: 7, energy: 1 }, up: { heal: 4 }, keywords: ['exhaust'] }),
  spore: C('spore', { name: '蘑菇孢子', emoji: '🍄', type: 'skill', element: 'grass', cost: 1, rarity: 'uncommon',
    effects: { weak: 2, poison: 2 }, up: { weak: 1, poison: 2 } }),
  growth: C('growth', { name: '生长', emoji: '🌳', type: 'power', element: 'grass', cost: 1, rarity: 'uncommon',
    effects: { strength: 1, plated: 2 }, up: { strength: 1, plated: 2 } }),
  solar_beam: C('solar_beam', { name: '日光束', emoji: '☀️', type: 'attack', element: 'grass', cost: 3, rarity: 'rare',
    effects: { damage: 22, heal: 5 }, up: { damage: 7, heal: 3 } }),

  // ==== 电系 ====
  thunder_shock: C('thunder_shock', { name: '电击', emoji: '⚡', type: 'attack', element: 'electric', cost: 1, rarity: 'common',
    effects: { damage: 6, vulnerable: 1 }, up: { damage: 3, vulnerable: 1 } }),
  thunder_wave: C('thunder_wave', { name: '电磁波', emoji: '🌐', type: 'skill', element: 'electric', cost: 1, rarity: 'common',
    effects: { weak: 1, vulnerable: 1 }, up: { weak: 1, vulnerable: 1 } }),
  volt_switch: C('volt_switch', { name: '伏特替换', emoji: '🔌', type: 'attack', element: 'electric', cost: 1, rarity: 'uncommon',
    effects: { damage: 8, draw: 1 }, up: { damage: 3 } }),
  charge: C('charge', { name: '充电', emoji: '🔋', type: 'skill', element: 'electric', cost: 0, rarity: 'uncommon',
    effects: { energy: 2, draw: 1 }, up: { draw: 1 }, keywords: ['exhaust'] }),
  thunderbolt: C('thunderbolt', { name: '十万伏特', emoji: '⚡', type: 'attack', element: 'electric', cost: 2, rarity: 'uncommon',
    effects: { damage: 15 }, up: { damage: 5 } }),
  thunder: C('thunder', { name: '打雷', emoji: '🌩️', type: 'attack', element: 'electric', cost: 3, rarity: 'rare',
    effects: { damage: 26, vulnerable: 2 }, up: { damage: 8, vulnerable: 1 } }),

  // ==== 冰系 ====
  ice_shard: C('ice_shard', { name: '冰砾', emoji: '❄️', type: 'attack', element: 'ice', cost: 1, rarity: 'common',
    effects: { damage: 7 }, up: { damage: 3 } }),
  frost_armor: C('frost_armor', { name: '冰霜护甲', emoji: '🧊', type: 'skill', element: 'ice', cost: 1, rarity: 'common',
    effects: { block: 7, thorns: 1 }, up: { block: 3, thorns: 1 } }),
  ice_beam: C('ice_beam', { name: '冰冻光线', emoji: '🌬️', type: 'attack', element: 'ice', cost: 2, rarity: 'uncommon',
    effects: { damage: 12, weak: 2 }, up: { damage: 4, weak: 1 } }),
  blizzard: C('blizzard', { name: '暴风雪', emoji: '🌨️', type: 'attack', element: 'ice', cost: 3, rarity: 'rare',
    effects: { damage: 8, hits: 3, weak: 2 }, up: { damage: 3, weak: 1 }, keywords: ['multi'] }),

  // ==== 格斗 ====
  karate_chop: C('karate_chop', { name: '空手劈', emoji: '🥋', type: 'attack', element: 'fighting', cost: 1, rarity: 'common',
    effects: { damage: 8 }, up: { damage: 3 } }),
  close_combat: C('close_combat', { name: '近身战', emoji: '👊', type: 'attack', element: 'fighting', cost: 2, rarity: 'uncommon',
    effects: { damage: 17, selfBlockLoss: 3 }, up: { damage: 6 } }),
  bulk_up: C('bulk_up', { name: '健美', emoji: '💪', type: 'power', element: 'fighting', cost: 1, rarity: 'uncommon',
    effects: { strength: 1, block: 5 }, up: { strength: 1, block: 3 } }),
  counter: C('counter', { name: '反击', emoji: '✊', type: 'skill', element: 'fighting', cost: 1, rarity: 'uncommon',
    effects: { block: 6, thorns: 3 }, up: { block: 3, thorns: 2 }, keywords: ['retain'] }),
  focus_energy: C('focus_energy', { name: '聚气', emoji: '🎯', type: 'skill', element: 'fighting', cost: 0, rarity: 'uncommon',
    effects: { draw: 2 }, up: { draw: 1 }, keywords: ['exhaust'] }),

  // ==== 超能 ====
  confusion: C('confusion', { name: '念力', emoji: '🔮', type: 'attack', element: 'psychic', cost: 1, rarity: 'common',
    effects: { damage: 6, draw: 1 }, up: { damage: 3 } }),
  psybeam: C('psybeam', { name: '幻象光线', emoji: '🌈', type: 'attack', element: 'psychic', cost: 2, rarity: 'uncommon',
    effects: { damage: 13, weak: 1 }, up: { damage: 5, weak: 1 } }),
  teleport: C('teleport', { name: '瞬间移动', emoji: '🌌', type: 'skill', element: 'psychic', cost: 1, rarity: 'uncommon',
    effects: { block: 10, draw: 1 }, up: { block: 4 }, keywords: ['exhaust'] }),
  future_sight: C('future_sight', { name: '预知未来', emoji: '👁️', type: 'power', element: 'psychic', cost: 2, rarity: 'rare',
    effects: { futureDraw: 1 }, up: { futureDraw: 1 }, keywords: ['ethereal'] }),
  hypnosis: C('hypnosis', { name: '催眠术', emoji: '💤', type: 'skill', element: 'psychic', cost: 1, rarity: 'rare',
    effects: { weak: 2, vulnerable: 2 }, up: { weak: 1, vulnerable: 1 } }),

  // ==== 恶系 ====
  bite: C('bite', { name: '咬住', emoji: '🦷', type: 'attack', element: 'dark', cost: 1, rarity: 'common',
    effects: { damage: 7 }, up: { damage: 3 } }),
  sucker_punch: C('sucker_punch', { name: '突袭', emoji: '💢', type: 'attack', element: 'dark', cost: 0, rarity: 'uncommon',
    effects: { damage: 5 }, up: { damage: 4 }, keywords: ['exhaust'] }),
  dark_pulse: C('dark_pulse', { name: '恶之波动', emoji: '🌑', type: 'attack', element: 'dark', cost: 2, rarity: 'uncommon',
    effects: { damage: 14, vulnerable: 1 }, up: { damage: 5, vulnerable: 1 } }),
  nasty_plot: C('nasty_plot', { name: '诡计', emoji: '🕯️', type: 'power', element: 'dark', cost: 1, rarity: 'rare',
    effects: { strength: 3 }, up: { strength: 1 }, keywords: ['exhaust'] }),

  // ==== 一般 ====
  quick_attack: C('quick_attack', { name: '电光石火', emoji: '💫', type: 'attack', element: 'normal', cost: 0, rarity: 'common',
    effects: { damage: 4 }, up: { damage: 3 } }),
  harden: C('harden', { name: '变硬', emoji: '🧱', type: 'skill', element: 'normal', cost: 1, rarity: 'common',
    effects: { block: 8 }, up: { block: 4 } }),
  double_team: C('double_team', { name: '影分身', emoji: '👥', type: 'skill', element: 'normal', cost: 1, rarity: 'common',
    effects: { block: 6, draw: 1 }, up: { block: 3 } }),
  take_down: C('take_down', { name: '猛撞', emoji: '💥', type: 'attack', element: 'normal', cost: 1, rarity: 'common',
    effects: { damage: 11, selfDamage: 2 }, up: { damage: 4 } }),
  agility: C('agility', { name: '高速移动', emoji: '💨', type: 'skill', element: 'normal', cost: 1, rarity: 'uncommon',
    effects: { draw: 2, block: 3 }, up: { draw: 1, block: 2 } }),
  swords_dance: C('swords_dance', { name: '剑舞', emoji: '⚔️', type: 'power', element: 'normal', cost: 1, rarity: 'uncommon',
    effects: { strength: 2 }, up: { strength: 1 } }),
  rest_card: C('rest_card', { name: '睡眠', emoji: '😴', type: 'skill', element: 'normal', cost: 1, rarity: 'uncommon',
    effects: { heal: 8, block: 5 }, up: { heal: 4, block: 4 } }),
  protect: C('protect', { name: '守住', emoji: '🛡️', type: 'skill', element: 'normal', cost: 2, rarity: 'uncommon',
    effects: { block: 15 }, up: { block: 6 } }),
  recover: C('recover', { name: '自我再生', emoji: '✨', type: 'skill', element: 'normal', cost: 2, rarity: 'rare',
    effects: { heal: 15 }, up: { heal: 7 }, keywords: ['exhaust'] }),
  hyper_beam: C('hyper_beam', { name: '破坏光线', emoji: '💣', type: 'attack', element: 'normal', cost: 3, rarity: 'rare',
    effects: { damage: 32 }, up: { damage: 10 }, keywords: ['exhaust'] }),

  // ==== 毒系 ====
  toxic: C('toxic', { name: '剧毒', emoji: '☠️', type: 'skill', element: 'poison', cost: 1, rarity: 'uncommon',
    effects: { poison: 4 }, up: { poison: 3 } }),
  sludge_bomb: C('sludge_bomb', { name: '污泥炸弹', emoji: '🟣', type: 'attack', element: 'poison', cost: 2, rarity: 'uncommon',
    effects: { damage: 11, poison: 3 }, up: { damage: 4, poison: 2 } }),

  // ==== 龙系 ====
  dragon_claw: C('dragon_claw', { name: '龙爪', emoji: '🐉', type: 'attack', element: 'dragon', cost: 2, rarity: 'rare',
    effects: { damage: 15, strength: 1 }, up: { damage: 5, strength: 1 } }),
  dragon_rage: C('dragon_rage', { name: '龙之怒', emoji: '🔥', type: 'attack', element: 'dragon', cost: 2, rarity: 'uncommon',
    effects: { xDamage: 5 }, up: { xDamage: 2 }, keywords: ['xcost'] }),
  dragon_dance: C('dragon_dance', { name: '龙舞', emoji: '💃', type: 'power', element: 'dragon', cost: 1, rarity: 'rare',
    effects: { strength: 1, dexterity: 1 }, up: { strength: 1, dexterity: 1 } }),
  outrage: C('outrage', { name: '逆鳞', emoji: '😡', type: 'attack', element: 'dragon', cost: 3, rarity: 'rare',
    effects: { damage: 11, hits: 3 }, up: { damage: 4 }, keywords: ['multi'] }),

  // ==== 特殊生成牌 ====
  soul_flame: C('soul_flame', { name: '灵魂之火', emoji: '👻', type: 'attack', element: 'fire', cost: 0, rarity: 'special',
    effects: { damage: 5 }, up: { damage: 2 }, keywords: ['exhaust'] }),
};

// ---------- 卡牌文本生成 ----------
const EFFECT_ORDER = ['damage','xDamage','block','heal','draw','energy','selfDamage','strength','dexterity','thorns','plated','vulnerable','weak','poison','burn','addCards'];

export function describeEffects(effects, card) {
  const parts = [];
  const elName = TYPE_INFO[card.element] ? TYPE_INFO[card.element].name : '';
  if (effects.xDamage) {
    parts.push(`消耗你所有能量，每点能量造成 ${effects.xDamage} 点伤害`);
  } else if (effects.damage) {
    if (effects.hits && effects.hits > 1) parts.push(`造成 ${effects.damage} 点伤害 ${effects.hits} 次`);
    else parts.push(card.type === 'attack' ? `造成 ${effects.damage} 点${elName}伤害` : `造成 ${effects.damage} 点伤害`);
  }
  if (effects.block) parts.push(`获得 ${effects.block} 点护甲`);
  if (effects.heal) parts.push(`回复 ${effects.heal} 点HP`);
  if (effects.draw) parts.push(`抽 ${effects.draw} 张牌`);
  if (effects.energy) parts.push(`获得 ${effects.energy} 点能量`);
  if (effects.futureDraw) parts.push(`此后每回合多抽 ${effects.futureDraw} 张牌`);
  if (effects.selfDamage) parts.push(`失去 ${effects.selfDamage} 点HP`);
  if (effects.selfBlockLoss) parts.push(`失去 ${effects.selfBlockLoss} 点护甲`);
  if (effects.strength) parts.push(`获得 ${effects.strength} 层力量`);
  if (effects.dexterity) parts.push(`获得 ${effects.dexterity} 层敏捷`);
  if (effects.thorns) parts.push(`获得 ${effects.thorns} 层荆棘`);
  if (effects.plated) parts.push(`获得 ${effects.plated} 层金属化`);
  if (effects.vulnerable) parts.push(`给予 ${effects.vulnerable} 层易伤`);
  if (effects.weak) parts.push(`给予 ${effects.weak} 层虚弱`);
  if (effects.poison) parts.push(`给予 ${effects.poison} 层中毒`);
  if (effects.burn) parts.push(`给予 ${effects.burn} 层灼伤`);
  if (effects.addCards) {
    for (const [cid, n] of Object.entries(effects.addCards)) {
      parts.push(`将 ${n} 张「${CARDS_DB[cid]?.name || cid}」加入手牌`);
    }
  }
  if (!parts.length) parts.push('无效果');
  return parts.join('。') + '。';
}

// ---------- 卡牌实例 ----------
let _cardUID = 0;
export function createCard(cardId, upgraded = false) {
  const template = CARDS_DB[cardId];
  if (!template) { console.error('Unknown card:', cardId); return null; }
  const effects = { ...template.effects };
  if (upgraded && template.up) {
    for (const [k, v] of Object.entries(template.up)) effects[k] = (effects[k] || 0) + v;
  }
  const cost = upgraded && template.upCost != null ? template.upCost : template.cost;
  const keywords = [...(template.keywords || [])];
  if (upgraded && template.upKeywords) keywords.push(...template.upKeywords);
  const card = {
    ...template, uid: _cardUID++, upgraded, cost,
    effects, keywords,
    baseName: template.name,
    name: template.name,
  };
  if (upgraded) card.name = template.name + '+';
  card.description = describeEffects(effects, card);
  return card;
}

// ---------- 敌人数据 ----------
// moves: damage/hits/block/heal/strength/vulnerable/weak/poison/burn 作用于玩家或自身
export const ENEMIES = {
  // === 第一层：常磐森林 ===
  pidgey: {
    id: 'pidgey', name: '波波', art: 'pidgey', element: 'normal', tier: 1,
    hp: 30, gold: 14,
    moves: [
      { name: '啄', damage: 5 },
      { name: '起风', damage: 4, hits: 2 },
      { name: '羽毛舞', block: 6, weak: 1 },
    ],
    pattern: [0, 1, 2, 0]
  },
  rattata: {
    id: 'rattata', name: '小拉达', art: 'rattata', element: 'normal', tier: 1,
    hp: 26, gold: 12,
    moves: [
      { name: '撞击', damage: 6 },
      { name: '必杀门牙', damage: 10 },
      { name: '瞪眼', vulnerable: 2 },
    ],
    pattern: [0, 0, 2, 1]
  },
  weedle: {
    id: 'weedle', name: '独角虫', art: 'weedle', element: 'poison', tier: 1,
    hp: 32, gold: 14,
    moves: [
      { name: '毒针', damage: 4, poison: 2 },
      { name: '虫咬', damage: 7 },
      { name: '吐丝', weak: 2 },
    ],
    pattern: [0, 1, 0, 2]
  },
  zubat: {
    id: 'zubat', name: '超音蝠', art: 'zubat', element: 'poison', tier: 1,
    hp: 28, gold: 13,
    moves: [
      { name: '吸血', damage: 5, heal: 3 },
      { name: '超音波', vulnerable: 1, weak: 1 },
      { name: '翅膀攻击', damage: 8 },
    ],
    pattern: [0, 1, 2, 0]
  },
  geodude: {
    id: 'geodude', name: '小拳石', art: 'geodude', element: 'fighting', tier: 1,
    hp: 38, gold: 16,
    moves: [
      { name: '落石', damage: 6 },
      { name: '变硬', block: 8 },
      { name: '地震', damage: 11 },
    ],
    pattern: [1, 0, 0, 2]
  },
  gastly: {
    id: 'gastly', name: '鬼斯', art: 'gastly', element: 'dark', tier: 1,
    hp: 24, gold: 16,
    moves: [
      { name: '舌舔', damage: 5, weak: 1 },
      { name: '催眠术', weak: 2 },
      { name: '暗影球', damage: 12 },
    ],
    pattern: [0, 1, 0, 2]
  },

  // === 第二层：月见山 ===
  golbat: {
    id: 'golbat', name: '大嘴蝠', art: 'zubat', variant: 'golbat', element: 'poison', tier: 2,
    hp: 44, gold: 20,
    moves: [
      { name: '吸血', damage: 7, heal: 4 },
      { name: '剧毒牙', damage: 5, poison: 3 },
      { name: '翅膀攻击', damage: 12 },
    ],
    pattern: [0, 1, 2, 0]
  },
  machop: {
    id: 'machop', name: '腕力', art: 'machop', element: 'fighting', tier: 2,
    hp: 46, gold: 19,
    moves: [
      { name: '空手劈', damage: 7 },
      { name: '健美', strength: 1 },
      { name: '地狱翻滚', damage: 15 },
    ],
    pattern: [0, 1, 0, 2]
  },
  kadabra: {
    id: 'kadabra', name: '勇基拉', art: 'kadabra', element: 'psychic', tier: 2,
    hp: 40, gold: 22,
    moves: [
      { name: '念力', damage: 8 },
      { name: '冥想', strength: 1, block: 5 },
      { name: '幻象光线', damage: 14, weak: 1 },
    ],
    pattern: [0, 1, 0, 2]
  },
  haunter: {
    id: 'haunter', name: '鬼斯通', art: 'gastly', variant: 'haunter', element: 'dark', tier: 2,
    hp: 42, gold: 24,
    moves: [
      { name: '暗影拳', damage: 9 },
      { name: '诅咒', vulnerable: 2, weak: 1 },
      { name: '暗影球', damage: 16 },
    ],
    pattern: [0, 1, 0, 2]
  },
  geodude2: {
    id: 'geodude2', name: '隆隆石', art: 'geodude', variant: 'graveler', element: 'fighting', tier: 2,
    hp: 52, gold: 21,
    moves: [
      { name: '岩石爆击', damage: 4, hits: 3 },
      { name: '变硬', block: 10 },
      { name: '重踏', damage: 14, vulnerable: 1 },
    ],
    pattern: [1, 0, 2, 0]
  },

  // === 第三层：冠军之路 ===
  snorlax: {
    id: 'snorlax', name: '卡比兽', art: 'snorlax', element: 'normal', tier: 3,
    hp: 78, gold: 30,
    moves: [
      { name: '泰山压顶', damage: 12 },
      { name: '睡觉', block: 10, heal: 8 },
      { name: '破坏光线', damage: 22 },
    ],
    pattern: [0, 0, 1, 2]
  },
  dragonair: {
    id: 'dragonair', name: '哈克龙', art: 'dragonair', element: 'dragon', tier: 3,
    hp: 66, gold: 32,
    moves: [
      { name: '龙之怒', damage: 10 },
      { name: '龙舞', strength: 2 },
      { name: '逆鳞', damage: 7, hits: 3 },
    ],
    pattern: [0, 1, 0, 2]
  },
  alakazam: {
    id: 'alakazam', name: '胡地', art: 'alakazam', element: 'psychic', tier: 3,
    hp: 58, gold: 30,
    moves: [
      { name: '精神切割', damage: 11 },
      { name: '冥想', strength: 2 },
      { name: '精神强念', damage: 18 },
      { name: '光墙', block: 12 },
    ],
    pattern: [0, 1, 0, 2, 3]
  },
  machamp: {
    id: 'machamp', name: '怪力', art: 'machop', variant: 'machamp', element: 'fighting', tier: 3,
    hp: 70, gold: 33,
    moves: [
      { name: '爆裂拳', damage: 9, hits: 2 },
      { name: '健美', strength: 1, block: 8 },
      { name: '十字劈', damage: 20 },
    ],
    pattern: [0, 1, 2, 0]
  },
};

// ---------- BOSS ----------
export const BOSSES = {
  brock: {
    id: 'brock', name: '小刚 · 大岩蛇', art: 'onix', element: 'fighting', tier: 1,
    hp: 96, gold: 55, isBoss: true, bossName: '岩石道馆馆主 小刚',
    intros: '「我的岩石宝可梦，坚不可摧！」',
    moves: [
      { name: '落石', damage: 8 },
      { name: '变硬', block: 12 },
      { name: '铁尾', damage: 15 },
      { name: '岩崩', damage: 9, vulnerable: 1 },
    ],
    pattern: [1, 0, 0, 2, 0, 3]
  },
  misty: {
    id: 'misty', name: '小霞 · 宝石海星', art: 'starmie', element: 'water', tier: 2,
    hp: 124, gold: 70, isBoss: true, bossName: '华蓝道馆馆主 小霞',
    intros: '「水可载舟，亦可覆舟哦～」',
    moves: [
      { name: '水枪', damage: 9 },
      { name: '冲浪', damage: 16 },
      { name: '自我再生', block: 8, heal: 10 },
      { name: '高速旋转', damage: 6, weak: 1 },
    ],
    pattern: [0, 0, 3, 1, 2, 0]
  },
  rival: {
    id: 'rival', name: '小茂 · 伊布', art: 'eevee', element: 'normal', tier: 3,
    hp: 156, gold: 95, isBoss: true, bossName: '劲敌 小茂',
    intros: '「就让你看看，什么才是真正的实力！」',
    moves: [
      { name: '电光石火', damage: 8, hits: 2 },
      { name: '咬住', damage: 13 },
      { name: '影分身', block: 10, strength: 1 },
      { name: '突袭', damage: 22 },
      { name: '吼叫', weak: 1, vulnerable: 1 },
    ],
    pattern: [0, 2, 1, 0, 4, 3]
  },
};

// ---------- 遗物 ----------
export const RELICS = [
  { id: 'charcoal', name: '木炭', emoji: '🔥', rarity: 'common', description: '火属性卡牌 +3 伤害。', effect: { type: 'element_damage', element: 'fire', value: 3 } },
  { id: 'mystic_water', name: '神秘水滴', emoji: '💧', rarity: 'common', description: '水属性卡牌 +3 伤害。', effect: { type: 'element_damage', element: 'water', value: 3 } },
  { id: 'miracle_seed', name: '奇迹种子', emoji: '🌱', rarity: 'common', description: '草属性卡牌 +3 伤害。', effect: { type: 'element_damage', element: 'grass', value: 3 } },
  { id: 'magnet', name: '磁铁', emoji: '🧲', rarity: 'common', description: '电属性卡牌 +3 伤害。', effect: { type: 'element_damage', element: 'electric', value: 3 } },
  { id: 'silk_scarf', name: '丝绸围巾', emoji: '🧣', rarity: 'common', description: '一般属性卡牌 +3 伤害。', effect: { type: 'element_damage', element: 'normal', value: 3 } },
  { id: 'running_shoes', name: '跑步鞋', emoji: '👟', rarity: 'common', description: '每场战斗第一回合多 1 点能量。', effect: { type: 'first_turn_energy', value: 1 } },
  { id: 'lucky_egg', name: '幸运蛋', emoji: '🥚', rarity: 'common', description: '战斗结束多获得 50% 金币。', effect: { type: 'gold_bonus', value: 0.5 } },
  { id: 'amulet_coin', name: '护身金币', emoji: '🪙', rarity: 'common', description: '战斗结束额外获得 15 金币。', effect: { type: 'flat_gold', value: 15 } },
  { id: 'scope_lens', name: '焦点镜', emoji: '🔍', rarity: 'uncommon', description: '攻击卡 +2 伤害。', effect: { type: 'attack_damage', value: 2 } },
  { id: 'leftovers', name: '吃剩的东西', emoji: '🍎', rarity: 'uncommon', description: '每回合开始回复 2 点HP。', effect: { type: 'turn_heal', value: 2 } },
  { id: 'exp_share', name: '学习装置', emoji: '📱', rarity: 'uncommon', description: '每回合多抽 1 张牌。', effect: { type: 'extra_draw', value: 1 } },
  { id: 'shell_bell', name: '贝壳之铃', emoji: '🔔', rarity: 'uncommon', description: '每打出 3 张牌回复 2 点HP。', effect: { type: 'play_heal', playCount: 3, value: 2 } },
  { id: 'sacred_ash', name: '圣灰', emoji: '🕯️', rarity: 'uncommon', description: '每场战斗开始时获得 5 点护甲。', effect: { type: 'battle_start_block', value: 5 } },
  { id: 'muscle_band', name: '力量头带', emoji: '🥇', rarity: 'uncommon', description: '每场战斗开始时获得 1 层力量。', effect: { type: 'battle_start_strength', value: 1 } },
  { id: 'sitrus_berry', name: '文柚果', emoji: '🍊', rarity: 'uncommon', description: '每场战斗开始时回复 6 点HP。', effect: { type: 'battle_start_heal', value: 6 } },
  { id: 'quick_claw', name: '先制之爪', emoji: '🦀', rarity: 'rare', description: '每场战斗第一回合多 2 点能量。', effect: { type: 'first_turn_energy', value: 2 } },
  { id: 'choice_band', name: '讲究头带', emoji: '🎀', rarity: 'rare', description: '攻击卡 +4 伤害，但技能卡消耗 +1。', effect: { type: 'choice_band', attackBonus: 4 } },
  { id: 'everstone', name: '不变之石', emoji: '💎', rarity: 'rare', description: '免疫虚弱和易伤。', effect: { type: 'debuff_immunity' } },
  { id: 'power_core', name: '能量核心', emoji: '⚡', rarity: 'rare', description: '每回合能量 +1。', effect: { type: 'max_energy', value: 1 } },
  { id: 'thorn_shell', name: '尖刺外壳', emoji: '🌵', rarity: 'rare', description: '每场战斗开始时获得 3 层荆棘。', effect: { type: 'battle_start_thorns', value: 3 } },
  { id: 'research_notes', name: '研究笔记', emoji: '📓', rarity: 'rare', description: '战斗奖励多 1 个卡牌选项。', effect: { type: 'reward_card_bonus', value: 1 } },
];

// ---------- 随机事件 ----------
export const EVENTS = [
  {
    id: 'mysterious_cave', title: '神秘洞窟', emoji: '🕳️',
    description: '石壁上闪着奇怪的微光。深处似乎有什么在呼吸……',
    choices: [
      { text: '进入探索（获得 1 个随机遗物，失去 10% 最大HP）', effect: { type: 'relic_risk', hpCost: 0.10 } },
      { text: '谨慎离开', effect: { type: 'nothing' } },
    ]
  },
  {
    id: 'traveling_merchant', title: '旅行商人', emoji: '🧳',
    description: '一个背着大包的商人拦住了你。"旅行者，要来看看好东西吗？"',
    choices: [
      { text: '购买药水（-30 金币，回复 25% HP）', effect: { type: 'buy_heal', cost: 30, healPercent: 0.25 } },
      { text: '购买稀有卡牌（-50 金币）', effect: { type: 'buy_card', cost: 50, rarity: 'rare' } },
      { text: '不了，谢谢', effect: { type: 'nothing' } },
    ]
  },
  {
    id: 'training_ground', title: '训练场', emoji: '🏋️',
    description: '一处废弃的训练场，器材上还留着上一位挑战者的汗水。',
    choices: [
      { text: '刻苦训练（升级一张随机卡牌，失去 5 HP）', effect: { type: 'upgrade_random', hpCost: 5 } },
      { text: '轻松拉伸（获得 20 金币）', effect: { type: 'random_gold', min: 20, max: 20 } },
    ]
  },
  {
    id: 'abandoned_bag', title: '遗弃的背包', emoji: '🎒',
    description: '路边躺着一个被遗弃的背包，拉链半开着。',
    choices: [
      { text: '打开背包（获得 30~60 金币）', effect: { type: 'random_gold', min: 30, max: 60 } },
      { text: '不理它', effect: { type: 'nothing' } },
    ]
  },
  {
    id: 'pokemon_center', title: '临时宝可梦中心', emoji: '🏥',
    description: '乔伊小姐在路边搭了一个临时治疗站，吉利蛋正在忙前忙后。',
    choices: [
      { text: '治疗（回复 30% HP）', effect: { type: 'heal_percent', value: 0.30 } },
      { text: '深度治疗（回复全部HP，移除一张随机卡牌）', effect: { type: 'full_heal_remove_card' } },
    ]
  },
  {
    id: 'old_shrine', title: '古老神社', emoji: '⛩️',
    description: '一座供奉着宝可梦的古老神社，香火竟然还未熄灭。',
    choices: [
      { text: '祈祷（随机获得一张稀有卡牌）', effect: { type: 'free_card', rarity: 'rare' } },
      { text: '捐献金币（-25 金币，最大HP +5）', effect: { type: 'max_hp_up', cost: 25, value: 5 } },
      { text: '静静离开', effect: { type: 'nothing' } },
    ]
  },
  {
    id: 'move_tutor', title: '招式教学', emoji: '📜',
    description: '一位老人在树下打坐。"你的宝可梦，想学点新东西吗？"',
    choices: [
      { text: '学习新招式（获得 1 张随机卡牌）', effect: { type: 'free_card', rarity: 'uncommon' } },
      { text: '请教心得（升级一张随机卡牌）', effect: { type: 'upgrade_random', hpCost: 0 } },
    ]
  },
  {
    id: 'berry_tree', title: '树果森林', emoji: '🍒',
    description: '树上结满了饱满的树果，看起来十分诱人。',
    choices: [
      { text: '摘取树果（回复 25% HP）', effect: { type: 'heal_percent', value: 0.25 } },
      { text: '收集种子（获得 3 最大HP）', effect: { type: 'max_hp_up', cost: 0, value: 3 } },
    ]
  },
];

// ---------- 地图层配置 ----------
export const FLOOR_CONFIG = [
  {
    name: '常磐森林', emoji: '🌲', theme: 'forest',
    normalEnemies: ['pidgey','rattata','weedle','zubat'],
    eliteEnemies: ['gastly','geodude'],
    boss: 'brock', rows: 7, nodeCount: 12,
  },
  {
    name: '月见山', emoji: '🏔️', theme: 'mountain',
    normalEnemies: ['geodude2','machop','golbat','kadabra','haunter'],
    eliteEnemies: ['kadabra','haunter','geodude2'],
    boss: 'misty', rows: 8, nodeCount: 14,
  },
  {
    name: '冠军之路', emoji: '🏆', theme: 'champion',
    normalEnemies: ['snorlax','dragonair','alakazam','machamp','haunter'],
    eliteEnemies: ['snorlax','dragonair','alakazam'],
    boss: 'rival', rows: 9, nodeCount: 16,
  },
];

// ---------- 商店 ----------
export function getShopCards(floor) {
  const pool = Object.keys(CARDS_DB).filter(id => {
    const c = CARDS_DB[id];
    if (c.rarity === 'basic' || c.rarity === 'special') return false;
    if (floor === 0 && c.rarity === 'rare') return false;
    return true;
  });
  const shuffled = pool.map(id => ({ id, r: Math.random() })).sort((a, b) => a.r - b.r).map(o => o.id);
  const picked = [];
  const rarityCount = { common: 0, uncommon: 0, rare: 0 };
  for (const id of shuffled) {
    const c = CARDS_DB[id];
    if (picked.length >= 5) break;
    const max = c.rarity === 'rare' ? 1 : c.rarity === 'uncommon' ? 2 : 3;
    if (rarityCount[c.rarity] >= max) continue;
    rarityCount[c.rarity]++;
    picked.push(id);
  }
  while (picked.length < 5) {
    const id = shuffled[Math.floor(Math.random() * shuffled.length)];
    if (!picked.includes(id)) picked.push(id);
  }
  return picked;
}

export function getCardPrice(card) {
  switch (card.rarity) {
    case 'common': return 35 + Math.floor(Math.random() * 10);
    case 'uncommon': return 55 + Math.floor(Math.random() * 15);
    case 'rare': return 85 + Math.floor(Math.random() * 25);
    case 'legendary': return 150;
    default: return 40;
  }
}

export const REMOVE_CARD_COST = 55;

export const RARITY_INFO = {
  basic:     { name: '基础', color: '#78909c' },
  common:    { name: '普通', color: '#b0bec5' },
  uncommon:  { name: '稀有', color: '#4fc3f7' },
  rare:      { name: '史诗', color: '#c084fc' },
  special:   { name: '特殊', color: '#ffd54f' },
};

export const CARD_TYPE_INFO = {
  attack: { name: '攻击', color: '#ff7043' },
  skill:  { name: '技能', color: '#4fc3f7' },
  power:  { name: '能力', color: '#ffd54f' },
};