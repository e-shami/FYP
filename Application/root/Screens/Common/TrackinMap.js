import React, {useContext} from "react";
import {Alert, Image, StyleSheet, Text, View} from "react-native";
import MapView, {Marker} from "react-native-maps";
import generatedMapStyle from "../Maps/MapStyle";
import MapViewDirections from "react-native-maps-directions";
import GOOGLE_MAP_API_KEY from "../../Config/GoogleApiConfig";
import * as Location from "expo-location";
import {SessionContext} from "../../Context/SessionContext";
import {RideAcceptedContext} from "../../Context/RideAcceptedContext";
import {WsUrls} from "../../Urls/ApiUrls";
import STATUS_CODE from "../../Urls/StatusCode";
import { PROVIDER_GOOGLE } from "react-native-maps"

import * as Notifications from "expo-notifications";
import {NotificationContext} from "../../Context/NotificationContext";

function Circle(props) {
    let text = props.text;
    let color = "blue";
    if (props.color)
        color = props.color;
    const CirlceSize = 15;

    const styles = StyleSheet.create({
        Circle: {
            width: CirlceSize,
            height: CirlceSize,
            borderRadius: CirlceSize / 2,
            backgroundColor: color,
            justifyContent: "center",
            alignItems: "center",
        },
        innerCircle: {
            width: CirlceSize / 2,
            height: CirlceSize / 2,
            borderRadius: CirlceSize / 4,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
        },
        text: {
            color: "black",
            fontWeight: "500",
            fontSize: 12,
        }

    })

    return (
        <View style={{alignItems: "center", justifyContent: "center"}}>
            <Text style={styles.text}>{text}</Text>
            <View style={[styles.Circle]}>
                <View style={[styles.innerCircle]}/>
            </View>
        </View>
    )
}


function TrackingMap(props) {


    return <TrackingMapContext notificationData={useContext(NotificationContext)} session={useContext(SessionContext)} ride={useContext(RideAcceptedContext)} {...props} />


}


class TrackingMapContext extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            MyCurrentLoc: {
                latitude: 0,
                longitude: 0,
            },
            heading: "0"

        };
    }

    async sendRideCompletedNotificationToDriver(rideID, person,fare) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Your Ride ended with " + person,
                body: 'Total fare for the ride was '+fare+"P.",
                data: {data: 'Ride Ended'},
                sound: 'notification1.wav'
            },
            trigger: {seconds: 1},
        });
    }
    async sendRideCompletedNotificationToRider(rideID,person) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Your Ride ended with "+person,
                body: 'Dont forget to share your experience by rating your ride',
                data: {data: 'Ride Ended'},
                sound: 'notification1.wav'
            },
            trigger: {seconds: 1},
        });
    }

    ResetView() {
        this.forceUpdate();
    }

    cord = null
    subscribeLocationLocation = async  () => {
        this.cord = await  Location.watchPositionAsync({
            enableHighAccuracy: true,
            accuracy: Location.Accuracy.Highest,
            distanceInterval: 1,
            timeInterval: 5000,
        }, location => {
            let my = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                heading: location.coords.heading
            }

            if (this.WebSocket !== null) {
                try {
                    this.WebSocket.send(JSON.stringify({
                        "status": STATUS_CODE.IN_COMING_MSG,
                        data: my,
                    }))
                } catch (E) {

                }

                console.log(my);


            }

        });
    }
    delta = {
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0922,

    }
    flag = true
    WebSocket = null

    componentDidMount() {

        if (this.flag === false)
            return
        this.WebSocket = new WebSocket(WsUrls.RideLocationSharingGroup);
        this.WebSocket.onopen = () => {
            this.WebSocket.send(
                JSON.stringify({
                    "status": STATUS_CODE.CONNECTION_REQ,
                    "rideId": this.props.ride.RideData.id,
                    "GroupId": this.props.ride.RideData.groupId + JSON.stringify(this.props.ride.RideData.id),
                })
            )
        }
        this.WebSocket.onmessage = (e) => {
            try {
                let response = JSON.parse(e.data)
                if (response.status === STATUS_CODE.IN_COMING_MSG) {
                    if (response.data.rider !== undefined)
                        this.props.ride.setData(response.data)
                }

            } catch (Exef) {

            }

        };
        this.flag = false;
        if (this.props.ride.RideData.driver.user.id === this.props.session.SessionData.id )
            this.subscribeLocationLocation();


    }

    componentDidUpdate(prev) {


    }

    myLocation = null
    DropRegion = null

    render() {
        if (this.props.ride.RideData.rideStatus === "CMP") {

            if (this.cord !== null){
                this.cord.remove();
            }
            this.props.navigation.reset({
                index: 0,
                routes: [{name: 'RideDetail',params: {id: this.props.ride.RideData.id,showEndModal:true}}],
            })

        }

        this.myLocation = {
            ...this.delta,
            ...this.props.ride.RideData.driverLocation,
        }
        if (this.props.ride.RideData.rideStatus === "IP")
            this.DropRegion = {
                ...this.delta,
                ...this.props.ride.RideData.pickUpAddress
            }
        else
            this.DropRegion = {
                ...this.delta,
                ...this.props.ride.RideData.dropOffAddress
            }
        let heading = 0
        if (this.props.ride.RideData.driverLocation.heading)
        {
            heading = this.props.ride.RideData.driverLocation.heading
        }
        return (
            <MapView style={this.props.style}
                     provider={PROVIDER_GOOGLE}
                     customMapStyle={generatedMapStyle}
                     onRegionChangeComplete={(region) => {

                         this.delta = {
                             latitudeDelta: region.latitudeDelta,
                             longitudeDelta: region.longitudeDelta,
                         }

                     }}
                     region={this.myLocation}
            >


                <Marker.Animated
                    key={1}
                    tracksViewChanges={false}
                    icon={require("../../../assets/img/car.png")}
                    flat
                    style={
                        {
                            width:"7%",
                            height:"10%",
                            transform: [{rotate: heading + "deg"}]

                        }
                    }
                    anchor={{x: 0.5, y: 0.5}}
                    coordinate={{
                        ...this.delta,
                        ...this.props.ride.RideData.driverLocation,
                    }}

                >


                </Marker.Animated>


                <Marker
                    key={2}
                    tracksViewChanges={false}

                    coordinate={this.DropRegion}
                >
                    <Circle text={this.props.ride.RideData.rideStatus === "IP" ? "Pick Up" : "Drop Off"}
                            color={this.props.ride.RideData.rideStatus === "IP" ? "blue" : "black"}/>
                </Marker>
                <MapViewDirections
                    onReady={result => {
                        let distance = result.distance
                        let duration = result.duration
                        let times={'duration':duration}
                        if(this.props.setTimes){
                            this.props.setTimes(times)
                        }
                    }}
                    strokeWidth={2}
                    optimizeWaypoints={true}
                    origin={this.myLocation}
                    destination={this.DropRegion}
                    apikey={GOOGLE_MAP_API_KEY}
                />


            </MapView>

        )
    }

}

export default TrackingMap;
