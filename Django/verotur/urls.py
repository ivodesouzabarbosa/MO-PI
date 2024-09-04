from django.contrib import admin
from django.urls import path
from verotur_App import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.teste, name='teste')
]
