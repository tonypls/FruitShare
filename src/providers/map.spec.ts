import {beforeEachProviders, it, describe, expect, inject} from '@angular/core/testing';
import {MapPage} from '../pages/map/map';

describe ('Map Service', () => {

  it('should load default map coordinates, if -90 < latitude < 90 and -180 < longitude < 180 ', () => {

      let map = new MapPage.google.maps.Map(document.getElementById('map'), {
        center: {lat: 91, lng: 181},
        zoom: 6
      });

      let defaultLatLng = {lat: -40, lng: 174};
      expect(map.getCenter()).toBe(defaultLatLng);

  });

  it('should load default map coordinates, if geolocation is unsuccessful', () => {

      let map = new MapPage.google.Map(document.getElementById('map'), {
        center: {lat: -40, lng: 174},
        zoom: 6
      });

      expect(MapPage.map).toBe(map);
  });

  it ('if geolocation is unsuccessful, should call a popup', () => {
    console.log("Geo is unsuccessful in map.spec.ts")
    expect(this.loadMap().onError.alert).toHaveBeenCalled();

  });


});
