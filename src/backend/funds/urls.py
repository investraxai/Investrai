
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'funds', views.FundViewSet, basename='fund')
router.register(r'data-providers', views.DataProviderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('top-funds/', views.get_top_performing_funds, name='top-funds'),
    path('refresh-data/', views.refresh_fund_data, name='refresh-data'),
    path('amcs/', views.get_all_amcs, name='all-amcs'),
]
