let Domain = "192.168.0.108:8000"
let MainUrl = "http://"+Domain+"/adminApi/"
let isDev = true
if(isDev){
    Domain = "192.168.43.23:8000"
    MainUrl = "http://"+Domain+"/adminApi/"
}


const ApiUrls = {
    dp:"http://"+Domain,
    logIn:MainUrl+"logIn",
    deleteUser:MainUrl+"deleteUser",
    search:MainUrl+"searchClient",
    fetchActiveRides:MainUrl+"fetchActiveRides",
    GetALLChats:MainUrl+"GetALLChats",
    getClients:MainUrl+"getClients",
    getVerfiUser:MainUrl+"getVerfiUser",
    ApproveDriver:MainUrl+"ApproveDriver",
    CreateCopen:MainUrl+"CreateCopen",
    GetCoupon:MainUrl+"GetCoupon",
    changePassword:MainUrl+"changePassword",
    notifications:MainUrl+"notifications",
    notifcationOn:MainUrl+"notifcationOn",
    deletCopn:MainUrl+"deletCopn",
    changeDp:MainUrl+"changeDp",
    ForgetPassword:"http://"+Domain+"/resetpassword/",
    getGraphData:MainUrl+"getGraphData",
}


export default ApiUrls;
export {
    MainUrl,
}