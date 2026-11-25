// Adapted from React Bits ClickSpark, revision 4320598. See LICENSE.md.
// One burst per impact. The arena determines when and where it happens.
export default function ClickSpark({ x, y }: { x: number; y: number }) {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute z-30" style={{ left: `${x}%`, top: `${y}%` }}>
      {Array.from({ length: 8 }, (_, index) => (
        <span key={index} className="absolute" style={{ transform: `rotate(${index * 45}deg)` }}>
          <span className="flick-spark absolute h-0.5 w-2 rounded-full bg-amber-100" />
        </span>
      ))}
    </span>
  );
}
