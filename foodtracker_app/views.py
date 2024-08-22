from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from .models import Dispositivo


@login_required()
def mainpage(request):
    template = "inventario.html"
    context = {"device_list": Dispositivo.objects.all().values()}

    return render(request, template, context)


def login_page(request):
    if request.method == "GET":
        template = "login.html"
        return render(request, template)

    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(username=username, password=password)

        if user:
            login(request, user)
            return redirect(mainpage)
        else:
            return redirect(login_page)
