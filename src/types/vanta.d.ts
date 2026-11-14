// `vanta` ships no TypeScript declarations and its published UMD bundle does not
// expose the registered effect, so we import the ESM source directly instead.
declare module "vanta/src/vanta.net.js" {
  import type * as THREENS from "three";

  interface VantaOptions {
    el: HTMLElement;
    THREE: typeof THREENS;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    backgroundColor?: number | string;
    backgroundAlpha?: number;
    color?: number | string;
    color2?: number | string;
    points?: number;
    maxDistance?: number;
    spacing?: number;
    showDots?: boolean;
    dotColor?: number | string;
    lineColor?: number | string;
    opacity?: number;
    speed?: number;
    forceAnimate?: boolean;
    mouseEase?: boolean;
    [key: string]: unknown;
  }

  interface VantaEffect {
    destroy: () => void;
    pause: () => void;
    resume: () => void;
    resize: () => void;
    setOptions: (options: Partial<VantaOptions>) => void;
    linesMesh?: unknown;
  }

  const NET: (options: VantaOptions) => VantaEffect;
  export default NET;
  export type { VantaEffect, VantaOptions };
}
