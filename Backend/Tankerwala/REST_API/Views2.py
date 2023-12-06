import datetime
from time import sleep

from django.contrib.auth import authenticate
from django.db.models import Q, Avg
from django.http import HttpResponse, JsonResponse
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db.models import F
from django.db.models.functions import ACos, Cos, Radians, Sin, ExtractMinute, ExtractHour, ExtractDay, ExtractMonth
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
    Driver = TankerwalaUser.objects.get(user=request.user)
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

def GenrateLastMonthDataForEverMin(userId):
    valueRange = (90, 10)
    lastMonth = datetime.datetime.now() - datetime.timedelta(days=30)
    user = TankerwalaUser.objects.get(user_id=userId)
    for i in range(0, 30):
        for j in range(0, 24):
            for k in range(0, 60):
                level = random.randint(valueRange[1], valueRange[0])
                waterTankLevel.objects.create(user=user, level=level, creationDate=lastMonth)
                lastMonth = lastMonth + datetime.timedelta(minutes=1)



@api_view(['GET'])
@authentication_classes([CustomTokenAuthentication])
@permission_classes([IsAuthenticated])
def waterTankLevelHistory(request):
    filterType = request.GET.get("filterType", "LAST_30_MIN")
    all_records = waterTankLevel.objects.filter(user__user=request.user.id)

    lastReading = waterTankLevel()
    if (all_records.count() > 0):
        lastReading = all_records.order_by('-creationDate')[0]
    estimatedRemainingTime = "24+"
    record = []
    if "LAST_30_MIN" == filterType:
        all_records = all_records.filter(
            creationDate__range=[datetime.datetime.now() - datetime.timedelta(minutes=30), datetime.datetime.now()])

        all_records = all_records.annotate(
            minute=ExtractMinute('creationDate'),
            hour=ExtractHour('creationDate'),
        ).values('minute', "hour").annotate(
            tankeLevel=Avg('level')
        ).order_by('-minute', '-hour')
        avgLoss = all_records.aggregate(Avg('level'))
        # if the avg loss in 30 mins is avgLoss then calculate the remaining time
        if avgLoss["level__avg"] is not None and avgLoss["level__avg"] > 0:
            estimatedRemainingTime = (lastReading.level / avgLoss["level__avg"]) * 30
        #     estimated remaining time in hours
            estimatedRemainingTime = estimatedRemainingTime / 60
            estimatedRemainingTime = round(estimatedRemainingTime, 1)

        record = list(all_records)

    elif "LAST_24_HOURS" == filterType:
        all_records = all_records.filter(
            creationDate__range=[datetime.datetime.now() - datetime.timedelta(hours=24), datetime.datetime.now()])
        # eliminating duplicate records
        all_records = all_records.annotate(
            hour=ExtractHour('creationDate'),
            day=ExtractDay('creationDate'),
        ).values("hour", "day").annotate(
            tankeLevel=Avg('level')
        ).order_by('-hour', '-day')
        record = list(all_records)

    elif "LAST_7_DAYS" == filterType:
        all_records = all_records.filter(
            creationDate__range=[datetime.datetime.now() - datetime.timedelta(days=7), datetime.datetime.now()])
        # eliminating duplicate records
        all_records = all_records.annotate(
            day=ExtractDay('creationDate'),
            month=ExtractMonth('creationDate'),
        ).values("day", "month").annotate(
            tankeLevel=Avg('level')
        ).order_by('-day')
        record = list(all_records)
    elif "LAST_30_DAYS" == filterType:
        all_records = all_records.filter(
            creationDate__range=[datetime.datetime.now() - datetime.timedelta(days=30), datetime.datetime.now()])
        # eliminating duplicate records
        all_records = all_records.annotate(
            day=ExtractDay('creationDate'),
            month=ExtractMonth('creationDate'),
        ).values("day", "month").annotate(
            tankeLevel=Avg('level')
        ).order_by('-day')
        record = list(all_records)

    
    print(record)
    

    return JsonResponse({
        "status": 200,
        "msg": record if len(record) > 0 else [],
        "lastReading": lastReading.level,
        "totalCapacity": "1000",
        "estimatedRemainingTime": estimatedRemainingTime
    })



@api_view(['GET'])
def updateTankLevel(request):
    data = request.GET
    userId = data.get("userId", None)
    distanceInMeters = float(data.get("distanceInMeters", None))
    tankHeight = float(data.get("tankHeight", None))
    calculatedCapacity = (tankHeight - distanceInMeters)/tankHeight*100
    try:
        user = TankerwalaUser.objects.get(user=userId)
        myWaterTankLevel = waterTankLevel()
        myWaterTankLevel.user = user
        myWaterTankLevel.totalCapacity = tankHeight
        myWaterTankLevel.level = calculatedCapacity
        myWaterTankLevel.creationDate = datetime.datetime.now()
        myWaterTankLevel.save()

        try:
            if myWaterTankLevel.level < 40 and user.lastWaterLevelNotification is None:
                sendNotification(user.notificationToken, "Water Tank Level", "Water tank is level is low.")
                user.lastWaterLevelNotification = datetime.datetime.now()
            elif myWaterTankLevel.level < 40 and user.lastWaterLevelNotification < datetime.datetime.now() - datetime.timedelta(
                    minutes=10):
                sendNotification(user.notificationToken, "Water Tank Level", "Water tank is level is low.")
                user.lastWaterLevelNotification = datetime.datetime.now()
        except:
            pass


    except TankerwalaUser.DoesNotExist:
        return JsonResponse({
            "status": 111,
            "msg": "User not found"
        })

    return JsonResponse({
        "status": 200,
        "msg": "Tank level updated"
    })
