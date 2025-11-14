// ------------------------------------------------------
// Import Dependencies
// ------------------------------------------------------

// Lenis
import Lenis from "lenis";

// GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);





// ------------------------------------------------------
// LENIS — Smooth Scrolling Setup
// ------------------------------------------------------

const lenis = new Lenis();

// Sync Lenis with ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);

// Run Lenis on GSAP’s ticker
gsap.ticker.add((time) => {
	lenis.raf(time * 1000); // GSAP → seconds | Lenis → milliseconds
});

// Disable lag smoothing (prevents scroll delay)
gsap.ticker.lagSmoothing(0);





// ------------------------------------------------------
// DOCUMENT TITLE — Swap When User Leaves Tab
// ------------------------------------------------------

const originalTitle = document.title;

document.addEventListener("visibilitychange", () => {
	if (document.hidden) {
		document.title = "You better come back!";
	} else {
		document.title = originalTitle;
	}
});





// ------------------------------------------------------
// HEADING — Infinite Horizontal Scroll Animation
// ------------------------------------------------------

const animatedHeading = document.querySelector(".animated-heading"),
      originalHeading = animatedHeading.textContent.trim();
  
// Duplicate the text to create a loop
animatedHeading.innerHTML = `${originalHeading} - ${originalHeading}`;

gsap.to(animatedHeading, {
	x: "-50%",
	ease: "none", 
  	scrollTrigger: {
  	  	trigger: animatedHeading, 
  	  	start: "top bottom", 		// Top of viewport, bottom of element
  	  	end: "bottom top", 			// Bottom of viewport, top of element
  	  	scrub: true, 				// Link the animation to the scroll-timeline
  	},
});





// ------------------------------------------------------
// PARAGRAPH — Line-by-Line Reveal on Scroll
// ------------------------------------------------------

gsap.utils.toArray(".animated-paragraph").forEach((paragraph) => {
	const splitted = new SplitText(paragraph, {
		type: "lines",
		mask: "lines",
	});

	gsap.from(splitted.lines, {
		yPercent: 150,									// TranslateY with 150%
		duration: 1,
		ease: "power4.out",	
		stagger: { each: 0.1 },							// Delay each line with 0.1s
		scrollTrigger: {
			trigger: paragraph,
			start: "top 75%",
			toggleActions: "play none none reverse",	// Play when scrolling, reverse when scrolling-back
		},
	});
});





// ------------------------------------------------------
// WORK IMAGES — Parallax Scroll Effect
// ------------------------------------------------------

gsap.utils.toArray(".parallax-container img").forEach((image) => {
	gsap.fromTo(
		image,
		{ y: "-20%" },
		{
			y: "20%",
			ease: "none",
			scrollTrigger: {
				trigger: image,
				start: "top bottom",	// Top of viewport, bottom of element
				end: "bottom top",		// Bottom of viewport, top of element
				scrub: 1,				// Link the animation to the scroll-timeline, but give it a 1s delay
			},
		}
	);
});