import { type PointerEvent } from 'react';

export function ClassroomScene() {
  function move(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const stage = event.currentTarget;
    const box = stage.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    stage.style.setProperty('--scene-yaw', `${x * 14}deg`);
    stage.style.setProperty('--scene-pitch', `${-y * 12}deg`);
  }

  function reset(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.removeProperty('--scene-yaw');
    event.currentTarget.style.removeProperty('--scene-pitch');
  }

  return (
    <figure className="classroom-scene" onPointerMove={move} onPointerLeave={reset} aria-label="Illustrated Tournament scene">
      <div className="classroom-scene-turn">
        <div className="classroom-paper-back" aria-hidden="true" />
        <div className="classroom-paper">
          <img src="/media/illustrations/classroom-match.webp" alt="Meera lines up a flick with her green highlighter across a school desk"
            width={1440} height={960} fetchPriority="high" className="classroom-art" />
        </div>
        <div className="classroom-foreground" aria-hidden="true">
          <img className="classroom-foreground-pen" src="/media/illustrations/practice-player.webp" alt="" width={600} height={210} decoding="async" />
        </div>
      </div>
    </figure>
  );
}
