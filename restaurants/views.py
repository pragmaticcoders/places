from django.shortcuts import render

from .google_api import Api


def home(request):
    return render(request, 'restaurants/index.html')