from rest_framework import serializers
from .models import Ride, Address, CityUser, VehicleType, CurrentLocation, Vehicle, City, Driver
from django.contrib.auth.models import User


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class MainUserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "email"
        ]


class CitySerializers(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = "__all__"


class UserProfileSerializer(serializers.ModelSerializer):
    user = MainUserSerializers()

    class Meta:
        model = CityUser
        fields = [
            "id",
            "dp",
            "user",
            "phoneNumber",
            "cityName"

        ]


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = "__all__"
        depth = True


class UserSerializer(serializers.ModelSerializer):
    user = MainUserSerializers()

    class Meta:
        model = CityUser
        fields = [
            "dp",
            "user",
            "cityName",
            "phoneNumber",
        ]
        depth = True


class driverLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentLocation
        fields = "__all__"


class AllRidesSerializer(serializers.ModelSerializer):
    pickUpAddress = AddressSerializer()
    dropOffAddress = AddressSerializer()
    rider = UserSerializer()
    driver = UserSerializer()

    class Meta:
        model = Ride
        fields = [
            "id",
            "pickUpAddress",
            "dropOffAddress",
            "rider",
            "driver",
            "rideImg",
            "fare",
            "rating",
            "creationDate"
        ]


class DriverIdSer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = "__all__"
        depth = True


class DriverSerializer(serializers.ModelSerializer):
    user = MainUserSerializers()
    driver_id = DriverIdSer()

    class Meta:
        model = CityUser
        fields = "__all__"
        depth = True


class RideSerializer(serializers.ModelSerializer):
    pickUpAddress = AddressSerializer()
    dropOffAddress = AddressSerializer()
    rider = UserSerializer()
    driver = DriverSerializer()
    driverLocation = driverLocationSerializer()

    class Meta:
        model = Ride
        fields = "__all__"


class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = [
            "vehicleImg",
            "company",
            "numberPlate",
            "model",
            "color",
        ]


class DriverLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentLocation
        fields = "__all__"


class UserSerializer2(serializers.ModelSerializer):
    user = MainUserSerializers()

    class Meta:
        model = CityUser
        fields = [
            "dp",
            "user",
            "phoneNumber",
            "rating"
        ]


class RideSerializer2(serializers.ModelSerializer):
    pickUpAddress = AddressSerializer()
    dropOffAddress = AddressSerializer()
    driver = UserSerializer2()
    driverLocation = DriverLocationSerializer()

    class Meta:
        model = Ride
        fields = [
            "driver",
            "pickUpAddress",
            "dropOffAddress",
            "distance",
            "driverLocation",
            "groupId",
            "rideStatus",
        ]


class VehicleTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleType
        fields = "__all__"
