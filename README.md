
# Mutual Fund Screener Application

A full-stack application for researching, comparing, and tracking mutual funds with advanced screening and visualization capabilities.

## Features

- Fund screening with multiple filters (category, AMC, returns, expense ratio, etc.)
- Fund comparison tools with interactive charts and 3D visualizations
- Pre-defined screens for quick access to popular fund combinations
- Performance metrics and trend analysis

## Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS with Shadcn UI components
- React Query for data fetching and state management
- React Three Fiber for 3D visualizations
- Recharts for data visualization

### Backend
- Django REST Framework
- SQLite for development (PostgreSQL recommended for production)
- Custom data importing services

## Project Structure

```
├── public/                # Static assets
├── src/
│   ├── backend/           # Django backend code
│   │   ├── fund_api/      # Django project settings
│   │   ├── funds/         # Funds app
│   │   └── ...
│   ├── components/        # React components
│   ├── frontend/          # Frontend-specific code
│   ├── lib/               # Shared utilities and types
│   └── pages/             # Page components
```

## Getting Started

### Frontend

1. Install dependencies:
   ```
   npm install
   ```

2. Start development server:
   ```
   npm run dev
   ```

### Backend

1. Navigate to the backend directory:
   ```
   cd src/backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```
   cp .env.example .env
   # Edit the .env file with your settings
   ```

5. Run migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Load initial data:
   ```
   python fund_data_service.py
   ```

7. Start the development server:
   ```
   python manage.py runserver
   ```

## Deployment

See the deployment guides in the `src/backend/deployment_guide.md` file for detailed instructions on deploying the backend.

## API Endpoints

- `GET /api/funds/` - List and filter mutual funds
- `GET /api/funds/{id}/` - Get details for a specific fund
- `GET /api/top-funds/` - Get top performing funds
- `GET /api/amcs/` - Get list of all AMCs
- `GET /api/refresh-data/` - Refresh fund data from external API

## License

MIT
