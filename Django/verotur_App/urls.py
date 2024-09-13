from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import map_view, pontos_turisticos_view

urlpatterns = [
    path('', map_view, name='map_view'),  # Renderiza o HTML com o mapa
    path('pontos-turisticos/', pontos_turisticos_view, name='pontos_turisticos'),  # API para dados JSON
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)