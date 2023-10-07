fetch("/pru/js/data.json")
    .then(response => response.json())
    .then(json => {
        locations = json["coordinates"];
        animateSatellite();
    });

var hasCompleted = false;
var cont = 0;

function animateSatellite() {
    if (cont == 617) {
        hasCompleted = true;
        cont = 0;
    }
    cont = (cont + 1) % 618;

    var sceneEl = document.querySelector('a-scene');
    var satelliteEl = sceneEl.querySelector('#satelite');
    var targetPosition = {
        x: locations[cont].X / 7000,
        y: locations[cont].Y / 7000,
        z: locations[cont].Z / 7000 - 5
    };

    var currentPosition = satelliteEl.getAttribute('position');

    // Calcula la nueva posición interpolando suavemente
    var newPosition = {
        x: currentPosition.x + (targetPosition.x - currentPosition.x) * 0.1,
        y: currentPosition.y + (targetPosition.y - currentPosition.y) * 0.1,
        z: currentPosition.z + (targetPosition.z - currentPosition.z) * 0.1
    };

    satelliteEl.setAttribute('position', newPosition);

    if (!hasCompleted) {
        requestAnimationFrame(animateSatellite);
    }
}
