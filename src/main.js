import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import Event from './Event.js';
import 'leaflet';

const L = window.L;


$(document).ready(function() {
  var now = new Date();

  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);

  var today = now.getFullYear()+"-"+(month)+"-"+(day) ;


  $('#startDate').attr("value", today);

  $('.search button').click(function() {
    let dateRange;

    const locationSearch = $('#locationSearch').val();
    const searchSize = $('#searchSize').val();



    let startDate = $('#startDate').val();
    let endDate = $('#endDate').val();

    if($('#startDate').val() != "" )
      startDate = startDate.split('-').join('');
      endDate = endDate.split('-').join('');
    if (endDate == "") {
      dateRange = startDate;
    } else if (startDate == "") {
      dateRange = endDate;
    } else {
      dateRange = startDate + "-" + endDate;
    }

    $('.accordion').empty();
    $('#mapid').remove();
    $('.mapwrap').append('<div id="mapid"></div>');

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `http://api.eventful.com/json/events/search?app_key=${process.env.EVENT_API_KEY}&location=${locationSearch}&date=Today&category=music&page_size=${searchSize}`,
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
      const restaurantArray = [];
      const eventAPIArray = response.events.event;
      eventAPIArray.forEach(function(event) {
        const arrayItem = new Event(event);
        todaysEvents.push(arrayItem);
      });

      var mymap = L.map('mapid').setView([todaysEvents[0].location[0], todaysEvents[0].location[1]], 11);
      var counter = 0;
      todaysEvents.forEach(function(event) {
        restaurantArray.push(event.location);
        $('.accordion').append('<div class="card-wrap"><div class="card"><div class="card-header" id="headingOne"><h5 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse' + counter + '" aria-expanded="true" aria-controls="collapseOne"><p>' + event.title + '</p><br><p>' + event.venueName + '</p></button></h5></div><div id="collapse' + counter + '" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample"><div class="card-body">' + event.cityName + ',&nbsp;' + event.regionName + '<br>' + event.startTime + '<br>' + event.description + '<br><a target="_blank" href="' + event.url + '">Buy Tickets</a></div></div></div></div>');

        counter++;

        var marker = L.marker([event.location[0], event.location[1]]).addTo(mymap);
        marker.bindPopup("<span style='color: " + color + ";'><b>" + event.title + "</b></span><br><a target='_blank' href='" + event.venueUrl + "'>" + event.venueName + "</a><br><span class='restaurants' id='rstFind" + counter + "'>Find Nearby Bars</span>").openPopup();
      });
      console.log(restaurantArray);
      L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}`, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: `${process.env.LEAF_API_KEY}`
      }).addTo(mymap);

    });
  });
});
