from django.urls import path
from django.contrib import admin

from . import views as v
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views

urlpatterns = [

                  path('resetpassword/',
                       auth_views.PasswordResetView.as_view(template_name="RESET_EMAIL/passwordresetpage.html",
                                                            html_email_template_name="RESET_EMAIL/resetmail.html"
                                                            ),
                       name="reset_password"),
                  path('accounts/password_reset_sent/',
                       auth_views.PasswordResetDoneView.as_view(template_name="RESET_EMAIL/PasswordresetmailSent.html"),
                       name="password_reset_done", ),

                  path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(
                      template_name="RESET_EMAIL/newpasswordtemplate.html"),
                       name="password_reset_confirm"),
                  path('reset_password_complete/',
                       auth_views.PasswordResetCompleteView.as_view(template_name="RESET_EMAIL/passcompl.html"),
                       name="password_reset_complete"),
                  # path('reset_password/',auth_views.PasswordResetView.as_view(),name="reset_password"),

              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
