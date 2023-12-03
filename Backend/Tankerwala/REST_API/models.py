from django.db import models
from django.contrib.auth.models import User
from geopy import geocoders

# from .managers import GeoManager
from geopy.exc import GeocoderQueryError

from .NecessaryFunctions import id_generator


class CityAdminUser(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,null=True,default=1)
    phoneNumber = models.CharField(max_length=13, null=False)
    dp = models.ImageField(upload_to="userDP",default="default.png",  null=True)
    creationDate = models.DateTimeField(auto_created=True, auto_now=True)
    isNotification = models.BooleanField(default=True)
    def __str__(self):
        return self.user.username


class City(models.Model):
    name = models.CharField(max_length=90, null=False)
    creationDate = models.DateTimeField(auto_created=True);

    def __str__(self):
        return self.name


class VehicleType(models.Model):
    image = models.ImageField(null=False, blank=False);
    Title = models.CharField(max_length=10, null=False)
    order = models.IntegerField(null=True)
    perKilo = models.FloatField(null=False)
    perMin = models.FloatField(null=False)
    waitTime = models.FloatField(null=False)
    minimumPrice = models.FloatField(null=False)
    isActive = models.BooleanField(default=False)
    cancellationFee = models.FloatField(null=False)
    bookingFee = models.FloatField(null=False)

    def __str__(self):
        return self.Title


class Vehicle(models.Model):
    vehicleRegistrationFile = models.FileField(upload_to="VehicleRegistrationFile", null=False)
    vehicleImg = models.FileField(upload_to="VehicleImg", null=False)
    color = models.CharField(max_length=10, null=False)
    company = models.CharField(max_length=10, null=False)
    numberPlate = models.CharField(max_length=10, null=False)
    model = models.CharField(max_length=10, null=False)
    vehicleType = models.ForeignKey(VehicleType, on_delete=models.CASCADE)

    def __str__(self):
        if hasattr(self, 'driver'):
            return self.driver.cityuser.user.email
        return f"{self.numberPlate} Corresponding user not Found"


class Driver(models.Model):
    STATUSES = (("PENDING", "PENDING"), ("APPROVED", "APPROVED"), ("REJECTED", "REJECTED"))
    authStatus = models.CharField(max_length=20, choices=STATUSES, default="PENDING")
    isApproved = models.BooleanField(default=False, null=True)
    cnic = models.CharField(max_length=20, null=False)
    driverLicenseNumber = models.CharField(max_length=20, null=False)
    driverLicenseExpiry = models.DateField(null=False)
    driverLicenseImg = models.ImageField(upload_to="DriverLicenseImg")
    vehicle = models.OneToOneField(Vehicle, on_delete=models.CASCADE)

    creationDate = models.DateTimeField(auto_created=True, auto_now=True)

    def __str__(self):
        if hasattr(self, 'cityuser'):
            return self.cityuser.user.email
        return f"{self.cnic} Corresponding user not Found"


class Wallet(models.Model):
    balance = models.FloatField(default=0.0, null=False)
    lastUpdate = models.DateTimeField(auto_created=True, auto_now=True)

    def __str__(self):
        if hasattr(self, 'cityuser'):
            return self.cityuser.user.email
        return f"{self.balance} Corresponding user not Found"


class TankerwalaUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phoneNumber = models.CharField(max_length=13, null=False)
    dp = models.ImageField(upload_to="userDP", null=True,default="default.png")
    creationDate = models.DateTimeField(auto_created=True, auto_now=True)
    wallet = models.OneToOneField(Wallet, on_delete=models.CASCADE)
    rating = models.FloatField(default=5)
    driver_id = models.OneToOneField(Driver, on_delete=models.CASCADE, null=True, blank=True)
    cityName = models.CharField(null=True, blank=True, default="", max_length=15)
    notificationToken  = models.CharField(null=True,blank=True,default="",max_length=50)

    def __str__(self):
        return self.user.first_name + " " + self.user.last_name

class waterTankLevel(models.Model):
    user = models.ForeignKey(TankerwalaUser, on_delete=models.CASCADE)
    level = models.FloatField(null=False)
    creationDate = models.DateTimeField(null=False)

    def __str__(self):
        return str(self.level)


class OTP(models.Model):
    user = models.OneToOneField(TankerwalaUser, on_delete=models.CASCADE)
    code = models.TextField(max_length=4)
    time = models.DateTimeField(auto_now=True, auto_created=True)
    isOtpVerified = models.BooleanField(default=False)

    def __str__(self):
        return self.code + self.user.user.first_name


