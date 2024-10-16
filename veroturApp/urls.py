from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import eventos, lista_pontos_turisticos, map_view, pontos_turisticos_json, home, como_chegar, pontos_por_categoria
urlpatterns = [
    path('', home, name='home'),
    path('como-chegar/', como_chegar, name='como_chegar'),
    path('categoria/<int:categoria_id>/', pontos_por_categoria, name='pontos_por_categoria'),
    path('teste', map_view, name='teste'),
    # path('pontos/', pontos_turisticos, name='pontos'),
    path('Eventos/', eventos, name='eventos'),
    path('detalhes/', lista_pontos_turisticos, name='detalhes'),
    path('map/', map_view, name='map_view'),  # Renderiza o HTML com o mapa
    path('pontos-turisticos/', pontos_turisticos_json, name='pontos_turisticos'),  # API para dados JSON
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)