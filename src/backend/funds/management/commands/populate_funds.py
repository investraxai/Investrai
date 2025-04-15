
from django.core.management.base import BaseCommand
from funds.models import Fund, FundReturn
from datetime import datetime

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
                'returns': {
                    '1Y': 18.45,
                    '3Y': 15.32,
                    '5Y': 12.76
                }
            },
            # ... Add more funds here (you can copy from mock-indian-funds.ts)
        ]

        for fund_data in funds_data:
            returns = fund_data.pop('returns')
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
