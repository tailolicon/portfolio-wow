import type { Project } from "../data";

/* Line drawings in the practice's house style: poché walls, thin glazing lines,
   door swings, a scale bar and north point. Drawn in currentColor. */

const WALL = 9;

function ScaleBar({ x, y }: { x: number; y: number }) {
  return (
    <g className="oh-dw-thin" transform={`translate(${x} ${y})`}>
      <rect x="0" y="0" width="40" height="6" className="oh-dw-fill" />
      <rect x="40" y="0" width="40" height="6" fill="none" />
      <rect x="80" y="0" width="80" height="6" fill="none" />
      <text x="0" y="22">0</text>
      <text x="76" y="22">5</text>
      <text x="152" y="22">10m</text>
    </g>
  );
}

function North({ x, y }: { x: number; y: number }) {
  return (
    <g className="oh-dw-thin" transform={`translate(${x} ${y})`}>
      <circle r="16" fill="none" />
      <path d="M0 -16 L6 8 L0 3 L-6 8 Z" className="oh-dw-fill" />
      <text x="-4" y="-22">N</text>
    </g>
  );
}

function Door({ x, y, r, rot = 0 }: { x: number; y: number; r: number; rot?: number }) {
  return (
    <g className="oh-dw-thin" transform={`translate(${x} ${y}) rotate(${rot})`}>
      <line x1="0" y1="0" x2="0" y2={-r} />
      <path d={`M0 ${-r} A${r} ${r} 0 0 1 ${r} 0`} fill="none" strokeDasharray="3 3" />
    </g>
  );
}

function Label({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} className="oh-dw-label" textAnchor="middle">
      {children}
    </text>
  );
}

function HousePlan() {
  return (
    <>
      <path className="oh-dw-wall" d="M80 120 H520 V300 H700 V470 H80 Z" strokeWidth={WALL} />
      <path className="oh-dw-wall-thin" d="M300 120 V330 M80 300 H300 M300 330 H520 M520 300 V470" />
      <path className="oh-dw-glass" d="M560 470 H680 M700 330 V450 M120 470 H260" />
      <circle cx="610" cy="190" r="70" className="oh-dw-tree" />
      <circle cx="610" cy="190" r="6" className="oh-dw-fill" />
      <Door x={300} y={220} r={34} rot={90} />
      <Door x={410} y={330} r={34} />
      <Label x={190} y={215}>Study</Label>
      <Label x={410} y={230}>Kitchen</Label>
      <Label x={190} y={390}>Hall</Label>
      <Label x={410} y={405}>Dining</Label>
      <Label x={610} y={400}>Living</Label>
      <Label x={610} y={290}>Oak</Label>
    </>
  );
}

function CourtyardPlan() {
  return (
    <>
      <rect className="oh-dw-wall" x="110" y="100" width="580" height="380" strokeWidth={WALL} />
      <rect className="oh-dw-wall" x="270" y="210" width="260" height="160" strokeWidth={WALL - 3} />
      <path className="oh-dw-wall-thin" d="M110 210 H270 M110 370 H270 M530 210 H690 M530 370 H690 M400 100 V210 M400 370 V480" />
      <path className="oh-dw-glass" d="M300 210 H500 M300 370 H500 M270 240 V340 M530 240 V340" />
      <g className="oh-dw-hatch">
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1={280 + i * 22} y1="220" x2={280 + i * 22 - 10} y2="360" />
        ))}
      </g>
      <Door x={400} y={480} r={30} rot={-90} />
      <Label x={400} y={296}>Courtyard</Label>
      <Label x={190} y={160}>Entrance</Label>
      <Label x={610} y={160}>Reading</Label>
      <Label x={190} y={296}>Store</Label>
      <Label x={610} y={296}>Hall</Label>
      <Label x={255} y={430}>Rooms</Label>
      <Label x={545} y={430}>Rooms</Label>
    </>
  );
}

