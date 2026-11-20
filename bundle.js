(() => {
  // js/data.js
  var TYPE_INFO = {
    fire: { name: "火", icon: "🔥", color: "#ff7043" },
    water: { name: "水", icon: "💧", color: "#42a5f5" },
    grass: { name: "草", icon: "🌿", color: "#66bb6a" },
    electric: { name: "电", icon: "⚡", color: "#ffd54f" },
    ice: { name: "冰", icon: "❄️", color: "#4dd0e1" },
    fighting: { name: "格斗", icon: "🥊", color: "#ff8a65" },
    psychic: { name: "超能", icon: "🔮", color: "#ba68c8" },
    dark: { name: "恶", icon: "🌑", color: "#7986cb" },
    dragon: { name: "龙", icon: "🐉", color: "#9575cd" },
    normal: { name: "一般", icon: "⭐", color: "#b0bec5" },
    poison: { name: "毒", icon: "☠️", color: "#ab47bc" }
  };
  var TYPE_CHART = {
    fire: { strong: ["grass", "ice"], weak: ["water"] },
    water: { strong: ["fire"], weak: ["grass", "electric"] },
    grass: { strong: ["water"], weak: ["fire", "ice"] },
    electric: { strong: ["water"], weak: [] },
    ice: { strong: ["grass", "dragon"], weak: ["fire", "fighting"] },
    fighting: { strong: ["normal", "ice"], weak: ["psychic"] },
    psychic: { strong: ["fighting"], weak: ["dark"] },
    dark: { strong: ["psychic"], weak: ["fighting"] },
    dragon: { strong: [], weak: ["ice", "dragon"] },
    normal: { strong: [], weak: ["fighting"] },
    poison: { strong: ["grass"], weak: ["psychic"] }
  };
  function getTypeMultiplier(attackElement, defenderElement) {
    const info = TYPE_CHART[attackElement];
    if (!info) return 1;
    if (info.strong.includes(defenderElement)) return 1.5;
    if (info.weak && info.weak.includes(defenderElement)) return 0.75;
    return 1;
  }
  var KEYWORDS = {
    exhaust: { name: "消耗", desc: "打出后移出本场战斗。" },
    retain: { name: "保留", desc: "回合结束时不会被弃掉。" },
    ethereal: { name: "虚无", desc: "回合结束时若仍在手牌中，则被消耗。" },
    innate: { name: "固有", desc: "战斗开始时必定出现在起始手牌中。" },
    multi: { name: "多段", desc: "连续命中多次，每段独立结算护甲与增伤。" },
    xcost: { name: "X费", desc: "消耗你当前所有能量，效果随能量提升。" }
  };
  var STARTERS = [
    {
      id: "charmander",
      name: "小火龙",
      emoji: "🔥",
      art: "charmander",
      element: "fire",
      hp: 72,
      maxHp: 72,
      title: "猛火之心",
      description: "攻击型。火系卡牌伤害更高，擅长灼伤与爆发。",
      passives: ["攻击卡较多", "擅长灼伤"],
      starterCards: ["tackle", "tackle", "tackle", "tackle", "ember", "ember", "curl", "curl", "curl", "fire_fang"]
    },
    {
      id: "squirtle",
      name: "杰尼龟",
      emoji: "💧",
      art: "squirtle",
      element: "water",
      hp: 84,
      maxHp: 84,
      title: "坚壳壁垒",
      description: "防御型。初始HP更高，拥有大量护甲与回复。",
      passives: ["护甲卡较多", "续航能力强"],
      starterCards: ["tackle", "tackle", "tackle", "tackle", "water_gun", "water_gun", "curl", "curl", "curl", "withdraw"]
    },
    {
      id: "bulbasaur",
      name: "妙蛙种子",
      emoji: "🌿",
      art: "bulbasaur",
      element: "grass",
      hp: 78,
      maxHp: 78,
      title: "生生不息",
      description: "平衡型。拥有回复与持续伤害，越战越强。",
      passives: ["回复能力", "中毒与虚弱"],
      starterCards: ["tackle", "tackle", "tackle", "tackle", "vine_whip", "vine_whip", "curl", "curl", "curl", "leech_seed"]
    }
  ];
  var C = (id, o) => ({ id, ...o });
  var CARDS_DB = {
    // ==== 基础 ====
    tackle: C("tackle", {
      name: "电光一闪",
      emoji: "⚡",
      type: "attack",
      element: "normal",
      cost: 1,
      rarity: "basic",
      effects: { damage: 6 },
      up: { damage: 3 }
    }),
    curl: C("curl", {
      name: "蜷缩",
      emoji: "🛡️",
      type: "skill",
      element: "normal",
      cost: 1,
      rarity: "basic",
      effects: { block: 5 },
      up: { block: 3 }
    }),
    // ==== 火系 ====
    ember: C("ember", {
      name: "火花",
      emoji: "🔥",
      type: "attack",
      element: "fire",
      cost: 1,
      rarity: "common",
      effects: { damage: 7, burn: 1 },
      up: { damage: 3, burn: 1 }
    }),
    fire_fang: C("fire_fang", {
      name: "火焰牙",
      emoji: "🦷",
      type: "attack",
      element: "fire",
      cost: 1,
      rarity: "common",
      effects: { damage: 5, hits: 2, burn: 1 },
      up: { damage: 2, burn: 1 },
      keywords: ["multi"]
    }),
    flame_wheel: C("flame_wheel", {
      name: "火焰轮",
      emoji: "☄️",
      type: "attack",
      element: "fire",
      cost: 1,
      rarity: "common",
      effects: { damage: 6, block: 4 },
      up: { damage: 3, block: 2 }
    }),
    flamethrower: C("flamethrower", {
      name: "喷射火焰",
      emoji: "🔥",
      type: "attack",
      element: "fire",
      cost: 2,
      rarity: "uncommon",
      effects: { damage: 13, burn: 2 },
      up: { damage: 4, burn: 1 }
    }),
    fire_spin: C("fire_spin", {
      name: "火焰旋涡",
      emoji: "🌀",
      type: "attack",
      element: "fire",
      cost: 2,
      rarity: "uncommon",
      effects: { damage: 6, hits: 2, burn: 3 },
      up: { damage: 2, burn: 2 },
      keywords: ["multi"]
    }),
    fire_blast: C("fire_blast", {
      name: "大字爆炎",
      emoji: "💥",
      type: "attack",
      element: "fire",
      cost: 3,
      rarity: "rare",
      effects: { damage: 24, vulnerable: 2 },
      up: { damage: 6, vulnerable: 1 }
    }),
    overheat: C("overheat", {
      name: "过热",
      emoji: "🌋",
      type: "attack",
      element: "fire",
      cost: 1,
      rarity: "rare",
      effects: { damage: 20, selfDamage: 4 },
      up: { damage: 6, selfDamage: -1 },
      keywords: ["exhaust"]
    }),
    blaze_dance: C("blaze_dance", {
      name: "烈焰之舞",
      emoji: "🕯️",
      type: "power",
      element: "fire",
      cost: 2,
      rarity: "rare",
      effects: { strength: 2, thorns: 2 },
      up: { strength: 1, thorns: 1 }
    }),
    // ==== 水系 ====
    water_gun: C("water_gun", {
      name: "水枪",
      emoji: "💧",
      type: "attack",
      element: "water",
      cost: 1,
      rarity: "common",
      effects: { damage: 6, block: 3 },
      up: { damage: 3, block: 2 }
    }),
    bubble: C("bubble", {
      name: "泡沫",
      emoji: "🫧",
      type: "attack",
      element: "water",
      cost: 1,
      rarity: "common",
      effects: { damage: 5, weak: 1 },
      up: { damage: 3, weak: 1 }
    }),
    aqua_jet: C("aqua_jet", {
      name: "水流喷射",
      emoji: "🌊",
      type: "attack",
      element: "water",
      cost: 0,
      rarity: "common",
      effects: { damage: 4 },
      up: { damage: 3 },
      keywords: ["innate"]
    }),
    withdraw: C("withdraw", {
      name: "缩壳",
      emoji: "🐚",
      type: "skill",
      element: "water",
      cost: 1,
      rarity: "common",
      effects: { block: 8 },
      up: { block: 4 }
    }),
    aqua_ring: C("aqua_ring", {
      name: "水流环",
      emoji: "💫",
      type: "skill",
      element: "water",
      cost: 1,
      rarity: "uncommon",
      effects: { block: 4, heal: 3 },
      up: { block: 2, heal: 2 }
    }),
    surf: C("surf", {
      name: "冲浪",
      emoji: "🏄",
      type: "attack",
      element: "water",
      cost: 2,
      rarity: "uncommon",
      effects: { damage: 11, block: 6 },
      up: { damage: 4, block: 3 }
    }),
    rain_dance: C("rain_dance", {
      name: "求雨",
      emoji: "🌧️",
      type: "power",
      element: "water",
      cost: 1,
      rarity: "rare",
      effects: { dexterity: 2, draw: 1 },
      up: { dexterity: 1, draw: 1 }
    }),
    hydro_pump: C("hydro_pump", {
      name: "水炮",
      emoji: "💦",
      type: "attack",
      element: "water",
      cost: 3,
      rarity: "rare",
      effects: { damage: 25 },
      up: { damage: 7 }
    }),
    // ==== 草系 ====
    vine_whip: C("vine_whip", {
      name: "藤鞭",
      emoji: "🌿",
      type: "attack",
      element: "grass",
      cost: 1,
      rarity: "common",
      effects: { damage: 7 },
      up: { damage: 3 }
    }),
    leech_seed: C("leech_seed", {
      name: "寄生种子",
      emoji: "🌱",
      type: "skill",
      element: "grass",
      cost: 1,
      rarity: "common",
      effects: { damage: 3, heal: 3 },
      up: { damage: 2, heal: 2 }
    }),
    razor_leaf: C("razor_leaf", {
      name: "飞叶快刀",
      emoji: "🍃",
      type: "attack",
      element: "grass",
      cost: 2,
      rarity: "uncommon",
      effects: { damage: 7, hits: 2 },
      up: { damage: 3 },
      keywords: ["multi"]
    }),
    synthesis: C("synthesis", {
      name: "光合作用",
      emoji: "🌞",
      type: "skill",
      element: "grass",
      cost: 1,
      rarity: "uncommon",
      effects: { heal: 7, energy: 1 },
      up: { heal: 4 },
      keywords: ["exhaust"]
    }),
    spore: C("spore", {
      name: "蘑菇孢子",
      emoji: "🍄",
      type: "skill",
      element: "grass",
      cost: 1,
      rarity: "uncommon",
      effects: { weak: 2, poison: 2 },
      up: { weak: 1, poison: 2 }
    }),
    growth: C("growth", {
      name: "生长",
      emoji: "🌳",
      type: "power",
      element: "grass",
      cost: 1,
      rarity: "uncommon",
      effects: { strength: 1, plated: 2 },
      up: { strength: 1, plated: 2 }
    }),
    solar_beam: C("solar_beam", {
      name: "日光束",
      emoji: "☀️",
      type: "attack",
      element: "grass",
      cost: 3,
      rarity: "rare",
      effects: { damage: 22, heal: 5 },
      up: { damage: 7, heal: 3 }
    }),
    // ==== 电系 ====
    thunder_shock: C("thunder_shock", {
      name: "电击",
      emoji: "⚡",
      type: "attack",
      element: "electric",
      cost: 1,
      rarity: "common",
      effects: { damage: 6, vulnerable: 1 },
      up: { damage: 3, vulnerable: 1 }
    }),
    thunder_wave: C("thunder_wave", {
      name: "电磁波",
      emoji: "🌐",
      type: "skill",
      element: "electric",
      cost: 1,
      rarity: "common",
      effects: { weak: 1, vulnerable: 1 },
      up: { weak: 1, vulnerable: 1 }
    }),
    volt_switch: C("volt_switch", {
      name: "伏特替换",
      emoji: "🔌",
      type: "attack",
      element: "electric",
      cost: 1,
      rarity: "uncommon",
      effects: { damage: 8, draw: 1 },
      up: { damage: 3 }
    }),
    charge: C("charge", {
      name: "充电",
      emoji: "🔋",
      type: "skill",
      element: "electric",
      cost: 0,
      rarity: "uncommon",
      effects: { energy: 2, draw: 1 },
      up: { draw: 1 },
      keywords: ["exhaust"]
    }),
    thunderbolt: C("thunderbolt", {
      name: "十万伏特",
      emoji: "⚡",
      type: "attack",
      element: "electric",
      cost: 2,
      rarity: "uncommon",
      effects: { damage: 15 },
      up: { damage: 5 }
    }),
    thunder: C("thunder", {
      name: "打雷",
      emoji: "🌩️",
      type: "attack",
      element: "electric",
      cost: 3,
      rarity: "rare",
      effects: { damage: 26, vulnerable: 2 },
      up: { damage: 8, vulnerable: 1 }
    }),
    // ==== 冰系 ====
    ice_shard: C("ice_shard", {
      name: "冰砾",
      emoji: "❄️",
      type: "attack",
      element: "ice",
      cost: 1,
      rarity: "common",
      effects: { damage: 7 },
      up: { damage: 3 }
    }),
    frost_armor: C("frost_armor", {
      name: "冰霜护甲",
      emoji: "🧊",
      type: "skill",
      element: "ice",
      cost: 1,
      rarity: "common",
      effects: { block: 7, thorns: 1 },
      up: { block: 3, thorns: 1 }
    }),
    ice_beam: C("ice_beam", {
      name: "冰冻光线",
      emoji: "🌬️",
      type: "attack",
      element: "ice",
      cost: 2,
      rarity: "uncommon",
      effects: { damage: 12, weak: 2 },
      up: { damage: 4, weak: 1 }
    }),
    blizzard: C("blizzard", {
      name: "暴风雪",
      emoji: "🌨️",
      type: "attack",
      element: "ice",
      cost: 3,
      rarity: "rare",
      effects: { damage: 8, hits: 3, weak: 2 },
      up: { damage: 3, weak: 1 },
      keywords: ["multi"]
    }),
    // ==== 格斗 ====
    karate_chop: C("karate_chop", {
      name: "空手劈",
      emoji: "🥋",
      type: "attack",
      element: "fighting",
      cost: 1,
      rarity: "common",
      effects: { damage: 8 },
      up: { damage: 3 }
    }),
    close_combat: C("close_combat", {
      name: "近身战",
      emoji: "👊",
      type: "attack",
      element: "fighting",
      cost: 2,
      rarity: "uncommon",
      effects: { damage: 17, selfBlockLoss: 3 },
      up: { damage: 6 }
    }),
    bulk_up: C("bulk_up", {
      name: "健美",
      emoji: "💪",
      type: "power",
      element: "fighting",
      cost: 1,
      rarity: "uncommon",
      effects: { strength: 1, block: 5 },
      up: { strength: 1, block: 3 }
    }),
    counter: C("counter", {
      name: "反击",
      emoji: "✊",
      type: "skill",
      element: "fighting",
      cost: 1,
      rarity: "uncommon",
      effects: { block: 6, thorns: 3 },
      up: { block: 3, thorns: 2 },
      keywords: ["retain"]
    }),
    focus_energy: C("focus_energy", {
      name: "聚气",
      emoji: "🎯",
      type: "skill",
      element: "fighting",
      cost: 0,
      rarity: "uncommon",
      effects: { draw: 2 },
      up: { draw: 1 },
      keywords: ["exhaust"]
    }),
    // ==== 超能 ====
    confusion: C("confusion", {
      name: "念力",
      emoji: "🔮",
      type: "attack",
      element: "psychic",
      cost: 1,
      rarity: "common",
      effects: { damage: 6, draw: 1 },
      up: { damage: 3 }
    }),
    psybeam: C("psybeam", {
      name: "幻象光线",
      emoji: "🌈",
      type: "attack",
      element: "psychic",
      cost: 2,
      rarity: "uncommon",
      effects: { damage: 13, weak: 1 },
      up: { damage: 5, weak: 1 }
    }),
    teleport: C("teleport", {
      name: "瞬间移动",
      emoji: "🌌",
      type: "skill",
      element: "psychic",
      cost: 1,
      rarity: "uncommon",
      effects: { block: 10, draw: 1 },
      up: { block: 4 },
      keywords: ["exhaust"]
    }),
    future_sight: C("future_sight", {
      name: "预知未来",
      emoji: "👁️",
      type: "power",
      element: "psychic",
      cost: 2,
      rarity: "rare",
      effects: { futureDraw: 1 },
      up: { futureDraw: 1 },
      keywords: ["ethereal"]
    }),
    hypnosis: C("hypnosis", {
      name: "催眠术",
      emoji: "💤",
      type: "skill",
      element: "psychic",
      cost: 1,
      rarity: "rare",
      effects: { weak: 2, vulnerable: 2 },
      up: { weak: 1, vulnerable: 1 }
    }),
    // ==== 恶系 ====
    bite: C("bite", {
      name: "咬住",
      emoji: "🦷",
      type: "attack",
      element: "dark",
      cost: 1,
      rarity: "common",
      effects: { damage: 7 },
      up: { damage: 3 }
    }),
    sucker_punch: C("sucker_punch", {
      name: "突袭",
      emoji: "💢",
      type: "attack",
      element: "dark",
      cost: 0,
      rarity: "uncommon",
      effects: { damage: 5 },
      up: { damage: 4 },
      keywords: ["exhaust"]
    }),
    dark_pulse: C("dark_pulse", {
      name: "恶之波动",
      emoji: "🌑",
      type: "attack",
      element: "dark",
      cost: 2,
      rarity: "uncommon",
      effects: { damage: 14, vulnerable: 1 },
      up: { damage: 5, vulnerable: 1 }
    }),
    nasty_plot: C("nasty_plot", {
      name: "诡计",
      emoji: "🕯️",
      type: "power",
      element: "dark",
      cost: 1,
      rarity: "rare",
      effects: { strength: 3 },
      up: { strength: 1 },
      keywords: ["exhaust"]
    }),
    // ==== 一般 ====
    quick_attack: C("quick_attack", {
      name: "电光石火",
      emoji: "💫",
      type: "attack",
      element: "normal",
      cost: 0,
      rarity: "common",
      effects: { damage: 4 },
      up: { damage: 3 }
    }),
    harden: C("harden", {
      name: "变硬",
      emoji: "🧱",
      type: "skill",
      element: "normal",
      cost: 1,
      rarity: "common",
      effects: { block: 8 },
      up: { block: 4 }
    }),
    double_team: C("double_team", {
      name: "影分身",
      emoji: "👥",
      type: "skill",
      element: "normal",
      cost: 1,
      rarity: "common",
      effects: { block: 6, draw: 1 },
      up: { block: 3 }
    }),
    take_down: C("take_down", {
      name: "猛撞",
      emoji: "💥",
      type: "attack",
      element: "normal",
      cost: 1,
      rarity: "common",
      effects: { damage: 11, selfDamage: 2 },
      up: { damage: 4 }
    }),
    agility: C("agility", {
      name: "高速移动",
      emoji: "💨",
      type: "skill",
      element: "normal",
      cost: 1,
      rarity: "uncommon",
      effects: { draw: 2, block: 3 },
      up: { draw: 1, block: 2 }
    }),
    swords_dance: C("swords_dance", {
      name: "剑舞",
      emoji: "⚔️",
      type: "power",
      element: "normal",
      cost: 1,
      rarity: "uncommon",
      effects: { strength: 2 },
      up: { strength: 1 }
    }),
    rest_card: C("rest_card", {
      name: "睡眠",
      emoji: "😴",
      type: "skill",
      element: "normal",
      cost: 1,
      rarity: "uncommon",
      effects: { heal: 8, block: 5 },
      up: { heal: 4, block: 4 }
    }),
    protect: C("protect", {
      name: "守住",
      emoji: "🛡️",
      type: "skill",
      element: "normal",
      cost: 2,
      rarity: "uncommon",
      effects: { block: 15 },
      up: { block: 6 }
    }),
    recover: C("recover", {
      name: "自我再生",
      emoji: "✨",
      type: "skill",
      element: "normal",
      cost: 2,
      rarity: "rare",
      effects: { heal: 15 },
      up: { heal: 7 },
      keywords: ["exhaust"]
    }),
    hyper_beam: C("hyper_beam", {
      name: "破坏光线",
      emoji: "💣",
      type: "attack",
      element: "normal",
      cost: 3,
      rarity: "rare",
      effects: { damage: 32 },
      up: { damage: 10 },
      keywords: ["exhaust"]
    }),
    // ==== 毒系 ====
    toxic: C("toxic", {
      name: "剧毒",
      emoji: "☠️",
      type: "skill",
      element: "poison",
      cost: 1,
      rarity: "uncommon",
      effects: { poison: 4 },
      up: { poison: 3 }
    }),
    sludge_bomb: C("sludge_bomb", {
      name: "污泥炸弹",
      emoji: "🟣",
      type: "attack",
      element: "poison",
      cost: 2,
      rarity: "uncommon",
      effects: { damage: 11, poison: 3 },
      up: { damage: 4, poison: 2 }
    }),
    // ==== 龙系 ====
    dragon_claw: C("dragon_claw", {
      name: "龙爪",
      emoji: "🐉",
      type: "attack",
      element: "dragon",
      cost: 2,
      rarity: "rare",
      effects: { damage: 15, strength: 1 },
      up: { damage: 5, strength: 1 }
    }),
    dragon_rage: C("dragon_rage", {
      name: "龙之怒",
      emoji: "🔥",
      type: "attack",
      element: "dragon",
      cost: 2,
      rarity: "uncommon",
      effects: { xDamage: 5 },
      up: { xDamage: 2 },
      keywords: ["xcost"]
    }),
    dragon_dance: C("dragon_dance", {
      name: "龙舞",
      emoji: "💃",
      type: "power",
      element: "dragon",
      cost: 1,
      rarity: "rare",
      effects: { strength: 1, dexterity: 1 },
      up: { strength: 1, dexterity: 1 }
    }),
    outrage: C("outrage", {
      name: "逆鳞",
      emoji: "😡",
      type: "attack",
      element: "dragon",
      cost: 3,
      rarity: "rare",
      effects: { damage: 11, hits: 3 },
      up: { damage: 4 },
      keywords: ["multi"]
    }),
    // ==== 特殊生成牌 ====
    soul_flame: C("soul_flame", {
      name: "灵魂之火",
      emoji: "👻",
      type: "attack",
      element: "fire",
      cost: 0,
      rarity: "special",
      effects: { damage: 5 },
      up: { damage: 2 },
      keywords: ["exhaust"]
    })
  };
  function describeEffects(effects, card) {
    var _a;
    const parts = [];
    const elName = TYPE_INFO[card.element] ? TYPE_INFO[card.element].name : "";
    if (effects.xDamage) {
      parts.push(`消耗你所有能量，每点能量造成 ${effects.xDamage} 点伤害`);
    } else if (effects.damage) {
      if (effects.hits && effects.hits > 1) parts.push(`造成 ${effects.damage} 点伤害 ${effects.hits} 次`);
      else parts.push(card.type === "attack" ? `造成 ${effects.damage} 点${elName}伤害` : `造成 ${effects.damage} 点伤害`);
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
        parts.push(`将 ${n} 张「${((_a = CARDS_DB[cid]) == null ? void 0 : _a.name) || cid}」加入手牌`);
      }
    }
    if (!parts.length) parts.push("无效果");
    return parts.join("。") + "。";
  }
  var _cardUID = 0;
  function createCard(cardId, upgraded = false) {
    const template = CARDS_DB[cardId];
    if (!template) {
      console.error("Unknown card:", cardId);
      return null;
    }
    const effects = { ...template.effects };
    if (upgraded && template.up) {
      for (const [k, v] of Object.entries(template.up)) effects[k] = (effects[k] || 0) + v;
    }
    const cost = upgraded && template.upCost != null ? template.upCost : template.cost;
    const keywords = [...template.keywords || []];
    if (upgraded && template.upKeywords) keywords.push(...template.upKeywords);
    const card = {
      ...template,
      uid: _cardUID++,
      upgraded,
      cost,
      effects,
      keywords,
      baseName: template.name,
      name: template.name
    };
    if (upgraded) card.name = template.name + "+";
    card.description = describeEffects(effects, card);
    return card;
  }
  var ENEMIES = {
    // === 第一层：常磐森林 ===
    pidgey: {
      id: "pidgey",
      name: "波波",
      art: "pidgey",
      element: "normal",
      tier: 1,
      hp: 30,
      gold: 14,
      moves: [
        { name: "啄", damage: 5 },
        { name: "起风", damage: 4, hits: 2 },
        { name: "羽毛舞", block: 6, weak: 1 }
      ],
      pattern: [0, 1, 2, 0]
    },
    rattata: {
      id: "rattata",
      name: "小拉达",
      art: "rattata",
      element: "normal",
      tier: 1,
      hp: 26,
      gold: 12,
      moves: [
        { name: "撞击", damage: 6 },
        { name: "必杀门牙", damage: 10 },
        { name: "瞪眼", vulnerable: 2 }
      ],
      pattern: [0, 0, 2, 1]
    },
    weedle: {
      id: "weedle",
      name: "独角虫",
      art: "weedle",
      element: "poison",
      tier: 1,
      hp: 32,
      gold: 14,
      moves: [
        { name: "毒针", damage: 4, poison: 2 },
        { name: "虫咬", damage: 7 },
        { name: "吐丝", weak: 2 }
      ],
      pattern: [0, 1, 0, 2]
    },
    zubat: {
      id: "zubat",
      name: "超音蝠",
      art: "zubat",
      element: "poison",
      tier: 1,
      hp: 28,
      gold: 13,
      moves: [
        { name: "吸血", damage: 5, heal: 3 },
        { name: "超音波", vulnerable: 1, weak: 1 },
        { name: "翅膀攻击", damage: 8 }
      ],
      pattern: [0, 1, 2, 0]
    },
    geodude: {
      id: "geodude",
      name: "小拳石",
      art: "geodude",
      element: "fighting",
      tier: 1,
      hp: 38,
      gold: 16,
      moves: [
        { name: "落石", damage: 6 },
        { name: "变硬", block: 8 },
        { name: "地震", damage: 11 }
      ],
      pattern: [1, 0, 0, 2]
    },
    gastly: {
      id: "gastly",
      name: "鬼斯",
      art: "gastly",
      element: "dark",
      tier: 1,
      hp: 24,
      gold: 16,
      moves: [
        { name: "舌舔", damage: 5, weak: 1 },
        { name: "催眠术", weak: 2 },
        { name: "暗影球", damage: 12 }
      ],
      pattern: [0, 1, 0, 2]
    },
    // === 第二层：月见山 ===
    golbat: {
      id: "golbat",
      name: "大嘴蝠",
      art: "zubat",
      variant: "golbat",
      element: "poison",
      tier: 2,
      hp: 44,
      gold: 20,
      moves: [
        { name: "吸血", damage: 7, heal: 4 },
        { name: "剧毒牙", damage: 5, poison: 3 },
        { name: "翅膀攻击", damage: 12 }
      ],
      pattern: [0, 1, 2, 0]
    },
    machop: {
      id: "machop",
      name: "腕力",
      art: "machop",
      element: "fighting",
      tier: 2,
      hp: 46,
      gold: 19,
      moves: [
        { name: "空手劈", damage: 7 },
        { name: "健美", strength: 1 },
        { name: "地狱翻滚", damage: 15 }
      ],
      pattern: [0, 1, 0, 2]
    },
    kadabra: {
      id: "kadabra",
      name: "勇基拉",
      art: "kadabra",
      element: "psychic",
      tier: 2,
      hp: 40,
      gold: 22,
      moves: [
        { name: "念力", damage: 8 },
        { name: "冥想", strength: 1, block: 5 },
        { name: "幻象光线", damage: 14, weak: 1 }
      ],
      pattern: [0, 1, 0, 2]
    },
    haunter: {
      id: "haunter",
      name: "鬼斯通",
      art: "gastly",
      variant: "haunter",
      element: "dark",
      tier: 2,
      hp: 42,
      gold: 24,
      moves: [
        { name: "暗影拳", damage: 9 },
        { name: "诅咒", vulnerable: 2, weak: 1 },
        { name: "暗影球", damage: 16 }
      ],
      pattern: [0, 1, 0, 2]
    },
    geodude2: {
      id: "geodude2",
      name: "隆隆石",
      art: "geodude",
      variant: "graveler",
      element: "fighting",
      tier: 2,
      hp: 52,
      gold: 21,
      moves: [
        { name: "岩石爆击", damage: 4, hits: 3 },
        { name: "变硬", block: 10 },
        { name: "重踏", damage: 14, vulnerable: 1 }
      ],
      pattern: [1, 0, 2, 0]
    },
    // === 第三层：冠军之路 ===
    snorlax: {
      id: "snorlax",
      name: "卡比兽",
      art: "snorlax",
      element: "normal",
      tier: 3,
      hp: 78,
      gold: 30,
      moves: [
        { name: "泰山压顶", damage: 12 },
        { name: "睡觉", block: 10, heal: 8 },
        { name: "破坏光线", damage: 22 }
      ],
      pattern: [0, 0, 1, 2]
    },
    dragonair: {
      id: "dragonair",
      name: "哈克龙",
      art: "dragonair",
      element: "dragon",
      tier: 3,
      hp: 66,
      gold: 32,
      moves: [
        { name: "龙之怒", damage: 10 },
        { name: "龙舞", strength: 2 },
        { name: "逆鳞", damage: 7, hits: 3 }
      ],
      pattern: [0, 1, 0, 2]
    },
    alakazam: {
      id: "alakazam",
      name: "胡地",
      art: "alakazam",
      element: "psychic",
      tier: 3,
      hp: 58,
      gold: 30,
      moves: [
        { name: "精神切割", damage: 11 },
        { name: "冥想", strength: 2 },
        { name: "精神强念", damage: 18 },
        { name: "光墙", block: 12 }
      ],
      pattern: [0, 1, 0, 2, 3]
    },
    machamp: {
      id: "machamp",
      name: "怪力",
      art: "machop",
      variant: "machamp",
      element: "fighting",
      tier: 3,
      hp: 70,
      gold: 33,
      moves: [
        { name: "爆裂拳", damage: 9, hits: 2 },
        { name: "健美", strength: 1, block: 8 },
        { name: "十字劈", damage: 20 }
      ],
      pattern: [0, 1, 2, 0]
    }
  };
  var BOSSES = {
    brock: {
      id: "brock",
      name: "小刚 · 大岩蛇",
      art: "onix",
      element: "fighting",
      tier: 1,
      hp: 96,
      gold: 55,
      isBoss: true,
      bossName: "岩石道馆馆主 小刚",
      intros: "「我的岩石宝可梦，坚不可摧！」",
      moves: [
        { name: "落石", damage: 8 },
        { name: "变硬", block: 12 },
        { name: "铁尾", damage: 15 },
        { name: "岩崩", damage: 9, vulnerable: 1 }
      ],
      pattern: [1, 0, 0, 2, 0, 3]
    },
    misty: {
      id: "misty",
      name: "小霞 · 宝石海星",
      art: "starmie",
      element: "water",
      tier: 2,
      hp: 124,
      gold: 70,
      isBoss: true,
      bossName: "华蓝道馆馆主 小霞",
      intros: "「水可载舟，亦可覆舟哦～」",
      moves: [
        { name: "水枪", damage: 9 },
        { name: "冲浪", damage: 16 },
        { name: "自我再生", block: 8, heal: 10 },
        { name: "高速旋转", damage: 6, weak: 1 }
      ],
      pattern: [0, 0, 3, 1, 2, 0]
    },
    rival: {
      id: "rival",
      name: "小茂 · 伊布",
      art: "eevee",
      element: "normal",
      tier: 3,
      hp: 156,
      gold: 95,
      isBoss: true,
      bossName: "劲敌 小茂",
      intros: "「就让你看看，什么才是真正的实力！」",
      moves: [
        { name: "电光石火", damage: 8, hits: 2 },
        { name: "咬住", damage: 13 },
        { name: "影分身", block: 10, strength: 1 },
        { name: "突袭", damage: 22 },
        { name: "吼叫", weak: 1, vulnerable: 1 }
      ],
      pattern: [0, 2, 1, 0, 4, 3]
    }
  };
  var RELICS = [
    { id: "charcoal", name: "木炭", emoji: "🔥", rarity: "common", description: "火属性卡牌 +3 伤害。", effect: { type: "element_damage", element: "fire", value: 3 } },
    { id: "mystic_water", name: "神秘水滴", emoji: "💧", rarity: "common", description: "水属性卡牌 +3 伤害。", effect: { type: "element_damage", element: "water", value: 3 } },
    { id: "miracle_seed", name: "奇迹种子", emoji: "🌱", rarity: "common", description: "草属性卡牌 +3 伤害。", effect: { type: "element_damage", element: "grass", value: 3 } },
    { id: "magnet", name: "磁铁", emoji: "🧲", rarity: "common", description: "电属性卡牌 +3 伤害。", effect: { type: "element_damage", element: "electric", value: 3 } },
    { id: "silk_scarf", name: "丝绸围巾", emoji: "🧣", rarity: "common", description: "一般属性卡牌 +3 伤害。", effect: { type: "element_damage", element: "normal", value: 3 } },
    { id: "running_shoes", name: "跑步鞋", emoji: "👟", rarity: "common", description: "每场战斗第一回合多 1 点能量。", effect: { type: "first_turn_energy", value: 1 } },
    { id: "lucky_egg", name: "幸运蛋", emoji: "🥚", rarity: "common", description: "战斗结束多获得 50% 金币。", effect: { type: "gold_bonus", value: 0.5 } },
    { id: "amulet_coin", name: "护身金币", emoji: "🪙", rarity: "common", description: "战斗结束额外获得 15 金币。", effect: { type: "flat_gold", value: 15 } },
    { id: "scope_lens", name: "焦点镜", emoji: "🔍", rarity: "uncommon", description: "攻击卡 +2 伤害。", effect: { type: "attack_damage", value: 2 } },
    { id: "leftovers", name: "吃剩的东西", emoji: "🍎", rarity: "uncommon", description: "每回合开始回复 2 点HP。", effect: { type: "turn_heal", value: 2 } },
    { id: "exp_share", name: "学习装置", emoji: "📱", rarity: "uncommon", description: "每回合多抽 1 张牌。", effect: { type: "extra_draw", value: 1 } },
    { id: "shell_bell", name: "贝壳之铃", emoji: "🔔", rarity: "uncommon", description: "每打出 3 张牌回复 2 点HP。", effect: { type: "play_heal", playCount: 3, value: 2 } },
    { id: "sacred_ash", name: "圣灰", emoji: "🕯️", rarity: "uncommon", description: "每场战斗开始时获得 5 点护甲。", effect: { type: "battle_start_block", value: 5 } },
    { id: "muscle_band", name: "力量头带", emoji: "🥇", rarity: "uncommon", description: "每场战斗开始时获得 1 层力量。", effect: { type: "battle_start_strength", value: 1 } },
    { id: "sitrus_berry", name: "文柚果", emoji: "🍊", rarity: "uncommon", description: "每场战斗开始时回复 6 点HP。", effect: { type: "battle_start_heal", value: 6 } },
    { id: "quick_claw", name: "先制之爪", emoji: "🦀", rarity: "rare", description: "每场战斗第一回合多 2 点能量。", effect: { type: "first_turn_energy", value: 2 } },
    { id: "choice_band", name: "讲究头带", emoji: "🎀", rarity: "rare", description: "攻击卡 +4 伤害，但技能卡消耗 +1。", effect: { type: "choice_band", attackBonus: 4 } },
    { id: "everstone", name: "不变之石", emoji: "💎", rarity: "rare", description: "免疫虚弱和易伤。", effect: { type: "debuff_immunity" } },
    { id: "power_core", name: "能量核心", emoji: "⚡", rarity: "rare", description: "每回合能量 +1。", effect: { type: "max_energy", value: 1 } },
    { id: "thorn_shell", name: "尖刺外壳", emoji: "🌵", rarity: "rare", description: "每场战斗开始时获得 3 层荆棘。", effect: { type: "battle_start_thorns", value: 3 } },
    { id: "research_notes", name: "研究笔记", emoji: "📓", rarity: "rare", description: "战斗奖励多 1 个卡牌选项。", effect: { type: "reward_card_bonus", value: 1 } }
  ];
  var EVENTS = [
    {
      id: "mysterious_cave",
      title: "神秘洞窟",
      emoji: "🕳️",
      description: "石壁上闪着奇怪的微光。深处似乎有什么在呼吸……",
      choices: [
        { text: "进入探索（获得 1 个随机遗物，失去 10% 最大HP）", effect: { type: "relic_risk", hpCost: 0.1 } },
        { text: "谨慎离开", effect: { type: "nothing" } }
      ]
    },
    {
      id: "traveling_merchant",
      title: "旅行商人",
      emoji: "🧳",
      description: '一个背着大包的商人拦住了你。"旅行者，要来看看好东西吗？"',
      choices: [
        { text: "购买药水（-30 金币，回复 25% HP）", effect: { type: "buy_heal", cost: 30, healPercent: 0.25 } },
        { text: "购买稀有卡牌（-50 金币）", effect: { type: "buy_card", cost: 50, rarity: "rare" } },
        { text: "不了，谢谢", effect: { type: "nothing" } }
      ]
    },
    {
      id: "training_ground",
      title: "训练场",
      emoji: "🏋️",
      description: "一处废弃的训练场，器材上还留着上一位挑战者的汗水。",
      choices: [
        { text: "刻苦训练（升级一张随机卡牌，失去 5 HP）", effect: { type: "upgrade_random", hpCost: 5 } },
        { text: "轻松拉伸（获得 20 金币）", effect: { type: "random_gold", min: 20, max: 20 } }
      ]
    },
    {
      id: "abandoned_bag",
      title: "遗弃的背包",
      emoji: "🎒",
      description: "路边躺着一个被遗弃的背包，拉链半开着。",
      choices: [
        { text: "打开背包（获得 30~60 金币）", effect: { type: "random_gold", min: 30, max: 60 } },
        { text: "不理它", effect: { type: "nothing" } }
      ]
    },
    {
      id: "pokemon_center",
      title: "临时宝可梦中心",
      emoji: "🏥",
      description: "乔伊小姐在路边搭了一个临时治疗站，吉利蛋正在忙前忙后。",
      choices: [
        { text: "治疗（回复 30% HP）", effect: { type: "heal_percent", value: 0.3 } },
        { text: "深度治疗（回复全部HP，移除一张随机卡牌）", effect: { type: "full_heal_remove_card" } }
      ]
    },
    {
      id: "old_shrine",
      title: "古老神社",
      emoji: "⛩️",
      description: "一座供奉着宝可梦的古老神社，香火竟然还未熄灭。",
      choices: [
        { text: "祈祷（随机获得一张稀有卡牌）", effect: { type: "free_card", rarity: "rare" } },
        { text: "捐献金币（-25 金币，最大HP +5）", effect: { type: "max_hp_up", cost: 25, value: 5 } },
        { text: "静静离开", effect: { type: "nothing" } }
      ]
    },
    {
      id: "move_tutor",
      title: "招式教学",
      emoji: "📜",
      description: '一位老人在树下打坐。"你的宝可梦，想学点新东西吗？"',
      choices: [
        { text: "学习新招式（获得 1 张随机卡牌）", effect: { type: "free_card", rarity: "uncommon" } },
        { text: "请教心得（升级一张随机卡牌）", effect: { type: "upgrade_random", hpCost: 0 } }
      ]
    },
    {
      id: "berry_tree",
      title: "树果森林",
      emoji: "🍒",
      description: "树上结满了饱满的树果，看起来十分诱人。",
      choices: [
        { text: "摘取树果（回复 25% HP）", effect: { type: "heal_percent", value: 0.25 } },
        { text: "收集种子（获得 3 最大HP）", effect: { type: "max_hp_up", cost: 0, value: 3 } }
      ]
    }
  ];
  var FLOOR_CONFIG = [
    {
      name: "常磐森林",
      emoji: "🌲",
      theme: "forest",
      normalEnemies: ["pidgey", "rattata", "weedle", "zubat"],
      eliteEnemies: ["gastly", "geodude"],
      boss: "brock",
      rows: 7,
      nodeCount: 12
    },
    {
      name: "月见山",
      emoji: "🏔️",
      theme: "mountain",
      normalEnemies: ["geodude2", "machop", "golbat", "kadabra", "haunter"],
      eliteEnemies: ["kadabra", "haunter", "geodude2"],
      boss: "misty",
      rows: 8,
      nodeCount: 14
    },
    {
      name: "冠军之路",
      emoji: "🏆",
      theme: "champion",
      normalEnemies: ["snorlax", "dragonair", "alakazam", "machamp", "haunter"],
      eliteEnemies: ["snorlax", "dragonair", "alakazam"],
      boss: "rival",
      rows: 9,
      nodeCount: 16
    }
  ];
  function getShopCards(floor) {
    const pool = Object.keys(CARDS_DB).filter((id) => {
      const c = CARDS_DB[id];
      if (c.rarity === "basic" || c.rarity === "special") return false;
      if (floor === 0 && c.rarity === "rare") return false;
      return true;
    });
    const shuffled = pool.map((id) => ({ id, r: Math.random() })).sort((a, b) => a.r - b.r).map((o) => o.id);
    const picked = [];
    const rarityCount = { common: 0, uncommon: 0, rare: 0 };
    for (const id of shuffled) {
      const c = CARDS_DB[id];
      if (picked.length >= 5) break;
      const max = c.rarity === "rare" ? 1 : c.rarity === "uncommon" ? 2 : 3;
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
  function getCardPrice(card) {
    switch (card.rarity) {
      case "common":
        return 35 + Math.floor(Math.random() * 10);
      case "uncommon":
        return 55 + Math.floor(Math.random() * 15);
      case "rare":
        return 85 + Math.floor(Math.random() * 25);
      case "legendary":
        return 150;
      default:
        return 40;
    }
  }
  var REMOVE_CARD_COST = 55;
  var RARITY_INFO = {
    basic: { name: "基础", color: "#78909c" },
    common: { name: "普通", color: "#b0bec5" },
    uncommon: { name: "稀有", color: "#4fc3f7" },
    rare: { name: "史诗", color: "#c084fc" },
    special: { name: "特殊", color: "#ffd54f" }
  };
  var CARD_TYPE_INFO = {
    attack: { name: "攻击", color: "#ff7043" },
    skill: { name: "技能", color: "#4fc3f7" },
    power: { name: "能力", color: "#ffd54f" }
  };

  // js/game.js
  var state = {
    screen: "title",
    player: null,
    map: null,
    currentFloor: 0,
    battle: null,
    shopItems: null,
    currentEvent: null,
    rewardCards: null,
    stats: null
  };
  function initPlayer(starterId) {
    const starter = STARTERS.find((s) => s.id === starterId);
    if (!starter) return;
    state.player = {
      pokemon: {
        id: starter.id,
        name: starter.name,
        emoji: starter.emoji,
        art: starter.art || starter.id,
        element: starter.element,
        title: starter.title
      },
      hp: starter.hp,
      maxHp: starter.maxHp,
      gold: 60,
      deck: starter.starterCards.map((id) => createCard(id)),
      relics: []
    };
    state.currentFloor = 0;
    state.stats = {
      battlesWon: 0,
      elitesWon: 0,
      bossesWon: 0,
      floorsCleared: 0,
      cardsPlayed: 0,
      damageDealt: 0,
      cardsAdded: 0,
      turns: 0
    };
  }
  function addCardToDeck(card) {
    state.player.deck.push(card);
    if (state.stats) state.stats.cardsAdded++;
  }
  function removeCardFromDeck(uid) {
    const idx = state.player.deck.findIndex((c) => c.uid === uid);
    if (idx >= 0) state.player.deck.splice(idx, 1);
  }
  function addRelic(relic) {
    if (!state.player.relics.find((r) => r.id === relic.id)) {
      state.player.relics.push({ ...relic });
      return true;
    }
    return false;
  }
  function hasRelic(id) {
    return !!state.player && state.player.relics.some((r) => r.id === id);
  }
  function getRelic(id) {
    return state.player && state.player.relics.find((r) => r.id === id);
  }
  function modifyHp(amount) {
    const before = state.player.hp;
    state.player.hp = Math.max(0, Math.min(state.player.maxHp, state.player.hp + amount));
    return state.player.hp - before;
  }
  function modifyGold(amount) {
    state.player.gold = Math.max(0, state.player.gold + amount);
  }
  function getRelicBonus(type, context) {
    if (!state.player) return 0;
    let bonus = 0;
    for (const relic of state.player.relics) {
      if (relic.effect.type === type) {
        if (context && relic.effect.element && relic.effect.element !== context.element) continue;
        bonus += relic.effect.value || 0;
      }
    }
    return bonus;
  }
  function setScreen(s) {
    state.screen = s;
  }
  function nextFloor() {
    state.currentFloor++;
    if (state.stats) state.stats.floorsCleared++;
  }
  function upgradeCardSync(uid, db = CARDS_DB) {
    const card = state.player.deck.find((c) => c.uid === uid);
    if (!card || card.upgraded) return false;
    const template = db[card.id];
    if (!template || !template.up) return false;
    const upgraded = createCard(card.id, true);
    card.upgraded = true;
    card.cost = upgraded.cost;
    card.effects = upgraded.effects;
    card.keywords = upgraded.keywords;
    card.name = upgraded.name;
    card.description = upgraded.description;
    return true;
  }

  // js/battle.js
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  function addLog(text, type = "") {
    const b = state.battle;
    if (!b) return;
    b.log.push({ text, type });
    if (b.log.length > 80) b.log.shift();
  }
  function pushFx(entry) {
    if (!state.battle) return;
    state.battle.fx.push(entry);
  }
  function takeFx() {
    if (!state.battle) return [];
    const fx = state.battle.fx;
    state.battle.fx = [];
    return fx;
  }
  function drawCards(count) {
    const b = state.battle;
    let drawn = 0;
    for (let i = 0; i < count; i++) {
      if (b.hand.length >= 10) break;
      if (b.drawPile.length === 0) {
        if (b.discardPile.length === 0) break;
        b.drawPile = shuffleArray([...b.discardPile]);
        b.discardPile = [];
        addLog("弃牌堆已洗回抽牌堆。", "info");
      }
      b.hand.push(b.drawPile.pop());
      drawn++;
    }
    return drawn;
  }
  function getCardCost(card) {
    if (card.keywords && card.keywords.includes("xcost")) return "X";
    let cost = card.cost;
    if (card.type === "skill" && hasRelic("choice_band")) cost += 1;
    return cost;
  }
  function startBattle(enemyId, opts = {}) {
    const tpl = ENEMIES[enemyId] || BOSSES[enemyId];
    if (!tpl) {
      console.error("Unknown enemy:", enemyId);
      return;
    }
    const maxEnergy = 3 + getRelicBonus("max_energy", null);
    state.battle = {
      enemy: {
        ...JSON.parse(JSON.stringify(tpl)),
        currentHp: tpl.hp,
        maxHp: tpl.hp,
        block: 0,
        strength: 0,
        vulnerable: 0,
        weak: 0,
        poison: 0,
        burn: 0,
        moveIndex: 0,
        currentMove: null,
        powers: []
      },
      drawPile: [],
      hand: [],
      discardPile: [],
      exhaustPile: [],
      energy: maxEnergy,
      maxEnergy,
      block: 0,
      strength: 0,
      dexterity: 0,
      thorns: 0,
      plated: 0,
      vulnerable: 0,
      weak: 0,
      poison: 0,
      burn: 0,
      powers: [],
      futureDraw: 0,
      turn: 1,
      cardsPlayedThisTurn: 0,
      cardsPlayedTotal: 0,
      log: [],
      fx: [],
      isPlayerTurn: true,
      battleOver: false,
      won: false,
      isElite: !!opts.elite,
      nodeType: opts.nodeType || null,
      damageDealt: 0
    };
    state.battle.drawPile = state.player.deck.map((c) => ({ ...c, effects: { ...c.effects } }));
    shuffleArray(state.battle.drawPile);
    const startBlock = getRelicBonus("battle_start_block", null);
    if (startBlock) state.battle.block += startBlock;
    const startStr = getRelicBonus("battle_start_strength", null);
    if (startStr) state.battle.strength += startStr;
    const startThorns = getRelicBonus("battle_start_thorns", null);
    if (startThorns) state.battle.thorns += startThorns;
    const startHeal = getRelicBonus("battle_start_heal", null);
    if (startHeal) modifyHp(startHeal);
    const innate = [];
    for (let i = state.battle.drawPile.length - 1; i >= 0; i--) {
      const c = state.battle.drawPile[i];
      if (c.keywords && c.keywords.includes("innate")) {
        innate.push(c);
        state.battle.drawPile.splice(i, 1);
      }
    }
    innate.reverse().forEach((c) => state.battle.hand.push(c));
    state.battle.energy += getRelicBonus("first_turn_energy", null);
    drawCards(Math.max(0, 5 + getRelicBonus("extra_draw", null) - innate.length));
    updateEnemyIntent();
    addLog(`野生的 ${tpl.name} 出现了！`, "start");
    addLog("--- 你的回合 ---", "turn");
    pushFx({ kind: "battleStart", enemy: true, elite: !!state.battle.isElite, boss: !!tpl.isBoss, text: tpl.bossName || tpl.name });
    if (tpl.isBoss) {
      addLog(tpl.intros || "", "info");
      pushFx({ kind: "bossIntro", text: tpl.bossName || tpl.name });
    }
  }
  function canPlayCard(handIndex) {
    const b = state.battle;
    if (!b || b.battleOver || !b.isPlayerTurn) return false;
    const card = b.hand[handIndex];
    if (!card) return false;
    const cost = getCardCost(card);
    if (cost === "X") return b.energy >= 0;
    return b.energy >= cost;
  }
  function calcPlayerDamage(card, effects) {
    let dmg = effects.damage || 0;
    dmg += state.battle.strength * 2;
    dmg += getRelicBonus("attack_damage", null);
    dmg += getRelicBonus("element_damage", { element: card.element });
    if (card.type === "attack" && hasRelic("choice_band")) {
      dmg += getRelic("choice_band").effect.attackBonus;
    }
    const typeMult = getTypeMultiplier(card.element, state.battle.enemy.element || "normal");
    dmg = Math.floor(dmg * typeMult);
    if (state.battle.weak > 0) dmg = Math.floor(dmg * 0.75);
    if (state.battle.enemy.vulnerable > 0) dmg = Math.floor(dmg * 1.5);
    return Math.max(0, dmg);
  }
  function getCardDamagePreview(card) {
    if (!state.battle || !card) return 0;
    if (card.effects.xDamage) {
      return Math.floor((card.effects.xDamage * Math.max(1, state.battle.energy) + state.battle.strength * 2) * getTypeMultiplier(card.element, state.battle.enemy.element));
    }
    if (!card.effects.damage) return 0;
    return calcPlayerDamage(card, card.effects);
  }
  function calcEnemyDamage(move) {
    const b = state.battle;
    let dmg = move.damage || 0;
    dmg += b.enemy.strength * 2;
    if (b.enemy.weak > 0) dmg = Math.floor(dmg * 0.75);
    if (b.vulnerable > 0 && !hasRelic("everstone")) dmg = Math.floor(dmg * 1.5);
    return Math.max(0, dmg);
  }
  function playCard(handIndex) {
    const b = state.battle;
    if (!canPlayCard(handIndex)) return null;
    const card = b.hand[handIndex];
    const costDisplay = getCardCost(card);
    const cost = costDisplay === "X" ? b.energy : costDisplay;
    const energyAtPlay = b.energy;
    b.energy -= cost;
    b.hand.splice(handIndex, 1);
    b.cardsPlayedThisTurn++;
    b.cardsPlayedTotal++;
    if (state.stats) state.stats.cardsPlayed++;
    pushFx({ kind: "card", card, element: card.element, type: card.type });
    const result = applyCardEffects(card, { energyAtPlay, costDisplay });
    if (card.keywords && card.keywords.includes("exhaust")) {
      b.exhaustPile.push(card);
      addLog(`「${card.name}」被消耗了。`, "info");
    } else if (card.type === "power") {
      b.powers.push(card);
      addLog(`「${card.name}」能力生效！`, "buff");
    } else {
      b.discardPile.push(card);
    }
    if (hasRelic("shell_bell")) {
      const r = getRelic("shell_bell");
      if (b.cardsPlayedTotal % r.effect.playCount === 0) {
        const healed = modifyHp(r.effect.value);
        addLog(`🔔 贝壳之铃回复了 ${healed} HP！`, "heal");
        pushFx({ kind: "heal", amount: healed });
      }
    }
    if (b.hand.length === 0 && b.energy > 0) {
    }
    checkEnemyDeath();
    if (state.stats && result.damage > 0) state.stats.damageDealt += result.damage;
    return result;
  }
  function applyCardEffects(card, ctx2) {
    const b = state.battle;
    const e = card.effects;
    const result = { card, damage: 0, totalDamage: 0, block: 0, heal: 0, draw: 0, played: true };
    let damageValue = e.damage;
    if (e.xDamage) {
      const spent = ctx2.energyAtPlay;
      damageValue = e.xDamage * Math.max(1, spent);
      if (spent === 0) damageValue = 0;
    }
    if (damageValue) {
      const hits = e.hits || 1;
      const perHitEffects = { ...e, damage: damageValue };
      let total = 0;
      for (let h = 0; h < hits; h++) {
        if (b.enemy.currentHp <= 0) break;
        const dmg = calcPlayerDamage(card, perHitEffects);
        total += applyDamageToEnemy(dmg);
        result.damage = dmg;
        pushFx({
          kind: "enemyHit",
          damage: dmg,
          element: card.element,
          cardType: card.type,
          hit: h + 1,
          hits,
          strong: getTypeMultiplier(card.element, b.enemy.element) > 1,
          weak: getTypeMultiplier(card.element, b.enemy.element) < 1
        });
      }
      result.totalDamage = total;
      let msg = `「${card.name}」造成 ${total} 点伤害`;
      const tm = getTypeMultiplier(card.element, b.enemy.element);
      if (tm > 1) msg += "（效果拔群！）";
      else if (tm < 1) msg += "（效果不好…）";
      addLog(msg, "damage");
      if (b.enemy.currentHp <= 0) {
        checkEnemyDeath();
        return result;
      }
    }
    if (e.block) {
      const gain = e.block + b.dexterity;
      b.block += gain;
      result.block = gain;
      addLog(`获得 ${gain} 点护甲。`, "block");
      pushFx({ kind: "block", amount: gain });
    }
    if (e.heal) {
      const healed = modifyHp(e.heal);
      result.heal = healed;
      addLog(`回复 ${healed} 点HP。`, "heal");
      pushFx({ kind: "heal", amount: healed });
    }
    if (e.draw) {
      drawCards(e.draw);
      addLog(`抽了 ${e.draw} 张牌。`, "info");
      pushFx({ kind: "draw", amount: e.draw });
    }
    if (e.energy) {
      b.energy += e.energy;
      addLog(`获得 ${e.energy} 点能量。`, "buff");
      pushFx({ kind: "energy", amount: e.energy });
    }
    if (e.futureDraw) {
      b.futureDraw += e.futureDraw;
      addLog(`每回合将多抽 ${e.futureDraw} 张牌。`, "buff");
      pushFx({ kind: "buff", text: `预知未来 +${e.futureDraw}` });
    }
    if (e.selfDamage) {
      modifyHp(-e.selfDamage);
      addLog(`失去 ${e.selfDamage} 点HP。`, "damage");
      pushFx({ kind: "playerHit", damage: e.selfDamage, self: true });
      if (state.player.hp <= 0) {
        loseBattle();
        return result;
      }
    }
    if (e.selfBlockLoss) {
      b.block = Math.max(0, b.block - e.selfBlockLoss);
    }
    if (e.strength) {
      b.strength += e.strength;
      addLog(`力量 +${e.strength}！`, "buff");
      pushFx({ kind: "buff", text: `力量 +${e.strength}` });
    }
    if (e.dexterity) {
      b.dexterity += e.dexterity;
      addLog(`敏捷 +${e.dexterity}！`, "buff");
      pushFx({ kind: "buff", text: `敏捷 +${e.dexterity}` });
    }
    if (e.thorns) {
      b.thorns += e.thorns;
      addLog(`荆棘 +${e.thorns}！`, "buff");
      pushFx({ kind: "buff", text: `荆棘 +${e.thorns}` });
    }
    if (e.plated) {
      b.plated += e.plated;
      addLog(`金属化 +${e.plated}！`, "buff");
      pushFx({ kind: "buff", text: `金属化 +${e.plated}` });
    }
    if (e.vulnerable) {
      b.enemy.vulnerable += e.vulnerable;
      addLog(`${b.enemy.name} 获得 ${e.vulnerable} 层易伤。`, "debuff");
      pushFx({ kind: "debuff", text: `易伤 +${e.vulnerable}` });
    }
    if (e.weak) {
      b.enemy.weak += e.weak;
      addLog(`${b.enemy.name} 获得 ${e.weak} 层虚弱。`, "debuff");
      pushFx({ kind: "debuff", text: `虚弱 +${e.weak}` });
    }
    if (e.poison) {
      b.enemy.poison += e.poison;
      addLog(`${b.enemy.name} 获得 ${e.poison} 层中毒。`, "debuff");
      pushFx({ kind: "debuff", text: `中毒 +${e.poison}` });
    }
    if (e.burn) {
      b.enemy.burn += e.burn;
      addLog(`${b.enemy.name} 获得 ${e.burn} 层灼伤。`, "debuff");
      pushFx({ kind: "debuff", text: `灼伤 +${e.burn}` });
    }
    if (e.addCards) {
      for (const [cid, n] of Object.entries(e.addCards)) {
        for (let i = 0; i < n; i++) {
          const c = createCard(cid);
          if (c && b.hand.length < 10) b.hand.push(c);
        }
      }
      addLog("卡牌加入了手牌。", "info");
    }
    checkEnemyDeath();
    return result;
  }
  function applyDamageToEnemy(dmg) {
    const en = state.battle.enemy;
    let rem = dmg;
    let blocked = 0;
    if (en.block > 0) {
      if (en.block >= rem) {
        en.block -= rem;
        blocked = rem;
        rem = 0;
      } else {
        blocked = en.block;
        rem -= en.block;
        en.block = 0;
      }
    }
    if (rem > 0) en.currentHp = Math.max(0, en.currentHp - rem);
    if (blocked > 0) {
      addLog(`敌人的护甲抵消了 ${blocked} 点伤害。`, "block");
      pushFx({ kind: "enemyBlocked", amount: blocked });
    }
    return dmg - blocked;
  }
  function applyDamageToPlayer(dmg, opts = {}) {
    const b = state.battle;
    let rem = dmg;
    const info = { total: dmg, blocked: 0, hpLost: 0 };
    if (b.block > 0) {
      if (b.block >= rem) {
        info.blocked = rem;
        b.block -= rem;
        rem = 0;
      } else {
        info.blocked = b.block;
        rem -= b.block;
        b.block = 0;
      }
    }
    info.hpLost = rem;
    if (rem > 0) modifyHp(-rem);
    return info;
  }
  function checkEnemyDeath() {
    const b = state.battle;
    if (b.enemy.currentHp <= 0 && !b.battleOver) {
      b.battleOver = true;
      b.won = true;
      addLog(`${b.enemy.name} 被击败了！`, "victory");
      pushFx({ kind: "enemyDeath" });
      if (state.stats) {
        state.stats.battlesWon++;
        if (b.isElite) state.stats.elitesWon++;
        if (b.enemy.isBoss) state.stats.bossesWon++;
      }
    }
  }
  function loseBattle() {
    const b = state.battle;
    if (b.battleOver) return;
    b.battleOver = true;
    b.won = false;
    addLog("你被击败了…", "damage");
    pushFx({ kind: "playerDeath" });
  }
  function endPlayerTurn() {
    const b = state.battle;
    if (!b || b.battleOver || !b.isPlayerTurn) return false;
    b.isPlayerTurn = false;
    for (let i = b.hand.length - 1; i >= 0; i--) {
      const c = b.hand[i];
      if (c.keywords && c.keywords.includes("ethereal")) {
        b.hand.splice(i, 1);
        b.exhaustPile.push(c);
        addLog(`「${c.name}」消散了。`, "info");
      } else if (c.keywords && c.keywords.includes("retain")) {
      } else {
        b.hand.splice(i, 1);
        b.discardPile.push(c);
      }
    }
    if (b.vulnerable > 0) b.vulnerable--;
    if (b.weak > 0) b.weak--;
    b.block = 0;
    pushFx({ kind: "turnEnd" });
    executeEnemyTurn();
    if (state.player.hp <= 0) {
      loseBattle();
      return false;
    }
    if (b.enemy.currentHp <= 0) {
      checkEnemyDeath();
      return false;
    }
    startNewPlayerTurn();
    return true;
  }
  function executeEnemyTurn() {
    const b = state.battle;
    const enemy = b.enemy;
    const move = enemy.currentMove || enemy.moves[0];
    b.enemy.block = 0;
    pushFx({ kind: "enemyTurn", moveName: move.name, element: enemy.element });
    addLog(`${enemy.name} 使用了「${move.name}」！`, "info");
    const hits = move.hits || 1;
    let totalToPlayer = 0;
    for (let h = 0; h < hits; h++) {
      if (move.damage) {
        const dmg = calcEnemyDamage(move);
        const info = applyDamageToPlayer(dmg);
        totalToPlayer += info.hpLost;
        pushFx({
          kind: "playerHit",
          damage: dmg,
          blocked: info.blocked,
          hpLost: info.hpLost,
          element: enemy.element,
          hit: h + 1,
          hits
        });
        if (info.blocked > 0) addLog(`护甲抵消了 ${info.blocked} 点伤害。`, "block");
        if (info.hpLost > 0) addLog(`受到 ${info.hpLost} 点伤害！`, "damage");
        if (b.thorns > 0 && state.battle.enemy.currentHp > 0) {
          applyDamageToEnemy(b.thorns);
          addLog(`荆棘反弹了 ${b.thorns} 点伤害！`, "damage");
          pushFx({ kind: "thorns", amount: b.thorns });
          if (b.enemy.currentHp <= 0) {
            checkEnemyDeath();
            return;
          }
        }
        if (state.player.hp <= 0) return;
      }
    }
    if (move.block) {
      enemy.block += move.block;
      addLog(`${enemy.name} 获得 ${move.block} 点护甲。`, "block");
      pushFx({ kind: "enemyBlock", amount: move.block });
    }
    if (move.heal) {
      const healed = Math.min(enemy.maxHp - enemy.currentHp, move.heal);
      enemy.currentHp += healed;
      addLog(`${enemy.name} 回复了 ${healed} HP。`, "heal");
      pushFx({ kind: "enemyHeal", amount: healed });
    }
    if (move.strength) {
      enemy.strength += move.strength;
      addLog(`${enemy.name} 力量 +${move.strength}！`, "debuff");
      pushFx({ kind: "enemyBuff", text: `力量 +${move.strength}` });
    }
    if (move.vulnerable && !hasRelic("everstone")) {
      b.vulnerable += move.vulnerable;
      addLog(`你获得了 ${move.vulnerable} 层易伤！`, "damage");
      pushFx({ kind: "playerDebuff", text: `易伤 +${move.vulnerable}` });
    }
    if (move.weak && !hasRelic("everstone")) {
      b.weak += move.weak;
      addLog(`你获得了 ${move.weak} 层虚弱！`, "damage");
      pushFx({ kind: "playerDebuff", text: `虚弱 +${move.weak}` });
    }
    if (move.poison && !hasRelic("everstone")) {
      b.poison += move.poison;
      addLog(`你中毒了！(${move.poison} 层)`, "damage");
      pushFx({ kind: "playerDebuff", text: `中毒 +${move.poison}` });
    }
    if (move.burn && !hasRelic("everstone")) {
      b.burn += move.burn;
      addLog(`你被灼伤了！(${move.burn} 层)`, "damage");
      pushFx({ kind: "playerDebuff", text: `灼伤 +${move.burn}` });
    }
    if (enemy.vulnerable > 0) enemy.vulnerable--;
    if (enemy.weak > 0) enemy.weak--;
    enemy.moveIndex++;
    updateEnemyIntent();
    pushFx({ kind: "enemyIntent", intent: getEnemyIntent() });
  }
  function startNewPlayerTurn() {
    const b = state.battle;
    b.turn++;
    if (state.stats) state.stats.turns++;
    b.isPlayerTurn = true;
    b.cardsPlayedThisTurn = 0;
    b.block = 0;
    b.energy = b.maxEnergy;
    if (b.plated > 0) {
      b.block += b.plated;
      addLog(`金属化提供 ${b.plated} 点护甲。`, "block");
    }
    if (b.poison > 0) {
      const d = b.poison;
      state.player.hp = Math.max(0, state.player.hp - d);
      addLog(`中毒造成 ${d} 点伤害！`, "damage");
      pushFx({ kind: "playerHit", damage: d, hpLost: d, poisonTick: true });
      b.poison--;
    }
    if (b.burn > 0) {
      const d = b.burn;
      state.player.hp = Math.max(0, state.player.hp - d);
      addLog(`灼伤造成 ${d} 点伤害！`, "damage");
      pushFx({ kind: "playerHit", damage: d, hpLost: d, burnTick: true });
      b.burn--;
    }
    if (b.enemy.poison > 0) {
      const d = b.enemy.poison;
      b.enemy.currentHp = Math.max(0, b.enemy.currentHp - d);
      addLog(`${b.enemy.name} 中毒受到 ${d} 点伤害！`, "damage");
      pushFx({ kind: "enemyHit", damage: d, element: "poison", dot: true });
      b.enemy.poison--;
    }
    if (b.enemy.burn > 0) {
      const d = b.enemy.burn;
      b.enemy.currentHp = Math.max(0, b.enemy.currentHp - d);
      addLog(`${b.enemy.name} 灼伤受到 ${d} 点伤害！`, "damage");
      pushFx({ kind: "enemyHit", damage: d, element: "fire", dot: true });
      b.enemy.burn--;
    }
    if (state.player.hp <= 0) {
      loseBattle();
      return;
    }
    if (b.enemy.currentHp <= 0) {
      checkEnemyDeath();
      return;
    }
    if (hasRelic("leftovers")) {
      const v = getRelic("leftovers").effect.value;
      const healed = modifyHp(v);
      if (healed > 0) {
        addLog(`🍎 吃剩的东西回复了 ${healed} HP。`, "heal");
        pushFx({ kind: "heal", amount: healed });
      }
    }
    const n = 5 + getRelicBonus("extra_draw", null) + b.futureDraw;
    const drawn = drawCards(n);
    pushFx({ kind: "draw", amount: drawn });
    updateEnemyIntent();
    addLog(`--- 第 ${b.turn} 回合 ---`, "turn");
    pushFx({ kind: "turnStart", turn: b.turn });
  }
  function updateEnemyIntent() {
    const b = state.battle;
    const enemy = b.enemy;
    const moveIdx = enemy.pattern[enemy.moveIndex % enemy.pattern.length];
    b.enemy.currentMove = enemy.moves[moveIdx] || enemy.moves[0];
  }
  function getEnemyIntent() {
    const b = state.battle;
    if (!b || !b.enemy || !b.enemy.currentMove) return null;
    const move = b.enemy.currentMove;
    const hits = move.hits || 1;
    const dmg = move.damage ? calcEnemyDamage(move) : 0;
    const lines = [];
    let mainType = "attack";
    if (move.damage) {
      lines.push({ icon: "⚔️", text: hits > 1 ? `${dmg} × ${hits}` : `${dmg}`, cls: "atk" });
    }
    if (move.block) {
      lines.push({ icon: "🛡️", text: `${move.block}`, cls: "def" });
      if (!move.damage) mainType = "defend";
    }
    if (move.heal) {
      lines.push({ icon: "💚", text: `+${move.heal}`, cls: "def" });
      if (!move.damage) mainType = "defend";
    }
    if (move.strength) {
      lines.push({ icon: "💪", text: `+${move.strength}`, cls: "buff" });
      if (!move.damage) mainType = "buff";
    }
    if (move.vulnerable) {
      lines.push({ icon: "💔", text: `+${move.vulnerable}`, cls: "debuff" });
      if (!move.damage) mainType = "debuff";
    }
    if (move.weak) {
      lines.push({ icon: "⬇️", text: `+${move.weak}`, cls: "debuff" });
      if (!move.damage) mainType = "debuff";
    }
    if (move.poison) {
      lines.push({ icon: "☠️", text: `+${move.poison}`, cls: "dot" });
      if (!move.damage) mainType = "debuff";
    }
    if (move.burn) {
      lines.push({ icon: "🔥", text: `+${move.burn}`, cls: "dot" });
      if (!move.damage) mainType = "debuff";
    }
    return { ...move, lines, damage: dmg, hits, type: mainType, name: move.name };
  }
  function getBattleRewardGold() {
    const b = state.battle;
    if (!b || !b.enemy) return 0;
    let gold = b.enemy.gold || 15;
    if (b.isElite) gold = Math.floor(gold * 1.6);
    if (b.enemy.isBoss) gold = Math.floor(gold * 1.4);
    gold += getRelicBonus("flat_gold", null);
    return Math.floor(gold * (1 + getRelicBonus("gold_bonus", null)));
  }
  function getRewardCards(excludeIds = []) {
    const allIds = Object.keys(CARDS_DB).filter((id) => {
      const c = CARDS_DB[id];
      return c.rarity !== "basic" && c.rarity !== "special" && !excludeIds.includes(id);
    });
    const wanted = 3 + getRelicBonus("reward_card_bonus", null);
    const cards = [];
    const weighted = [];
    for (const id of allIds) {
      const r = CARDS_DB[id].rarity;
      const w = r === "rare" ? 1 : r === "uncommon" ? 3 : 5;
      for (let i = 0; i < w; i++) weighted.push(id);
    }
    let guard = 0;
    while (cards.length < wanted && guard++ < 200) {
      const id = weighted[Math.floor(Math.random() * weighted.length)];
      if (cards.find((c) => c.id === id)) continue;
      cards.push(createCard(id));
    }
    return cards;
  }

  // js/map.js
  var MAP_WIDTH = 760;
  var ROW_GAP = 104;
  var TOP_PAD = 84;
  var NODE_META = {
    battle: { icon: "⚔️", label: "战斗", color: "#ff8a65", desc: "普通战斗，获得金币与卡牌" },
    elite: { icon: "💀", label: "精英", color: "#c084fc", desc: "强力敌人，胜利后获得遗物" },
    boss: { icon: "👑", label: "BOSS", color: "#ffd54f", desc: "楼层首领，胜利后进入下一层" },
    shop: { icon: "🛒", label: "商店", color: "#4fc3f7", desc: "购买卡牌、移除卡牌" },
    rest: { icon: "🏕️", label: "休息", color: "#81c784", desc: "回复生命或升级卡牌" },
    event: { icon: "❓", label: "事件", color: "#ffb74d", desc: "未知的遭遇，风险与机遇并存" }
  };
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function makeRowTypes(r, totalRows) {
    if (r === 0) return shuffle(["battle", "battle", "battle", "event"]).slice(0, 2 + Math.floor(Math.random() * 2));
    if (r === totalRows - 1) return ["boss"];
    const t = r / (totalRows - 1);
    let pool;
    if (t < 0.28) pool = ["battle", "battle", "battle", "event", "battle"];
    else if (t < 0.52) pool = ["battle", "battle", "battle", "event", "elite", "shop"];
    else if (t < 0.76) pool = ["battle", "battle", "elite", "event", "shop", "rest"];
    else pool = ["battle", "battle", "elite", "rest", "shop", "event"];
    const count = 2 + Math.floor(Math.random() * 3);
    const types = [];
    for (let i = 0; i < count; i++) types.push(pick(pool));
    const seen = {};
    for (let i = 0; i < types.length; i++) {
      seen[types[i]] = (seen[types[i]] || 0) + 1;
      if (seen[types[i]] > 2) types[i] = "battle";
    }
    if (t < 0.3) return types.map((x) => x === "elite" ? "battle" : x);
    return types;
  }
  function generateMap(floorIndex) {
    const cfg = FLOOR_CONFIG[floorIndex];
    if (!cfg) return;
    const totalRows = cfg.rows || 7;
    const rows = [];
    let nodeId = 0;
    for (let r = 0; r < totalRows; r++) {
      const types = makeRowTypes(r, totalRows);
      const row = types.map((type, c) => {
        let enemyId = null;
        if (type === "battle") enemyId = pick(cfg.normalEnemies);
        else if (type === "elite") enemyId = pick(cfg.eliteEnemies);
        else if (type === "boss") enemyId = cfg.boss;
        return {
          id: nodeId++,
          row: r,
          col: c,
          type,
          enemyId,
          connections: [],
          incoming: [],
          visited: false,
          available: false,
          next: false,
          encounters: null
        };
      });
      rows.push(row);
    }
    const allNodes = rows.flat().filter((n) => n.type !== "boss");
    if (!allNodes.some((n) => n.type === "shop")) {
      const mid = allNodes.filter((n) => n.row > 1 && n.row < totalRows - 2);
      if (mid.length) mid[Math.floor(Math.random() * mid.length)].type = "shop";
    }
    if (!allNodes.some((n) => n.type === "rest")) {
      const late = allNodes.filter((n) => n.row >= totalRows - 3 && n.row < totalRows - 1);
      if (late.length) late[Math.floor(Math.random() * late.length)].type = "rest";
    }
    for (const n of allNodes) {
      if (n.type === "battle") n.enemyId = n.enemyId || pick(cfg.normalEnemies);
      if (n.type === "elite") n.enemyId = pick(cfg.eliteEnemies);
    }
    for (let r = 0; r < totalRows - 1; r++) {
      const cur = rows[r];
      const next = rows[r + 1];
      const norm = (node, row) => row.length <= 1 ? 0.5 : node.col / (row.length - 1);
      for (const node of cur) {
        const sorted = [...next].sort((a, b) => Math.abs(norm(a, next) - norm(node, cur)) - Math.abs(norm(b, next) - norm(node, cur)));
        const count = next.length === 1 ? 1 : Math.random() < 0.45 ? 2 : 1;
        for (let i = 0; i < Math.min(count, sorted.length); i++) {
          if (!node.connections.includes(sorted[i].id)) node.connections.push(sorted[i].id);
        }
      }
      for (const target of next) {
        if (cur.some((n) => n.connections.includes(target.id))) continue;
        const closest = [...cur].sort((a, b) => Math.abs(norm(a, cur) - norm(target, next)) - Math.abs(norm(b, cur) - norm(target, next)))[0];
        if (closest) closest.connections.push(target.id);
      }
    }
    for (let r = 0; r < totalRows - 1; r++) {
      for (const node of rows[r]) {
        for (const cid of node.connections) {
          const t = rows[r + 1].find((n) => n.id === cid);
          if (t) t.incoming.push(node.id);
        }
      }
    }
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
      height: TOP_PAD * 2 + (totalRows - 1) * ROW_GAP + 34
    };
  }
  function getNodeById(id) {
    if (!state.map) return null;
    for (const row of state.map.rows) {
      for (const node of row) if (node.id === id) return node;
    }
    return null;
  }
  function getTraversedEdges() {
    if (!state.map) return [];
    return state.map.path.slice(1).map((id, i) => [state.map.path[i], id]);
  }
  function selectNode(nodeId) {
    const node = getNodeById(nodeId);
    if (!node || !node.available || node.visited) return null;
    node.visited = true;
    node.available = false;
    node.next = false;
    state.map.currentNodeId = nodeId;
    state.map.path.push(nodeId);
    for (const n of state.map.rows[node.row]) {
      if (n.id !== nodeId) n.available = false;
    }
    for (const connId of node.connections) {
      const target = getNodeById(connId);
      if (target && !target.visited) {
        target.available = true;
        target.next = true;
      }
    }
    return node;
  }
  function isFloorComplete() {
    if (!state.map) return false;
    const bossRow = state.map.rows[state.map.rows.length - 1];
    return bossRow[0].visited;
  }
  function hasMoreFloors() {
    return state.currentFloor < FLOOR_CONFIG.length - 1;
  }
  function computeGeometry(map) {
    const width = MAP_WIDTH;
    const pos = /* @__PURE__ */ new Map();
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

  // js/art/starters.js
  var ART_STARTERS = {
    charmander: (u) => `
    <g stroke="#241c2b" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round">
      <defs>
        <linearGradient id="${u}-body" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stop-color="#ffc17a"/>
          <stop offset="0.48" stop-color="#f37f45"/>
          <stop offset="1" stop-color="#cf4f31"/>
        </linearGradient>
        <linearGradient id="${u}-belly" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fff7d9"/>
          <stop offset="0.62" stop-color="#ffe6ae"/>
          <stop offset="1" stop-color="#f2c779"/>
        </linearGradient>
        <radialGradient id="${u}-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="#ffd45e" stop-opacity="0.46"/>
          <stop offset="0.55" stop-color="#ff9a2e" stop-opacity="0.24"/>
          <stop offset="1" stop-color="#ff7a1f" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="${u}-flame" cx="52%" cy="70%" r="65%">
          <stop offset="0" stop-color="#fff6a1"/>
          <stop offset="0.45" stop-color="#ffc531"/>
          <stop offset="1" stop-color="#ff6b1c"/>
        </radialGradient>
        <linearGradient id="${u}-flamecore" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stop-color="#ffcf36"/>
          <stop offset="1" stop-color="#ffe76d"/>
        </linearGradient>
        <radialGradient id="${u}-eye" cx="38%" cy="30%" r="72%">
          <stop offset="0" stop-color="#a9fff0"/>
          <stop offset="0.45" stop-color="#45d7cf"/>
          <stop offset="1" stop-color="#127a7f"/>
        </radialGradient>
      </defs>

      <!-- 尾巴与尾焰：最底层 -->
      <circle cx="58" cy="78" r="44" fill="url(#${u}-glow)" stroke="none"/>
      <path d="M94 150 C67 161 38 151 33 128 C29 108 41 95 55 84 L65 95 C51 107 44 117 47 128 C51 141 70 145 95 134 Z"
            fill="url(#${u}-body)" stroke-width="3"/>
      <path d="M58 105 C43 101 31 90 34 77 C35 69 40 63 47 61 Q39 51 40 43 Q41 36 48 39 Q58 45 63 56 Q63 40 68 31 Q72 23 78 29 Q86 37 83 52 Q92 46 99 55 Q106 63 103 72 Q115 75 116 84 Q116 94 105 100 C101 112 88 116 79 109 C72 117 62 113 58 103 Z"
            fill="url(#${u}-flame)" stroke-width="3"/>
      <path d="M59 100 C47 97 39 89 42 80 C44 74 49 70 55 69 Q50 62 50 57 Q51 52 56 55 Q63 60 66 68 Q66 56 70 50 Q73 44 77 49 Q82 55 80 65 Q86 61 91 67 Q96 73 93 79 Q101 81 101 87 Q101 94 92 98 C89 105 80 108 74 103 C69 109 61 106 59 98 Z"
            fill="url(#${u}-flamecore)" stroke-width="2.1"/>
      <path d="M60 96 C52 93 47 88 49 83 C50 78 54 76 58 77 Q55 72 56 69 Q57 65 61 68 Q65 72 66 77 Q68 68 71 65 Q74 62 76 66 Q79 70 77 76 Q81 73 84 77 Q87 80 84 84 Q89 86 87 90 Q86 95 80 96 C78 100 72 101 68 98 C65 102 62 99 60 96 Z"
            fill="#fffef2" stroke="none" opacity="0.96"/>
      <path d="M73 127 C61 123 53 116 56 106" fill="none" stroke="#ffbb7a" stroke-width="2.2" opacity="0.55"/>

      <!-- 后腿与脚趾 -->
      <path d="M83 151 C72 155 64 166 67 177 C70 185 81 187 91 182 C99 178 102 170 100 161 L96 149 Z"
            fill="url(#${u}-body)"/>
      <path d="M120 151 C131 155 138 166 135 177 C132 185 121 187 111 182 C103 178 100 170 102 161 L106 149 Z"
            fill="url(#${u}-body)"/>
      <path d="M69 178 C64 180 63 184 67 186 C73 189 82 188 88 184" fill="none" stroke-width="2.1"/>
      <path d="M133 178 C138 180 139 184 135 186 C129 189 120 188 114 184" fill="none" stroke-width="2.1"/>
      <path d="M72 181 L74 175 M80 183 L81 176 M87 181 L87 175" fill="none" stroke-width="1.9" opacity="0.8"/>
      <path d="M130 181 L128 175 M122 183 L121 176 M115 181 L115 175" fill="none" stroke-width="1.9" opacity="0.8"/>

      <!-- 身体与奶油肚皮 -->
      <path d="M100 91 C126 91 143 112 142 139 C141 160 126 171 100 171 C74 171 59 160 58 139 C57 112 74 91 100 91 Z"
            fill="url(#${u}-body)" stroke-width="3"/>
      <path d="M101 104 C115 104 125 118 125 137 C125 153 115 164 101 164 C87 164 77 153 77 137 C77 118 87 104 101 104 Z"
            fill="url(#${u}-belly)" stroke-width="2.3"/>
      <path d="M84 129 C92 133 109 133 118 129 M81 145 C91 150 111 150 121 145" fill="none" stroke="#e7b46c" stroke-width="1.7" opacity="0.8"/>
      <path d="M137 110 C143 122 143 144 132 158 C128 162 123 166 118 168 C131 160 138 145 137 129 C137 120 134 114 130 108 Z"
            fill="#b83f2e" stroke="none" opacity="0.34"/>
      <path d="M68 108 C62 120 62 136 68 149 C58 140 56 121 63 109 Z"
            fill="#ffd7a1" stroke="none" opacity="0.42"/>

      <!-- 前肢与手指 -->
      <path d="M76 110 C66 112 58 121 59 131 C60 140 69 144 76 138 C83 133 85 122 83 114 Z"
            fill="url(#${u}-body)"/>
      <path d="M124 110 C134 112 142 121 141 131 C140 140 131 144 124 138 C117 133 115 122 117 114 Z"
            fill="url(#${u}-body)"/>
      <path d="M64 133 C65 137 68 139 71 138 M70 136 C71 140 74 141 77 140" fill="none" stroke-width="1.8"/>
      <path d="M136 133 C135 137 132 139 129 138 M130 136 C129 140 126 141 123 140" fill="none" stroke-width="1.8"/>

      <!-- 头部 -->
      <path d="M100 27 C123 27 139 42 139 62 C139 79 127 90 112 95 C106 97 102 100 100 100 C98 100 94 97 88 95 C72 90 61 79 61 61 C61 42 77 27 100 27 Z"
            fill="url(#${u}-body)" stroke-width="3.1"/>
      <path d="M137 57 C139 74 128 89 111 96 C124 85 130 74 129 61 C128 47 120 37 108 32 C124 36 135 45 137 57 Z"
            fill="#bb3e2e" stroke="none" opacity="0.3"/>
      <path d="M75 49 C82 36 96 30 108 31 C94 34 83 42 78 53 Z"
            fill="#ffd9a4" stroke="none" opacity="0.62"/>
      <ellipse cx="99" cy="82" rx="18" ry="12" fill="#ffe8b9" stroke="none" opacity="0.92"/>
      <path d="M93 80 C94 78 96 78 97 79 M103 79 C104 78 106 78 107 80" fill="none" stroke-width="1.8"/>
      <path d="M92 86 C96 90 104 90 108 86" fill="none" stroke-width="2.2"/>
      <path d="M100 86 L100 89" fill="none" stroke-width="1.8"/>
      <circle cx="76" cy="78" r="5.5" fill="#f37a61" stroke="none" opacity="0.35"/>
      <circle cx="124" cy="78" r="5.5" fill="#f37a61" stroke="none" opacity="0.35"/>

      <!-- 眼睛 -->
      <ellipse cx="84" cy="63" rx="9.4" ry="12.4" fill="#241c2b" stroke="none"/>
      <ellipse cx="116" cy="63" rx="9.4" ry="12.4" fill="#241c2b" stroke="none"/>
      <ellipse cx="85" cy="64" rx="7.2" ry="9.8" fill="url(#${u}-eye)" stroke="none"/>
      <ellipse cx="117" cy="64" rx="7.2" ry="9.8" fill="url(#${u}-eye)" stroke="none"/>
      <ellipse cx="86" cy="66" rx="3.7" ry="5.7" fill="#14383b" stroke="none"/>
      <ellipse cx="118" cy="66" rx="3.7" ry="5.7" fill="#14383b" stroke="none"/>
      <circle cx="81.5" cy="58.5" r="3.5" fill="#ffffff" stroke="none"/>
      <circle cx="113.5" cy="58.5" r="3.5" fill="#ffffff" stroke="none"/>
      <circle cx="88" cy="68" r="1.6" fill="#ffffff" stroke="none" opacity="0.95"/>
      <circle cx="120" cy="68" r="1.6" fill="#ffffff" stroke="none" opacity="0.95"/>
      <path d="M75 49 C78 46 84 45 88 47 M108 47 C113 45 119 46 123 49" fill="none" stroke-width="2.3"/>

      <!-- 边缘高光 -->
      <path d="M70 55 C76 42 88 34 101 32" fill="none" stroke="#ffe0af" stroke-width="2.4" opacity="0.65"/>
      <path d="M66 116 C63 129 65 143 73 154" fill="none" stroke="#ffd2a0" stroke-width="2.1" opacity="0.4"/>
    </g>`,
    squirtle: (u) => `
    <g stroke="#241c2b" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round">
      <defs>
        <linearGradient id="${u}-body" x1="0.1" y1="0" x2="0.7" y2="1">
          <stop offset="0" stop-color="#d4f6ff"/>
          <stop offset="0.45" stop-color="#8edcf0"/>
          <stop offset="1" stop-color="#58b6d6"/>
        </linearGradient>
        <linearGradient id="${u}-shell" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0" stop-color="#c68e5f"/>
          <stop offset="0.55" stop-color="#94603d"/>
          <stop offset="1" stop-color="#643f29"/>
        </linearGradient>
        <linearGradient id="${u}-plastron" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fff8dd"/>
          <stop offset="0.6" stop-color="#f6e4b7"/>
          <stop offset="1" stop-color="#dfc187"/>
        </linearGradient>
        <radialGradient id="${u}-eye" cx="40%" cy="28%" r="75%">
          <stop offset="0" stop-color="#ffd6ab"/>
          <stop offset="0.4" stop-color="#d98e5f"/>
          <stop offset="1" stop-color="#7b3b2b"/>
        </radialGradient>
        <linearGradient id="${u}-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#d8fbff"/>
          <stop offset="1" stop-color="#65c7ea"/>
        </linearGradient>
      </defs>

      <!-- 卷曲尾巴 -->
      <path d="M71 146 C51 135 31 144 34 159 C37 174 57 180 67 168 C74 159 67 148 56 152"
            fill="url(#${u}-body)" stroke="#241c2b" stroke-width="12.5"/>
      <path d="M71 146 C51 135 31 144 34 159 C37 174 57 180 67 168 C74 159 67 148 56 152"
            fill="none" stroke="#8edcf0" stroke-width="7.2"/>
      <path d="M55 146 C47 143 39 148 37 156 C35 164 41 170 49 170 C55 170 59 165 57 160 C55 156 50 156 48 160"
            fill="none" stroke="#4f9fbd" stroke-width="2.2" opacity="0.8"/>
      <path d="M38 151 C44 145 54 143 62 146" fill="none" stroke="#d6f8ff" stroke-width="2.1" opacity="0.7"/>

      <!-- 龟壳与六边形纹理 -->
      <ellipse cx="100" cy="131" rx="52" ry="41" fill="url(#${u}-shell)" stroke-width="3.1"/>
      <ellipse cx="100" cy="131" rx="45" ry="34.5" fill="none" stroke="#d8a873" stroke-width="4.5" opacity="0.8"/>
      <path d="M76 103 L57 109 L48 127 L55 145 L69 150 L81 133 L82 114 Z" fill="#b87c50" stroke-width="2"/>
      <path d="M124 103 L143 109 L152 127 L145 145 L131 150 L119 133 L118 114 Z" fill="#a86e46" stroke-width="2"/>
      <path d="M55 147 L69 151 L79 162 L69 170 L54 163 Z" fill="#a86f48" stroke-width="2"/>
      <path d="M145 147 L131 151 L121 162 L131 170 L146 163 Z" fill="#99603d" stroke-width="2"/>
      <path d="M87 97 L100 91 L113 97 L109 108 L91 108 Z" fill="#d3a06c" stroke-width="1.8"/>
      <path d="M64 120 L74 122 L79 130 L71 138 L61 133 Z" fill="#d5a06d" stroke-width="1.5" opacity="0.85"/>
      <path d="M136 120 L126 122 L121 130 L129 138 L139 133 Z" fill="#c58c5d" stroke-width="1.5" opacity="0.82"/>
      <path d="M57 111 C68 102 82 96 96 93" fill="none" stroke="#efc795" stroke-width="2.2" opacity="0.58"/>
      <path d="M50 146 C51 155 56 162 63 166" fill="none" stroke="#e3b987" stroke-width="2.1" opacity="0.45"/>

      <!-- 后脚 -->
      <path d="M77 161 C68 164 61 171 62 179 C63 187 76 190 87 185 C95 181 97 173 93 166 C89 161 82 160 77 161 Z"
            fill="url(#${u}-body)"/>
      <path d="M123 161 C132 164 139 171 138 179 C137 187 124 190 113 185 C105 181 103 173 107 166 C111 161 118 160 123 161 Z"
            fill="url(#${u}-body)"/>
      <path d="M69 180 L71 174 M79 183 L80 176 M87 180 L86 174" fill="none" stroke-width="1.9" opacity="0.85"/>
      <path d="M131 180 L129 174 M121 183 L120 176 M113 180 L114 174" fill="none" stroke-width="1.9" opacity="0.85"/>

      <!-- 躯干：龟壳即为躯干，腹甲覆在正面 -->
      <path d="M100 96 C86 96 74 101 66 110 C77 105 88 103 100 103 C112 103 123 105 134 110 C126 101 114 96 100 96 Z"
            fill="url(#${u}-body)" stroke-width="2.5"/>
      <path d="M100 108 C116 108 128 121 127 142 C126 158 114 166 100 166 C86 166 74 158 73 142 C72 121 84 108 100 108 Z"
            fill="url(#${u}-plastron)" stroke-width="2.4"/>
      <path d="M100 110 L100 164 M77 127 C85 131 92 132 100 132 C108 132 115 131 123 127 M75 142 C84 146 92 148 100 148 C108 148 116 146 125 142 M80 157 C87 160 94 161 100 161 C106 161 113 160 120 157"
            fill="none" stroke="#c9a569" stroke-width="1.6" opacity="0.8"/>
      <path d="M138 111 C146 123 145 146 133 160 C141 147 142 128 137 116 Z"
            fill="#4a2c1d" stroke="none" opacity="0.26"/>
      <path d="M57 113 C51 122 50 136 54 148 C48 139 49 122 55 113 Z"
            fill="#f0c996" stroke="none" opacity="0.35"/>

      <!-- 前肢 -->
      <path d="M76 118 C65 121 57 130 56 140 C56 148 63 152 70 147 C77 142 80 130 81 120 Z"
            fill="url(#${u}-body)"/>
      <path d="M124 118 C135 121 143 130 144 140 C144 148 137 152 130 147 C123 142 120 130 119 120 Z"
            fill="url(#${u}-body)"/>
      <path d="M59 138 C60 143 63 146 67 145 M64 143 C65 147 68 149 71 148" fill="none" stroke-width="1.8"/>
      <path d="M141 138 C140 143 137 146 133 145 M136 143 C135 147 132 149 129 148" fill="none" stroke-width="1.8"/>

      <!-- 头部 -->
      <path d="M100 28 C123 28 139 42 139 62 C139 80 127 92 110 96 C104 98 102 100 100 100 C98 100 95 98 89 96 C72 91 61 80 61 61 C61 42 77 28 100 28 Z"
            fill="url(#${u}-body)" stroke-width="3.1"/>
      <path d="M137 58 C139 75 128 90 111 97 C124 86 130 75 129 62 C128 48 120 38 108 32 C124 37 135 46 137 58 Z"
            fill="#3d9ec0" stroke="none" opacity="0.3"/>
      <path d="M75 48 C82 36 96 29 108 30 C94 34 82 42 78 52 Z"
            fill="#f0fdff" stroke="none" opacity="0.68"/>
      <ellipse cx="100" cy="82" rx="18" ry="12" fill="#c9f2fa" stroke="none" opacity="0.68"/>
      <path d="M94 80 C95 78 97 78 98 79 M103 79 C104 78 106 78 107 80" fill="none" stroke-width="1.8"/>
      <path d="M91 86 C96 92 105 92 110 85" fill="none" stroke-width="2.3"/>
      <path d="M91 87 C96 88 101 88 105 86" fill="none" stroke="#e58d87" stroke-width="2.6" opacity="0.8"/>
      <circle cx="74" cy="78" r="5.5" fill="#f59b98" stroke="none" opacity="0.35"/>
      <circle cx="126" cy="78" r="5.5" fill="#f59b98" stroke="none" opacity="0.35"/>

      <!-- 眼睛 -->
      <ellipse cx="83" cy="63" rx="10" ry="12.5" fill="#241c2b" stroke="none"/>
      <ellipse cx="117" cy="63" rx="10" ry="12.5" fill="#241c2b" stroke="none"/>
      <ellipse cx="84" cy="64" rx="7.6" ry="9.8" fill="url(#${u}-eye)" stroke="none"/>
      <ellipse cx="118" cy="64" rx="7.6" ry="9.8" fill="url(#${u}-eye)" stroke="none"/>
      <ellipse cx="85" cy="66" rx="3.7" ry="5.7" fill="#38201e" stroke="none"/>
      <ellipse cx="119" cy="66" rx="3.7" ry="5.7" fill="#38201e" stroke="none"/>
      <circle cx="80.5" cy="58" r="3.7" fill="#ffffff" stroke="none"/>
      <circle cx="114.5" cy="58" r="3.7" fill="#ffffff" stroke="none"/>
      <circle cx="88" cy="69" r="1.6" fill="#ffffff" stroke="none" opacity="0.9"/>
      <circle cx="122" cy="69" r="1.6" fill="#ffffff" stroke="none" opacity="0.9"/>
      <path d="M74 48 C78 45 84 44 88 46 M108 46 C114 44 120 45 125 48" fill="none" stroke-width="2.3"/>

      <!-- 水花特效 -->
      <g fill="url(#${u}-water)" stroke-width="2">
        <path d="M42 167 C38 160 40 154 46 151 C45 158 51 160 50 166 C50 171 45 172 42 167 Z" opacity="0.85"/>
        <path d="M158 171 C155 164 158 158 163 156 C162 162 167 166 164 171 C162 175 159 175 158 171 Z" opacity="0.75"/>
      </g>
      <circle cx="35" cy="163" r="3.2" fill="#c8f6ff" stroke="none" opacity="0.8"/>
      <circle cx="165" cy="179" r="2.4" fill="#c8f6ff" stroke="none" opacity="0.8"/>

      <!-- 边缘高光 -->
      <path d="M70 55 C76 41 89 33 102 31" fill="none" stroke="#effeff" stroke-width="2.5" opacity="0.7"/>
      <path d="M68 114 C62 128 64 145 73 156" fill="none" stroke="#dffbff" stroke-width="2.2" opacity="0.42"/>
    </g>`,
    bulbasaur: (u) => `
    <g stroke="#241c2b" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round">
      <defs>
        <linearGradient id="${u}-body" x1="0.1" y1="0" x2="0.7" y2="1">
          <stop offset="0" stop-color="#b8f3c5"/>
          <stop offset="0.42" stop-color="#68cf9a"/>
          <stop offset="1" stop-color="#359b70"/>
        </linearGradient>
        <linearGradient id="${u}-belly" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#e7fbd6"/>
          <stop offset="0.6" stop-color="#c7edb0"/>
          <stop offset="1" stop-color="#9fd287"/>
        </linearGradient>
        <linearGradient id="${u}-bulb" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stop-color="#b5e47e"/>
          <stop offset="0.5" stop-color="#71b956"/>
          <stop offset="1" stop-color="#3d8544"/>
        </linearGradient>
        <linearGradient id="${u}-petal" x1="0" y1="1" x2="0.3" y2="0">
          <stop offset="0" stop-color="#5ba04a"/>
          <stop offset="0.55" stop-color="#9ad36f"/>
          <stop offset="1" stop-color="#d8efa8"/>
        </linearGradient>
        <radialGradient id="${u}-eye" cx="38%" cy="28%" r="74%">
          <stop offset="0" stop-color="#ffb3a4"/>
          <stop offset="0.4" stop-color="#ef5a5c"/>
          <stop offset="1" stop-color="#a9253d"/>
        </radialGradient>
        <linearGradient id="${u}-leaf" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stop-color="#3e914f"/>
          <stop offset="1" stop-color="#8fd477"/>
        </linearGradient>
      </defs>

      <!-- 背上的鳞茎：外层叶片、花苞与花瓣 -->
      <path d="M121 124 C111 118 96 116 82 122 C73 128 67 137 65 145 C80 138 93 138 107 145 C111 137 116 130 121 124 Z"
            fill="url(#${u}-leaf)" stroke-width="2.4"/>
      <path d="M143 118 C156 106 171 104 184 110 C174 117 165 126 157 138 C152 130 148 123 143 118 Z"
            fill="url(#${u}-leaf)" stroke-width="2.4"/>
      <path d="M141 111 C150 91 164 78 180 76 C179 92 169 107 155 118 C150 115 145 113 141 111 Z"
            fill="url(#${u}-leaf)" stroke-width="2.5"/>
      <path d="M133 80 C117 66 112 46 121 31 C137 42 146 61 144 80 Z"
            fill="url(#${u}-petal)" stroke-width="2.5"/>
      <path d="M143 76 C138 52 147 31 160 23 C173 39 170 62 158 80 Z"
            fill="url(#${u}-petal)" stroke-width="2.5"/>
      <path d="M153 80 C161 56 174 44 186 45 C183 63 171 77 158 87 Z"
            fill="url(#${u}-petal)" stroke-width="2.4"/>

      <path d="M151 57 C169 57 181 73 181 91 C181 111 169 123 151 123 C133 123 121 111 121 91 C121 73 133 59 151 57 Z"
            fill="url(#${u}-bulb)" stroke-width="3"/>
      <path d="M130 84 C131 71 138 62 148 59 C137 68 131 78 131 91 C131 103 137 113 146 118 C133 114 127 101 130 84 Z"
            fill="#a9d879" stroke="none" opacity="0.58"/>
      <path d="M173 72 C180 80 183 92 180 104 C177 115 169 121 159 123 C170 114 175 102 174 90 C173 82 170 76 166 71 Z"
            fill="#2f7040" stroke="none" opacity="0.35"/>
      <path d="M139 76 C148 70 160 71 167 78 C158 84 147 84 140 80 Z" fill="#d5ee9f" stroke-width="1.9" opacity="0.88"/>
      <path d="M133 96 C141 89 152 89 160 95 C153 103 142 106 134 102 Z" fill="#a9d879" stroke-width="1.8" opacity="0.8"/>
      <path d="M145 111 C152 104 162 104 169 109 C162 116 153 118 146 115 Z" fill="#8bc766" stroke-width="1.8" opacity="0.8"/>
      <path d="M125 88 C127 75 134 66 144 61 M145 116 C153 109 159 101 162 92" fill="none" stroke="#d8efa8" stroke-width="1.8" opacity="0.58"/>
      <circle cx="142" cy="88" r="2.3" fill="#4a8f4d" stroke="none" opacity="0.85"/>
      <circle cx="168" cy="102" r="1.9" fill="#4a8f4d" stroke="none" opacity="0.8"/>
      <circle cx="153" cy="69" r="1.7" fill="#4a8f4d" stroke="none" opacity="0.8"/>

      <!-- 四肢（后肢在最底层） -->
      <path d="M71 142 C59 146 53 158 55 170 C57 180 66 184 75 180 L83 158 L81 143 Z"
            fill="url(#${u}-body)"/>
      <path d="M129 142 C141 146 147 158 145 170 C143 180 134 184 125 180 L117 158 L119 143 Z"
            fill="url(#${u}-body)"/>
      <path d="M58 174 C53 175 52 180 56 183 C62 187 70 185 75 181" fill="none" stroke-width="2.1"/>
      <path d="M142 174 C147 175 148 180 144 183 C138 187 130 185 125 181" fill="none" stroke-width="2.1"/>
      <path d="M60 177 L62 171 M68 180 L69 174 M75 177 L75 172" fill="none" stroke-width="1.8" opacity="0.8"/>
      <path d="M140 177 L138 171 M132 180 L131 174 M125 177 L125 172" fill="none" stroke-width="1.8" opacity="0.8"/>

      <!-- 躯干 -->
      <path d="M100 105 C130 105 146 123 145 145 C144 163 127 172 100 172 C73 172 56 163 55 145 C54 123 70 105 100 105 Z"
            fill="url(#${u}-body)" stroke-width="3"/>
      <path d="M100 123 C116 123 127 135 126 151 C125 163 114 169 100 169 C86 169 75 163 74 151 C73 135 84 123 100 123 Z"
            fill="url(#${u}-belly)" stroke-width="2.2" opacity="0.92"/>
      <path d="M66 118 C75 125 81 136 82 149 M136 120 C127 128 121 140 120 152" fill="none" stroke="#2f8f66" stroke-width="2" opacity="0.45"/>
      <path d="M84 112 C90 109 96 108 100 108 C92 112 87 118 84 124 Z" fill="#2d8258" stroke="none" opacity="0.55"/>
      <path d="M141 121 C146 134 144 152 133 164 C139 153 141 140 138 130 Z" fill="#267e59" stroke="none" opacity="0.3"/>
      <path d="M63 132 C58 143 60 158 68 167 C60 159 57 145 60 135 Z" fill="#d7f9cd" stroke="none" opacity="0.45"/>

      <!-- 前肢 -->
      <path d="M79 140 C70 143 65 154 67 166 C69 176 78 181 87 176 L93 154 L91 139 Z"
            fill="url(#${u}-body)"/>
      <path d="M121 140 C130 143 135 154 133 166 C131 176 122 181 113 176 L107 154 L109 139 Z"
            fill="url(#${u}-body)"/>
      <path d="M70 172 C66 174 66 178 70 181 C76 184 82 182 86 178" fill="none" stroke-width="2"/>
      <path d="M130 172 C134 174 134 178 130 181 C124 184 118 182 114 178" fill="none" stroke-width="2"/>
      <path d="M71 177 L73 171 M79 180 L80 174 M86 177 L86 171" fill="none" stroke-width="1.8" opacity="0.82"/>
      <path d="M129 177 L127 171 M121 180 L120 174 M114 177 L114 171" fill="none" stroke-width="1.8" opacity="0.82"/>

      <!-- 头部 -->
      <path d="M98 30 C121 30 138 43 139 62 C140 78 130 89 116 94 C109 97 103 99 99 99 C95 99 90 97 83 94 C68 88 58 77 58 61 C58 43 76 30 98 30 Z"
            fill="url(#${u}-body)" stroke-width="3.1"/>
      <path d="M65 48 C56 43 52 34 56 27 C64 30 70 37 74 46 Z" fill="url(#${u}-body)" stroke-width="2.5"/>
      <path d="M129 45 C135 38 142 34 148 35 C147 43 142 51 136 56 Z" fill="url(#${u}-body)" stroke-width="2.5"/>
      <path d="M137 58 C139 74 129 89 113 95 C126 84 131 73 130 61 C129 47 120 38 108 33 C124 37 135 46 137 58 Z"
            fill="#2c8e65" stroke="none" opacity="0.28"/>
      <path d="M73 49 C81 36 94 29 107 30 C93 34 82 42 78 53 Z" fill="#e9ffdc" stroke="none" opacity="0.58"/>

      <!-- 额头深绿色斑点 -->
      <path d="M83 43 C87 39 93 39 96 42 C97 48 93 52 88 51 C84 50 81 47 83 43 Z" fill="#2c805a" stroke="none" opacity="0.92"/>
      <path d="M103 40 C108 37 114 39 115 44 C115 49 110 52 106 50 C102 48 100 44 103 40 Z" fill="#2c805a" stroke="none" opacity="0.92"/>
      <path d="M92 53 C96 50 101 51 102 55 C102 59 98 61 95 59 C92 58 90 55 92 53 Z" fill="#2c805a" stroke="none" opacity="0.85"/>
      <path d="M117 56 C120 54 124 55 124 58 C124 61 121 62 119 61 C117 60 116 57 117 56 Z" fill="#2c805a" stroke="none" opacity="0.8"/>

      <ellipse cx="99" cy="82" rx="19" ry="12" fill="#dcf8cb" stroke="none" opacity="0.72"/>
      <path d="M92 80 C94 78 96 78 97 80 M102 80 C104 78 106 78 107 80" fill="none" stroke-width="1.8"/>
      <path d="M89 85 C95 92 106 91 111 83" fill="none" stroke-width="2.3"/>
      <path d="M89 87 C94 89 100 89 105 86" fill="none" stroke="#e08f87" stroke-width="2.5" opacity="0.7"/>
      <circle cx="73" cy="77" r="5.8" fill="#f3a49b" stroke="none" opacity="0.3"/>
      <circle cx="127" cy="77" r="5.8" fill="#f3a49b" stroke="none" opacity="0.3"/>

      <!-- 红色眼睛 -->
      <ellipse cx="82" cy="63" rx="9.5" ry="12.5" fill="#241c2b" stroke="none"/>
      <ellipse cx="116" cy="63" rx="9.5" ry="12.5" fill="#241c2b" stroke="none"/>
      <ellipse cx="83" cy="64" rx="7.2" ry="9.7" fill="url(#${u}-eye)" stroke="none"/>
      <ellipse cx="117" cy="64" rx="7.2" ry="9.7" fill="url(#${u}-eye)" stroke="none"/>
      <ellipse cx="84" cy="66" rx="3.4" ry="5.4" fill="#561424" stroke="none"/>
      <ellipse cx="118" cy="66" rx="3.4" ry="5.4" fill="#561424" stroke="none"/>
      <circle cx="79.5" cy="58.5" r="3.5" fill="#ffffff" stroke="none"/>
      <circle cx="113.5" cy="58.5" r="3.5" fill="#ffffff" stroke="none"/>
      <circle cx="87" cy="69" r="1.5" fill="#ffffff" stroke="none" opacity="0.92"/>
      <circle cx="121" cy="69" r="1.5" fill="#ffffff" stroke="none" opacity="0.92"/>
      <path d="M73 48 C77 45 82 45 86 47 M110 47 C115 45 120 46 124 49" fill="none" stroke-width="2.2"/>

      <!-- 边缘高光 -->
      <path d="M68 54 C75 40 88 32 102 31" fill="none" stroke="#e4ffe0" stroke-width="2.4" opacity="0.62"/>
      <path d="M61 123 C56 136 59 151 67 162" fill="none" stroke="#dcfbd3" stroke-width="2.1" opacity="0.4"/>
    </g>`,
    eevee: (u) => `
    <g stroke="#241c2b" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round">
      <defs>
        <linearGradient id="${u}-fur" x1="0.1" y1="0" x2="0.7" y2="1">
          <stop offset="0" stop-color="#f2d8b2"/>
          <stop offset="0.5" stop-color="#d6aa77"/>
          <stop offset="1" stop-color="#b07d50"/>
        </linearGradient>
        <linearGradient id="${u}-cream" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stop-color="#fffdf0"/>
          <stop offset="0.6" stop-color="#f7e8c8"/>
          <stop offset="1" stop-color="#e7cea3"/>
        </linearGradient>
        <linearGradient id="${u}-tail" x1="0.2" y1="1" x2="0.8" y2="0">
          <stop offset="0" stop-color="#b98555"/>
          <stop offset="0.55" stop-color="#d4a572"/>
          <stop offset="1" stop-color="#edceb0"/>
        </linearGradient>
        <linearGradient id="${u}-ear" x1="0" y1="1" x2="0.4" y2="0">
          <stop offset="0" stop-color="#e7a5a0"/>
          <stop offset="1" stop-color="#f7c9c0"/>
        </linearGradient>
        <radialGradient id="${u}-eye" cx="38%" cy="28%" r="74%">
          <stop offset="0" stop-color="#fff2b2"/>
          <stop offset="0.42" stop-color="#e9b244"/>
          <stop offset="1" stop-color="#9b5d16"/>
        </radialGradient>
        <linearGradient id="${u}-paw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#e7c69e"/>
          <stop offset="1" stop-color="#c79a6b"/>
        </linearGradient>
      </defs>

      <!-- 超大蓬松尾巴 -->
      <path d="M119 151 C136 161 157 159 170 146 C183 133 181 115 168 106 C176 92 167 77 152 79 C149 64 131 61 121 72 C109 65 97 76 102 88 C91 96 95 111 107 116 C101 130 110 143 123 142 C119 146 117 150 119 151 Z"
            fill="url(#${u}-tail)" stroke-width="3.1"/>
      <path d="M152 79 C149 64 131 61 121 72 C130 76 139 83 144 92 C149 104 160 110 170 104 C178 98 178 86 170 80 C165 75 158 75 152 79 Z"
            fill="url(#${u}-cream)" stroke-width="2.7"/>
      <path d="M133 75 C141 69 152 70 161 76 M170 85 C174 90 173 97 167 102" fill="none" stroke="#d5b789" stroke-width="1.8" opacity="0.55"/>
      <path d="M128 90 C135 86 145 87 151 92 C142 98 134 97 128 93 M112 111 C121 105 132 105 140 111" fill="none" stroke="#f4dfc0" stroke-width="2" opacity="0.5"/>
      <path d="M165 110 C172 116 174 127 169 137 M159 121 C165 127 163 139 157 145 M151 133 C157 140 154 150 147 154" fill="none" stroke="#9c7048" stroke-width="2.1" opacity="0.5"/>
      <path d="M109 121 C105 131 108 141 115 147" fill="none" stroke="#f2ddbe" stroke-width="2.1" opacity="0.55"/>
      <path d="M170 146 C175 140 178 133 178 126" fill="none" stroke="#f5e2c4" stroke-width="2.2" opacity="0.48"/>

      <!-- 后肢 -->
      <path d="M68 139 C53 147 48 161 55 173 C62 184 76 185 83 173 L86 150 Z"
            fill="url(#${u}-fur)"/>
      <path d="M132 139 C147 147 152 161 145 173 C138 184 124 185 117 173 L114 150 Z"
            fill="url(#${u}-fur)"/>
      <path d="M55 174 C49 177 50 183 56 186 C64 189 74 187 79 181" fill="none" stroke-width="2.1"/>
      <path d="M145 174 C151 177 150 183 144 186 C136 189 126 187 121 181" fill="none" stroke-width="2.1"/>
      <path d="M58 180 L60 174 M65 183 L66 176 M73 180 L73 174" fill="none" stroke-width="1.8" opacity="0.8"/>
      <path d="M142 180 L140 174 M135 183 L134 176 M127 180 L127 174" fill="none" stroke-width="1.8" opacity="0.8"/>

      <!-- 躯干 -->
      <path d="M100 104 C122 104 134 119 133 142 C132 159 119 169 100 169 C81 169 68 159 67 142 C66 119 78 104 100 104 Z"
            fill="url(#${u}-fur)" stroke-width="3"/>
      <path d="M100 118 C115 118 126 131 126 148 C126 160 115 168 100 168 C85 168 74 160 74 148 C74 131 85 118 100 118 Z"
            fill="url(#${u}-cream)" stroke="none" opacity="0.62"/>
      <path d="M132 114 C138 127 136 145 126 158 C132 147 133 133 129 122 Z" fill="#966640" stroke="none" opacity="0.3"/>
      <path d="M68 114 C62 126 63 143 72 156 C66 145 65 130 69 120 Z" fill="#f9e5c5" stroke="none" opacity="0.48"/>

      <!-- 前肢与爪子 -->
      <path d="M82 135 C73 141 70 153 74 165 C78 176 88 180 96 173 L98 148 L94 134 Z"
            fill="url(#${u}-fur)"/>
      <path d="M118 135 C127 141 130 153 126 165 C122 176 112 180 104 173 L102 148 L106 134 Z"
            fill="url(#${u}-fur)"/>
      <path d="M76 167 C72 170 73 175 78 178 C84 181 91 179 94 174" fill="none" stroke-width="2"/>
      <path d="M124 167 C128 170 127 175 122 178 C116 181 109 179 106 174" fill="none" stroke-width="2"/>
      <path d="M78 174 L80 168 M85 177 L86 171 M91 174 L91 168" fill="none" stroke-width="1.8" opacity="0.82"/>
      <path d="M122 174 L120 168 M115 177 L114 171 M109 174 L109 168" fill="none" stroke-width="1.8" opacity="0.82"/>

      <!-- 颈部蓬松长毛 -->
      <path d="M66 98 C67 89 78 85 86 92 C89 83 100 81 106 89 C113 81 126 84 129 94 C140 93 145 102 139 110 C142 120 134 126 127 121 C128 130 118 134 112 126 C111 135 100 137 95 128 C92 136 81 136 79 127 C73 134 64 131 64 122 C57 126 51 119 54 112 C58 105 62 101 66 98 Z"
            fill="url(#${u}-cream)" stroke-width="3"/>
      <path d="M68 102 C75 108 78 114 77 120 M87 92 C89 101 89 109 87 117 M104 89 C103 99 105 109 108 117 M122 92 C119 101 119 109 122 117 M138 101 C133 108 131 114 132 120"
            fill="none" stroke="#d5b789" stroke-width="1.8" opacity="0.65"/>

      <!-- 耳朵 -->
      <path d="M77 48 C66 36 55 20 45 19 C35 19 38 34 45 48 C50 58 60 69 73 74 Z"
            fill="url(#${u}-fur)" stroke-width="2.9"/>
      <path d="M72 49 C64 38 56 28 49 25 C45 30 50 41 56 51 C61 58 67 64 72 68 Z"
            fill="url(#${u}-ear)" stroke-width="2"/>
      <path d="M125 45 C132 28 141 16 150 18 C159 20 155 37 148 51 C142 62 134 70 126 74 Z"
            fill="url(#${u}-fur)" stroke-width="2.9"/>
      <path d="M127 50 C134 37 141 26 148 24 C151 31 146 43 140 53 C136 60 131 65 126 68 Z"
            fill="url(#${u}-ear)" stroke-width="2"/>
      <path d="M51 32 C54 39 59 48 65 56 M145 32 C141 40 136 49 130 56" fill="none" stroke="#e6b9ad" stroke-width="1.7" opacity="0.8"/>

      <!-- 头部 -->
      <path d="M99 30 C121 30 137 43 137 62 C137 79 128 89 113 95 C106 97 102 99 99 99 C96 99 92 97 85 94 C70 88 61 78 61 62 C61 43 77 30 99 30 Z"
            fill="url(#${u}-fur)" stroke-width="3.1"/>
      <path d="M95 24 C96 18 101 16 104 20 C108 15 114 17 113 24 C117 24 120 27 119 31 C114 33 106 33 99 31 C96 30 94 27 95 24 Z"
            fill="url(#${u}-fur)" stroke-width="2.3"/>
      <path d="M135 57 C137 73 127 88 112 95 C125 84 130 73 129 61 C128 47 120 38 108 33 C124 37 133 46 135 57 Z"
            fill="#96633f" stroke="none" opacity="0.28"/>
      <path d="M75 47 C82 36 95 30 107 30 C94 34 82 42 78 52 Z" fill="#ffebcd" stroke="none" opacity="0.65"/>
      <ellipse cx="99" cy="81" rx="17" ry="11" fill="#fbedd2" stroke="none" opacity="0.9"/>
      <path d="M96 77 C98 75 101 75 103 77 C103 80 101 82 99 82 C97 82 95 80 96 77 Z" fill="#4b3230" stroke-width="1.6"/>
      <path d="M99 82 C99 85 97 87 94 87 M99 82 C99 85 101 87 104 87 M99 86 C101 89 104 89 106 87" fill="none" stroke-width="2"/>
      <path d="M88 81 C85 82 83 81 81 79 M110 81 C113 82 115 81 117 79" fill="none" stroke-width="1.6" opacity="0.7"/>
      <circle cx="74" cy="76" r="5.2" fill="#efa39b" stroke="none" opacity="0.3"/>
      <circle cx="125" cy="76" r="5.2" fill="#efa39b" stroke="none" opacity="0.3"/>

      <!-- 琥珀色眼睛 -->
      <ellipse cx="82" cy="62" rx="9.6" ry="12.8" fill="#241c2b" stroke="none"/>
      <ellipse cx="116" cy="62" rx="9.6" ry="12.8" fill="#241c2b" stroke="none"/>
      <ellipse cx="83" cy="63" rx="7.3" ry="10" fill="url(#${u}-eye)" stroke="none"/>
      <ellipse cx="117" cy="63" rx="7.3" ry="10" fill="url(#${u}-eye)" stroke="none"/>
      <ellipse cx="84" cy="65" rx="3.5" ry="5.6" fill="#51331b" stroke="none"/>
      <ellipse cx="118" cy="65" rx="3.5" ry="5.6" fill="#51331b" stroke="none"/>
      <circle cx="79" cy="57" r="3.8" fill="#ffffff" stroke="none"/>
      <circle cx="113" cy="57" r="3.8" fill="#ffffff" stroke="none"/>
      <circle cx="87" cy="69" r="1.7" fill="#ffffff" stroke="none" opacity="0.94"/>
      <circle cx="121" cy="69" r="1.7" fill="#ffffff" stroke="none" opacity="0.94"/>
      <path d="M72 47 C77 44 82 44 87 46 M111 46 C116 44 121 45 126 48" fill="none" stroke-width="2.2"/>

      <!-- 边缘高光 -->
      <path d="M70 54 C76 41 88 33 102 31" fill="none" stroke="#fff3d9" stroke-width="2.4" opacity="0.7"/>
      <path d="M69 114 C64 126 65 141 73 154" fill="none" stroke="#f9e8cb" stroke-width="2.1" opacity="0.42"/>
    </g>`
  };

  // js/art/forest.js
  var ART_FOREST = {
    pidgey: (u) => `
    <g>
      <defs>
        <linearGradient id="${u}-pg-body" x1="0.15" y1="0" x2="0.8" y2="1">
          <stop offset="0" stop-color="#dca365"/>
          <stop offset="0.5" stop-color="#b87c3f"/>
          <stop offset="1" stop-color="#7c4a1d"/>
        </linearGradient>
        <linearGradient id="${u}-pg-cream" x1="0.25" y1="0" x2="0.75" y2="1">
          <stop offset="0" stop-color="#fff8e0"/>
          <stop offset="0.55" stop-color="#f4e0b0"/>
          <stop offset="1" stop-color="#d9ba7e"/>
        </linearGradient>
        <linearGradient id="${u}-pg-wing" x1="0" y1="0.1" x2="0.9" y2="1">
          <stop offset="0" stop-color="#c98d51"/>
          <stop offset="0.5" stop-color="#99622e"/>
          <stop offset="1" stop-color="#5c3712"/>
        </linearGradient>
        <linearGradient id="${u}-pg-beak" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stop-color="#ffd3d5"/>
          <stop offset="0.55" stop-color="#eda1a9"/>
          <stop offset="1" stop-color="#bf6873"/>
        </linearGradient>
        <radialGradient id="${u}-pg-shade" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stop-color="#4d2c0c" stop-opacity="0.55"/>
          <stop offset="1" stop-color="#4d2c0c" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="${u}-pg-glow" cx="0.4" cy="0.32" r="0.62">
          <stop offset="0" stop-color="#fff4d9" stop-opacity="0.9"/>
          <stop offset="1" stop-color="#fff4d9" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <g fill="none" stroke="#8dc4a8" stroke-width="2.6" stroke-linecap="round" opacity="0.5">
        <path d="M 20 150 C 32 140 44 142 54 150"/>
        <path d="M 14 166 C 28 154 46 156 58 166"/>
        <path d="M 168 158 C 176 150 182 150 186 154"/>
      </g>

      <g stroke="#241c2b" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round">
        <path d="M 126 148 C 144 144 158 152 162 166 C 150 160 138 160 126 165 Z" fill="url(#${u}-pg-wing)"/>
        <path d="M 128 160 C 144 158 155 165 157 176 C 147 170 137 170 127 174 Z" fill="url(#${u}-pg-wing)"/>
      </g>

      <g stroke="#241c2b" stroke-width="2.8" stroke-linejoin="round">
        <path d="M 94 50 C 88 37 77 29 64 27 C 76 33 86 40 88 54 Z" fill="url(#${u}-pg-body)"/>
        <path d="M 104 48 C 105 34 113 24 125 21 C 120 32 118 40 116 50 Z" fill="url(#${u}-pg-body)"/>
        <path d="M 88 46 C 80 40 71 36 60 36 C 71 40 80 46 85 54 Z" fill="url(#${u}-pg-wing)" stroke-width="2.2"/>
      </g>

      <g stroke="#241c2b" stroke-width="5.2" fill="none" stroke-linecap="round">
        <path d="M 88 158 L 88 174 M 88 174 L 79 181 M 88 174 L 88 182 M 88 174 L 97 181"/>
        <path d="M 114 158 L 114 174 M 114 174 L 105 181 M 114 174 L 114 182 M 114 174 L 123 181"/>
      </g>
      <g stroke="#eaa95c" stroke-width="2.4" fill="none" stroke-linecap="round">
        <path d="M 88 158 L 88 174 M 88 174 L 79 181 M 88 174 L 88 182 M 88 174 L 97 181"/>
        <path d="M 114 158 L 114 174 M 114 174 L 105 181 M 114 174 L 114 182 M 114 174 L 123 181"/>
      </g>

      <g stroke="#241c2b" stroke-width="2.9" stroke-linejoin="round" stroke-linecap="round">
        <path d="M 72 104 C 56 108 48 124 50 142 C 56 149 63 149 66 143 C 70 150 77 149 79 142 C 84 146 88 141 87 133 C 88 118 82 106 72 104 Z" fill="url(#${u}-pg-wing)"/>
        <g fill="none" stroke="#4a2c0e" stroke-width="1.9" opacity="0.6">
          <path d="M 70 112 C 62 120 58 130 59 140"/>
          <path d="M 78 116 C 71 124 68 132 69 142"/>
        </g>
      </g>

      <g stroke="#241c2b" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
        <ellipse cx="100" cy="126" rx="40" ry="38" fill="url(#${u}-pg-body)"/>
        <ellipse cx="126" cy="148" rx="24" ry="20" fill="url(#${u}-pg-shade)" stroke="none"/>
        <ellipse cx="100" cy="133" rx="26" ry="27" fill="url(#${u}-pg-cream)" stroke="none"/>
        <ellipse cx="100" cy="133" rx="26" ry="27" fill="none" stroke="#cba76a" stroke-width="1.8" opacity="0.8"/>
        <g fill="none" stroke="#cba76a" stroke-width="2" opacity="0.7">
          <path d="M 88 138 C 93 143 98 145 103 145"/>
          <path d="M 94 152 C 99 156 104 157 109 156"/>
        </g>
      </g>

      <g stroke="#241c2b" stroke-width="2.9" stroke-linejoin="round" stroke-linecap="round">
        <path d="M 130 104 C 146 108 154 124 152 142 C 146 149 139 149 136 143 C 132 150 125 149 123 142 C 118 146 114 141 115 133 C 114 118 120 106 130 104 Z" fill="url(#${u}-pg-wing)"/>
        <g fill="none" stroke="#4a2c0e" stroke-width="1.9" opacity="0.6">
          <path d="M 132 112 C 140 120 144 130 143 140"/>
          <path d="M 124 116 C 131 124 134 132 133 142"/>
        </g>
      </g>

      <circle cx="100" cy="78" r="38" fill="url(#${u}-pg-body)" stroke="#241c2b" stroke-width="3"/>
      <path d="M 66 88 C 66 62 82 50 100 50 C 120 50 134 62 136 84 C 138 102 126 112 106 112 C 86 112 66 104 66 88 Z"
            fill="url(#${u}-pg-cream)" stroke="#c9a86c" stroke-width="1.8" stroke-linejoin="round"/>

      <g>
        <ellipse cx="84" cy="78" rx="10.5" ry="12" fill="#fdf9ee" stroke="#241c2b" stroke-width="2.4"/>
        <ellipse cx="110" cy="74" rx="10.5" ry="12" fill="#fdf9ee" stroke="#241c2b" stroke-width="2.4"/>
        <ellipse cx="86" cy="80" rx="7.4" ry="9" fill="#2a2038"/>
        <ellipse cx="112" cy="76" rx="7.4" ry="9" fill="#2a2038"/>
        <circle cx="82.5" cy="74.5" r="3.1" fill="#ffffff"/>
        <circle cx="108.5" cy="70.5" r="3.1" fill="#ffffff"/>
        <circle cx="89.5" cy="84.5" r="1.5" fill="#ffffff" opacity="0.9"/>
        <circle cx="115.5" cy="80.5" r="1.5" fill="#ffffff" opacity="0.9"/>
      </g>

      <g stroke="#241c2b" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">
        <path d="M 120 78 C 132 76 143 82 149 90 C 141 96 130 98 119 96 Z" fill="url(#${u}-pg-beak)"/>
        <path d="M 119 98 C 129 98 139 96 146 90 C 141 100 130 104 119 103 Z" fill="url(#${u}-pg-beak)"/>
        <path d="M 125 87 C 132 87 138 88 143 89" fill="none" stroke="#8f4a54" stroke-width="1.6" opacity="0.7"/>
      </g>

      <g stroke="#241c2b" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.5">
        <path d="M 64 70 C 74 64 86 62 96 64"/>
        <path d="M 68 62 C 78 56 90 54 100 56"/>
      </g>
      <ellipse cx="90" cy="110" rx="28" ry="18" fill="url(#${u}-pg-glow)" opacity="0.35"/>
      <ellipse cx="82" cy="58" rx="16" ry="10" fill="url(#${u}-pg-glow)" opacity="0.3"/>
    </g>`,
    rattata: (u) => `
    <g>
      <defs>
        <linearGradient id="${u}-rt-body" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stop-color="#bd8ddb"/>
          <stop offset="0.5" stop-color="#9163b6"/>
          <stop offset="1" stop-color="#5a3875"/>
        </linearGradient>
        <linearGradient id="${u}-rt-cream" x1="0.25" y1="0" x2="0.75" y2="1">
          <stop offset="0" stop-color="#fdf4dc"/>
          <stop offset="0.6" stop-color="#f0ddb4"/>
          <stop offset="1" stop-color="#d3b98a"/>
        </linearGradient>
        <linearGradient id="${u}-rt-ear" x1="0.2" y1="0" x2="0.7" y2="1">
          <stop offset="0" stop-color="#f2adc9"/>
          <stop offset="0.6" stop-color="#d97ba4"/>
          <stop offset="1" stop-color="#a94f79"/>
        </linearGradient>
        <linearGradient id="${u}-rt-snout" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0" stop-color="#f8eacd"/>
          <stop offset="1" stop-color="#dcc192"/>
        </linearGradient>
        <radialGradient id="${u}-rt-shade" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stop-color="#33204a" stop-opacity="0.6"/>
          <stop offset="1" stop-color="#33204a" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="${u}-rt-glow" cx="0.4" cy="0.3" r="0.6">
          <stop offset="0" stop-color="#f7ecff" stop-opacity="0.85"/>
          <stop offset="1" stop-color="#f7ecff" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <g fill="none" stroke="#9bbf9a" stroke-width="2.4" stroke-linecap="round" opacity="0.45">
        <path d="M 18 144 C 28 134 38 134 46 140"/>
        <path d="M 12 160 C 24 148 40 148 50 156"/>
      </g>

      <g fill="none" stroke-linecap="round">
        <path d="M 76 154 C 54 166 30 162 24 142 C 19 124 32 110 45 117 C 56 123 53 137 42 137"
              stroke="#241c2b" stroke-width="8"/>
        <path d="M 76 154 C 54 166 30 162 24 142 C 19 124 32 110 45 117 C 56 123 53 137 42 137"
              stroke="#a97bcd" stroke-width="4.2"/>
      </g>

      <g stroke="#241c2b" stroke-width="2.7" stroke-linejoin="round" stroke-linecap="round">
        <path d="M 76 52 C 68 34 70 22 82 22 C 94 26 100 40 100 54 Z" fill="url(#${u}-rt-body)"/>
        <path d="M 81 48 C 76 36 78 28 84 28 C 90 32 94 42 94 52 Z" fill="url(#${u}-rt-ear)" stroke-width="2.2"/>
        <path d="M 114 50 C 120 28 132 16 142 22 C 152 30 146 50 136 60 Z" fill="url(#${u}-rt-body)"/>
        <path d="M 118 48 C 124 32 132 24 138 28 C 143 34 140 46 134 56 Z" fill="url(#${u}-rt-ear)" stroke-width="2.2"/>
      </g>

      <g stroke="#241c2b" stroke-width="4.8" fill="none" stroke-linecap="round">
        <path d="M 86 164 L 86 176 M 86 176 L 77 182 M 86 176 L 86 182 M 86 176 L 95 181"/>
        <path d="M 116 164 L 116 176 M 116 176 L 107 182 M 116 176 L 116 182 M 116 176 L 125 181"/>
      </g>
      <g stroke="#c79fdd" stroke-width="2.2" fill="none" stroke-linecap="round">
        <path d="M 86 164 L 86 176 M 86 176 L 77 182 M 86 176 L 86 182 M 86 176 L 95 181"/>
        <path d="M 116 164 L 116 176 M 116 176 L 107 182 M 116 176 L 116 182 M 116 176 L 125 181"/>
      </g>

      <g stroke="#241c2b" stroke-width="2.9" stroke-linejoin="round" stroke-linecap="round">
        <path d="M 100 92 C 76 92 68 112 68 138 C 68 158 82 168 100 168 C 118 168 132 158 132 138 C 132 112 124 92 100 92 Z" fill="url(#${u}-rt-body)"/>
        <ellipse cx="120" cy="150" rx="22" ry="19" fill="url(#${u}-rt-shade)" stroke="none"/>
        <path d="M 100 116 C 86 116 80 128 80 142 C 80 156 89 163 100 163 C 111 163 120 156 120 142 C 120 128 114 116 100 116 Z" fill="url(#${u}-rt-cream)" stroke="none"/>
        <path d="M 100 116 C 86 116 80 128 80 142 C 80 156 89 163 100 163 C 111 163 120 156 120 142 C 120 128 114 116 100 116 Z" fill="none" stroke="#c8a97b" stroke-width="1.8" opacity="0.8"/>
      </g>

      <g stroke="#241c2b" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round">
        <path d="M 74 114 C 64 122 62 136 68 146 C 72 152 80 151 82 144 C 84 136 82 122 76 116 Z" fill="url(#${u}-rt-body)"/>
        <path d="M 68 142 L 62 147 M 71 147 L 67 154" fill="none" stroke-width="2.2"/>
        <path d="M 126 106 C 136 112 139 126 134 138 C 130 146 122 144 120 137 C 118 128 120 112 126 106 Z" fill="url(#${u}-rt-body)"/>
        <path d="M 132 136 L 139 141 M 129 142 L 131 150" fill="none" stroke-width="2.2"/>
      </g>

      <circle cx="98" cy="70" r="34" fill="url(#${u}-rt-body)" stroke="#241c2b" stroke-width="3"/>

      <g stroke="#241c2b" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">
        <path d="M 106 70 C 118 62 133 67 139 76 C 145 85 140 95 129 96 C 117 97 105 90 104 81 Z" fill="url(#${u}-rt-snout)"/>
        <path d="M 138 80 C 143 80 146 84 144 88 C 142 91 138 91 136 89 Z" fill="#e58aa6" stroke-width="2.2"/>
        <path d="M 121 92 L 121 103 C 121 107 127 107 127 103 L 127 92 Z" fill="#fffdf2"/>
        <path d="M 128 92 L 128 103 C 128 107 134 107 134 103 L 134 92 Z" fill="#fffdf2"/>
        <path d="M 104 84 C 111 89 118 90 124 88" fill="none" stroke="#8f4a6a" stroke-width="1.8" opacity="0.7"/>
      </g>

      <g>
        <ellipse cx="85" cy="66" rx="9.5" ry="10.5" fill="#fff8ee" stroke="#241c2b" stroke-width="2.4"/>
        <ellipse cx="108" cy="64" rx="9.5" ry="10.5" fill="#fff8ee" stroke="#241c2b" stroke-width="2.4"/>
        <ellipse cx="87" cy="67" rx="6.4" ry="7.4" fill="#cf4a4a"/>
        <ellipse cx="110" cy="65" rx="6.4" ry="7.4" fill="#cf4a4a"/>
        <ellipse cx="87.5" cy="68" rx="3" ry="3.8" fill="#241c2b"/>
        <ellipse cx="110.5" cy="66" rx="3" ry="3.8" fill="#241c2b"/>
        <circle cx="84" cy="63" r="2.6" fill="#ffffff"/>
        <circle cx="107" cy="61" r="2.6" fill="#ffffff"/>
        <circle cx="90" cy="71" r="1.3" fill="#ffffff" opacity="0.9"/>
        <circle cx="113" cy="69" r="1.3" fill="#ffffff" opacity="0.9"/>
      </g>

      <g fill="none" stroke="#241c2b" stroke-width="1.9" stroke-linecap="round" opacity="0.8">
        <path d="M 137 80 C 151 72 163 70 173 72"/>
        <path d="M 139 86 C 153 85 165 87 175 91"/>
        <path d="M 137 91 C 149 95 159 99 167 105"/>
      </g>

      <ellipse cx="108" cy="110" rx="26" ry="18" fill="url(#${u}-rt-glow)" opacity="0.3"/>
      <ellipse cx="82" cy="48" rx="14" ry="9" fill="url(#${u}-rt-glow)" opacity="0.28"/>
      <g fill="none" stroke="#d9bde9" stroke-width="1.8" opacity="0.5">
        <path d="M 74 104 C 78 110 82 114 86 116"/>
        <path d="M 124 100 C 122 106 120 110 116 114"/>
      </g>
    </g>`,
    weedle: (u) => `
    <g>
      <defs>
        <linearGradient id="${u}-wd-body" x1="0.2" y1="0.1" x2="0.85" y2="1">
          <stop offset="0" stop-color="#fdf3d3"/>
          <stop offset="0.5" stop-color="#eedaa4"/>
          <stop offset="1" stop-color="#c6a869"/>
        </linearGradient>
        <linearGradient id="${u}-wd-ring" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stop-color="#c99c57"/>
          <stop offset="1" stop-color="#89632c"/>
        </linearGradient>
        <linearGradient id="${u}-wd-horn" x1="0.2" y1="1" x2="0.8" y2="0">
          <stop offset="0" stop-color="#ee8076"/>
          <stop offset="0.45" stop-color="#d8413c"/>
          <stop offset="1" stop-color="#9c1f26"/>
        </linearGradient>
        <radialGradient id="${u}-wd-shade" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stop-color="#6d4a16" stop-opacity="0.45"/>
          <stop offset="1" stop-color="#6d4a16" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="${u}-wd-glow" cx="0.42" cy="0.28" r="0.6">
          <stop offset="0" stop-color="#fffbe8" stop-opacity="0.85"/>
          <stop offset="1" stop-color="#fffbe8" stop-opacity="0"/>
        </radialGradient>
        <clipPath id="${u}-wd-clip">
          <ellipse cx="48" cy="172" rx="13" ry="10" transform="rotate(-18 48 172)"/>
          <ellipse cx="61" cy="163" rx="16" ry="13" transform="rotate(-28 61 163)"/>
          <ellipse cx="74" cy="153" rx="19" ry="15" transform="rotate(-36 74 153)"/>
          <ellipse cx="88" cy="142" rx="21" ry="17" transform="rotate(-45 88 142)"/>
          <ellipse cx="101" cy="128" rx="22" ry="18" transform="rotate(-55 101 128)"/>
          <ellipse cx="111" cy="111" rx="20" ry="17" transform="rotate(-66 111 111)"/>
          <ellipse cx="115" cy="95" rx="18" ry="16" transform="rotate(-80 115 95)"/>
        </clipPath>
      </defs>

      <g fill="none" stroke="#9cc7a6" stroke-width="2.4" stroke-linecap="round" opacity="0.5">
        <path d="M 148 150 C 160 138 170 136 180 138"/>
        <path d="M 144 166 C 156 154 166 152 176 154"/>
        <path d="M 22 110 C 32 102 42 102 50 106"/>
      </g>

      <g stroke="#241c2b" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">
        <path d="M 44 168 L 24 174 L 44 181 Z" fill="url(#${u}-wd-ring)"/>
      </g>

      <g stroke="#241c2b" stroke-width="2.8" stroke-linejoin="round">
        <ellipse cx="48" cy="172" rx="13" ry="10" transform="rotate(-18 48 172)" fill="url(#${u}-wd-body)"/>
        <ellipse cx="61" cy="163" rx="16" ry="13" transform="rotate(-28 61 163)" fill="url(#${u}-wd-body)"/>
        <ellipse cx="74" cy="153" rx="19" ry="15" transform="rotate(-36 74 153)" fill="url(#${u}-wd-body)"/>
        <ellipse cx="88" cy="142" rx="21" ry="17" transform="rotate(-45 88 142)" fill="url(#${u}-wd-body)"/>
        <ellipse cx="101" cy="128" rx="22" ry="18" transform="rotate(-55 101 128)" fill="url(#${u}-wd-body)"/>
        <ellipse cx="111" cy="111" rx="20" ry="17" transform="rotate(-66 111 111)" fill="url(#${u}-wd-body)"/>
        <ellipse cx="115" cy="95" rx="18" ry="16" transform="rotate(-80 115 95)" fill="url(#${u}-wd-body)"/>
      </g>

      <g fill="url(#${u}-wd-shade)" stroke="none" clip-path="url(#${u}-wd-clip)">
        <ellipse cx="54" cy="181" rx="16" ry="9" transform="rotate(-18 54 181)"/>
        <ellipse cx="67" cy="172" rx="18" ry="10" transform="rotate(-28 67 172)"/>
        <ellipse cx="81" cy="162" rx="20" ry="11" transform="rotate(-36 81 162)"/>
        <ellipse cx="96" cy="151" rx="21" ry="11" transform="rotate(-45 96 151)"/>
        <ellipse cx="110" cy="137" rx="21" ry="11" transform="rotate(-55 110 137)"/>
        <ellipse cx="119" cy="120" rx="18" ry="10" transform="rotate(-66 119 120)"/>
        <ellipse cx="123" cy="103" rx="15" ry="9" transform="rotate(-80 123 103)"/>
      </g>

      <g fill="none" stroke="url(#${u}-wd-ring)" stroke-width="3.6" stroke-linecap="round" opacity="0.95"
         clip-path="url(#${u}-wd-clip)">
        <path d="M 44 154 C 50 164 56 172 62 182"/>
        <path d="M 57 142 C 63 152 70 163 76 173"/>
        <path d="M 70 130 C 77 142 84 154 92 165"/>
        <path d="M 83 117 C 91 130 98 143 105 155"/>
        <path d="M 96 102 C 103 115 111 128 118 139"/>
        <path d="M 104 86 C 111 98 117 110 123 121"/>
      </g>

      <g fill="none" stroke="#fff6d8" stroke-width="2.4" stroke-linecap="round" opacity="0.4"
         clip-path="url(#${u}-wd-clip)">
        <path d="M 40 176 C 50 180 62 181 72 178"/>
        <path d="M 64 162 C 76 166 86 166 96 161"/>
        <path d="M 90 146 C 100 150 110 149 118 142"/>
      </g>

      <g stroke="#241c2b" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round">
        <path d="M 50 180 L 46 184 L 54 183 Z" fill="url(#${u}-wd-ring)"/>
        <path d="M 68 172 L 65 181 L 73 178 Z" fill="url(#${u}-wd-ring)"/>
        <path d="M 88 159 L 86 169 L 93 165 Z" fill="url(#${u}-wd-ring)"/>
        <path d="M 103 145 L 102 155 L 109 151 Z" fill="url(#${u}-wd-ring)"/>
      </g>

      <g stroke="#241c2b" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
        <path d="M 108 58 C 112 42 120 30 136 22 C 134 40 128 54 124 64 Z" fill="url(#${u}-wd-horn)"/>
        <path d="M 114 54 C 119 42 124 34 131 28" fill="none" stroke="#ffb3a4" stroke-width="2.2" opacity="0.7"/>
        <circle cx="117" cy="86" r="27" fill="url(#${u}-wd-body)"/>
        <path d="M 93 104 C 102 113 119 116 132 108" fill="none" stroke="#c1a163" stroke-width="2.6" opacity="0.75"/>
      </g>

      <g>
        <ellipse cx="108" cy="82" rx="4.8" ry="5.4" fill="#1f1926" stroke="#241c2b" stroke-width="1.8"/>
        <ellipse cx="127" cy="84" rx="4.4" ry="5" fill="#1f1926" stroke="#241c2b" stroke-width="1.8"/>
        <circle cx="106.2" cy="80" r="1.6" fill="#ffffff"/>
        <circle cx="125.2" cy="82" r="1.5" fill="#ffffff"/>
      </g>

      <g stroke="#241c2b" stroke-width="2.2" fill="none" stroke-linecap="round">
        <path d="M 111 92 C 115 96 121 96 125 93"/>
      </g>

      <g fill="none" stroke="#c1a163" stroke-width="1.8" opacity="0.55">
        <path d="M 96 72 C 102 67 110 66 117 69"/>
        <path d="M 92 92 C 98 97 105 99 112 98"/>
      </g>

      <ellipse cx="112" cy="90" rx="28" ry="20" fill="url(#${u}-wd-glow)" opacity="0.3"/>
      <ellipse cx="60" cy="162" rx="16" ry="9" fill="url(#${u}-wd-glow)" opacity="0.22"/>
    </g>`,
    zubat: (u) => `
    <g>
      <defs>
        <linearGradient id="${u}-zb-body" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stop-color="#8d8cd2"/>
          <stop offset="0.5" stop-color="#63629f"/>
          <stop offset="1" stop-color="#403f74"/>
        </linearGradient>
        <linearGradient id="${u}-zb-wing" x1="0.1" y1="0" x2="0.8" y2="1">
          <stop offset="0" stop-color="#9290dc"/>
          <stop offset="0.5" stop-color="#6a68ad"/>
          <stop offset="1" stop-color="#44427c"/>
        </linearGradient>
        <linearGradient id="${u}-zb-ear" x1="0.2" y1="0" x2="0.7" y2="1">
          <stop offset="0" stop-color="#e08ab4"/>
          <stop offset="0.6" stop-color="#bb5f92"/>
          <stop offset="1" stop-color="#8a3a68"/>
        </linearGradient>
        <radialGradient id="${u}-zb-shade" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stop-color="#241f45" stop-opacity="0.6"/>
          <stop offset="1" stop-color="#241f45" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="${u}-zb-eye" cx="0.45" cy="0.35" r="0.6">
          <stop offset="0" stop-color="#241d3d"/>
          <stop offset="1" stop-color="#120e22"/>
        </radialGradient>
        <radialGradient id="${u}-zb-glow" cx="0.4" cy="0.3" r="0.6">
          <stop offset="0" stop-color="#efe7ff" stop-opacity="0.8"/>
          <stop offset="1" stop-color="#efe7ff" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <g fill="none" stroke="#a6a3e0" stroke-width="2.4" stroke-linecap="round" opacity="0.5">
        <path d="M 18 96 C 8 88 6 76 10 66"/>
        <path d="M 14 118 C 2 110 0 98 4 88"/>
        <path d="M 182 96 C 192 88 194 76 190 66"/>
        <path d="M 186 118 C 198 110 200 98 196 88"/>
      </g>

      <g stroke="#241c2b" stroke-width="2.9" stroke-linejoin="round" stroke-linecap="round">
        <path d="M 84 112 C 70 88 48 76 20 74 C 30 86 34 96 34 108 C 40 116 42 124 42 132 C 52 132 58 136 60 142 C 70 138 78 130 84 120 Z" fill="url(#${u}-zb-wing)"/>
        <path d="M 116 112 C 130 88 152 76 180 74 C 170 86 166 96 166 108 C 160 116 158 124 158 132 C 148 132 142 136 140 142 C 130 138 122 130 116 120 Z" fill="url(#${u}-zb-wing)"/>
        <g fill="none" stroke="#37335f" stroke-width="2.2" opacity="0.75">
          <path d="M 86 110 C 66 96 46 84 22 76"/>
          <path d="M 86 112 C 62 108 44 108 24 110"/>
          <path d="M 86 114 C 66 118 50 124 44 130"/>
          <path d="M 114 110 C 134 96 154 84 178 76"/>
          <path d="M 114 112 C 138 108 156 108 176 110"/>
          <path d="M 114 114 C 134 118 150 124 156 130"/>
          <path d="M 64 124 C 73 119 81 114 86 110"/>
          <path d="M 136 124 C 127 119 119 114 114 110"/>
        </g>
        <g fill="none" stroke="#b8b4ef" stroke-width="1.8" opacity="0.55">
          <path d="M 72 86 C 56 81 40 78 27 78"/>
          <path d="M 128 86 C 144 81 160 78 173 78"/>
        </g>
      </g>

      <g stroke="#241c2b" stroke-width="2.8" stroke-linejoin="round">
        <path d="M 88 88 C 78 70 68 48 66 32 C 80 38 94 58 100 78 Z" fill="url(#${u}-zb-body)"/>
        <path d="M 84 82 C 77 68 71 50 71 42 C 81 49 90 62 95 76 Z" fill="url(#${u}-zb-ear)" stroke-width="2.2"/>
        <path d="M 112 88 C 122 70 132 48 134 32 C 120 38 106 58 100 78 Z" fill="url(#${u}-zb-body)"/>
        <path d="M 116 82 C 123 68 129 50 129 42 C 119 49 110 62 105 76 Z" fill="url(#${u}-zb-ear)" stroke-width="2.2"/>
      </g>

      <g stroke="#241c2b" stroke-width="2.9" stroke-linejoin="round" stroke-linecap="round">
        <ellipse cx="100" cy="132" rx="23" ry="27" fill="url(#${u}-zb-body)"/>
        <ellipse cx="110" cy="146" rx="16" ry="15" fill="url(#${u}-zb-shade)" stroke="none"/>
        <ellipse cx="100" cy="140" rx="12" ry="15" fill="#7a79c0" fill-opacity="0.55" stroke="none"/>
      </g>

      <g stroke="#241c2b" stroke-width="4.6" fill="none" stroke-linecap="round">
        <path d="M 92 152 L 89 170 M 89 170 L 81 179 M 89 170 L 89 180 M 89 170 L 97 178"/>
        <path d="M 108 152 L 111 170 M 111 170 L 103 179 M 111 170 L 111 180 M 111 170 L 119 178"/>
      </g>
      <g stroke="#b0aeea" stroke-width="2.2" fill="none" stroke-linecap="round">
        <path d="M 92 152 L 89 170 M 89 170 L 81 179 M 89 170 L 89 180 M 89 170 L 97 178"/>
        <path d="M 108 152 L 111 170 M 111 170 L 103 179 M 111 170 L 111 180 M 111 170 L 119 178"/>
      </g>

      <circle cx="100" cy="96" r="24" fill="url(#${u}-zb-body)" stroke="#241c2b" stroke-width="3"/>
      <path d="M 80 92 C 80 80 88 72 100 72 C 112 72 120 80 120 92 C 120 102 112 108 100 108 C 88 108 80 102 80 92 Z"
            fill="#7f7dc6" opacity="0.55" stroke="none"/>

      <g>
        <ellipse cx="88" cy="92" rx="7.4" ry="9.4" fill="url(#${u}-zb-eye)" stroke="#241c2b" stroke-width="2.2"/>
        <ellipse cx="111" cy="92" rx="7.4" ry="9.4" fill="url(#${u}-zb-eye)" stroke="#241c2b" stroke-width="2.2"/>
        <ellipse cx="89" cy="89" rx="2.8" ry="3.4" fill="#4a4272" opacity="0.85"/>
        <ellipse cx="112" cy="89" rx="2.8" ry="3.4" fill="#4a4272" opacity="0.85"/>
      </g>

      <g stroke="#241c2b" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">
        <path d="M 92 106 C 96 114 104 114 108 106 C 106 118 94 118 92 106 Z" fill="#3b2038"/>
        <path d="M 94 108 L 96 118 L 100 109 Z" fill="#fffdf4"/>
        <path d="M 106 108 L 104 118 L 100 109 Z" fill="#fffdf4"/>
      </g>

      <g fill="none" stroke="#241c2b" stroke-width="2.2" stroke-linecap="round" opacity="0.85">
        <path d="M 84 110 C 80 112 76 114 73 118"/>
        <path d="M 116 110 C 120 112 124 114 127 118"/>
      </g>

      <ellipse cx="100" cy="104" rx="28" ry="18" fill="url(#${u}-zb-glow)" opacity="0.26"/>
      <ellipse cx="66" cy="64" rx="14" ry="8" fill="url(#${u}-zb-glow)" opacity="0.18"/>
      <ellipse cx="134" cy="64" rx="14" ry="8" fill="url(#${u}-zb-glow)" opacity="0.18"/>
    </g>`
  };

  // js/art/mountain.js
  var ART_MOUNTAIN = {
    gastly: (u) => `
    <g stroke-linejoin="round" stroke-linecap="round">
      <defs>
        <radialGradient id="${u}-gas" cx="36%" cy="26%" r="78%">
          <stop offset="0" stop-color="#ddc6ff"/>
          <stop offset="0.38" stop-color="#a06ce8"/>
          <stop offset="0.72" stop-color="#6f3bb8"/>
          <stop offset="1" stop-color="#3d1a63"/>
        </radialGradient>
        <radialGradient id="${u}-smoke" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="#8a52d0" stop-opacity="0.7"/>
          <stop offset="0.7" stop-color="#6b35aa" stop-opacity="0.34"/>
          <stop offset="1" stop-color="#4a1f7d" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="${u}-eye" cx="34%" cy="26%" r="82%">
          <stop offset="0" stop-color="#ffffff"/>
          <stop offset="0.68" stop-color="#f6f0ff"/>
          <stop offset="1" stop-color="#cdb6ee"/>
        </radialGradient>
        <linearGradient id="${u}-wisp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#7d45c9" stop-opacity="0.9"/>
          <stop offset="0.6" stop-color="#5d2c98" stop-opacity="0.55"/>
          <stop offset="1" stop-color="#4a1f7d" stop-opacity="0"/>
        </linearGradient>
        <filter id="${u}-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6"/>
        </filter>
        <filter id="${u}-blur2" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4"/>
        </filter>
      </defs>
      <g filter="url(#${u}-blur)" opacity="0.9">
        <ellipse cx="48" cy="98" rx="30" ry="26" fill="url(#${u}-smoke)"/>
        <ellipse cx="154" cy="112" rx="32" ry="28" fill="url(#${u}-smoke)"/>
        <ellipse cx="66" cy="150" rx="34" ry="24" fill="url(#${u}-smoke)"/>
        <ellipse cx="142" cy="154" rx="32" ry="22" fill="url(#${u}-smoke)"/>
        <ellipse cx="100" cy="166" rx="42" ry="20" fill="url(#${u}-smoke)"/>
      </g>
      <g filter="url(#${u}-blur)" opacity="0.75">
        <ellipse cx="78" cy="168" rx="24" ry="12" fill="url(#${u}-smoke)"/>
        <ellipse cx="124" cy="170" rx="26" ry="12" fill="url(#${u}-smoke)"/>
        <ellipse cx="100" cy="180" rx="32" ry="9" fill="url(#${u}-smoke)"/>
      </g>
      <g opacity="0.55" filter="url(#${u}-blur2)">
        <circle cx="40" cy="78" r="7" fill="#a974ef"/>
        <circle cx="164" cy="86" r="6" fill="#a974ef"/>
        <circle cx="56" cy="132" r="5" fill="#8f56d8"/>
        <circle cx="150" cy="136" r="8" fill="#8f56d8"/>
      </g>
      <g fill="url(#${u}-wisp)">
        <path d="M70,140 C62,156 48,164 52,176 C60,180 68,168 74,152 Z"/>
        <path d="M88,148 C82,164 70,176 76,184 C86,184 92,170 94,154 Z"/>
        <path d="M110,150 C112,166 104,178 112,184 C122,180 120,166 118,150 Z"/>
        <path d="M128,142 C138,156 148,164 144,176 C136,180 128,168 124,152 Z"/>
      </g>
      <ellipse cx="100" cy="94" rx="58" ry="58" fill="url(#${u}-gas)" stroke="#241c2b" stroke-width="3.2"/>
      <path d="M104,150 C132,148 154,130 157,104 C160,128 146,148 118,152 C112,152 108,151 104,150 Z" fill="#2f0f52" opacity="0.7" filter="url(#${u}-blur2)"/>
      <ellipse cx="104" cy="142" rx="34" ry="12" fill="#330f57" opacity="0.28" filter="url(#${u}-blur)"/>
      <path d="M58,94 C54,64 76,44 102,42 C82,52 66,70 64,98 C62,108 62,116 64,122 C58,112 57,102 58,94 Z" fill="#f0e2ff" opacity="0.5" filter="url(#${u}-blur2)"/>
      <g stroke="#241c2b" stroke-width="3">
        <ellipse cx="78" cy="86" rx="17" ry="20" fill="url(#${u}-eye)" transform="rotate(-7 78 86)"/>
        <ellipse cx="122" cy="86" rx="17" ry="20" fill="url(#${u}-eye)" transform="rotate(7 122 86)"/>
      </g>
      <ellipse cx="82" cy="90" rx="8.5" ry="11.5" fill="#241c2b" transform="rotate(-7 82 90)"/>
      <ellipse cx="118" cy="90" rx="8.5" ry="11.5" fill="#241c2b" transform="rotate(7 118 90)"/>
      <circle cx="78.5" cy="85.5" r="4.2" fill="#ffffff"/>
      <circle cx="84" cy="94" r="1.9" fill="#ffffff" opacity="0.9"/>
      <circle cx="121.5" cy="85.5" r="4.2" fill="#ffffff"/>
      <circle cx="116" cy="94" r="1.9" fill="#ffffff" opacity="0.9"/>
      <path d="M68,112 C82,136 118,136 132,112 C129,145 109,154 100,154 C91,154 71,145 68,112 Z" fill="#2b1030" stroke="#241c2b" stroke-width="3"/>
      <path d="M75,119 L85,122 L80,134 Z" fill="#ffffff" stroke="#241c2b" stroke-width="1.6"/>
      <path d="M125,119 L115,122 L120,134 Z" fill="#ffffff" stroke="#241c2b" stroke-width="1.6"/>
      <path d="M92,146 C98,150 106,150 111,145" fill="none" stroke="#6b2f6d" stroke-width="3" opacity="0.8"/>
      <g fill="#c9a6ff" opacity="0.8">
        <circle cx="66" cy="112" r="3.4"/>
        <circle cx="138" cy="118" r="2.6"/>
        <circle cx="96" cy="64" r="2"/>
      </g>
    </g>`,
    geodude: (u) => `
    <g stroke-linejoin="round" stroke-linecap="round">
      <defs>
        <linearGradient id="${u}-rock" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stop-color="#e2e6ea"/>
          <stop offset="0.4" stop-color="#b3bac2"/>
          <stop offset="0.75" stop-color="#8b929c"/>
          <stop offset="1" stop-color="#666d77"/>
        </linearGradient>
        <linearGradient id="${u}-fist" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stop-color="#dfe3e8"/>
          <stop offset="0.55" stop-color="#9ea5af"/>
          <stop offset="1" stop-color="#6b727c"/>
        </linearGradient>
        <linearGradient id="${u}-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#8d949e"/>
          <stop offset="1" stop-color="#5c636d"/>
        </linearGradient>
        <filter id="${u}-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5"/>
        </filter>
      </defs>
      <path d="M54,78 C58,50 78,34 102,34 C130,34 152,52 156,80 C160,104 156,128 142,146 C130,160 110,164 96,162 C74,162 56,148 50,124 C46,106 50,90 54,78 Z" fill="url(#${u}-rock)" stroke="#241c2b" stroke-width="3.2"/>
      <path d="M104,160 C130,158 150,142 156,118 C158,140 144,158 116,164 C110,165 106,163 104,160 Z" fill="#565d67" opacity="0.45" filter="url(#${u}-soft)"/>
      <path d="M60,74 C70,50 90,40 108,40 C86,48 72,62 68,84 C66,94 66,102 68,110 C60,98 58,84 60,74 Z" fill="#f6f8fa" opacity="0.55" filter="url(#${u}-soft)"/>
      <g fill="none" stroke="#4c525c" stroke-width="2" opacity="0.7">
        <path d="M64,104 L74,110 L70,120 L80,124"/>
        <path d="M136,72 L128,82 L134,88 L126,96"/>
        <path d="M104,142 L100,132 L108,126"/>
        <path d="M56,132 L64,138"/>
        <path d="M120,52 L126,62 L122,68"/>
      </g>
      <path d="M64,150 C76,158 124,160 138,150 C143,160 138,172 126,176 C110,181 86,181 72,176 C60,171 58,160 64,150 Z" fill="url(#${u}-base)" stroke="#241c2b" stroke-width="3.2"/>
      <path d="M74,166 C92,171 112,171 128,164" fill="none" stroke="#4b515a" stroke-width="2.4" opacity="0.7"/>
      <g stroke="#241c2b" stroke-width="3">
        <ellipse cx="82" cy="98" rx="13" ry="12" fill="#f8f5ef" transform="rotate(-6 82 98)"/>
        <ellipse cx="118" cy="98" rx="13" ry="12" fill="#f8f5ef" transform="rotate(6 118 98)"/>
      </g>
      <circle cx="85" cy="100" r="5.6" fill="#241c2b"/>
      <circle cx="115" cy="100" r="5.6" fill="#241c2b"/>
      <circle cx="83" cy="97" r="2.1" fill="#ffffff"/>
      <circle cx="113" cy="97" r="2.1" fill="#ffffff"/>
      <path d="M62,74 L94,82 L92,90 L60,82 Z" fill="#4a505a" stroke="#241c2b" stroke-width="2.4"/>
      <path d="M138,74 L106,82 L108,90 L140,82 Z" fill="#4a505a" stroke="#241c2b" stroke-width="2.4"/>
      <path d="M78,116 C86,110 114,110 122,116 C120,136 110,144 100,144 C90,144 80,136 78,116 Z" fill="#33202a" stroke="#241c2b" stroke-width="3"/>
      <path d="M82,117 L88,124 L94,117 L100,124 L106,117 L112,124 L118,117 L120,121 L114,128 L106,121 L100,128 L94,121 L86,128 L80,121 Z" fill="#ffffff" opacity="0.92"/>
      <path d="M92,136 C96,140 104,140 108,136" fill="none" stroke="#a15466" stroke-width="3" opacity="0.85"/>
      <g transform="translate(210 44) scale(-1 1)">
        <path d="M28,86 C26,70 36,58 50,58 C64,58 74,68 74,82 C78,92 74,110 64,118 C54,126 40,124 32,112 C28,104 28,94 28,86 Z" fill="url(#${u}-fist)" stroke="#241c2b" stroke-width="3.2"/>
        <path d="M35,72 C38,64 46,64 50,71 M47,70 C50,62 58,62 62,70 M59,72 C63,66 69,67 71,74" fill="none" stroke="#5a616b" stroke-width="2.2" opacity="0.8"/>
        <path d="M30,84 C36,64 50,62 60,64 C48,70 40,80 38,94 C36,104 38,112 42,118 C34,114 28,102 30,84 Z" fill="#f2f5f7" opacity="0.5" filter="url(#${u}-soft)"/>
        <g fill="none" stroke="#4c525c" stroke-width="2" opacity="0.75">
          <path d="M38,102 C46,110 58,110 66,102"/>
          <path d="M40,90 C48,96 60,96 66,90"/>
          <path d="M46,66 L42,78"/>
          <path d="M58,64 L62,76"/>
        </g>
      </g>
      <g transform="translate(-10 44)">
        <path d="M28,86 C26,70 36,58 50,58 C64,58 74,68 74,82 C78,92 74,110 64,118 C54,126 40,124 32,112 C28,104 28,94 28,86 Z" fill="url(#${u}-fist)" stroke="#241c2b" stroke-width="3.2"/>
        <path d="M35,72 C38,64 46,64 50,71 M47,70 C50,62 58,62 62,70 M59,72 C63,66 69,67 71,74" fill="none" stroke="#5a616b" stroke-width="2.2" opacity="0.8"/>
        <path d="M30,84 C36,64 50,62 60,64 C48,70 40,80 38,94 C36,104 38,112 42,118 C34,114 28,102 30,84 Z" fill="#f2f5f7" opacity="0.5" filter="url(#${u}-soft)"/>
        <g fill="none" stroke="#4c525c" stroke-width="2" opacity="0.75">
          <path d="M38,102 C46,110 58,110 66,102"/>
          <path d="M40,90 C48,96 60,96 66,90"/>
          <path d="M46,66 L42,78"/>
          <path d="M58,64 L62,76"/>
        </g>
      </g>
      <g fill="#c3c9d1" opacity="0.75">
        <path d="M44,52 L52,46 L56,54 L48,60 Z"/>
        <path d="M152,56 L158,50 L162,58 L156,64 Z"/>
      </g>
    </g>`,
    kadabra: (u) => `
    <g stroke-linejoin="round" stroke-linecap="round">
      <defs>
        <linearGradient id="${u}-body" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stop-color="#ffe89a"/>
          <stop offset="0.42" stop-color="#f8cc55"/>
          <stop offset="0.8" stop-color="#e8a92e"/>
          <stop offset="1" stop-color="#c98a22"/>
        </linearGradient>
        <linearGradient id="${u}-belly" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fff2c8"/>
          <stop offset="1" stop-color="#f4d993"/>
        </linearGradient>
        <linearGradient id="${u}-tail" x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0" stop-color="#f3c04a"/>
          <stop offset="0.65" stop-color="#e8a92e"/>
          <stop offset="1" stop-color="#cf8f24"/>
        </linearGradient>
        <linearGradient id="${u}-silver" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ffffff"/>
          <stop offset="0.5" stop-color="#cdd3dd"/>
          <stop offset="1" stop-color="#8b93a1"/>
        </linearGradient>
        <radialGradient id="${u}-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="#d3b0ff" stop-opacity="0.55"/>
          <stop offset="1" stop-color="#a97bf0" stop-opacity="0"/>
        </radialGradient>
        <filter id="${u}-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5"/>
        </filter>
      </defs>
      <g opacity="0.8">
        <ellipse cx="162" cy="78" rx="22" ry="30" fill="url(#${u}-aura)" filter="url(#${u}-glow)"/>
        <path d="M158,68 L160,76 L168,78 L160,80 L158,88 L156,80 L148,78 L156,76 Z" fill="#c9a4ff" opacity="0.85"/>
        <path d="M58,86 L60,92 L66,94 L60,96 L58,102 L56,96 L50,94 L56,92 Z" fill="#c9a4ff" opacity="0.7"/>
        <circle cx="178" cy="108" r="3" fill="#b48cf2" opacity="0.8"/>
        <circle cx="46" cy="70" r="2.4" fill="#b48cf2" opacity="0.7"/>
      </g>
      <path d="M118,130 C146,142 172,134 178,116 C183,100 174,88 164,92 C172,98 172,110 164,118 C154,128 136,134 116,140 Z" fill="url(#${u}-tail)" stroke="#241c2b" stroke-width="3"/>
      <g fill="none" stroke="#8a5524" stroke-width="4" opacity="0.9">
        <path d="M138,136 C144,132 146,126 146,120"/>
        <path d="M160,128 C164,122 166,116 164,110"/>
        <path d="M172,102 C170,98 166,96 162,94"/>
      </g>
      <path d="M84,136 C78,150 76,164 78,174 C79,180 86,183 92,180 C98,176 100,162 98,150 L98,136 Z" fill="url(#${u}-body)" stroke="#241c2b" stroke-width="3"/>
      <path d="M116,136 C122,150 124,164 122,174 C121,180 114,183 108,180 C102,176 100,162 102,150 L102,136 Z" fill="url(#${u}-body)" stroke="#241c2b" stroke-width="3"/>
      <ellipse cx="85" cy="177" rx="13" ry="6" fill="#f0b53c" stroke="#241c2b" stroke-width="2.8"/>
      <ellipse cx="115" cy="177" rx="13" ry="6" fill="#f0b53c" stroke="#241c2b" stroke-width="2.8"/>
      <path d="M78,158 C82,162 88,162 92,158" fill="none" stroke="#c98a22" stroke-width="2.2" opacity="0.8"/>
      <path d="M108,158 C112,162 118,162 122,158" fill="none" stroke="#c98a22" stroke-width="2.2" opacity="0.8"/>
      <path d="M68,94 C82,86 118,86 132,94 C130,112 126,126 122,138 C110,144 90,144 78,138 C74,126 70,112 68,94 Z" fill="url(#${u}-body)" stroke="#241c2b" stroke-width="3"/>
      <path d="M86,100 C94,96 106,96 114,100 C113,112 111,124 108,132 C104,136 96,136 92,132 C89,124 87,112 86,100 Z" fill="url(#${u}-belly)" opacity="0.85"/>
      <g fill="none" stroke="#8a5524" stroke-width="5" opacity="0.9">
        <path d="M82,110 C92,115 108,115 118,110"/>
        <path d="M83,121 C93,126 107,126 117,121"/>
        <path d="M85,132 C94,136 106,136 114,132"/>
      </g>
      <ellipse cx="100" cy="139" rx="2.4" ry="1.8" fill="#8a5524" opacity="0.8"/>
      <path d="M121,99 C126,112 124,126 119,136 C126,128 130,114 129,100 Z" fill="#b57a1e" opacity="0.35"/>
      <path d="M71,96 C78,91 86,89 94,89 C82,94 76,102 74,112 C72,106 70,100 71,96 Z" fill="#fff1b8" opacity="0.5"/>
      <path d="M70,98 C60,104 54,114 56,124 C58,131 65,133 70,129 C74,125 72,118 77,112 L82,101 Z" fill="url(#${u}-body)" stroke="#241c2b" stroke-width="3"/>
      <path d="M59,118 C62,122 66,125 70,125" fill="none" stroke="#c98a22" stroke-width="2.2" opacity="0.8"/>
      <path d="M62,124 C65,128 70,129 74,126" fill="none" stroke="#8a5524" stroke-width="3.4"/>
      <ellipse cx="68" cy="130" rx="7.5" ry="7.5" fill="#f3c14e" stroke="#241c2b" stroke-width="2.8"/>
      <path d="M64,127 C66,131 69,132 72,130 M63,131 C66,134 69,134 71,132" fill="none" stroke="#b57a1e" stroke-width="1.6" opacity="0.9"/>
      <path d="M128,100 C140,100 150,90 152,78 C154,72 160,70 162,76 C162,90 152,108 136,114 Z" fill="url(#${u}-body)" stroke="#241c2b" stroke-width="3"/>
      <path d="M130,106 C138,104 144,96 146,88" fill="none" stroke="#c98a22" stroke-width="2.2" opacity="0.7"/>
      <ellipse cx="152" cy="86" rx="8" ry="8.5" fill="#f3c14e" stroke="#241c2b" stroke-width="2.8"/>
      <path d="M76,46 C68,36 60,24 56,18 C68,20 82,30 88,38 Z" fill="url(#${u}-body)" stroke="#241c2b" stroke-width="3"/>
      <path d="M124,46 C132,36 140,24 144,18 C132,20 118,30 112,38 Z" fill="url(#${u}-body)" stroke="#241c2b" stroke-width="3"/>
      <path d="M72,42 C66,34 62,28 60,24 C68,27 78,34 82,40 Z" fill="#d99a2e" stroke="#241c2b" stroke-width="2"/>
      <path d="M128,42 C134,34 138,28 140,24 C132,27 122,34 118,40 Z" fill="#d99a2e" stroke="#241c2b" stroke-width="2"/>
      <path d="M64,66 C64,42 80,26 100,26 C120,26 136,42 136,66 C136,84 120,96 100,96 C80,96 64,84 64,66 Z" fill="url(#${u}-body)" stroke="#241c2b" stroke-width="3.2"/>
      <path d="M78,76 C82,68 118,68 122,76 C122,88 112,96 100,96 C88,96 78,88 78,76 Z" fill="#f8e5b4" stroke="#241c2b" stroke-width="2.2"/>
      <path d="M96,70 L104,70 L100,76 Z" fill="#241c2b"/>
      <path d="M100,31 L102.4,37 L109,37.2 L103.8,41 L105.7,47.5 L100,43.8 L94.3,47.5 L96.2,41 L91,37.2 L97.6,37 Z" fill="#d94a3d" stroke="#241c2b" stroke-width="1.8"/>
      <path d="M70,64 C78,52 92,53 97,64 C89,71 77,71 70,64 Z" fill="#ffffff" stroke="#241c2b" stroke-width="2.6"/>
      <path d="M130,64 C122,52 108,53 103,64 C111,71 123,71 130,64 Z" fill="#ffffff" stroke="#241c2b" stroke-width="2.6"/>
      <circle cx="86" cy="63.5" r="4.6" fill="#241c2b"/>
      <circle cx="114" cy="63.5" r="4.6" fill="#241c2b"/>
      <circle cx="84.5" cy="61.5" r="1.7" fill="#ffffff"/>
      <circle cx="112.5" cy="61.5" r="1.7" fill="#ffffff"/>
      <circle cx="88" cy="66" r="1" fill="#ffffff" opacity="0.9"/>
      <circle cx="116" cy="66" r="1" fill="#ffffff" opacity="0.9"/>
      <path d="M69,52 C75,46 85,46 91,50" fill="none" stroke="#b57a1e" stroke-width="2.4"/>
      <path d="M131,52 C125,46 115,46 109,50" fill="none" stroke="#b57a1e" stroke-width="2.4"/>
      <path d="M90,84 C96,88 104,88 110,83" fill="none" stroke="#241c2b" stroke-width="2.6"/>
      <path d="M66,70 C70,50 84,40 100,40 C86,48 76,58 72,72 Z" fill="#fff4c4" opacity="0.55"/>
      <path d="M150,118 C156,98 164,76 172,58" fill="none" stroke="#b9c0cc" stroke-width="7"/>
      <path d="M150,118 C156,98 164,76 172,58" fill="none" stroke="#eef2f7" stroke-width="2"/>
      <ellipse cx="174" cy="50" rx="9" ry="13" fill="url(#${u}-silver)" stroke="#7d8491" stroke-width="2.2" transform="rotate(-26 174 50)"/>
      <ellipse cx="171.5" cy="46" rx="3" ry="5" fill="#ffffff" opacity="0.8" transform="rotate(-26 171.5 46)"/>
      <g fill="none" stroke-linecap="round">
        <path d="M147,81 C149,79 151,79 152,82" stroke="#241c2b" stroke-width="4"/>
        <path d="M146,87 C148,85 150,85 151,88" stroke="#241c2b" stroke-width="4"/>
        <path d="M147,93 C149,91 151,91 152,94" stroke="#241c2b" stroke-width="4"/>
        <path d="M147,81 C149,79 151,79 152,82" stroke="#f7d477" stroke-width="2"/>
        <path d="M146,87 C148,85 150,85 151,88" stroke="#f7d477" stroke-width="2"/>
        <path d="M147,93 C149,91 151,91 152,94" stroke="#f7d477" stroke-width="2"/>
      </g>
    </g>`,
    machop: (u) => `
    <g stroke-linejoin="round" stroke-linecap="round">
      <defs>
        <linearGradient id="${u}-body" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stop-color="#c6d7ea"/>
          <stop offset="0.45" stop-color="#9db6d0"/>
          <stop offset="0.8" stop-color="#7694b3"/>
          <stop offset="1" stop-color="#5a7694"/>
        </linearGradient>
        <linearGradient id="${u}-limb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#b9cde3"/>
          <stop offset="1" stop-color="#6d8bab"/>
        </linearGradient>
        <linearGradient id="${u}-fin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#f7f9fc"/>
          <stop offset="1" stop-color="#cfdae8"/>
        </linearGradient>
        <linearGradient id="${u}-shorts" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#94603a"/>
          <stop offset="1" stop-color="#6a4226"/>
        </linearGradient>
        <filter id="${u}-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4"/>
        </filter>
      </defs>
      <path d="M90,44 L100,14 L110,44 Z" fill="url(#${u}-fin)" stroke="#241c2b" stroke-width="3"/>
      <path d="M84,42 L70,24 L92,40 Z" fill="url(#${u}-fin)" stroke="#241c2b" stroke-width="3"/>
      <path d="M116,42 L130,24 L108,40 Z" fill="url(#${u}-fin)" stroke="#241c2b" stroke-width="3"/>
      <path d="M82,148 C76,160 74,170 76,178 C84,182 92,180 94,172 C96,164 94,156 94,148 Z" fill="url(#${u}-limb)" stroke="#241c2b" stroke-width="3"/>
      <path d="M118,148 C124,160 126,170 124,178 C116,182 108,180 106,172 C104,164 106,156 106,148 Z" fill="url(#${u}-limb)" stroke="#241c2b" stroke-width="3"/>
      <ellipse cx="83" cy="177" rx="12" ry="5.5" fill="#88a5c2" stroke="#241c2b" stroke-width="2.8"/>
      <ellipse cx="117" cy="177" rx="12" ry="5.5" fill="#88a5c2" stroke="#241c2b" stroke-width="2.8"/>
      <path d="M75,175 C77,179 79,180 81,179 M82,175 C84,179 86,180 88,179" fill="none" stroke="#4f6d8d" stroke-width="1.8" opacity="0.85"/>
      <path d="M109,175 C111,179 113,180 115,179 M116,175 C118,179 120,180 122,179" fill="none" stroke="#4f6d8d" stroke-width="1.8" opacity="0.85"/>
      <path d="M70,92 C84,86 116,86 130,92 C128,112 122,126 118,134 C106,140 94,140 82,134 C78,126 72,112 70,92 Z" fill="url(#${u}-body)" stroke="#241c2b" stroke-width="3.2"/>
      <path d="M78,128 C92,134 108,134 122,128 L120,152 C108,158 92,158 80,152 Z" fill="url(#${u}-shorts)" stroke="#241c2b" stroke-width="3"/>
      <path d="M78,130 C92,136 108,136 122,130 L122,137 C108,143 92,143 78,137 Z" fill="#5a3620" stroke="#241c2b" stroke-width="2.2"/>
      <rect x="95" y="129" width="11" height="9" rx="2" fill="#e8c05a" stroke="#241c2b" stroke-width="1.8"/>
      <path d="M87,100 C93,106 100,106 100,100" fill="none" stroke="#52708f" stroke-width="2.2" opacity="0.8"/>
      <path d="M113,100 C107,106 100,106 100,100" fill="none" stroke="#52708f" stroke-width="2.2" opacity="0.8"/>
      <path d="M90,113 C94,116 97,117 100,117 M100,117 C103,117 106,116 110,113" fill="none" stroke="#52708f" stroke-width="2.2" opacity="0.8"/>
      <path d="M91,122 C95,125 97,126 100,126 M100,126 C103,126 105,125 109,122" fill="none" stroke="#52708f" stroke-width="2.2" opacity="0.8"/>
      <path d="M68,94 C56,98 48,108 46,118 C44,126 50,132 56,130 C64,126 70,112 74,104 Z" fill="url(#${u}-body)" stroke="#241c2b" stroke-width="3"/>
      <path d="M132,94 C144,98 152,108 154,118 C156,126 150,132 144,130 C136,126 130,112 126,104 Z" fill="url(#${u}-body)" stroke="#241c2b" stroke-width="3"/>
      <path d="M60,106 C64,112 64,120 60,126" fill="none" stroke="#52708f" stroke-width="2.2" opacity="0.7"/>
      <path d="M140,106 C136,112 136,120 140,126" fill="none" stroke="#52708f" stroke-width="2.2" opacity="0.7"/>
      <g>
        <path d="M31,121 C29,109 38,100 48,101 C58,101 64,110 63,121 C62,132 53,137 44,136 C35,135 30,130 31,121 Z" fill="url(#${u}-limb)" stroke="#241c2b" stroke-width="3"/>
        <path d="M38,108 C37,113 37,118 39,122 M47,106 C46,112 46,118 48,123 M56,108 C55,113 55,118 57,122" fill="none" stroke="#4f6d8d" stroke-width="2" opacity="0.8"/>
      </g>
      <g transform="translate(200 0) scale(-1 1)">
        <path d="M31,121 C29,109 38,100 48,101 C58,101 64,110 63,121 C62,132 53,137 44,136 C35,135 30,130 31,121 Z" fill="url(#${u}-limb)" stroke="#241c2b" stroke-width="3"/>
        <path d="M38,108 C37,113 37,118 39,122 M47,106 C46,112 46,118 48,123 M56,108 C55,113 55,118 57,122" fill="none" stroke="#4f6d8d" stroke-width="2" opacity="0.8"/>
      </g>
      <path d="M66,64 C66,44 81,32 100,32 C119,32 134,44 134,64 C134,82 119,94 100,94 C81,94 66,82 66,64 Z" fill="url(#${u}-body)" stroke="#241c2b" stroke-width="3.2"/>
      <path d="M68,58 C70,42 82,36 96,36 C82,42 74,50 71,62 Z" fill="#e8f1fa" opacity="0.55" filter="url(#${u}-soft)"/>
      <path d="M70,48 L94,57 L92,63 L68,55 Z" fill="#33475e" stroke="#241c2b" stroke-width="2.4"/>
      <path d="M130,48 L106,57 L108,63 L132,55 Z" fill="#33475e" stroke="#241c2b" stroke-width="2.4"/>
      <path d="M73,64 C80,56 92,57 97,64 C89,70 79,70 73,64 Z" fill="#ffffff" stroke="#241c2b" stroke-width="2.6"/>
      <path d="M127,64 C120,56 108,57 103,64 C111,70 121,70 127,64 Z" fill="#ffffff" stroke="#241c2b" stroke-width="2.6"/>
      <circle cx="87" cy="63" r="3.6" fill="#241c2b"/>
      <circle cx="113" cy="63" r="3.6" fill="#241c2b"/>
      <circle cx="86" cy="62" r="1.3" fill="#ffffff"/>
      <circle cx="112" cy="62" r="1.3" fill="#ffffff"/>
      <path d="M85,78 C92,85 108,85 115,78 C111,88 89,88 85,78 Z" fill="#2c2a38" stroke="#241c2b" stroke-width="2.6"/>
      <path d="M89,79 L94,83 L99,79 L104,83 L109,79 L111,82 L104,86 L99,82 L94,86 L87,82 Z" fill="#ffffff" opacity="0.9"/>
      <path d="M74,74 C70,80 70,86 74,90" fill="none" stroke="#5f7c9b" stroke-width="2" opacity="0.7"/>
      <path d="M126,74 C130,80 130,86 126,90" fill="none" stroke="#5f7c9b" stroke-width="2" opacity="0.7"/>
    </g>`
  };

  // js/art/summit.js
  var ART_SUMMIT = {
    snorlax: (u) => `
    <defs>
      <linearGradient id="${u}-body" x1="0" y1="0" x2="0.75" y2="1">
        <stop offset="0" stop-color="#7fe6d1"/>
        <stop offset="0.42" stop-color="#40bcae"/>
        <stop offset="0.78" stop-color="#1d8d8b"/>
        <stop offset="1" stop-color="#126a70"/>
      </linearGradient>
      <radialGradient id="${u}-belly" cx="0.38" cy="0.22" r="0.92">
        <stop offset="0" stop-color="#fff9e5"/>
        <stop offset="0.6" stop-color="#f4e3bd"/>
        <stop offset="0.9" stop-color="#dcc193"/>
        <stop offset="1" stop-color="#c4a878"/>
      </radialGradient>
      <radialGradient id="${u}-face" cx="0.34" cy="0.2" r="0.9">
        <stop offset="0" stop-color="#fffdf1"/>
        <stop offset="0.72" stop-color="#f7e9c8"/>
        <stop offset="1" stop-color="#e0c79a"/>
      </radialGradient>
      <radialGradient id="${u}-paw" cx="0.4" cy="0.25" r="0.9">
        <stop offset="0" stop-color="#7fe0d0"/>
        <stop offset="0.65" stop-color="#38aa9f"/>
        <stop offset="1" stop-color="#177573"/>
      </radialGradient>
      <linearGradient id="${u}-claw" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff7dc"/>
        <stop offset="1" stop-color="#d8bd8d"/>
      </linearGradient>
    </defs>
    <g>
    <ellipse cx="100" cy="184" rx="65" ry="8" fill="#241c2b" opacity="0.16"/>
    <path d="M42 158 C25 157 22 171 35 178 C44 183 54 179 56 171" fill="url(#${u}-body)" stroke="#241c2b" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M100 45 C76 45 55 59 52 81 C50 96 40 107 35 127 C29 150 38 169 57 178 C79 187 122 187 144 178 C164 170 172 149 166 128 C160 107 150 96 148 81 C145 59 124 45 100 45 Z" fill="url(#${u}-body)" stroke="#241c2b" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M37 145 C45 169 64 181 94 184 C128 187 153 176 164 149 C160 167 149 179 127 184 C99 190 66 185 51 174 C42 167 38 157 37 145 Z" fill="#0c5c64" opacity="0.3"/>
    <path d="M100 100 C78 100 65 118 64 140 C63 162 78 175 100 175 C122 175 137 162 136 140 C135 118 122 100 100 100 Z" fill="url(#${u}-belly)" stroke="#241c2b" stroke-width="2.8" stroke-linejoin="round"/>
    <path d="M67 143 C68 158 78 169 94 172 C79 174 69 165 66 154 C64 148 65 145 67 143 Z" fill="#c7a777" opacity="0.55"/>
    <path d="M133 137 C136 153 127 167 112 172 C126 171 138 162 138 149 C139 143 137 139 133 137 Z" fill="#fff4d8" opacity="0.5"/>
    <path d="M88 160 C94 164 106 164 112 159" fill="none" stroke="#c6a877" stroke-width="2.2" stroke-linecap="round" opacity="0.6"/>
    <circle cx="100" cy="158" r="1.8" fill="#b9986c" opacity="0.7"/>
    <path d="M58 112 C44 118 35 135 37 151 C39 166 54 169 65 157 C74 147 78 130 73 116 C69 107 62 107 58 112 Z" fill="url(#${u}-paw)" stroke="#241c2b" stroke-width="3" stroke-linejoin="round"/>
    <path d="M45 147 C46 137 52 126 61 119 C55 130 51 141 51 153 C49 156 46 153 45 147 Z" fill="#71d8c8" opacity="0.45"/>
    <path d="M142 113 C157 118 168 133 166 150 C164 166 150 170 139 158 C131 149 128 131 133 117 C136 109 140 109 142 113 Z" fill="url(#${u}-paw)" stroke="#241c2b" stroke-width="3" stroke-linejoin="round"/>
    <path d="M155 145 C154 136 149 127 141 120 C148 130 152 141 152 153 C153 156 155 152 155 145 Z" fill="#8ce9da" opacity="0.4"/>
    <path d="M35 169 C25 177 30 184 45 185 C61 186 72 181 74 174 C77 167 66 162 55 165 Z" fill="url(#${u}-paw)" stroke="#241c2b" stroke-width="3" stroke-linejoin="round"/>
    <path d="M126 169 C120 176 127 184 142 185 C158 186 169 180 168 172 C166 164 151 160 139 164 Z" fill="url(#${u}-paw)" stroke="#241c2b" stroke-width="3" stroke-linejoin="round"/>
    <path d="M35 171 C41 168 48 169 53 173" fill="none" stroke="#8eefe0" stroke-width="2.2" stroke-linecap="round" opacity="0.55"/>
    <path d="M151 168 C157 165 163 166 166 170" fill="none" stroke="#8eefe0" stroke-width="2.2" stroke-linecap="round" opacity="0.5"/>
    <path d="M43 182 C40 177 43 173 48 173 C52 175 51 180 49 183 Z" fill="url(#${u}-claw)" stroke="#241c2b" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M55 184 C53 179 57 176 61 177 C65 179 63 183 62 185 Z" fill="url(#${u}-claw)" stroke="#241c2b" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M66 184 C65 180 69 177 72 179 C75 181 73 184 72 185 Z" fill="url(#${u}-claw)" stroke="#241c2b" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M137 184 C136 179 140 176 144 178 C147 180 145 183 144 185 Z" fill="url(#${u}-claw)" stroke="#241c2b" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M149 183 C148 179 152 176 156 177 C159 179 157 183 156 184 Z" fill="url(#${u}-claw)" stroke="#241c2b" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M159 181 C160 177 163 175 166 177 C168 179 166 182 165 183 Z" fill="url(#${u}-claw)" stroke="#241c2b" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M66 59 C55 56 49 43 55 37 C63 31 76 39 82 49 C78 55 72 59 66 59 Z" fill="url(#${u}-body)" stroke="#241c2b" stroke-width="3" stroke-linejoin="round"/>
    <path d="M63 53 C57 49 56 43 59 41 C64 38 70 43 73 48 Z" fill="#0e666b" opacity="0.7"/>
    <path d="M138 58 C149 54 156 41 149 35 C141 30 130 39 124 48 C128 55 133 58 138 58 Z" fill="url(#${u}-body)" stroke="#241c2b" stroke-width="3" stroke-linejoin="round"/>
    <path d="M141 52 C147 48 149 42 145 40 C140 38 135 43 132 48 Z" fill="#0e666b" opacity="0.65"/>
    <path d="M100 51 C76 51 62 64 63 82 C64 99 80 109 100 109 C120 109 136 99 137 82 C138 64 124 51 100 51 Z" fill="url(#${u}-face)" stroke="#241c2b" stroke-width="2.8" stroke-linejoin="round"/>
    <path d="M64 82 C70 100 83 108 100 108 C84 111 68 103 64 91 C63 87 63 84 64 82 Z" fill="#d1b487" opacity="0.5"/>
    <path d="M136 78 C134 92 124 103 111 107 C126 105 137 94 139 84 C139 81 138 79 136 78 Z" fill="#fff8df" opacity="0.65"/>
    <path d="M75 78 C82 68 91 68 98 75" fill="none" stroke="#fffdf4" stroke-width="3" stroke-linecap="round" opacity="0.55"/>
    <path d="M78 80 C84 86 92 86 97 79" fill="none" stroke="#241c2b" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M106 78 C112 85 119 84 124 77" fill="none" stroke="#241c2b" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M77 81 L73 83 M97 80 L101 82 M107 79 L103 82 M124 78 L128 80" fill="none" stroke="#241c2b" stroke-width="2" stroke-linecap="round"/>
    <path d="M77 83 C81 87 88 88 93 84" fill="none" stroke="#d9bd91" stroke-width="1.4" stroke-linecap="round" opacity="0.6"/>
    <ellipse cx="73" cy="91" rx="7" ry="3.6" fill="#ef9f96" opacity="0.4"/>
    <ellipse cx="127" cy="91" rx="7" ry="3.6" fill="#ef9f96" opacity="0.4"/>
    <path d="M95 96 C98 100 103 100 107 96" fill="none" stroke="#241c2b" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M100 100 C99 103 101 104 103 103" fill="none" stroke="#241c2b" stroke-width="2" stroke-linecap="round"/>
    <path d="M88 57 C94 53 104 53 111 57" fill="none" stroke="#fffdf2" stroke-width="2.6" stroke-linecap="round" opacity="0.7"/>
    <path d="M35 124 C39 111 47 101 58 95" fill="none" stroke="#a9f3e6" stroke-width="2.6" stroke-linecap="round" opacity="0.55"/>
    <path d="M165 126 C162 114 155 104 146 98" fill="none" stroke="#a9f3e6" stroke-width="2.4" stroke-linecap="round" opacity="0.45"/>
    <path d="M37 130 C41 119 47 111 55 105" fill="none" stroke="#0c5c64" stroke-width="1.8" stroke-linecap="round" opacity="0.35"/>
    <circle cx="160" cy="61" r="7.5" fill="#d8fbff" opacity="0.25" stroke="#e9ffff" stroke-width="1.8"/>
    <circle cx="157.5" cy="58.5" r="2.2" fill="#ffffff" opacity="0.9"/>
    <circle cx="169" cy="49" r="4.6" fill="#d8fbff" opacity="0.2" stroke="#e9ffff" stroke-width="1.5"/>
    <circle cx="167.5" cy="47.5" r="1.2" fill="#ffffff" opacity="0.85"/>
    <circle cx="148" cy="47" r="2.6" fill="#d8fbff" opacity="0.18" stroke="#e9ffff" stroke-width="1.2"/>
    </g>
  `,
    dragonair: (u) => `
    <defs>
      <linearGradient id="${u}-body" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#a2f4ff"/>
        <stop offset="0.35" stop-color="#48b9f0"/>
        <stop offset="0.72" stop-color="#2479cf"/>
        <stop offset="1" stop-color="#14459e"/>
      </linearGradient>
      <linearGradient id="${u}-belly" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fffdf4"/>
        <stop offset="0.7" stop-color="#e8f5ef"/>
        <stop offset="1" stop-color="#c5e0dc"/>
      </linearGradient>
      <radialGradient id="${u}-orb" cx="0.34" cy="0.28" r="0.8">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset="0.28" stop-color="#b9fbff"/>
        <stop offset="0.7" stop-color="#3dc5f5"/>
        <stop offset="1" stop-color="#1261b5"/>
      </radialGradient>
      <linearGradient id="${u}-wing" x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset="0.7" stop-color="#e4f9ff"/>
        <stop offset="1" stop-color="#abdcef"/>
      </linearGradient>
      <radialGradient id="${u}-glow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#e8ffff" stop-opacity="0.55"/>
        <stop offset="1" stop-color="#79dcff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <g>
    <ellipse cx="97" cy="184" rx="49" ry="6" fill="#241c2b" opacity="0.13"/>
    <circle cx="40" cy="55" r="11" fill="url(#${u}-glow)"/>
    <circle cx="167" cy="92" r="13" fill="url(#${u}-glow)"/>
    <circle cx="177" cy="136" r="8" fill="url(#${u}-glow)"/>
    <path d="M31 48 L34 53 L39 54 L34 57 L33 62 L29 58 L24 59 L27 54 L25 49 L30 51 Z" fill="#eaffff" opacity="0.85"/>
    <path d="M160 31 L162 36 L167 37 L163 40 L164 45 L159 42 L155 45 L156 39 L152 36 L157 35 Z" fill="#dffbff" opacity="0.75"/>
    <path d="M177 111 L179 115 L183 116 L179 119 L180 123 L176 120 L172 122 L174 117 L171 114 L175 114 Z" fill="#e8ffff" opacity="0.8"/>
    <path d="M25 96 L27 100 L31 101 L27 104 L28 108 L24 105 L20 107 L22 102 L19 99 L23 99 Z" fill="#e8ffff" opacity="0.7"/>
    <path d="M157 146 L159 150 L163 151 L159 154 L160 158 L156 155 L152 157 L154 152 L151 149 L155 149 Z" fill="#dffbff" opacity="0.65"/>
    <circle cx="50" cy="39" r="1.8" fill="#f4ffff" opacity="0.9"/>
    <circle cx="72" cy="29" r="1.3" fill="#d9fbff" opacity="0.8"/>
    <circle cx="184" cy="71" r="1.6" fill="#eaffff" opacity="0.8"/>
    <circle cx="18" cy="128" r="1.5" fill="#c9f7ff" opacity="0.65"/>
    <circle cx="143" cy="26" r="1.2" fill="#ffffff" opacity="0.9"/>
    <circle cx="57" cy="119" r="1.4" fill="#d9fbff" opacity="0.55"/>
    <path d="M45 176 C30 158 49 143 72 148 C101 155 123 169 148 158 C173 147 168 121 145 115 C122 109 103 123 87 108 C69 91 80 69 99 64" fill="none" stroke="#241c2b" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M45 176 C30 158 49 143 72 148 C101 155 123 169 148 158 C173 147 168 121 145 115 C122 109 103 123 87 108 C69 91 80 69 99 64" fill="none" stroke="url(#${u}-body)" stroke-width="27.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M45 176 C30 158 49 143 72 148 C101 155 123 169 148 158 C173 147 168 121 145 115 C122 109 103 123 87 108 C69 91 80 69 99 64" fill="none" stroke="#9fefff" stroke-width="3" stroke-linecap="round" opacity="0.5" transform="translate(-5 -4)"/>
    <path d="M56 165 C77 165 94 175 112 173 C130 171 143 161 153 150" fill="none" stroke="url(#${u}-belly)" stroke-width="7.5" stroke-linecap="round" opacity="0.9"/>
    <path d="M146 127 C143 126 141 124 139 121 M128 115 C125 116 121 115 119 113 M109 107 C106 108 103 107 100 105 C96 102 95 98 95 95 M87 87 C84 84 82 80 82 76" fill="none" stroke="#dffaff" stroke-width="2" stroke-linecap="round" opacity="0.55"/>
    <path d="M64 155 C59 155 55 158 53 163 C57 162 60 162 63 160 Z" fill="#5bc9ef" stroke="#241c2b" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M52 174 C47 177 43 177 39 175 C43 172 46 169 48 166 Z" fill="#3ba6dc" stroke="#241c2b" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M156 153 C163 157 167 163 166 169 C161 165 157 163 153 161 Z" fill="#5bc9ef" stroke="#241c2b" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M160 142 C168 138 175 139 179 144 C172 144 167 147 164 151 Z" fill="#fff4dc" stroke="#241c2b" stroke-width="2.4" stroke-linejoin="round"/>
    <circle cx="46" cy="164" r="10" fill="#241c2b"/>
    <circle cx="46" cy="164" r="8.6" fill="url(#${u}-orb)"/>
    <path d="M41 160 C44 158 48 158 50 160" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="43" cy="168" r="1.8" fill="#c9fbff" opacity="0.8"/>
    <circle cx="78" cy="89" r="11" fill="#241c2b"/>
    <circle cx="78" cy="89" r="9.5" fill="url(#${u}-orb)"/>
    <path d="M73 84 C76 82 80 82 83 84" fill="none" stroke="#ffffff" stroke-width="2.3" stroke-linecap="round"/>
    <circle cx="75" cy="93" r="1.8" fill="#d7fcff" opacity="0.85"/>
    <circle cx="99" cy="64" r="11" fill="url(#${u}-glow)"/>
    <g transform="translate(111 55) rotate(10)">
      <path d="M-13 -14 C-28 -29 -20 -38 -4 -31 C-2 -26 -6 -20 -7 -13 Z" fill="url(#${u}-wing)" stroke="#241c2b" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M9 -16 C17 -33 31 -34 28 -20 C25 -14 18 -10 13 -6 Z" fill="url(#${u}-wing)" stroke="#241c2b" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M-10 -15 C-17 -23 -16 -29 -10 -29 C-6 -25 -5 -19 -5 -14 Z" fill="#dff7ff" stroke="#8ec9e4" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M14 -15 C18 -23 23 -25 25 -21 C24 -16 19 -12 15 -10 Z" fill="#dff7ff" stroke="#8ec9e4" stroke-width="1.5" stroke-linejoin="round"/>
      <ellipse cx="1" cy="1" rx="27" ry="22" fill="url(#${u}-body)" stroke="#241c2b" stroke-width="3" stroke-linejoin="round"/>
      <path d="M5 1 C16 -3 27 2 29 12 C29 19 24 24 16 24 C8 24 2 19 0 13 C-1 8 0 3 5 1 Z" fill="#fdf5dc" stroke="#241c2b" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M-26 3 C-33 5 -35 12 -31 18 C-26 15 -23 10 -21 5 Z" fill="#f7e7c2" stroke="#241c2b" stroke-width="2.3" stroke-linejoin="round"/>
      <ellipse cx="11" cy="-2" rx="5.6" ry="7.4" fill="#241c2b"/>
      <ellipse cx="11.6" cy="-0.5" rx="3.6" ry="5.2" fill="#3c74d8"/>
      <circle cx="13" cy="-4" r="2.4" fill="#ffffff"/>
      <circle cx="9" cy="1" r="1.2" fill="#c9f4ff"/>
      <ellipse cx="-8" cy="-2" rx="4.3" ry="6" fill="#241c2b"/>
      <ellipse cx="-7.6" cy="-0.8" rx="2.6" ry="4" fill="#4c83dc"/>
      <circle cx="-7" cy="-3.5" r="1.7" fill="#ffffff"/>
      <path d="M-14 -6 C-11 -10 -5 -10 -2 -7 M4 -8 C8 -11 14 -10 17 -7" fill="none" stroke="#1a5cae" stroke-width="2" stroke-linecap="round"/>
      <circle cx="21" cy="10" r="1.5" fill="#7b5e43"/>
      <path d="M11 17 C15 20 20 20 24 16" fill="none" stroke="#241c2b" stroke-width="2" stroke-linecap="round"/>
      <path d="M-3 6 C5 1 16 2 22 8" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" opacity="0.6"/>
      <path d="M-18 20 C-14 27 -7 30 2 30" fill="none" stroke="#7ad9f2" stroke-width="2.6" stroke-linecap="round" opacity="0.7"/>
    </g>
    <path d="M64 35 C73 32 81 34 86 39" fill="none" stroke="#e9ffff" stroke-width="2" stroke-linecap="round" opacity="0.65"/>
    <path d="M154 65 C157 69 157 75 153 79" fill="none" stroke="#baf6ff" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
    </g>
  `,
    alakazam: (u) => `
    <defs>
      <linearGradient id="${u}-skin" x1="0" y1="0" x2="0.7" y2="1">
        <stop offset="0" stop-color="#ffe779"/>
        <stop offset="0.5" stop-color="#f6bf35"/>
        <stop offset="0.82" stop-color="#d8911d"/>
        <stop offset="1" stop-color="#b46f12"/>
      </linearGradient>
      <radialGradient id="${u}-chest" cx="0.42" cy="0.2" r="0.9">
        <stop offset="0" stop-color="#fff3af"/>
        <stop offset="0.7" stop-color="#f3cf61"/>
        <stop offset="1" stop-color="#d9a12b"/>
      </radialGradient>
      <linearGradient id="${u}-brown" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#a25931"/>
        <stop offset="0.55" stop-color="#74391f"/>
        <stop offset="1" stop-color="#4c2418"/>
      </linearGradient>
      <linearGradient id="${u}-silver" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset="0.3" stop-color="#e5edf8"/>
        <stop offset="0.65" stop-color="#9eabc1"/>
        <stop offset="0.88" stop-color="#e8eff9"/>
        <stop offset="1" stop-color="#707b91"/>
      </linearGradient>
      <linearGradient id="${u}-purple" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#d6a4ff"/>
        <stop offset="0.5" stop-color="#9a55e6"/>
        <stop offset="1" stop-color="#5d249e"/>
      </linearGradient>
      <radialGradient id="${u}-star" cx="0.35" cy="0.28" r="0.8">
        <stop offset="0" stop-color="#ff9b8c"/>
        <stop offset="0.55" stop-color="#e8393e"/>
        <stop offset="1" stop-color="#8d1528"/>
      </radialGradient>
    </defs>
    <g>
    <ellipse cx="100" cy="184" rx="57" ry="7" fill="#241c2b" opacity="0.15"/>
    <ellipse cx="100" cy="107" rx="66" ry="27" fill="none" stroke="url(#${u}-purple)" stroke-width="3" opacity="0.5" transform="rotate(-17 100 107)"/>
    <ellipse cx="100" cy="107" rx="54" ry="43" fill="none" stroke="#b97bfa" stroke-width="2" opacity="0.42" transform="rotate(27 100 107)"/>
    <ellipse cx="100" cy="107" rx="75" ry="17" fill="none" stroke="#d1a0ff" stroke-width="1.8" opacity="0.5" transform="rotate(10 100 107)"/>
    <path d="M25 94 C35 89 43 89 50 92 C42 96 35 101 30 108 C27 104 25 99 25 94 Z" fill="#c18cff" opacity="0.35" stroke="#e4c7ff" stroke-width="1.2"/>
    <path d="M168 129 C161 125 154 124 148 126 C154 131 160 137 164 144 C168 139 169 134 168 129 Z" fill="#b87aff" opacity="0.35" stroke="#e4c7ff" stroke-width="1.2"/>
    <circle cx="41" cy="68" r="2.4" fill="#e8d4ff" opacity="0.8"/>
    <circle cx="166" cy="51" r="1.8" fill="#ead9ff" opacity="0.7"/>
    <circle cx="158" cy="100" r="1.4" fill="#f5eaff" opacity="0.7"/>
    <path d="M128 139 C154 140 176 151 178 164 C179 174 167 178 155 173 C142 168 134 157 124 150 Z" fill="url(#${u}-skin)" stroke="#241c2b" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M151 150 C161 155 169 162 171 169 C169 164 163 159 157 156 Z" fill="#a56210" opacity="0.55"/>
    <path d="M79 145 C69 156 64 168 56 176 C50 183 40 181 37 175 C34 168 40 162 49 156 C61 146 67 137 72 132 Z" fill="url(#${u}-skin)" stroke="#241c2b" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M122 145 C128 157 131 169 139 176 C146 182 157 180 159 173 C161 166 154 160 144 154 C135 148 130 140 127 133 Z" fill="url(#${u}-skin)" stroke="#241c2b" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M36 176 C25 179 24 187 35 188 C48 190 58 186 60 179 C61 173 51 171 44 173 Z" fill="url(#${u}-skin)" stroke="#241c2b" stroke-width="3" stroke-linejoin="round"/>
    <path d="M137 174 C132 181 136 187 148 188 C160 189 168 184 167 177 C166 171 156 168 148 171 Z" fill="url(#${u}-skin)" stroke="#241c2b" stroke-width="3" stroke-linejoin="round"/>
    <path d="M41 177 C47 176 52 178 54 181 M145 177 C151 176 157 178 159 181" fill="none" stroke="#a8680e" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
    <path d="M100 72 C78 72 65 88 63 111 C61 132 71 148 86 153 C106 160 125 153 136 141 C146 127 141 105 134 91 C127 78 115 72 100 72 Z" fill="url(#${u}-skin)" stroke="#241c2b" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M100 82 C84 82 75 95 74 112 C73 129 82 142 100 146 C118 142 128 129 126 112 C125 95 116 82 100 82 Z" fill="url(#${u}-chest)"/>
    <path d="M68 101 C78 94 91 96 100 104 C86 103 76 107 66 113 C65 109 66 105 68 101 Z" fill="url(#${u}-brown)" stroke="#241c2b" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M132 99 C124 94 113 96 105 103 C117 102 126 106 136 112 C136 107 135 103 132 99 Z" fill="url(#${u}-brown)" stroke="#241c2b" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M70 121 C81 116 94 119 100 126 C84 126 76 129 68 135 C68 130 68 125 70 121 Z" fill="url(#${u}-brown)" stroke="#241c2b" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M131 119 C121 115 110 118 104 124 C118 124 125 129 134 134 C134 129 133 124 131 119 Z" fill="url(#${u}-brown)" stroke="#241c2b" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M72 140 C83 136 94 138 100 144 C88 144 80 147 72 151 C71 147 71 143 72 140 Z" fill="url(#${u}-brown)" stroke="#241c2b" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M128 139 C118 135 108 138 103 143 C115 143 122 147 130 151 C130 147 129 143 128 139 Z" fill="url(#${u}-brown)" stroke="#241c2b" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M136 144 C151 140 168 142 179 149 C186 154 184 162 176 164 C167 166 159 160 152 158 C144 156 136 154 134 149 C133 146 134 145 136 144 Z" fill="url(#${u}-skin)" stroke="#241c2b" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M150 145 C159 147 166 151 171 156 C164 156 157 156 149 154 C149 151 150 148 150 145 Z" fill="url(#${u}-brown)" stroke="#241c2b" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M176 150 C182 155 183 160 179 163 C179 158 178 154 174 151 Z" fill="#ffe79b" opacity="0.6"/>
    <path d="M158 157 C165 159 171 159 176 157" fill="none" stroke="#a8680e" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
    <path d="M77 112 C83 105 92 104 99 109" fill="none" stroke="#fff4bd" stroke-width="3" stroke-linecap="round" opacity="0.55"/>
    <path d="M69 137 C75 151 87 158 101 159" fill="none" stroke="#a8650e" stroke-width="2.2" stroke-linecap="round" opacity="0.5"/>
    <path d="M79 34 C69 28 58 19 62 16 C74 18 85 26 91 34 Z" fill="url(#${u}-skin)" stroke="#241c2b" stroke-width="3" stroke-linejoin="round"/>
    <path d="M77 31 C71 26 66 22 65 20 C72 22 79 27 83 31 Z" fill="#9a5f2c" opacity="0.7"/>
    <path d="M120 32 C127 21 137 15 144 16 C144 27 137 36 128 41 Z" fill="url(#${u}-skin)" stroke="#241c2b" stroke-width="3" stroke-linejoin="round"/>
    <path d="M124 31 C129 24 134 20 138 19 C137 25 132 31 128 34 Z" fill="#9a5f2c" opacity="0.65"/>
    <path d="M100 23 C82 23 69 32 66 47 C59 50 59 62 65 69 C72 78 85 86 101 86 C120 86 133 76 138 63 C142 50 134 38 123 33 C116 27 108 23 100 23 Z" fill="url(#${u}-skin)" stroke="#241c2b" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M64 62 C67 76 81 86 100 86 C115 86 127 80 133 70 C130 82 117 90 100 90 C82 90 67 79 64 62 Z" fill="#a86910" opacity="0.35"/>
    <path d="M74 37 C84 32 96 32 106 36" fill="none" stroke="#fff0a2" stroke-width="3" stroke-linecap="round" opacity="0.55"/>
    <path d="M99 27 L103 36 L113 35 L105 41 L110 50 L100 45 L91 51 L94 41 L86 36 L96 34 Z" fill="url(#${u}-star)" stroke="#7d1428" stroke-width="2" stroke-linejoin="round"/>
    <path d="M100 30 L101 37 L106 36 L102 40 L104 45 L100 42 L95 45 L97 40 L93 37 L98 36 Z" fill="#ffb1a1" opacity="0.7"/>
    <path d="M72 53 C80 46 91 46 98 52 L96 58 C89 53 82 53 76 58 Z" fill="#8b4c1f" stroke="#241c2b" stroke-width="2.3" stroke-linejoin="round"/>
    <path d="M128 51 C120 44 109 45 102 51 L104 57 C111 52 119 53 124 57 Z" fill="#8b4c1f" stroke="#241c2b" stroke-width="2.3" stroke-linejoin="round"/>
    <path d="M76 58 C82 55 90 56 95 61 C90 66 83 67 78 64 C76 62 76 60 76 58 Z" fill="#fff4d8" stroke="#241c2b" stroke-width="2.1" stroke-linejoin="round"/>
    <path d="M127 56 C121 53 112 54 106 60 C111 65 119 65 124 62 C126 60 127 58 127 56 Z" fill="#fff4d8" stroke="#241c2b" stroke-width="2.1" stroke-linejoin="round"/>
    <path d="M82 58 C86 58 90 59 92 62 C88 64 84 63 81 61 Z" fill="#bd2341"/>
    <path d="M112 57 C117 57 121 58 123 61 C119 64 114 63 110 60 Z" fill="#bd2341"/>
    <ellipse cx="86.5" cy="60.7" rx="1.4" ry="3.1" fill="#2b1722"/>
    <ellipse cx="116" cy="60" rx="1.5" ry="3.3" fill="#2b1722"/>
    <circle cx="87.5" cy="58.7" r="1.4" fill="#ffffff"/>
    <circle cx="83.8" cy="61" r="0.7" fill="#ffd7cd"/>
    <circle cx="117" cy="58.5" r="1.5" fill="#ffffff"/>
    <circle cx="113.5" cy="61" r="0.8" fill="#ffd7cd"/>
    <path d="M78 56 C84 53 91 54 95 58 M108 57 C113 54 120 55 124 58" fill="none" stroke="#f7d887" stroke-width="1.4" stroke-linecap="round" opacity="0.65"/>
    <path d="M105 67 C114 67 123 71 126 77 C125 82 118 84 111 82 C105 80 102 75 103 70 C103 68 104 67 105 67 Z" fill="#ffe192" stroke="#241c2b" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M107 69 C114 69 121 72 124 76 C117 74 111 75 107 77 Z" fill="#fff7cf" opacity="0.65"/>
    <circle cx="121" cy="73" r="1.6" fill="#6e3a22"/>
    <path d="M111 78 C116 80 120 79 123 76" fill="none" stroke="#241c2b" stroke-width="2" stroke-linecap="round"/>
    <path d="M105 83 C108 85 112 86 115 85" fill="none" stroke="#a7691c" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
    <path d="M102 79 C90 80 76 84 62 91 C54 95 50 100 53 103 C62 101 76 96 88 90 C96 87 103 84 102 79 Z" fill="#fff7dc" stroke="#241c2b" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M119 78 C131 80 143 85 154 91 C160 94 162 99 158 102 C149 100 138 95 127 89 C120 86 116 82 119 78 Z" fill="#fff7dc" stroke="#241c2b" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M100 81 C88 83 75 87 64 92 C76 91 88 88 97 84 Z" fill="#e4d0a5" opacity="0.6"/>
    <path d="M122 81 C134 86 145 90 155 94 C145 92 134 89 125 84 Z" fill="#e4d0a5" opacity="0.6"/>
    <path d="M53 102 C49 106 50 111 55 114" fill="none" stroke="#241c2b" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M53 102 C49 106 50 111 55 114" fill="none" stroke="#fff7dc" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M158 101 C162 105 161 110 156 113" fill="none" stroke="#241c2b" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M158 101 C162 105 161 110 156 113" fill="none" stroke="#fff7dc" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M52 123 C47 111 42 99 37 87" fill="none" stroke="#241c2b" stroke-width="6.5" stroke-linecap="round"/>
    <path d="M52 123 C47 111 42 99 37 87" fill="none" stroke="url(#${u}-silver)" stroke-width="3.6" stroke-linecap="round"/>
    <path d="M34 54 C44 55 49 65 47 76 C45 86 40 91 35 91 C29 90 24 82 23 73 C22 63 26 55 34 54 Z" fill="url(#${u}-silver)" stroke="#241c2b" stroke-width="2.8" stroke-linejoin="round"/>
    <path d="M30 64 C26 70 25 77 29 84 C32 88 36 89 39 88 C33 82 29 72 30 64 Z" fill="#ffffff" opacity="0.72"/>
    <path d="M30 64 C26 70 25 77 29 84 C32 88 36 89 39 88" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity="0.8"/>
    <path d="M40 58 C45 64 45 76 40 86 C43 78 43 67 40 58 Z" fill="#78869c" opacity="0.3"/>
    <path d="M28 63 C24 70 24 78 27 85" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity="0.85"/>
    <path d="M53 119 C48 122 46 129 49 134 C53 139 60 137 63 132 C65 127 62 121 58 119 Z" fill="url(#${u}-skin)" stroke="#241c2b" stroke-width="2.8" stroke-linejoin="round"/>
    <path d="M51 127 C54 124 58 123 61 124 M52 132 C55 129 59 128 62 129" fill="none" stroke="#a8680e" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M148 123 C153 111 158 99 163 87" fill="none" stroke="#241c2b" stroke-width="6.5" stroke-linecap="round"/>
    <path d="M148 123 C153 111 158 99 163 87" fill="none" stroke="url(#${u}-silver)" stroke-width="3.6" stroke-linecap="round"/>
    <path d="M166 54 C156 55 151 65 153 76 C155 86 160 91 165 91 C171 90 176 82 177 73 C178 63 174 55 166 54 Z" fill="url(#${u}-silver)" stroke="#241c2b" stroke-width="2.8" stroke-linejoin="round"/>
    <path d="M170 64 C174 70 175 77 171 84 C168 88 164 89 161 88 C167 82 171 72 170 64 Z" fill="#ffffff" opacity="0.66"/>
    <path d="M170 64 C174 70 175 77 171 84 C168 88 164 89 161 88" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity="0.8"/>
    <path d="M160 58 C155 64 155 76 160 86 C157 78 157 67 160 58 Z" fill="#78869c" opacity="0.3"/>
    <path d="M172 63 C176 70 176 78 173 85" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity="0.85"/>
    <path d="M146 118 C151 121 153 127 150 133 C146 138 139 136 137 131 C135 126 139 120 143 118 Z" fill="url(#${u}-skin)" stroke="#241c2b" stroke-width="2.8" stroke-linejoin="round"/>
    <path d="M149 125 C146 122 142 122 139 123 M148 131 C145 128 141 128 138 129" fill="none" stroke="#a8680e" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M52 67 C48 59 46 51 47 43" fill="none" stroke="#d8b4ff" stroke-width="1.8" stroke-linecap="round" opacity="0.65"/>
    <circle cx="45" cy="39" r="2.1" fill="#e6ccff" opacity="0.75"/>
    <circle cx="163" cy="103" r="1.7" fill="#f0ddff" opacity="0.65"/>
    </g>
  `,
    onix: (u) => `
    <defs>
      <linearGradient id="${u}-rock" x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0" stop-color="#d9d5ce"/>
        <stop offset="0.34" stop-color="#a9a8a5"/>
        <stop offset="0.7" stop-color="#75787c"/>
        <stop offset="1" stop-color="#4a4d55"/>
      </linearGradient>
      <linearGradient id="${u}-rockDark" x1="0" y1="0" x2="0.7" y2="1">
        <stop offset="0" stop-color="#a9aaad"/>
        <stop offset="0.5" stop-color="#74777e"/>
        <stop offset="1" stop-color="#3e434c"/>
      </linearGradient>
      <linearGradient id="${u}-rockLight" x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0" stop-color="#f1ede2"/>
        <stop offset="0.55" stop-color="#bebcb5"/>
        <stop offset="1" stop-color="#888a8d"/>
      </linearGradient>
      <linearGradient id="${u}-crack" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ffd36b"/>
        <stop offset="0.5" stop-color="#f39a35"/>
        <stop offset="1" stop-color="#b85820"/>
      </linearGradient>
      <radialGradient id="${u}-dust" cx="0.5" cy="0.45" r="0.58">
        <stop offset="0" stop-color="#e9c891" stop-opacity="0.62"/>
        <stop offset="0.65" stop-color="#bfa47c" stop-opacity="0.3"/>
        <stop offset="1" stop-color="#b39a78" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="${u}-eye" cx="0.4" cy="0.35" r="0.7">
        <stop offset="0" stop-color="#fff8b5"/>
        <stop offset="0.55" stop-color="#ffc83d"/>
        <stop offset="1" stop-color="#d96b12"/>
      </radialGradient>
      <linearGradient id="${u}-shadow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2e333b" stop-opacity="0.5"/>
        <stop offset="1" stop-color="#20242a" stop-opacity="0.78"/>
      </linearGradient>
    </defs>
    <g>
    <ellipse cx="100" cy="184" rx="78" ry="9" fill="#241c2b" opacity="0.18"/>
    <ellipse cx="36" cy="175" rx="33" ry="16" fill="url(#${u}-dust)"/>
    <ellipse cx="166" cy="172" rx="36" ry="18" fill="url(#${u}-dust)"/>
    <ellipse cx="100" cy="186" rx="72" ry="11" fill="url(#${u}-dust)" opacity="0.75"/>
    <path d="M42 174 C63 186 101 188 133 176 C165 164 178 143 166 127 C154 111 130 119 114 112 C97 104 91 94 99 86" fill="none" stroke="#241c2b" stroke-width="54" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M42 174 C63 186 101 188 133 176 C165 164 178 143 166 127 C154 111 130 119 114 112 C97 104 91 94 99 86" fill="none" stroke="url(#${u}-rockDark)" stroke-width="46" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M45 169 C65 181 101 183 130 172 C157 162 170 144 161 131" fill="none" stroke="#b7b3aa" stroke-width="2.4" stroke-linecap="round" opacity="0.35"/>
    <path d="M19 167 C24 158 38 154 46 160 C53 166 49 175 39 179 C28 183 19 177 19 167 Z" fill="url(#${u}-rockDark)" stroke="#241c2b" stroke-width="3" stroke-linejoin="round"/>
    <path d="M25 165 C31 160 38 160 43 163 C36 164 31 168 28 173 Z" fill="#dcd5c8" opacity="0.45"/>
    <path d="M43 162 C58 154 79 157 86 167 C92 177 82 186 66 188 C50 190 37 180 38 172 C38 167 39 164 43 162 Z" fill="url(#${u}-rock)" stroke="#241c2b" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M46 166 C58 160 73 161 81 167 C67 164 54 167 45 174 Z" fill="#eee7d8" opacity="0.5"/>
    <path d="M42 180 C52 184 65 184 75 180 C63 188 49 187 41 183 Z" fill="#30353d" opacity="0.5"/>
    <path d="M58 168 L65 174 L60 179 L69 183" fill="none" stroke="url(#${u}-crack)" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M83 159 C102 152 125 158 133 169 C141 180 128 190 109 190 C90 190 76 181 77 172 C78 166 80 162 83 159 Z" fill="url(#${u}-rockLight)" stroke="#241c2b" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M87 163 C102 157 119 160 128 167 C111 163 96 167 86 174 Z" fill="#fff9ea" opacity="0.55"/>
    <path d="M79 181 C91 187 111 188 126 182 C114 190 92 191 80 187 Z" fill="#4a4d53" opacity="0.45"/>
    <path d="M103 166 L110 173 L105 178 L115 184" fill="none" stroke="url(#${u}-crack)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M111 174 L119 176 L122 182" fill="none" stroke="#ffd477" stroke-width="1.4" stroke-linecap="round" opacity="0.8"/>
    <path d="M124 152 C140 144 160 150 169 161 C178 173 167 185 150 185 C134 185 120 174 121 164 C121 158 121 155 124 152 Z" fill="url(#${u}-rockDark)" stroke="#241c2b" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M128 156 C141 149 156 152 164 160 C148 155 136 158 126 166 Z" fill="#dfd8cb" opacity="0.48"/>
    <path d="M128 176 C138 183 153 184 166 178 C156 186 139 188 127 183 Z" fill="#262b33" opacity="0.5"/>
    <path d="M146 159 L154 165 L149 171 L158 177" fill="none" stroke="url(#${u}-crack)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M154 164 L162 166 L165 172" fill="none" stroke="#ffcf6c" stroke-width="1.3" stroke-linecap="round" opacity="0.75"/>
    <path d="M151 132 C162 125 176 132 180 143 C184 154 176 165 165 164 C154 163 146 155 147 147 C147 141 148 136 151 132 Z" fill="url(#${u}-rock)" stroke="#241c2b" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M155 136 C163 131 173 133 178 139 C167 135 161 139 155 146 Z" fill="#f0e9db" opacity="0.5"/>
    <path d="M172 118 L181 112 L179 124 L186 128 L176 132 Z" fill="url(#${u}-rockDark)" stroke="#241c2b" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M176 121 L179 118 L178 124 L182 126 L177 127 Z" fill="#d9d3c7" opacity="0.45"/>
    <path d="M174 150 L184 147 L180 157 L187 160 L177 164 Z" fill="url(#${u}-rock)" stroke="#241c2b" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M178 153 L182 151 L181 156 Z" fill="#e4ddd1" opacity="0.45"/>
    <path d="M151 154 C157 160 166 162 175 158 C167 165 157 167 150 162 Z" fill="#363b43" opacity="0.48"/>
    <path d="M164 140 L169 145 L165 151 L173 157" fill="none" stroke="url(#${u}-crack)" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M143 110 C153 103 167 109 171 120 C175 131 167 139 156 137 C146 135 138 127 139 119 C140 114 141 111 143 110 Z" fill="url(#${u}-rockLight)" stroke="#241c2b" stroke-width="3.1" stroke-linejoin="round"/>
    <path d="M147 114 C155 109 163 111 168 116 C158 114 152 118 147 124 Z" fill="#fff9ea" opacity="0.52"/>
    <path d="M146 130 C152 134 160 134 166 131 C159 138 149 138 143 133 Z" fill="#4c4f54" opacity="0.45"/>
    <path d="M154 119 L159 124 L155 129" fill="none" stroke="#e89a36" stroke-width="1.8" stroke-linecap="round" opacity="0.7"/>
    <path d="M112 100 C124 93 141 97 148 106 C155 115 151 126 140 128 C128 130 115 124 110 116 C107 111 108 104 112 100 Z" fill="url(#${u}-rock)" stroke="#241c2b" stroke-width="3.1" stroke-linejoin="round"/>
    <path d="M116 104 C125 98 137 100 144 106 C130 103 122 107 115 114 Z" fill="#efe8da" opacity="0.48"/>
    <path d="M116 120 C124 124 134 124 140 121 C133 127 123 128 116 124 Z" fill="#373c44" opacity="0.45"/>
    <path d="M126 108 L132 114 L128 119 L136 123" fill="none" stroke="url(#${u}-crack)" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M85 88 C94 81 112 82 121 89 C130 96 128 108 118 112 C107 116 94 111 88 104 C83 98 82 92 85 88 Z" fill="url(#${u}-rockDark)" stroke="#241c2b" stroke-width="3.1" stroke-linejoin="round"/>
    <path d="M89 92 C97 86 110 87 117 92 C105 89 96 93 90 99 Z" fill="#d4cec2" opacity="0.45"/>
    <path d="M91 104 L98 110 L94 116 L103 120" fill="none" stroke="url(#${u}-crack)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M57 150 C62 143 70 140 78 143 C74 150 69 157 66 165 C60 161 56 156 57 150 Z" fill="#b3ada3" opacity="0.25"/>
    <path d="M72 49 C69 35 82 24 100 22 C120 21 135 30 139 45 C142 58 137 71 128 80 L121 92 L105 97 L88 94 C77 89 70 79 68 67 Z" fill="url(#${u}-rock)" stroke="#241c2b" stroke-width="3.4" stroke-linejoin="round"/>
    <path d="M76 45 C85 31 102 25 120 30 C104 31 90 38 82 49 Z" fill="#f2ecdf" opacity="0.55"/>
    <path d="M72 78 C82 88 96 94 111 92 C95 98 80 92 70 82 Z" fill="#3f4249" opacity="0.55"/>
    <path d="M86 43 L95 51 L91 58 L102 64" fill="none" stroke="url(#${u}-crack)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M127 39 L134 47 L131 55 L139 61 L135 71" fill="none" stroke="#4c4d50" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M118 44 L124 49 L121 56" fill="none" stroke="#f1a340" stroke-width="1.6" stroke-linecap="round" opacity="0.7"/>
    <path d="M91 31 L99 16 L109 27 L106 40 L94 43 Z" fill="url(#${u}-rockLight)" stroke="#241c2b" stroke-width="3" stroke-linejoin="round"/>
    <path d="M97 21 L101 30 L99 38 L94 39 L95 29 Z" fill="#fff8e9" opacity="0.65"/>
    <path d="M69 54 L55 48 L62 61 L53 68 L67 70 Z" fill="url(#${u}-rockDark)" stroke="#241c2b" stroke-width="2.7" stroke-linejoin="round"/>
    <path d="M136 51 L150 44 L144 58 L154 65 L139 69 Z" fill="url(#${u}-rockDark)" stroke="#241c2b" stroke-width="2.7" stroke-linejoin="round"/>
    <path d="M73 53 C82 47 92 48 98 54 L96 62 C89 57 82 57 77 61 Z" fill="#4b4745" stroke="#241c2b" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M130 52 C121 46 111 47 105 53 L107 61 C114 56 121 56 126 60 Z" fill="#4b4745" stroke="#241c2b" stroke-width="2.6" stroke-linejoin="round"/>
    <ellipse cx="86" cy="65" rx="6.4" ry="4.4" fill="url(#${u}-eye)" stroke="#241c2b" stroke-width="2"/>
    <ellipse cx="116" cy="63" rx="6.4" ry="4.4" fill="url(#${u}-eye)" stroke="#241c2b" stroke-width="2"/>
    <ellipse cx="86" cy="65" rx="2" ry="3.7" fill="#271b16"/>
    <ellipse cx="116" cy="63" rx="2" ry="3.7" fill="#271b16"/>
    <circle cx="88" cy="63" r="1.7" fill="#fffbe0"/>
    <circle cx="118" cy="61" r="1.7" fill="#fffbe0"/>
    <path d="M80 54 C86 52 91 54 93 58" fill="none" stroke="#7e6e58" stroke-width="1.7" stroke-linecap="round" opacity="0.75"/>
    <path d="M123 53 C117 51 113 53 110 57" fill="none" stroke="#7e6e58" stroke-width="1.7" stroke-linecap="round" opacity="0.7"/>
    <path d="M100 62 C104 65 107 69 108 73" fill="none" stroke="#6c6a65" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="101" cy="74" r="1.5" fill="#302723"/>
    <circle cx="110" cy="73" r="1.4" fill="#302723" opacity="0.85"/>
    <path d="M83 78 C94 75 107 77 120 82 C119 89 109 94 98 93 C90 92 84 86 83 78 Z" fill="#2c2024" stroke="#241c2b" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M87 79 L90 87 L94 80 L98 89 L102 80 L106 88 L110 80 L114 86 L117 81" fill="#fff2d2" stroke="#241c2b" stroke-width="1.1" stroke-linejoin="round"/>
    <path d="M82 86 C90 98 108 102 121 91 C121 101 108 108 95 103 C87 100 82 94 82 86 Z" fill="url(#${u}-rockDark)" stroke="#241c2b" stroke-width="2.7" stroke-linejoin="round"/>
    <path d="M88 94 C96 99 109 100 118 94" fill="none" stroke="#6f706f" stroke-width="1.8" stroke-linecap="round" opacity="0.6"/>
    <path d="M59 70 C54 63 52 55 54 47" fill="none" stroke="#e59a3d" stroke-width="1.8" stroke-linecap="round" opacity="0.55"/>
    <path d="M145 78 L153 84 L150 92" fill="none" stroke="#f0a748" stroke-width="1.7" stroke-linecap="round" opacity="0.6"/>
    <path d="M29 177 C22 172 16 176 18 182 C25 187 35 184 36 179 Z" fill="#c4aa83" opacity="0.55"/>
    <path d="M158 182 C164 176 173 179 175 184 C170 189 160 189 156 185 Z" fill="#d6bb90" opacity="0.5"/>
    <path d="M39 164 C49 161 57 164 61 170 C52 170 46 173 42 178 Z" fill="#e3c89b" opacity="0.45"/>
    <path d="M151 166 C160 162 169 165 172 171 C164 171 157 175 153 180 Z" fill="#e3c89b" opacity="0.4"/>
    <circle cx="45" cy="155" r="1.7" fill="#f5d39a" opacity="0.7"/>
    <circle cx="168" cy="150" r="1.8" fill="#f5d39a" opacity="0.6"/>
    <circle cx="123" cy="179" r="1.4" fill="#f6d49c" opacity="0.7"/>
    <circle cx="71" cy="183" r="1.3" fill="#f6d49c" opacity="0.6"/>
    </g>
  `,
    starmie: (u) => `
    <defs>
      <linearGradient id="${u}-star" x1="0" y1="0" x2="0.85" y2="1">
        <stop offset="0" stop-color="#c68cff"/>
        <stop offset="0.32" stop-color="#8b48d8"/>
        <stop offset="0.7" stop-color="#5a229e"/>
        <stop offset="1" stop-color="#35115f"/>
      </linearGradient>
      <linearGradient id="${u}-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fff3a8"/>
        <stop offset="0.28" stop-color="#f3c852"/>
        <stop offset="0.62" stop-color="#c88a22"/>
        <stop offset="0.85" stop-color="#ffe18a"/>
        <stop offset="1" stop-color="#9a6218"/>
      </linearGradient>
      <radialGradient id="${u}-gem" cx="0.36" cy="0.28" r="0.8">
        <stop offset="0" stop-color="#fff7de"/>
        <stop offset="0.16" stop-color="#ffb7a4"/>
        <stop offset="0.48" stop-color="#ef3f58"/>
        <stop offset="0.78" stop-color="#b4143c"/>
        <stop offset="1" stop-color="#5c0825"/>
      </radialGradient>
      <linearGradient id="${u}-facet" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fff1b3"/>
        <stop offset="0.45" stop-color="#ff8297"/>
        <stop offset="1" stop-color="#d6204f"/>
      </linearGradient>
      <linearGradient id="${u}-water" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#a9f7ff" stop-opacity="0"/>
        <stop offset="0.25" stop-color="#6bdcf4" stop-opacity="0.8"/>
        <stop offset="0.55" stop-color="#2b9ddb" stop-opacity="0.55"/>
        <stop offset="0.82" stop-color="#b9fbff" stop-opacity="0.8"/>
        <stop offset="1" stop-color="#7be8ff" stop-opacity="0"/>
      </linearGradient>
      <radialGradient id="${u}-aura" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0.35" stop-color="#cf9bff" stop-opacity="0.25"/>
        <stop offset="0.7" stop-color="#9a58e8" stop-opacity="0.12"/>
        <stop offset="1" stop-color="#6c2fb0" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="${u}-darkPurple" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#4a1b84" stop-opacity="0.7"/>
        <stop offset="1" stop-color="#200934" stop-opacity="0.5"/>
      </linearGradient>
    </defs>
    <g>
    <ellipse cx="100" cy="100" rx="86" ry="86" fill="url(#${u}-aura)"/>
    <path d="M16 176 C31 160 58 158 77 168 C93 176 111 175 127 164 C146 151 169 156 184 174 C169 170 154 173 145 182 C127 194 101 188 87 181 C68 171 45 173 31 183 C24 188 17 185 16 176 Z" fill="url(#${u}-water)" opacity="0.7"/>
    <path d="M28 168 C46 154 66 158 82 166 C97 173 111 170 124 160 C142 146 161 151 174 163" fill="none" stroke="#72def4" stroke-width="3.2" stroke-linecap="round" opacity="0.55"/>
    <path d="M21 181 C40 174 56 179 69 185 C86 192 103 187 117 180 C135 170 153 171 170 181" fill="none" stroke="#bdfbff" stroke-width="2.2" stroke-linecap="round" opacity="0.6"/>
    <path d="M47 189 C61 180 78 182 91 187 C105 192 120 189 133 181" fill="none" stroke="#4cc4e7" stroke-width="2.4" stroke-linecap="round" opacity="0.45"/>
    <path d="M100 18 L128 58 L179 74 L146 112 L149 166 L100 149 L51 166 L54 112 L21 74 L72 58 Z" fill="#6a2fa6" stroke="#241c2b" stroke-width="5.2" stroke-linejoin="round"/>
    <path d="M100 18 L128 58 L179 74 L146 112 L149 166 L100 149 L51 166 L54 112 L21 74 L72 58 Z" fill="url(#${u}-star)" stroke="url(#${u}-gold)" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M100 27 L124 61 L168 76 L138 109 L140 153 L100 138 L60 153 L62 109 L32 76 L76 61 Z" fill="none" stroke="#d8a842" stroke-width="1.4" stroke-linejoin="round" opacity="0.45"/>
    <path d="M100 101 L128 58 L132 65 L100 112 Z" fill="#d2a4ff" opacity="0.34"/>
    <path d="M100 101 L179 74 L174 82 L100 113 Z" fill="#3c176b" opacity="0.35"/>
    <path d="M100 101 L146 112 L144 124 L100 114 Z" fill="#4a1b84" opacity="0.38"/>
    <path d="M100 101 L149 166 L135 162 L100 121 Z" fill="#c18cff" opacity="0.3"/>
    <path d="M100 101 L51 166 L43 157 L100 119 Z" fill="#2c0d50" opacity="0.34"/>
    <path d="M100 101 L54 112 L58 98 L100 98 Z" fill="#b576f5" opacity="0.26"/>
    <path d="M100 101 L21 74 L26 63 L100 92 Z" fill="#6a3ba4" opacity="0.4"/>
    <path d="M100 101 L72 58 L84 54 L100 90 Z" fill="#e3c1ff" opacity="0.24"/>
    <path d="M100 101 L100 18 L107 30 L103 93 Z" fill="#e6c7ff" opacity="0.22"/>
    <path d="M83 78 C88 87 94 94 101 97 C96 82 90 70 82 59 Z" fill="#e9cfff" opacity="0.2"/>
    <path d="M120 72 C116 82 112 91 109 100 C118 92 128 84 138 79 Z" fill="#2b0d4d" opacity="0.24"/>
    <path d="M112 122 C119 128 128 135 138 141 C130 129 126 120 123 111 Z" fill="#ddb5ff" opacity="0.18"/>
    <path d="M80 122 C72 130 64 137 55 143 C67 137 76 130 84 120 Z" fill="#1f0a39" opacity="0.28"/>
    <path d="M83 84 C81 74 82 65 87 57" fill="none" stroke="#e9ccff" stroke-width="2" stroke-linecap="round" opacity="0.45"/>
    <path d="M117 78 C123 86 129 93 137 98" fill="none" stroke="#f4dcff" stroke-width="1.8" stroke-linecap="round" opacity="0.35"/>
    <path d="M112 132 C117 140 121 148 124 157" fill="none" stroke="#e3beff" stroke-width="1.8" stroke-linecap="round" opacity="0.3"/>
    <path d="M80 130 C73 138 66 147 61 157" fill="none" stroke="#200b39" stroke-width="1.6" stroke-linecap="round" opacity="0.45"/>
    <circle cx="100" cy="100" r="39" fill="url(#${u}-gold)" stroke="#241c2b" stroke-width="3"/>
    <circle cx="100" cy="100" r="33.5" fill="#9f6a17" stroke="#ffe49a" stroke-width="1.8"/>
    <path d="M78 73 L86 65 L103 61 L118 66 L131 80 L135 98 L128 115 L114 130 L98 134 L81 126 L70 110 L69 90 Z" fill="url(#${u}-gem)" stroke="#6e102c" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M78 73 L100 91 L86 65 Z" fill="#ffd8c2" opacity="0.7"/>
    <path d="M86 65 L100 91 L118 66 Z" fill="#ffbfae" opacity="0.65"/>
    <path d="M118 66 L100 91 L131 80 Z" fill="#de3b58" opacity="0.75"/>
    <path d="M131 80 L100 91 L135 98 Z" fill="#ff8597" opacity="0.68"/>
    <path d="M135 98 L100 91 L128 115 Z" fill="#b31441" opacity="0.75"/>
    <path d="M128 115 L100 91 L114 130 Z" fill="#8f1035" opacity="0.72"/>
    <path d="M114 130 L100 91 L98 134 Z" fill="#d62b4e" opacity="0.7"/>
    <path d="M98 134 L100 91 L81 126 Z" fill="#f1667e" opacity="0.62"/>
    <path d="M81 126 L100 91 L70 110 Z" fill="#ffb1b4" opacity="0.65"/>
    <path d="M70 110 L100 91 L69 90 Z" fill="#fbdfb5" opacity="0.55"/>
    <path d="M69 90 L100 91 L78 73 Z" fill="#f08a91" opacity="0.55"/>
    <path d="M85 77 L99 90 L90 70 L82 80 Z" fill="#ffffff" opacity="0.5"/>
    <path d="M91 70 L101 89 L110 69 L99 73 Z" fill="#fff2dc" opacity="0.5"/>
    <path d="M104 89 L119 73 L126 88 L108 96 Z" fill="#ffd3cf" opacity="0.45"/>
    <path d="M74 96 L97 94 L87 115 L70 110 Z" fill="#ffffff" opacity="0.25"/>
    <path d="M89 117 L99 98 L104 127 L96 132 Z" fill="#fff0c2" opacity="0.23"/>
    <path d="M76 76 C82 73 88 74 92 78" fill="none" stroke="#ffffff" stroke-width="4.2" stroke-linecap="round" opacity="0.68"/>
    <path d="M80 81 C83 80 86 80 88 82" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" opacity="0.8"/>
    <path d="M107 106 C113 110 120 112 127 111" fill="none" stroke="#ffd2c6" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
    <path d="M100 68 L104 73 L100 78 L96 73 Z" fill="#fff3c9" opacity="0.8"/>
    <path d="M70 100 L73 103 L70 106 L67 103 Z" fill="#ffe8a0" opacity="0.65"/>
    <path d="M130 84 L133 87 L130 90 L127 87 Z" fill="#ffe8a0" opacity="0.6"/>
    <circle cx="100" cy="100" r="31.5" fill="none" stroke="#ffd978" stroke-width="1.2" opacity="0.65"/>
    <path d="M100 154 C99 162 97 169 93 176" fill="none" stroke="#f7d78b" stroke-width="2" stroke-linecap="round" opacity="0.45"/>
    <path d="M67 152 C63 160 56 168 48 173" fill="none" stroke="#c2f8ff" stroke-width="2" stroke-linecap="round" opacity="0.55"/>
    <path d="M136 151 C145 157 153 162 165 165" fill="none" stroke="#87e9fa" stroke-width="1.8" stroke-linecap="round" opacity="0.5"/>
    <path d="M38 142 C47 137 56 138 62 143 C57 147 51 152 47 158 C42 154 38 149 38 142 Z" fill="#78e2f4" opacity="0.25" stroke="#b7f9ff" stroke-width="1.2"/>
    <path d="M163 141 C155 136 147 137 140 143 C146 147 151 153 155 160 C160 155 163 149 163 141 Z" fill="#78e2f4" opacity="0.2" stroke="#b7f9ff" stroke-width="1.2"/>
    <circle cx="56" cy="171" r="2.4" fill="#d9fbff" opacity="0.8"/>
    <circle cx="76" cy="185" r="1.8" fill="#eaffff" opacity="0.85"/>
    <circle cx="132" cy="184" r="2.1" fill="#c9f9ff" opacity="0.8"/>
    <circle cx="149" cy="174" r="1.5" fill="#f0ffff" opacity="0.7"/>
    <path d="M24 104 L27 108 L31 109 L27 112 L28 116 L24 113 L20 115 L22 110 L19 107 L23 107 Z" fill="#e5c8ff" opacity="0.7"/>
    <path d="M173 47 L175 51 L179 52 L175 55 L176 59 L172 56 L168 58 L170 53 L167 50 L171 50 Z" fill="#bfeaff" opacity="0.7"/>
    <path d="M171 126 L173 130 L177 131 L173 134 L174 138 L170 135 L166 137 L168 132 L165 129 L169 129 Z" fill="#e5c8ff" opacity="0.55"/>
    <circle cx="181" cy="94" r="1.5" fill="#fff4c4" opacity="0.75"/>
    <circle cx="20" cy="145" r="1.3" fill="#bff8ff" opacity="0.65"/>
    </g>
  `
  };

  // js/art.js
  var ART = {
    ...ART_STARTERS,
    ...ART_FOREST,
    ...ART_MOUNTAIN,
    ...ART_SUMMIT
  };
  var ART_IDS = Object.keys(ART);
  var _artUid = 0;
  function artSVG(artId, opts = {}) {
    const fn = ART[artId];
    const variant = opts.variant ? ` variant-${opts.variant}` : "";
    const extra = opts.className ? " " + opts.className : "";
    if (!fn) {
      return `<div class="art-fallback${extra}">${opts.emoji || "❓"}</div>`;
    }
    const u = "a" + ++_artUid;
    return `<svg class="creature-art${variant}${extra}" viewBox="0 0 200 200" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">${fn(u)}</svg>`;
  }
  function creatureArt(creature, opts = {}) {
    if (!creature) return "";
    const element = creature.element || "normal";
    const info = TYPE_INFO[element] || TYPE_INFO.normal;
    const size = opts.size || "md";
    const variant = creature.variant ? ` data-variant="${creature.variant}"` : "";
    return `
    <div class="art-frame size-${size} element-${element}${opts.className ? " " + opts.className : ""}" data-element="${element}"${variant}>
      <div class="art-aura" style="--aura:${info.color}"></div>
      <div class="art-ground"></div>
      <div class="art-body">${artSVG(creature.art || creature.id, { variant: creature.variant, emoji: creature.emoji })}</div>
      <div class="art-sparks"></div>
    </div>`;
  }

  // js/fx.js
  var canvas;
  var ctx;
  var W = 0;
  var H = 0;
  var DPR = 1;
  var rafId = null;
  var lastTime = 0;
  var particles = [];
  var rings = [];
  var slashes = [];
  var floaters = [];
  var beams = [];
  var projectiles = [];
  var flashes = [];
  var MAX_PARTICLES = 900;
  var ELEMENT_STYLE = {
    fire: { core: "#fff3c4", main: "#ff7a18", alt: "#ffd54f", shape: "spark" },
    water: { core: "#e3f7ff", main: "#2f9bff", alt: "#7fd6ff", shape: "circle" },
    grass: { core: "#eaffd8", main: "#4caf50", alt: "#a5e86b", shape: "leaf" },
    electric: { core: "#fffde7", main: "#ffd600", alt: "#a0e9ff", shape: "spark" },
    ice: { core: "#eaffff", main: "#6ee7f5", alt: "#b4f4ff", shape: "shard" },
    fighting: { core: "#ffe6d5", main: "#ff7043", alt: "#ffb59b", shape: "spark" },
    psychic: { core: "#fbe4ff", main: "#d46bff", alt: "#8e7dff", shape: "circle" },
    dark: { core: "#e3dcff", main: "#7c5cff", alt: "#3b2f66", shape: "smoke" },
    dragon: { core: "#efe6ff", main: "#9f7bff", alt: "#6a4bff", shape: "spark" },
    normal: { core: "#ffffff", main: "#cfd8dc", alt: "#90a4ae", shape: "spark" },
    poison: { core: "#f3e5ff", main: "#b45cff", alt: "#7d3fbf", shape: "bubble" }
  };
  var audioCtx = null;
  var muted = false;
  try {
    muted = localStorage.getItem("pkmn_fx_muted") === "1";
  } catch (e) {
  }
  function unlockAudio() {
    if (audioCtx) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    } catch (e) {
      audioCtx = null;
    }
  }
  function setMuted(v) {
    muted = v;
    try {
      localStorage.setItem("pkmn_fx_muted", v ? "1" : "0");
    } catch (e) {
    }
    const btn = document.getElementById("btn-sound");
    if (btn) btn.textContent = muted ? "🔇" : "🔊";
  }
  function isMuted() {
    return muted;
  }
  function ac() {
    if (!audioCtx) unlockAudio();
    return audioCtx;
  }
  function tone({ freq = 440, to = null, dur = 0.16, type = "sine", gain = 0.12, delay = 0 }) {
    if (muted) return;
    const c = ac();
    if (!c) return;
    try {
      const t0 = c.currentTime + delay;
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t0);
      if (to) osc.frequency.exponentialRampToValueAtTime(Math.max(30, to), t0 + dur);
      g.gain.setValueAtTime(1e-4, t0);
      g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
      g.gain.exponentialRampToValueAtTime(1e-4, t0 + dur);
      osc.connect(g).connect(c.destination);
      osc.start(t0);
      osc.stop(t0 + dur + 0.02);
    } catch (e) {
    }
  }
  function noise({ dur = 0.18, gain = 0.12, freq = 1200, q = 1, delay = 0, slideTo = null, type = "bandpass" }) {
    if (muted) return;
    const c = ac();
    if (!c) return;
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
      g.gain.exponentialRampToValueAtTime(1e-4, t0 + dur);
      src.connect(filter).connect(g).connect(c.destination);
      src.start(t0);
      src.stop(t0 + dur + 0.02);
    } catch (e) {
    }
  }
  var SFX = {
    click: () => tone({ freq: 620, to: 900, dur: 0.07, type: "triangle", gain: 0.06 }),
    card: () => {
      noise({ dur: 0.12, gain: 0.05, freq: 2600, slideTo: 700 });
      tone({ freq: 520, to: 760, dur: 0.1, type: "triangle", gain: 0.05 });
    },
    hit: (element = "normal") => {
      noise({ dur: 0.16, gain: 0.16, freq: 2400, slideTo: 380, q: 0.8 });
      tone({ freq: 150, to: 62, dur: 0.18, type: "sine", gain: 0.16 });
      const map = { fire: [220, 110], water: [520, 300], grass: [660, 420], electric: [1200, 500], ice: [880, 640], fighting: [110, 55], psychic: [700, 1100], dark: [200, 90], dragon: [400, 180], poison: [330, 220], normal: [300, 160] };
      const [f, t] = map[element] || map.normal;
      tone({ freq: f, to: t, dur: 0.2, type: "sawtooth", gain: 0.05, delay: 0.01 });
    },
    block: () => {
      tone({ freq: 980, to: 1320, dur: 0.12, type: "triangle", gain: 0.07 });
      noise({ dur: 0.08, gain: 0.05, freq: 5e3, type: "highpass" });
    },
    heal: () => {
      [523, 659, 784, 1046].forEach((f, i) => tone({ freq: f, dur: 0.16, type: "sine", gain: 0.06, delay: i * 0.06 }));
    },
    buff: () => {
      [392, 523, 659].forEach((f, i) => tone({ freq: f, dur: 0.18, type: "triangle", gain: 0.05, delay: i * 0.05 }));
    },
    debuff: () => {
      [440, 330, 240].forEach((f, i) => tone({ freq: f, dur: 0.16, type: "sawtooth", gain: 0.04, delay: i * 0.05 }));
    },
    hurt: () => {
      noise({ dur: 0.22, gain: 0.18, freq: 900, slideTo: 200 });
      tone({ freq: 120, to: 60, dur: 0.24, type: "square", gain: 0.09 });
    },
    death: () => {
      [330, 262, 196, 130].forEach((f, i) => tone({ freq: f, to: f * 0.7, dur: 0.3, type: "sine", gain: 0.08, delay: i * 0.1 }));
    },
    victory: () => {
      [523, 659, 784, 1046, 1318].forEach((f, i) => tone({ freq: f, dur: 0.28, type: "triangle", gain: 0.07, delay: i * 0.11 }));
    },
    error: () => tone({ freq: 180, to: 120, dur: 0.18, type: "square", gain: 0.05 })
  };
  function initFX() {
    if (canvas) return;
    canvas = document.createElement("canvas");
    canvas.id = "fx-canvas";
    canvas.setAttribute("aria-hidden", "true");
    Object.assign(canvas.style, {
      position: "fixed",
      inset: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: "60"
    });
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    resize();
    window.addEventListener("resize", resize);
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
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  function anchor(el) {
    if (!el) return { x: W / 2, y: H / 2, w: 120, h: 120 };
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height, top: r.top, bottom: r.bottom, left: r.left, right: r.right };
  }
  function getAnchors() {
    const playerEl = document.getElementById("player-art");
    const enemyEl = document.getElementById("enemy-art");
    const p = anchor(playerEl);
    const e = anchor(enemyEl);
    return { player: { ...p, y: p.y - p.h * 0.06 }, enemy: { ...e, y: e.y - e.h * 0.06 } };
  }
  function spawnParticle(p) {
    var _a, _b;
    if (particles.length >= MAX_PARTICLES) particles.shift();
    particles.push({ vx: 0, vy: 0, gravity: 0, drag: 0.98, size: 4, color: "#fff", shape: "circle", rot: 0, vr: 0, glow: 0, ...p, life: (_a = p.life) != null ? _a : 0.6, maxLife: (_b = p.life) != null ? _b : 0.6 });
  }
  function burst(style, x, y, opts = {}) {
    var _a;
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
        color: colors[Math.random() * colors.length | 0],
        shape: s.shape === "leaf" ? "leaf" : s.shape === "shard" ? "shard" : s.shape === "smoke" ? "smoke" : s.shape === "bubble" ? "bubble" : "spark",
        life: 0.45 + Math.random() * 0.55,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 10,
        glow: style === "electric" || style === "fire" ? 16 : 0
      });
    }
    rings.push({ x, y, r: 8, maxR: (opts.radius || 70) * power, life: 0.35, maxLife: 0.35, color: s.core, width: 3 });
    rings.push({ x, y, r: 4, maxR: (opts.radius || 95) * power, life: 0.5, maxLife: 0.5, color: s.main, width: 2 });
    flashes.push({ color: s.main, alpha: (_a = opts.flash) != null ? _a : 0.16, life: 0.22, maxLife: 0.22 });
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
        y: from.y + (to.y - from.y) * t + (Math.random() - 0.5) * 18
      });
    }
    beams.push({ points: beats, life: 0.24, maxLife: 0.24, color: s.main, core: s.core, width: 9, style });
    projectiles.push({
      x1: from.x,
      y1: from.y,
      x2: to.x,
      y2: to.y,
      t: 0,
      dur: 0.2,
      color: s.main,
      core: s.core,
      style,
      size: style === "fire" ? 16 : 12
    });
    for (let i = 1; i < steps; i++) {
      const p = beats[i];
      spawnParticle({ x: p.x, y: p.y, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2, size: 2 + Math.random() * 4, color: s.alt, shape: "circle", life: 0.35, glow: 10 });
    }
    for (let i = 0; i < 12; i++) {
      spawnParticle({
        x: from.x + (Math.random() - 0.5) * 24,
        y: from.y + (Math.random() - 0.5) * 24,
        vx: (to.x - from.x) * 4e-3 + (Math.random() - 0.5) * 2,
        vy: (to.y - from.y) * 4e-3 + (Math.random() - 0.5) * 2,
        size: 2 + Math.random() * 4,
        color: s.core,
        shape: "spark",
        life: 0.3,
        glow: 12
      });
    }
    setTimeout(() => {
      burst(style, to.x, to.y, { count: 24, power: 1.1, radius: 76, flash: 0.1 });
    }, 190);
  }
  function slash(x, y, opts = {}) {
    var _a;
    const count = opts.count || 2;
    for (let i = 0; i < count; i++) {
      slashes.push({
        x,
        y,
        angle: ((_a = opts.angle) != null ? _a : -0.6) + (Math.random() - 0.5) * 0.7 + i * 0.9,
        len: (opts.len || 130) + Math.random() * 40,
        life: 0.22,
        maxLife: 0.22,
        width: 3 + Math.random() * 3,
        color: opts.color || "#fff",
        offsetY: (i - (count - 1) / 2) * 16
      });
    }
  }
  function floater(x, y, text, opts = {}) {
    floaters.push({
      x,
      y,
      text,
      life: opts.life || 0.95,
      maxLife: opts.life || 0.95,
      color: opts.color || "#fff",
      size: opts.size || 34,
      vy: opts.vy || -1.5,
      vx: opts.vx || 0,
      weight: opts.weight || "800",
      delay: opts.delay || 0
    });
  }
  function loop(now) {
    rafId = requestAnimationFrame(loop);
    const dt = Math.min(0.05, (now - lastTime) / 1e3 || 0.016);
    lastTime = now;
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (let i = flashes.length - 1; i >= 0; i--) {
      const f = flashes[i];
      f.life -= dt;
      if (f.life <= 0) {
        flashes.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = f.life / f.maxLife * f.alpha;
      ctx.fillStyle = f.color;
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
    }
    for (let i = beams.length - 1; i >= 0; i--) {
      const b = beams[i];
      b.life -= dt;
      if (b.life <= 0) {
        beams.splice(i, 1);
        continue;
      }
      const a = b.life / b.maxLife;
      ctx.globalAlpha = a;
      ctx.lineCap = "round";
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
    for (let i = projectiles.length - 1; i >= 0; i--) {
      const p = projectiles[i];
      p.t += dt;
      if (p.t >= p.dur) {
        projectiles.splice(i, 1);
        continue;
      }
      const k = easeOut(p.t / p.dur);
      const x = p.x1 + (p.x2 - p.x1) * k;
      const y = p.y1 + (p.y2 - p.y1) * k + Math.sin(k * Math.PI) * -18;
      ctx.globalAlpha = 0.85;
      const g = ctx.createRadialGradient(x, y, 0, x, y, p.size * 2.6);
      g.addColorStop(0, p.core);
      g.addColorStop(0.45, p.color);
      g.addColorStop(1, "rgba(0,0,0,0)");
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
          x,
          y,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4,
          size: 2 + Math.random() * 4,
          color: j ? p.color : p.core,
          shape: "spark",
          life: 0.3,
          glow: 12
        });
      }
      ctx.globalAlpha = 1;
    }
    for (let i = slashes.length - 1; i >= 0; i--) {
      const s = slashes[i];
      s.life -= dt;
      if (s.life <= 0) {
        slashes.splice(i, 1);
        continue;
      }
      const a = s.life / s.maxLife;
      ctx.globalAlpha = a;
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.width * a;
      ctx.lineCap = "round";
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
    for (let i = rings.length - 1; i >= 0; i--) {
      const r = rings[i];
      r.life -= dt;
      if (r.life <= 0) {
        rings.splice(i, 1);
        continue;
      }
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
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      p.x += p.vx * dt * 60;
      p.y += p.vy * dt * 60;
      p.vy += p.gravity * dt * 60;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.rot += p.vr * dt;
      const a = Math.min(1, p.life / p.maxLife * 1.6);
      ctx.globalAlpha = a;
      ctx.fillStyle = p.color;
      if (p.glow) {
        ctx.shadowBlur = p.glow;
        ctx.shadowColor = p.color;
      }
      drawParticle(p);
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }
    ctx.globalCompositeOperation = "source-over";
    for (let i = floaters.length - 1; i >= 0; i--) {
      const f = floaters[i];
      if (f.delay > 0) {
        f.delay -= dt;
        continue;
      }
      f.life -= dt;
      if (f.life <= 0) {
        floaters.splice(i, 1);
        continue;
      }
      f.y += f.vy * dt * 60;
      f.x += f.vx * dt * 60;
      f.vy *= 0.985;
      const t = 1 - f.life / f.maxLife;
      const scale = t < 0.18 ? 0.6 + t / 0.18 * 0.6 : 1.1 - (t - 0.18) * 0.16;
      ctx.globalAlpha = t > 0.72 ? (1 - t) / 0.28 : 1;
      ctx.font = `900 ${Math.round(f.size * scale)}px "Segoe UI", "Microsoft YaHei", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineWidth = 6;
      ctx.strokeStyle = "rgba(8,4,16,0.9)";
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
      case "leaf":
        ctx.beginPath();
        ctx.ellipse(0, 0, s * 1.5, s * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        break;
      case "shard":
        ctx.beginPath();
        ctx.moveTo(0, -s * 1.8);
        ctx.lineTo(s * 0.8, 0);
        ctx.lineTo(0, s * 1.5);
        ctx.lineTo(-s * 0.8, 0);
        ctx.closePath();
        ctx.fill();
        break;
      case "smoke":
        ctx.globalAlpha *= 0.4;
        ctx.beginPath();
        ctx.arc(0, 0, s * 1.7, 0, Math.PI * 2);
        ctx.fill();
        break;
      case "bubble":
        ctx.beginPath();
        ctx.arc(0, 0, s * 1.2, 0, Math.PI * 2);
        ctx.globalAlpha *= 0.6;
        ctx.fill();
        ctx.globalAlpha = Math.min(1, ctx.globalAlpha * 2.4);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1;
        ctx.stroke();
        break;
      case "spark":
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
  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  function shakeEl(el, cls = "hit-shake") {
    if (!el) return;
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
    setTimeout(() => el.classList.remove(cls), 480);
  }
  function playFxList(entries) {
    if (!entries || !entries.length) return;
    const { player, enemy } = getAnchors();
    let delay = 0;
    for (const ev of entries) {
      schedule(() => handleFx(ev, player, enemy), delay);
      if (ev.kind === "card") delay += 70;
      else if (ev.kind === "enemyHit" && ev.hit > 1) delay += 90;
      else if (ev.kind === "turnStart" || ev.kind === "enemyTurn") delay += 0;
      else delay += 60;
    }
  }
  function schedule(fn, delay) {
    if (delay <= 0) {
      fn();
      return;
    }
    setTimeout(fn, delay);
  }
  function handleFx(ev, player, enemy) {
    switch (ev.kind) {
      case "card": {
        playCardVisual(ev, player, enemy);
        break;
      }
      case "enemyHit": {
        const s = ELEMENT_STYLE[ev.element] || ELEMENT_STYLE.normal;
        const x = enemy.x, y = enemy.y;
        if (ev.dot) {
          burst(ev.element, x, y, { count: 12, power: 0.7, radius: 46, flash: 0.05 });
          floater(x + (Math.random() - 0.5) * 60, y - 30, `-${ev.damage}`, { color: s.main, size: 26 });
        } else {
          slash(x, y, { color: s.core, count: ev.hits > 1 ? 1 : 2, angle: -0.7 });
          burst(ev.element, x, y, { count: 30, power: ev.damage > 18 ? 1.35 : 1, radius: 80 });
          floater(x + (Math.random() - 0.5) * 56, y - 24, `-${ev.damage}`, {
            color: ev.strong ? "#ffe082" : "#fff",
            size: ev.damage >= 20 ? 46 : 36,
            delay: 0.02
          });
          if (ev.strong) floater(x, y + 40, "效果拔群!", { color: "#ffca28", size: 20, vy: -1.1, life: 0.8, delay: 0.12 });
          if (ev.weak) floater(x, y + 40, "效果不好…", { color: "#90a4ae", size: 18, vy: -1, life: 0.8, delay: 0.12 });
          shakeEl(document.getElementById("enemy-art"), "hit-shake");
          SFX.hit(ev.element);
        }
        break;
      }
      case "enemyBlocked": {
        burst("ice", enemy.x, enemy.y, { count: 10, power: 0.5, radius: 40, flash: 0.03 });
        floater(enemy.x + 40, enemy.y - 60, `格挡 ${ev.amount}`, { color: "#7fd6ff", size: 20 });
        break;
      }
      case "enemyBlock": {
        rings.push({ x: enemy.x, y: enemy.y, r: 20, maxR: 90, life: 0.4, maxLife: 0.4, color: "#7fd6ff", width: 4 });
        burst("ice", enemy.x, enemy.y, { count: 14, power: 0.6, radius: 55, flash: 0.04 });
        floater(enemy.x, enemy.y - 80, `护甲 +${ev.amount}`, { color: "#7fd6ff", size: 22 });
        SFX.block();
        break;
      }
      case "enemyHeal": {
        burst("grass", enemy.x, enemy.y, { count: 16, power: 0.6, radius: 50, flash: 0.03 });
        floater(enemy.x, enemy.y - 70, `+${ev.amount}`, { color: "#7dff9b", size: 24 });
        SFX.heal();
        break;
      }
      case "enemyBuff": {
        rings.push({ x: enemy.x, y: enemy.y + 20, r: 10, maxR: 100, life: 0.45, maxLife: 0.45, color: "#ffca28", width: 3 });
        floater(enemy.x, enemy.y - 80, `💪 ${ev.text}`, { color: "#ffca28", size: 20 });
        SFX.buff();
        break;
      }
      case "playerHit": {
        const color = ev.self ? "#ffab91" : ev.poisonTick ? "#c58cff" : ev.burnTick ? "#ff8a50" : "#ff5252";
        floater(player.x + (Math.random() - 0.5) * 40, player.y - 40, `-${ev.damage}`, { color, size: ev.damage >= 15 ? 40 : 32 });
        burst(ev.poisonTick ? "poison" : ev.burnTick ? "fire" : "fighting", player.x, player.y, { count: 18, power: 0.8, radius: 60, flash: 0.06 });
        shakeEl(document.getElementById("player-art"), "hit-shake");
        if (ev.hits > 1) {
        }
        SFX.hurt();
        break;
      }
      case "playerDebuff": {
        floater(player.x, player.y - 80, `⬇️ ${ev.text}`, { color: "#c58cff", size: 20 });
        burst("dark", player.x, player.y, { count: 14, power: 0.6, radius: 45 });
        SFX.debuff();
        break;
      }
      case "block": {
        rings.push({ x: player.x, y: player.y - 10, r: 14, maxR: 105, life: 0.45, maxLife: 0.45, color: "#7fd6ff", width: 4 });
        rings.push({ x: player.x, y: player.y - 10, r: 40, maxR: 78, life: 0.55, maxLife: 0.55, color: "#e3f7ff", width: 2 });
        burst("water", player.x, player.y, { count: 18, power: 0.7, radius: 60, flash: 0.04 });
        floater(player.x, player.y - 90, `🛡️ +${ev.amount}`, { color: "#8fe3ff", size: 24 });
        SFX.block();
        break;
      }
      case "heal": {
        burst("grass", player.x, player.y, { count: 22, power: 0.8, radius: 70, flash: 0.03 });
        floater(player.x, player.y - 60, `+${ev.amount}`, { color: "#7dff9b", size: 30 });
        SFX.heal();
        break;
      }
      case "buff": {
        rings.push({ x: player.x, y: player.y + 10, r: 12, maxR: 110, life: 0.5, maxLife: 0.5, color: "#ffca28", width: 3 });
        burst("electric", player.x, player.y, { count: 16, power: 0.7, radius: 55, flash: 0.05 });
        floater(player.x, player.y - 95, `✦ ${ev.text}`, { color: "#ffd54f", size: 20 });
        SFX.buff();
        break;
      }
      case "debuff": {
        burst("poison", enemy.x, enemy.y, { count: 18, power: 0.7, radius: 55 });
        floater(enemy.x, enemy.y, `☠ ${ev.text}`, { color: "#d8a5ff", size: 20, delay: 0.05 });
        SFX.debuff();
        break;
      }
      case "draw": {
        floater(player.x + 90, player.y + 20, `抽 ${ev.amount} 张`, { color: "#8fe3ff", size: 18, vy: -1 });
        break;
      }
      case "energy": {
        floater(player.x - 80, player.y, `+${ev.amount} 能量`, { color: "#ffd54f", size: 20 });
        break;
      }
      case "enemyDeath": {
        burst("dark", enemy.x, enemy.y, { count: 46, power: 1.5, radius: 130, flash: 0.1 });
        rings.push({ x: enemy.x, y: enemy.y, r: 20, maxR: 220, life: 0.9, maxLife: 0.9, color: "#fff", width: 5 });
        floater(enemy.x, enemy.y, "击破！", { color: "#ffe082", size: 40, life: 1.2 });
        const el = document.getElementById("enemy-art");
        if (el) el.classList.add("death-fade");
        SFX.death();
        break;
      }
      case "playerDeath": {
        const el = document.getElementById("player-art");
        if (el) el.classList.add("death-fade");
        SFX.death();
        break;
      }
      case "thorns": {
        burst("grass", enemy.x, enemy.y, { count: 12, power: 0.6, radius: 40 });
        floater(enemy.x, enemy.y - 30, `荆棘 -${ev.amount}`, { color: "#a5e86b", size: 18 });
        break;
      }
      case "battleStart": {
        if (ev.boss) {
          const banner = document.createElement("div");
          banner.className = "boss-intro-banner";
          banner.textContent = ev.text || "";
          document.body.appendChild(banner);
          setTimeout(() => banner.remove(), 2400);
        }
        break;
      }
      case "bossIntro": {
        break;
      }
      case "turnStart": {
        showTurnBanner(`第 ${ev.turn} 回合 · 你的回合`, "player");
        break;
      }
      case "enemyTurn": {
        showTurnBanner("敌方回合", "enemy");
        break;
      }
      case "enemyIntent":
        break;
      case "turnEnd":
        break;
    }
  }
  function playCardVisual(ev, player, enemy) {
    const s = ELEMENT_STYLE[ev.element] || ELEMENT_STYLE.normal;
    SFX.card();
    const rect = ev.rect;
    if (rect) {
      const cardEl = document.createElement("div");
      cardEl.className = "fx-flying-card";
      cardEl.style.left = rect.left + "px";
      cardEl.style.top = rect.top + "px";
      cardEl.style.width = rect.width + "px";
      cardEl.style.height = rect.height + "px";
      cardEl.style.setProperty("--fly-x", enemy.x - rect.left - rect.width / 2 + "px");
      cardEl.style.setProperty("--fly-y", enemy.y - rect.top - rect.height / 2 + "px");
      cardEl.style.borderColor = s.main;
      cardEl.style.color = s.core;
      cardEl.style.boxShadow = `0 0 28px ${s.main}`;
      cardEl.textContent = ev.card && ev.card.emoji ? ev.card.emoji : "";
      document.body.appendChild(cardEl);
      setTimeout(() => cardEl.remove(), 520);
    }
    burst(ev.element, player.x + 20, player.y - 10, { count: 12, power: 0.8, radius: 50, flash: 0.03 });
    if (ev.type === "attack" || ev.type === "skill") {
      castBeam(ev.element, { x: player.x + 30, y: player.y - 30 }, { x: enemy.x, y: enemy.y - 20 });
    } else {
      rings.push({ x: player.x, y: player.y, r: 20, maxR: 150, life: 0.7, maxLife: 0.7, color: s.main, width: 4 });
    }
  }
  function showTurnBanner(text, side = "player") {
    let banner = document.getElementById("turn-banner");
    if (!banner) {
      banner = document.createElement("div");
      banner.id = "turn-banner";
      document.body.appendChild(banner);
    }
    banner.className = "turn-banner " + side;
    banner.textContent = text;
    banner.classList.remove("show");
    void banner.offsetWidth;
    banner.classList.add("show");
    clearTimeout(banner._timer);
    banner._timer = setTimeout(() => banner.classList.remove("show"), 1100);
  }

  // js/ui.js
  var $ = (id) => document.getElementById(id);
  function showScreen(name) {
    hideTip();
    document.querySelectorAll(".screen").forEach((el) => el.classList.remove("active"));
    const screen = $(name + "-screen");
    if (screen) {
      screen.classList.add("active", "fade-in");
      setTimeout(() => screen.classList.remove("fade-in"), 320);
    }
    document.body.dataset.screen = name;
  }
  var tipEl = null;
  function hideTip() {
    if (tipEl) tipEl.classList.remove("show");
  }
  function ensureTip() {
    if (!tipEl) {
      tipEl = document.createElement("div");
      tipEl.className = "tooltip";
      document.body.appendChild(tipEl);
    }
    return tipEl;
  }
  function initUI() {
    ensureTip();
    document.addEventListener("mouseover", (e) => {
      const t = e.target.closest("[data-tip]");
      if (!t) return;
      const tip = ensureTip();
      tip.innerHTML = t.dataset.tip;
      tip.classList.add("show");
      positionTip(t, tip);
    });
    document.addEventListener("mousemove", (e) => {
      if (!tipEl || !tipEl.classList.contains("show")) return;
      const t = e.target.closest("[data-tip]");
      if (t) positionTip(t, tipEl);
    });
    document.addEventListener("mouseout", (e) => {
      const t = e.target.closest("[data-tip]");
      if (!t) return;
      const to = e.relatedTarget;
      if (to && to.closest && to.closest("[data-tip]") === t) return;
      ensureTip().classList.remove("show");
    });
    document.addEventListener("click", (e) => {
      if (e.target.closest("button, .card, .map-node, .starter-card, .reward-card, .event-choice, .rest-choice")) {
        SFX.click();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const overlay = document.querySelector(".overlay:not(.hidden)");
        if (overlay) overlay.dispatchEvent(new CustomEvent("overlay-close"));
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
    tip.style.left = x + "px";
    tip.style.top = y + "px";
  }
  var esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  function fmtDesc(text) {
    const kwMap = {
      "消耗": KEYWORDS.exhaust.desc,
      "保留": KEYWORDS.retain.desc,
      "虚无": KEYWORDS.ethereal.desc,
      "固有": KEYWORDS.innate.desc,
      "易伤": "受到的攻击伤害提高 50%，回合结束时减 1 层。",
      "虚弱": "造成的攻击伤害降低 25%，回合结束时减 1 层。",
      "中毒": "回合开始受到等同层数的伤害（无视护甲），然后减 1 层。",
      "灼伤": "回合开始受到等同层数的伤害（无视护甲），然后减 1 层。",
      "力量": "每层使攻击伤害 +2。",
      "敏捷": "每层使获得的护甲 +1。",
      "荆棘": "受到攻击时对攻击者造成等同层数的伤害。",
      "金属化": "每回合开始时获得等同层数的护甲。",
      "护甲": "抵挡伤害，回合开始时清空。"
    };
    let html = esc(text);
    html = html.replace(
      /(消耗|保留|虚无|固有|易伤|虚弱|中毒|灼伤|力量|敏捷|荆棘|金属化|护甲)/g,
      (m) => `<span class="kw" data-tip="${esc(kwMap[m] || "")}">${m}</span>`
    );
    html = html.replace(/(\d+)/g, "<b>$1</b>");
    return html;
  }
  function renderCardHTML(card, opts = {}) {
    var _a, _b;
    if (!card) return "";
    const isX = card.keywords && card.keywords.includes("xcost");
    const cost = opts.hand ? getCardCost(card) : card.cost;
    const costLabel = isX ? "X" : cost;
    const dmgPreview = opts.hand ? getCardDamagePreview(card) : 0;
    const typeInfo = CARD_TYPE_INFO[card.type] || CARD_TYPE_INFO.skill;
    const rarity = RARITY_INFO[card.rarity] || RARITY_INFO.common;
    const el = TYPE_INFO[card.element] || TYPE_INFO.normal;
    const cantPlay = opts.hand && !opts.playable ? " cant-play" : "";
    const upgraded = card.upgraded ? " upgraded" : "";
    const damaged = opts.hand && dmgPreview > 0 && card.effects.damage ? " has-damage" : "";
    const kwNames = (card.keywords || []).map((k) => (KEYWORDS[k] || {}).name).filter(Boolean);
    const kwTips = (card.keywords || []).map((k) => (KEYWORDS[k] || {}).desc).filter(Boolean).join("<br>");
    const typeLabel = typeInfo.name + (kwNames.length ? " · " + kwNames.join(" / ") : "");
    return `
  <div class="card rarity-${card.rarity} type-${card.type} element-${card.element}${upgraded}${cantPlay}${damaged}"
       data-index="${(_a = opts.index) != null ? _a : ""}" data-uid="${(_b = card.uid) != null ? _b : ""}"
       data-tip="${esc(`<b style="color:${rarity.color}">${esc(card.name)}</b> · ${typeInfo.name}<br>${esc(card.description)}${kwTips ? "<br><span style='color:#ffd54f'>" + kwTips + "</span>" : ""}${card.upgraded ? "<br><span style='color:#7dd87d'>已升级</span>" : ""}`)}">
    <div class="card-glow" style="--el:${el.color}"></div>
    <div class="card-cost" data-tip="费用：打出此牌需要消耗的能量">${costLabel}</div>
    <div class="card-head">
      <span class="card-name">${esc(card.name)}</span>
      <span class="card-element" title="${el.name}">${el.icon}</span>
    </div>
    <div class="card-art" style="--el:${el.color}">
      <span class="card-art-emoji">${card.emoji || el.icon}</span>
      <span class="card-type-tag" ${kwTips ? `data-tip="${esc(kwTips)}"` : ""}>${typeLabel}</span>
      ${opts.hand && dmgPreview > 0 ? `<span class="card-dmg-preview">预计 ${dmgPreview}${card.effects.hits > 1 ? "×" + card.effects.hits : ""}</span>` : ""}
    </div>
    <div class="card-body">
      <div class="card-desc">${fmtDesc(card.description)}</div>
      <div class="card-watermark">${card.emoji || el.icon}</div>
      <div class="card-foot"><span>${rarity.name}</span><span>${card.upgraded ? "已升级" : typeInfo.name}</span></div>
    </div>
  </div>`;
  }
  function renderTitle(onStart) {
    const el = $("title-screen");
    const heroes = [
      { art: "charmander", element: "fire" },
      { art: "squirtle", element: "water" },
      { art: "bulbasaur", element: "grass" }
    ];
    el.innerHTML = `
    <div class="title-bg"><span></span><span></span><span></span></div>
    <div class="title-heroes">
      ${heroes.map((h, i) => `<div class="title-hero hero-${i}">${creatureArt(h, { size: "md", className: "title-portrait" })}</div>`).join("")}
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
    $("btn-start").onclick = onStart;
    $("btn-howto").onclick = () => showHowTo();
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
    showOverlay(body, "玩法说明");
  }
  function renderSelect(starters, onSelect) {
    hideTip();
    const el = $("select-screen");
    el.innerHTML = `
    <div class="select-head">
      <h2>选择你的旅伴</h2>
      <p>每只宝可梦拥有不同的初始牌组，决定了你的构筑方向。</p>
    </div>
    <div class="starter-container">
      ${starters.map((s) => {
      const el2 = TYPE_INFO[s.element] || TYPE_INFO.normal;
      return `
        <div class="starter-card element-${s.element}" data-id="${s.id}" style="--el:${el2.color}">
          <div class="starter-art">${creatureArt({ art: s.art, element: s.element, name: s.name }, { size: "lg" })}</div>
          <div class="starter-badge">${el2.icon} ${el2.name}</div>
          <div class="name">${s.name}</div>
          <div class="title">${s.title}</div>
          <div class="desc">${s.description}</div>
          <div class="starter-meta">
            <span>❤️ ${s.hp} HP</span>
            <span>🎴 ${s.starterCards.length} 张初始牌</span>
          </div>
          <div class="starter-passives">${s.passives.map((p) => `<span>${p}</span>`).join("")}</div>
          <div class="starter-pick">选择 →</div>
        </div>`;
    }).join("")}
    </div>
  `;
    el.querySelectorAll(".starter-card").forEach((card) => {
      card.onclick = () => onSelect(card.dataset.id);
    });
  }
  function renderMap(handlers) {
    hideTip();
    const el = $("map-screen");
    const m = state.map;
    const p = state.player;
    if (!m || !p) return;
    const { width, height, pos } = computeGeometry(m);
    const traversed = new Set(getTraversedEdges().map(([a, b]) => a + ">" + b));
    const current = getNodeById(m.currentNodeId);
    const nextIds = new Set(m.rows.flat().filter((n) => n.available).map((n) => n.id));
    let edgesSvg = "";
    for (const row of m.rows) {
      for (const node of row) {
        const a = pos.get(node.id);
        for (const cid of node.connections) {
          const b = pos.get(cid);
          if (!a || !b) continue;
          const done = traversed.has(node.id + ">" + cid);
          const open = current && current.id === node.id;
          const isNext = m.currentNodeId === null && node.row === 0 && nextIds.has(node.id) || m.currentNodeId !== null && node.id === m.currentNodeId && nextIds.has(cid);
          const cls = done ? "edge done" : isNext || open ? "edge open" : "edge";
          const midY = (a.y + b.y) / 2;
          edgesSvg += `<path class="${cls}" d="M ${a.x} ${a.y - 26} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y + 26}" />`;
        }
      }
    }
    const nodesHtml = m.rows.map((row, r) => row.map((node) => {
      const pt = pos.get(node.id);
      const meta = NODE_META[node.type] || {};
      const cls = ["map-node", `type-${node.type}`];
      if (node.visited) cls.push("visited");
      if (node.available) cls.push("available");
      if (node.id === m.currentNodeId) cls.push("current");
      if (node.type === "boss") cls.push("boss");
      const enemyTpl = node.enemyId ? state.battle ? null : null : null;
      const tipText = `<b>${meta.label}</b><br>${meta.desc}${node.type === "battle" || node.type === "elite" || node.type === "boss" ? `<br><span style="color:${meta.color}">${esc(getEnemyName(node))}</span>` : ""}`;
      return `
      <div class="${cls.join(" ")}" data-id="${node.id}" style="left:${pt.x}px;top:${pt.y}px;--node-color:${meta.color}"
           ${node.available ? `data-tip="${esc(tipText)}"` : `data-tip="${esc(tipText + (node.visited ? '<br><i style="color:#888">已通过</i>' : ""))}"`}>
        <div class="node-ring"></div>
        ${node.available ? '<span class="node-avail">可前往</span>' : ""}
        <div class="node-core"><span class="node-icon">${meta.icon}</span></div>
        <div class="node-label">${meta.label}</div>
        ${node.id === m.currentNodeId ? `<div class="node-token">${artSVG(p.pokemon.art, {})}</div>` : ""}
        ${node.visited && node.id !== m.currentNodeId ? '<div class="node-check">✓</div>' : ""}
      </div>`;
    }).join("")).join("");
    const relicsHtml = p.relics.map((r) => `<span class="relic-item" data-tip="${esc(`<b>${r.name}</b><br>${r.description}`)}">${r.emoji}</span>`).join("");
    const floorPips = [0, 1, 2].map((i) => {
      const cfgName = ["常磐森林", "月见山", "冠军之路"][i];
      const active = i === state.currentFloor;
      const done = i < state.currentFloor;
      return `<span class="floor-pip${active ? " active" : ""}${done ? " done" : ""}"><i>${done ? "✓" : i + 1}</i>${cfgName}</span>`;
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
        <button class="icon-btn" id="btn-sound-map" data-tip="音效开关">${isMuted() ? "🔇" : "🔊"}</button>
      </div>
    </div>
    <div class="map-legend">
      ${Object.entries(NODE_META).map(([k, v]) => `<span class="legend-item"><i style="background:${v.color}">${v.icon}</i>${v.label}</span>`).join("")}
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
      <span>📍 当前位置：${current ? (NODE_META[current.type] || {}).label + " 节点" : "起点"}</span>
      <span>🎯 目标：击败 ${m.floorName} 的 ${esc(getBossName(m))}</span>
      <span>剩余可前往：${nextIds.size} 条路线</span>
    </div>
  `;
    el.querySelectorAll(".map-node.available").forEach((nodeEl) => {
      nodeEl.onclick = () => handlers.onNodeClick(parseInt(nodeEl.dataset.id));
    });
    $("btn-deck-map").onclick = () => handlers.onDeck();
    $("btn-sound-map").onclick = (e) => {
      setMuted(!isMuted());
      e.currentTarget.textContent = isMuted() ? "🔇" : "🔊";
    };
    requestAnimationFrame(() => {
      const scroll = $("map-scroll");
      if (!scroll) return;
      const targetNode = current ? getNodeById(current.id) : m.rows[0][0];
      const pt = pos.get(targetNode.id);
      if (pt) scroll.scrollTop = Math.max(0, pt.y - scroll.clientHeight + 140);
    });
  }
  function getEnemyName(node) {
    const tpl = ENEMIES[node.enemyId] || BOSSES[node.enemyId];
    return tpl ? tpl.name : "";
  }
  function getBossName(m) {
    const b = BOSSES[m.bossId];
    return b ? b.name : "楼层首领";
  }
  var STATUS_META = {
    strength: { icon: "💪", name: "力量" },
    dexterity: { icon: "🎯", name: "敏捷" },
    thorns: { icon: "🌵", name: "荆棘" },
    plated: { icon: "🔩", name: "金属化" },
    vulnerable: { icon: "💔", name: "易伤", bad: true },
    weak: { icon: "⬇️", name: "虚弱", bad: true },
    poison: { icon: "☠️", name: "中毒", bad: true },
    burn: { icon: "🔥", name: "灼伤", bad: true }
  };
  function statusChips(obj, opts = {}) {
    const chips = [];
    for (const [k, meta] of Object.entries(STATUS_META)) {
      const v = obj[k];
      if (v > 0) chips.push(`<span class="status-chip ${meta.bad ? "bad" : "good"}" data-tip="${esc(`<b>${meta.name} ${v}</b><br>${statusDesc(k)}`)}">${meta.icon}<b>${v}</b></span>`);
    }
    if (obj.block > 0) chips.push(`<span class="status-chip block" data-tip="护甲：抵挡伤害，回合开始时清空">🛡️<b>${obj.block}</b></span>`);
    return chips.join("");
  }
  function statusDesc(k) {
    return {
      strength: "每层使攻击伤害 +2。",
      dexterity: "每层使获得的护甲 +1。",
      thorns: "受到攻击时，对攻击者造成等同层数的伤害。",
      plated: "每回合开始时获得等同层数的护甲。",
      vulnerable: "受到的攻击伤害提高 50%，回合结束时减 1 层。",
      weak: "造成的攻击伤害降低 25%，回合结束时减 1 层。",
      poison: "回合开始受到等同层数的伤害（无视护甲），然后减 1 层。",
      burn: "回合开始受到等同层数的伤害（无视护甲），然后减 1 层。"
    }[k] || "";
  }
  function intentHTML(intent) {
    if (!intent) return "";
    return `
    <div class="intent-bubble type-${intent.type}" data-tip="敌人下回合的行动：${esc(intent.lines.map((l) => l.text).join(" / "))}">
      <div class="intent-name">${esc(intent.name)}</div>
      <div class="intent-lines">
        ${intent.lines.map((l) => `<span class="intent-line ${l.cls}">${l.icon} ${l.text}</span>`).join("")}
      </div>
    </div>`;
  }
  function stageScenery(theme) {
    if (theme === "mountain") {
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
    if (theme === "champion") {
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
  function renderBattle(handlers) {
    hideTip();
    const el = $("battle-screen");
    const b = state.battle;
    const p = state.player;
    if (!b) return;
    const enemy = b.enemy;
    const intent = getEnemyIntent();
    const hpPct = Math.max(0, enemy.currentHp / enemy.maxHp * 100);
    const pHpPct = Math.max(0, p.hp / p.maxHp * 100);
    const floor = state.map ? `${state.map.floorEmoji} ${state.map.floorName}` : "";
    const handHtml = b.hand.map((card, i) => {
      const playable = b.isPlayerTurn && !b.battleOver && (getCardCost(card) === "X" || b.energy >= getCardCost(card));
      return renderCardHTML(card, { hand: true, index: i, playable });
    }).join("");
    const logHtml = b.log.slice(-40).map((l) => {
      const cls = { damage: "log-damage", block: "log-block", heal: "log-heal", buff: "log-buff", debuff: "log-debuff", turn: "log-turn", victory: "log-victory", start: "log-start" }[l.type] || "";
      return `<div class="log-entry ${cls}">${esc(l.text)}</div>`;
    }).join("");
    const powers = b.powers.map((c) => `<span class="power-chip" data-tip="${esc(`<b>${c.name}</b><br>${c.description}`)}">${c.emoji}</span>`).join("");
    const enemyBlock = enemy.block > 0 ? `<div class="block-badge enemy">🛡️ ${enemy.block}</div>` : "";
    const playerBlock = b.block > 0 ? `<div class="block-badge" data-tip="护甲会优先抵挡伤害">🛡️ ${b.block}</div>` : "";
    const turnChip = `<div class="turn-chip ${b.isPlayerTurn ? "mine" : "theirs"}">${b.battleOver ? b.won ? "战斗胜利" : "战斗失败" : b.isPlayerTurn ? "你的回合" : "敌方回合"}</div>`;
    el.innerHTML = `
    <div class="battle-topbar">
      <div class="battle-loc">${floor}${b.isElite ? ' · <span class="elite-tag">精英</span>' : ""}${enemy.isBoss ? ' · <span class="boss-tag">BOSS</span>' : ""}</div>
      <div class="battle-tools">
        ${turnChip}
        <button class="icon-btn" id="btn-deck-battle" data-tip="查看牌组">📖</button>
        <button class="icon-btn" id="btn-log-toggle" data-tip="战斗日志">📜</button>
        <button class="icon-btn" id="btn-sound-battle" data-tip="音效开关">${isMuted() ? "🔇" : "🔊"}</button>
      </div>
    </div>

    <div class="battle-stage theme-${state.map ? state.map.theme : "forest"}" id="battle-stage">
      <div class="stage-bg">${stageScenery(state.map ? state.map.theme : "forest")}</div>
      <div class="combatant player-side">
        <div class="art-wrap" id="player-art">
          ${creatureArt({ art: p.pokemon.art, element: p.pokemon.element, name: p.pokemon.name }, { size: "player" })}
          ${playerBlock}
          <div class="art-nameplate">${p.pokemon.name}</div>
        </div>
        <div class="status-row">${statusChips({ ...b, block: 0 })}</div>
        <div class="hp-block">
          <div class="hp-label"><span>❤️ ${p.hp} / ${p.maxHp}</span><span class="hp-sub">${p.pokemon.element ? TYPE_INFO[p.pokemon.element].name + "属性" : ""}</span></div>
          <div class="hp-bar-container"><div class="hp-bar${pHpPct < 30 ? " low" : ""}" style="width:${pHpPct}%"></div></div>
        </div>
      </div>

      <div class="stage-center">
        <div class="vs-mark">VS</div>
      </div>

      <div class="combatant enemy-side">
        ${intentHTML(intent)}
        <div class="art-wrap" id="enemy-art">
          ${creatureArt({ art: enemy.art, variant: enemy.variant, element: enemy.element, name: enemy.name, emoji: enemy.emoji }, { size: enemy.isBoss ? "boss" : "enemy" })}
          ${enemyBlock}
          ${enemy.isBoss ? `<div class="boss-crown">👑</div>` : ""}
        </div>
        <div class="enemy-title">
          <div class="enemy-name-row">
            <span class="enemy-name">${esc(enemy.name)}</span>
            <span class="enemy-level">${enemy.isBoss ? "BOSS" : "Lv." + (enemy.tier * 5 + 3)}</span>
          </div>
        </div>
        <div class="status-row">${statusChips(enemy)}</div>
        <div class="hp-block enemy">
          <div class="hp-label"><span>❤️ ${enemy.currentHp} / ${enemy.maxHp}</span><span class="hp-sub">${(TYPE_INFO[enemy.element] || {}).name || ""}属性</span></div>
          <div class="hp-bar-container"><div class="hp-bar enemy${hpPct < 30 ? " low" : ""}" style="width:${hpPct}%"></div></div>
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
        <button class="btn-end-turn${!b.isPlayerTurn || b.battleOver ? " disabled" : ""}" id="btn-end-turn" ${!b.isPlayerTurn || b.battleOver ? "disabled" : ""}>
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
    el.querySelectorAll(".card[data-index]").forEach((cardEl) => {
      cardEl.onclick = () => {
        const idx = parseInt(cardEl.dataset.index);
        handlers.onPlayCard(idx, cardEl);
      };
    });
    const endBtn = $("btn-end-turn");
    if (endBtn && !endBtn.disabled) endBtn.onclick = handlers.onEndTurn;
    $("btn-deck-battle").onclick = () => handlers.onDeck();
    $("btn-sound-battle").onclick = (e) => {
      setMuted(!isMuted());
      e.currentTarget.textContent = isMuted() ? "🔇" : "🔊";
    };
    $("btn-log-toggle").onclick = () => el.classList.toggle("log-open");
    $("btn-log-close").onclick = () => el.classList.remove("log-open");
    el.querySelectorAll(".pile-btn").forEach((btn) => {
      btn.onclick = () => handlers.onViewPile(btn.dataset.pile);
    });
    const logEl = $("battle-log-panel");
    if (logEl) logEl.scrollTop = logEl.scrollHeight;
  }
  function renderReward(gold, cards, handlers) {
    hideTip();
    const el = $("reward-screen");
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
      ${cards.map((card, i) => `<div class="reward-card-wrap" data-index="${i}">${renderCardHTML(card, {})}</div>`).join("")}
    </div>
    <div class="reward-actions">
      <button class="btn" id="btn-skip-reward">跳过</button>
      <button class="btn btn-ghost" id="btn-deck-reward">查看牌组</button>
    </div>
  `;
    el.querySelectorAll(".reward-card-wrap").forEach((rc) => {
      rc.onclick = () => handlers.onPick(parseInt(rc.dataset.index));
    });
    $("btn-skip-reward").onclick = handlers.onSkip;
    $("btn-deck-reward").onclick = handlers.onDeck;
  }
  function renderShop(cards, prices, removeCost, handlers) {
    hideTip();
    const el = $("shop-screen");
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
        <div class="shop-slot${card.sold ? " sold" : ""}${canAfford ? "" : " poor"}" data-index="${i}">
          ${renderCardHTML(card, {})}
          <div class="shop-price">${card.sold ? "已售出" : `🪙 ${price}`}</div>
        </div>`;
    }).join("")}
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
    el.querySelectorAll(".shop-slot[data-index]").forEach((item) => {
      item.onclick = () => handlers.onBuyCard(parseInt(item.dataset.index));
    });
    $("btn-remove-card").onclick = handlers.onRemoveCard;
    $("btn-deck-shop").onclick = handlers.onDeck;
    $("btn-leave-shop").onclick = handlers.onLeave;
  }
  function renderRest(handlers) {
    hideTip();
    const el = $("rest-screen");
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
    $("rest-heal").onclick = handlers.onHeal;
    $("rest-upgrade").onclick = handlers.onUpgrade;
    $("rest-deck").onclick = handlers.onDeck;
  }
  function renderEvent(event, onChoice) {
    const el = $("event-screen");
    el.innerHTML = `
    <div class="event-art">${event.emoji}</div>
    <h2>${event.title}</h2>
    <div class="event-desc">${event.description}</div>
    <div class="event-choices">
      ${event.choices.map((c, i) => `<div class="event-choice" data-index="${i}"><span class="event-choice-idx">${i + 1}</span>${c.text}</div>`).join("")}
    </div>
  `;
    el.querySelectorAll(".event-choice").forEach((ch) => {
      ch.onclick = () => onChoice(parseInt(ch.dataset.index));
    });
  }
  function renderRelicChoice(relics, onPick) {
    hideTip();
    const el = $("relic-screen");
    el.innerHTML = `
    <div class="relic-head"><div class="reward-kicker">TREASURE</div><h2>选择一件遗物</h2></div>
    <div class="relic-choices">
      ${relics.map((r, i) => `
        <div class="relic-choice" data-index="${i}">
          <div class="relic-emoji">${r.emoji}</div>
          <div class="relic-name">${r.name}</div>
          <div class="relic-rarity">${{ common: "普通", uncommon: "稀有", rare: "史诗" }[r.rarity] || ""}</div>
          <div class="relic-desc">${r.description}</div>
        </div>`).join("")}
    </div>
  `;
    el.querySelectorAll(".relic-choice").forEach((rc) => {
      rc.onclick = () => onPick(parseInt(rc.dataset.index));
    });
  }
  function renderGameOver(onRestart) {
    const el = $("gameover-screen");
    const p = state.player;
    el.innerHTML = `
    <div class="end-emoji">💀</div>
    <h1>远征失败</h1>
    <p class="end-sub">${p.pokemon.name} 倒在了 ${state.map ? state.map.floorName : "旅途中"}。</p>
    <div class="end-stats">
      <div><b>${state.stats ? state.stats.battlesWon : 0}</b><span>战斗胜利</span></div>
      <div><b>${p.deck.length}</b><span>牌组张数</span></div>
      <div><b>${p.relics.length}</b><span>遗物</span></div>
      <div><b>${p.gold}</b><span>金币</span></div>
    </div>
    <button class="btn btn-primary" id="btn-restart">再来一次</button>
  `;
    $("btn-restart").onclick = onRestart;
  }
  function renderVictory(onRestart) {
    const el = $("victory-screen");
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
    <div class="victory-relics">${p.relics.map((r) => `<span data-tip="${esc(`<b>${r.name}</b><br>${r.description}`)}">${r.emoji}</span>`).join("") || "无遗物"}</div>
    <button class="btn btn-primary" id="btn-restart-v">再来一局</button>
  `;
    $("btn-restart-v").onclick = onRestart;
  }
  function showOverlay(innerHTML, title, onClose) {
    hideTip();
    let overlay = document.getElementById("global-overlay");
    if (overlay) overlay.remove();
    overlay = document.createElement("div");
    overlay.id = "global-overlay";
    overlay.className = "overlay";
    overlay.innerHTML = `
    <div class="overlay-panel">
      <div class="overlay-head">
        <h2>${title}</h2>
        <button class="overlay-close" id="overlay-close">✕</button>
      </div>
      <div class="overlay-body">${innerHTML}</div>
    </div>`;
    document.body.appendChild(overlay);
    const close = () => {
      overlay.remove();
      if (onClose) onClose();
    };
    $("overlay-close").onclick = close;
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
    overlay.addEventListener("overlay-close", close);
    return close;
  }
  function renderDeckOverlay(deck) {
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
      ${deck.map((c) => renderCardHTML(c, {})).join("")}
    </div>`;
    showOverlay(body, "📖 当前牌组");
  }
  function renderPileOverlay(cards, title) {
    const body = cards.length ? `<div class="deck-grid">${cards.map((c) => renderCardHTML(c, {})).join("")}</div>` : `<p class="empty-note">这里空空如也。</p>`;
    showOverlay(body, `${title} · ${cards.length} 张`);
  }
  function renderCardPicker(cards, title, onPick, emptyText = "没有可选择的卡牌") {
    if (!cards.length) {
      showOverlay(`<p class="empty-note">${emptyText}</p>`, title);
      return;
    }
    const body = `<div class="deck-grid picker">${cards.map((c, i) => `<div class="pick-wrap" data-idx="${i}">${renderCardHTML(c, {})}</div>`).join("")}</div>`;
    const close = showOverlay(body, title);
    document.querySelectorAll("#global-overlay .pick-wrap").forEach((wrap) => {
      wrap.onclick = () => {
        onPick(cards[parseInt(wrap.dataset.idx)]);
        close();
      };
    });
  }
  function showToast(text, type = "") {
    let t = document.getElementById("toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      document.body.appendChild(t);
    }
    t.className = "toast " + type;
    t.textContent = text;
    t.classList.remove("show");
    void t.offsetWidth;
    t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove("show"), 1800);
  }

  // js/main.js
  var battleBusy = false;
  function boot() {
    initFX();
    initUI();
    gotoTitle();
  }
  function gotoTitle() {
    setScreen("title");
    renderTitle(() => {
      unlockAudio();
      SFX.click();
      gotoSelect();
    });
    showScreen("title");
  }
  function gotoSelect() {
    setScreen("select");
    renderSelect(STARTERS, (starterId) => {
      initPlayer(starterId);
      generateMap(0);
      gotoMap();
    });
    showScreen("select");
  }
  function gotoMap() {
    setScreen("map");
    renderMap({
      onNodeClick: handleNodeClick,
      onDeck: () => renderDeckOverlay(state.player.deck)
    });
    showScreen("map");
  }
  function handleNodeClick(nodeId) {
    const node = selectNode(nodeId);
    if (!node) return;
    SFX.click();
    switch (node.type) {
      case "battle":
      case "elite":
      case "boss":
        startBattle(node.enemyId, { elite: node.type === "elite", nodeType: node.type });
        gotoBattle();
        break;
      case "shop":
        gotoShop();
        break;
      case "rest":
        gotoRest();
        break;
      case "event":
        gotoEvent();
        break;
      default:
        gotoMap();
    }
  }
  function currentBattleNode() {
    return state.map ? getNodeById(state.map.currentNodeId) : null;
  }
  function gotoBattle() {
    setScreen("battle");
    renderBattle(battleHandlers);
    showScreen("battle");
    playFxList(takeFx());
    setTimeout(() => {
      battleBusy = false;
    }, 650);
    battleBusy = true;
  }
  var battleHandlers = {
    onPlayCard(handIndex, cardEl) {
      if (!state.battle || state.battle.battleOver || battleBusy) return;
      if (!state.battle.isPlayerTurn) {
        SFX.error();
        return;
      }
      if (!canPlayCard(handIndex)) {
        SFX.error();
        showToast("能量不足", "warn");
        if (cardEl) {
          cardEl.classList.remove("deny-shake");
          void cardEl.offsetWidth;
          cardEl.classList.add("deny-shake");
        }
        return;
      }
      const rect = cardEl ? cardEl.getBoundingClientRect() : null;
      const result = playCard(handIndex);
      if (!result) return;
      const fx = takeFx();
      if (rect) {
        const cardEv = fx.find((f) => f.kind === "card");
        if (cardEv) cardEv.rect = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
      }
      playFxList(fx);
      battleBusy = true;
      setTimeout(() => {
        if (!state.battle) return;
        renderBattle(battleHandlers);
        battleBusy = false;
        if (state.battle.battleOver) finishBattle();
      }, 180);
    },
    onEndTurn() {
      if (!state.battle || state.battle.battleOver || !state.battle.isPlayerTurn || battleBusy) return;
      battleBusy = true;
      endPlayerTurn();
      playFxList(takeFx());
      setTimeout(() => {
        if (!state.battle) return;
        renderBattle(battleHandlers);
        battleBusy = false;
        if (state.battle.battleOver) finishBattle();
      }, 620);
    },
    onDeck: () => renderDeckOverlay(state.player.deck),
    onViewPile(kind) {
      const b = state.battle;
      if (!b) return;
      const map = {
        draw: [b.drawPile, "🂠 抽牌堆"],
        discard: [b.discardPile, "♻️ 弃牌堆"],
        exhaust: [b.exhaustPile, "🔥 消耗堆"]
      };
      const entry = map[kind];
      if (!entry) return;
      renderPileOverlay(entry[0], entry[1]);
    }
  };
  function finishBattle() {
    const b = state.battle;
    if (!b) return;
    if (b.won) {
      SFX.victory();
      setTimeout(() => gotoReward(), 1100);
    } else {
      setTimeout(() => gotoGameOver(), 1200);
    }
  }
  function gotoReward() {
    setScreen("reward");
    const gold = getBattleRewardGold();
    modifyGold(gold);
    const cards = getRewardCards();
    state.rewardCards = cards;
    renderReward(gold, cards, {
      onPick: (i) => {
        addCardToDeck(cards[i]);
        showToast(`「${cards[i].name}」加入了牌组`, "good");
        afterCardReward();
      },
      onSkip: () => afterCardReward(),
      onDeck: () => renderDeckOverlay(state.player.deck)
    });
    showScreen("reward");
  }
  function afterCardReward() {
    const node = currentBattleNode();
    if (node && (node.type === "elite" || node.type === "boss")) {
      gotoRelicReward();
    } else {
      afterReward();
    }
  }
  function gotoRelicReward() {
    const owned = new Set(state.player.relics.map((r) => r.id));
    const available = RELICS.filter((r) => !owned.has(r.id));
    if (available.length === 0) {
      afterReward();
      return;
    }
    const shuffled = available.sort(() => Math.random() - 0.5);
    const choices = shuffled.slice(0, Math.min(3, shuffled.length));
    setScreen("relic");
    renderRelicChoice(choices, (index) => {
      addRelic(choices[index]);
      showToast(`获得遗物：${choices[index].name}`, "good");
      afterReward();
    });
    showScreen("relic");
  }
  function afterReward() {
    if (isFloorComplete()) {
      if (hasMoreFloors()) {
        nextFloor();
        generateMap(state.currentFloor);
        showToast(`进入 ${state.map.floorName}`, "good");
        gotoMap();
      } else {
        gotoVictory();
      }
    } else {
      gotoMap();
    }
  }
  function gotoShop() {
    setScreen("shop");
    const cardIds = getShopCards(state.currentFloor);
    const shopCards = cardIds.map((id) => {
      const c = createCard(id);
      c.sold = false;
      return c;
    });
    const shopPrices = shopCards.map((c) => getCardPrice(c));
    function handleBuyCard(index) {
      const card = shopCards[index];
      const price = shopPrices[index];
      if (!card || card.sold) return;
      if (state.player.gold < price) {
        SFX.error();
        showToast("金币不足", "warn");
        return;
      }
      modifyGold(-price);
      const bought = createCard(card.id);
      addCardToDeck(bought);
      card.sold = true;
      showToast(`购买了「${bought.name}」`, "good");
      renderShopView();
    }
    function handleRemoveCard() {
      if (state.player.gold < REMOVE_CARD_COST) {
        SFX.error();
        showToast("金币不足", "warn");
        return;
      }
      if (state.player.deck.length <= 3) {
        showToast("牌组太少了，无法移除", "warn");
        return;
      }
      renderCardPicker(
        state.player.deck,
        `🗑️ 移除卡牌（🪙${REMOVE_CARD_COST}）`,
        (card) => {
          modifyGold(-REMOVE_CARD_COST);
          removeCardFromDeck(card.uid);
          showToast(`移除了「${card.name}」`, "good");
          renderShopView();
        },
        "牌组为空"
      );
    }
    function renderShopView() {
      renderShop(shopCards, shopPrices, REMOVE_CARD_COST, {
        onBuyCard: handleBuyCard,
        onRemoveCard: handleRemoveCard,
        onDeck: () => renderDeckOverlay(state.player.deck),
        onLeave: () => gotoMap()
      });
    }
    renderShopView();
    showScreen("shop");
  }
  function gotoRest() {
    setScreen("rest");
    renderRest({
      onHeal: () => {
        const healAmount = Math.floor(state.player.maxHp * 0.3);
        modifyHp(healAmount);
        showToast(`回复了 ${healAmount} 点 HP`, "good");
        gotoMap();
      },
      onUpgrade: () => {
        const upgradable = state.player.deck.filter((c) => !c.upgraded && CARDS_DB[c.id] && CARDS_DB[c.id].up);
        if (upgradable.length === 0) {
          showToast("没有可升级的卡牌", "warn");
          gotoMap();
          return;
        }
        renderCardPicker(upgradable, "⬆️ 选择要升级的卡牌", (card) => {
          upgradeCardSync(card.uid, CARDS_DB);
          showToast(`「${card.baseName || card.name}」升级了！`, "good");
          gotoMap();
        }, "没有可升级的卡牌");
      },
      onDeck: () => renderDeckOverlay(state.player.deck)
    });
    showScreen("rest");
  }
  function gotoEvent() {
    setScreen("event");
    const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
    state.currentEvent = event;
    renderEvent(event, (choiceIndex) => {
      const choice = event.choices[choiceIndex];
      resolveEventEffect(choice.effect);
      if (state.player.hp <= 0) {
        setTimeout(() => gotoGameOver(), 300);
      } else {
        gotoMap();
      }
    });
    showScreen("event");
  }
  function resolveEventEffect(effect) {
    switch (effect.type) {
      case "nothing":
        showToast("你什么也没做。");
        break;
      case "relic_risk": {
        const hpCost = Math.floor(state.player.maxHp * effect.hpCost);
        modifyHp(-hpCost);
        const owned = new Set(state.player.relics.map((r) => r.id));
        const avail = RELICS.filter((r) => !owned.has(r.id));
        if (avail.length > 0) {
          const relic = avail[Math.floor(Math.random() * avail.length)];
          addRelic(relic);
          showToast(`失去 ${hpCost} HP，获得遗物「${relic.name}」`, "good");
        } else {
          showToast(`失去 ${hpCost} HP，但什么也没找到…`, "warn");
        }
        break;
      }
      case "buy_heal": {
        if (state.player.gold >= effect.cost) {
          modifyGold(-effect.cost);
          const healed = modifyHp(Math.floor(state.player.maxHp * effect.healPercent));
          showToast(`回复了 ${healed} 点 HP`, "good");
        } else showToast("金币不足", "warn");
        break;
      }
      case "buy_card": {
        if (state.player.gold >= effect.cost) {
          modifyGold(-effect.cost);
          const ids = Object.keys(CARDS_DB).filter((id) => CARDS_DB[id].rarity === (effect.rarity || "rare"));
          if (ids.length) {
            const card = createCard(ids[Math.floor(Math.random() * ids.length)]);
            addCardToDeck(card);
            showToast(`获得卡牌「${card.name}」`, "good");
          }
        } else showToast("金币不足", "warn");
        break;
      }
      case "upgrade_random": {
        if (effect.hpCost) modifyHp(-effect.hpCost);
        const upgradable = state.player.deck.filter((c) => !c.upgraded && CARDS_DB[c.id] && CARDS_DB[c.id].up);
        if (upgradable.length > 0) {
          const card = upgradable[Math.floor(Math.random() * upgradable.length)];
          upgradeCardSync(card.uid, CARDS_DB);
          showToast(`「${card.baseName || card.name}」升级了！`, "good");
        } else showToast("没有可升级的卡牌", "warn");
        break;
      }
      case "random_gold": {
        const amount = effect.min + Math.floor(Math.random() * (effect.max - effect.min + 1));
        modifyGold(amount);
        showToast(`获得 ${amount} 金币`, "good");
        break;
      }
      case "heal_percent": {
        const healed = modifyHp(Math.floor(state.player.maxHp * effect.value));
        showToast(`回复了 ${healed} 点 HP`, "good");
        break;
      }
      case "full_heal_remove_card": {
        const healed = modifyHp(state.player.maxHp);
        const removable = state.player.deck.filter((c) => c.rarity !== "basic");
        if (removable.length > 0) {
          const toRemove = removable[Math.floor(Math.random() * removable.length)];
          removeCardFromDeck(toRemove.uid);
          showToast(`回复 ${healed} HP，移除了「${toRemove.name}」`, "good");
        } else {
          showToast(`回复 ${healed} HP`, "good");
        }
        break;
      }
      case "free_card": {
        const ids = Object.keys(CARDS_DB).filter((id) => CARDS_DB[id].rarity === (effect.rarity || "uncommon"));
        if (ids.length) {
          const card = createCard(ids[Math.floor(Math.random() * ids.length)]);
          addCardToDeck(card);
          showToast(`获得卡牌「${card.name}」`, "good");
        }
        break;
      }
      case "max_hp_up": {
        if (effect.cost && state.player.gold < effect.cost) {
          showToast("金币不足", "warn");
          break;
        }
        if (effect.cost) modifyGold(-effect.cost);
        state.player.maxHp += effect.value;
        modifyHp(effect.value);
        showToast(`最大 HP +${effect.value}`, "good");
        break;
      }
    }
  }
  function gotoGameOver() {
    setScreen("gameover");
    renderGameOver(() => location.reload());
    showScreen("gameover");
  }
  function gotoVictory() {
    setScreen("victory");
    renderVictory(() => location.reload());
    showScreen("victory");
  }
  document.addEventListener("keydown", (e) => {
    if (state.screen !== "battle" || !state.battle) return;
    if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
    if (document.getElementById("global-overlay")) return;
    if (e.key === "e" || e.key === "E") {
      battleHandlers.onEndTurn();
    } else if (e.key === "d" || e.key === "D") {
      renderDeckOverlay(state.player.deck);
    } else if (/^[1-9]$/.test(e.key)) {
      const idx = parseInt(e.key) - 1;
      const cardEl = document.querySelector(`.hand-area .card[data-index="${idx}"]`);
      if (cardEl) battleHandlers.onPlayCard(idx, cardEl);
    }
  });
  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
