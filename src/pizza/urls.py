from django.conf.urls import patterns, url
from pizza import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
)
