import datetime
from time import sleep

from django.contrib.auth import authenticate
from django.db.models import Q, Avg, Sum
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
from .secretCodes import *

# from django.contrib.gis.measure import D
# from django.contrib.gis.geos import *


# Create your views here.

@api_view(['POST'])
def resetPass(request):
    try:
        data = request.data
        phone = data['phone'].strip()
        cityUser = TankerwalaUser.objects.filter(phoneNumber=phone)
        if cityUser.count() > 0:
            cityUser = cityUser[0]
            Otp = OTP.objects.filter(user=cityUser)
            otp = genOTP(4)
            if Otp.count() != 0:
                Otp = Otp[0]
                Otp.code = otp
                Otp.isOtpVerified = False
                Otp.save()
            else:
                newOTP = OTP(user=cityUser, isOtpVerified=False, code=otp)
                newOTP.save()
            msg = "Hey " + cityUser.user.first_name.strip() + "!, you requested password reset. Your OTP code for " \
                                                              "Tankerwala " \
                                                              "is " + otp + ". If that wasn't you just ignore the " \
                                                                            "msg. :) "
            print(cityUser.phoneNumber)
            print(msg)
            sendMsg(acc_sid=TwilioAccSID, auth_token=authToken, body=msg, sender=sender, receiver=cityUser.phoneNumber)
            token = Token.objects.get_or_create(user=cityUser.user)
            return JsonResponse({
                'status': 200,
                "msg": "OTP sent",
                "token": token[0].key
            })
        else:
            return JsonResponse({
                'status': 404,
                "msg": "Can't find any account linked to " + phone,
            })
    except Exception as e:
        print(e)
        return JsonResponse({
            'status': 404,
            "msg": "Error occurred",
        })


@api_view(['POST'])
def login(response):
    data = response.POST
    Email = data["email"].replace("\n", "").replace("\r", "").lower().strip()
    password = data["password"].replace("\n", "").replace("\r", "").strip()
    notificationToken = data['notificationToken'].strip()

    if Email == "" or password == "":
        return JsonResponse({
            'status': 401,
            "msg": "Email and Password required."
        }, status=404)
    print(Email, password)
    try:
        user = User.objects.get(email=Email)
    except User.DoesNotExist:
        return JsonResponse({
            'status': 404,
            "msg": "User does not exists with this email"
        }, status=404)
    user = authenticate(username=Email, password=password)
    print(user)
    if user is None:
        return JsonResponse({
            'status': 404,
            "msg": "Invalid Credentials"
        }, status=404)
    else:
        token = Token.objects.get_or_create(user=user)
        cityUser = TankerwalaUser.objects.get(user=user)
        cityUser.notificationToken = notificationToken
        print(notificationToken)
        cityUser.save()
        Otp = OTP.objects.filter(user=cityUser)
        otp = genOTP(4)
        if Otp.count() != 0:
            Otp = Otp[0]
            Otp.code = otp
            Otp.isOtpVerified = False
            Otp.save()
        else:
            newOTP = OTP(user=cityUser, isOtpVerified=False, code=otp)
            newOTP.save()
        msg = "Hey " + user.first_name.strip() + "!, Your OTP code for Tankerwala is " + otp + ". Don't share OTP with anyone else."
        print(cityUser.phoneNumber)
        print(msg)
        # exception = sendMsg(acc_sid=TwilioAccSID, auth_token=authToken, body=msg, sender=sender, receiver=cityUser.phoneNumber)
        # if exception is not None:
        #     return JsonResponse({
        #         'status': 404,
        #         "msg": str(exception.msg)
        #     }, status=404)
        
        return JsonResponse({
            'status': 200,
            "msg": "successfully logged in",
            "token": token[0].key,
            "notificationToken":notificationToken
        }, status=200)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def resendOTP(request):
    print(request.user)
    user = request.user
    cityUser = TankerwalaUser.objects.get(user=user)
    Otp = OTP.objects.filter(user=cityUser)
    otp = genOTP(4)
    if Otp.count() != 0:
        Otp = Otp[0]
        Otp.code = otp
        Otp.isOtpVerified = False
        Otp.save()
    else:
        newOTP = OTP(user=cityUser, isOtpVerified=False, code=otp)
        newOTP.save()
    msg = "Hey " + user.first_name.strip() + "!, Your OTP code for City Go is " + otp + ". Don't share OTP with anyone else."
    print(cityUser.phoneNumber)
    print(msg + "\n")
    sendMsg(acc_sid=TwilioAccSID, auth_token=authToken, body=msg, sender=sender, receiver=cityUser.phoneNumber)

    return JsonResponse({
        'status': 200,
        "msg": "OTP Resent",
    }, status=200)


