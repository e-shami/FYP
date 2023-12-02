import * as React from 'react';
import {View, Image, Pressable, StyleSheet, ScrollView, Platform, ToastAndroid} from 'react-native';
import DriverHeader from "../../Components/DriverHeader";
import ChangeStatus from "../../Components/ChangeStatus";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useContext, useEffect, useRef, useState} from "react";
import ApiUrls, {ApiUrl} from "../../Urls/ApiUrls";
import {SessionContext} from "../../Context/SessionContext";
import * as Location from "expo-location";
import RideRequest from "../../Components/RideRequest";
import MapPickUpDropOff from "../Maps/MapPickUpDropOff";
import LoadingModel from "../Modal/loadingModel";
import STATUS_CODE from "../../Urls/StatusCode";
import {RideAcceptedContext} from "../../Context/RideAcceptedContext";
import AlertIOS from "react-native/Libraries/Alert/Alert";

export default function DriverMap({navigation}) {
    const ButtonSize = 47;
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
            marginBottom: 20,
            shadowOffset: {width: -10, height: 4},
            shadowOpacity: 0.8,
            shadowRadius: 20,
            elevation: 5,
            alignSelf: "flex-end",
            marginEnd: 20,

        }
    });
    const [isEnable, setEnable] = useState(false);
    const Status = useRef(false);
    const SearchingRideInterval = useRef(null);
    const [RidesData, setRideData] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const Session = useContext(SessionContext);
    const Ride = useContext(RideAcceptedContext);

    async function getCurrentLocation() {
        let {status} = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            alert("Permission not granted", "Allow the app to use location service.", [{text: "OK"}], {cancelable: false});
            return null;
        }

        let {coords} = await Location.getCurrentPositionAsync();
        if (coords) {
            const {latitude, longitude} = coords;
            return new Object({
                lat: latitude,
                long: longitude,
            })
        }
    }

    function StartSearchingForRides() {
        SearchingRideInterval.current = setInterval(async () => {
            let loc = null;
            try {
                loc = await getCurrentLocation();
            } catch (Exection) {
                return;
            }

            if (loc === null)
                return;
            console.log(loc);
            fetch(ApiUrl.NearbyRides, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    Authorization: "Token " + Session.SessionData.Token,
                },
                body: JSON.stringify(loc),
            }).then(results => results.json()).then(response => {
                if (response.status === 200) {
                    console.log(response);
                    if (isEnable === false) {
                        setRideData([])
                        return;
                    }

                    setRideData([...response.Ride])
                }
            }).catch((error) => {
                console.log(error)
            })

        }, 5000)
    }

    useEffect(() => {
        if (Status.current === false) {
            Status.current = true;
            return;
        }
        if (isEnable === false) {
            clearInterval(SearchingRideInterval.current);

        } else {
            StartSearchingForRides();
        }
        setRideData([]);
    }, [isEnable])

    const MapRef = useRef();

    async function rideAccepted(data) {
        setModalVisible(true);
        setEnable(false)
        let loc = await getCurrentLocation();
        await fetch(ApiUrl.rideAccepted, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                Authorization: "Token " + Session.SessionData.Token,
            },
            body: JSON.stringify({
                ...data,
                ...loc
            }),
        }).then(response => response.json()).then((data) => {
            if (data.status === STATUS_CODE.RIDE_NOT_FOUND) {
                setModalVisible(false);
                setEnable(true)
            } else if (data.status === STATUS_CODE.RIDE_ACCEPTED_SUCCESSFULLY) {
                setModalVisible(false);
                Ride.setData(data.msg);
                navigation.reset({

                    index: 0,
                    routes: [{name: 'RideBottomSheet'}],
                });

            }
        }).catch((error) => {
            if (Platform.OS === 'android') {
                ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
            } else {
                AlertIOS.alert('Something went wrong');
            }
            setModalVisible(false);
            setEnable(true)
        })
    }

    return (
        <View style={{flex: 1}}>

            <MapPickUpDropOff showCar={false} MarkerText={""} ref={MapRef} latitudeDelta={0.0033}
                              longitudeDelta={0.0033} style={{width: "100%", height: "100%"}}/>
            <View style={styles.container}>
                <DriverHeader style={{alignSelf: "flex-start"}} navigation={navigation}/>
                <View style={{
                    flex: 1,
                    flexDirection: "column-reverse",

                }}>


                    <ChangeStatus isEnable={isEnable} setEnable={setEnable}
                                  style={{alignSelf: "flex-end", marginStart: 22, marginEnd: 22, marginBottom: 14}}/>

                    <View style={{maxHeight: "80%"}}>
                        <ScrollView>
                            {
                                RidesData.map((item, index) => {
                                    return <RideRequest navigation={navigation} time={30} data={item} key={index}
                                                        onAccept={(data) => {
                                                            rideAccepted(data);

                                                        }
                                                        }/>
                                })
                            }

                        </ScrollView>
                    </View>
                    <Pressable onPress={() => {
                        MapRef.current.ResetView();
                    }} style={styles.button}>
                        <Image source={require("../../../assets/img/dotmap.png")} style={{width: 24, height: 24}}/>
                    </Pressable>

                    <LoadingModel modalVisible={modalVisible} setModalVisible={setModalVisible}/>

                </View>


            </View>
        </View>
    );
}

