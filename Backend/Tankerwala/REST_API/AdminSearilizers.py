import json

from rest_framework import serializers
from .models import Ride, Address, TankerwalaUser, Driver, VehicleType, CurrentLocation, Vehicle, City, Coupon, Logs
from django.contrib.auth.models import User


class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = "__all__"


class DriverForCarSerializer(serializers.ModelSerializer):
    vehicle = VehicleSerializer()

    class Meta:
        model = Driver
        fields = "__all__"


class CityUserSerializerAdmin(serializers.ModelSerializer):
    driver_id = DriverForCarSerializer()

    class Meta:
        model = TankerwalaUser
        depth = True
        fields = "__all__"


class notificationSerializers(serializers.ModelSerializer):
    class Meta:
        model = Logs
        depth = True
        fields = "__all__"


class CouponSear(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    Code = serializers.CharField(max_length=90)
    validFrom = serializers.DateField()
    validTill = serializers.DateField()
    discount = serializers.FloatField(default=0)
    NoOfRides = serializers.IntegerField(default=0)

    class Meta:
        model = Coupon
        depth = True
        fields = "__all__"
        extra_kwargs = {'creationDate': {'required': False}}
