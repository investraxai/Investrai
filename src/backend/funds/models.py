
from django.db import models

class FundCategory(models.TextChoices):
    EQUITY = "Equity", "Equity"
    DEBT = "Debt", "Debt"
    HYBRID = "Hybrid", "Hybrid"
    SOLUTION_ORIENTED = "Solution Oriented", "Solution Oriented"
    OTHER = "Other", "Other"

class AumCategory(models.TextChoices):
    SMALL = "Small", "Small"
    MID = "Mid", "Mid"
    LARGE = "Large", "Large"

class RiskRating(models.IntegerChoices):
    LOW = 1, "Low"
    MODERATE_LOW = 2, "Moderate Low"
    MODERATE = 3, "Moderate"
    MODERATE_HIGH = 4, "Moderate High"
    HIGH = 5, "High"

class Fund(models.Model):
    scheme_name = models.CharField(max_length=255)
    amc = models.CharField(max_length=255)
    scheme_code = models.CharField(max_length=50, unique=True)
    nav = models.DecimalField(max_digits=12, decimal_places=4)
    category = models.CharField(
        max_length=50,
        choices=FundCategory.choices,
        default=FundCategory.OTHER
    )
    sub_category = models.CharField(max_length=100, blank=True, null=True)
    expense_ratio = models.DecimalField(max_digits=5, decimal_places=2)
    aum = models.DecimalField(max_digits=14, decimal_places=2)  # Assets Under Management in crores
    aum_category = models.CharField(
        max_length=10,
        choices=AumCategory.choices,
        default=AumCategory.SMALL
    )
    risk_rating = models.IntegerField(choices=RiskRating.choices, default=RiskRating.MODERATE)
    inception_date = models.DateField()
    fund_manager = models.CharField(max_length=255, blank=True, null=True)
    min_sip_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    min_lumpsum = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    exit_load = models.CharField(max_length=255, blank=True, null=True)
    
    # Advanced metrics
    standard_deviation = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    sharpe_ratio = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    treynor_ratio = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    beta = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    alpha = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    cagr = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    max_drawdown = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    
    class Meta:
        ordering = ['scheme_name']
        
    def __str__(self):
        return f"{self.scheme_name} - {self.amc}"

class FundReturn(models.Model):
    fund = models.ForeignKey(Fund, on_delete=models.CASCADE, related_name='returns_data')
    period = models.CharField(max_length=10)  # e.g., "1Y", "3Y", "5Y"
    value = models.DecimalField(max_digits=8, decimal_places=2)  # Return percentage
    as_of_date = models.DateField()
    
    class Meta:
        unique_together = ('fund', 'period')
        
    def __str__(self):
        return f"{self.fund.scheme_name} - {self.period}: {self.value}%"

class DataProvider(models.Model):
    name = models.CharField(max_length=100)
    api_key = models.CharField(max_length=255)
    base_url = models.URLField()
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name
