import type { Prop, Scene, Sky } from '../core/types'

const W = 400
const H = 300
const GROUND = 240

/** Top, middle, horizon colors. */
const SKIES: Record<Sky, [string, string, string]> = {
  day: ['#6cb8f0', '#a9dcff', '#fff1d0'],
  dusk: ['#2b1a4a', '#b8406a', '#ffb36b'],
  night: ['#05071a', '#141a45', '#3c2a6e'],
  dawn: ['#2a2f6b', '#e0889a', '#ffd59e'],
  rain: ['#1f2730', '#3b4652', '#5d6873'],
}
const GROUNDS: Record<Sky, string> = { day: '#5f8f4e', dusk: '#1d1230', night: '#0b0a1c', dawn: '#2c2440', rain: '#20262c' }

// Deterministic pseudo-random spread, so scenes look the same on every render.
const spread = (i: number, mod: number, salt = 0) => ((i * 7919 + salt * 104729) % mod + mod) % mod

const PROPS: Record<Prop, (id: string) => string> = {
  stars: () =>
    Array.from({ length: 45 }, (_, i) =>
      `<circle class="twinkle" style="animation-delay:${spread(i, 30) / 10}s" cx="${spread(i, W)}" cy="${spread(i, 170, 1)}" r="${0.6 + spread(i, 3, 2) * 0.5}" fill="#fff"/>`,
    ).join(''),
  moon: (id) => `<circle cx="320" cy="62" r="46" fill="url(#glow${id})"/><circle cx="320" cy="62" r="26" fill="#fff4cf"/><circle cx="311" cy="55" r="5" fill="#efe0b0"/><circle cx="328" cy="70" r="3.5" fill="#efe0b0"/>`,
  milkyway: (id) =>
    `<ellipse cx="200" cy="90" rx="260" ry="34" transform="rotate(-18 200 90)" fill="url(#milk${id})"/>` +
    Array.from({ length: 50 }, (_, i) => {
      const x = spread(i, W, 3)
      return `<circle class="twinkle" style="animation-delay:${spread(i, 20) / 10}s" cx="${x}" cy="${155 - x * 0.33 + spread(i, 30, 4) - 15}" r="0.9" fill="#e8e0ff"/>`
    }).join(''),
  mountains: () =>
    `<path d="M0 ${GROUND} L0 170 L70 120 L120 160 L190 95 L260 165 L320 125 L400 175 L400 ${GROUND}Z" fill="#000" opacity=".28"/>` +
    `<path d="M0 ${GROUND} L0 200 L90 160 L160 205 L240 150 L330 200 L400 180 L400 ${GROUND}Z" fill="#000" opacity=".35"/>`,
  city: () =>
    Array.from({ length: 12 }, (_, i) => {
      const x = i * 34 - 4
      const h = 40 + spread(i, 70, 5)
      const windows = Array.from({ length: 6 }, (_, j) =>
        spread(i + j, 3, 6) ? `<rect x="${x + 6 + (j % 2) * 12}" y="${GROUND - h + 8 + Math.floor(j / 2) * 14}" width="6" height="6" fill="#ffd27a" opacity=".85"/>` : '',
      ).join('')
      return `<rect x="${x}" y="${GROUND - h}" width="30" height="${h}" fill="#000" opacity=".45"/>${windows}`
    }).join(''),
  bamboo: () =>
    [12, 34, 58, 342, 366, 388].map((x) =>
      `<rect x="${x}" y="40" width="9" height="${GROUND - 40}" rx="3" fill="#2f6b3a"/>` +
      [80, 130, 180].map((y) => `<rect x="${x - 1}" y="${y}" width="11" height="3" fill="#24532c"/>`).join('') +
      `<path d="M${x + 9} 90 q18 -6 26 4 q-14 2 -26 -4z" fill="#3f8a4a"/>`,
    ).join(''),
  shrine: () =>
    `<g transform="translate(40 150)"><path d="M-10 30 L45 5 L100 30Z" fill="#3a1f1a"/><rect x="5" y="30" width="80" height="60" fill="#7a2c22"/><rect x="30" y="50" width="30" height="40" fill="#ffcf7a" opacity=".8"/><rect x="0" y="88" width="90" height="4" fill="#2a1612"/></g>`,
  torii: () =>
    `<g fill="#d8362b"><path d="M120 92 Q200 80 280 92 L284 104 Q200 93 116 104Z"/><rect x="132" y="112" width="136" height="9"/><rect x="146" y="100" width="12" height="${GROUND - 100}"/><rect x="242" y="100" width="12" height="${GROUND - 100}"/><rect x="194" y="104" width="12" height="10"/></g><rect x="114" y="88" width="172" height="5" fill="#1a1a1a" opacity=".6"/>`,
  sakura: () =>
    `<path d="M330 ${GROUND} Q326 190 340 150 M336 180 Q310 160 296 150" stroke="#3b2418" stroke-width="7" fill="none"/>` +
    [[340, 130, 38], [300, 145, 28], [370, 150, 30], [325, 105, 26]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#f7b6cf" opacity=".92"/>`).join('') +
    Array.from({ length: 14 }, (_, i) =>
      `<ellipse class="fall" style="animation-delay:${spread(i, 60) / 10}s;animation-duration:${6 + spread(i, 4, 1)}s" cx="${spread(i, W, 7)}" cy="-10" rx="3" ry="2" fill="#ffc7da"/>`,
    ).join(''),
  train: () =>
    `<g class="slide"><rect x="-20" y="188" width="260" height="44" rx="10" fill="#26315c"/><rect x="-20" y="222" width="260" height="6" fill="#ff8a5c"/>` +
    [0, 1, 2, 3, 4].map((i) => `<rect x="${i * 48}" y="196" width="34" height="18" rx="3" fill="#ffe3a0"/>`).join('') +
    `</g>`,
  ramen: () =>
    `<g transform="translate(110 130)"><rect x="0" y="0" width="180" height="16" fill="#5a2e1c"/>` +
    [0, 1, 2, 3, 4].map((i) => `<rect x="${6 + i * 34}" y="16" width="30" height="34" fill="${i % 2 ? '#e8e0cc' : '#b8322a'}"/>`).join('') +
    `<text x="20" y="42" font-size="20" fill="#fff">ら ー め ん</text><rect x="-6" y="80" width="192" height="30" fill="#6b3a22"/>` +
    `<path class="steam" d="M90 60 q-6 -10 0 -20 q6 -10 0 -20" stroke="#fff" stroke-width="3" fill="none" opacity=".6"/></g>`,
  lanterns: () =>
    `<path d="M0 30 Q200 70 400 30" stroke="#222" stroke-width="1.5" fill="none"/>` +
    [40, 110, 180, 250, 320, 380].map((x, i) => {
      const y = 30 + 40 * (1 - ((x - 200) / 200) ** 2) * 0.5 + 6
      return `<g class="float" style="animation-delay:${i * 0.4}s"><ellipse cx="${x}" cy="${y + 14}" rx="22" ry="22" fill="#ff7b3a" opacity=".25"/><ellipse cx="${x}" cy="${y + 14}" rx="11" ry="15" fill="#e8442f"/><rect x="${x - 6}" y="${y - 2}" width="12" height="3" fill="#222"/><rect x="${x - 6}" y="${y + 27}" width="12" height="3" fill="#222"/></g>`
    }).join(''),
}

// Painter's order: back to front.
const ORDER: Prop[] = ['stars', 'milkyway', 'moon', 'mountains', 'city', 'bamboo', 'shrine', 'torii', 'sakura', 'train', 'ramen']

let nextId = 0

export function scene(s: Scene): string {
  const id = String(nextId++)
  const [top, mid, low] = SKIES[s.sky]
  const back = ORDER.filter((p) => s.props.includes(p)).map((p) => PROPS[p](id)).join('')
  const rain = s.sky === 'rain'
    ? Array.from({ length: 40 }, (_, i) => `<line class="rain" style="animation-delay:${spread(i, 10) / 10}s" x1="${spread(i, W)}" y1="${spread(i, H, 2) - 300}" x2="${spread(i, W) - 6}" y2="${spread(i, H, 2) - 282}" stroke="#9fb4c8" stroke-width="1.2"/>`).join('')
    : ''
  const actors = s.actors.map((a, i) => {
    const x = (W / (s.actors.length + 1)) * (i + 1)
    return `<text class="bob" style="animation-delay:${i * 0.3}s" x="${x}" y="${GROUND + 16}" font-size="54" text-anchor="middle">${a}</text>`
  }).join('')
  return `<svg class="scene" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="sky${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset=".6" stop-color="${mid}"/><stop offset="1" stop-color="${low}"/></linearGradient>
<radialGradient id="glow${id}"><stop offset="0" stop-color="#fff4cf" stop-opacity=".6"/><stop offset="1" stop-color="#fff4cf" stop-opacity="0"/></radialGradient>
<linearGradient id="milk${id}"><stop offset="0" stop-color="#b9a4ff" stop-opacity="0"/><stop offset=".5" stop-color="#d6c8ff" stop-opacity=".35"/><stop offset="1" stop-color="#b9a4ff" stop-opacity="0"/></linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#sky${id})"/>${back}
<rect y="${GROUND}" width="${W}" height="${H - GROUND}" fill="${GROUNDS[s.sky]}"/>
${s.props.includes('lanterns') ? PROPS.lanterns(id) : ''}${rain}${actors}
</svg>`
}
