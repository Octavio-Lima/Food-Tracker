from django.http import HttpResponse, JsonResponse
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import logout
from django.contrib.staticfiles import finders
from django.shortcuts import redirect
from foodtracker_app.methods import currency_to_float
from .views import login_page
from .models import Dispositivo, Reparo
import json, csv, mimetypes


class RepairList(View):
    def get(self, request):
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        id = request.GET["id"]

        try:
            device = Dispositivo.objects.get(id=id)
            repairs = list(Reparo.objects.filter(dispositivo=device).values())
            return JsonResponse(repairs, safe=False)
        except:
            return JsonResponse([], status=404, safe=False)

    def post(self, request):
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        dt = json.loads(self.request.body)
        device = Dispositivo.objects.get(id=dt["device_id"])

        repair = Reparo()
        repair.dia = dt["date"]
        repair.preco = float(dt["price"] or 0)
        repair.nome = dt["name"]
        repair.dispositivo = device
        repair.save()

        return HttpResponse(status=201)

    def put(self, request):
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        data = json.loads(self.request.body)

        Reparo.objects.filter(id=data["id"]).update(
            nome=data["name"], dia=data["date"], preco=float(data["price"] or 0)
        )

        return HttpResponse(status=200)

    def delete(self, request):
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        Reparo.objects.filter(id=request.GET.get("id", -1)).delete()

        return HttpResponse(status=204)


def logout_page(request):
    logout(request)
    return redirect(login_page)


class deviceManager(View):
    def get(self, request):
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        # Procurar configuração pelo ID da barbearia
        id = request.GET["id"]
        device = list(Dispositivo.objects.filter(id=id).values())

        if device:
            return JsonResponse(device[0], safe=False)
        else:
            return HttpResponse(status=404)

    def post(self, request):
        if request.user.is_authenticated:
            entry = json.loads(self.request.body)

            newEntry = Dispositivo(
                nome=entry["nome"],
                tipoDispositivo=entry["tipoDispositivo"],
                numeroCelular=entry["numeroCelular"],
                status=entry["status"],
                valor=currency_to_float(entry["valor"]),
                patri=entry["patri"].zfill(4),
                marca=entry["marca"],
                usuario=entry["usuario"],
            )

            newEntry.save()

            return JsonResponse("ok", safe=False, status=200)

    @csrf_exempt
    def delete(self, request):
        if request.user.is_authenticated:
            entryId = request.GET["id"]
            Dispositivo.objects.filter(id=entryId).delete()

            return JsonResponse("ok", safe=False)

    def put(self, request):
        if request.user.is_authenticated:
            entry = json.loads(self.request.body)

            Dispositivo.objects.filter(id=entry["id"]).update(
                nome=entry["nome"],
                tipoDispositivo=entry["tipoDispositivo"],
                numeroCelular=entry["numeroCelular"],
                status=entry["status"],
                valor=currency_to_float(entry["valor"]),
                patri=entry["patri"].zfill(4),
                marca=entry["marca"],
                usuario=entry["usuario"],
            )

            return JsonResponse("ok", safe=False)


def relatorio(request):
    # Obter lista de dispositivos do banco de dados
    device_list = list(Dispositivo.objects.all().values())

    # Gerar conteudo do arquivo
    fileContent = ""

    # Escrever dados dos dispositivos
    for index in range(-1, len(device_list)):
        newLine = ""

        for key, value in device_list[index].items():
            if index < 0:
                # Criar header
                newLine += str(key) + ";"
            else:
                # Conteudo principal
                newLine += str(value) + ";"

        fileContent += newLine + "\n"

    # Define text file name
    filename = "test.csv"
    # Set the mime type
    mime_type, _ = mimetypes.guess_type(filename)
    # Set the return value of the HttpResponse
    response = HttpResponse(fileContent, content_type=mime_type)
    # Set the HTTP header for sending to browser
    response["Content-Disposition"] = "attachment; filename=%s" % filename
    # Return the response value
    return response


def relatorioGeral(request):
    listaDispositivos = Dispositivo.objects.all().values()
    entriesList = list(listaDispositivos)
    return JsonResponse(entriesList, safe=False)
