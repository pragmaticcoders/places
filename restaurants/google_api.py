import requests


class Api(object):
    GEOLOCATION_KEY = 'AIzaSyBuVIlXWtIlLBQBHjMiNy_iQ-jP5vLhD88'

    def __init__(self):
        self.s = requests.Session()

    def get_location(self):
        r = self.s.post('https://www.googleapis.com/geolocation/v1/geolocate?key=' + self.GEOLOCATION_KEY)
        return r.json()