import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import Event from './Event.js';
import 'leaflet';


const L = window.L;


$(document).ready(function() {
  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://api.eventful.com/json/events/search?app_key=v6ggdZv36ZkjJdCq&location=portland&date=Today&category=music",
  "method": "GET",
  "headers": {
    "Cache-Control": "no-cache",
    "Postman-Token": "73ae45f4-3fc8-912b-8905-1029ea96e2d0",
  },
  "data": {
    "type": "json"
  },
  "dataType": "json"
}



$.ajax(settings).done(function (response) {
  const firstEvent = new Event(response);
  console.log(firstEvent.location);
  var mymap = L.map('mapid').setView([firstEvent.location[0], firstEvent.location[1]], 13);
  var marker = L.marker([firstEvent.location[0], firstEvent.location[1]]).addTo(mymap);

  L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic3dhbXBjIiwiYSI6ImNqbjNtNDBhdDAwemUza293NmUzenB4aGwifQ.Nu7rHbRdFTIyA_iKow2ouA'
}).addTo(mymap);

  $('#title').text(firstEvent.title);
  $('#venue a').text(firstEvent.venueName);
  $('#venue a').attr("href", firstEvent.venueUrl);
  $('#city').text(firstEvent.cityName);
  $('#region').text(firstEvent.regionName);
  // $('#date').
  $('#time').text(firstEvent.startTime);
  // $('.performers ul').append()
  $('.description').html(firstEvent.description);
  $('.ticketLink a').attr("href", firstEvent.url);

});
});