@api_view(['POST'])
def signupAsRider(request):
    try:
        data = request.POST
        print(data)
        print("Files", request.FILES)
        isDriver = data["isDriver"].replace("\n", "").replace("\r", "").strip()
        name = data["name"].replace("\n", "").replace("\r", "").strip()
        phone = data["phoneNo"].replace("\n", "").replace("\r", "").strip()
        city = data["city"].replace("\n", "").replace("\r", "").strip()
        Email = data["email"].replace("\n", "").replace("\r", "").lower().strip()
        password = data["password"].replace("\n", "").replace("\r", "").strip()
        check = TankerwalaUser.objects.filter(Q(phoneNumber=phone) | Q(user__email=Email)).count()
        checkUser = User.objects.filter(email=Email).count()
        if check == 0 and checkUser == 0:

            user = User.objects.create_user(username=Email, email=Email, first_name=name)
            user.set_password(password)
            user.save()
            wallet = Wallet(balance=0.0)
            wallet.save()
            newReg = TankerwalaUser(user=user, phoneNumber=phone, cityName=city, wallet=wallet)
            newReg.save()
            
            return JsonResponse({
                'status': 200,
                "msg": "Account Created Successfully",
                'id': newReg.id,
            })
        else:
            return JsonResponse({
                'status': 401,
                "msg": "Email or Phone No. already exists",

            })

    except Exception as e:
        print(e)
        return JsonResponse({
            'status': 403,
            "msg": "Invalid Request",

        })

@api_view(['POST'])
def signup(request):
    try:
        data = request.POST
        print(data)
        print("Files", request.FILES)
        isDriver = data["isDriver"].replace("\n", "").replace("\r", "").strip()
        name = data["name"].replace("\n", "").replace("\r", "").strip()
        phone = data["phoneNo"].replace("\n", "").replace("\r", "").strip()
        city = data["city"].replace("\n", "").replace("\r", "").strip()
        Email = data["email"].replace("\n", "").replace("\r", "").lower().strip()
        password = data["password"].replace("\n", "").replace("\r", "").strip()
        check = TankerwalaUser.objects.filter(Q(phoneNumber=phone) | Q(user__email=Email)).count()
        checkUser = User.objects.filter(email=Email).count()
        print(check)
        if check == 0 and checkUser == 0:

            print(isDriver)
            if isDriver == "false":
                user = User.objects.create_user(username=Email, email=Email, first_name=name)
                user.set_password(password)
                user.save()
                wallet = Wallet(balance=0.0)
                wallet.save()
                newReg = TankerwalaUser(user=user, phoneNumber=phone, cityName=city, wallet=wallet)
                newReg.save()
            else:
                carColor = data["carColor"].replace("\n", "").replace("\r", "").strip()
                vehicleCompany = data["vehicleCompany"].replace("\n", "").replace("\r", "").strip()
                vehicleType = data["vehicleType"].replace("\n", "").replace("\r", "").strip()

                vehicleType = VehicleType.objects.get(id=1)
                vehicleYear = data["vehicleYear"].replace("\n", "").replace("\r", "").strip()

                licensePlate = data["licensePlate"].replace("\n", "").replace("\r", "").strip()

                NationIdCardNo = data["NationIdCardNo"].replace("\n", "").replace("\r", "").strip()

                DriversLicense = data["DriversLicense"].replace("\n", "").replace("\r", "").strip()

                DriversLicenseExpiry = data["DriversLicenseExpiry"].replace("\n", "").replace("\r", "").strip()
                year = int(DriversLicenseExpiry.split(" ")[2])
                month = int(mtn(DriversLicenseExpiry.split(" ")[1]))
                day = int(DriversLicenseExpiry.split(" ")[0])
                datetime.datetime(year, month, day)
                DriversLicenseExpiry = datetime.datetime(year, month, day)

                DriversLicenseDoc = request.FILES.get('DriversLicenseImg')

                vehicleImg = request.FILES.get('vehicalPicture')

                vehicleRegistrationFile = request.FILES.get('vehicalRegisterationDocs')

                selfie = request.FILES.get('selfie')

                vehicle = Vehicle(vehicleRegistrationFile=vehicleRegistrationFile, vehicleImg=vehicleImg,
                                  color=carColor,company=vehicleCompany,
                                  numberPlate=licensePlate,
                                  model=vehicleYear, vehicleType=vehicleType)

                driver = Driver(vehicle=vehicle, cnic=NationIdCardNo, driverLicenseNumber=DriversLicense,
                                driverLicenseExpiry=datetime.date.today(), driverLicenseImg=DriversLicenseDoc,
                                isApproved=False)

                user = User.objects.create_user(username=Email, email=Email, first_name=name)
                user.set_password(password)

                wallet = Wallet(balance=0.0)

                newReg = TankerwalaUser(user=user, phoneNumber=phone, cityName=city, wallet=wallet, driver_id=driver,
                                  dp=selfie)
                user.save()
                vehicle.save()
                driver.save()
                wallet.save()
                newReg.save()
                print(city, driver, user, wallet, selfie)
                print("saving user")

            return JsonResponse({
                'status': 200,
                "msg": "Account Created Successfully",
                'id': newReg.id,
            })
        else:
            return JsonResponse({
                'status': 401,
                "msg": "Email or Phone No. already exists",

            })
    except Exception as e:
        print(e)
        return JsonResponse({
            'status': 403,
            "msg": "Invalid Request",

        })


