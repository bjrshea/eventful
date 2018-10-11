export default class Event {
  constructor(apiResponse) {

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
