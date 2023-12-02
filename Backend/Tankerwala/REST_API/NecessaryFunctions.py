import random
import string

from .models import *
from .secretCodes import *


def id_generator(size=9, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))



def mtn(x):
    months = {
        'jan': 1,
        'feb': 2,
        'mar': 3,
        'apr': 4,
        'may': 5,
        'jun': 6,
        'jul': 7,
        'aug': 8,
        'sep': 9,
        'oct': 10,
        'nov': 11,
        'dec': 12
    }
    a = x.strip()[:3].lower()
    ez = months[a]
    return ez


def genOTP(x):
    import math, random
    digits = "0123456789"
    OTP = ""
    for i in range(x):
        OTP += digits[math.floor(random.random() * 10)]

    print('hello otp', OTP)
    return OTP


def sendMsg(acc_sid, auth_token, body, sender, receiver):
    from twilio.rest import Client
    client = Client(acc_sid, auth_token)
    message = client.messages.create(body=body, from_=sender, to=receiver)

