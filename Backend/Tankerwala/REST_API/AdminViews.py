import datetime
import threading
import time
from time import sleep
from threading import Thread
from django.contrib.auth import authenticate
from django.db.models import Q, Count, Sum
from django.http import HttpResponse, JsonResponse
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db.models import F
from django.db.models.functions import ACos, Cos, Radians, Sin, TruncMonth, TruncYear
from django.core import serializers
from .NecessaryFunctions import *
from .CutomAuthentication import CustomTokenAuthentication, AdminTokenAuthentication
from .models import *
from .Searilizer import RideSerializer, VehicleTypeSerializer, RideSerializer2, VehicleSerializer, \
    UserProfileSerializer, AllRidesSerializer
from .Searilizer import *
from .AdminSearilizers import *
import requests as r


def send_message(expo_token, title, body):
    message = {
        'to': expo_token,
        'title': title,
        'body': body
    }
    return r.post('https://exp.host/--/api/v2/push/send', json=message)


@api_view(['POST'])
def login(response):
    data = response.data
    print(data)
    Email = data["name"].replace("\n", "").replace("\r", "").lower().strip()
    password = data["pass"].replace("\n", "").replace("\r", "").strip()

    if Email == "" or password == "":
        return JsonResponse({
            'status': 401,
            "msg": "Email and Password required."
        }, status=404)
    # user = authenticate(username=Email, password=password)
    user = User.objects.get(email=Email, is_active=True)
    print(user)

    if user is None:
        return JsonResponse({
            'status': 404,
            "msg": "Invalid Credentials"
        }, status=404)
    admin = CityAdminUser.objects.filter(user__username=user.username)
    if admin.count() == 0:
        return JsonResponse({
            'status': 404,
            "msg": "Invalid Credentials"
        }, status=404)
    token = Token.objects.get_or_create(user=user)
    return JsonResponse({
        'status': 200,
        "msg": "successfully logged in",
        "data": {
            "token": token[0].key,
            "dp": admin[0].dp.url,
            "name": admin[0].user.first_name + " " + admin[0].user.last_name,
            "email": admin[0].user.email,
            "isNotification": admin[0].isNotification,

        }

    }, status=200)


@api_view(['POST'])
@authentication_classes([AdminTokenAuthentication])
@permission_classes([IsAuthenticated])
def fetchActiveRides(request):
    data = request.data
    page = data["page"]
    dataPerPage = data["count"]
    end = page * dataPerPage
    start = end - dataPerPage
    FilterData = "All"
    if "filter" in data:
        FilterData = data["filter"]
    Search = ""
    if "query" in data:
        Search = data["query"]
    print(FilterData)
    if FilterData.lower() == "All".lower():
        rides = Ride.objects.filter(
            Q(~Q(rider=None) & ~Q(driver=None)), ~Q(rideStatus=Ride.SEARCHING) & Q(
                Q(pickUpAddress__description__icontains=Search) | Q(
                    dropOffAddress__description__icontains=Search))).order_by('-creationDate')[start:end]
    elif FilterData == Ride.IN_PROGRESS:
        rides = Ride.objects.filter(
            Q(~Q(rider=None) & ~Q(driver=None)),
            Q(Q(pickUpAddress__description__icontains=Search) | Q(dropOffAddress__description__icontains=Search)) & Q(
                rideStatus=Ride.IN_PROGRESS) | Q(rideStatus=Ride.RIDE_STARTED) | Q(
                rideStatus=Ride.IH_ARRIVED)).order_by('-creationDate')[start:end]
    elif FilterData == Ride.CANCEL_BY_DRIVER or FilterData == Ride.CANCEL_BY_RIDER:
        rides = Ride.objects.filter(
            Q(~Q(rider=None) & ~Q(driver=None)),
            Q(Q(pickUpAddress__description__icontains=Search) | Q(dropOffAddress__description__icontains=Search)) & Q(
                rideStatus=Ride.CANCEL_BY_RIDER) | Q(rideStatus=Ride.CANCEL_BY_DRIVER)).order_by(
            '-creationDate')[start:end]
    elif FilterData == Ride.COMPLETED:
        rides = Ride.objects.filter(
            Q(~Q(rider=None) & ~Q(driver=None)),
            Q(rideStatus=Ride.COMPLETED) & Q(Q(pickUpAddress__description__icontains=Search) | Q(
                dropOffAddress__description__icontains=Search))).order_by('-creationDate')[start:end]
    return JsonResponse({
        "status": 200,
        "data": RideSerializer(rides, many=True).data
    })


