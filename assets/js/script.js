// Initialize Scrollama
let scroller = scrollama();

// Select HTML Elements
let scrolly = document.querySelector("#scrolly");
let background = scrolly.querySelector("#background");
let foreground = scrolly.querySelector("#foreground");
let steps = foreground.querySelectorAll(".step");

// Update height of elements based on window
function handleResize() {
  // Tell Scrollama to update new element dimensions
  scroller.resize();
}

// Handle Scrollama events
function handleStepEnter(response) {
  // response = { element, direction, index }

  steps.forEach((step, index) => {
    console.log(step);

    if (index === response.index) {
      step.classList.add("is-active");
    } else {
      step.classList.remove("is-active");
    }
  });

  let p = background.querySelector("p");

  console.log(response, p);
  // update graphic based on step
  p.textContent = response.index + 1;
}

function init() {
  // Force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // Setup the scroller
  scroller
    .setup({
      step: "#scrolly .step",
      offset: 0.33,
      debug: true,
    })
    .onStepEnter(handleStepEnter);
}

// Kick things off
init();
