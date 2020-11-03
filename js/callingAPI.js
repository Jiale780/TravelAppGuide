function updateTravelLists(data) {
  let travelListings = document.getElementById("listingSections");
  travelListings.append = "";

  for (var j = 0; j < data.packages.length; j++) {
    localStorage.setItem(
      "packagey-" +
        data.packages[j].id +
        data.packages[j].latitude +
        data.packages[j].longitude,
      JSON.stringify(data.packages[j])
    );

    travelListings.innerHTML +=
      '<a href = "InfoDetails.html?id=' +
      data.packages[j].id +
      "&latitude=" +
      data.packages[j].latitude +
      "&longitude=" +
      data.packages[j].longitude +
      '"><div class="mainSection" id="' +
      j +
      '"><div class="images"><img src=' +
      JSON.stringify(data.packages[j].image) +
      '></div><div class="text"><b>' +
      data.packages[j].name +
      "</b><br>" +
      data.packages[j].description +
      "</div></div></a>";
  }
}

function retrieveLocation() {
  let url = "https://createtheweb.biz/wmp/get_travel_package.php"; // Call the fetch function passing the url of the API as a parameter
  fetch(url)
    .then(resp => resp.json()) // Transform the data into json
    .then(function(data) {
      console.log(JSON.stringify(data));
      updateTravelLists(data);
    }) // code for handling the data you get from the API
    .catch(function(errors) {
      console.log(errors);
    }); // service the errors
}
retrieveLocation();