@api_view(['POST'])
@authentication_classes([AdminTokenAuthentication])
@permission_classes([IsAuthenticated])
def getGraphData(request):
    type = request.data["type"]
    data = []
    series = []
    labels = []
    if type == "Monthly":
        starting_day_of_current_year = datetime.datetime.now().date().replace(month=1, day=1)
        ending_day_of_current_year = datetime.datetime.now().date().replace(month=12, day=31)
        o = Ride.objects.filter(creationDate__gte=starting_day_of_current_year,
                                creationDate__lte=ending_day_of_current_year, rideStatus=Ride.COMPLETED) \
            .annotate(month=TruncMonth('creationDate')).values('month').annotate(Amount=Sum('fare')).annotate(
            count=Count('id'))
        for i in o:
            data.append({
                'name': i['month'].strftime('%B'),
                'value': i['Amount']
            })
            series.append(i["count"])
            labels.append(i['month'].strftime('%B'))
    if type == "Yearly":
        o = Ride.objects.filter(rideStatus=Ride.COMPLETED) \
            .annotate(year=TruncYear('creationDate')).values('year').annotate(Amount=Sum('fare')).annotate(
            count=Count('id'))
        for i in o:
            data.append({
                'name': str(i['year']).split("-")[0],
                'value': i['Amount']
            })
            series.append(i["count"])
            labels.append(str(i['year']).split("-")[0])

    return JsonResponse({
        'status': 200,
        'data': data,
        "do": {
            "series": series,
            "labels": labels,
        }

    })


@api_view(['POST'])
@authentication_classes([AdminTokenAuthentication])
@permission_classes([IsAuthenticated])
def getVerfiUser(request):
    data = request.data
    page = data["page"]
    sleep(3)
    query = ""
    if "query" in data:
        query = data["query"]
    status = "PENDING"

    if "authStatus" in data:
        status = data["authStatus"]
    dataPerPage = data["count"]
    end = page * dataPerPage
    start = end - dataPerPage
    drivers = TankerwalaUser.objects.filter(driver_id__authStatus=status, user__email__icontains=query,
                                      user__is_active=True).order_by(
        'creationDate')[start:end]
    print(drivers)
    return JsonResponse({
        "status": 200,
        "data": CityUserSerializerAdmin(drivers, many=True).data
    })


@api_view(['GET'])
@authentication_classes([AdminTokenAuthentication])
@permission_classes([IsAuthenticated])
def GetALLChats(request, id):
    print("GetALLChats being called")
    print("id: ", id)
    ride = Ride.objects.get(id=id)
    chats = Chatting.objects.filter(ride=ride)
    print("chats: ", chats)
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


@api_view(['GET'])
@authentication_classes([AdminTokenAuthentication])
@permission_classes([IsAuthenticated])
def deletCopn(request, id):
    data = request.GET
    action = data["action"]
    ms = ""
    cop = Coupon.objects.get(id=id)
    if action == "Activate":
        cop.isActive = True
        ms = "Activated"
    elif action == "Deactivate":
        cop.isActive = False
        ms = "Deactivated"
    elif action == "Delete Coupon":
        cop.isDeleted = True
        ms = "Deleted"
    cop.save()
    return JsonResponse(
        {
            "status": 200,
            "msg": "coupon  " + ms,
        }
    )


@api_view(['POST'])
@authentication_classes([AdminTokenAuthentication])
@permission_classes([IsAuthenticated])
def ApproveDriver(request):
    data = request.data
    status = data["status"]
    id = data["id"]
    dr = Driver.objects.get(id=id);
    if status == "APPROVED":
        dr.isApproved = True
        dr.authStatus = "APPROVED"
        dr.save()
        cityuser = TankerwalaUser.objects.get(driver_id=dr)
        send_message(cityuser.notificationToken,
                     "Driver Profile Approved",
                     f"Hey {cityuser.user.first_name}!, Your request for CityGo driver signup is Approved.")
        return JsonResponse({
            "status": 200,
            "msg": "User has been Approved"
        })
    elif status == "DECLINED":
        dr.authStatus = "REJECTED"
        dr.save()
        cityuser = TankerwalaUser.objects.get(driver_id=dr)
        send_message(cityuser.notificationToken,
                     "Driver Profile Rejected",
                     f"Hey {cityuser.user.first_name}!, Your request for CityGo driver signup is Rejected.")
        return JsonResponse({
            "status": 200,
            "msg": "User approval has been declined"
        })