@api_view(['POST'])
@authentication_classes([CustomTokenAuthentication])
@permission_classes([IsAuthenticated])
def anyView(request):
    return JsonResponse({

        "msg": "Done"
    })


@api_view(['POST'])
@authentication_classes([CustomTokenAuthentication])
@permission_classes([IsAuthenticated])
def getAllRides(request):
    cityUser = TankerwalaUser.objects.get(user=request.user, )
    data = request.data
    if data['type'] == "asDriver":
        rides = Ride.objects.filter(driver=cityUser, rideStatus=Ride.COMPLETED)
        data = {
            "status": 200,
            "rides": AllRidesSerializer(rides, many=True).data
        }
        return JsonResponse(data)
    elif data['type'] == "asRider":
        rides = Ride.objects.filter(rider=cityUser, rideStatus=Ride.COMPLETED)
        data = {
            "status": 200,
            "rides": AllRidesSerializer(rides, many=True).data
        }
        return JsonResponse(data)


@api_view(['GET'])
@authentication_classes([CustomTokenAuthentication])
@permission_classes([IsAuthenticated])
def getProfileDetails(request):
    cityUser = TankerwalaUser.objects.get(user=request.user)
    if cityUser.driver_id is not None:
        vehicle = cityUser.driver_id.vehicle
        vehicle = VehicleSerializer(vehicle).data
        print(vehicle)
        return JsonResponse({
            "status": 200,
            "user": UserProfileSerializer(cityUser).data,
            "isDriver": "true",
            "vehicle": vehicle

        })
    else:
        return JsonResponse({
            "status": 200,
            "user": UserProfileSerializer(cityUser).data,
            "isDriver": "false"
        })


@api_view(['POST'])
@authentication_classes([CustomTokenAuthentication])
@permission_classes([IsAuthenticated])
def updateDP(request):
    try:
        dp = request.FILES.get('dp')
        cityUser = TankerwalaUser.objects.get(user=request.user)
        cityUser.dp = dp
        cityUser.save()
        return JsonResponse({
            "status": 200,
            "dp": cityUser.dp.url,
            "msg": "Profile Picture Updated."
        })
    except Exception as e:
        print(e)

        return JsonResponse({
            "status": 403,
            "msg": "Failed"
        })


