// 角色立绘：starter 组
export const ART_STARTERS = {
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
    </g>`,
};