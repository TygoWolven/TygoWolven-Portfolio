// ------------------------------------------------------
// Import Dependencies
// ------------------------------------------------------

// Lenis
import Lenis from "lenis";

// GSAP
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);





// ------------------------------------------------------
// LENIS — Smooth Scrolling Setup
// ------------------------------------------------------

const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Synchronize Lenis with GSAP's tick to ensure they update their animation at the same time
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);





// ------------------------------------------------------
// DOCUMENT TITLE — Swap When User Leaves Tab
// ------------------------------------------------------

const originalTitle = document.title;

document.addEventListener("visibilitychange", () => {
	if (document.hidden) {
		document.title = "Where are you going?!";
	} else {
		document.title = originalTitle;
	}
});





// ------------------------------------------------------
// HEADING — TransformX on Scroll
// ------------------------------------------------------

gsap.utils.toArray(".animated-heading").forEach((heading) => {
  	const originalHeading = heading.textContent.trim();

	// Duplicate the headings to create a loop
  	heading.innerHTML = `${originalHeading} - ${originalHeading} - ${originalHeading}`;

  	gsap.to(heading, {
  	  	x: "-50%",
  	  	ease: "none",
  	  	scrollTrigger: {
  	  	  	trigger: heading,
  	  	  	start: "top bottom",		// Top of viewport, bottom of element
  	  	  	end: "bottom top",			// Bottom of viewport, top of element
  	  	  	scrub: true,				// Link the animation to the scroll-timeline
  	  	},
  	});
});





// ------------------------------------------------------
// TEXT — Reveal on Scroll
// ------------------------------------------------------

gsap.utils.toArray(".animated-text").forEach((text) => {
	const splitted = new SplitText(text, {
		autoSplit: true,
		type: "lines",
		mask: "lines",
	});

	gsap.from(splitted.lines, {
		yPercent: 150,							// TranslateY with 150%
		duration: 1,
		ease: "power4.out",	
		stagger: 0.1,							// Delay each line with 0.1s
		scrollTrigger: {
			trigger: text,
			start: "top 80%",
			toggleActions: "play none none reverse",
		},
	});
});





// ------------------------------------------------------
// WORK IMAGES — Parallax Scroll Effect
// ------------------------------------------------------

gsap.utils.toArray(".parallax-container img").forEach((image) => {
	gsap.fromTo(
		image,
		{ 
			y: "-20%" 
		},
		{
			y: "20%",
			ease: "none",
			scrollTrigger: {
				trigger: image,
				start: "top bottom",	// Top of viewport, bottom of element
				end: "bottom top",		// Bottom of viewport, top of element
				scrub: 1,				// Link the animation to the scroll-timeline, but give it a 1s delay
			},
		},
	);
});