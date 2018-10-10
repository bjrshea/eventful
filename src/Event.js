export default class Event {
  constructor(apiResponse) {
    this.locations =[apiResponse.events.event[0].latitude, apiResponse.events.event[0].longitude];
    this.url = apiResponse.events.event[0].url;
    this.cityName = apiResponse.events.event[0].city_name;
    this.regionName = apiResponse.events.event[0].region_name;
    this.startTime = apiResponse.events.event[0].start_name;
    this.description = apiResponse.events.event[0].description;
    this.venueName = apiResponse.events.event[0].venue_name;
    this.venueUrl = apiResponse.events.event[0].venue_url;
    this.title = apiResponse.events.event[0].title;
    this.performers = apiResponse.events.event[0].performers;
  }
}
