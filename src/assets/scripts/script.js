import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);





// -=-=-=- CHANGING DOCUMENT TITLE BASED ON USER PRESENCE -=-=-=- //
const originalTitle = document.title;

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        document.title = "Pleasure meeting ya!";
    } else {
        document.title = originalTitle;
    }
});





// -=-=-=- LENIS SMOOTH SCROLLING -=-=-=- //

const lenis = new Lenis();

// Synchronize Lenis with GSAP's ScrollTrigger Plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  	lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);