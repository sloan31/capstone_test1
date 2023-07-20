

var map = L.map('map').setView([47.2679938, -122.474796], 17);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic2xvYW5tb29yZTMxIiwiYSI6ImNsYTM1anB5NzAxMmczb3BqcGlpMW9xeTYifQ.YwqRi3XLnVSFNFDmYvg9dw'
}).addTo(map);


// Global variable to hold the polyline
var userPath = L.polyline([], { color: 'blue' }).addTo(map);


if(!navigator.geolocation) {
    console.log("browser b bitchin")
} else {
    setInterval(() => {
    navigator.geolocation.getCurrentPosition(getPosition)
    }, 5000);
}

function getPosition(position){
    // console.log(position)
    var lat = position.coords.latitude
    var long = position.coords.longitude 
    var accuracy = position.coords.accuracy

    // Update the polyline with the user's latest coordinates
    userPath.addLatLng([lat, long]);

    var marker = L.marker([lat, long]).addTo(map)
    var circle = L.circle([lat, long], {radius: accuracy }).addTo(map)

    console.log(lat, long, accuracy)
}







// // Create a custom control that includes a button and a container for the text
// var myControl = L.Control.extend({
//     options: {
//       position: 'topleft'
//     },
  
//     onAdd: function(map) {
//       // Create a container for the control
//       var container = L.DomUtil.create('div', 'my-control');
  
//       // Create a button and add it to the container
//       var button = L.DomUtil.create('button', 'my-button', container);
//       button.innerHTML = 'Info';
      
  
//       // Create a container for the text and add it to the container
//       var textContainer = L.DomUtil.create('div', 'my-text', container);
//       textContainer.innerHTML = 'This interactive map allows climbers to create a map detailing the location, trail, and information for their area of interest. Use the toolbar on the left hand side to draw with a shape of your choice. After creating a shape or line try clicking it, this prompts a text box with questions about the boulder of interest. If you make a mistake, utilize the delete or edit option at the bottom of the tool bar. Have Fun!';
      
//       // Add a click event listener to the button to toggle the display of the text container
//       L.DomEvent.addListener(button, 'click', function() {
//         if (textContainer.style.display === 'none') {
//           textContainer.style.display = 'block';
          
//         } else {
//           textContainer.style.display = 'none';

//         }
//       });
  
//       return container;
//     }
//   });
  
//   // Add the custom control to the map
//   map.addControl(new myControl());
 
// //   toolbar with shape, edit etc.
// var drawnItems = L.featureGroup().addTo(map);

// var tableData = L.layerGroup().addTo(map);
// var url = "http://164.92.122.23:4000/sql?q=";
// // change the Query below by replacing lab_7_name with your table name
// var sqlQuery = "SELECT geom, description, name FROM map";
// function addPopup(feature, layer) {
//     layer.bindPopup(
//         "<b>" + feature.properties.name + "</b><br>" +
//         feature.properties.description
//     );
// }

// fetch(url + sqlQuery)
//     .then(function(response) {
//     return response.json();
//     })
//     .then(function(data) {
//         L.geoJSON(data, {onEachFeature: addPopup}).addTo(tableData);
//     });

// new L.Control.Draw({
//     draw : {
//         polygon : true,
//         polyline : true,
//         rectangle : true,     
//         circle : true,        
//         circlemarker : true,  
//         marker: true
//     },
//     edit : {
//         featureGroup: drawnItems
//     }
// }).addTo(map);

// //add this
// function createFormPopup() {
//     var popupContent = 
//     '<form>' + 
//     'Boulder Name:<br><input type="text" id="input_name"><br>' + 
//     'Description:<br><input type="text" id="input_desc"><br>' + 
//     '<input type="button" value="Submit" id="submit">' + 
//     '</form>' 
//     drawnItems.bindPopup(popupContent).openPopup();
// }

// //change the event listener code to this
// map.addEventListener("draw:created", function(e) {
//     e.layer.addTo(drawnItems);
//     createFormPopup();
// });

// function setData(e) {
//     if(e.target && e.target.id == "submit") {
//         // Get user name and description
//         var enteredUsername = document.getElementById("input_name").value;
//         var enteredDescription = document.getElementById("input_desc").value;
       
//          	// For each drawn layer
//     drawnItems.eachLayer(function(layer) {
           
//         // Create SQL expression to insert layer
//         var drawing = JSON.stringify(layer.toGeoJSON().geometry);
//         var sql =
//             "INSERT INTO map (geom, name, description) " +
//             "VALUES (ST_SetSRID(ST_GeomFromGeoJSON('" +
//             drawing + "'), 4326), '" +
//             enteredUsername + "', '" +
//             enteredDescription + "');";
//         console.log(sql);

//         // Send the data
//         fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded"
//             },
//             body: "q=" + encodeURI(sql)
//         })
//         .then(function(response) {
//             return response.json();
//         })
//         .then(function(data) {
//             console.log("Data saved:", data);
//         })
//         .catch(function(error) {
//             console.log("Problem saving the data:", error);
//         });

//     // Transfer submitted drawing to the tableData layer 
//     //so it persists on the map without you having to refresh the page
//     var newData = layer.toGeoJSON();
//     newData.properties.description = enteredDescription;
//     newData.properties.name = enteredUsername;
//     L.geoJSON(newData, {onEachFeature: addPopup}).addTo(tableData);

// });
//         // Clear drawn items layer
//         drawnItems.closePopup();
//         drawnItems.clearLayers();
//     }
// }

// document.addEventListener("click", setData);

// map.addEventListener("draw:editstart", function(e) {
//     drawnItems.closePopup();
// });
// map.addEventListener("draw:deletestart", function(e) {
//     drawnItems.closePopup();
// });
// map.addEventListener("draw:editstop", function(e) {
//     drawnItems.openPopup();
// });
// map.addEventListener("draw:deletestop", function(e) {
//     if(drawnItems.getLayers().length > 0) {
//         drawnItems.openPopup();
//     }
// });

