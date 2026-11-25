import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { ArrowUpRight, RotateCcw } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import ClickSpark from './react-bits/ClickSpark';

type Point = { x: number; y: number };
type Pose = Point & { angle: number; drop: number };
const width = 440;
const height = 300;
const playerStart: Pose = { x: 119, y: 215, angle: -23, drop: 0 };
const rivalStart: Pose = { x: 320, y: 105, angle: 19, drop: 0 };
const maxPull = 64;
const desk = { left: 27, right: 413, top: 28, bottom: 275 };

function add(origin: Point, direction: Point, distance: number): Point {
  return { x: origin.x + direction.x * distance, y: origin.y + direction.y * distance };
}

function unit(vector: Point): Point {
  const length = Math.hypot(vector.x, vector.y) || 1;
  return { x: vector.x / length, y: vector.y / length };
}

function axis(degrees: number) {
  const angle = degrees * Math.PI / 180;
  return { x: Math.cos(angle), y: Math.sin(angle) };
}

function leavesDesk(point: Point) {
  return point.x < desk.left || point.x > desk.right || point.y < desk.top || point.y > desk.bottom;
}

function edgeDistance(origin: Point, direction: Point) {
  const x = direction.x === 0 ? Infinity : ((direction.x < 0 ? desk.left : desk.right) - origin.x) / direction.x;
  const y = direction.y === 0 ? Infinity : ((direction.y < 0 ? desk.top : desk.bottom) - origin.y) / direction.y;
  return Math.min(x, y);
}

function nearestOnAxis(point: Point, center: Pose, halfLength: number) {
  const direction = axis(center.angle);
  const offset = (point.x - center.x) * direction.x + (point.y - center.y) * direction.y;
  return add(center, direction, Math.max(-halfLength, Math.min(halfLength, offset)));
}

function contactBetween(player: Pose, rival: Pose) {
  const playerAxis = axis(player.angle);
  const rivalAxis = axis(rival.angle);
  const pairs = [-1, 1].flatMap((side) => {
    const playerTip = add(player, playerAxis, 47 * side);
    const rivalTip = add(rival, rivalAxis, 40 * side);
    return [
      { player: playerTip, rival: nearestOnAxis(playerTip, rival, 40) },
      { player: nearestOnAxis(rivalTip, player, 47), rival: rivalTip },
    ];
  });
  return pairs.find((pair) => Math.hypot(pair.rival.x - pair.player.x, pair.rival.y - pair.player.y) <= 11);
}

function pulledPose(pull: Point): Pose {
  const direction = unit(pull);
  const retreat = Math.min(18, Math.hypot(pull.x, pull.y) * 0.28);
  return {
    ...add(playerStart, direction, -retreat),
    angle: Math.atan2(direction.y, direction.x) * 180 / Math.PI,
    drop: 0,
  };
}

function travel(start: Pose, direction: Point, distance: number, spin: number) {
  const edge = edgeDistance(start, direction);
  const falls = distance > edge;
  const end = falls ? Math.min(distance, edge + 32) : distance;
  return {
    falls,
    sample(progress: number): Pose {
      const slide = progress * (2 - progress);
      const moved = end * slide;
      const drop = falls && moved >= edge ? Math.min(1, (moved - edge) / Math.max(1, end - edge)) : 0;
      return {
        ...add(start, direction, moved),
        angle: start.angle + spin * slide + drop * 42,
        drop,
      };
    },
  };
}

