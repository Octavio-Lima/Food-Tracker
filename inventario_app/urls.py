from django.urls import path
from inventario_app import views
from inventario_app import api

urlpatterns = [
    path("", views.mainpage, name="index"),
    path("login/", views.login_page, name="login_page"),
    # API
    path("new-device/", api.deviceManager.as_view(), name="dispositivos"),
    path("repair/", api.RepairList.as_view(), name="reparos"),
    path("relatorioGeral/", api.relatorioGeral, name="relatorioGeral"),
    path("relatorios/", api.relatorio, name="relatorios"),
    path("logout_page/", api.logout_page, name="logout_page"),
]
