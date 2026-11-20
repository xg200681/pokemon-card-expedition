// 角色立绘：森林敌人组
export const ART_FOREST = {
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
    </g>`,
};