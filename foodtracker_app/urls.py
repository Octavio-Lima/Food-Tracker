from django.urls import path
from foodtracker_app import views
from foodtracker_app import api

urlpatterns = [
    path("", views.mainpage, name="index"),
    # API
    path("api/food-entries/", api.FoodEntries.as_view()),
    path("api/food-entries/<int:id>", api.FoodEntriesID.as_view()),
]
