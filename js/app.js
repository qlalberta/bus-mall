'use strict';

//create variables
var imageName =
['bag.jpg', 'banana.jpg','bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg','cthulhu.jpg', 'dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg', 'sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
var productName = [];
var randomImagePathList = [];
var randomProductNameList = [];
var indexList = [];
var attempts = 0;
var maxAttempts = 24;
var pickList0 = [];
var randomProductShownList = [];
var count1 = new Array(20).fill(0);
var count2 = new Array(20).fill(0);

//generate proper productName
for(var b = 0; b < 20; b++) {
  productName[b] = imageName[b].slice(0,imageName[b].length - 4);
}

//generate random numbers without duplicates
function generateRandomProductID () {
  indexList = [];
  for (var i = 0; i < 3; i++) {
    do {
      var index = Math.floor(Math.random() * imageName.length);
    }
    while (indexList.includes(index));
    indexList.push(index);
  }
}

//creat function to generate random productNameList
function generateRandomProduct () {
  for (var j = 0; j < 3; j ++) {
    randomImagePathList[j] = imageName[indexList[j]];
    randomProductNameList[j] = productName[indexList[j]];
  }
}

//get the nodes to attach the selection results
var productNameParent = document.getElementById('productName');
var productImagesParent = document.getElementById('productImages');
var responseParent = document.getElementById('response');
var ul = document.createElement('ul');


//create function render product names and images
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

//create function to count the times of images shown
function timesShown () {
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

//create function to count times of clicks
function timesClicked () {
  if (randomProductShownList.length == 75) {
    for (var o = 0; o < pickList.length; o++) {
      for (var p = 0; p < imageName.length; p++) {
        if (imageName[p].slice(0,imageName[p].length - 4) == pickList[o]) {
          count2[p]++;
        }
      }
    }
    console.log('count2 ' + count2);
  }
}

//create function to render selection results after maximum attempts
function renderResponse () {
  if (attempts == maxAttempts) {
    responseParent.append(ul);
    for (var z = 0; z < 20 ; z++) {
      var li = document.createElement('li');
      ul.appendChild(li);
      li.textContent = productName[z] + ': shown ' + count1[z] + ' times; clicked ' + count2[z] + ' times.';
    }
  }
}

//create function to display the result in the form of a barChart
function barChart () {
  var canvas = document.getElementById('chart');
  var ctx = canvas.getContext('2d');
  // modeled after the Getting Started example in the chartJS docs
  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productName,
      datasets: [{
        label: 'Times shown',
        backgroundColor: 'rgb(251, 159, 21)',
        borderColor: 'rgba(17, 18, 17, 0.93)',
        data: count1,
      },{
        label: 'Number of votes',
        backgroundColor: 'rgb(2, 10, 36)',
        borderColor: 'rgba(17, 18, 17, 0.93)',
        data: count2,
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

//call functions to display the first group of products
generateRandomProductID();
generateRandomProduct();
timesShown();
renderProduct();

function getPickList () {
  var pickList = localStorage.getItem('pickList');
  return pickList;
}

function getTreeState () {
  var storageTreeState = localStorage.getItem('treeState');
  //unstringify it
  var parsedTreeState = JSON.parse(storageTreeState);
  return parsedTreeState;
}

function pushPickList() {
  var pickList = getPickList();
  pickList = pickList.push(pickList)
  createOrUpdatePickLsit(pickList);
}

function createOrUpdatePickList (value) {
  value = value.toString();
  localStorage.setItem('pickList', value);
  var pickList = localStorage.getItem('pickList');
  return pickList;
}

function deletePickList () {
  localStorage.removeItem('pickList');
  return null;
}

function clearAllData () {
  localStorage.clear();
  return null;
}
// initialze the eventListerner and call functions to display counts and the chart
productImagesParent.addEventListener('click', function (event) {
  if (attempts === maxAttempts) {
    return;
  }
  var answer = event.target.getAttribute('id');
  attempts++;
  pickList = pickList0.push(answer);
  getPickList();
  generateRandomProductID();
  generateRandomProduct();
  renderProduct();
  timesShown();
  timesClicked();
  renderResponse();
  if (attempts === maxAttempts) {
    barChart();
  }
});
