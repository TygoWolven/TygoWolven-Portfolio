import { gsap } from "gsap";

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
