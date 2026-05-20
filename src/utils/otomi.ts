const P = {
  cream:    '#f5ecdc',
  gold:     '#c98a4a',
  sienna:   '#b85530',
  burgundy: '#4a121b',
};

interface OtomiTileOptions {
  bg?: string;
  fg?: string;
}

interface RebozoOptions {
  side?: 'top' | 'bottom';
  color?: string;
  bg?: string;
  height?: number;
}

// 220×68 horizontal tile.
export function otomiTile({ bg = P.cream, fg = P.gold }: OtomiTileOptions = {}): string {
  const W = 220, H = 68;
  return `<svg xmlns='http://www.w3.org/2000/svg' width='${W}' height='${H}' viewBox='0 0 ${W} ${H}'>
<rect width='${W}' height='${H}' fill='${bg}'/>

<!-- ── CENTRE DAISY at (110, 34) ── -->
<ellipse cx='110' cy='20' rx='8'  ry='13' fill='${fg}'/>
<ellipse cx='110' cy='48' rx='8'  ry='13' fill='${fg}'/>
<ellipse cx='96'  cy='34' rx='13' ry='8'  fill='${fg}'/>
<ellipse cx='124' cy='34' rx='13' ry='8'  fill='${fg}'/>
<circle  cx='110' cy='34' r='5.5' fill='${bg}'/>

<!-- cardinal accent dots around daisy -->
<circle cx='110' cy='4'  r='3' fill='${fg}'/>
<circle cx='110' cy='64' r='3' fill='${fg}'/>
<circle cx='80'  cy='34' r='3' fill='${fg}'/>
<circle cx='140' cy='34' r='3' fill='${fg}'/>

<!-- diagonal accent dots -->
<circle cx='87'  cy='11' r='2' fill='${fg}'/>
<circle cx='133' cy='11' r='2' fill='${fg}'/>
<circle cx='87'  cy='57' r='2' fill='${fg}'/>
<circle cx='133' cy='57' r='2' fill='${fg}'/>

<!-- ── LEFT SEED PAIR at ~(55, 34) ── -->
<ellipse cx='55' cy='34' rx='6' ry='14' transform='rotate(-40 55 34)' fill='${fg}'/>
<ellipse cx='55' cy='34' rx='6' ry='14' transform='rotate(40  55 34)' fill='${fg}'/>

<!-- dots flanking left seed pair -->
<circle cx='55' cy='8'  r='2.5' fill='${fg}'/>
<circle cx='55' cy='60' r='2.5' fill='${fg}'/>
<circle cx='34' cy='34' r='2.5' fill='${fg}'/>
<circle cx='34' cy='18' r='1.8' fill='${fg}'/>
<circle cx='34' cy='50' r='1.8' fill='${fg}'/>

<!-- ── RIGHT SEED PAIR at (165, 34) — mirror of left ── -->
<ellipse cx='165' cy='34' rx='6' ry='14' transform='rotate(-40 165 34)' fill='${fg}'/>
<ellipse cx='165' cy='34' rx='6' ry='14' transform='rotate(40  165 34)' fill='${fg}'/>

<!-- dots flanking right seed pair -->
<circle cx='165' cy='8'  r='2.5' fill='${fg}'/>
<circle cx='165' cy='60' r='2.5' fill='${fg}'/>
<circle cx='186' cy='34' r='2.5' fill='${fg}'/>
<circle cx='186' cy='18' r='1.8' fill='${fg}'/>
<circle cx='186' cy='50' r='1.8' fill='${fg}'/>

<!-- ── EDGE DOTS at tile boundaries (x≈0 and x≈220) for seamless repeat ── -->
<circle cx='8'   cy='34' r='2.5' fill='${fg}'/>
<circle cx='212' cy='34' r='2.5' fill='${fg}'/>
</svg>`;
}

export function otomiUrl(opts?: OtomiTileOptions): string {
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(otomiTile(opts))}")`;
}

