from django.urls import re_path
from . import consumers,RideLocationSharingGroup

websocket_urlpatterns = [
    re_path(r'ws/socket-server/RideLocationSharingGroup', RideLocationSharingGroup.RideLocationSharingGroup.as_asgi()),
    re_path(r'ws/socket-server/', consumers.ChatConsumer.as_asgi()),
]