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

//create functions to get, update, store and clear attmepts
function getAttempts() {
  var attempts = localStorage.getItem('attempts');
  if(attempts == null) {
    return 0;
  } else {
    return parseInt(attempts);
  }
}

function createOrUpdateAttempts (value) {
  value = parseInt(value);
  localStorage.setItem('attempts', value);
  var attempts = localStorage.getItem('attempts');
  return attempts;
}

function incrementAttempts () {
  var attempts = getAttempts();
  attempts++;
  createOrUpdateAttempts(attempts);
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
    randomProductShownList.concat(randomProductNameList);
    var stringifiedRandomProductShownList = JSON.stringify(randomProductShownList);
  }
  localStorage.setItem('randomProductShownList',stringifiedRandomProductShownList );

  var parsedRandomProductShownList = JSON.parse(stringifiedRandomProductShownList);
  return parsedRandomProductShownList;
}

//create a function to render remaining attempts
function renderAttempts () {
  var attempts = getAttempts();
  if(attempts < maxAttempts){
    trialElement.textContent = maxAttempts - getAttempts();
  }
}

//create a function to render selection results after maximum attempts
function renderResponse () {
  var ul = document.createElement('ul');
  responseParent.appendChild(ul);
  var attempts = getAttempts();
  if (attempts == maxAttempts) {
    responseParent.appendChild(ul);
    for (var z = 0; z < 20 ; z++) {
      var li = document.createElement('li');
      ul.appendChild(li);
      li.textContent = productName[z] + ': shown ' + timesShown[z] + ' times; clicked ' + timesClicked[z] + ' times.';
    }
  }
}

// create function to display the result in the form of a barChart
function barChart () {
  var canvas = document.getElementById('barchart');
  var ctx = canvas.getContext('2d');
  // modeled after the Getting Started example in the chartJS docs
  barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productName,
      datasets: [{
        label: 'Times shown',
        backgroundColor: 'rgb(251, 159, 21)',
        borderColor: 'rgba(17, 18, 17, 0.93)',
        data: timesShown,
      },{
        label: 'Times clicked',
        backgroundColor: 'rgb(2, 10, 36)',
        borderColor: 'rgba(17, 18, 17, 0.93)',
        data: timesClicked,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

//display the result in line chart
function lineChart () {
  var canvas = document.getElementById('linechart');
  var ctx = canvas.getContext('2d');
  // modeled after the Getting Started example in the chartJS docs
  lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: productName,
      datasets: [{
        label: 'Times shown',
        backgroundColor: 'rgb(251, 159, 21)',
        borderColor: 'rgba(17, 18, 17, 0.93)',
        data: timesShown,
      },{
        label: 'Times clicked',
        backgroundColor: 'rgb(2, 10, 36)',
        borderColor: 'rgba(17, 18, 17, 0.93)',
        data: timesClicked,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          stacked: true
        }]
      }
    }
  });
}

//call functions to display the first group of products
generateRandomProductID();
generateRandomProduct();
timesImageShown();
renderProduct();
renderAttempts();

// initialze the eventListerner and call functions to display counts and the chart
productImagesParent.addEventListener('click', function (event) {
  var attempts = getAttempts();
  if (attempts == maxAttempts) {
    return;
  }
  var answer = event.target.getAttribute('id');
  incrementAttempts();
  getPickList (answer);
  getRandomProductShownList (randomProductNameList);
  generateRandomProductID();
  generateRandomProduct();
  renderProduct();
  renderAttempts();
  timesImageShown();
  timesImageClicked();
  renderResponse();
  if (getAttempts() === maxAttempts) {
    barChart();
    lineChart();
  }
  if (getAttempts() === maxAttempts) {
    renderAttempts();
  }
});
