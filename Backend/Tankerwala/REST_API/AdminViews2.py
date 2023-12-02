import datetime
import time
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
from .CutomAuthentication import CustomTokenAuthentication
from .models import *
from .Searilizer import RideSerializer, VehicleTypeSerializer, RideSerializer2, VehicleSerializer, \
    UserProfileSerializer, AllRidesSerializer
from .Searilizer import *
from .AdminSearilizers import *


@api_view(['POST'])
def getClients(request):
    data = request.data
    print(data)
    page = data["page"]
    dataPerPage = data["count"]
    end = page * dataPerPage
    start = end - dataPerPage

    if data['type'] == "customers":
        users = CityUser.objects.filter(user__is_active=True, driver_id=None)
        maxPages = (users.count()/dataPerPage)+1
        users = users[start:end]
        print(users)
        return JsonResponse({
            "status": 200,
            "data": UserSerializer(users,many=True).data,
            "maxPages":maxPages
        })

    elif data['type'] == "drivers":
        users = CityUser.objects.filter(Q(user__is_active=True), ~Q(driver_id=None))
        print(users)

        maxPages = (users.count() / dataPerPage) + 1
        users = users[start:end]
        return JsonResponse({
            "status": 200,
            "data": UserSerializer(users, many=True).data,
            "maxPages": maxPages
        })

    return JsonResponse({
        "status": 404,
        "data": 404
    })


@api_view(['POST'])
def searchClient(request):
    data = request.data
    print(data)
    query=data['query'].strip()
    page = data["page"]
    dataPerPage = data["count"]
    end = page * dataPerPage
    start = end - dataPerPage

    if data['type'] == "customers":
        users = CityUser.objects.filter(Q(user__is_active=True),Q(driver_id=None),
            Q(user__first_name__icontains=query) |
            Q(user__email__icontains=query) |
            Q(phoneNumber__icontains=query)
        )
        maxPages = (users.count()/dataPerPage)+1
        users = users[start:end]
        print(users)
        return JsonResponse({
            "status": 200,
            "data": UserSerializer(users,many=True).data,
            "maxPages":maxPages
        })

    elif data['type'] == "drivers":
        users = CityUser.objects.filter(Q(user__is_active=True),~Q(driver_id=None),
        Q(user__first_name__icontains=query) |
            Q(user__email__icontains=query) |
            Q(phoneNumber__icontains=query)
            )
        maxPages = (users.count() / dataPerPage) + 1
        users = users[start:end]
        print(users)
        return JsonResponse({
            "status": 200,
            "data": UserSerializer(users, many=True).data,
            "maxPages": maxPages
        })

    return JsonResponse({
        "status": 404,
        "data": 404
    })


@api_view(['POST'])
def getVerfiUser(request):
    data = request.data
    page = data["page"]
    dataPerPage = data["count"]
    end = page * dataPerPage
    start = end - dataPerPage

    drivers = CityUser.objects.filter(driver_id__isApproved=False).order_by('creationDate')[start:end]
    return JsonResponse({
        "status": 200,
        "data": CityUserSerializerAdmin(drivers, many=True).data
    })


@api_view(['GET'])
def GetALLChats(request, id):
    ride = Ride.objects.get(id=id)
    chats = Chatting.objects.filter(ride=ride)
    messages = []
    for chat in chats:
        messages.append({
            "src": chat.user.dp.url,
            "name": chat.user.user.first_name + " " + chat.user.user.last_name,
            "text": chat.message,
            "time": str(chat.time)[:5],
            "date": chat.date,
            "isDriver": ride.driver.id == chat.user.id,
        })

    return JsonResponse(
        {
            "status": 200,
            "msg": messages,
        }
    )


@api_view(['POST'])
def ApproveDriver(request):
    data = request.data
    status = data["status"]
    id = data["id"]
    dr = Driver.objects.get(id=id);
    if status == "APPROVED":
        dr.isApproved = True
        dr.save()
        return JsonResponse({
            "status": 200,
            "msg": "User has been Approved"
        })
    elif status == "DECLINED":
        dr.isApproved = False
        dr.save()
        return JsonResponse({
            "status": 200,
            "msg": "User approval has been declined"
        })


@api_view(['GET'])
def deleteUser(request,id):
    try:
        user = User.objects.get(id=id)
        user.is_active=False
        user.save()
        return JsonResponse({
            "status": 200,
            "data": "Successfully Deleted"
        })
    except Exception as e:
        print(e)
        return JsonResponse({
            "status": 403,
            "data": "Error deleting profile"
        })

@api_view(['POST'])
def CreateCopen(request):
    data = request.data
    if Coupon.objects.filter(Code=data["Code"].strip()).count() > 0:
        return JsonResponse({
            "status": 303,
            "msg": "Title Already Exist",
        })
    sear = CouponSear(data=data)
    if sear.is_valid():
        sear.save()
        return JsonResponse({
            "status": 200,
            "msg": "Coupon Created Successfully",
        })
    Errors = ""
    for key, values in sear.errors.items():
        error = [value[:] for value in values]
        Errors += str(error[0]).replace("This", key) + " - "

    return JsonResponse({
        "status": 303,
        "msg": Errors,
    })
