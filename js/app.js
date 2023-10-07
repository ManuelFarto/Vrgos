fetch("/pru/js/data.json")
    .then(response => response.json())
    .then(json => {
        locations = json["coordinates"];
        animateSatellite();
    });

var hasCompleted = false;
var cont = 0;
var satelliteEl = document.querySelector('#satelite');
var currentPosition = new THREE.Vector3();
var targetPosition = new THREE.Vector3();

function animateSatellite() {
    if (cont == 617) {
        hasCompleted = true;
        cont = 0;
    }
    cont = (cont + 1) % 618;

    targetPosition.set(
        locations[cont].X / 7000,
        locations[cont].Y / 7000,
        locations[cont].Z / 7000 - 5
    );

    if (!currentPosition.equals(targetPosition)) {
        currentPosition.lerp(targetPosition, 0.1); // Ajusta el valor para la velocidad
        satelliteEl.setAttribute('position', currentPosition.toArray().join(' '));
        requestAnimationFrame(animateSatellite);
    } else if (!hasCompleted) {
        requestAnimationFrame(animateSatellite);
    }
}

// Inicializa la posición inicial
currentPosition.set(
    locations[0].X / 7000,
    locations[0].Y / 7000,
    locations[0].Z / 7000 - 5
);
satelliteEl.setAttribute('position', currentPosition.toArray().join(' '));
