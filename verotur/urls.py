from django.contrib import admin
from django.urls import path, include
from django.conf.urls.i18n import i18n_patterns
from django.views.i18n import set_language

urlpatterns = [
    path('admin/', admin.site.urls),
]

# Definir o padrão para a mudança de idioma via query string
urlpatterns += i18n_patterns(
    path('', include('veroturApp.urls')),
    path('set_language/', set_language, name='set_language'),  # Ajustado para não requerer argumento
)