@api_view(['GET'])
@authentication_classes([CustomTokenAuthentication])
@permission_classes([IsAuthenticated])
def checkRideStatus(request):
    try:

        rides = Ride.objects.filter(
            Q(rideStatus=Ride.SEARCHING) | Q(rideStatus=Ride.IN_PROGRESS) | Q(rideStatus=Ride.RIDE_STARTED) | Q(
                rideStatus=Ride.IH_ARRIVED),
            Q(rider__user__id=request.user.id)).order_by('-creationDate')
        if rides.count() > 0:
            ride = rides[0]
            for ri in rides:
                if ri != ride:
                    ri.rideStatus = Ride.CANCEL_BY_RIDER
                    ri.save()

            return JsonResponse({
                "status": 191,
                "ride": RideSerializer(ride).data,
                "rideStatus": ride.rideStatus,
                "msg": "Ride Exists"
            })
        else:
            return JsonResponse({
                "status": 201,
                "msg": "No Rides"
            })
    except Exception as e:
        print(e)
        return JsonResponse({
            "status": 402,
            "msg": "Failed"
        })


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def cancelRide(request):
    try:
        data = request.data
        print(data['reason'])
        ride = Ride.objects.get(id=int(data['rideID']))
        if ride.rideStatus == Ride.SEARCHING:
            ride.rideStatus = Ride.CANCEL_BY_RIDER
            ride.save()
        else:
            ride.rideStatus = Ride.CANCEL_BY_RIDER
            ride.save()
            wallet = ride.rider.wallet
            cancelFee = ride.driver.driver_id.vehicle.vehicleType.cancellationFee
            wallet.balance = wallet.balance - cancelFee
            wallet.save()
        return JsonResponse({
            "status": 200,
            "msg": "Ride Canceled"
        })
    except Exception as e:
        print(e)
        return JsonResponse({
            "status": 401,
            "msg": "Ride Cancellation Failed"
        })


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def dashboard(request):
    try:
        cityUser = TankerwalaUser.objects.get(user=request.user)
        print(cityUser)
        data = request.data
        now = datetime.date.today()
        week = now - datetime.timedelta(days=7)
        if data['type'] == "asDriver":
            rides = Ride.objects.filter(driver=cityUser, rideStatus=Ride.COMPLETED).aggregate(Sum('fare'))
            wallet = rides['fare__sum']
            if wallet is None:
                wallet = 0

            weekly = Ride.objects.filter(driver=cityUser, creationDate__gte=week, rideStatus=Ride.COMPLETED)

            count = weekly.count()
            kms = weekly.aggregate(Sum('distance'))
            kms = kms['distance__sum']
            if kms is None:
                kms = 0
            msg = {"wallet": wallet, "TRT": count, "DC": kms}

            print(wallet, "\n", count, "\n", kms)
            return JsonResponse({
                "status": 200,
                "msg": {
                    "wallet": wallet,
                    "TRT": count,
                    "DC": kms

                }
            })
        elif data['type'] == "asRider":
            wallet = cityUser.wallet
            wallet = wallet.balance
            weekly = Ride.objects.filter(rider=cityUser, creationDate__gte=week, rideStatus=Ride.COMPLETED)
            count = weekly.count()
            kms = weekly.aggregate(Sum('distance'))
            kms = kms['distance__sum']
            if kms is None:
                kms = 0
            print(wallet, "\n", count, "\n", kms)

            return JsonResponse({
                "status": 200,
                "msg": {
                    "wallet": wallet,
                    "TRT": count,
                    "DC": kms

                }
            })


    except Exception as e:
        print(e)
        return JsonResponse({
            "status": 401,
            "msg": "Fetching Dashboard Details Failed"
        })


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def RideDetail(request):
    try:
        data = request.data
        id = data['RideID']
        print(data)
        if data['type'] == "asDriver":
            rides = Ride.objects.get(id=id)
            data = {
                "status": 200,
                "ride": RideSerializer(rides).data
            }
            return JsonResponse(data)
        elif data['type'] == "asRider":
            rides = Ride.objects.get(id=id)

            vehicle = rides.driver.driver_id.vehicle

            data = {
                "status": 200,
                "ride": RideSerializer(rides).data,
                "vehicle": VehicleSerializer(vehicle).data
            }
            return JsonResponse(data)

    except Exception as e:
        print("error", e)
        return JsonResponse({
            "status": 402,
            "msg": "Failed"
        })


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getRideDetails(request):
    try:

        rides = Ride.objects.filter(
            Q(rideStatus=Ride.SEARCHING) | Q(rideStatus=Ride.IN_PROGRESS) | Q(rideStatus=Ride.RIDE_STARTED),
            Q(rider__user__id=request.user.id)).order_by('-creationDate')
        if rides.count() > 0:
            ride = rides[0]
            for ri in rides:
                if ri != ride:
                    ri.rideStatus = Ride.CANCEL_BY_RIDER
                    ri.save()

            vehicle = ride.driver.driver_id.vehicle
            print("VEHICLE ", vehicle)

            return JsonResponse({
                "status": 200,
                "ride": RideSerializer(ride).data,
                "vehicle": VehicleSerializer(vehicle).data
            })
        else:
            return JsonResponse({
                "status": 404,
                "msg": "No Rides"
            })
    except Exception as e:
        print(e)
        return JsonResponse({
            "status": 402,
            "msg": "Failed"
        })


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def verifyOTP(request):
    data = request.POST
    print(data);
    gotOTP = data['OTP']
    cityUser = TankerwalaUser.objects.get(user=request.user)
    if cityUser is not None:
        checkOTP = OTP.objects.filter(code=gotOTP, user=cityUser)
        if checkOTP.count() == 0:
            return JsonResponse({
                'status': 400,
                "msg": "InValid OTP",
            })
        else:
            checkOTP = checkOTP[0]
        if checkOTP is not None:
            checkOTP.isOtpVerified = True
            checkOTP.save()
            DriverStatus = "0"
            driverAuthStatus = ""
            if cityUser.driver_id is not None:
                if not cityUser.driver_id.isApproved:
                    print("not approved")
                    DriverStatus = "1"
                elif cityUser.driver_id.isApproved:
                    print("approved")
                    DriverStatus = "2"
                driverAuthStatus = cityUser.driver_id.authStatus
                print("driverAuthStatus: ", driverAuthStatus)

            json =  JsonResponse({
                'status': 200,
                "msg": "OTP Verified",
                "data": {
                    "id": request.user.id,
                    "level": DriverStatus,
                    "authStatus": driverAuthStatus,
                    "name": request.user.first_name + " " + request.user.last_name,
                    # "dp": CityUser.objects.get(user=request.user).dp.url,
                    "Token": Token.objects.get_or_create(user=request.user)[0].key
                }
            })
            print(json)
            return json
        else:
            return JsonResponse({
                'status': 400,
                "msg": "Invalid OTP",
            })

    return JsonResponse({
        'status': 402,
        "msg": "User Not Found",
    })


