from django.contrib import admin
from django.urls import path, include
from django.views.i18n import set_language
from django.conf.urls.i18n import i18n_patterns
urlpatterns = [
    path('admin/', admin.site.urls),
]  +  i18n_patterns(path('', include('veroturApp.urls')),
                    path('', set_language, name='set_language'))