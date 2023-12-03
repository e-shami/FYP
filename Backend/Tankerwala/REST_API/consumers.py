import datetime
import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

from .statuses import *
from .models import *
from .AdminViews import send_message as sendNotification


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = None

        self.accept()

    def receive(self, text_data):
        print(text_data)
        text_data_json = json.loads(text_data)
        status = text_data_json['status']
        if status == CONNECTION_REQ:
            self.room_group_name = text_data_json["GroupId"]
            self.addToGroup()
            self.getAllOldMessages(text_data_json["rideId"])
        elif status == IN_COMING_MSG:
            self.SendMessage(text_data_json)

    def getAllOldMessages(self, id):
        All_messages = Chatting.objects.filter(ride__id=id)
        data = []
        for msg in All_messages:
            data.append({
                "date": str(msg.date),
                "id": msg.user.user.id,
                "sender": msg.user.user.first_name,
                "msg": msg.message,
                "rideId": id,
                "dp": msg.user.dp.url,
                "time": str(msg.time)})

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': json.dumps({
                    "status": FETCH_OLD_MESSAGES,
                    "data": data
                })
            }
        )

    def SendMessage(self, text_data):
        date = datetime.datetime.today().strftime('%Y-%m-%d %H:%M:%S').split(" ")
        text_data["msg"]["date"] = date[0]
        text_data["msg"]["time"] = date[1]
        ride = Ride.objects.get(id=text_data["msg"]["rideId"])
        user = TankerwalaUser.objects.get(user__id=text_data["msg"]["id"])
        Chatting(ride=ride, user=user, message=text_data["msg"]["msg"], date=date[0], time=date[1]).save()
        receiver = user
        if ride.driver == user:
            receiver = ride.rider
            sendNotification(receiver.notificationToken, f"New Text msg from {ride.driver.user.first_name}",f"Tap to view")
        else:
            receiver = ride.driver
            sendNotification(receiver.notificationToken, f"New Text msg from {ride.rider.user.first_name}",f"Tap to view")

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': json.dumps(text_data)
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

