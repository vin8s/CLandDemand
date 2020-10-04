var dataObj = JSON.parse(localStorage.getItem('dataObj'));

if (dataObj == null) {
  window.close();
}

var maleKey = dataObj["maleKey"];
var femaleKey = dataObj["femaleKey"];
var currentState = dataObj["currentState"];
var order = dataObj["order"];
var myOrder = dataObj["myOrder"];
var lkeys = [76, 108];
var akeys = [65, 97];
console.log("m: " + maleKey + " f: " + femaleKey);
if (currentState == 0 || currentState == 1) {
  document.getElementById("currLabel").innerHTML = "Task 1 Instructions:"
}
else if (currentState == 2 || currentState == 3) {
  document.getElementById("currLabel").innerHTML = "Task 2 Instructions:"
}
//setting current state if practice run multiple times.
// if (currentState == 1) {
//   currentState = 0;
// }
// else if (currentState == 3) {
//   currentState = 2;
// }

if (currentState == 0 || currentState == 2) {
  window.close();
}
else if (currentState == 1 && order[0] == "con") {
  window.close();
}
else if (currentState == 3 && order[1] == "con") {
  window.close();
}

//document.getElementById("maleKey").innerHTML = "\"" + maleKey + "\"";
//document.getElementById("femaleKey").innerHTML = "\"" + femaleKey + "\"";

var set1f = [];
var set1m = [];

var taskReady = false;
var halfway = false;
var returnReady = false;
var instructionReady = false;

loadImages();

function loadImages() {
  //document.getElementById("readyText").innerHTML = "Images are currently loading, please wait..."
  set1f[0] = "";
  set1m[0] = "";
  for (var i = 1; i < 54; i++){
    if (i != 53) {
      //only loads images 1 - 52
      set1f[i] = new Image();
      set1m[i] = new Image();

      set1f[i].src = "Set1/set1f_" + i + ".jpg";
      set1m[i].src = "Set1/set1m_" + i + ".jpg";
    }
    else if (i == 53) {
      setTimeout(continueLoad, 8000);
    }
  }
}

function continueLoad() {
  //document.getElementById("readyText").innerHTML = "Press spacebar to begin the task."
  taskReady = true;
  if (instructions === 7) {
    document.getElementById("currLabel").innerHTML = 'Memorize that task rule and press on the spacebar to start the task.';
    document.getElementById('spaceBar').style.display = "block";
  }
}

//initializing variables
var recordData = false;
var imgToDisplay = 0;
var instructions = 0;

spec_images = [];
for (var i = 0; i < myOrder.length; i++){
  spec_images[i] = "Set1/set1" + myOrder[i][0] + "_" + myOrder[i].substring(1) + ".jpg";
}

var tasksDone = 0;
var currIndex = 0;
var maxIndex = spec_images.length;
//var maxIndex = 10;

var duration = 1000;
var iti = 800;
var stimStart = 0;
var stimResp = 0;
var stimEnd = 0;

// var pracCL_rt = [];
// var pracCL_responses = [];
// var pracCL_correctResp = [];
var rt = [];
var responses = [];
var correctResp = [];
var clData = [];

for (var i = 0; i < maxIndex; i++) {
  rt[i] = '';
  responses[i] = '';
  if (myOrder[i][0] == 'f') {
    correctResp[i] = femaleKey;
  }
  else {
    correctResp[i] = maleKey;
  }
}



document.addEventListener('keypress', function(event){
  if (instructions < 8){
    if (event.keyCode == 32) {
      instructions++;
      displayNext(instructions);
      console.log(instructions);
    }
  }
  if (recordData) {
    if (event.keyCode == lkeys[0] || event.keyCode == lkeys[1]) {
      console.log('L pressed');
      responses[currIndex] = 'L';
      stimResp = new Date().getTime();
      rt[currIndex] = stimResp - stimStart;
      console.log(rt[currIndex]);
      recordData = false;
    }
    if (event.keyCode == akeys[0] || event.keyCode == akeys[1]) {
      console.log('A pressed');
      responses[currIndex] = 'A';
      stimResp = new Date().getTime();
      rt[currIndex] = stimResp - stimStart;
      console.log(rt[currIndex]);
      recordData = false;
    }
  }
  // if (taskReady) {
  //   if (event.keyCode == 32) {
  //     taskReady = false;
  //     console.log("beginning to run task");
  //
  //     //doneCon = false;
  //     displayPlus(spec_images);
  //   }
  // }
  if (halfway) {
    if (event.keyCode == 32) {
      halfway = false;
      document.getElementById("transitionText").style.display = "none";
      displayPlus(spec_images);
    }
  }
  if (returnReady) {
    if (event.keyCode == 32) {
      returnReady = false;
      window.location.href = "index.html";
    }
  }
} );


