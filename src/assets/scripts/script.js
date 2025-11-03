import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



// Loading Screen Animation
const loadingScreen = document.querySelector(".loading-screen");

// Has the user visited already? No? Execute the function.
if (!sessionStorage.getItem('visited')) {
	
	// Mark the user as visited.
	sessionStorage.setItem('visited', 'true');

  	window.addEventListener('load', () => {
    	loadingScreen.classList.add("play-loader");
  	});
}



// Lenis Smooth Scrolling
const lenis = new Lenis();

// Synchronize Lenis with GSAP's ScrollTrigger Plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  	lenis.raf(time * 750); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);