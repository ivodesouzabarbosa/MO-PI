from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import map_view, pontos_turisticos_view, lista_categorias_view

urlpatterns = [
    path('', map_view, name='map_view'),  # Renderiza o HTML com o mapa
    path('pontos-turisticos/', pontos_turisticos_view, name='pontos_turisticos'),  # API para dados JSON
    path('categorias/', lista_categorias_view, name='lista_categorias'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)