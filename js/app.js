'use strict';

//create variables
var imageName =
['bag.jpg', 'banana.jpg','bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg','cthulhu.jpg', 'dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg', 'sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
var productName = ['Bag', 'Banana slicer','Bathroom table stand', 'Boots', 'Breakfast maker', 'Bubble gum', 'Chair','Cthulhu figure', 'Duck muzzle','Dragon meat','Pen','Pet sweeper','Pizza scissors','Shark sleeping bag', 'Baby sweeper','Tauntaun sleeping bag','Unicorn meat','Tenticle USB','Self watering can','Wine glass'];
var randomImagePathList = [];
var randomProductNameList = [];
var indexList = [];
var attempts = 0;
var maxAttempts = 24;
var pickList = [];
var randomProductShownList = [];
var timesShown = new Array(20).fill(0);
var timesClicked = new Array(20).fill(0);


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
  if (randomProductShownList.length == 75) {
    for (var n = 0; n < randomProductShownList.length; n++) {
      for (var p = 0; p < imageName.length; p++) {
        if (productName[p] == randomProductShownList[n]) {
          timesShown[p]++;
        }
      }
    }
  }
}

//create function to count times of clicks
function timesImageClicked () {
  if (randomProductShownList.length == 75) {
    for (var n = 0; n < pickList.length; n++) {
      for (var p = 0; p < productName.length; p++) {
        if (productName[p] == pickList[n]) {
          timesClicked[p]++;
        }
      }
    }
  }
}

//create function to render selection results after maximum attempts
function renderResponse () {
  if (attempts == maxAttempts) {
    responseParent.append(ul);
    for (var z = 0; z < 20 ; z++) {
      var li = document.createElement('li');
      ul.appendChild(li);
      li.textContent = productName[z] + ': shown ' + timesShown[z] + ' times; clicked ' + timesClicked[z] + ' times.';
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
        data: timesShown,
      },{
        label: 'Number of votes',
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

//call functions to display the first group of products
generateRandomProductID();
generateRandomProduct();
timesImageShown();
renderProduct();

//create function to store value of pickList in eventListerner
function storePickList (answer) {
  if (pickList !== null) {
    pickList.push(answer);
    var stringifiedPickList = JSON.stringify(pickList);
  }
  localStorage.setItem('pickList', stringifiedPickList);

  var parsedPickList = JSON.parse(stringifiedPickList);
  return parsedPickList;
}

//create function to store value of randomProductShownList
function storeRandomProductShownList (randomProductNameList) {
  if (randomProductShownList !== null) {
    randomProductShownList.push(randomProductNameList);
    var stringifiedRandomProductShownList = JSON.stringify(randomProductShownList);
  }
  localStorage.setItem('randomProductShownList',stringifiedRandomProductShownList );

  var parsedRandomProductShownList = JSON.parse(stringifiedRandomProductShownList);
  return parsedRandomProductShownList;
}

// initialze the eventListerner and call functions to display counts and the chart
productImagesParent.addEventListener('click', function (event) {
  if (attempts === maxAttempts) {
    return;
  }
  var answer = event.target.getAttribute('id');
  attempts++;
  storePickList(answer);
  storeRandomProductShownList (randomProductNameList);
  generateRandomProductID();
  generateRandomProduct();
  renderProduct();
  timesImageShown();
  timesImageClicked();
  renderResponse();
  if (attempts === maxAttempts) {
    barChart();
  }
});