function planShot(pull: Point) {
  const power = Math.min(Math.hypot(pull.x, pull.y) / maxPull, 1);
  const direction = unit(pull);
  const start = pulledPose(pull);
  const distance = 460 * power ** 1.22;
  const sweep = Math.min(distance, edgeDistance(start, direction));
  let collision: { distance: number; pose: Pose; point: Point; normal: Point; spin: number } | null = null;

  for (let moved = 0; moved <= sweep; moved += 3) {
    const pose = { ...start, ...add(start, direction, moved) };
    const pair = contactBetween(pose, rivalStart);
    if (!pair) continue;
    const normal = unit({ x: pair.rival.x - pair.player.x, y: pair.rival.y - pair.player.y });
    const arm = { x: pair.rival.x - rivalStart.x, y: pair.rival.y - rivalStart.y };
    collision = { distance: moved, pose, point: pair.rival, normal, spin: (arm.x * direction.y - arm.y * direction.x) * 2.1 };
    break;
  }

  if (!collision) {
    const miss = travel(start, direction, distance, 0);
    return { impact: null, approach: 0, duration: 320 + power * 290, player: miss, rival: travel(rivalStart, direction, 0, 0),
      result: miss.falls ? 'Your pen went off the desk. Try a straighter flick.' : 'No contact. Line up the dots with the rival pen.' };
  }

  const remaining = distance - collision.distance;
  const push = unit({
    x: direction.x * 0.72 + collision.normal.x * 0.28,
    y: direction.y * 0.72 + collision.normal.y * 0.28,
  });
  const rebound = unit({
    x: direction.x - collision.normal.x * 1.4,
    y: direction.y - collision.normal.y * 1.4,
  });
  const player = travel(collision.pose, rebound, Math.min(34, remaining * 0.15), -collision.spin * 0.25);
  const rival = travel(rivalStart, push, remaining * 0.79, collision.spin);
  return {
    impact: collision.point, approach: Math.max(120, collision.distance / (0.8 + power * 0.9)), duration: 440 + power * 150,
    player, rival,
    result: rival.falls ? 'Ring-out! You knocked the rival off the desk.' : 'Solid hit. Pull back farther to finish the ring-out.',
  };
}

function position(point: Point) {
  return { left: `${point.x / width * 100}%`, top: `${point.y / height * 100}%` };
}

function penStyle(pose: Pose) {
  return { transform: `rotate(${pose.angle}deg) scale(${1 - pose.drop * 0.46})`, opacity: 1 - pose.drop * 0.79 };
}

