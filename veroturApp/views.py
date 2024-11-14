from django.shortcuts import render, get_object_or_404
from django.views.decorators.cache import cache_page
from django.http import JsonResponse
from .models import PontosTuristicos, Categorias, Senac
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
        'endereco', 'horarios_funcionamento', 'lugares_pagos', 'monitoria', 'categorias_id_categorias__nome'
    ))

    return JsonResponse(pontos_list, safe=False)


def senac_json(request):
    # Obtenha os parâmetros de limite do mapa
    ne_lat = request.GET.get('ne_lat')
    ne_lng = request.GET.get('ne_lng')
    sw_lat = request.GET.get('sw_lat')
    sw_lng = request.GET.get('sw_lng')

    # Verifique se os parâmetros estão presentes
    if ne_lat and ne_lng and sw_lat and sw_lng:
        # Filtra os pontos dentro dos limites de latitude e longitude
        pontosSenac = Senac.objects.filter(
            latitude__lte=ne_lat,  # Latitude menor ou igual ao limite norte
            latitude__gte=sw_lat,  # Latitude maior ou igual ao limite sul
            longitude__lte=ne_lng, # Longitude menor ou igual ao limite leste
            longitude__gte=sw_lng  # Longitude maior ou igual ao limite oeste
        )
    else:
        # Caso os limites não sejam fornecidos, retorna todos os pontos
        pontosSenac = Senac.objects.all()

    # Extrai os valores em um formato de dicionário
    pontos_list = list(pontosSenac.values(
        'nome', 'imagem', 'descricao', 'latitude', 'longitude', 'link'
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
# Campo de busca no index redirecionando para a página da categoria do ponto turístico

def busca(request):
    pesquisa = request.GET.get('pesquisa', '')
    resultados_pontos = []

    if pesquisa:
        # Filtra pontos turísticos que começam com a inicial digitada, ignorando maiúsculas/minúsculas
        pontos = PontosTuristicos.objects.filter(
            nome__istartswith=pesquisa
        ).select_related('categorias_id_categorias')  # Verifique se 'categorias_id_categorias' está correto

        # Formata os resultados para incluir o nome e o id da categoria, além do URL da imagem
        resultados_pontos = [
            {
                'id': ponto.id,
                'imagem_url': ponto.imagem.url if ponto.imagem else None,  # Extrai o URL da imagem
                'nome': ponto.nome,
                'categoria': ponto.categorias_id_categorias.nome,  # Nome da categoria
                'categoria_id': ponto.categorias_id_categorias.id  # ID da categoria
            }
            for ponto in pontos
        ]

    # Retorna os resultados em formato JSON
    return JsonResponse({'resultados_pontos': resultados_pontos})
    

def ponto_view(request, id):
    ponto = get_object_or_404(PontosTuristicos, id=id)
    return render(request, 'como_chegar/pontos_turisticos.html', {'ponto': ponto})  # Renderize um template adequado


def ponto_turistico_detalhe(request, id):
    result = get_object_or_404(PontosTuristicos, id=id)
    return render(request, 'resultado_busca.html', {'result': result})

