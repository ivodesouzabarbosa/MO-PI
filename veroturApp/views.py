from django.shortcuts import render, get_object_or_404
from django.views.decorators.cache import cache_page
from django.http import JsonResponse
from .models import PontosTuristicos, Categorias
from django.utils.translation import gettext
from django.http import HttpResponse
from django.core.paginator import Paginator
from django.utils import translation


@cache_page(60 * 15)
def home(request):
    categorias = Categorias.objects.all()  # Busca todas as categorias
    return render(request, 'index.html', {'categorias': categorias})

def eventos(request):
    return render(request, 'Eventos/eventos.html')


def mapa(request):
    return render(request, 'mapa/mapa.html')

# def pontos_turisticos(request):
#     return render(request, 'como_chegar/pontos_turisticos.html')

def lista_pontos_turisticos(request):
    pontos = PontosTuristicos.objects.all()
    return render(request, 'como_chegar/detalhes.html', {'pontos': pontos})

# Teste -------------
def como_chegar(request):
    categorias = Categorias.objects.all()
    return render(request, 'como_chegar/como_chegar.html', {'categorias': categorias})

# def pontos_por_categoria(request, categoria_id):
#     # Obtém a categoria específica com base no ID passado na URL
#     categoria = Categorias.objects.get(id=categoria_id)

#     # Busca os pontos turísticos que pertencem à categoria
#     pontos_turisticos = PontosTuristicos.objects.filter(categorias_id_categorias=categoria)

#     # Paginação: 9 cards por página (3 colunas com 3 cards)
#     paginator = Paginator(pontos_turisticos, 9)  # 9 cards por página
#     page_number = request.GET.get('page')  # Obtém o número da página da URL
#     page_obj = paginator.get_page(page_number)  # Pega os objetos da página atual

#     context = {
#         'categoria': categoria,
#         'page_obj': page_obj  # Passa o objeto da página para o template
#     }
#     return render(request, 'como_chegar/pontos_turisticos.html', context)

# def pontos_por_categoria(request, categoria_id):
#     # Obtém a categoria específica com base no ID passado na URL
#     categoria = Categorias.objects.get(id=categoria_id)

#     # Busca todos os pontos turísticos que pertencem à categoria
#     pontos_turisticos = PontosTuristicos.objects.filter(categorias_id_categorias=categoria)

#     context = {
#         'categoria': categoria,
#         'pontos_turisticos': pontos_turisticos  # Passa todos os pontos turísticos para o template
#     }
#     return render(request, 'como_chegar/pontos_turisticos.html', context)

def pontos_por_categoria(request, categoria_id):
    # Obtém a categoria específica com base no ID passado na URL
    categoria = get_object_or_404(Categorias, id=categoria_id)

    # Busca todos os pontos turísticos que pertencem à categoria
    pontos_turisticos = PontosTuristicos.objects.filter(categorias_id_categorias=categoria)

    # Distribui os pontos turísticos entre três colunas
    colunas = [[], [], []]
    for index, ponto in enumerate(pontos_turisticos):
        colunas[index % 3].append(ponto)

    context = {
        'categoria': categoria,
        'coluna_1': colunas[0],
        'coluna_2': colunas[1],
        'coluna_3': colunas[2],
    }

    return render(request, 'como_chegar/pontos_turisticos.html', context)

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

def set_language(request):
    user_language = 'En'
    translation.activate(user_language)
    request.LANGUAGE_CODE = user_language
    
def set_language(request):
    user_language = 'Es'
    translation.activate(user_language)
    request.LANGUAGE_CODE = user_language

# Barra de pesquisa


def busca(request):
    pesquisa = request.GET.get('pesquisa', '')
    resultados_pontos = []

    if pesquisa:
       # resultados_pontos = list(PontosTuristicos.objects.filter(nome__icontains=pesquisa).values('nome'))
        resultados_pontos = list(PontosTuristicos.objects.filter(nome__icontains=pesquisa).values('id', 'nome'))

    return JsonResponse({'resultados_pontos': resultados_pontos})

def ponto_view(request, id):
    ponto = get_object_or_404(PontosTuristicos, id=id)
    return render(request, 'como_chegar/pontos_turisticos.html', {'ponto': ponto})  # Renderize um template adequado