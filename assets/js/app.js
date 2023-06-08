const app = {
  isSmall: () => {
    return window.innerWidth < 960;
  },

  mapbox: {
    token:
      "pk.eyJ1IjoidnN1ZWlybyIsImEiOiJja2F4YXgxeG4wNWVqMnZxdGo2YzBwazh1In0.KwE44b2R9axBHzT9ybktoQ",
    id: "map",
    style: "mapbox://styles/vsueiro/clhtjemzg01xs01pe02904g3l",
    map: undefined,
    participants: {
      highlight: function (target) {
        if (app.isSmall()) {
          app.mapbox.participants.show();
          return;
        }

        for (let participant of participants) {
          const id = participant.data.properties.id;
          if (app.mapbox.map.getLayer(id)) {
            if (id === target) {
              app.mapbox.map.setPaintProperty(id, "line-opacity", 1);
            } else {
              app.mapbox.map.setPaintProperty(id, "line-opacity", 0.025);
            }
          }
        }
      },

      show: function () {
        for (let participant of participants) {
          const id = participant.data.properties.id;
          if (app.mapbox.map.getLayer(id)) {
            app.mapbox.map.setPaintProperty(id, "line-opacity", 0.2);
          }
        }
      },
      hide: function () {
        for (let participant of participants) {
          const id = participant.data.properties.id;
          if (app.mapbox.map.getLayer(id)) {
            app.mapbox.map.setPaintProperty(id, "line-opacity", 0);
          }
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
      initialize: function () {
        app.mapbox.participants.draw();

        const items = document.querySelectorAll("li[data-id]");

        for (let item of items) {
          item.addEventListener("mouseover", () => {
            const target = item.dataset.id;

            for (let other of items) {
              other.classList.add("dim");
            }

            item.classList.remove("dim");
            app.mapbox.participants.highlight(target);
          });

          item.addEventListener("mouseout", () => {
            for (let other of items) {
              other.classList.remove("dim");
            }

            app.mapbox.participants.show();
          });
        }
      },
    },
    adjustZoom: (idealZoom) => {
      if (idealZoom === 0) {
        return idealZoom;
      }

      if (app.isSmall()) {
        return idealZoom * 0.5;
      }

      return idealZoom;
    },

    initialize: function () {
      mapboxgl.accessToken = app.mapbox.token;

      app.mapbox.map = new mapboxgl.Map({
        container: app.mapbox.id,
        style: app.mapbox.style,
        center: [0, 0],
        zoom: app.mapbox.adjustZoom(0),
        interactive: false,
      });

      app.mapbox.map.on("load", () => {
        app.scrollama.handleStepEnter();
        app.mapbox.participants.initialize();
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
      const first = {
        element: app.scrollama.elements.steps[0],
        direction: "up",
        index: 0,
      };

      response = response || first;

      // Activate current step
      app.scrollama.elements.steps.forEach((step, index) => {
        if (index === response.index) {
          step.classList.add("is-active");
        } else {
          step.classList.remove("is-active");
        }
      });

      // If there is a coordinate defined
      if (response.element.dataset.lon && response.element.dataset.lat) {
        const lon = parseFloat(response.element.dataset.lon);
        const lat = parseFloat(response.element.dataset.lat);
        let zoom = parseInt(response.element.dataset.zoom) || 10;

        app.mapbox.map.flyTo({ center: [lon, lat], zoom: zoom });

        // Hide paths
        app.mapbox.participants.hide();
      }

      switch (response.element.dataset.step) {
        case "cover":
          // app.mapbox.map.flyTo({
          //   center: [-45, 30],
          //   zoom: app.mapbox.adjustZoom(2),
          // });
          // Fit around Florida
          app.mapbox.map.fitBounds([
            [-102.0, 5.7], // SW
            [-59.0, 43.2], // NE
          ]);

          // // Hide paths
          app.mapbox.participants.hide();
          break;

        case "stories":
          // Fly to Government Center
          app.mapbox.map.flyTo({
            center: [-80.1989621, 25.7755419],
            zoom: 10,
          });
          // Hide paths
          app.mapbox.participants.hide();
          break;

        case "about":
          app.mapbox.map.flyTo({
            center: [-45, 30],
            zoom: app.mapbox.adjustZoom(2),
          });
          // Show paths
          app.mapbox.participants.show();
          break;

        default:
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
      app.scrollama.handleResize();
      window.dispatchEvent(new Event("resize"));
    }, 500);
  },
};

app.initialize();