@api_view(['POST'])
@authentication_classes([CustomTokenAuthentication])
@permission_classes([IsAuthenticated])
def bookRide(request):
    try:
        data = request.data
        user = request.user
        cityUser = TankerwalaUser.objects.get(user=user)
        newPickAddress = Address(description=data['pickupAddress']['title'], latitude=data['pickupAddress']['lat']
                                 , longitude=data['pickupAddress']['long'])
        newPickAddress.save()

        newDropAddress = Address(description=data['dropOffAddress']['title'], latitude=data['dropOffAddress']['lat']
                                 , longitude=data['dropOffAddress']['long'])
        newDropAddress.save()
        rideType = data['rideType']
        rideType = VehicleType.objects.get(Title=rideType)
        if data['promo'] != "":
            code = data['promo'].strip().upper()
            coupon = Coupon.objects.get(Code=code)

            newRide = Ride(rider=cityUser, pickUpAddress=newPickAddress, dropOffAddress=newDropAddress,
                           fare=data['fare'],preferredRideType=rideType, coupon=coupon, distance=data['distance'], duration=data['duration'])
            newRide.save()
        else:
            newRide = Ride(rider=cityUser, pickUpAddress=newPickAddress, dropOffAddress=newDropAddress,
                           fare=data['fare'],preferredRideType=rideType, distance=data['distance'], duration=data['duration'])
            newRide.save()

        return JsonResponse({
            "status": 200,
            "ride": newRide.id,
            "msg": "Searching"
        })
    except Exception as e:
        print(e)
        return JsonResponse({
            "msg": "Ride Booking Failed"
        })


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def setNewPass(request):
    try:
        data = request.data
        print(data)
        newPass = data['pass'].strip()
        user = request.user
        user.set_password(newPass)
        user.save()
        return JsonResponse({
            'status': 200,
            "msg": "Password successfully changed",
        })
    except Exception as e:
        print(e)
        return JsonResponse({
            'status': 401,
            "msg": "Password couldn't be reset. Try again.",
        })



@api_view(['POST'])
@authentication_classes([CustomTokenAuthentication])
@permission_classes([IsAuthenticated])
def changePass(request):
    data = request.data
    print(data)
    oldPass = data['old'].strip()
    newPass = data['new'].strip()
    if request.user.check_password(oldPass):
        user = request.user
        user.set_password(newPass)
        user.save()
        return JsonResponse({
            'status': 200,
            "msg": "Password successfully changed",
        })
    else:
        return JsonResponse({
            'status': 403,
            "msg": "Old password is incorrect.",
        })


@api_view(['POST'])
@authentication_classes([CustomTokenAuthentication])
@permission_classes([IsAuthenticated])
def changePhone(request):
    try:
        data = request.data
        print(data)
        phone = data['phone'].strip()
        check = TankerwalaUser.objects.filter(phoneNumber=phone)
        if check.count() > 0:
            return JsonResponse({
                'status': 401,
                "msg": phone + " is linked to another account",
            })
        else:
            cityUser = TankerwalaUser.objects.get(user=request.user)
            cityUser.phoneNumber = phone
            cityUser.save()
            return JsonResponse({
                'status': 200,
                "msg": "Phone No. successfully changed",
            })
    except Exception as e:
        print(e)
        return JsonResponse({
            'status': 403,
            "msg": "Error changing phone no.",
        })


