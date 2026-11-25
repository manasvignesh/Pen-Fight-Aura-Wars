import { type PropsWithChildren } from 'react';

// Adapted from React Bits Star Border, revision 4320598. See LICENSE.md.
// The two light sweeps play on hover or focus.
export default function StarBorder({ children }: PropsWithChildren) {
  return (
    <span className="star-border">
      <span className="star-border-glint" aria-hidden="true" />
      <span className="star-border-glint star-border-glint-reverse" aria-hidden="true" />
      {children}
    </span>
  );
}
