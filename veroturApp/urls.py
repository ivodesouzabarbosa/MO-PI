from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import map_view

urlpatterns = [
    path('', map_view, name='map_view'),  # Renderiza o HTML com o mapa
    # path('pontos-turisticos/', pontos_turisticos_view, name='pontos_turisticos'),  # API para dados JSON
    # path('categorias/', lista_categorias_view, name='lista_categorias'),
    # path('categoria/<int:categoria_id>/', pontos_por_categoria, name='pontos_por_categoria'),
    # path('linkcateg/', linkcateg, name='categ') # path de ctegorias
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)