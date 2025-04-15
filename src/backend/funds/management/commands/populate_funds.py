
from django.core.management.base import BaseCommand
from funds.models import Fund, FundReturn
from datetime import datetime
import random

class Command(BaseCommand):
    help = 'Populates the database with initial fund data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        Fund.objects.all().delete()
        FundReturn.objects.all().delete()

        # Sample fund data
        funds_data = [
            {
                'scheme_name': 'HDFC Top 100 Fund',
                'amc': 'HDFC Mutual Fund',
                'scheme_code': 'HDFC001',
                'nav': 825.67,
                'category': 'Equity',
                'sub_category': 'Large Cap',
                'expense_ratio': 1.75,
                'aum': 21548.32,
                'aum_category': 'Large',
                'risk_rating': 4,
                'inception_date': '2000-10-11',
                'fund_manager': 'Prashant Jain',
                'min_sip_amount': 500,
                'min_lumpsum': 5000,
                'exit_load': '1% if redeemed within 1 year',
                'standard_deviation': 18.45,
                'sharpe_ratio': 0.85,
                'treynor_ratio': 0.62,
                'beta': 0.98,
                'alpha': 2.34,
                'cagr': 14.56,
                'max_drawdown': 28.5,
                'returns': {
                    '1Y': 18.45,
                    '3Y': 15.32,
                    '5Y': 12.76
                }
            },
            # Add more funds here
        ]

        for fund_data in funds_data:
            returns = fund_data.pop('returns')
            
            # Add more advanced metrics if not present
            if 'standard_deviation' not in fund_data:
                fund_data['standard_deviation'] = round(random.uniform(8, 25), 2)
            if 'sharpe_ratio' not in fund_data:
                fund_data['sharpe_ratio'] = round(random.uniform(0.3, 1.8), 2) 
            if 'treynor_ratio' not in fund_data:
                fund_data['treynor_ratio'] = round(random.uniform(0.2, 1.5), 2)
            if 'beta' not in fund_data:
                fund_data['beta'] = round(random.uniform(0.6, 1.4), 2)
            if 'alpha' not in fund_data:
                fund_data['alpha'] = round(random.uniform(-2, 5), 2)
            if 'cagr' not in fund_data and '5Y' in returns:
                fund_data['cagr'] = returns['5Y']
            if 'max_drawdown' not in fund_data:
                fund_data['max_drawdown'] = round(random.uniform(10, 35), 2)
                
            fund = Fund.objects.create(**fund_data)
            
            # Create return entries
            for period, value in returns.items():
                FundReturn.objects.create(
                    fund=fund,
                    period=period,
                    value=value,
                    as_of_date=datetime.now().date()
                )

        self.stdout.write(self.style.SUCCESS('Successfully populated fund data'))
