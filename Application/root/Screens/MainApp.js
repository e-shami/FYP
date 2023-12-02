import GetStartedScreen from "./GetStarted";
import LoginScreen from "./LoginScreen";
import SignUpPageOne from "./SignUp/SignUpPageOne";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, View, Text, Platform} from "react-native";
import SignUpPageThree from "./SignUp/SignUpPageThree";
import SignUpPageFour from "./SignUp/SignUpPageFour";
import SignUpPageTwo from "./SignUp/SignUpPageTwo";
import Finish from "./SignUp/finish";
import RiderModeSignUpContextProvider from "../Context/RiderModeSignUpContext";
import DriverEntery from "./DriverDashboard/Entry";
import {StatusBar} from "expo-status-bar";
import * as SplashScreen from 'expo-splash-screen';
import SwitchUserContextProvider from "../Context/SwitchUserContext";
import ResetPassOTP from "./Common/ResetPassOTP";
import RiderEntry from "./RiderDashboard/Entry";
import {useContext} from "react";
import {SwitchUserContext} from "../Context/SwitchUserContext";

import {
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';
import * as Font from 'expo-font';
import {useState, useEffect, useCallback} from "react";
import OtpScreen from "./Common/OtpScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SessionContext} from "../Context/SessionContext";

import {ApiUrl} from "../Urls/ApiUrls";
import ResetPassword from "./Common/ResetPassword";
import {NotificationContext} from "../Context/NotificationContext";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";


const Stack = createNativeStackNavigator();

export default function MainApp(props) {
    let fonts = {
        Poppins_100Thin,
        Poppins_100Thin_Italic,
        Poppins_200ExtraLight,
        Poppins_200ExtraLight_Italic,
        Poppins_300Light,
        Poppins_300Light_Italic,
        Poppins_400Regular,
        Poppins_400Regular_Italic,
        Poppins_500Medium,
        Poppins_500Medium_Italic,
        Poppins_600SemiBold,
        Poppins_600SemiBold_Italic,
        Poppins_700Bold,
        Poppins_700Bold_Italic,
        Poppins_800ExtraBold,
        Poppins_800ExtraBold_Italic,
        Poppins_900Black,
        Poppins_900Black_Italic,
    };
    const [appIsReady, setAppIsReady] = useState(false);
    const [FirstScreen, setFirstScreen] = useState("getStarted");
    const sessionData = useContext(SessionContext);
    const notificationData = useContext(NotificationContext);
    const UserData = useContext(SwitchUserContext);

    const getSessionData =   async () => {
        try {
            const value = await AsyncStorage.getItem('sessionData')
            let isDriver = await AsyncStorage.getItem('userData')

            isDriver = JSON.parse(isDriver);
            let isUserDriver = false;
            if(isDriver === null)
            {
                console.log("userdata is null")
                isUserDriver=false
            }
            else{
                UserData.setUserData(isDriver)
                isUserDriver = isDriver.isUserDriver
            }
            if (value !== null) {
                let val = JSON.parse(value);
                sessionData.setUserData(val)
                console.log("GOT SESSION DATA", val)
                console.log(val.Token)
                if (val.Token.length > 0) {
                    if (isUserDriver) {
                        setFirstScreen("DriverEntry")
                    } else {
                        setFirstScreen("RiderEntry")
                    }
                }
                else if(val.id=== -1){
                    setFirstScreen("LoginScreen")
                }

            }
        } catch (e) {

            console.log("Couldn't get User Data", e)
        }
    }

    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [250, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                console.log('Error occurred setting up notifications');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync({    experienceId: '@adeelcyber/citygo-dev',
            })).data;
        } else {
            console.log('Must use physical device for Push Notifications');
        }

        return token;
    }
    async function getNotificationData() {
        try {

            const value = await AsyncStorage.getItem('notificationData')

            if (value !== null) {
                let val = JSON.parse(value);
                console.log("GOT NOTIFICATION DATA", val)
                if (val.Token  !== "") {
                    notificationData.setNotificationData(val)

                } else{

                    registerForPushNotificationsAsync().then(token =>{

                        notificationData.setNotificationData({
                            Setting:true,
                            Token:token
                        })})
                }
            }
            else {

                registerForPushNotificationsAsync().then(token =>{

                    notificationData.setNotificationData({
                        Setting:true,
                        Token:token
                    })})

            }
        } catch (e) {

            console.log("Couldn't get Notification Data"+e.msg)
            console.log("Couldn't get Notification Data"+e)
        }
    }

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });
    async function sendRemoteNotification(notification) {
        let Notification = {
            content: {
                title: notification.request.content.title,
                body: notification.request.content.body,
                data: notification.request.content.data,
            },
            trigger: {seconds: 1},
        }
        await Notifications.scheduleNotificationAsync(Notification);

    }
    const subscription = Notifications.addNotificationReceivedListener(notification => {
        if(notificationData.NotificationData.Setting)
        {
            sendRemoteNotification(notification)
        }
    });
    useEffect(() => {

        async function prepare() {
            try {
                // Keep the splash screen visible while we fetch resources


                await SplashScreen.preventAutoHideAsync();

                await Font.loadAsync(fonts);

            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }
        getSessionData()
        getNotificationData()
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (


        <NavigationContainer>
            <SwitchUserContextProvider>
                <RiderModeSignUpContextProvider>
                    <View style={{flex: 1,}}
                          onLayout={onLayoutRootView}
                    >
                        <StatusBar backgroundColor={"#fff"}/>

                        <Stack.Navigator
                            initialRouteName={FirstScreen}
                        >


                            <Stack.Screen name="getStarted" component={GetStartedScreen}
                                          options={{headerShown: false}}/>

                            <Stack.Screen name="DriverEntry"
                                          component={DriverEntery}
                                          options={{headerShown: false}}/>

                            <Stack.Screen name="RiderEntry"
                                          component={RiderEntry}
                                          options={{headerShown: false}}/>


                            <Stack.Screen name="LoginScreen" component={LoginScreen}
                                          options={{headerShown: false}}/>
                            <Stack.Screen name="SignUpPageOne" component={SignUpPageOne}
                                          options={{headerShown: false}}/>
                            <Stack.Screen name="resetPassOTP" component={ResetPassOTP}
                                          options={{headerShown: false}}/>
                            <Stack.Screen name="resetPassword" component={ResetPassword}
                                          options={{headerShown: false}}/>
                            <Stack.Screen name="SignUpPageTwo" component={SignUpPageTwo}
                                          options={{headerShown: false, animation: 'none'}}/>
                            <Stack.Screen name="SignUpPageThree" component={SignUpPageThree}
                                          options={{headerShown: false, animation: 'none'}}/>
                            <Stack.Screen name="SignUpPageFour" component={SignUpPageFour}
                                          options={{headerShown: false, animation: 'none'}}/>
                            <Stack.Screen name="Finish" component={Finish} options={{headerShown: false}}/>
                            <Stack.Screen name="OtpScreen" component={OtpScreen} options={{headerShown: false}}/>
                        </Stack.Navigator>
                    </View>
                </RiderModeSignUpContextProvider>
            </SwitchUserContextProvider>
        </NavigationContainer>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});