// Vertical strip tile (32×220)
export function otomiStripTile({ bg = P.cream, fg = P.gold }: OtomiTileOptions = {}): string {
  const W = 32, H = 220;
  return `<svg xmlns='http://www.w3.org/2000/svg' width='${W}' height='${H}' viewBox='0 0 ${W} ${H}'>
<rect width='${W}' height='${H}' fill='${bg}'/>

<!-- centre daisy at (16, 110) -->
<ellipse cx='16' cy='96'  rx='8'  ry='13' fill='${fg}'/>
<ellipse cx='16' cy='124' rx='8'  ry='13' fill='${fg}'/>
<ellipse cx='2'  cy='110' rx='13' ry='8'  fill='${fg}'/>
<ellipse cx='30' cy='110' rx='13' ry='8'  fill='${fg}'/>
<circle  cx='16' cy='110' r='5.5' fill='${bg}'/>
<!-- cardinal dots -->
<circle cx='16' cy='80'  r='3' fill='${fg}'/>
<circle cx='16' cy='140' r='3' fill='${fg}'/>

<!-- upper seed pair at (16, 55) -->
<ellipse cx='16' cy='55' rx='6' ry='14' transform='rotate(-40 16 55)' fill='${fg}'/>
<ellipse cx='16' cy='55' rx='6' ry='14' transform='rotate(40  16 55)' fill='${fg}'/>
<circle cx='6'  cy='55' r='2' fill='${fg}'/>
<circle cx='26' cy='55' r='2' fill='${fg}'/>
<circle cx='16' cy='34' r='2.5' fill='${fg}'/>
<circle cx='16' cy='8'  r='2.5' fill='${fg}'/>

<!-- lower seed pair at (16, 165) -->
<ellipse cx='16' cy='165' rx='6' ry='14' transform='rotate(-40 16 165)' fill='${fg}'/>
<ellipse cx='16' cy='165' rx='6' ry='14' transform='rotate(40  16 165)' fill='${fg}'/>
<circle cx='6'  cy='165' r='2' fill='${fg}'/>
<circle cx='26' cy='165' r='2' fill='${fg}'/>
<circle cx='16' cy='186' r='2.5' fill='${fg}'/>
<circle cx='16' cy='212' r='2.5' fill='${fg}'/>
</svg>`;
}

export function otomiStripUrl(opts?: OtomiTileOptions): string {
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(otomiStripTile(opts))}")`;
}

export function buildRebozo(svgEl: SVGSVGElement, { side = 'bottom', color = P.sienna, bg = 'transparent', height = 28 }: RebozoOptions = {}): void {
  const W = 1200, N = 90, knotH = 3;
  const threads = [];
  for (let i = 0; i < N; i++) {
    const len = height - knotH - (i % 4) * 2;
    const x = (i + 0.5) * (W / N);
    threads.push({ x, len, op: 0.55 + (i % 3) * 0.18 });
  }
  const isBottom = side === 'bottom';

  let html = `<rect width="${W}" height="${height}" fill="${bg}"/>`;
  html += `<rect x="0" y="${isBottom ? 0 : height - knotH}" width="${W}" height="${knotH}" fill="${color}"/>`;
  html += `<g fill="${color}" opacity="0.7">`;
  for (let i = 0; i < 60; i++) {
    const cx = (i + 0.5) * (W / 60);
    const cy = isBottom ? knotH / 2 : height - knotH / 2;
    html += `<circle cx="${cx}" cy="${cy}" r="1.4"/>`;
  }
  html += `</g>`;
  threads.forEach(t => {
    const y1 = isBottom ? knotH : height - knotH - t.len;
    const y2 = isBottom ? knotH + t.len : height - knotH;
    html += `<line x1="${t.x}" x2="${t.x}" y1="${y1}" y2="${y2}" stroke="${color}" stroke-width="1.4" stroke-linecap="round" opacity="${t.op}"/>`;
  });
  threads.filter((_, i) => i % 6 === 0).forEach(t => {
    const cy = isBottom ? knotH + t.len - 4 : height - knotH - t.len + 4;
    html += `<circle cx="${t.x}" cy="${cy}" r="2" fill="${color}"/>`;
  });

  svgEl.innerHTML = html;
}

export { P };
