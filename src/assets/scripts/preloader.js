import { gsap } from "gsap";

// -=-=-=- PRELOADER -=-=-=- //

const preloaderElement = document.querySelector(".preloader");

// Has the user visited already? No? Execute the function.
if (!sessionStorage.getItem('visited')) {
	
	// Mark the user as visited.
	sessionStorage.setItem('visited', 'true');
	
	// Show the preloader-elements since they are hidden by default.
	preloaderElement.style.display = "flex";

	startLoader();
}

function startLoader() {
	gsap.to(".heading", 0.25, {
		delay: 3,
		opacity: 0,
	});
	gsap.to(".content", 0.25, {
		delay: 3.2,
		opacity: 0,
	});
	  
	gsap.to(".preloader", 1.5, {
		delay: 3.2,
		height: 0,
		stagger: {
			amount: 0.5,
		},
		ease: "power4.inOut",
	});
}
