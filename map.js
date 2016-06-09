// Reference to the Firebase Realtime Database.
var firebase = new Firebase("https://project-6896618617155316776.firebaseio.com/");

  // Set the configuration for your app
  // TODO: Replace with your project's config object
 /* var config = {
            apiKey: "AIzaSyB7RJBuDs5KU-iK-wSssDLU0J36edRXHdQ",
            authDomain: "project-6896618617155316776.firebaseapp.com",
            databaseURL: "https://project-6896618617155316776.firebaseio.com",
            storageBucket: "project-6896618617155316776.appspot.com",
          };
          firebase.initializeApp(config);
*/
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.455, lng: -123.375},
    zoom: 12,
    styles: [{
      featureType: 'poi',
      stylers: [{ visibility: 'off' }]  // Turn off points of interest.
    }, {
      featureType: 'transit.station',
      stylers: [{ visibility: 'off' }]  // Turn off bus stations, train stations, etc.
    }],
    disableDoubleClickZoom: true
  });

// Add marker on user click
map.addListener('click', function(e) {
  firebase.push({lat: e.latLng.lat(), lng: e.latLng.lng()});
});

// Create a heatmap.
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: [],
    map: map,
    radius: 8
  });

  firebase.on("child_added", function(snapshot, prevChildKey) {
    // Get latitude and longitude from Firebase.
    var newPosition = snapshot.val();

    // Create a google.maps.LatLng object for the position of the marker.
    // A LatLng object literal (as above) could be used, but the heatmap
    // in the next step requires a google.maps.LatLng object.
    var latLng = new google.maps.LatLng(newPosition.lat, newPosition.lng);
 
     heatmap.getData().push(latLng);
  });
}