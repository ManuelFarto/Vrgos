fetch("/pru/js/data.json").then(response => response.json()).then(json => {
    locations = json["coordinates"];
})

var hasCompleted = false;
var cont = 0;
setInterval(function () {
    if (cont == 617) {
        hasCompleted = true;
        cont = 0;
    }
    cont = (cont + 1)%618;
    var sceneEl = document.querySelector('a-scene');
    
    sceneEl.querySelector('#satelite')
        .setAttribute('position', (locations[cont].X / 7000) + " " + (locations[cont].Y / 7000) + " " + (locations[cont].Z / 7000 - 5));
}, 50);
