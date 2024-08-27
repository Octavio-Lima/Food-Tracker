from django.shortcuts import render
from .models import FoodEntry


def mainpage(request):
    template = "inventario.html"
    context = {"food_entries": FoodEntry.objects.all()}

    return render(request, template, context)
