import * as React from 'react';
import {View, Image, Pressable, StyleSheet, Text, BackHandler} from 'react-native';
import DriverHeader from "../../Components/DriverHeader";
import {useContext, useEffect, useRef, useState} from "react";
;
import MapPickUpDropOff from "../Maps/MapPickUpDropOff";
import LottieView from 'lottie-react-native';
import CancelModal from "../../Screens/Modal/CancelModal";
import {ApiUrl} from "../../Urls/ApiUrls";
import {SessionContext} from "../../Context/SessionContext";
import {useRoute} from "@react-navigation/native";
import {RideAcceptedContext} from "../../Context/RideAcceptedContext";

import * as Notifications from "expo-notifications";
import {NotificationContext} from "../../Context/NotificationContext";


export default function  SearchingRide({route,navigation}) {

    const Route = useRoute();
    function backFun(){


            if(Route.name === "OngoingRide" || Route.name ==="SearchingRide"){
                if (modalVisible) {
                    setModalVisible(false)
                } else {
                    setModalVisible(true)
                }
                return true;
            }
            else {
                return false;
            }
    }
    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        ()=>{backFun()}


    );
    const ride = useContext(RideAcceptedContext);

    async function cancelRide() {
        let data={
            reason:"Don't need the ride anymore",
            rideID:rideID
        }

        await fetch(ApiUrl.cancelRide, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Token " + session.SessionData.Token
            },
            body: JSON.stringify(data)
        }).then(response => response.json()
        ).then(data => {


            if (data.status <= 200) {

                backHandler.remove()
                clearInterval(searchInterval.current);

                navigation.reset({
                    index: 0,
                    routes: [{name: 'Map'}],
                })

            } else {

            }
        }).catch(function (error) {

        });
    }

    const animation = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);

    const ButtonSize = 47;
    const searchInterval = useRef(null);
    const session = useContext(SessionContext);
    async function sendDriverFoundNotification(rideID) {

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Hey " + session.SessionData.name + "!",
                body: 'Driver found for your ride [' + rideID + "]",
                data: {data: 'Driver Found'},
                sound: 'notification1.wav',

            },
            trigger: {seconds: 1},
        });

    }
    const[rideID,setRideID] = useState(0)
    function ok() {
        searchInterval.current = setInterval(async () => {
            let response =await fetch(
                ApiUrl.checkRideStatus, {
                    headers: {
                        Authorization: "Token "+session.SessionData.Token
                    }
                }
            ).then(response => response.json()).then((data) => {
                console.log(data.ride)

                if (data.status === 191) {
                    if(rideID===0)
                    {
                        setRideID(data.ride.id)
                    }
                    if(data.rideStatus !== "SR")
                    {
                        if(data.rideStatus === "IP")
                        {
                            backHandler.remove()
                            ride.setData(data.ride)
                            clearInterval(searchInterval.current);
                            navigation.reset({
                                index: 0,
                                routes: [{name: 'OngoingRide'}],
                            })
                        }
                    }
                }
            });

            }, 8000)
        }


    useEffect(() => {
ok()


    },[]);
    useEffect(()=>{
        animation.current?.play();
    })
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",
            position: "absolute",
            width: "100%",
            height: "100%",
        },
        Button: {
            backgroundColor: "white",
            width:"85%",
            borderRadius:8,
            height:68,
            bottom:10,
            position:"absolute",
            alignSelf:"center",
            alignContent:"center",
            justifyContent: "center",
            textAlign:"center",
            alignItems:"center",

        },
        button: {
            width: ButtonSize,
            height: ButtonSize,
            borderRadius: 15,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 80,
            shadowOffset: {width: -10, height: 4},
            shadowOpacity: 0.8,
            shadowRadius: 20,
            elevation: 5,
            alignSelf: "flex-end",
            marginEnd: 20,

        }
    });

    return (
        <View style={{flex: 1}}>

            <MapPickUpDropOff style={{width: "100%", height: "100%"}} source={require("../../../assets/img/Basemapimage.png")}/>
            <View style={styles.container}>
                <DriverHeader style={{alignSelf: "flex-start"}} navigation={navigation}/>
                <View style={{
                    flex: 1,
                    flexDirection: "column",

                }}>


                    <Image source={require("../../../assets/img/gradiant.png")} style={{width:"100%",height:"45%",position:"absolute",bottom:0}} />
                    <View style={{
                        height:"85%",
                        position:"absolute",
                        justifyContent:"center",
                        alignSelf:"center",
                        alignContent:"center",
                        alignItems:"center",


                    }}>
                        <LottieView
                            autoPlay
                            ref={animation}
                            style={{
                                width: 100,
                                height: 100,
                                backgroundColor: 'transparent',
                            }}
                            source={require('../../../assets/anim/waveLoad.json')}
                        />
                    </View>
                    <Text style={{textAlign:"center",position:"absolute",bottom:140,left:0,right:0}}>Searching for rides nearby...</Text>
                    <Pressable style={styles.Button} onPress={()=>{
                        setModalVisible(true)
                    }} >
                        <Text style={{color: "black",fontFamily:"Poppins_400Regular",}}>
                            Cancel
                        </Text>
                    </Pressable>
                    <CancelModal setModalVisible={setModalVisible} modalVisible={modalVisible} cancel={()=>{
                        cancelRide()
                    }}/>
                </View>


            </View>
        </View>
    );
}

