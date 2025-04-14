
from django.core.management.base import BaseCommand
from funds.models import Fund, FundReturn
from datetime import datetime, timedelta
import random

class Command(BaseCommand):
    help = 'Initialize database with sample mutual fund data'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample mutual fund data...')

        # Clear existing data
        Fund.objects.all().delete()
        FundReturn.objects.all().delete()

        # Sample AMCs and categories from your existing mock data
        amcs = [
            "HDFC Mutual Fund", "ICICI Prudential", "SBI Mutual Fund",
            "Axis Mutual Fund", "Kotak Mahindra"
        ]

        categories = ["Equity", "Debt", "Hybrid", "Solution Oriented", "Other"]

        # Create sample funds
        for i in range(20):
            fund = Fund.objects.create(
                scheme_name=f"{random.choice(amcs)} {random.choice(['Large Cap', 'Mid Cap', 'Small Cap'])} Fund",
                amc=random.choice(amcs),
                scheme_code=f"FUND{i:03d}",
                nav=round(random.uniform(10, 500), 2),
                category=random.choice(categories),
                expense_ratio=round(random.uniform(0.1, 2.5), 2),
                aum=round(random.uniform(100, 50000), 2),
                aum_category=random.choice(['Small', 'Mid', 'Large']),
                risk_rating=random.randint(1, 5),
                inception_date=datetime.now() - timedelta(days=random.randint(365, 3650))
            )

            # Create returns data for each fund
            periods = ['1Y', '3Y', '5Y']
            for period in periods:
                FundReturn.objects.create(
                    fund=fund,
                    period=period,
                    value=round(random.uniform(-10, 30), 2),
                    as_of_date=datetime.now()
                )

        self.stdout.write(self.style.SUCCESS('Successfully created sample data'))
