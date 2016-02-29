var KEY = 'AIzaSyBVkmNR4m_IAColEmySY4O1mDx3SXIceV4';

var ractive = Ractive({
    el: '#root',
    template: '#root-template',
    data: {
        places: [],
        selectedPlaces: undefined
    },
    oninit: function() {
        this.getUserLocation().then(this.getPlaces.bind(this));
    },
    onrender: function() {
        this.observe('places', function() {
            $(this.find('.selectpicker')).selectpicker('refresh');
            this.set('selectedPlaces', undefined);
        }, {defer: true, init: false});
    },
    getUserLocation: function() {
        return $.post('https://www.googleapis.com/geolocation/v1/geolocate?key=' + KEY)
            .then(function(response) {
                return response.location;
            });
    },
    getPlaces: function(location) {
        var self = this;
        var place = new google.maps.LatLng(location.lat, location.lng);
        var service = new google.maps.places.PlacesService(document.createElement('div'));

        var request = {
            location: place,
            radius: '1000',
            types: ['bar', 'cafe', 'food', 'restaurant']
        };

        service.nearbySearch(request, function(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                self.set('places', results);
                //console.log(results);
            }
        });
    }
});



