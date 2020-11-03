var urlParams = new URLSearchParams(window.location.search);
var key1 = urlParams.get("id");
var key2 = urlParams.get("latitude");
var key3 = urlParams.get("longitude");
var listNotes; //declare the variable

//this whole block is to define what the browser does to the localStorage
if (localStorage["noteList" + key1]) {
  //if localstorage has the array caled textList
  listNotes = JSON.parse(localStorage["noteList" + key1]); //parse it back into a JSON object
} else {
  listNotes = []; //else declare it and assign an empty array to ilt.
}

var point = document.getElementById("ta_message");
var buttonAddData = document.getElementById("btnKeyIn");
buttonAddData.onclick = function() {
  addDataInTable(point.value);
  window.location.replace(
   "InfoDetails.html?id=" + key1 + "&latitude=" + key2 + "&longitude=" + key3
  );
};

// The add data table function will takes of 2 arguments
function addDataInTable(text) {
  // To put the new record
  var tableData = document.getElementById("table_Data");
  var dataNotes = new Object();
  dataNotes.text = document.getElementById("ta_message").value;
  
  listNotes.push(dataNotes);
  localStorage["noteList" + key1] = JSON.stringify(listNotes);
  
  console.log("New data added: " + "noteList" + key1);
  console.log(localStorage.getItem("noteList" + key1));
}
