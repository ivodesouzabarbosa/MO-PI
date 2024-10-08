from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import PontosTuristicos, Categorias

def map_view(request):
    return render(request, 'teste.html')

def lista_categorias_view(request):
    categorias = Categorias.objects.all()
    return render(request, 'cards-mobile.html', {'categorias': categorias})

def pontos_turisticos_view(request):
    # Obtém todos os pontos turísticos
    pontos = PontosTuristicos.objects.all()

    # Extrai os valores em um formato de dicionário
    pontos_list = list(pontos.values(
        'latitude', 'longitude', 'nome', 'imagem', 'descricao',
        'endereco', 'horarios_funcionamento', 'lugares_pagos', 'monitoria'
    ))
    
    return JsonResponse(pontos_list, safe=False)

def pontos_por_categoria(request, categoria_id):
    categoria = get_object_or_404(PontosTuristicos, id=categoria_id)
    pontos_turisticos = PontosTuristicos.objects.filter(categoria=categoria)
    return render(request, 'segunda_pagina.html', {
        'categoria': categoria,
        'pontos_turisticos': pontos_turisticos
    })
    
# função para puxa informações das cetegorias
def linkcateg(request):
    categ = Categoria.objects.all()
    return render(request, 'cards-mobile.html', {'categorias': categ})