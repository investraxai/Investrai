
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
            
        # Apply advanced metric filters
        min_standard_deviation = self.request.query_params.get('minStandardDeviation')
        max_standard_deviation = self.request.query_params.get('maxStandardDeviation')
        min_sharpe_ratio = self.request.query_params.get('minSharpeRatio')
        max_sharpe_ratio = self.request.query_params.get('maxSharpeRatio')
        min_treynor_ratio = self.request.query_params.get('minTreynorRatio')
        max_treynor_ratio = self.request.query_params.get('maxTreynorRatio')
        min_beta = self.request.query_params.get('minBeta')
        max_beta = self.request.query_params.get('maxBeta')
        min_alpha = self.request.query_params.get('minAlpha')
        max_alpha = self.request.query_params.get('maxAlpha')
        
        if min_standard_deviation:
            queryset = queryset.filter(standard_deviation__gte=float(min_standard_deviation))
        if max_standard_deviation:
            queryset = queryset.filter(standard_deviation__lte=float(max_standard_deviation))
        if min_sharpe_ratio:
            queryset = queryset.filter(sharpe_ratio__gte=float(min_sharpe_ratio))
        if max_sharpe_ratio:
            queryset = queryset.filter(sharpe_ratio__lte=float(max_sharpe_ratio))
        if min_treynor_ratio:
            queryset = queryset.filter(treynor_ratio__gte=float(min_treynor_ratio))
        if max_treynor_ratio:
            queryset = queryset.filter(treynor_ratio__lte=float(max_treynor_ratio))
        if min_beta:
            queryset = queryset.filter(beta__gte=float(min_beta))
        if max_beta:
            queryset = queryset.filter(beta__lte=float(max_beta))
        if min_alpha:
            queryset = queryset.filter(alpha__gte=float(min_alpha))
        if max_alpha:
            queryset = queryset.filter(alpha__lte=float(max_alpha))
            
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

@api_view(['GET'])
@permission_classes([AllowAny])
def get_advanced_metrics_stats(request):
    """Get min, max and average values for advanced metrics"""
    from django.db.models import Min, Max, Avg
    
    stats = Fund.objects.aggregate(
        min_standard_deviation=Min('standard_deviation'),
        max_standard_deviation=Max('standard_deviation'),
        avg_standard_deviation=Avg('standard_deviation'),
        min_sharpe_ratio=Min('sharpe_ratio'),
        max_sharpe_ratio=Max('sharpe_ratio'),
        avg_sharpe_ratio=Avg('sharpe_ratio'),
        min_treynor_ratio=Min('treynor_ratio'),
        max_treynor_ratio=Max('treynor_ratio'),
        avg_treynor_ratio=Avg('treynor_ratio'),
        min_beta=Min('beta'),
        max_beta=Max('beta'),
        avg_beta=Avg('beta'),
        min_alpha=Min('alpha'),
        max_alpha=Max('alpha'),
        avg_alpha=Avg('alpha')
    )
    
    return Response(stats)
