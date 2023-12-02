import datetime
import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

from .statuses import *
from .models import *
from .Searilizer import RideSerializer
from .AdminViews import send_message as sendNotification

class RideLocationSharingGroup(WebsocketConsumer):
    def connect(self):
        self.room_group_name = None
        self.rideId = None

        self.accept()

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print(text_data_json)
        status = text_data_json['status']
        if status == CONNECTION_REQ:
            self.room_group_name = text_data_json["GroupId"]
            self.rideId = text_data_json["rideId"]
            self.addToGroup()
        elif status == IN_COMING_MSG:
            self.SendMessage(text_data_json)
        elif status == CHANGE_ONGOING_RIDE_STATUS:

            time = text_data_json['time']
            rideTime = text_data_json['rideTime']
            distance = text_data_json['distance']
            print("TIME",time)
            print("RIDE TIME",rideTime)
            print("DISTANCE",distance)
            self.changeStatus(time,rideTime,distance)

    def SendMessage(self, text_data):
        data = text_data["data"]
        ride = Ride.objects.get(id=self.rideId)
        ride.driverLocation.longitude = data["longitude"]
        ride.driverLocation.latitude = data["latitude"]
        ride.driverLocation.heading = data["heading"]
        ride.save()

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': json.dumps({
                    'status': IN_COMING_MSG,
                    'data': RideSerializer(ride).data
                })

            }
        )

    def chat_message(self, event):
        message = event['message']
        print(message)
        self.send(text_data=message)

    def addToGroup(self):
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )


    def changeStatus(self,time,rideTime,distance):
        ride = Ride.objects.get(id=self.rideId)
        if ride.rideStatus == Ride.IN_PROGRESS:
            print("Changing Status to IH_ARRIVED")
            ride.rideStatus = Ride.IH_ARRIVED
            receiver = ride.rider
            sendNotification(receiver.notificationToken,f"Driver Arrived",f"{ride.driver.user.first_name} is reached on pickup location.")
            # format time 1697550068498 to time
            time = datetime.datetime.fromtimestamp(time / 1000)
            # this time is datetime convert it to time
            time = time.time()
            print("FORMATTED TIME",time)

            ride.driverArrivalTime = time
        elif ride.rideStatus == Ride.IH_ARRIVED:
            print("STARTED")
            ride.rideStatus = Ride.RIDE_STARTED
            time = datetime.datetime.fromtimestamp(time / 1000)
            # this time is datetime convert it to time
            time = time.time()
            print("FORMATTED TIME", time)
            ride.pickUpTime = time
        elif ride.rideStatus == Ride.RIDE_STARTED:
            # changing Ride Status & setting dropOff Time
            ride.rideStatus = Ride.COMPLETED
            time = datetime.datetime.fromtimestamp(time / 1000)
            # this time is datetime convert it to time
            time = time.time()
            print("FORMATTED TIME", time)
            ride.dropOffTime = time
            # calculating time for fare calculation

            pickup = ride.pickUpTime.hour * 60 + ride.pickUpTime.minute
            dropOff = ride.dropOffTime.hour * 60 + ride.dropOffTime.minute
            arrival = ride.driverArrivalTime.hour * 60 + ride.driverArrivalTime.minute
            waiting = pickup-arrival
            RideTime = dropOff-pickup
            # setting DropOff to current Driver Location
            dropOffAddress = ride.dropOffAddress
            dropOffAddress.longitude = ride.driverLocation.longitude
            dropOffAddress.latitude = ride.driverLocation.latitude
            dropOffAddress.save()
            # calculating Fare
            fare = (distance * ride.preferredRideType.perKilo) + (RideTime * ride.preferredRideType.perMin)
            if fare < ride.preferredRideType.minimumPrice:
                fare = ride.preferredRideType.minimumPrice
            if ride.coupon is not None:
                discount = ride.coupon.discount
                discount = discount/100
                discount = 1 - discount
                fare = fare*discount
            ride.fare = fare
            waitCharges = ride.driver.driver_id.vehicle.vehicleType.waitTime
            wC = waitCharges*waiting
            ride.fare = ride.fare+wC
            receiver = ride.rider
            sendNotification(receiver.notificationToken, f"Your Ride ended with {ride.driver.user.first_name}",
                             f"Dont forget to share your experience by rating your ride")
            receiver = ride.driver
            sendNotification(receiver.notificationToken, f"Your Ride ended with {ride.rider.user.first_name}",
                             f"Total fare for the ride was {ride.fare}P")

        ride.save()
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': json.dumps({
                    'status': IN_COMING_MSG,
                    'data': RideSerializer(ride).data
                })

            }
        )
