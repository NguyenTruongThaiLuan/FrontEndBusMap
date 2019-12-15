var firebaseConfig = {
    apiKey: "AIzaSyBfDNn3qhkezSxVe6Ra2QeRv3CFafL1xJc",
    authDomain: "busmap-80d51.firebaseapp.com",
    databaseURL: "https://busmap-80d51.firebaseio.com",
    projectId: "busmap-80d51",
    storageBucket: "busmap-80d51.appspot.com",
    messagingSenderId: "262410323493",
    appId: "1:262410323493:web:df8a91ee7554e10e4b61cc",
    measurementId: "G-G1QC9ZZQG7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// counter for online bus...
var bus_count = 0;
// markers array to store all the markers, so that we could remove marker when any car goes offline and its data will be remove from realtime database...
var markers = [];
var map;
var myMap = new Map();
var directionsService;
var directionsRenderer;

function initMap(name, latitude, longitude) { // Google Map Initialization... 
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: new google.maps.LatLng(10.822290, 106.687497),
        mapTypeId: 'terrain'
    });
    directionsRenderer.setMap(map);
    //  calculateAndDisplayRoute(directionsService, directionsRenderer, name, latitude, longitude);
}
// This Function will create a car icon with angle and add/display that marker on the map
function AddBus(data) {
    var icon = { // car icon
        path: 'M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805',
        scale: 0.5,
        fillColor: "#427af4", //<-- Car Color, you can change it 
        fillOpacity: 1,
        strokeWeight: 1,
        anchor: new google.maps.Point(0, 5),
        rotation: data.val().angle //<-- Car angle
    };
    var uluru = {
        lat: data.val().Latitude,
        lng: data.val().Longitude
    };
    var marker = new google.maps.Marker({
        position: uluru,
        icon: icon,
        map: map
    });
    var infoWindow = new google.maps.InfoWindow;
    marker.addListener('click', function() {
        infoWindow.setContent("Xe số: " + data.val().idBusInfo);
        infoWindow.open(map, marker);
    });
    markers[data.key] = marker; // add marker in the markers array...
    document.getElementById("bus").innerHTML = bus_count;
}
// get firebase database reference...
var bus_Ref = firebase.database().ref('/');
// this event will be triggered when a new object will be added in the database...
bus_Ref.on('child_added', function(data) {
    bus_count++;
    AddBus(data);
});
// this event will be triggered on location change of any car...
bus_Ref.on('child_changed', function(data) {
    markers[data.key].setMap(null);
    AddBus(data);
});
// If any car goes offline then this event will get triggered and we'll remove the marker of that car...  
bus_Ref.on('child_removed', function(data) {
    markers[data.key].setMap(null);
    bus_count--;
    document.getElementById("bus").innerHTML = bus_count;
});

function calculateAndDisplayRoute(directionsService, directionsRenderer, name, latitude, longitude) {
    directionsService.route({
            origin: {
                query: "10.821332, 106.687107"
            },
            destination: {
                query: latitude + "," + longitude
            },
            travelMode: 'TRANSIT',
            transitOptions: {
                modes: ['BUS']
            },
        },
        function(response, status) {
            if (status === 'OK') {
                directionsRenderer.setDirections(response);
                computeTotalDistance(response, name)
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
}

function computeTotalDistance(result, name) {
    var total = 0;
    var myroute = result.routes[0].legs[0];
    myMap.set(name, myroute.duration.text);

    console.log(myroute.duration.text)
}


$(document).ready(function() {
    var data;
    $.ajax({
        dataType: "json",
        url: 'http://localhost:8899/busstation/getBusStationByIdBus/24',
        data: data,
        error: function() {
            $('#infoBusStation').html('<p>Lỗi Khi đọc dữ liệu</p>');
        },
        success: function(data) {
            var listBusStation = [];
            for (let index = 0; index < data.length; index++) {
                const name = data[index].name;
                calculateAndDisplayRoute(directionsService, directionsRenderer, data[index].name, data[index].latitude, data[index].longitude)

                var $busStationName = "<li class='stop-container' role='stopContainer' tabindex='-1'><div class='stop-wrapper '><h3>" + name + "</h3></div></li>";
                $('#infoBusStation').append($busStationName);

                listBusStation.push(name);

            }
            console.log(myMap)
            $('#listBusStation').text(listBusStation.join(' - '));

        }
    });
});