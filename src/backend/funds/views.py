
from rest_framework import viewsets, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.db.models import Q
from .models import Fund, DataProvider
from .serializers import FundSerializer, DataProviderSerializer
from datetime import datetime
import requests
import pandas as pd

class FundViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = FundSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['scheme_name', 'amc', 'category', 'sub_category']
    
    def get_queryset(self):
        queryset = Fund.objects.all()
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
            
        # Filter by AMC
        amc = self.request.query_params.get('amc')
        if amc:
            queryset = queryset.filter(amc=amc)
            
        # Filter by returns
        min_return_1y = self.request.query_params.get('minReturn1Y')
        if min_return_1y:
            queryset = queryset.filter(returns_data__period='1Y', returns_data__value__gte=min_return_1y)
            
        min_return_3y = self.request.query_params.get('minReturn3Y')
        if min_return_3y:
            queryset = queryset.filter(returns_data__period='3Y', returns_data__value__gte=min_return_3y)
            
        min_return_5y = self.request.query_params.get('minReturn5Y')
        if min_return_5y:
            queryset = queryset.filter(returns_data__period='5Y', returns_data__value__gte=min_return_5y)
            
        # Filter by expense ratio
        min_expense = self.request.query_params.get('minExpenseRatio')
        max_expense = self.request.query_params.get('maxExpenseRatio')
        if min_expense:
            queryset = queryset.filter(expense_ratio__gte=min_expense)
        if max_expense:
            queryset = queryset.filter(expense_ratio__lte=max_expense)
            
        # Filter by AUM
        min_aum = self.request.query_params.get('minAUM')
        max_aum = self.request.query_params.get('maxAUM')
        if min_aum:
            queryset = queryset.filter(aum__gte=min_aum)
        if max_aum:
            queryset = queryset.filter(aum__lte=max_aum)
            
        # Filter by AUM category
        aum_category = self.request.query_params.get('aumCategory')
        if aum_category:
            queryset = queryset.filter(aum_category=aum_category)
            
        # Search query
        search_query = self.request.query_params.get('searchQuery')
        if search_query:
            queryset = queryset.filter(
                Q(scheme_name__icontains=search_query) | 
                Q(amc__icontains=search_query)
            )
            
        return queryset.distinct()

class DataProviderViewSet(viewsets.ModelViewSet):
    queryset = DataProvider.objects.all()
    serializer_class = DataProviderSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def get_top_performing_funds(request):
    """Get top performing funds based on 1Y, 3Y, or 5Y returns"""
    period = request.query_params.get('period', '1Y')
    category = request.query_params.get('category', None)
    limit = int(request.query_params.get('limit', 10))
    
    queryset = Fund.objects.filter(returns_data__period=period)
    if category:
        queryset = queryset.filter(category=category)
        
    queryset = queryset.order_by('-returns_data__value')[:limit]
    serializer = FundSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def refresh_fund_data(request):
    """Refresh fund data from the external API"""
    try:
        provider = DataProvider.objects.filter(is_active=True).first()
        if not provider:
            return Response({"error": "No active data provider found"}, status=400)
            
        # This is a placeholder for the actual API call
        # In production, you would call the real external API
        # using the provider.api_key and provider.base_url
        
        return Response({"message": "Fund data refreshed successfully"})
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_amcs(request):
    """Get list of all AMCs"""
    amcs = Fund.objects.values_list('amc', flat=True).distinct().order_by('amc')
    return Response(list(amcs))
