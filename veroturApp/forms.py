# forms.py
from django import forms

class PesquisaForm(forms.Form):
    query = forms.CharField(label='Pesquisar', max_length=100)
