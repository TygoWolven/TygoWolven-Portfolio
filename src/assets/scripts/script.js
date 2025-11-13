// Import Lenis
import Lenis from "lenis";

// Import GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger,SplitText);





// -=-=-=- LENIS SMOOTH SCROLLING -=-=-=- //

const lenis = new Lenis();

// Synchronize Lenis with GSAP"s ScrollTrigger Plugin
lenis.on("scroll", ScrollTrigger.update);

// Add Lenis"s requestAnimationFrame (raf) method to GSAP"s ticker
// This ensures Lenis"s smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  	lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);





// -=-=-=- HEADING ANIMATION ON SCROLL -=-=-=- //

const animatedHeading = document.querySelector(".animated-heading"),
      originalHeading = animatedHeading.textContent.trim();
  
// Duplicate the text to create a loop
animatedHeading.innerHTML = `${originalHeading} - ${originalHeading}`;

gsap.to(animatedHeading, {
  	scrollTrigger: {
  	  	trigger: animatedHeading, // Animate when "animatedHeading" is in view.
  	  	start: "top bottom", // Top of element reaches bottom of screen.
  	  	end: "bottom top", // Bottom of element reaches top of screen.
  	  	scrub: true, // Smoothly scrub the animation with the scroll
  	},
  	x: "-50%",
  	ease: "none", 
});





// -=-=-=- PARAGRAPH ANIMATION ON SCROLL -=-=-=- //

const animatedParagraph = document.querySelector(".animated-paragraph");

const splittedParagraph = new SplitText(animatedParagraph, {
    type: "lines",
	mask: "lines",
});

gsap.from(splittedParagraph.lines, {
  	scrollTrigger: {
  	  	trigger: animatedParagraph,
  	  	start: "top 75%",
  	  	toggleActions: "play none none reverse" // Play on enter, reverse on the way back.
  	},
  	yPercent: 150,
  	duration: 1,
  	ease: "power4.out",
  	stagger: {
  	  	each: 0.1
  	},
});





// -=-=-=- CHANGING DOCUMENT TITLE BASED ON USER PRESENCE -=-=-=- //
const originalTitle = document.title;

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        document.title = "You better come back!";
    } else {
        document.title = originalTitle;
    }
});