export function FlickDemo() {
  const board = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const pointer = useRef<{ id: number; start: Point } | null>(null);
  const reducedMotion = useReducedMotion();
  const [pull, setPull] = useState<Point | null>(null);
  const [pieces, setPieces] = useState({ player: playerStart, rival: rivalStart });
  const [impact, setImpact] = useState<Point | null>(null);
  const [phase, setPhase] = useState<'ready' | 'moving' | 'finished'>('ready');
  const [result, setResult] = useState('');

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function reset() {
    pointer.current = null;
    setPull(null);
    setPieces({ player: playerStart, rival: rivalStart });
    setImpact(null);
    setResult('');
    setPhase('ready');
  }

  function shoot(vector: Point) {
    if (phase !== 'ready' || Math.hypot(vector.x, vector.y) < 8) return;
    const shot = planShot(vector);
    const launch = pulledPose(vector);
    const finish = () => {
      setPieces({ player: shot.player.sample(1), rival: shot.rival.sample(1) });
      setResult(shot.result);
      setPhase('finished');
    };

    if (reducedMotion) {
      finish();
      return;
    }

    setPhase('moving');
    let startedAt: number | undefined;
    let sparked = false;

    function animate(now: number) {
      startedAt ??= now;
      const elapsed = now - startedAt;
      if (shot.impact && elapsed < shot.approach) {
        const contact = shot.player.sample(0);
        const distance = Math.hypot(contact.x - launch.x, contact.y - launch.y);
        const progress = elapsed / shot.approach;
        setPieces({ player: { ...launch, ...add(launch, unit(vector), distance * progress) }, rival: rivalStart });
      } else {
        if (shot.impact && !sparked) {
          setImpact(shot.impact);
          sparked = true;
        }
        const hold = shot.impact ? 42 : 0;
        const progress = Math.max(0, Math.min(1, (elapsed - shot.approach - hold) / shot.duration));
        if (progress >= 1) {
          finish();
          return;
        }
        setPieces({ player: shot.player.sample(progress), rival: shot.rival.sample(progress) });
      }
      frame.current = requestAnimationFrame(animate);
    }

    frame.current = requestAnimationFrame(animate);
  }

  function getPull(event: PointerEvent) {
    const rect = board.current?.getBoundingClientRect();
    const start = pointer.current?.start;
    if (!rect || !start) return null;
    return { x: (start.x - event.clientX) * width / rect.width, y: (start.y - event.clientY) * height / rect.height };
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (phase !== 'ready' || !event.isPrimary || event.button !== 0) return;
    pointer.current = { id: event.pointerId, start: { x: event.clientX, y: event.clientY } };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function endDrag(event: PointerEvent) {
    if (pointer.current?.id !== event.pointerId) return;
    const vector = getPull(event);
    pointer.current = null;
    setPull(null);
    if (vector) shoot(vector);
  }

  const power = pull ? Math.hypot(pull.x, pull.y) : 0;
  const aim = pull && power > 3 ? unit(pull) : null;
  const player = pull && aim ? pulledPose(pull) : pieces.player;

  return (
    <div className="practice-console min-w-0 rounded-xl border p-3 shadow-2xl sm:p-4" aria-labelledby="flick-title">
      <div className="flex items-center justify-between gap-2 px-1 pb-3">
        <h2 id="flick-title" className="font-display text-2xl font-bold text-white">Try a flick</h2>
        <span className="text-xs font-medium text-slate-300">One-shot practice</span>
      </div>
      <div ref={board} className="practice-arena relative isolate aspect-[22/15] select-none overflow-hidden rounded-lg" data-hit={Boolean(impact)}>
        <div aria-hidden="true" className="flick-desk absolute inset-[9%_6%_8%]" />
        {aim && Array.from({ length: 15 }, (_, i) => {
          const point = add(player, aim, 53 + i * 13);
          return leavesDesk(point) ? null : <span key={i} aria-hidden="true" style={position(point)}
            className={`absolute size-1 -translate-1/2 rounded-full ${power * 6.7 >= 53 + i * 13 ? 'bg-amber-200' : 'bg-white/30'}`} />;
        })}
        <div aria-hidden="true" className="pointer-events-none absolute z-10 w-[26%] -translate-1/2" style={position(pieces.rival)}>
          <img alt="" draggable={false} src="/media/illustrations/practice-rival.webp" width={600} height={210}
            className="practice-pen-sprite w-full" style={penStyle(pieces.rival)} />
        </div>
        <div onPointerDown={startDrag} onPointerMove={(event) => {
          if (pointer.current?.id === event.pointerId) setPull(getPull(event));
        }} onPointerUp={endDrag} onPointerCancel={() => { pointer.current = null; setPull(null); }}
          onLostPointerCapture={() => { pointer.current = null; setPull(null); }}
          aria-hidden="true"
          className={`absolute z-20 grid h-[23%] w-[28%] -translate-1/2 touch-none place-items-center ${phase === 'ready' ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
          style={position(player)}>
          <img alt="" src="/media/illustrations/practice-player.webp" width={600} height={210} draggable={false}
            className="practice-pen-sprite pointer-events-none w-full" style={penStyle(player)} />
        </div>
        {phase === 'ready' && !aim && <span className="pointer-events-none absolute z-20 -translate-x-1/2 text-[10px] font-bold text-[var(--site-text)]"
          style={position({ x: playerStart.x, y: playerStart.y + 27 })}>Your pen</span>}
        {!reducedMotion && impact && (
          <>
            <span aria-hidden="true" className="practice-impact" style={position(impact)} />
            <ClickSpark x={impact.x / width * 100} y={impact.y / height * 100} />
          </>
        )}
      </div>
      <div aria-hidden="true" className="mt-2 flex items-center gap-2 px-1 text-[10px] font-bold text-[var(--site-muted)]">
        <span>Power</span>
        <span className="practice-power"><span style={{ transform: `scaleX(${Math.min(power / maxPull, 1)})` }} /></span>
      </div>
      <p role="status" className="min-h-[2.75rem] px-1 pt-2.5 text-xs leading-relaxed text-slate-200">
        {result || (phase === 'moving' ? 'Flick in motion…' : 'Drag your blue pen away from the rival, then release.')}
      </p>
      <div className="flex flex-wrap items-center gap-2 px-1 pb-0.5">
        <button type="button" aria-disabled={phase === 'moving'} onClick={() => phase === 'finished' ? reset() : shoot({ x: 57, y: -31 })}
          className="site-secondary-action flick-action aria-disabled:opacity-50">
          {phase === 'finished' ? <RotateCcw className="size-3.5" aria-hidden="true" /> : <ArrowUpRight className="size-3.5" aria-hidden="true" />}
          {phase === 'finished' ? 'Try again' : 'Flick straight'}
        </button>
      </div>
    </div>
  );
}