@api_view(['POST'])
@authentication_classes([AdminTokenAuthentication])
@permission_classes([IsAuthenticated])
def GetCoupon(request):
    data = request.data
    isActive = data["isActive"]
    query = data["query"]
    all_cop = Coupon.objects.filter(isActive=isActive, Code__icontains=query, isDeleted=False)
    return JsonResponse({
        "status": 200,
        "data": CouponSear(all_cop, many=True).data
    })


@api_view(['POST'])
@authentication_classes([AdminTokenAuthentication])
@permission_classes([IsAuthenticated])
def changePassword(request):
    data = request.data
    oldPass = data["oldPass"]
    newPass = data["newPass"]
    auth = authenticate(username=request.user.username, password=oldPass.strip())
    if auth is None:
        return JsonResponse({
            "status": 300,
            "msg": "old password is not valid"
        })
    auth.set_password(newPass.strip())
    auth.save()
    sleep(1)
    Logs(log="password changed", logType=Logs.PASSWORD_CHANGE).save()

    return JsonResponse({
        "status": 200,
        "msg": "Password Changed Successfully"
    })


@api_view(['GET'])
@authentication_classes([AdminTokenAuthentication])
@permission_classes([IsAuthenticated])
def notifcationOn(request, true):
    s = "Off"
    a = CityAdminUser.objects.get(user__username=request.user.username)
    if true:
        s = "On"
        a.isNotification = True
    else:
        a.isNotification = False
    a.save()
    return JsonResponse({
        "status": 200,
        "msg": f"Notification turned {s}",
    })


@api_view(['POST'])
@authentication_classes([AdminTokenAuthentication])
@permission_classes([IsAuthenticated])
def changeDp(request):
    dp = request.FILES.get("dp")
    A = CityAdminUser.objects.get(user=request.user)
    A.dp = dp
    A.save()

    Logs(log="Dp changed", logType=Logs.DP_CHANGE).save()
    return JsonResponse({
        "status": 200,
        "msg": "Dp Changed Successfully",
        "url": A.dp.url
    })


@api_view(['GET'])
@authentication_classes([AdminTokenAuthentication])
@permission_classes([IsAuthenticated])
def notifications(request):
    print("notifications being called")
    A = CityAdminUser.objects.get(user=request.user)
    print(request.user)

    if A.isNotification:
        logs = Logs.objects.all().order_by("-DateTime")[:30]
        print("logs getting so far: ", logs)
    else:
        logs = []
        logs.append(Logs(logType=Logs.OTHER, log="Notifications are off", id=1, DateTime="-T-"))

    return JsonResponse({
        "status": 200,
        "msg": notificationSerializers(logs, many=True).data
    })


couponID = ""


def sendCouponNotifications():
    coupon = Coupon.objects.get(id=int(couponID))
    print(coupon)
    cityUsers = TankerwalaUser.objects.filter(user__is_active=True)
    print(cityUsers)
    title = f"Enjoy {coupon.discount}% off!!"
    Msg = f"You have got a new Coupon : '{coupon.Code}'\nYou can use this code for {coupon.NoOfRides} ride(s).\nEnjoy discounts :D"
    for cityUser in cityUsers:
        send_message(cityUser.notificationToken, title, Msg)
    return


@api_view(['POST'])
@authentication_classes([AdminTokenAuthentication])
@permission_classes([IsAuthenticated])
def CreateCopen(request):
    global couponID
    data = request.data
    if Coupon.objects.filter(Code=data["Code"].strip()).count() > 0:
        return JsonResponse({
            "status": 303,
            "msg": "Title Already Exist",
        })
    sear = CouponSear(data=data)
    if sear.is_valid():
        sear.save()
        couponID = str(sear.data['id'])
        T = Thread(target=sendCouponNotifications)
        T.start()
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
