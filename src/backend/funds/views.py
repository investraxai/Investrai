
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.db.models import Q
from .models import Fund, DataProvider
from .serializers import FundSerializer, DataProviderSerializer
from datetime import datetime

class FundViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = FundSerializer
    
    def get_queryset(self):
        queryset = Fund.objects.all()
        
        # Filter by specific fund IDs
        fund_ids = self.request.query_params.get('fundIds')
        if fund_ids:
            fund_ids = fund_ids.split(',')
            queryset = queryset.filter(scheme_code__in=fund_ids)
            return queryset
            
        # Apply other filters
        category = self.request.query_params.get('category')
        amc = self.request.query_params.get('amc')
        search_query = self.request.query_params.get('searchQuery')
        
        if category:
            queryset = queryset.filter(category=category)
        if amc:
            queryset = queryset.filter(amc=amc)
        if search_query:
            queryset = queryset.filter(
                Q(scheme_name__icontains=search_query) |
                Q(amc__icontains=search_query)
            )
            
        return queryset

class DataProviderViewSet(viewsets.ModelViewSet):
    queryset = DataProvider.objects.all()
    serializer_class = DataProviderSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def get_top_performing_funds(request):
    """Get top performing funds based on returns"""
    period = request.query_params.get('period', '1Y')
    category = request.query_params.get('category')
    limit = int(request.query_params.get('limit', 10))
    
    queryset = Fund.objects.all()
    if category:
        queryset = queryset.filter(category=category)
        
    # Filter and order by returns
    queryset = queryset.filter(
        returns_data__period=period
    ).order_by('-returns_data__value')[:limit]
    
    serializer = FundSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_amcs(request):
    """Get list of all AMCs"""
    amcs = Fund.objects.values_list('amc', flat=True).distinct().order_by('amc')
    return Response(list(amcs))
