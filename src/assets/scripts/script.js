import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);





// -=-=-=- PRELOADER -=-=-=- //

const counterElement = document.querySelector(".counter"),
      overlayElement = document.querySelector(".overlay");

// Has the user visited already? No? Execute the function.
if (!sessionStorage.getItem('visited')) {
	
	// Mark the user as visited.
	sessionStorage.setItem('visited', 'true');
	
	// Show the preloader-elements since they are hidden by default.
	counterElement.style.display = "flex";
	overlayElement.style.display = "flex";

	startLoader();
}

function startLoader() {
  	let currentValue = 0;

  	function updateCounter() {
  	  	if (currentValue >= 100) return;
  	  	currentValue++;
  	  	counterElement.textContent = currentValue;
  	  	setTimeout(updateCounter, 20); // 20ms delays.
  	}

  	updateCounter();

	gsap.to(".counter", 0.25, {
		delay: 3,
		opacity: 0,
	});
	  
	gsap.to(".bar", 1.5, {
		delay: 3,
		height: 0,
		stagger: {
			amount: 0.5,
		},
		ease: "power4.inOut",
	});
}





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
