from django.db import models


# Create your models here.
class Dispositivo(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=255, default="")
    tipoDispositivo = models.CharField(max_length=100, default="Selecione")
    marca = models.CharField(max_length=255, default="Selecione")
    patri = models.CharField(max_length=5, default="0000")
    numeroCelular = models.CharField(max_length=50, default="")
    numeroConta = models.CharField(max_length=50, default="")
    usuario = models.CharField(max_length=255, default="")
    status = models.CharField(max_length=255, default="Selecione")
    valor = models.FloatField(default=0)
    serial = models.CharField(max_length=255, default="")
    reparos = models.BooleanField(default=False)

    def __str__(self):
        return self.nome


def __str__(self):
    return self.nome


class Reparo(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=255, default="")
    dia = models.DateField()
    preco = models.FloatField(default=0)
    dispositivo = models.ForeignKey(Dispositivo, on_delete=models.SET_NULL, null=True)


class InfoInput:
    tipoElemento = ""
    tipo = ""
    select_options = [""]
    required = False
    errorMessage = ""


class Field:
    nome = ""
    gerarColuna = False
    exibirApenasEm = [""]
    id = ""
    nome_bancoDeDados = ""
    info_input = InfoInput
