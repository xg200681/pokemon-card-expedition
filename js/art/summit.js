// 角色立绘：高层 & BOSS 组
export const ART_SUMMIT = {
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
  `,
};