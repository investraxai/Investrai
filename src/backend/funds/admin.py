
from django.contrib import admin
from .models import Fund, FundReturn, DataProvider

@admin.register(Fund)
class FundAdmin(admin.ModelAdmin):
    list_display = ('scheme_name', 'amc', 'category', 'nav', 'expense_ratio')
    list_filter = ('category', 'amc', 'risk_rating')
    search_fields = ('scheme_name', 'amc')

@admin.register(FundReturn)
class FundReturnAdmin(admin.ModelAdmin):
    list_display = ('fund', 'period', 'value', 'as_of_date')
    list_filter = ('period', 'as_of_date')
    search_fields = ('fund__scheme_name',)

@admin.register(DataProvider)
class DataProviderAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active', 'base_url')
    list_filter = ('is_active',)
    search_fields = ('name',)
