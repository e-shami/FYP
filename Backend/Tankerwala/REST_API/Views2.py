import datetime
from time import sleep

from django.contrib.auth import authenticate
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db.models import F
from django.db.models.functions import ACos, Cos, Radians, Sin
from django.core import serializers
from .NecessaryFunctions import *
from .AdminViews import send_message as sendNotification
from .CutomAuthentication import CustomTokenAuthentication
from .models import *
from .Searilizer import RideSerializer, VehicleTypeSerializer


# from django.contrib.gis.measure import D
# from django.contrib.gis.geos import *


@api_view(['POST'])
@authentication_classes([CustomTokenAuthentication])
@permission_classes([IsAuthenticated])
def rideAccepted(request):
    data = request.data
    Driver = CityUser.objects.get(user=request.user)
    ride = Ride.objects.filter(rideStatus=Ride.SEARCHING, id=data["id"])
    if ride.count() == 0:
        return JsonResponse({
            "status": 111,
            "msg": "Ride not found"
        })
    ride = ride[0]
    ride.rideStatus = Ride.IN_PROGRESS
    ride.driver = Driver
    receiver = ride.rider
    sendNotification(receiver.notificationToken, f"Driver found for your ride [{ride.groupId}]",
                     f"{ride.driver.user.first_name} will arrive at your location soon.")
    cur = CurrentLocation(longitude=data["long"], latitude=data["lat"])
    cur.save()
    ride.driverLocation = cur
    ride.save()
    return JsonResponse({
        "status": 112,
        "msg": RideSerializer(ride).data
    })


@api_view(['GET'])
@authentication_classes([CustomTokenAuthentication])
@permission_classes([IsAuthenticated])
def checkOnGoingRide(request):
    ride = Ride.objects.filter(Q(driver__user__id=request.user.id) & Q(rideStatus=Ride.IN_PROGRESS)| Q(rideStatus=Ride.RIDE_STARTED)|Q(rideStatus=Ride.IH_ARRIVED))
    print(ride)
    if ride.count() == 0:
        return JsonResponse({
            "status": 111,
            "msg": "Ride not found"
        })
    return JsonResponse({
        "status": 112,
        "msg": RideSerializer(ride[0]).data
    })
