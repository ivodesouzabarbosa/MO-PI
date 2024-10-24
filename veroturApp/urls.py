from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import eventos, lista_pontos_turisticos, pontos_turisticos_json, home, como_chegar, pontos_por_categoria # teste
urlpatterns = [
    path('', home, name='home'),
    path('como-chegar/', como_chegar, name='como_chegar'),
    path('categoria/<int:categoria_id>/', pontos_por_categoria, name='pontos_por_categoria'),
    # path('pontos/', pontos_turisticos, name='pontos'),
    path('Eventos/', eventos, name='eventos'),
    path('detalhes/', lista_pontos_turisticos, name='detalhes'),
    path('pontos-turisticos/', pontos_turisticos_json, name='pontos_turisticos'),  # API para dados JSON
    # path('pontos_turisticos',teste , name='texto')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)