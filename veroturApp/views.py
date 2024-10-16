from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import PontosTuristicos, Categorias
from django.utils.translation import gettext
from django.http import HttpResponse

def map_view(request):
    return render(request, 'teste.html')

def home(request):
    return render(request, 'index.html')

def eventos(request):
    return render(request, 'Eventos/eventos.html')


# def pontos_turisticos(request):
#     return render(request, 'como_chegar/pontos_turisticos.html')

def lista_pontos_turisticos(request):
    pontos = PontosTuristicos.objects.all()
    return render(request, 'como_chegar/detalhes.html', {'pontos': pontos})

# Teste -------------
def como_chegar(request):
    categorias = Categorias.objects.all()
    return render(request, 'como_chegar/como_chegar.html', {'categorias': categorias})

def pontos_por_categoria(request, categoria_id):
    # Obtém a categoria específica com base no ID passado na URL
    categoria = get_object_or_404(Categorias, id=categoria_id)

    # Busca os pontos turísticos que pertencem à categoria
    pontos_turisticos = PontosTuristicos.objects.filter(categorias_id_categorias=categoria)

    # Renderiza os pontos turísticos para o template
    return render(request, 'como_chegar/pontos_turisticos.html', {
        'categoria': categoria,
        'pontos_turisticos': pontos_turisticos
    })

def pontos_turisticos_json(request):
    # Obtenha os parâmetros de limite do mapa
    ne_lat = request.GET.get('ne_lat')
    ne_lng = request.GET.get('ne_lng')
    sw_lat = request.GET.get('sw_lat')
    sw_lng = request.GET.get('sw_lng')

    # Verifique se os parâmetros estão presentes
    if ne_lat and ne_lng and sw_lat and sw_lng:
        # Filtra os pontos turísticos dentro dos limites (latitude e longitude)
        pontos = PontosTuristicos.objects.filter(
            latitude__lte=ne_lat,  # Latitude menor ou igual ao limite norte
            latitude__gte=sw_lat,  # Latitude maior ou igual ao limite sul
            longitude__lte=ne_lng, # Longitude menor ou igual ao limite leste
            longitude__gte=sw_lng  # Longitude maior ou igual ao limite oeste
        )
    else:
        # Caso os limites não sejam fornecidos, retorna todos os pontos (pode ser modificado)
        pontos = PontosTuristicos.objects.all()

    # Extrai os valores em um formato de dicionário
    pontos_list = list(pontos.values(
        'latitude', 'longitude', 'nome', 'imagem', 'descricao',
        'endereco', 'horarios_funcionamento', 'lugares_pagos', 'monitoria'
    ))

    return JsonResponse(pontos_list, safe=False)


# campo destinado para traduções
def teste(request):
    texto = gettext('categorias')
    return render(request, 'como_chegar/pontos_turisticos.html', {{'texto': texto}})