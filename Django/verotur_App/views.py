from django.shortcuts import render
from django.http import JsonResponse
from .models import PontoTuristico

def map_view(request):
    return render(request, 'teste.html')

def pontos_turisticos_view(request):
    pontos = PontoTuristico.objects.all()
    pontos_list = list(pontos.values('latitude', 'longitude', 'nome'))
    return JsonResponse(pontos_list, safe=False)

