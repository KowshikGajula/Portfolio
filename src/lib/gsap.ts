import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once, at module scope, so every consumer can use ScrollTrigger.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
