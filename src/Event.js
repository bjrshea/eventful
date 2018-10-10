export default class Event {
  constructor(apiResponse) {
    // this.location =[apiResponse.latitude, apiResponse.longitude];
    // this.url = apiResponse.url;
    // this.cityName = apiResponse.city_name;
    // this.regionName = apiResponse.region_name;
    // this.startTime = apiResponse.start_name;
    // this.description = apiResponse.description;
    // this.venueName = apiResponse.venue_name;
    // this.venueUrl = apiResponse.venue_url;
    // this.title = apiResponse.title;
    // this.performers = apiResponse.performers;

    this.location =[apiResponse.latitude, apiResponse.longitude];
    this.url = apiResponse.url;
    this.cityName = apiResponse.city_name;
    this.regionName = apiResponse.region_name;
    this.startTime = apiResponse.start_time;

    if (this.description == null) {
      this.description = "No Description Available";
    } else {
      this.description = apiResponse.description;
    }
    this.venueName = apiResponse.venue_name;
    this.venueUrl = apiResponse.venue_url;
    this.title = apiResponse.title;
    this.performers = apiResponse.performers;
  }
}

// '<div class="card"><div class="card-header" id="headingOne"><h5 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">' + event.title + '<br>' + event.venueName + '</button></h5></div>'
//
// '<div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample"><div class="card-body">' + event.cityName + ',&nbsp;' + event.regionName + '<br>' + event.startTime + '<br>' + event.description + '<br><a href="' + event.url + '">Buy Tickets</a></div></div></div>'
