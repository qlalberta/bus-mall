'use strict';

// create function objects
function Product (name, imageID, imageFilePath) {
  this.name = name;
  this.imageID = imageID;
  this.imageFilePath = imageFilePath;
  this.timesShown = 0;
  this.timeclicked = 0;
}

//create prototype method
// Product.prototype.imageShown = function () {}
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

// var imageID =
// [bag.imageID, banana.imageID, bathroom.imageID, boots.imageID, breakfast.imageID, bubblegum.imageID, chair.imageID, cthulhu.imageID, dogDuck.imageID, dragon.imageID, pen.imageID, petSweep.imageID, scissors.imageID, shark.imageID, sweep.imageID, tauntaun.imageID, unicorn.imageID, usb.imageID, waterCan.imageID, wineGlass.imageID];

//generate the three product names
//need to check duplicates
//need to run 25 times

var randomImagePathList = [];
var randomProductNameList = [];
//var indexList = [];

// var clicks = 0;
var attempts = 0;
var maxAttempts = 25;
// var imageShown = 0;
var pickList = [];

// var indexList = [];
//
// function setup () {
//   generateRandomProductID();
//   generateRandomProduct();
//   renderProduct();
// }
//
// setup();
//generate 3 random numbers (between 1 to 20) without duplicates for 25 times
//the original code is from the link below
https://stackoverflow.com/questions/3796786/random-number-generator-without-dupes-in-javascript
// var nums = imageID;
//TODO: use do while to generate the code

var indexList = [];
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
// generateRandomProductID();

//TODO: Wrap it into a function

function generateRandomProduct () {
  for (var j = 0; j < 3; j ++) {
    randomImagePathList[j] = imageName[indexList[j]];
    randomProductNameList[j] = imageName[indexList[j]].slice(0,imageName[indexList[j]].length - 4);
  }
  // console.log('95rrandomProductNameList ' + randomProductNameList );
}
// generateRandomProduct();

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
// renderProduct();

// function updateProduct () {
//   for(var t = 0; t < 3; t ++) {
//    h3.textContent = randomProductNameList[t];
//    img.setAttribute('src', 'img/assets/' + randomImagePathList[T]);
//    img.setAttribute('id', randomProductNameList[T]);
// }
// generateRandomProductID();
// generateRandomProduct();

// renderProduct();
generateRandomProductID();
generateRandomProduct();


var randomProductShownList = [];

function shownTime () {
  randomProductShownList = randomProductShownList.concat(randomProductNameList);
  // console.log('145randomProductShownList ' + randomProductShownList);
};

shownTime();
renderProduct();

// updateProduct();
// click
productImagesParent.addEventListener('click', function (event) {
  if (attempts === maxAttempts) {
    return;
  }
  var answer = event.target.getAttribute('id');
  attempts++;

  // if(attempts) {
  //   for(var k = 0; k < 3; k ++) {
  //     productNameParent.removeChild(productNameParent.lastChild);
  //     productImagesParent.removeChild(productImagesParent.lastChild);
  //   }
  // }
  pickList.push(answer);
  console.log('pickList: ' + pickList);
  console.log('indexList: ' + indexList);
  console.log('attempts: ' + attempts);
  generateRandomProductID();
  generateRandomProduct();
  renderProduct();
  shownTime();
});

console.log('175randomProductNameList ' + randomProductNameList);
console.log('176randomProductShownList ' + randomProductShownList);


// count the click times
// var count = new Array(20).fill(0);
//  for (var o = 0; o < randomProductShownList.length; o++);
//   { if (imageName[0] == randomProductShownList[o])
//         count[0]++;
//      if (imageName[1] == randomProductShownList[o])
//       count[1]++;
//      if (imageName[2] == randomProductShownList[o])
//         count[2]++;
//      if (imageName[3] == randomProductShownList[o])
//         count[3]++;
//      if (imageName[4] == randomProductShownList[o])
//         count[4]++;
//      if (imageName[5] == randomProductShownList[o])
//         count[5]++;
//      if (imageName[6] == randomProductShownList[o])
//         count[6]++;
//      if (imageName[7] == randomProductShownList[o])
//         count[7]++;
//      if (imageName[8] == randomProductShownList[o])
//         count[8]++;
//      if (imageName[9] == randomProductShownList[o])
//         count[9]++;
//      if (imageName[10] == randomProductShownList[o])
//         count[10]++;
//      if (imageName[11] == randomProductShownList[o])
//         count[11]++;
//      if (imageName[12] == randomProductShownList[o])
//         count[12]++;
//      if (imageName[13] == randomProductShownList[o])
//         count[13]++;
//      if (imageName[14] == randomProductShownList[o])
//         count[14]++;
//      if (imageName[15] == randomProductShownList[o])
//         count[15]++;
//      if (imageName[16] == randomProductShownList[o])
//         count[16]++;
//      if (imageName[17] == randomProductShownList[o])
//         count[17]++;
//      if (imageName[18] == randomProductShownList[o])
//         count[18]++;
//      if (imageName[19] == randomProductShownList[o])
//         count[19]++;
//  }

// console.log('count: ' + count);
// randomProductShownList;

// for(var o= 0; o < pickList.length; o++){
//     if(pickList[o] == this.imageName)
//         count++;}



// function imageShown() {
//   for (var = 0; var < 3; var ++) {
//     if answer = randomProductNameList;
// }
// ]
// //render resonse
// function renderResponse (response) {
//   var p = document.createElement('p');
//   p.textContent = response;
//   responseParent.append(p);
// }
