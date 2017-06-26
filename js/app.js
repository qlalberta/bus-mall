'use strict';

//create variables
var imageName =
['bag.jpg', 'banana.jpg','bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg','cthulhu.jpg', 'dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg', 'sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
var productName = ['Bag', 'Banana slicer','Bathroom table stand', 'Boots', 'Breakfast maker', 'Bubble gum', 'Chair','Cthulhu figure', 'Duck muzzle','Dragon meat','Pen','Pet sweeper','Pizza scissors','Shark sleeping bag', 'Baby sweeper','Tauntaun sleeping bag','Unicorn meat','Tenticle USB','Self watering can','Wine glass'];
var randomImagePathList = [];
var randomProductNameList = [];
var previousIndexList = [];
var indexList = [];
var maxAttempts = 25;
var numberOfImage = 78;
var pickList = [];
var randomProductShownList = [];
var timesShown = new Array(20).fill(0);
var timesClicked = new Array(20).fill(0);
var isInit = 0;

//generate random numbers without duplicates
function generateRandomProductID () {
  previousIndexList = indexList;
  indexList = [];
  for (var i = 0; i < 3; i++) {
    do {
      var index = Math.floor(Math.random() * imageName.length);
    } while (indexList.includes(index) || previousIndexList.includes(index));
    indexList.push(index);
  }
}

//generate random products
function generateRandomProduct () {
  for (var j = 0; j < 3; j++) {
    randomImagePathList[j] = imageName[indexList[j]];
    randomProductNameList[j] = productName[indexList[j]];
  }
}

//get the nodes to attach the selection results
var productNameParent = document.getElementById('productName');
var productImagesParent = document.getElementById('productImages');
var responseParent = document.getElementById('response');
var trialElement = document.getElementById('trial');

//create function render product names and images
function renderProduct () {
  if(isInit != 0) {
    for(var k = 0; k < 3; k ++) {
      productNameParent.removeChild(productNameParent.lastChild);
      productImagesParent.removeChild(productImagesParent.lastChild);
    }
  }
  isInit = 1;
  for (var m = 0; m < 3; m ++) {
    var h3 = document.createElement('h3');
    h3.textContent = randomProductNameList[m];
    productNameParent.append(h3);
    var img = document.createElement('img');
    img.setAttribute('src', 'img/assets/' + randomImagePathList[m]);
    img.setAttribute('id', randomProductNameList[m]);
    productImagesParent.append(img);
  }
}
//TODO: store the imageState. I probably don't need to to store timesClicked and timesShown

//create function to count the times of images shown
function timesImageShown () {
  randomProductShownList = randomProductShownList.concat(randomProductNameList);
  if (randomProductShownList.length == numberOfImage) {
    for (var n = 0; n < randomProductShownList.length; n++) {
      for (var p = 0; p < productName.length; p++) {
        if (productName[p] == randomProductShownList[n]) {
          timesShown[p]++;
        }
      }
    }
  }
}

//create function to count times of clicks
function timesImageClicked () {
  if (randomProductShownList.length == numberOfImage) {
    for (var n = 0; n < pickList.length; n++) {
      for (var p = 0; p < productName.length; p++) {
        if (productName[p] == pickList[n]) {
          timesClicked[p]++;
        }
      }
    }
  }
}

//create a function to get trial number
function getTrial() {
  var trial = localStorage.getItem('trial');
  if(trial == null) {
    return 0;
  } else {
    return parseInt(trial);
  }
}

function createOrUpdateTrial (value) {
  value = parseInt(value);
  localStorage.setItem('trial', value);
  var trial = localStorage.getItem('trial');
  return trial;
}

function incrementTrial () {
  var trial = getTrial();
  trial++;
  createOrUpdateTrial(trial);
}

function deleteTrial() {
  localStorage.removeItem('trial');
  return null;
}

//create a function to store value of pickList in eventListerner
function getPickList (answer) {
  if (pickList !== null) {
    pickList.push(answer);
    var stringifiedPickList = JSON.stringify(pickList);
  }
  localStorage.setItem('pickList', stringifiedPickList);

  var parsedPickList = JSON.parse(stringifiedPickList);
  return parsedPickList;
}

//create function to store value of randomProductShownList
function getRandomProductShownList (randomProductNameList) {
  if (randomProductShownList !== null) {
    randomProductShownList.push(randomProductNameList);
    var stringifiedRandomProductShownList = JSON.stringify(randomProductShownList);
  }
  localStorage.setItem('randomProductShownList',stringifiedRandomProductShownList );

  var parsedRandomProductShownList = JSON.parse(stringifiedRandomProductShownList);
  return parsedRandomProductShownList;
}


//create a function to render remaining attempts
function renderTrial () {
  // var trialElement = document.getElementById('trialTime');
  var attempts = getTrial();
  if(attempts < maxAttempts)
    trialElement.textContent = getTrial();
}

//create a function to render selection results after maximum attempts
function renderResponse () {
  var ul = document.createElement('ul');
  responseParent.appendChild(ul);
  var attempts = getTrial();
  if (attempts == maxAttempts) {
    responseParent.appendChild(ul);
    for (var z = 0; z < 20 ; z++) {
      var li = document.createElement('li');
      ul.appendChild(li);
      li.textContent = productName[z] + ': shown ' + timesShown[z] + ' times; clicked ' + timesClicked[z] + ' times.';
    }
  }
}

//call functions to display the first group of products
generateRandomProductID();
generateRandomProduct();
timesImageShown();
renderProduct();
renderTrial();

// initialze the eventListerner and call functions to display counts and the chart
productImagesParent.addEventListener('click', function (event) {
  var attempts = getTrial();
  console.log('attempts '  + attempts);
  console.log('attemptsType' + typeof(attempts));
  if (attempts === maxAttempts) {
    console.log('end of the road');
    return;
  }
  var answer = event.target.getAttribute('id');
  incrementTrial();
  pickList.push(answer);
  generateRandomProductID();
  generateRandomProduct();
  renderProduct();
  renderTrial();
  timesImageShown();
  timesImageClicked();
  renderResponse();
  // if (attempts === maxAttempts) {
  //   barChart();
  //   lineChart();
  // }
  if (attempts === maxAttempts) {
    renderTrial();
    deleteTrial();
  }
});
