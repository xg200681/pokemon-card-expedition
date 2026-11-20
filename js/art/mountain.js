// 角色立绘：山地敌人组
export const ART_MOUNTAIN = {
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
    </g>`,
};