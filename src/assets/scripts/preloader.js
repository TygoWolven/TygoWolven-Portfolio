// ------------------------------------------------------
// Import Dependencies
// ------------------------------------------------------

// GSAP
import { gsap } from "gsap";





// ------------------------------------------------------
// PRELOADER — Hide the website while it's loading
// ------------------------------------------------------

const preloaderElement = document.querySelector(".preloader");

// User has not visited yet? Execute the function.
if (!sessionStorage.getItem('visited')) {
	
	// Mark the user as visited.
	sessionStorage.setItem('visited', 'true');
	
	// Show the preloader.
	preloaderElement.style.display = "flex";
	
	// Run the animation after a short delay.
	document.addEventListener("DOMContentLoaded", () => {
		setTimeout(startLoader, 2500)
	});
}

function startLoader() {
	gsap.to(".preloader", {
		duration: 1.5,
		height: 0,
		delay: 0.25,
		ease: "power4.inOut",
	});

	gsap.to(".preloader .content", {
		duration: 0.25,
		opacity: 0,
	});
};