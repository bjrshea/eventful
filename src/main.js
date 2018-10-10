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

var color = "#46A7FF";

$.ajax(settings).done(function (response) {
  const todaysEvents = [];
  const eventAPIArray = response.events.event;
  eventAPIArray.forEach(function(event) {
    const arrayItem = new Event(event);
    todaysEvents.push(arrayItem);
  })

  var mymap = L.map('mapid').setView([todaysEvents[0].location[0], todaysEvents[0].location[1]], 13);
    var counter = 1;
  todaysEvents.forEach(function(event) {

    $('.accordion').append('<div class="card-wrap"><div class="card"><div class="card-header" id="headingOne"><h5 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse' + counter + '" aria-expanded="true" aria-controls="collapseOne"><p>' + event.title + '</p><br><p>' + event.venueName + '</p></button></h5></div><div id="collapse' + counter + '" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample"><div class="card-body">' + event.cityName + ',&nbsp;' + event.regionName + '<br>' + event.startTime + '<br>' + event.description + '<br><a href="' + event.url + '">Buy Tickets</a></div></div></div></div>');

    counter++;

    var marker = L.marker([event.location[0], event.location[1]]).addTo(mymap);
    marker.bindPopup("<span style='color: " + color + ";'><b>" + event.title + "</b></span><br><a target='_blank' href='" + event.venueUrl + "'>" + event.venueName + "</a>").openPopup();
  });

  L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic3dhbXBjIiwiYSI6ImNqbjNtNDBhdDAwemUza293NmUzenB4aGwifQ.Nu7rHbRdFTIyA_iKow2ouA'
}).addTo(mymap);

  // $('#title').text(todaysEvents[0].title);
  // $('#venue a').text(todaysEvents[0].venueName);
  // $('#venue a').attr("href", todaysEvents[0].venueUrl);
  // $('#city').text(todaysEvents[0].cityName);
  // $('#region').text(todaysEvents[0].regionName);
  // // $('#date').
  // $('#time').text(todaysEvents[0].startTime);
  // // $('.performers ul').append()
  // $('.description').html(todaysEvents[0].description);
  // $('.ticketLink a').attr("href", todaysEvents[0].url);

});
});
