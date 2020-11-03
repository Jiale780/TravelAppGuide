let urlParams = new URLSearchParams(window.location.search);
//console.log(urlParams);
//console.log(urlParams.has("id")); 
//console.log(urlParams.get("id")); 

//console.log(urlParams.get("latitude")); 
//console.log(urlParams.get("longitude")); 

let key1 =
  "packagey-" +
  urlParams.get("id") +
  urlParams.get("latitude") +
  urlParams.get("longitude");
let package = localStorage.getItem(key1);
console.log(package);

let noteskey = "noteList" + urlParams.get("id");
let notespackage = localStorage.getItem(noteskey);
console.log(notespackage);

package_json = JSON.parse(package);
console.log(package_json);

notes_json = JSON.parse(notespackage);
console.log(notes_json);

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

// Create a new google map
function initMap() {
  let long2 = parseFloat(urlParams.get("longitude"));
  let lat2 = parseFloat(urlParams.get("latitude"));

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: lat2, lng: long2 },
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_CENTER
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    }
  });

  infoWindow = new google.maps.InfoWindow();

  if (urlParams.has("latitude") && urlParams.has("longitude")) {
    let pos = {
      lat: parseFloat(urlParams.get("latitude")),
      lng: parseFloat(urlParams.get("longitude"))
    };

    let marker1 = new google.maps.Marker({
      position: pos,
      map: map,
      title: "Hello World!"
    });

    var markers = [];
    markers.push(marker1);

    // code to expand the visibility of the map to see all
    // markers on this map
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }

    //center the map to the geometric center of all markers
    map.setCenter(bounds.getCenter());

    infoDetails.innerHTML +=
      "<b>Tour Name</b>: " +
      package_json.name +
      "<br><b>Description</b>: " +
      package_json.description +
      "<br><b>Promotion</b>: " +
      package_json.promotion +
      "<br><b>Price</b>: " +
      package_json.price;
  }
}

function pointingNotes() {
  window.location.replace(
    "ExtraNotes.html?id=" +
      package_json.id +
      "&latitude=" +
      package_json.latitude +
      "&longitude=" +
      package_json.longitude
  );
}

function generateNotes() {
  let tableData = document.getElementById("table_Data");
  console.log(tableData);
  console.log("NotesKey: " + noteskey);

  if (notes_json) {
    for (let j = notes_json.length - 1; j >= 0; j--) {
      tableData.innerHTML +=
        "<tr><td>" + "<b>Message:</b> " +
        notes_json[j].text +
        "</td></tr>";
    }
  }
}
