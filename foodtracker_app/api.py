from django.http import HttpRequest, HttpResponse, JsonResponse
from django.utils.timezone import make_aware
from django.views.generic import View
from .models import FoodEntry
from datetime import datetime
import json
import pytz


class FoodEntries(View):
    def get(self, request: HttpRequest):
        entries = list(FoodEntry.objects.all().values())
        return JsonResponse(entries, safe=False)

    def post(self, request: HttpRequest):
        data = json.loads(request.body)
        tz = request.COOKIES.get("django_tz")

        date = datetime.strptime(f'{data["date"]} {data["time"]}', "%Y-%m-%d %H:%M")

        FoodEntry.objects.create(
            name=data["name"],
            date=make_aware(date, timezone=pytz.timezone(tz)),
            time=data["time"],
            kcal=data["kcal"],
            fats=data["fats"],
            carb=data["carb"],
            prot=data["prot"],
            fibe=data["fibe"],
            sodi=data["sodi"],
            ingr=data["ingr"],
        ).save()

        return HttpResponse(status=201)


class FoodEntriesID(View):
    def delete(self, request: HttpRequest, id: int):
        FoodEntry.objects.get(id=id).delete()
        return HttpResponse(status=204)

    def put(self, request: HttpRequest, id: int):
        data = json.loads(request.body)
        tz = request.COOKIES.get("django_tz")
        date = datetime.strptime(f'{data["date"]} {data["time"]}', "%Y-%m-%d %H:%M")

        FoodEntry.objects.filter(id=id).update(
            name=data["name"],
            time=data["time"],
            kcal=data["kcal"],
            fats=data["fats"],
            carb=data["carb"],
            prot=data["prot"],
            fibe=data["fibe"],
            sodi=data["sodi"],
            ingr=data["ingr"],
            date=make_aware(date, timezone=pytz.timezone(tz)),
        )

        return HttpResponse(status=200)