function displayNext(x){
  var label = document.getElementById("currLabel");
  label.style.fontWeight = "normal";
  console.log(label);
  if (x === 1) {
    label.innerHTML = "Please enlarge this window to encompass the entire computer screen and sit at a comfortable distance from the screen.";
  }
  else if (x === 2){
    label.innerHTML = "In this experiment you will see a series of face images.";
  }
  else if (x === 3) {
    label.innerHTML = "Your task is to to categorize the gender of the face images.";
  }
  else if (x===4) {
    label.innerHTML = 'Press <strong><span id = "maleKey" class = "key">\"' + maleKey + '\"</span></strong> if the image shows a male face and <strong><span id = "femaleKey" class = "key">\"' + femaleKey + '\"</span></strong> if the image shows a female face.';
  }
  else if (x===5) {
    label.innerHTML = 'Respond to each face image as quickly as possible while still being accurate. You will have until the image disappears to make your response. Always press the a/A key with your LEFT index finger and the l/L key with your RIGHT index finger.';
  }
  else if (x===6) {
    label.innerHTML = 'Please stay focused during the experiment and try to get an accuracy above 80%.';
  }
  else if (x===7) {
    label.innerHTML = 'Please wait for the images to load.';
    document.getElementById('spaceBar').style.display = "none";
    instructionReady = true;
    if (taskReady) {
      label.innerHTML = 'Press <strong><span id = "maleKey" class = "key">\"' + maleKey + '\"</span></strong> if the image shows a male face and <strong><span id = "femaleKey" class = "key">\"' + femaleKey + '\"</span></strong> if the image shows a female face.<br><br>Memorize the task rule and press on the spacebar to start the task.';
      document.getElementById('spaceBar').style.display = "block";
    }
  }
  else if (x===8) {
    if (taskReady && instructionReady) {
      label.style.display = "none";
      document.getElementById('spaceBar').style.display = "none";
      taskReady = false;
      instructionReady = false;
      console.log("beginning to run task");
      displayPlus(spec_images);
    }else {
      instructions = 7;
    }
  }

}


//task functions
function displayPlus(){
  document.getElementById("boxLeft").style.display = "none";
  recordData = false;
  iti = Math.floor(Math.random() * 1200) + 800;
  if (currIndex === 0){
    document.getElementById("plus").innerHTML = "+";
  }
  else if (responses[currIndex - 1] === ""){
    document.getElementById("plus").innerHTML = "RESPOND FASTER";
  }
  else {
    document.getElementById("plus").innerHTML = "+"
  }
  document.getElementById("plus").style.display = "block";
  imgToDisplay = spec_images[currIndex];
  //console.log(maxIndex);
  //console.log(imgToDisplay);
  setTimeout(displayStim, iti);
}

function displayStim(){
  stimStart = new Date().getTime();
  recordData = true;
  document.getElementById("plus").style.display = "none";
  //console.log(maxIndex);
  document.getElementById("stim").src = spec_images[currIndex];
  document.getElementById("stim").style.display = "block";
  setTimeout(clearStim, duration);
}

function clearStim(){
  recordData = false;
  document.getElementById("stim").style.display = "none";
  document.getElementById("conflictWord").style.display = "none";
  if (currIndex == (maxIndex/2)-1) {
    //halfway point
    halfway = true;
    currIndex += 1;
    document.getElementById("transitionText").innerHTML = "Your accuracy up to this point was " + (calculateAccuracy(halfway, responses, correctResp)).substring(0, 5) + "%. Press spacebar to continue the task."
    document.getElementById("transitionText").style.display = "block";
  }
  else if (currIndex < maxIndex - 1){
    currIndex += 1;
    console.log("curr Inndex: " + currIndex);
    displayPlus();
  }
  else {
    tasksDone +=1;
    // for (var i = 0; i < rt.length; i++){
    //   pracCL_rt[i] = rt[i];
    //   pracCL_responses[i] = responses[i];
    // }
    console.log(rt);
    console.log(responses);
    console.log(correctResp);
    taskDone();
  }
}

function taskDone() {
  currentState += 1;
  dataObj["currentState"] = currentState;
  clData = [myOrder, rt, responses, correctResp];
  dataObj["clData"] = clData;
  localStorage.setItem('dataObj', JSON.stringify(dataObj));

  document.getElementById("transitionText").innerHTML = "Your accuracy on the task to this point was " + (calculateAccuracy(false, responses, correctResp)).substring(0, 5) + "%. Please press spacebar to return to the home page."
  document.getElementById("transitionText").style.display = "block";
  returnReady = true;
}







//autoRefresh(5000);

function autoRefresh( t ) {
  setTimeout("location.reload(true);", t);
}

function calculateAccuracy(isHalf, responses, correctResp) {
  var correct = 0;
  var stopPoint = responses.length;
  if (isHalf) {
    stopPoint = stopPoint/2;
  }
  for (var i = 0; i < stopPoint; i++) {
    if (responses[i] == correctResp[i]) {
      correct += 1;
    }
  }
  var accuracy = correct / (stopPoint);
  return (accuracy * 100).toString();
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
