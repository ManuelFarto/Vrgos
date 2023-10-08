
//fetch("/js/data.json").then(response => response.json()).then(json => {
  //  locations = json["coordinates"];
//})

//actviar para githb page oo no funciona
fetch("js/data.json").then(response => response.json()).then(json => {
    locations = json["coordinates"];
})

var hasCompleted = false;
var cont = 0;
var num = 7000;
const INTERVAL_INTERPOLATION = 5;
var interpolation_count = 1;
setInterval(function () {
    if (cont == 617) {
        hasCompleted = true;
        cont = 0;
    }
    if (interpolation_count < INTERVAL_INTERPOLATION) {
        interpolation_count++;
        interpolate(cont, interpolation_count);
        return;
    }
    else {
        interpolation_count = 1;
    }
    cont = (cont + 1)%618;
    var sceneEl = document.querySelector('a-scene');
	var sceneDa = document.querySelector('a-scene');
	var sceneTi = document.querySelector('a-scene');

	sceneDa.querySelector('#time').setAttribute('value', (locations[cont].Time.substr(0,11)));
	sceneDa.querySelector('#datos').setAttribute('value', (locations[cont].Date));
    sceneEl.querySelector('#satelite').setAttribute('position', (locations[cont].X / num) + " " + (locations[cont].Y / num) + " " + (locations[cont].Z / num -5));
}, 80/INTERVAL_INTERPOLATION);

function interpolate(cont, interpolation_cont) {
    var sceneEl = document.querySelector('a-scene');


    sceneEl.querySelector('#satelite').setAttribute('position', (locations[cont].X / num) + " " + (locations[cont].Y / num) + " " + (locations[cont].Z / num -5));
    var deltaX =( (locations[cont + 1].X - locations[cont].X) / INTERVAL_INTERPOLATION) / num;
    var deltaY =( (locations[cont + 1].Y - locations[cont].Y) / INTERVAL_INTERPOLATION) / num;
    var deltaZ =( (locations[cont + 1].Z - locations[cont].Z) / INTERVAL_INTERPOLATION) / num;

    sceneEl.querySelector('#satelite').setAttribute('position', (locations[cont].X / num + deltaX * interpolation_cont) + " " + (locations[cont].Y / num + deltaY * interpolation_cont) + " " + (locations[cont].Z / num + deltaZ * interpolation_cont -5));
}

  AFRAME.registerComponent('grab-earth', {
    init: function () {
      const el = this.el; // The element with this component

      // Check if the entity has a laser-controls component
      if (el.components['laser-controls']) {
        const laserControls = el.components['laser-controls'];

        // Listen for the trigger button click event
        el.addEventListener('triggerdown', () => {
          // Get the Earth model
          const earth = document.getElementById('tierra'); // Adjust this ID as per your HTML structure

          // Attach the Earth model to the controller
          laserControls.intersectedEl.appendChild(earth);

          // Set a flag to indicate that the Earth is attached
          this.isAttached = true;
        });

        // Listen for the trigger button release event
        el.addEventListener('triggerup', () => {
          // Check if the Earth model is attached, then remove it
          if (this.isAttached) {
            const earth = document.getElementById('tierra');
            earth.parentNode.removeChild(earth);

            // Reset the flag
            this.isAttached = false;
          }
        });
      }
    },
  });
