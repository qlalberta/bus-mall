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

var imageID =
[bag.imageID, banana.imageID, bathroom.imageID, boots.imageID, breakfast.imageID, bubblegum.imageID, chair.imageID, cthulhu.imageID, dogDuck.imageID, dragon.imageID, pen.imageID, petSweep.imageID, scissors.imageID, shark.imageID, sweep.imageID, tauntaun.imageID, unicorn.imageID, usb.imageID, waterCan.imageID, wineGlass.imageID];

//generate the three product names
//need to check duplicates
//need to run 25 times

var randomImagePathList = [];
var randomProductNameList = [];
var indexList = [];

//generate 3 random numbers (between 1 to 20) without duplicates for 25 times
//the original code is from the link below
https://stackoverflow.com/questions/3796786/random-number-generator-without-dupes-in-javascript
// var nums = imageID;
var gen_nums = [];
function in_array(array, el) {
  for (var k = 0 ; k < array.length; k++)
    if(array[k] == el) {
      return true;}
    else {
      return false;}
}

function generate_rand(array) {
  var rand = array[Math.floor(Math.random() * imageID.length)];
  if(!in_array(gen_nums, rand)) {
    gen_nums.push(rand);
    return rand;
  }
  return generate_rand(array);
}

for (var i = 0; i < 3; i++) {
  indexList.push(generate_rand(imageID));
}

console.log(indexList);

for (var j = 0; j < 3; j ++) {
  randomImagePathList[j] = imageName[indexList[j]];
  randomProductNameList[j] = imageName[indexList[j]].slice(0,imageName[indexList[j]].length - 4);
}

//get the node to attach the new display results
var productNameParent = document.getElementById('productName');
var productImagesParent = document.getElementById('productImages');
// var datasetParent = document.getElementById('dataset');

//render product names and images
function renderProduct () {
  for(var k = 0; k < 3; k ++) {
    var h3 = document.createElement('h3');
    h3.textContent = randomProductNameList[k];
    productNameParent.append(h3);
    var img = document.createElement('img');
    img.setAttribute('src', 'img/assets/' + randomImagePathList[k]);
    img.setAttribute('id', randomProductNameList[k]);
    productImagesParent.append(img);
  }
}
renderProduct();

// click
// productImagesParent.addEventListener('click', function (event) {
//   var answer = event.target.getAttribute('id');
//
// });

// dataset
