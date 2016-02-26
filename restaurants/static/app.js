(function() {
    var KEY = 'AIzaSyBVkmNR4m_IAColEmySY4O1mDx3SXIceV4';

    function getUserLocation() {
        return $.post('https://www.googleapis.com/geolocation/v1/geolocate?key=' + KEY)
            .then(function(response) {
                console.log(response.location);
                return response.location;
            });
    }

    function getPlaces(location) {
         var place = new google.maps.LatLng(location.lat, location.lng);

        var map = document.getElementById('restaurants');

        var service = new google.maps.places.PlacesService(map);

        var request = {
            location: place,
            radius: '10000',
            types: ['bar', 'cafe', 'food', 'restaurant']
        };

        service.nearbySearch(request, function(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            console.log(results);
          }
        });
    }

    getUserLocation().then(getPlaces);

})();

