from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse

def map_view(request):
    return render(request, 'teste.html')