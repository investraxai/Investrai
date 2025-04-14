
from django.db import connections
from django.db.utils import OperationalError
import logging

logger = logging.getLogger(__name__)

def check_database_connection():
    """
    Check if the database connection is working.
    Returns True if connected, False otherwise.
    """
    try:
        connections['default'].cursor()
        return True
    except OperationalError:
        logger.error("Database connection failed")
        return False

def get_connection_info():
    """
    Get information about the current database connection.
    """
    try:
        db_settings = connections['default'].settings_dict
        return {
            'engine': db_settings['ENGINE'].split('.')[-1],
            'name': db_settings['NAME'],
            'host': db_settings.get('HOST', 'local'),
            'port': db_settings.get('PORT', 'default')
        }
    except Exception as e:
        logger.error(f"Error getting database info: {str(e)}")
        return None
