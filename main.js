// Main DOM objects
var obj = document.getElementById('gw');
var regenLink = document.querySelector('.regen');

// Set body part IDs
var gwAnimal = {
  bodies: ['gw-body'],
  feet: ['gw-flippers', 'gw-hooves', 'gw-dinofeet'],
  tails: ['gw-curlytail', 'gw-dinotail'],
  heads: ['gw-horsehead', 'gw-dinohead', 'gw-pighead', 'gw-penguinhead']
}

// Convert part IDs into objects
for (var part in gwAnimal) {
  if (gwAnimal.hasOwnProperty(part)) {
    var objArray = [];
    for (var i = 0; i < gwAnimal[part].length; i++) {
      var partID = gwAnimal[part][i];
      var partObj = document.getElementById(partID);
      objArray.push(partObj);
    }
    gwAnimal[part] = objArray;
  }
}

var shade = function(color, percent) {  
  var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
};

var regen = function() {
  // Remove class (for transition)
  obj.classList.remove('out');

  // Hide + colour all parts
  for (var part in gwAnimal) {
    for (var i = 0; i < gwAnimal[part].length; i++) {
      gwAnimal[part][i].style.display = "none";
    }
  }

  // Randomly show parts
  for (var part in gwAnimal) {
    var i = Math.floor(Math.random()*gwAnimal[part].length);
    gwAnimal[part][i].style.display = "block";
  }

  // Colour body parts
  var cBase = Math.random()*16777215;
  var colour = "#"+Math.floor(cBase).toString(16);
  var colourDark = shade(colour, -50);
  var bodyElements = document.querySelectorAll('.gw-bodycol');
  var darkElements = document.querySelectorAll('.gw-darkcol');

  for (var i = 0; i < bodyElements.length; i++) {
    bodyElements[i].style.fill = colour;
  }

  for (var i = 0; i < darkElements.length; i++) {
    darkElements[i].style.fill = colourDark;
  }
}

var start = function() {
  // Add class and wait (for transition)
  obj.classList.add('out');
  setTimeout(regen, 400);
}

regenLink.addEventListener("click", start);

regen();