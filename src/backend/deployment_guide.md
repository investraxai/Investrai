
# Deployment Guide for Mutual Fund Screener Backend

This guide outlines the steps to deploy the Django backend for the Mutual Fund Screener application.

## Prerequisites

- Python 3.8+ installed on your server
- pip package manager
- A web server (e.g., Nginx or Apache) for production deployment
- PostgreSQL (optional, for production environments)

## Local Development Deployment

1. Clone the repository
2. Set up a virtual environment:
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
7. Run the development server:
   ```
   python manage.py runserver
   ```

## Production Deployment

### Option 1: Standard VPS/Server Deployment

1. Set up a server with Python installed
2. Clone the repository to your server
3. Set up a virtual environment and install dependencies as in the local development steps
4. Create a production `.env` file with:
   ```
   DEBUG=False
   ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
   SECRET_KEY=a-long-random-string
   ```
5. Set up PostgreSQL and update the database settings in `.env`
6. Run migrations and load initial data
7. Set up Gunicorn:
   ```
   gunicorn fund_api.wsgi:application --bind 0.0.0.0:8000
   ```
8. Configure Nginx as a reverse proxy to Gunicorn:
   ```
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;
       
       location /static/ {
           root /path/to/your/project;
       }
       
       location / {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```
9. Set up SSL with Let's Encrypt
10. Set up a systemd service to manage Gunicorn

### Option 2: Docker Deployment

1. Create a Dockerfile:
   ```
   FROM python:3.9-slim
   
   WORKDIR /app
   
   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt
   
   COPY . .
   
   RUN python manage.py collectstatic --noinput
   
   EXPOSE 8000
   
   CMD ["gunicorn", "fund_api.wsgi:application", "--bind", "0.0.0.0:8000"]
   ```
2. Create a docker-compose.yml file:
   ```
   version: '3'
   
   services:
     db:
       image: postgres:13
       volumes:
         - postgres_data:/var/lib/postgresql/data/
       env_file:
         - .env
       environment:
         - POSTGRES_PASSWORD=${DB_PASSWORD}
         - POSTGRES_USER=${DB_USER}
         - POSTGRES_DB=${DB_NAME}
     
     web:
       build: .
       restart: always
       depends_on:
         - db
       env_file:
         - .env
       volumes:
         - static_volume:/app/staticfiles
       command: >
         sh -c "python manage.py migrate &&
                python fund_data_service.py &&
                gunicorn fund_api.wsgi:application --bind 0.0.0.0:8000"
     
     nginx:
       image: nginx:1.19
       ports:
         - "80:80"
       volumes:
         - ./nginx/conf.d:/etc/nginx/conf.d
         - static_volume:/app/staticfiles
       depends_on:
         - web
   
   volumes:
     postgres_data:
     static_volume:
   ```
3. Build and run with Docker Compose:
   ```
   docker-compose up -d
   ```

### Option 3: Platform as a Service (PaaS)

1. **Heroku Deployment**
   - Create a Procfile:
     ```
     release: python manage.py migrate
     web: gunicorn fund_api.wsgi --log-file -
     ```
   - Add Django-Heroku to requirements.txt
   - Configure Heroku PostgreSQL add-on
   - Deploy using Git:
     ```
     heroku create
     git push heroku main
     heroku run python fund_data_service.py
     ```

2. **DigitalOcean App Platform**
   - Create an App Spec file
   - Connect your repository
   - Configure environment variables
   - Deploy the application

## Scheduled Data Updates

To keep fund data updated regularly:

1. Create a cron job:
   ```
   0 2 * * * cd /path/to/your/project && /path/to/venv/bin/python fund_data_service.py >> /var/log/fund_update.log 2>&1
   ```

2. Or for Docker:
   ```
   docker-compose exec web python fund_data_service.py
   ```

3. For Heroku:
   ```
   heroku run python fund_data_service.py
   ```

## Connecting Frontend to Backend

1. In your React application, set the API_BASE_URL environment variable to point to your deployed backend

2. For production, you might want to serve the React frontend from the same domain to avoid CORS issues

3. Ensure your backend CORS settings allow requests from your frontend domain
