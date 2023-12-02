"""
ASGI config for CityGo project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import REST_API.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'CityGo.settings')

application = ProtocolTypeRouter({
    'http':get_asgi_application(),
    'websocket':AuthMiddlewareStack(
        URLRouter(
          REST_API.routing.websocket_urlpatterns
        )
    )
})