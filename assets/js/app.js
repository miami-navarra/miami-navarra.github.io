const app = {
  mapbox: {
    token:
      "pk.eyJ1IjoidnN1ZWlybyIsImEiOiJja2F4YXgxeG4wNWVqMnZxdGo2YzBwazh1In0.KwE44b2R9axBHzT9ybktoQ",
    id: "map",
    style: "mapbox://styles/vsueiro/clhtjemzg01xs01pe02904g3l/draft",
    map: undefined,
    participants: {
      show: function () {
        for (let participant of participants) {
          const id = participant.data.properties.id;
          app.mapbox.map.setPaintProperty(id, "line-opacity", 0.2);
        }
      },
      hide: function () {
        for (let participant of participants) {
          const id = participant.data.properties.id;
          app.mapbox.map.setPaintProperty(id, "line-opacity", 0);
        }
      },
      draw: function () {
        for (let participant of participants) {
          const id = participant.data.properties.id;
          const role = participant.data.properties.role;
          app.mapbox.map.addSource(id, participant);

          const options = {
            id: id,
            type: "line",
            source: id,
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": role === "Student" ? "#ed7351" : "#00bfb4",
              "line-width": 2,
              "line-opacity": 0,
            },
          };

          app.mapbox.map.addLayer(options);
        }
      },
    },
    initialize: function () {
      mapboxgl.accessToken = app.mapbox.token;

      app.mapbox.map = new mapboxgl.Map({
        container: app.mapbox.id,
        style: app.mapbox.style,
        center: [0, 0],
        zoom: 0,
        interactive: false,
      });

      app.mapbox.map.on("load", () => {
        app.scrollama.handleStepEnter({ index: 0 });
        app.mapbox.participants.draw();
      });
    },
  },

  scrollama: {
    scroller: scrollama(),

    elements: {
      scrolly: document.querySelector("#scrolly"),
      background: document.querySelector("#background"),
      foreground: document.querySelector("#foreground"),
      steps: document.querySelectorAll(".step"),
    },

    // Update height of elements based on window
    handleResize: function () {
      // Tell Scrollama to update new element dimensions
      app.scrollama.scroller.resize();
    },

    // Handle Scrollama events
    handleStepEnter: function (response) {
      // response = { element, direction, index }

      app.scrollama.elements.steps.forEach((step, index) => {
        if (index === response.index) {
          step.classList.add("is-active");
        } else {
          step.classList.remove("is-active");
        }
      });

      if (
        response.element &&
        response.element.dataset.lon &&
        response.element.dataset.lat
      ) {
        const lon = parseFloat(response.element.dataset.lon);
        const lat = parseFloat(response.element.dataset.lat);
        const zoom = parseInt(response.element.dataset.zoom);

        app.mapbox.map.flyTo({ center: [lon, lat], zoom: zoom });

        // Hide country borders
        app.mapbox.map.setPaintProperty(
          "country-boundaries",
          "line-opacity",
          0
        );
        // Make satellite images evident
        app.mapbox.map.setPaintProperty("satellite", "raster-opacity", 0.5);
        // Hide paths
        app.mapbox.participants.hide();
        return;
      }

      switch (response.index) {
        case 0:
          // Fit around Florida
          app.mapbox.map.fitBounds([
            [-102.0, 5.7], // SW
            [-59.0, 43.2], // NE
          ]);
          // Show country borders
          app.mapbox.map.setPaintProperty(
            "country-boundaries",
            "line-opacity",
            1
          );
          // Make satellite images subtle
          app.mapbox.map.setPaintProperty("satellite", "raster-opacity", 0.1);
          // Hide paths
          app.mapbox.participants.hide();
          break;

        case 1:
          // Fit around Florida
          app.mapbox.map.fitBounds([
            [-102.0, 5.7], // SW
            [-59.0, 43.2], // NE
          ]);
          // Hide country borders
          app.mapbox.map.setPaintProperty(
            "country-boundaries",
            "line-opacity",
            0
          );
          // Make satellite images evident
          app.mapbox.map.setPaintProperty("satellite", "raster-opacity", 0.5);
          // Hide paths
          app.mapbox.participants.hide();
          break;

        case 2:
          // Fly to Government Center
          app.mapbox.map.flyTo({ center: [-80.1989621, 25.7755419], zoom: 12 });
          // Hide paths
          app.mapbox.participants.hide();
          break;

        case 3:
          app.mapbox.map.flyTo({ center: [-45, 30], zoom: 2 });
          // Show paths
          app.mapbox.participants.show();
          break;

        default:
          // Fly somewhere else
          const lon = Math.random() * 180 * 2 - 180;
          const lat = Math.random() * 90 * 2 - 90;
          const zoom = Math.floor(Math.random() * 12);
          app.mapbox.map.flyTo({ center: [lon, lat], zoom: zoom });
          break;
      }
    },

    initialize: function () {
      // Force a resize on load to ensure proper dimensions are sent to scrollama
      app.scrollama.handleResize();

      // Setup the scroller
      app.scrollama.scroller
        .setup({
          step: "#scrolly .step",
          offset: 0.5,
          debug: false,
        })
        .onStepEnter(app.scrollama.handleStepEnter);
    },
  },

  initialize: function () {
    app.scrollama.initialize();
    app.mapbox.initialize();

    setTimeout(() => {
      document.body.classList.add("initialized");
    }, 500);
  },
};

app.initialize();
