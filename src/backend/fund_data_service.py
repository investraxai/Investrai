
"""
Script to fetch and update mutual fund data from external APIs
"""
import os
import sys
import django
import requests
import pandas as pd
from datetime import datetime, timedelta

# Set up Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fund_api.settings')
django.setup()

from funds.models import Fund, FundReturn, DataProvider, FundCategory, AumCategory, RiskRating

def fetch_funds_from_api():
    """Fetch mutual fund data from external API"""
    try:
        # Get active data provider
        provider = DataProvider.objects.filter(is_active=True).first()
        if not provider:
            print("No active data provider found")
            return None
            
        # In a real implementation, you would make API calls like:
        # response = requests.get(
        #     f"{provider.base_url}/funds",
        #     headers={"Authorization": f"Bearer {provider.api_key}"}
        # )
        
        # For development purposes, we'll create sample data
        # This simulates data that would come from a real API
        print("Fetching sample fund data...")
        sample_funds = _create_sample_fund_data()
        return sample_funds
        
    except Exception as e:
        print(f"Error fetching fund data: {str(e)}")
        return None

def update_database(funds_data):
    """Update database with latest fund data"""
    if not funds_data:
        return False
        
    try:
        funds_updated = 0
        funds_created = 0
        returns_updated = 0
        
        for fund_data in funds_data:
            # Get or create fund
            fund, created = Fund.objects.update_or_create(
                scheme_code=fund_data['scheme_code'],
                defaults={
                    'scheme_name': fund_data['scheme_name'],
                    'amc': fund_data['amc'],
                    'nav': fund_data['nav'],
                    'category': fund_data['category'],
                    'sub_category': fund_data.get('sub_category'),
                    'expense_ratio': fund_data['expense_ratio'],
                    'aum': fund_data['aum'],
                    'aum_category': fund_data['aum_category'],
                    'risk_rating': fund_data['risk_rating'],
                    'inception_date': fund_data['inception_date'],
                    'fund_manager': fund_data.get('fund_manager'),
                    'min_sip_amount': fund_data.get('min_sip_amount'),
                    'min_lumpsum': fund_data.get('min_lumpsum'),
                    'exit_load': fund_data.get('exit_load')
                }
            )
            
            if created:
                funds_created += 1
            else:
                funds_updated += 1
                
            # Update returns data
            for period, value in fund_data['returns'].items():
                fund_return, _ = FundReturn.objects.update_or_create(
                    fund=fund,
                    period=period,
                    defaults={
                        'value': value,
                        'as_of_date': datetime.now().date()
                    }
                )
                returns_updated += 1
                
        print(f"Database updated: {funds_created} funds created, {funds_updated} funds updated, {returns_updated} return entries")
        return True
    except Exception as e:
        print(f"Error updating database: {str(e)}")
        return False

def _create_sample_fund_data():
    """Create sample fund data for development"""
    sample_funds = []
    
    # AMCs
    amcs = [
        "HDFC Mutual Fund", "ICICI Prudential", "SBI Mutual Fund", 
        "Axis Mutual Fund", "Kotak Mahindra", "Aditya Birla Sun Life",
        "Nippon India", "Mirae Asset", "DSP", "UTI"
    ]
    
    # Fund types and subcategories
    fund_types = {
        FundCategory.EQUITY: ["Large Cap", "Mid Cap", "Small Cap", "Multi Cap", "ELSS", "Focused", "Sectoral"],
        FundCategory.DEBT: ["Liquid", "Ultra Short Duration", "Short Duration", "Corporate Bond", "Banking & PSU", "Gilt"],
        FundCategory.HYBRID: ["Aggressive Hybrid", "Conservative Hybrid", "Balanced Advantage", "Multi Asset Allocation"],
        FundCategory.SOLUTION_ORIENTED: ["Retirement Fund", "Children's Fund"],
        FundCategory.OTHER: ["Index Fund", "ETF", "Fund of Funds"]
    }
    
    # Generate 50 sample funds
    for i in range(1, 51):
        amc = amcs[i % len(amcs)]
        scheme_code = f"SCH{i:04d}"
        category_key = list(fund_types.keys())[i % len(fund_types)]
        category = category_key
        sub_category = fund_types[category_key][i % len(fund_types[category_key])]
        
        # Calculate AUM and AUM category
        aum = round((i * 1234.56) % 50000 + 100, 2)
        if aum < 1000:
            aum_category = AumCategory.SMALL
        elif aum < 10000:
            aum_category = AumCategory.MID
        else:
            aum_category = AumCategory.LARGE
            
        # Calculate returns (with some randomness)
        one_y_return = round(((i * 7) % 30) - 5 + (i % 10), 2)  # -5% to 25%
        three_y_return = round(one_y_return * 0.8 + 2, 2)  # Related to 1Y but different
        five_y_return = round(one_y_return * 0.7 + three_y_return * 0.3 + 1, 2)  # Mix of 1Y and 3Y
        
        # Risk rating (1-5)
        risk_rating = (i % 5) + 1
        
        # Expense ratio (0.1% to 2.5%)
        expense_ratio = round(0.1 + (i % 25) * 0.1, 2)
        
        # Inception date (between 1 and 20 years ago)
        years_ago = (i % 20) + 1
        inception_date = (datetime.now() - timedelta(days=years_ago*365)).strftime('%Y-%m-%d')
        
        fund = {
            "scheme_name": f"{amc} {sub_category} Fund Series {i}",
            "amc": amc,
            "scheme_code": scheme_code,
            "nav": round(((i * 27.35) % 500) + 10, 2),
            "category": category,
            "sub_category": sub_category,
            "expense_ratio": expense_ratio,
            "aum": aum,
            "aum_category": aum_category,
            "risk_rating": risk_rating,
            "inception_date": inception_date,
            "fund_manager": f"Portfolio Manager {(i % 10) + 1}",
            "min_sip_amount": (i % 10) * 100 + 500,
            "min_lumpsum": (i % 10) * 1000 + 1000,
            "exit_load": "1% if redeemed within 1 year" if i % 3 == 0 else "Nil",
            "returns": {
                "1Y": one_y_return,
                "3Y": three_y_return,
                "5Y": five_y_return
            }
        }
        sample_funds.append(fund)
    
    return sample_funds

def main():
    """Main function to fetch and update fund data"""
    print("Fetching fund data...")
    funds_data = fetch_funds_from_api()
    
    if funds_data:
        print(f"Fetched {len(funds_data)} funds. Updating database...")
        success = update_database(funds_data)
        if success:
            print("Database updated successfully")
        else:
            print("Failed to update database")
    else:
        print("No fund data fetched")

if __name__ == "__main__":
    main()
