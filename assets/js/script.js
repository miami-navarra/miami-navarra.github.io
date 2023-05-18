mapboxgl.accessToken =
  "pk.eyJ1IjoidnN1ZWlybyIsImEiOiJja2F4YXgxeG4wNWVqMnZxdGo2YzBwazh1In0.KwE44b2R9axBHzT9ybktoQ";

const map = new mapboxgl.Map({
  container: "map", // id
  style: "mapbox://styles/vsueiro/clhtjemzg01xs01pe02904g3l/draft",
  center: [0, 0],
  zoom: 2,
});

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

  // update graphic based on step
  console.log(response.index);
}

function init() {
  // Force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // Setup the scroller
  scroller
    .setup({
      step: "#scrolly .step",
      offset: 0.5,
      debug: true,
    })
    .onStepEnter(handleStepEnter);
}

// Kick things off
init();
