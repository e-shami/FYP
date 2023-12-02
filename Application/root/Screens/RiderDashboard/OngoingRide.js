import * as React from 'react';
import {View, Image, Pressable, StyleSheet, Text, BackHandler} from 'react-native';
import {StatusBar} from "expo-status-bar";
import DriverHeader from "../../Components/DriverHeader";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useContext, useEffect, useState} from "react";
import UserCardBookedBottomSheet from "../../Components/User/UserCardBookedBottomSheet";
import MapPickUpDropOff from "../Maps/MapPickUpDropOff";
import {PickUpDropOffContext} from "../../Context/PickUpDropOff";
import {SessionContext} from "../../Context/SessionContext";
import { useRoute } from '@react-navigation/native';

import {ApiUrl} from "../../Urls/ApiUrls";
import CancelModal from "../Modal/CancelModal";
import ReasonModal from "../Modal/ReasonModal";
import TrackingMap from "../Common/TrackinMap";
import {RideAcceptedContext} from "../../Context/RideAcceptedContext";
import {Loading} from "../DriverDashboard/MapEntry";
import LoadingModel from "../Modal/loadingModel";
import ErrorModel from "../Modal/ErrorModel";
export default function  OngoingRide({route,navigation}) {
    const session = useContext(SessionContext);
    const ride = useContext(RideAcceptedContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [reasonModalVisible, setReasonModalVisible] = useState(false);
    const [isLoadingOpen, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [reason, setReason] = useState("");
    const [rideInfo,setRideInfo] = useState({
        "DriverName":"Adeel Ahmed",
        "DriverDP":"",
        "VehicleImg":"",
        "DriverRating":4.9,
        "Car":"Toyota",
        "NumberPlate":"RIM-563",
        "PickupAddress":{},
        "DropOffAddress":{},
    })
    const Route = useRoute();
    function backFun() {
        console.log(Route.name);
        if(Route.name === "OngoingRide" || Route.name ==="SearchingRide"){
            if (modalVisible) {
                setModalVisible(false)
            } else {

                setModalVisible(true)
            }
            return true;
        }
        else {
            return false
        }
    }
    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        ()=>{
            backFun()
        }

    );
    const ButtonSize = 47;
    const  Data = useContext(PickUpDropOffContext);
    async function cancelRide() {
        let data={
            reason:reason,
            rideID:ride.RideData.id
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
                setLoading(false)
                backHandler.remove()
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Map'}],
                })

            } else {
                setLoading(false)
                setErrors(["Cancellation Failed"])
            }
        }).catch(function (error) {
            setLoading(false)

            setErrors(["Network Error" + error])
        });

    }
    async function getRideDetails() {

        let response = await fetch(
            ApiUrl.getRideDetails, {
                headers: {
                    Authorization: "Token " + session.SessionData.Token
                }
            }
        ).then(response => response.json()).then((data) => {
            if (data.status === 200) {
                ride.setData(data.ride);
                setRideDetails(data.ride,data.vehicle)
                let RIDE = data.ride
                let vehicle = data.vehicle

                // let Copy  = Data.PickUpDropOffData;
                // Copy.PickUpData.Address = ride.pickUpAddress.description;
                // Copy.PickUpData.latitude = ride.pickUpAddress.latitude;
                // Copy.PickUpData.longitude = ride.pickUpAddress.longitude;
                // Copy.DropOffData.Address = ride.dropOffAddress.description;
                // Copy.DropOffData.latitude = ride.dropOffAddress.latitude;
                // Copy.DropOffData.longitude = ride.dropOffAddress.longitude;
                // Data.UpdateData(Copy);
                // {"ride": {"distance": 17.126, "driver": {"dp": "/media/userDP/6b221f5b-faf6-47cc-8a42-debb253529ad.jpeg",
                // "phoneNumber": "+923135591707", "rating": 5, "user": [Object]},
                // "driverLocation": null,
                // "dropOffAddress": {"description": "Islamabad, Pakistan", "id": 104, "latitude": 33.6844202, "longitude": 73.04788479999999},
                // "groupId": "91JY2W1DK",
                // "pickUpAddress": {"
                //     description": "116, Street 4, Islamabad", "id": 103, "latitude": 33.6225915, "longitude": 73.1483904},
                //     "rideStatus": "IP"}, "status": 200,
                //     "vehicle": {"model": "2020", "numberPlate": "ABC-245", "vehicleImg": "/media/VehicleImg/f9138492-719d-4e47-a28b-e7c83122c1c9.jpeg"}}


                let RideX = {
                    "DriverName":RIDE.driver.user.first_name,
                    "NumberPlate":vehicle.numberPlate,
                    "VehicleImg":{uri:ApiUrl.dp+vehicle.vehicleImg},
                    "Company":vehicle.company,
                    "model":vehicle.model,
                    "DriverDP":{uri:ApiUrl.dp+RIDE.driver.dp},
                    "DriverRating":RIDE.driver.rating,
                    "DriverPhone":RIDE.driver.phoneNumber,
                }
                setRideInfo(RideX)


            }
        });
    }
    // const backHandler = BackHandler.addEventListener(
    //     "hardwareBackPress",
    //     function () {
    //         if (modalVisible) {
    //             setModalVisible(false)
    //         } else {
    //             setModalVisible(true)
    //         }
    //         return true;
    //     }
    //
    // );
    function setRideDetails(RIDE,vehicle){

    }
    const [times,setTimes] = useState({})
    useEffect(()=>{

        getRideDetails()

    },[])
    const [isRideSheetOpen,setRideSheetOpen ] = useState(false);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",
            position: "absolute",
            width: "100%",
            height: "100%",
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

    if (ride.RideData.driverLocation === null)
        return <Loading />

    return (
        <View style={{flex: 1}}>

            <TrackingMap times={times} setTimes={setTimes} navigation={navigation} style={{width: "100%", height: "100%"}} source={require("../../../assets/img/Basemapimage.png")}/>
            <View style={styles.container}>

                <DriverHeader style={{alignSelf: "flex-start"}} navigation={navigation}/>
                <LoadingModel modalVisible={isLoadingOpen} setModalVisible={setLoading}/>
                <ErrorModel errors={errors} setErrors={setErrors} />
                <View style={{
                    flex: 1,
                    flexDirection: "column",

                }}>

                    <View style={{flex:8}} />

                    <UserCardBookedBottomSheet times={times} setTimes={setTimes} msgScreen={()=>{
                        backHandler.remove()

                        setRideSheetOpen(false);
                        navigation.navigate("Chatting Screen");
                    }} cancel={()=>setModalVisible(true)} locations={Data.PickUpDropOffData} rideinfo={rideInfo} isOpen={isRideSheetOpen} navigation={navigation}  setOpen={setRideSheetOpen} />
                    <CancelModal setModalVisible={setModalVisible} modalVisible={modalVisible} cancel={()=>{
                        setModalVisible(false)
                        setReasonModalVisible(true)
                    }}/>
                    <ReasonModal setModalVisible={setReasonModalVisible} reason={reason} setReason={setReason} modalVisible={reasonModalVisible} cancel={()=>{
                        cancelRide().then(r=> console.log(r))
                    }}/>
                    <Pressable
                        onPress={()=>{
                            setRideSheetOpen(true);
                        }}
                        style={{backgroundColor:"white",justifyContent:"center",alignItems:"center",borderRadius:10,width:40,height:40,alignSelf:"flex-end",marginEnd:25,marginBottom:25}}>
                        <MaterialCommunityIcons name="arrow-up-thick" size={24} color="black" />
                    </Pressable>
                </View>


            </View>
        </View>
    );
}