class Coupon(models.Model):
    Code = models.CharField(max_length=90, null=False, unique=True)
    validFrom = models.DateField(auto_created=True)
    validTill = models.DateField(auto_created=True)
    discount = models.FloatField(default=0)
    creationDate = models.DateTimeField(auto_now_add=True)
    NoOfRides = models.IntegerField(default=0)
    isActive = models.BooleanField(default=True)
    isDeleted = models.BooleanField(default=False)

    def __str__(self):
        return self.Code


class Address(models.Model):
    description = models.TextField(null=False)
    longitude = models.FloatField(null=False)
    latitude = models.FloatField(null=False)

    def __str__(self):
        return self.description


class CurrentLocation(models.Model):
    longitude = models.FloatField(null=False)
    latitude = models.FloatField(null=False)
    heading = models.FloatField(default=0)

    def __str__(self):
        return f"long : {self.longitude} , lat : {self.latitude}"


class Ride(models.Model):
    CANCEL_BY_RIDER = "CN_RI"
    CANCEL_BY_DRIVER = "CN_DR"
    SEARCHING = "SR"
    IN_PROGRESS = "IP"
    IH_ARRIVED = "DR_AR"
    RIDE_STARTED = "RD_ST"
    COMPLETED = "CMP"
    STATUSES = ((RIDE_STARTED, "RIDE_STARTED"), (IH_ARRIVED, "DRIVER_ARRIVED"), (CANCEL_BY_RIDER, "CANCEL_BY_RIDER"),
                (CANCEL_BY_DRIVER, "CANCEL_BY_DRIVER"),
                (SEARCHING, "SEARCHING"), (IN_PROGRESS, "IN_PROGRESS"), (COMPLETED, "COMPLETED"))
    driver = models.ForeignKey(TankerwalaUser, related_name="driver", on_delete=models.CASCADE, null=True, blank=True)
    rider = models.ForeignKey(TankerwalaUser, related_name="rider", on_delete=models.CASCADE, null=False, blank=True)
    pickUpAddress = models.ForeignKey(Address, related_name="pickUpAddress", on_delete=models.CASCADE, null=False,
                                      blank=True)
    dropOffAddress = models.ForeignKey(Address, related_name="dropOffAddress", on_delete=models.CASCADE, null=False,
                                       blank=True)
    duration = models.TextField(null=True, blank=True)
    rideStatus = models.CharField(max_length=20, choices=STATUSES, default=SEARCHING)
    rideImg = models.ImageField(upload_to="RideImg", null=True, blank=True)
    preferredRideType = models.ForeignKey(VehicleType,null=True,blank=True, on_delete=models.CASCADE, )
    distance = models.FloatField(default=0.0, null=False, blank=True)
    pickUpTime = models.TimeField(null=True, blank=True)
    dropOffTime = models.TimeField(null=True, blank=True)
    rating = models.FloatField(null=True, blank=True)
    fare = models.FloatField(null=True, blank=True)
    driverArrivalTime = models.TimeField(null=True, blank=True)
    coupon = models.ForeignKey(Coupon, on_delete=models.CASCADE, null=True, blank=True)
    groupId = models.CharField(max_length=20, null=False, default=id_generator(), blank=True)
    creationDate = models.DateTimeField(auto_now_add=True, blank=True,editable=True)
    driverLocation = models.OneToOneField(CurrentLocation, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.groupId


class Chatting(models.Model):
    user = models.ForeignKey(TankerwalaUser, on_delete=models.CASCADE)
    ride = models.ForeignKey(Ride, on_delete=models.CASCADE)
    message = models.TextField(null=False)
    date = models.DateField(auto_now=True)
    time = models.TimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.user.first_name} :: {self.message} :: {self.date} :: {self.time}"


class Logs(models.Model):
    NEW_CLIENT = "NC"
    PASSWORD_CHANGE = "PC"
    DP_CHANGE = "DP"
    OTHER = "OT"
    STATUSES = ((NEW_CLIENT, "New Client"), (PASSWORD_CHANGE, "PC"), (DP_CHANGE, "Dp Change"), (OTHER, "other"))
    logType = models.CharField(max_length=20, choices=STATUSES, default=OTHER)
    log = models.TextField(null=False, blank=False)
    DateTime = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.log
