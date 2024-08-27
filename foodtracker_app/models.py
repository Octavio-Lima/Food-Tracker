from django.db import models


class FoodEntry(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    date = models.DateTimeField()
    time = models.TimeField()
    kcal = models.FloatField()
    fats = models.FloatField()
    carb = models.FloatField()
    prot = models.FloatField()
    fibe = models.FloatField()
    sodi = models.FloatField()
    ingr = models.TextField(default="[]")

    def __str__(self):
        return self.name
