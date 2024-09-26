from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import PontoTuristico, Categoria

def map_view(request):
    return render(request, 'teste.html')

def lista_categorias_view(request):
    categorias = Categoria.objects.all()
    return render(request, 'cards-mobile.html', {'categorias': categorias})

def pontos_turisticos_view(request):
    # Obtém todos os pontos turísticos
    pontos = PontoTuristico.objects.all()

    # Extrai os valores em um formato de dicionário
    pontos_list = list(pontos.values(
        'latitude', 'longitude', 'nome', 'imagem', 'descricao',
        'endereco', 'horarios_funcionamento', 'lugares_pagos', 'monitoria'
    ))

    # Se algum dos campos for do tipo bytes, decodifica
    for ponto in pontos_list:
        for key in ponto:
            if isinstance(ponto[key], bytes):
                ponto[key] = ponto[key].decode('utf-8')

    return JsonResponse(pontos_list, safe=False)

def pontos_por_categoria(request, categoria_id):
    categoria = get_object_or_404(PontoTuristico, id=categoria_id)
    pontos_turisticos = PontoTuristico.objects.filter(categoria=categoria)
    return render(request, 'segunda_pagina.html', {
        'categoria': categoria,
        'pontos_turisticos': pontos_turisticos
    })