'use strict';

//create variables
var imageName =
['bag.jpg', 'banana.jpg','bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg','cthulhu.jpg', 'dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg', 'sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
var productName = ['Bag', 'Banana slicer','Bathroom table stand', 'Boots', 'Breakfast maker', 'Bubble gum', 'Chair','Cthulhu figure', 'Duck muzzle','Dragon meat','Pen','Pet sweeper','Pizza scissors','Shark sleeping bag', 'Baby sweeper','Tauntaun sleeping bag','Unicorn meat','Tenticle USB','Self watering can','Wine glass'];
var currentRandomImagePathList = [];
var currentRandomProductNameList = [];
var indexList = [];
// var index = 0;
var attempts = 0;
var maxAttempts = 25;
var trial = 25;
var numberOfImage = 75;
var pickList = [];
var randomProductShownList = [];
var timesShown = new Array(20).fill(0);
var timesClicked = new Array(20).fill(0);

//generate random numbers without duplicates
function generateRandomProductID () {
  indexList = [];
  currentRandomImagePathList = [];
  currentRandomProductNameList = [];
  for (var i = 0; i < 3; i++) {
    do {
    var index = Math.floor(Math.random() * imageName.length);
    } while (indexList.includes(index));
    indexList.push(index);
  }
}

 function generateRandomProduct () {
   for (var j = 0; j < 3; j++) {
    currentRandomImagePathList[j] = imageName[indexList[j]];
    currentRandomProductNameList[j] = imageName[indexList[j]].slice(0,imageName[indexList[j]].length - 4);
  }
}
//create a function to check the replicates between the current and the next group
// function checkReplicates (replicate){
//   if (currentRandomImageList.includes(replicate)) {
//     return true;
//   } else if (previousRandomImageList.includes(replicate)) {
//     return true;
//   }
//   return false;
// }

//create a function to generate random productNameList
function removeReplicates () {
  var previousRandomImagePathList = currentRandomImagePathList;
  var previousRandomProductNameList = currentRandomProductNameList;
  // var currentRandomProductNameList = [];
  // var currentRandomImagePathList = [];
  for (var ii = 0; ii < 3; ii++) {
    while (previousRandomImagePathList.includes(currentRandomImagePathList(indexList[ii]))) {
        for (var jj = 0; jj < 3; jj++) {
           var index = Math.floor(Math.random() * imageName.length);
         currentRandomImagePathList[jj] = imageName[indexList[i]].slice(0,imageName[indexList[i]].length - 4);
       }
     }
}



// // function to generate a random product from the productArray
// function generateProduct(){
//   var repeat = doesRepeat(productArrayRef[index]);
//   while (repeat) {
//     index = Math.floor(Math.random() * productArrayRef.length);
//     repeat = doesRepeat(productArrayRef[index]);
//   }
//   return productArrayRef[index];
// }

//get the nodes to attach the selection results
var productNameParent = document.getElementById('productName');
var productImagesParent = document.getElementById('productImages');
var responseParent = document.getElementById('response');
var trialParent = document.getElementById('trial');

//create function render product names and images
function renderProduct () {

  if(attempts) {
    for(var k = 0; k < 3; k ++) {
      productNameParent.removeChild(productNameParent.lastChild);
      productImagesParent.removeChild(productImagesParent.lastChild);
    }
    trialParent.removeChild(trialParent.lastChild);
  }

  for (var m = 0; m < 3; m ++) {
    var h3 = document.createElement('h3');
    h3.textContent = currentRandomProductNameList[m];
    productNameParent.append(h3);
    var img = document.createElement('img');
    img.setAttribute('src', 'img/assets/' + currentRandomImagePathList[m]);
    img.setAttribute('id', currentRandomProductNameList[m]);
    productImagesParent.append(img);
  }
}
//TODO: store the imageState. I probably don't need to to store timesClicked and timesShown

//create function to count the times of images shown
function timesImageShown () {
  randomProductShownList = randomProductShownList.concat(currentRandomProductNameList);
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

//create function to render selection results after maximum attempts
function renderResponse () {
  var div = document.createElement('div');
  var ul = document.createElement('ul');
  trialParent.appendChild(div);
  responseParent.appendChild(ul);
  if(attempts < maxAttempts)
    div.textContent = 'You have ' + trial + ' attmepts left.';
  if (attempts == maxAttempts) {
    responseParent.appendChild(ul);
    for (var z = 0; z < 20 ; z++) {
      var li = document.createElement('li');
      ul.appendChild(li);
      li.textContent = productName[z] + ': shown ' + timesShown[z] + ' times; clicked ' + timesClicked[z] + ' times.';
    }
  }
}

//create function to display the result in the form of a barChart
function barChart () {
  var canvas = document.getElementById('barchart');
  var ctx = canvas.getContext('2d');
  // modeled after the Getting Started example in the chartJS docs
  var barChart = new Chart(ctx, {
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
  var lineChart = new Chart(ctx, {
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

//create function to store value of pickList to browser
// function storePickList (answer) {
//   if (pickList !== null) {
//     pickList.push(answer);
//     var stringifiedPickList = JSON.stringify(pickList);
//   }
//   localStorage.setItem('pickList', stringifiedPickList);
//
//   var parsedPickList = JSON.parse(stringifiedPickList);
//   return parsedPickList;
// }
//
// //create function to store value of randomProductShownList to browser
// function storeRandomProductShownList (randomProductNameList) {
//   if (randomProductShownList !== null) {
//     randomProductShownList.push(randomProductNameList);
//     var stringifiedRandomProductShownList = JSON.stringify(randomProductShownList);
//   }
//   localStorage.setItem('randomProductShownList',stringifiedRandomProductShownList );
//
//   var parsedRandomProductShownList = JSON.parse(stringifiedRandomProductShownList);
//   return parsedRandomProductShownList;
// }
// //create function to store and update trial
// function getUpdateTrials (trial ) {
//   if ( trial !== null) {
//     var stringifiedTrial = JSON.stringify(trial);
//   }
//   localStorage.setItem('trial', stringifiedTrial);
//   var parsedTrial = JSON.parse(stringifiedTrial);
//   return parsedTrial;
// }
// //create function to store timesClicked
// function getUpdateTimesClicked (timesClicked ) {
//   if ( timesClicked !== null) {
//     var stringifiedTimesClicked = JSON.stringify(timesClicked);
//   }
//   localStorage.setItem('timesClicked', stringifiedTimesClicked);
//   var parsedTimesClicked = JSON.parse(stringifiedTimesClicked);
//   return parsedTimesClicked;
// }
// //create function to store timesShown
// function getUpdateTimesShown (timesShown ) {
//   if ( timesShown !== null) {
//     var stringifiedTimesShown = JSON.stringify(timesShown);
//   }
//   localStorage.setItem('timesShown', stringifiedTimesShown);
//   var parsedTimesShown = JSON.parse(stringifiedTimesShown);
//   return parsedTimesShown;
// }

// initialze the eventListerner and call functions to display counts and the chart
productImagesParent.addEventListener('click', function (event) {
  if (attempts === maxAttempts) {
    return;
  }
  // if (attempts) {
  //   storePickList(answer);
  //   storeRandomProductShownList (randomProductNameList);
  //   getUpdateTrials (trial );
  // }
  var answer = event.target.getAttribute('id');
  attempts++;
  trial--;
  pickList.push(answer);
  generateRandomProductID();
  generateRandomProduct();
  renderProduct();
  timesImageShown();
  timesImageClicked();
  renderResponse();
  if (attempts === maxAttempts) {
    barChart();
    lineChart();
  }
});
