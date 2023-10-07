fetch("/pru/js/data.json")
    .then(response => response.json())
    .then(json => {
        locations = json["coordinates"];
        animateSatellite();
    });

var cont = 0;
var satelliteEl = document.querySelector('#satelite');
var currentPosition = new THREE.Vector3();

function animateSatellite() {
    if (cont >= 617) {
        cont = 0;
    }

    var targetPosition = new THREE.Vector3(
        locations[cont].X / 7000,
        locations[cont].Y / 7000,
        locations[cont].Z / 7000 - 5
    );

    // Interpola suavemente la posición actual hacia la posición de destino
    currentPosition.lerp(targetPosition, 0.05); // Ajusta el valor para la velocidad

    satelliteEl.setAttribute('position', currentPosition.toArray().join(' '));

    cont++;

    requestAnimationFrame(animateSatellite);
}

// Inicializa la posición inicial
currentPosition.set(
    locations[0].X / 7000,
    locations[0].Y / 7000,
    locations[0].Z / 7000 - 5
);
satelliteEl.setAttribute('position', currentPosition.toArray().join(' '));
