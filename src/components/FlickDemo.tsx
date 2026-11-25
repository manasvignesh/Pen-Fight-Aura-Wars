import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { ArrowUpRight, RotateCcw } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import ClickSpark from './react-bits/ClickSpark';

type Point = { x: number; y: number };
const width = 440;
const height = 300;
const playerStart = { x: 119, y: 215 };
const rivalStart = { x: 320, y: 105 };
const maxPull = 64;
const desk = { left: 27, right: 413, top: 28, bottom: 275 };

function add(origin: Point, direction: Point, distance: number): Point {
  return { x: origin.x + direction.x * distance, y: origin.y + direction.y * distance };
}

function leavesDesk(point: Point) {
  return point.x < desk.left || point.x > desk.right || point.y < desk.top || point.y > desk.bottom;
}

function planShot(pull: Point) {
  const force = Math.hypot(pull.x, pull.y);
  const direction = { x: pull.x / force, y: pull.y / force };
  const distance = Math.min(force / maxPull, 1) * 440;
  const dx = rivalStart.x - playerStart.x;
  const dy = rivalStart.y - playerStart.y;
  const projection = dx * direction.x + dy * direction.y;
  const missDistance = Math.abs(dx * direction.y - dy * direction.x);
  const contact = projection - Math.sqrt(Math.max(0, 34 ** 2 - missDistance ** 2));
  const hit = missDistance < 34 && contact >= 0 && contact <= distance;
  const remainder = distance - contact;
  const playerEnd = add(playerStart, direction, hit ? contact + Math.min(35, remainder * 0.14) : distance);
  const rivalEnd = hit ? add(rivalStart, direction, remainder * 0.82) : rivalStart;
  const result = leavesDesk(rivalEnd) ? 'Ring-out! You knocked the rival off the desk.'
    : leavesDesk(playerEnd) ? 'Your pen went off the desk. Try a straighter flick.'
    : hit ? 'Solid hit. Pull back farther to finish the ring-out.' : 'No contact. Line up the dots with the rival pen.';
  return { playerEnd, rivalEnd, playerHit: add(playerStart, direction, contact), hit, result };
}

function interpolate(from: Point, to: Point, progress: number): Point {
  const ease = progress * (2 - progress);
  return { x: from.x + (to.x - from.x) * ease, y: from.y + (to.y - from.y) * ease };
}

function position(point: Point) {
  return { left: `${point.x / width * 100}%`, top: `${point.y / height * 100}%` };
}

export function FlickDemo() {
  const board = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const pointer = useRef<{ id: number; start: Point } | null>(null);
  const reducedMotion = useReducedMotion();
  const [pull, setPull] = useState<Point | null>(null);
  const [player, setPlayer] = useState(playerStart);
  const [rival, setRival] = useState(rivalStart);
  const [impact, setImpact] = useState<Point | null>(null);
  const [phase, setPhase] = useState<'ready' | 'moving' | 'finished'>('ready');
  const [result, setResult] = useState('');

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function reset() {
    pointer.current = null;
    setPull(null);
    setPlayer(playerStart);
    setRival(rivalStart);
    setImpact(null);
    setResult('');
    setPhase('ready');
  }

  function shoot(vector: Point) {
    if (phase !== 'ready' || Math.hypot(vector.x, vector.y) < 8) return;
    const shot = planShot(vector);
    const finish = () => {
      setPlayer(shot.playerEnd);
      setRival(shot.rivalEnd);
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
      const approach = shot.hit ? 330 : 690;
      if (elapsed < approach) {
        setPlayer(interpolate(playerStart, shot.hit ? shot.playerHit : shot.playerEnd, elapsed / approach));
      } else if (shot.hit) {
        if (!sparked) {
          setImpact(rivalStart);
          sparked = true;
        }
        const settle = Math.min((elapsed - approach) / 530, 1);
        setPlayer(interpolate(shot.playerHit, shot.playerEnd, settle));
        setRival(interpolate(rivalStart, shot.rivalEnd, settle));
      }
      if (elapsed >= (shot.hit ? 860 : 690)) finish();
      else frame.current = requestAnimationFrame(animate);
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
  const aim = pull && power > 3 ? { x: pull.x / power, y: pull.y / power } : null;

  return (
    <div className="practice-console min-w-0 rounded-xl border p-3 shadow-2xl sm:p-4" aria-labelledby="flick-title">
      <div className="flex items-center justify-between gap-2 px-1 pb-3">
        <h2 id="flick-title" className="font-display text-2xl font-bold text-white">Try a flick</h2>
        <span className="text-xs font-medium text-slate-300">One-shot practice</span>
      </div>
      <div ref={board} className="practice-arena relative isolate aspect-[22/15] select-none overflow-hidden rounded-lg">
        <div aria-hidden="true" className="flick-desk absolute inset-[9%_6%_8%]" />
        {aim && Array.from({ length: 13 }, (_, i) => {
          const point = add(playerStart, aim, 31 + i * 15);
          return leavesDesk(point) ? null : <span key={i} aria-hidden="true" style={position(point)}
            className={`absolute size-1 -translate-1/2 rounded-full ${power * 3.5 > i * 15 ? 'bg-amber-200' : 'bg-white/35'}`} />;
        })}
        <img aria-hidden="true" alt="" draggable={false} src="/media/illustrations/practice-rival.webp" width={600} height={210}
          className={`practice-pen-sprite pointer-events-none absolute z-10 w-[26%] -translate-1/2 rotate-[19deg] ${leavesDesk(rival) ? 'scale-50 opacity-25' : ''}`}
          style={position(rival)} />
        <div onPointerDown={startDrag} onPointerMove={(event) => {
          if (pointer.current?.id === event.pointerId) setPull(getPull(event));
        }} onPointerUp={endDrag} onPointerCancel={() => { pointer.current = null; setPull(null); }}
          onLostPointerCapture={() => { pointer.current = null; setPull(null); }}
          aria-hidden="true"
          className={`absolute z-20 grid h-[23%] w-[28%] -translate-1/2 touch-none place-items-center ${phase === 'ready' ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'} ${leavesDesk(player) ? 'scale-50 opacity-25' : ''}`}
          style={position(player)}>
          <img alt="" src="/media/illustrations/practice-player.webp" width={600} height={210} draggable={false} className="practice-pen-sprite pointer-events-none w-full -rotate-[23deg]" />
        </div>
        {phase === 'ready' && <span className="pointer-events-none absolute z-20 -translate-x-1/2 text-[10px] font-bold text-[var(--site-text)]"
          style={position({ x: playerStart.x, y: playerStart.y + 27 })}>Your pen</span>}
        {!reducedMotion && impact && <ClickSpark x={impact.x / width * 100} y={impact.y / height * 100} />}
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