@api_view(['POST'])
@authentication_classes([CustomTokenAuthentication])
@permission_classes([IsAuthenticated])
def checkPromo(request):
    try:
        data = request.data
        print(data)
        code = data['promo'].strip()
        print(code)
        now = datetime.datetime.now()
        promo = Coupon.objects.filter(Code=code, validFrom__lte=now, validTill__gte=now)
        print(promo)
        if promo.count() > 0:
            promo = promo[0]
            cityUser = TankerwalaUser.objects.get(user=request.user)
            rides = Ride.objects.filter(coupon=promo, rider=cityUser).count()
            print("rides are: ", rides)
            if rides >= promo.NoOfRides:
                return JsonResponse({
                    'status': 404,
                    "msg": "Invalid",
                })
            else:
                print(promo.discount)
                return JsonResponse({
                    'status': 200,
                    "msg": promo.discount,
                })
        else:
            return JsonResponse({
                'status': 404,
                "msg": "Invalid",
            })

    except Exception as e:
        print(e)
        return JsonResponse({
            'status': 404,
            "msg": "Invalid",
        })


@api_view(['POST'])
@authentication_classes([CustomTokenAuthentication])
@permission_classes([IsAuthenticated])
def changeName(request):
    data = request.data
    print(data)
    name = data['name'].strip()
    user = request.user
    user.first_name = name
    user.save()
    return JsonResponse({
        'status': 200,
        "msg": "Name successfully changed",
    })


@api_view(['POST'])
@authentication_classes([CustomTokenAuthentication])
@permission_classes([IsAuthenticated])
def updateRideRating(request):
    try:
        data = request.POST
        print(data)

        id = int(data['id'])
        print(id)
        rating = data['rating']
        ride = Ride.objects.get(id=id)
        ride.rating = rating
        ride.save()
        driver = ride.driver
        rides = Ride.objects.filter(driver=driver).aggregate(Avg('rating'))
        driver.rating = rides['rating__avg']
        driver.save()
        return JsonResponse({
            'status': 200,
            "msg": "Ride Updated",
        })
    except Exception as e:
        print("error", e)
        return JsonResponse({
            'status': 403,
            "msg": "Error occurred while Updating Rides.",
        })


@api_view(['POST'])
@authentication_classes([CustomTokenAuthentication])
@permission_classes([IsAuthenticated])
def ChangeCity(request):
    try:
        data = request.data
        print(data)
        name = data['name'].strip()
        user = request.user

        cityUser = TankerwalaUser.objects.get(user=user)
        cityUser.cityName = name
        cityUser.save()
        return JsonResponse({
            'status': 200,
            "msg": "City successfully changed",
        })
    except Exception as e:
        print(e)
        return JsonResponse({
            'status': 403,
            "msg": "Error occurred while changing City.",
        })


@api_view(['GET'])
@authentication_classes([CustomTokenAuthentication])
@permission_classes([IsAuthenticated])
def getVehicleTypes(request):
    vehicleTypes = VehicleType.objects.filter(isActive=True).order_by('order')
    searilizerData = VehicleTypeSerializer(vehicleTypes, many=True)
    print(searilizerData)
    data = {
        "status": 200,
        "data": searilizerData.data
    }
    return JsonResponse(data)


def getCities(request):
    cities = City.objects.all()
    return JsonResponse({
        'status': 200,
        "vehicleTypes": cities,
    })


@api_view(['POST'])
@authentication_classes([CustomTokenAuthentication])
@permission_classes([IsAuthenticated])
def getNearbyRides(request):
    print(request.data)
    lat = float(request.data["lat"])
    long = float(request.data["long"])
    user = TankerwalaUser.objects.get(user=request.user)
    vehicleType = user.driver_id.vehicle.vehicleType
    # get nearest 10 rides
    rides = Ride.objects.filter(rideStatus=Ride.SEARCHING, preferredRideType=vehicleType)[:10]
    # rides = Ride.objects.near(latitude=lat, longitude=long)
    print(rides)
    rides = RideSerializer(rides, many=True).data
    print(rides)
    return JsonResponse({
        'status': 200,
        'Ride': rides,
    })
