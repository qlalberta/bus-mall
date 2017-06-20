'use strict';


// create function objects
function Product (name, imageID, imageFilePath) {
  this.name = name;
  this.imageID = imageID;
  this.imageFilePath = imageFilePath;
}

//create prototype method
// Product.prototype.getShownTime = function () {}
// Product.prototype.clickTime = function ()
// {}

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
var petSweep = new Product('pet-sweep.jpg', 12, 'img/assets/bathroom.jpg');
var scissors = new Product('scissors.jpg', 13, 'img/assets/bathroom.jpg');
var shark = new Product('scissors.jpg', 14, 'img/assets/shark.jpg');
var sweep = new Product('sweep.png', 15, 'img/assets/sweep.jpg');
var tauntaun = new Product('tauntaun.jpg', 16, 'img/assets/bathroom.jpg');
var unicorn = new Product('unicorn.jpg', 17, 'img/assets/unicorn.jpg');
var usb = new Product('usb.gif', 18, 'img/asserts/usb.gif');
var waterCan = new Product('water-can.jpg', 19, 'img/assets/water-can.jpg');
var wineGlass = new Product('wine-glass.jpg', 20, 'img/assets/wine-glass.jpg');

var imageName =
[bag.name, banana.name, bathroom.name, boots.name, breakfast.name, bubblegum.name, chair.name, cthulhu.name, dogDuck.name, dragon.name, pen.name, petSweep.name, scissors.name, shark.name, sweep.name, tauntaun.name, unicorn.name, usb.name, waterCan.name, wineGlass.name];

// var imageFilePath =
// [bag.imageFilePath, banana.imageFilePath, bathroom.imageFilePath, boots.imageFilePath, breakfast.imageFilePath,bubblegum.imageFilePath, chair.name, cthulhu.name, dogDuck.name, dragon.imageFilePath, pen.imageFilePath, petSweep.imageFilePath, scissors.imageFilePath, shark.imageFilePath, sweep.imageFilePath, tauntaun.imageFilePath, unicorn.imageFilePath, usb.imageFilePath, waterCan.imageFilePath, wineGlass.imageFilePath];

//get the node to attach the new display results

var productNameParent = document.getElementById('productName');
var productImagesParent = document.getElementById('productImages');
// var datasetParent = document.getElementById('dataset');

//generate the three product names
var randomImagePathList = [];
var randomProductNameList = [];
var index;
var k = 0;
function generateRandomNumber () {
  index = Math.floor(Math.random() * 20);
}

for(var i = 0; i < 3; i ++) {
  generateRandomNumber();
  randomImagePathList[i] = imageName[index];
  randomProductNameList[i] = imageName[index].slice(0,imageName[index].length - 4);
}
//TODO: no duplicate numbers
  // if (randomProductNameList.indexOf(index) > 0)
  // { randomProductNameList[i+1]}

console.log(randomProductNameList);

//display
//render
function renderProduct () {
  for(var j = 0; j < 3; j ++) {
    var h3 = document.createElement('h3');
    h3.textContent = randomProductNameList[j];
    productNameParent.append(h3);
    var img = document.createElement('img');
    img.setAttribute('src', 'img/assets/' + randomImagePathList[j])
    img.setAttribute('id', randomProductNameList[j]);
    productImagesParent.append(img);
  }
}
renderProduct();

// click
productImagesParent.addEventListener('click', function (event) {
  var answer = event.target.getAttribute('id');
  return
});

// dataset
