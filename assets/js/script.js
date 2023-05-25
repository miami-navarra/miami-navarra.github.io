mapboxgl.accessToken =
  "pk.eyJ1IjoidnN1ZWlybyIsImEiOiJja2F4YXgxeG4wNWVqMnZxdGo2YzBwazh1In0.KwE44b2R9axBHzT9ybktoQ";

const map = new mapboxgl.Map({
  container: "map", // id
  style: "mapbox://styles/vsueiro/clhtjemzg01xs01pe02904g3l/draft",
  center: [0, 0],
  zoom: 0,
  interactive: false,
});

const participants = [
  {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {
        id: "student-name",
        name: "Sudent Name",
        role: "(Student|Faculty)",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [3.770298503497429, 48.07805653586345],
          [-0.9997653420810764, 42.472071423130586],
          [-80.32002288539272, 25.840106299241327],
        ],
      },
    },
  },
];

map.on("load", () => {
  for (let participant of participants) {
    const id = participant.data.properties.id;
    map.addSource(id, participant);

    const options = {
      id: id,
      type: "line",
      source: id,
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#f0f", //""#ed7351",
        "line-width": 2,
        "line-opacity": 0.2,
      },
      cd,
    };

    map.addLayer(options);
  }
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
    if (index === response.index) {
      step.classList.add("is-active");
    } else {
      step.classList.remove("is-active");
    }
  });

  // update graphic based on step
  switch (response.index) {
    case 0:
      map.fitBounds([
        [-102.0, 5.7], // SW
        [-59.0, 43.2], // NE
      ]);
      map.setPaintProperty("country-boundaries", "line-opacity", 1);
      map.setPaintProperty("satellite", "raster-opacity", 0.1);
      break;

    case 1:
      map.fitBounds([
        [-102.0, 5.7], // SW
        [-59.0, 43.2], // NE
      ]);
      map.setPaintProperty("country-boundaries", "line-opacity", 0);
      map.setPaintProperty("satellite", "raster-opacity", 0.5);
      break;

    default:
      map.flyTo({ center: [-20, 50], zoom: 4 });
      break;
  }
}

function init() {
  // Force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // Setup the scroller
  scroller
    .setup({
      step: "#scrolly .step",
      offset: 0.5,
      debug: false,
    })
    .onStepEnter(handleStepEnter);

  handleStepEnter({ index: 0 });
}

// Kick things off
init();
