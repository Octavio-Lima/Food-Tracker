from django.conf.urls import include
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("foodtracker_app.urls")),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
