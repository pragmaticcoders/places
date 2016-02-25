from django.shortcuts import render

from .google_api import Api


def home(request):
    api = Api()
    location = api.get_location()
    return render(request, 'restaurants/index.html', {'location': location})