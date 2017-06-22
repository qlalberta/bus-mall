'use strict';

// create function objects
function Product (name, imageID, imageFilePath) {
  this.name = name;
  this.imageID = imageID;
  this.imageFilePath = imageFilePath;
  // this.timesShown = 0;
  // this.timeclicked = 0;
}

// create new objects
var bag = new Product('bag.jpg', 1, 'img/assets/bag.jpg');
var banana = new Product('banana.jpg', 2, 'img/assets/banana.jpg');
var bathroom = new Product('bathroom.jpg', 3, 'img/assets/bathroom.jpg');
var boots = new Product('boots.jpg', 4, 'img/assets/boots.jpg');
var breakfast = new Product('breakfast.jpg', 5, 'img/assets/breakfast.jpg');
var bubblegum = new Product('bubblegum.jpg', 6, 'img/assets/bublegum.jpg');
var chair = new Product('chair.jpg', 7, 'img/assets/chair.jpg');
var cthulhu = new Product('cthulhu.jpg', 8, 'img/assets/cthulhu.jpg');
var dogDuck = new Product('dog-duck.jpg', 9, 'img/assets/dog-duck.jpg');
var dragon = new Product('dragon.jpg', 10, 'img/assets/dragon.jpg');
var pen = new Product('pen.jpg', 11, 'img/assets/pen.jpg');
var petSweep = new Product('pet-sweep.jpg', 12, 'img/assets/pet-sweep.jpg');
var scissors = new Product('scissors.jpg', 13, 'img/assets/scissors.jpg');
var shark = new Product('shark.jpg', 14, 'img/assets/shark.jpg');
var sweep = new Product('sweep.png', 15, 'img/assets/sweep.png');
var tauntaun = new Product('tauntaun.jpg', 16, 'img/assets/tauntaun.jpg');
var unicorn = new Product('unicorn.jpg', 17, 'img/assets/unicorn.jpg');
var usb = new Product('usb.gif', 18, 'img/asserts/usb.gif');
var waterCan = new Product('water-can.jpg', 19, 'img/assets/water-can.jpg');
var wineGlass = new Product('wine-glass.jpg', 20, 'img/assets/wine-glass.jpg');
var imageName =
[bag.name, banana.name, bathroom.name, boots.name, breakfast.name, bubblegum.name, chair.name, cthulhu.name, dogDuck.name, dragon.name, pen.name, petSweep.name, scissors.name, shark.name, sweep.name, tauntaun.name, unicorn.name, usb.name, waterCan.name, wineGlass.name];


var randomImagePathList = [];
var randomProductNameList = [];
var indexList = [];
var attempts = 0;
var maxAttempts = 24;
var pickList = [];
var randomProductShownList = [];

// function setup () {
//   generateRandomProductID();
//   generateRandomProduct();
//   renderProduct();
// }
//
// setup();

function generateRandomProductID () {
  indexList = [];
  for (var i = 0; i < 3; i++) {
    do {
      var index = Math.floor(Math.random() * imageName.length);
    }
    while (indexList.includes(index));
    indexList.push(index);
  }
  // randomImagePathList[i] = imageName[indexList[i]];
  // randomProductNameList[i] = imageName[indexList[i]].slice(0,imageName[indexList[i]].length - 4);
}

function generateRandomProduct () {
  for (var j = 0; j < 3; j ++) {
    randomImagePathList[j] = imageName[indexList[j]];
    randomProductNameList[j] = imageName[indexList[j]].slice(0,imageName[indexList[j]].length - 4);
  }
}

//get the node to attach the new display results
var productNameParent = document.getElementById('productName');
var productImagesParent = document.getElementById('productImages');
// var responseParent = document.getElementById('response');
// var timeClickedParent = document.getElementById('timeClicked');
// var timeShownParent = document.getElementById('timeShown');

//render product names and images
function renderProduct () {

  if(attempts) {
    for(var k = 0; k < 3; k ++) {
      productNameParent.removeChild(productNameParent.lastChild);
      productImagesParent.removeChild(productImagesParent.lastChild);
    }
  }
  for (var n = 0; n < 3; n ++) {
    var h3 = document.createElement('h3');
    h3.textContent = randomProductNameList[n];
    productNameParent.append(h3);
    var img = document.createElement('img');
    img.setAttribute('src', 'img/assets/' + randomImagePathList[n]);
    img.setAttribute('id', randomProductNameList[n]);
    productImagesParent.append(img);
  }
}

generateRandomProductID();
generateRandomProduct();
console.log(imageName[0].slice(0,imageName[0].length - 4));


function timesShown () {
  var count1 = new Array(20).fill(0);
  randomProductShownList = randomProductShownList.concat(randomProductNameList);
  if (randomProductShownList.length == 75) {
    for (var o = 0; o < randomProductShownList.length; o++) {
      for (var p = 0; p < imageName.length; p++) {
        if (imageName[p].slice(0,imageName[p].length - 4) == randomProductShownList[o]) {
          count1[p]++;
        }
      }
    }
  }
  console.log('count1: ' + count1);
}

timesShown();
renderProduct();

function timesClicked () {
  var count2 = new Array(20).fill(0);
  if (randomProductShownList.length == 75) {
    for (var o = 0; o < pickList.length; o++) {
      for (var p = 0; p < imageName.length; p++) {
        if (imageName[p].slice(0,imageName[p].length - 4) == pickList[o]) {
          count2[p]++;
        }
      }
    }
    console.log('timeclicked: ' + count2);
  }
}
// timesClicked();

// click
productImagesParent.addEventListener('click', function (event) {
  if (attempts === maxAttempts) {
    return;
  }
  var answer = event.target.getAttribute('id');
  attempts++;
  pickList.push(answer);
  console.log('pickList: ' + pickList);
  console.log('indexList: ' + indexList);
  console.log('attempts: ' + attempts);
  generateRandomProductID();
  generateRandomProduct();
  renderProduct();
  timesShown();
  timesClicked();
});
console.log('randomProductShownList ' + randomProductShownList);
console.log('pickList ' + pickList);
