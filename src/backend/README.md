
# Mutual Fund Screener Backend

This is the Django REST Framework backend for the Mutual Fund Screener application.

## Setup Instructions

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file from the example:
   ```
   cp .env.example .env
   ```
   Then edit the `.env` file with your specific settings.

5. Run migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Create a superuser:
   ```
   python manage.py createsuperuser
   ```

7. Load initial data:
   ```
   python fund_data_service.py
   ```

8. Run development server:
   ```
   python manage.py runserver
   ```

The API will be available at http://127.0.0.1:8000/api/

## API Endpoints

- `GET /api/funds/` - List all mutual funds
- `GET /api/funds/{id}/` - Get details for a specific fund
- `GET /api/top-funds/` - Get top performing funds
- `GET /api/amcs/` - Get list of all AMCs
- `GET /api/refresh-data/` - Refresh fund data from external API

## Filtering Examples

- Get equity funds: `/api/funds/?category=Equity`
- Filter by AMC: `/api/funds/?amc=HDFC%20Mutual%20Fund`
- Minimum 1Y return: `/api/funds/?minReturn1Y=15`
- Search by name: `/api/funds/?searchQuery=Bluechip`

## Admin Interface

Access the admin interface at http://127.0.0.1:8000/admin/

## Data Provider Integration

1. Add a Data Provider in the admin interface with your API credentials
2. Make it active to use it for data fetching
