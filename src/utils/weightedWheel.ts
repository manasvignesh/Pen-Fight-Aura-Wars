export const scrollKeys = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Escape']);

const wheelDistance = 0.55;
const glideTime = 100;
const wheelSteps = [53, 80, 100, 120];

function isWheelNotch(event: WheelEvent) {
  const mode = event.deltaMode;
  const delta = Math.abs(event.deltaY);
  if (mode === WheelEvent.DOM_DELTA_LINE) return delta >= 1 && Number.isInteger(delta);
  // Pixel-mode wheel events share a format with trackpads. Only ease common wheel steps.
  return mode === WheelEvent.DOM_DELTA_PIXEL && delta >= wheelSteps[0] - 2 &&
    wheelSteps.some((step) => Math.abs(delta - Math.round(delta / step) * step) <= 2);
}

export function installWeightedWheel() {
  const enabled = window.matchMedia('(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)');
  const listeners = new AbortController();
  const passive = { passive: true, signal: listeners.signal };
  let frame = 0;
  let previousTime: number | undefined;
  let position = 0;
  let target = 0;

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    previousTime = undefined;
  }

  function glide(now: number) {
    const elapsed = previousTime === undefined ? 16 : now - previousTime;
    previousTime = now;
    position += (target - position) * (1 - Math.exp(-elapsed / glideTime));
    const settled = Math.abs(target - position) <= 1;
    window.scrollTo({ top: settled ? target : position, behavior: 'instant' });
    if (settled) stop();
    else frame = requestAnimationFrame(glide);
  }

  function onWheel(event: WheelEvent) {
    if (!enabled.matches || !event.cancelable || event.defaultPrevented ||
        event.ctrlKey || event.metaKey || event.shiftKey || event.deltaX ||
        !isWheelNotch(event)) {
      stop();
      return;
    }

    const page = document.scrollingElement;
    const overInternalScroller = event.composedPath().some((element) =>
      element instanceof HTMLElement &&
      element !== page && element !== document.body &&
      element.scrollHeight > element.clientHeight + 1 &&
      /^(auto|scroll|overlay)$/.test(getComputedStyle(element).overflowY),
    );
    if (!page || overInternalScroller) {
      stop();
      return;
    }

    const pixels = event.deltaY * (event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 32 : 1);
    const maxScroll = Math.max(0, page.scrollHeight - page.clientHeight);
    event.preventDefault();
    if (!frame) position = target = window.scrollY;
    if ((target - position) * pixels < 0) target = position;
    target = Math.max(0, Math.min(maxScroll, target + pixels * wheelDistance));
    if (!frame && Math.abs(target - position) > 0.5) frame = requestAnimationFrame(glide);
  }

  window.addEventListener('wheel', onWheel, { ...passive, passive: false });
  window.addEventListener('pointerdown', stop, passive);
  window.addEventListener('touchstart', stop, passive);
  window.addEventListener('resize', stop, passive);
  window.addEventListener('keydown', (event) => {
    if (scrollKeys.has(event.key)) stop();
  }, passive);
  enabled.addEventListener('change', stop, { signal: listeners.signal });

  return () => {
    stop();
    listeners.abort();
  };
}
