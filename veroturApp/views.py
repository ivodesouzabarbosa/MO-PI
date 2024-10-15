from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import PontosTuristicos, Categorias

def map_view(request):
    return render(request, 'teste.html')

def home(request):
    return render(request, 'index.html')

def eventos(request):
    return render(request, 'Eventos/eventos.html')

def como_chegar(request):
    return render(request, 'como_chegar/como_chegar.html')

def pontos_turisticos(request):
    return render(request, 'como_chegar/pontos_turisticos.html')

def lista_pontos_turisticos(request):
    pontos = PontosTuristicos.objects.all()
    return render(request, 'como_chegar/detalhes.html', {'pontos': pontos})

# Teste -------------
def lista_categorias(request):
    categorias = Categorias.objects.all()
    return render(request, 'como_chegar/como_chegar.html', {'categorias': categorias})

def pontos_por_categoria(request, categoria_id):
    categoria = get_object_or_404(Categorias, id=categoria_id)
    pontos_turisticos = PontosTuristicos.objects.filter(categoria=categoria)
    return render(request, 'pontos_categoria.html', {
        'categoria': categoria,
        'pontos_turisticos': pontos_turisticos
    })

# Arquivo json para mapa google
def pontos_turisticos_view(request):
    # Obtém todos os pontos turísticos
    pontos = PontosTuristicos.objects.all()

    # Extrai os valores em um formato de dicionário
    pontos_list = list(pontos.values(
        'latitude', 'longitude', 'nome', 'imagem', 'descricao',
        'endereco', 'horarios_funcionamento', 'lugares_pagos', 'monitoria'
    ))
    
    return JsonResponse(pontos_list, safe=False)
