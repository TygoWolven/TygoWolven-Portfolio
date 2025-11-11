import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);





// -=-=-=- CHANGING DOCUMENT TITLE BASED ON USER PRESENCE -=-=-=- //
const originalTitle = document.title;

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        document.title = "You better come back!";
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



const animatedText = document.querySelector('.animated-text'),
      originalText = animatedText.textContent.trim();
  
// Duplicate the text for a seamless loop
animatedText.innerHTML = `${originalText} - ${originalText}`;

// Apply GSAP ScrollTrigger animation
gsap.to(animatedText, {
  scrollTrigger: {
    trigger: animatedText, // Animate when this element is in view
    start: "top bottom", // Start when the element is just entering the viewport
    end: "bottom top", // End when the element leaves the viewport
    scrub: true, // Smoothly scrub the animation with the scroll
  },
  x: "-50%", // Move the text to the left
  ease: "none", // Keep a constant speed
});
