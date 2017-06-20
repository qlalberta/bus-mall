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


//generate the three product names
//need to check duplicates
//need to run 25 times

var randomImagePathList = [];
var randomProductNameList = [];
var indexList = [];

function generateRandomNumber () {
  index = Math.floor(Math.random() * 20);
}

//generate indexList
function generateRandomIndexList () {
  for(var k = 0; k < 3; k++) {
    generateRandomNumber();
    indexList[k] = index;
  }
}
generateRandomIndexList ();
console.log(indexList);

// remove duplicates and sorted into an oreder list
// the original code is from stackoverflow
https://stackoverflow.com/questions/840781/easiest-way-to-find-duplicate-values-in-a-javascript-array

function removeDuplicates(array1) {
  var len1 = array1.length,
    out = [],
    obj = {};
  for (var n = 0; n < len1; n++) {
    obj[array1[n]] = 0;
  }
  for (n in obj) {
    out.push(n);
  }
  return out;
}

// indexList = removeDuplicates(indexList);
// console.log(indexList);

//shuffle the array
//the original code is from the link below.
http://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php

function shuffle(array2) {
  var len2 = array2.length, temp, index2;
  while (len2 > 0) {
    index2 = Math.floor(Math.random() * len2);
    len2--;
    temp = array2[len2];
    array2[len2] = array2[index2];
    array2[index2] = temp;
  }
  return array2;
}

for (var i = 0; i < 3; i ++) {
  generateRandomNumber();
  removeDuplicates(indexList);

  randomImagePathList[i] = imageName[indexList[i]];
  randomProductNameList[i] = imageName[index].slice(0,imageName[indexList[i]].length - 4);
}
//TODO: no duplicate numbers
  // if (randomProductNameList.indexOf(index) > 0)
  // { randomProductNameList[i+1]}

console.log(randomProductNameList);

//get the node to attach the new display results

var productNameParent = document.getElementById('productName');
var productImagesParent = document.getElementById('productImages');
// var datasetParent = document.getElementById('dataset');

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
