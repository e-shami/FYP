import * as React from 'react';
import {View, Image, Pressable, StyleSheet} from 'react-native';
import {StatusBar} from "expo-status-bar";
import DriverHeader from "../../Components/DriverHeader";
import ChangeStatus from "../../Components/ChangeStatus";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import RideEnded from "../../Components/RideEnded";
import RideRequest from "../../Components/RideRequest";
import RideInfoBottomSheet from "../../Components/RideInfoBottomSheet";
import {useContext, useRef, useState} from "react";
import RideEndedModal from "../Modal/RideEndedModal"
import TrackingMap from "../Common/TrackinMap";
import {WsUrls} from "../../Urls/ApiUrls";
import STATUS_CODE from "../../Urls/StatusCode";
import {RideAcceptedContext} from "../../Context/RideAcceptedContext";

//create your forceUpdate hook
function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // An function that increment 👆🏻 the previous state like here
    // is better than directly setting `value + 1`
}

export default function DriverDashboard({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [isOPen, setOpen] = useState(true);
    const ride = useContext(RideAcceptedContext);

    const ButtonSize = 47;
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
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
            marginBottom: 10,
            shadowOffset: {width: -10, height: 4},
            shadowOpacity: 0.8,
            shadowRadius: 20,
            elevation: 5,
            alignSelf: "flex-end",
            marginEnd: 20,

        }
    });

    const forceUpdate = useForceUpdate();

    function setModalVisible2(props) {
        alert(ride.RideData.id)
        // navigation.navigate("Ride Detail",{id:ride.RideData.id});
    }


    function UpdateRideState() {
       let webSocket = new WebSocket(WsUrls.RideLocationSharingGroup);

        webSocket.onopen = () => {
            webSocket.send(
                JSON.stringify({
                    "status": STATUS_CODE.CONNECTION_REQ,
                    "rideId": ride.RideData.id,
                    "GroupId": ride.RideData.groupId + JSON.stringify(ride.RideData.id),
                })
            );
            var time = new Date().getTime()

            webSocket.send(
                JSON.stringify({

                    "status": STATUS_CODE.CHANGE_ONGOING_RIDE_STATUS,
                    "time": time,
                    "rideTime": time,
                    "distance":ride.RideData.distance,

                })
            )
        }
        webSocket.close();
    }
    const [times,setTimes] = useState({})

    return (
        <View style={{flex: 1}}>
            <StatusBar backgroundColor={"#fff"}/>
            <TrackingMap times={times} setTimes={setTimes} navigation={navigation} style={{width: "100%", height: "100%"}}
                         source={require("../../../assets/img/Basemapimage.png")}/>
            <View style={styles.container}>
                <DriverHeader style={{alignSelf: "flex-start"}} navigation={navigation}/>
                <RideEndedModal modalVisible={modalVisible} setModalVisible={setModalVisible2}/>


                <RideInfoBottomSheet times={times} setTimes={setTimes} UpdateRideState={UpdateRideState} setOPen={setOpen} isopen={isOPen}
                                     navigation={navigation} setModalVisible={setModalVisible}/>

                <Pressable
                    onPress={() => {

                        setOpen(true);
                    }}
                    style={{
                        marginBottom: 50,
                        backgroundColor: "white",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        width: 40,
                        height: 40,
                        alignSelf: "flex-end",
                        marginEnd: 15,
                    }}>
                    <MaterialCommunityIcons name="arrow-up-thick" size={24} color="black"/>
                </Pressable>

            </View>

        </View>
    );
}

