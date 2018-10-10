import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import Event from './Event.js';

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


  console.log(firstEvent);
});
});
