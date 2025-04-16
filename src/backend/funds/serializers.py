
from rest_framework import serializers
from .models import Fund, FundReturn, DataProvider

class FundReturnSerializer(serializers.ModelSerializer):
    class Meta:
        model = FundReturn
        fields = ['period', 'value', 'as_of_date']

class FundSerializer(serializers.ModelSerializer):
    returns = serializers.SerializerMethodField()
    
    class Meta:
        model = Fund
        fields = [
            'id', 'scheme_name', 'amc', 'scheme_code', 'nav', 
            'category', 'sub_category', 'expense_ratio', 'aum', 
            'aum_category', 'risk_rating', 'inception_date', 
            'fund_manager', 'min_sip_amount', 'min_lumpsum',
            'exit_load', 'returns', 'standard_deviation', 
            'sharpe_ratio', 'treynor_ratio', 'beta', 'alpha',
            'cagr', 'max_drawdown'
        ]
    
    def get_returns(self, obj):
        returns_data = obj.returns_data.all()
        result = {}
        for return_item in returns_data:
            result[return_item.period] = return_item.value
        return result

class DataProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataProvider
        fields = ['id', 'name', 'base_url', 'is_active']
        # Note: We don't include api_key in responses for security reasons
