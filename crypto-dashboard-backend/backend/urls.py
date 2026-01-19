from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("backend.api.urls")),  # подключаем API кошельков
    path("", lambda request: HttpResponse("Сервер работает!")),
]