function FloorplatePlan() {
  const cols = [];
  for (let c = 0; c < 7; c += 1) {
    for (let r = 0; r < 3; r += 1) {
      cols.push(<rect key={`${c}-${r}`} x={130 + c * 90} y={165 + r * 110} width="10" height="10" className="oh-dw-fill" />);
    }
  }
  return (
    <>
      <rect className="oh-dw-wall" x="90" y="120" width="620" height="340" strokeWidth={WALL} />
      <path className="oh-dw-glass" d="M120 120 H680 M120 460 H680" />
      {cols}
      <rect className="oh-dw-wall" x="340" y="240" width="120" height="100" strokeWidth={6} />
      <path className="oh-dw-wall-thin" d="M190 240 H340 M460 240 H610 M190 340 H340 M460 340 H610 M265 240 V340 M535 240 V340" />
      <Label x={400} y={296}>Core</Label>
      <Label x={228} y={296}>Meet</Label>
      <Label x={572} y={296}>Meet</Label>
      <Label x={400} y={190}>Studio</Label>
      <Label x={400} y={410}>Studio</Label>
    </>
  );
}

function PavilionPlan() {
  return (
    <>
      <path className="oh-dw-wall" d="M120 440 C180 180 420 110 680 150" strokeWidth={WALL + 4} fill="none" />
      <path className="oh-dw-wall" d="M230 470 C280 290 450 240 690 270" strokeWidth={WALL + 4} fill="none" />
      <path className="oh-dw-glass" d="M120 440 L230 470 M680 150 L690 270" />
      <path className="oh-dw-wall-thin" d="M360 210 L390 330" strokeDasharray="6 5" />
      <Label x={330} y={320}>Gallery</Label>
      <Label x={560} y={225}>Study room</Label>
      <Label x={175} y={485}>Entrance</Label>
    </>
  );
}

function Section({ kind }: { kind: Project["drawing"] }) {
  const roof =
    kind === "house"
      ? "M120 230 L400 130 L680 230"
      : kind === "pavilion"
        ? "M120 240 C300 110 500 110 680 240"
        : kind === "floorplate"
          ? "M160 120 H640"
          : "M120 180 H680";
  const floors = kind === "floorplate" ? [180, 240, 300] : kind === "house" ? [290] : [260];
  return (
    <>
      <path className="oh-dw-ground" d="M40 360 H760" />
      <g className="oh-dw-hatch">
        {Array.from({ length: 36 }, (_, i) => (
          <line key={i} x1={50 + i * 20} y1="368" x2={40 + i * 20} y2="384" />
        ))}
      </g>
      <path className="oh-dw-wall" d={roof} strokeWidth={WALL} fill="none" />
      <path
        className="oh-dw-wall"
        d={kind === "floorplate" ? "M160 120 V360 M640 120 V360" : kind === "house" ? "M120 230 V360 M680 230 V360" : "M120 240 V360 M680 240 V360"}
        strokeWidth={WALL}
      />
      {floors.map((y) => (
        <line key={y} className="oh-dw-wall" x1={kind === "floorplate" ? 160 : 120} x2={kind === "floorplate" ? 640 : 680} y1={y} y2={y} strokeWidth={6} />
      ))}
      <path className="oh-dw-thin" d="M720 360 V170 M712 360 H728 M712 170 H728" />
      <text className="oh-dw-label" x="735" y="270">
        {kind === "floorplate" ? "+14.2" : "+7.4"}
      </text>
    </>
  );
}

export default function Drawings({ project }: { project: Project }) {
  const plans = {
    house: HousePlan,
    courtyard: CourtyardPlan,
    floorplate: FloorplatePlan,
    pavilion: PavilionPlan,
  } as const;
  const Plan = plans[project.drawing];
  return (
    <div className="oh-drawings">
      <figure className="oh-drawing">
        <svg viewBox="0 0 800 560" role="img" aria-label={`${project.name}, ground floor plan`}>
          <Plan />
          <ScaleBar x={80} y={520} />
          <North x={730} y={70} />
        </svg>
        <figcaption className="oh-data">Ground floor plan, 1:200</figcaption>
      </figure>
      <figure className="oh-drawing">
        <svg viewBox="0 0 800 560" role="img" aria-label={`${project.name}, long section`}>
          <Section kind={project.drawing} />
          <ScaleBar x={80} y={470} />
        </svg>
        <figcaption className="oh-data">Section AA, 1:200</figcaption>
      </figure>
    </div>
  );
}
