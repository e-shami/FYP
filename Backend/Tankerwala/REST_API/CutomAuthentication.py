from datetime import timedelta, datetime, tzinfo
from django.conf import settings
from django.utils import timezone
from rest_framework.authentication import TokenAuthentication
from rest_framework import exceptions
from django.shortcuts import render, HttpResponseRedirect, HttpResponse, redirect
from .models import *

EXPIRE_HOURS = getattr(settings, 'REST_FRAMEWORK_TOKEN_EXPIRE_HOURS', 24)
ZERO = timedelta(hours=5)


class CustomTokenAuthentication(TokenAuthentication):
    def authenticate_credentials(self, key):
        model = self.get_model()
        try:
            token = model.objects.select_related('user').get(key=key)
        except model.DoesNotExist:
            raise exceptions.AuthenticationFailed('Invalid token.')

        if not token.user.is_active:
            raise exceptions.AuthenticationFailed('User inactive or deleted.')
        Otp = OTP.objects.get(user=TankerwalaUser.objects.get(user=token.user))
        if Otp.isOtpVerified == False:
            raise exceptions.AuthenticationFailed('Please Verify Using Otp')
        
        return (token.user, token)


class AdminTokenAuthentication(TokenAuthentication):
    def authenticate_credentials(self, key):
        model = self.get_model()
        try:
            token = model.objects.select_related('user').get(key=key)
        except model.DoesNotExist:
            raise exceptions.AuthenticationFailed('Invalid token.')

        if not token.user.is_active:
            raise exceptions.AuthenticationFailed('User inactive or deleted.')
        user = CityAdminUser.objects.get(user__username=token.user.username)
        if not user.user.is_staff or not user.user.is_superuser:
            raise exceptions.AuthenticationFailed('Account Not Found')
        return (token.user, token)
