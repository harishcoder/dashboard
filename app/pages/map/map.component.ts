import { Component, OnInit } from "@angular/core";
import { slaUpTimeDownTimeData } from "../../models/slaUpTimeDownTimeData";

declare const google: any;


interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}

@Component({
  selector: "app-map",
  templateUrl: "map.component.html"
})
export class MapComponent implements OnInit {
  constructor() {}
    verticalData:Object;
  ngOnInit() {

  var markers = new Array();

  this.verticalData = new Object;
  this.verticalData["sla"] = new slaUpTimeDownTimeData("90%","90%","90%","90%","90%","90%","90%");
  this.verticalData["upTime"] = new slaUpTimeDownTimeData("90%","90%","90%","90%","90%","90%","90%");
  this.verticalData["downTime"] = new slaUpTimeDownTimeData("10%","10%","10%","10%","10%","10%","10%");

  var mapOptions = {
      zoom: 4.5,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true, // a way to quickly hide all controls
      
      center: new google.maps.LatLng(20.2568, 78.2566),
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8ec3b9"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1a3646"
            }
          ]
        },
        {
          "featureType": "administrative",
          "stylers": [
            {
              "weight": 2
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "saturation": 20
            },
            {
              "lightness": 30
            },
            {
              "visibility": "on"
            },
            {
              "weight": 2.5
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#4b6878"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#64779e"
            }
          ]
        },
        {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#4b6878"
            }
          ]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#334e87"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#283d6a"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#6f9ba5"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3C7680"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#304a7d"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#98a5be"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#2c6675"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#255763"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#b0d5ce"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#98a5be"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#283d6a"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#3a4762"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#0e1626"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#4e6d70"
            }
          ]
        }
      ]
  };

  var locations = [
      [new google.maps.LatLng(20.2568, 78.2566), 'Marker 1', 'Infowindow content for Marker 1'],
      [new google.maps.LatLng(25.2269, 85.2569), 'Marker 2', 'Infowindow content for Marker 2'],
      [new google.maps.LatLng(30.2569, 80.2569), 'Marker 3', 'Infowindow content for Marker 3'],
      [new google.maps.LatLng(35.2598, 90.3652), 'Marker 4', 'Infowindow content for Marker 4'],
      [new google.maps.LatLng(15.2569, 80.2569), 'Marker 5', 'Infowindow content for Marker 5'],
      [new google.maps.LatLng(20.2556, 80.2698), 'Marker 6', 'Infowindow content for Marker 6']
  ];

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var infowindow = new google.maps.InfoWindow();

  for (var i = 0; i < locations.length; i++) {

      // Append a link to the markers DIV for each marker
      $('#markers').append('<a class="marker-link" data-markerid="' + i + '" href="#">' + locations[i][1] + '</a> ');

      var marker = new google.maps.Marker({
          position: locations[i][0],
          map: map,
          title: locations[i][1],
      });

      // Register a click event listener on the marker to display the corresponding infowindow content
        google.maps.event.addListener(marker, 'hover', (function (marker, i) {
          console.log(map,marker);
          return function () {
              infowindow.setContent(locations[i][2]);
              infowindow.open(map, marker);
          }

      })(marker, i));

      google.maps.event.addListener(marker, 'click', (function (marker, i) {
        console.log(map,marker);
        return function () {
            infowindow.setContent(locations[i][2]);
            infowindow.open(map, marker);
        }

    })(marker, i));

      // Add marker to markers array
      markers.push(marker);
  }

  // Trigger a click event on each marker when the corresponding marker link is clicked
  $('.marker-link').on('hover', function () {
    google.maps.event.trigger(markers[$(this).data('markerid')], 'hover');
  });

    // Trigger a click event on each marker when the corresponding marker link is clicked
    $('.marker-link').on('click', function (e) {
      console.log(e);
      google.maps.event.trigger(markers[$(this).data('markerid')], 'click');
  });
}

   }

