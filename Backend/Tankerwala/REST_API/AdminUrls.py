from django.urls import path
from . import views, AdminViews2
from . import AdminViews

urlpatterns = [
    path("logIn", AdminViews.login),
    path("fetchActiveRides", AdminViews.fetchActiveRides),
    path("getVerfiUser", AdminViews.getVerfiUser),
    path("GetCoupon", AdminViews.GetCoupon),
    path("getGraphData", AdminViews.getGraphData),
    path("changePassword", AdminViews.changePassword),
    path("ApproveDriver", AdminViews.ApproveDriver),
    path("deletCopn/<int:id>", AdminViews.deletCopn),
    path("CreateCopen", AdminViews.CreateCopen),
    path("notifcationOn/<int:true>", AdminViews.notifcationOn),
    path("getClients", AdminViews2.getClients),
    path("changeDp", AdminViews.changeDp),
    path("notifications", AdminViews.notifications),
    path("GetALLChats/<int:id>", AdminViews.GetALLChats),
    path("deleteUser/<int:id>", AdminViews2.deleteUser),
    path("searchClient", AdminViews2.searchClient),
]