

//fetch("/js/data.json").then(response => response.json()).then(json => {
  //  locations = json["coordinates"];
//})

//actviar para githb page oo no funciona
fetch("/pru/js/data.json").then(response => response.json()).then(json => {
    locations = json["coordinates"];
})

var hasCompleted = false;
var cont = 0;
var num = 7000;
setInterval(function () {
    if (cont == 617) {
        hasCompleted = true;
        cont = 0;
    }
    cont = (cont + 1)%618;
    var sceneEl = document.querySelector('a-scene');

    sceneEl.querySelector('#satelite').setAttribute('position', (locations[cont].X / num) + " " + (locations[cont].Y / num) + " " + (locations[cont].Z / num -2));
}, 1);
