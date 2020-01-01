import { Component, OnInit } from "@angular/core";
import { slaUpTimeDownTimeData } from "../../models/slaUpTimeDownTimeData";
import Chart from 'chart.js';

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
    constructor() { }
    verticalData: Object;
    isHideHome: Boolean = false;
    isHideState:Boolean = true;
    isHideBack:Boolean= true;
    public canvas : any;
    public ctx;
    public datasets: any;
    public data: any;
    public myChartData;
    map:any;
    markers:any;
    ngOnInit() {

        var markers = new Array();
        var self = this;
        this.verticalData = new Object;
        this.verticalData["sla"] = new slaUpTimeDownTimeData("100%", "100%", "100%", "100%", "100%", "100%", "100%");
        this.verticalData["upTime"] = new slaUpTimeDownTimeData("90%", "90%", "90%", "90%", "90%", "90%", "90%");
        this.verticalData["downTime"] = new slaUpTimeDownTimeData("10%", "10%", "10%", "10%", "10%", "10%", "10%");

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
            [new google.maps.LatLng(20.2568, 78.2566), 'Delhi', 'Infowindow content for Marker 1'],
            [new google.maps.LatLng(25.2269, 85.2569), 'Mumbai', 'Infowindow content for Marker 2'],
            [new google.maps.LatLng(30.2569, 80.2569), 'Kolkata', 'Infowindow content for Marker 3'],
            [new google.maps.LatLng(35.2598, 90.3652), 'Bangalore', 'Infowindow content for Marker 4'],
            [new google.maps.LatLng(15.2569, 80.2569), 'UP', 'Infowindow content for Marker 5'],
            [new google.maps.LatLng(20.2556, 80.2698), 'Punjab', 'Infowindow content for Marker 6']
        ];

        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var infowindow = new google.maps.InfoWindow();

        for (var i = 0; i < locations.length; i++) {

            // Append a link to the markers DIV for each marker
            $('#markers').append(
                `<ul class="nav nav-pills">
        <li class="nav-item"><button class="marker-link nav-link btn btn-success btn-sm" data-markerid=${i} href="#"> ${locations[i][1]}</button></li>
        </ul>`);
            //'<a class="marker-link" data-markerid="' + i + '" href="#">' + locations[i][1] + '</a> ');

            this.markers = new google.maps.Marker({
                position: locations[i][0],
                map: this.map,
                title: locations[i][1],
            });

            // Register a click event listener on the marker to display the corresponding infowindow content
            google.maps.event.addListener(this.markers, 'hover', (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][2]);
                    infowindow.open(this.map, marker);
                }

            })(this.markers, i));

            google.maps.event.addListener(this.markers, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][2]);
                    infowindow.open(this.map, marker);
                }

            })(this.markers, i));
            // Add marker to markers array
            markers.push(this.markers);
        }

        // Trigger a click event on each marker when the corresponding marker link is clicked
        $('.marker-link').on('hover', function () {
            google.maps.event.trigger(markers[$(this).data('markerid')], 'hover');
        });

        // Trigger a click event on each marker when the corresponding marker link is clicked
        $('.marker-link').on('click', function () {
            self.isHideHome = true;
            self.isHideState = false;
            self.isHideBack = false;
            self.map.setZoom(8);
            self.map.setCenter(self.markers.getPosition());
            google.maps.event.trigger(markers[$(this).data('markerid')], 'click');
        });

            var gradientChartOptionsConfigurationWithTooltipBlue: any = {
              maintainAspectRatio: false,
              legend: {
                display: false
              },
        
              tooltips: {
                backgroundColor: '#f5f5f5',
                titleFontColor: '#333',
                bodyFontColor: '#666',
                bodySpacing: 4,
                xPadding: 12,
                mode: "nearest",
                intersect: 0,
                position: "nearest"
              },
              responsive: true,
              scales: {
                yAxes: [{
                  barPercentage: 1.6,
                  gridLines: {
                    drawBorder: false,
                    color: 'rgba(29,140,248,0.0)',
                    zeroLineColor: "transparent",
                  },
                  ticks: {
                    suggestedMin: 60,
                    suggestedMax: 125,
                    padding: 20,
                    fontColor: "#2380f7"
                  }
                }],
        
                xAxes: [{
                  barPercentage: 1.6,
                  gridLines: {
                    drawBorder: false,
                    color: 'rgba(29,140,248,0.1)',
                    zeroLineColor: "transparent",
                  },
                  ticks: {
                    padding: 20,
                    fontColor: "#2380f7"
                  }
                }]
              }
            };
        
            var gradientChartOptionsConfigurationWithTooltipPurple: any = {
              maintainAspectRatio: false,
              legend: {
                display: false
              },
        
              tooltips: {
                backgroundColor: '#f5f5f5',
                titleFontColor: '#333',
                bodyFontColor: '#666',
                bodySpacing: 4,
                xPadding: 12,
                mode: "nearest",
                intersect: 0,
                position: "nearest"
              },
              responsive: true,
              scales: {
                yAxes: [{
                  barPercentage: 1.6,
                  gridLines: {
                    drawBorder: false,
                    color: 'rgba(29,140,248,0.0)',
                    zeroLineColor: "transparent",
                  },
                  ticks: {
                    suggestedMin: 60,
                    suggestedMax: 125,
                    padding: 20,
                    fontColor: "#9a9a9a"
                  }
                }],
        
                xAxes: [{
                  barPercentage: 1.6,
                  gridLines: {
                    drawBorder: false,
                    color: 'rgba(225,78,202,0.1)',
                    zeroLineColor: "transparent",
                  },
                  ticks: {
                    padding: 20,
                    fontColor: "#9a9a9a"
                  }
                }]
              }
            };
        
            var gradientChartOptionsConfigurationWithTooltipRed: any = {
              maintainAspectRatio: false,
              legend: {
                display: false
              },
        
              tooltips: {
                backgroundColor: '#f5f5f5',
                titleFontColor: '#333',
                bodyFontColor: '#666',
                bodySpacing: 4,
                xPadding: 12,
                mode: "nearest",
                intersect: 0,
                position: "nearest"
              },
              responsive: true,
              scales: {
                yAxes: [{
                  barPercentage: 1.6,
                  gridLines: {
                    drawBorder: false,
                    color: 'rgba(29,140,248,0.0)',
                    zeroLineColor: "transparent",
                  },
                  ticks: {
                    suggestedMin: 60,
                    suggestedMax: 125,
                    padding: 20,
                    fontColor: "#9a9a9a"
                  }
                }],
        
                xAxes: [{
                  barPercentage: 1.6,
                  gridLines: {
                    drawBorder: false,
                    color: 'rgba(233,32,16,0.1)',
                    zeroLineColor: "transparent",
                  },
                  ticks: {
                    padding: 20,
                    fontColor: "#9a9a9a"
                  }
                }]
              }
            };
        
            var gradientChartOptionsConfigurationWithTooltipOrange: any = {
              maintainAspectRatio: false,
              legend: {
                display: false
              },
        
              tooltips: {
                backgroundColor: '#f5f5f5',
                titleFontColor: '#333',
                bodyFontColor: '#666',
                bodySpacing: 4,
                xPadding: 12,
                mode: "nearest",
                intersect: 0,
                position: "nearest"
              },
              responsive: true,
              scales: {
                yAxes: [{
                  barPercentage: 1.6,
                  gridLines: {
                    drawBorder: false,
                    color: 'rgba(29,140,248,0.0)',
                    zeroLineColor: "transparent",
                  },
                  ticks: {
                    suggestedMin: 50,
                    suggestedMax: 110,
                    padding: 20,
                    fontColor: "#ff8a76"
                  }
                }],
        
                xAxes: [{
                  barPercentage: 1.6,
                  gridLines: {
                    drawBorder: false,
                    color: 'rgba(220,53,69,0.1)',
                    zeroLineColor: "transparent",
                  },
                  ticks: {
                    padding: 20,
                    fontColor: "#ff8a76"
                  }
                }]
              }
            };
        
            var gradientChartOptionsConfigurationWithTooltipGreen: any = {
              maintainAspectRatio: false,
              legend: {
                display: false
              },
        
              tooltips: {
                backgroundColor: '#f5f5f5',
                titleFontColor: '#333',
                bodyFontColor: '#666',
                bodySpacing: 4,
                xPadding: 12,
                mode: "nearest",
                intersect: 0,
                position: "nearest"
              },
              responsive: true,
              scales: {
                yAxes: [{
                  barPercentage: 1.6,
                  gridLines: {
                    drawBorder: false,
                    color: 'rgba(29,140,248,0.0)',
                    zeroLineColor: "transparent",
                  },
                  ticks: {
                    suggestedMin: 50,
                    suggestedMax: 125,
                    padding: 20,
                    fontColor: "#9e9e9e"
                  }
                }],
        
                xAxes: [{
                  barPercentage: 1.6,
                  gridLines: {
                    drawBorder: false,
                    color: 'rgba(0,242,195,0.1)',
                    zeroLineColor: "transparent",
                  },
                  ticks: {
                    padding: 20,
                    fontColor: "#9e9e9e"
                  }
                }]
              }
            };
        
        
            var gradientBarChartConfiguration: any = {
              maintainAspectRatio: false,
              legend: {
                display: false
              },
        
              tooltips: {
                backgroundColor: '#f5f5f5',
                titleFontColor: '#333',
                bodyFontColor: '#666',
                bodySpacing: 4,
                xPadding: 12,
                mode: "nearest",
                intersect: 0,
                position: "nearest"
              },
              responsive: true,
              scales: {
                yAxes: [{
        
                  gridLines: {
                    drawBorder: false,
                    color: 'rgba(29,140,248,0.1)',
                    zeroLineColor: "transparent",
                  },
                  ticks: {
                    suggestedMin: 60,
                    suggestedMax: 120,
                    padding: 20,
                    fontColor: "#9e9e9e"
                  }
                }],
        
                xAxes: [{
        
                  gridLines: {
                    drawBorder: false,
                    color: 'rgba(29,140,248,0.1)',
                    zeroLineColor: "transparent",
                  },
                  ticks: {
                    padding: 20,
                    fontColor: "#9e9e9e"
                  }
                }]
              }
            };
        
            this.canvas = document.getElementById("chartLineRed");
            this.ctx = this.canvas.getContext("2d");
        
            var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
        
            gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
            gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
            gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors
        
            var data = {
              labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
              datasets: [{
                label: "Data",
                fill: true,
                backgroundColor: gradientStroke,
                borderColor: '#ec250d',
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: '#ec250d',
                pointBorderColor: 'rgba(255,255,255,0)',
                pointHoverBackgroundColor: '#ec250d',
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: [80, 100, 70, 80, 120, 80],
              }]
            };
        
            var myChart = new Chart(this.ctx, {
              type: 'line',
              data: data,
              options: gradientChartOptionsConfigurationWithTooltipRed
            });
        
        
            this.canvas = document.getElementById("chartLineGreen");
            this.ctx = this.canvas.getContext("2d");
        
        
            var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
        
            gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
            gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
            gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors
        
            var data = {
              labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
              datasets: [{
                label: "My First dataset",
                fill: true,
                backgroundColor: gradientStroke,
                borderColor: '#00d6b4',
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: '#00d6b4',
                pointBorderColor: 'rgba(255,255,255,0)',
                pointHoverBackgroundColor: '#00d6b4',
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: [90, 27, 60, 12, 80],
              }]
            };
        
            var myChart = new Chart(this.ctx, {
              type: 'line',
              data: data,
              options: gradientChartOptionsConfigurationWithTooltipGreen
        
            });
        
        
        
            var chart_labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            this.datasets = [
              [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
              [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
              [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
            ];
            this.data = this.datasets[0];
            this.canvas = document.getElementById("chartBig1");
            this.ctx = this.canvas.getContext("2d");
        
            var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
        
            gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
            gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
            gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors
        
            var config = {
              type: 'line',
              data: {
                labels: chart_labels,
                datasets: [{
                  label: "My First dataset",
                  fill: true,
                  backgroundColor: gradientStroke,
                  borderColor: '#ec250d',
                  borderWidth: 2,
                  borderDash: [],
                  borderDashOffset: 0.0,
                  pointBackgroundColor: '#ec250d',
                  pointBorderColor: 'rgba(255,255,255,0)',
                  pointHoverBackgroundColor: '#ec250d',
                  pointBorderWidth: 20,
                  pointHoverRadius: 4,
                  pointHoverBorderWidth: 15,
                  pointRadius: 4,
                  data: this.data,
                }]
              },
              options: gradientChartOptionsConfigurationWithTooltipRed
            };
            this.myChartData = new Chart(this.ctx, config);
        
        
            this.canvas = document.getElementById("CountryChart");
            this.ctx  = this.canvas.getContext("2d");
            var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
        
            gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
            gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
            gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors
        
        
            var myChart = new Chart(this.ctx, {
              type: 'bar',
              responsive: true,
              legend: {
                display: false
              },
              data: {
                labels: ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR'],
                datasets: [{
                  label: "Countries",
                  fill: true,
                  backgroundColor: gradientStroke,
                  hoverBackgroundColor: gradientStroke,
                  borderColor: '#1f8ef1',
                  borderWidth: 2,
                  borderDash: [],
                  borderDashOffset: 0.0,
                  data: [53, 20, 10, 80, 100, 45],
                }]
              },
              options: gradientBarChartConfiguration
            });
        
          
    }

    goBack(){
        this.map.setZoom(4.5);
        this.map.setCenter(this.markers.getPosition());
        this.isHideHome = false;
        this.isHideBack = true;
        this.isHideState = true;
    }

}

