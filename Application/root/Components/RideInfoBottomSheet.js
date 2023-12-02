import {View, StyleSheet, Text, Button, Pressable, Image, Dimensions, Linking} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import {useContext, useEffect, useRef, useState} from "react";
import {ProgressBar} from "react-native-paper";
import {AntDesign} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';
import {ScrollView} from "react-native";
import DPCircle from "./DPCircle";
import RideEndedModal from "../Screens/Modal/RideEndedModal";
import {RideAcceptedContext} from "../Context/RideAcceptedContext";
import {ApiUrl} from "../Urls/ApiUrls";
import StatusCode from "../Urls/StatusCode";


function tConvert(time) {
    // Check correct time format and split into components
    let x = time.split(":")
    if(x[0].length===1)
        x[0] = "0"+x[0]
    if(x[1].length===1)
        x[1] = "0"+x[1]
    time=x[0]+":"+x[1]
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join('');
}
export default function RideInfoBottomSheet(props) {
    const Ride = useContext(RideAcceptedContext);
    let duration = parseFloat(props.times.duration)
    let Rduration=duration.toFixed(5)
    let date = new Date()

    let current = new Date(date.getTime() + Rduration*60000);
    let currentTime= new Date()
    currentTime = currentTime.getHours()+":"+currentTime.getMinutes()
    currentTime = tConvert(currentTime)
    let pickupDuration = current.getHours()+":"+current.getMinutes()
    pickupDuration = tConvert(pickupDuration)
    let rideDuration = Ride.RideData.duration
    rideDuration = parseFloat(rideDuration).toFixed(2)
    let dropOffDuration = new Date(date.getTime() + rideDuration*60000);

    dropOffDuration = dropOffDuration.getHours()+":"+dropOffDuration.getMinutes()
    dropOffDuration = tConvert(dropOffDuration)
    let pickupTime = ""
    if(Ride.RideData.pickUpTime)
    {
        pickupTime = Ride.RideData.pickUpTime
        pickupTime = pickupTime.substring(0,5)
        pickupTime = tConvert(pickupTime)
    }

    let dropOffTime = current

    dropOffTime = dropOffTime.getHours()+":"+dropOffTime.getMinutes()
    dropOffTime = tConvert(dropOffTime)

    const refRBSheet = useRef();
    const isEnable = useRef(true)
    const imageSize = 46;
    const CirlceSize = 15;
    const Status = [
        "I’ve Arrived",
        "Start Ride",
        "End RIde",
    ]
    useEffect(() => {
        if (props.isopen)
            refRBSheet.current.open()
        else
            refRBSheet.current.close()
    }, [props.isopen])
    const styles = StyleSheet.create({
        container: {
            padding: 10,
            marginTop: 20,
            flexDirection: "column"
        },
        StyleSheetConainer: {
            backgroundColor: "#fff",
            borderTopLeftRadius: 27,
            borderTopRightRadius: 27,
            shadowOffset: {width: -8, height: 4},
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 10,
        },
        PicContainer: {
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            flexDirection: "row",

        },
        dp: {
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize / 2,
            alignSelf: "flex-start"
        },
        button: {
            width: 43,
            height: 43,
            shadowOffset: {width: -8, height: 4},
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 4,
            borderRadius: 10,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: 'center'
        }, Circle: {
            width: CirlceSize,
            height: CirlceSize,
            borderRadius: CirlceSize / 2,
            backgroundColor: "blue",
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
        Button: {
            backgroundColor: "black",
            flex: 1,
            borderRadius: 10,
            height: 50,

            alignContent: "center",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
        }

    });
    let dp = Ride.RideData.rider.dp;

    function  getText(){
        if (Ride.RideData.rideStatus === "IP")
            return Status[0]
        else if (Ride.RideData.rideStatus === "DR_AR")
            return Status[1]
        else if (Ride.RideData.rideStatus === "RD_ST")
            return Status[2]
    }
    return (

        <RBSheet
            ref={refRBSheet}
            openDuration={250}
            height={400}
            onClose={() => props.setOPen(false)}
            closeOnDragDown={false}
            closeOnPressMask={false}

            customStyles={{
                container: styles.StyleSheetConainer,
                wrapper: {
                    backgroundColor: "transparent"

                },
                draggableIcon: {
                    backgroundColor: "#fff"
                }
            }}
        >

            <ScrollView>
                <View style={styles.container}>

                    <View style={{
                        height: 0.3,
                        width: "100%",
                        backgroundColor: "#00000038",
                        marginTop: 7,
                        marginBottom: 7
                    }}/>
                    <View style={styles.PicContainer}>
                        <DPCircle source={{uri: ApiUrl.dp + dp}}/>
                        <View style={{
                            backgroundColor: "#fff",
                            flex: 1,
                            justifyContent: "center",
                            marginStart: 10,
                            flexDirection: "row",
                        }}>
                            <Text style={{fontWeight: "500", flex: 1, fontFamily: "Poppins_400Regular", fontSize: 14}}>
                                {Ride.RideData.rider.user.first_name} {Ride.RideData.rider.user.last_name}
                            </Text>
                            <Pressable
                                onPress={() => {
                                    props.setOPen(false);
                                    props.navigation.navigate("Chatting Screen")
                                }}
                                style={styles.button}>
                                <AntDesign name="message1" size={24} color="#BCC3FF"/>
                            </Pressable>
                            <Pressable onPress={()=>{
                                Linking.openURL(`tel:`+Ride.RideData.driver.phoneNumber)

                            }} style={[styles.button, {marginLeft: 10}]}>
                                <FontAwesome name="phone" size={24} color="#BCC3FF"/>
                            </Pressable>

                        </View>
                    </View>
                    <View style={{
                        height: 0.3,
                        width: "100%",
                        backgroundColor: "#00000038",
                        marginTop: 7,
                        marginBottom: 7
                    }}/>
                    <View>
                        <View style={{backgroundColor: "white", flexDirection: "column", alignItems: "center"}}>
                            <View style={{flexDirection: "row"}}>
                                <View style={[styles.Circle]}>
                                    <View style={[styles.innerCircle]}/>
                                </View>
                                <Text numberOfLines={1} style={{
                                    fontWeight: "500",
                                    fontFamily: "Poppins_400Regular",
                                    fontSize: 14,
                                    marginStart: 5,
                                    flex: 1
                                }}>
                                    {Ride.RideData.pickUpAddress.description}
                                </Text>
                                <Text style={{
                                    fontWeight: "400",
                                    fontFamily: "Poppins_400Regular",
                                    fontSize: 13,
                                    marginStart: 5,
                                    marginEnd: 4
                                }}>
                                </Text>
                            </View>
                            <View style={{flexDirection: "row"}}>
                                <View style={{
                                    width: 1,
                                    backgroundColor: "black",
                                    height: 40,
                                    marginTop: -5,
                                    marginStart: CirlceSize / 2
                                }}/>
                                <Text style={{
                                    fontWeight: "bold",
                                    marginStart: 5,
                                    fontFamily: "Poppins_400Regular",
                                    flex: 1
                                }}>
                                </Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                marginTop: -2,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>

                                <View style={[styles.Circle, {backgroundColor: "black"}]}>
                                    <View style={[styles.innerCircle]}/>
                                </View>
                                <Text numberOfLines={1} style={{
                                    fontWeight: "500",
                                    fontSize: 14,
                                    marginStart: 5,
                                    fontFamily: "Poppins_400Regular",
                                    flex: 1
                                }}>
                                    {Ride.RideData.dropOffAddress.description}
                                </Text>

                            </View>
                            <View style={{flexDirection: "row", width: "100%", padding: 10, marginTop: 25}}>
                                <View>
                                    <Text style={{
                                        fontWeight: "500",
                                        fontSize: 13,
                                        fontFamily: "Poppins_400Regular",
                                        marginBottom: 5
                                    }}>
                                        Pickup
                                    </Text>
                                    <Text style={{fontFamily: "Poppins_400Regular",}}>
                                        {Ride.RideData.rideStatus === "IP"? pickupDuration : Ride.RideData.rideStatus==="DR_AR" ? currentTime :Ride.RideData.rideStatus==="RD_ST"? pickupTime:null}
                                    </Text>
                                </View>
                                <Image source={require("../../assets/img/Arrow).png")}
                                       style={{marginStart: 30, marginEnd: 30, flex: 1}}
                                />
                                <View>
                                    <Text style={{
                                        fontWeight: "500",
                                        fontSize: 13,
                                        marginBottom: 5,
                                        fontFamily: "Poppins_400Regular",
                                    }}>
                                        Drop Off
                                    </Text>
                                    <Text style={{fontFamily: "Poppins_400Regular",}}>
                                        {Ride.RideData.rideStatus === "IP"? dropOffDuration: dropOffTime}
                                    </Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                padding: 10,
                                width: "100%",
                                justifyContent: "center"
                            }}>

                                {
                                    Ride.RideData.rideStatus === "IP" ?
                                        <Pressable style={[styles.Button, {backgroundColor: "#E0E0E0"}]}
                                        >
                                            <Text style={{
                                                color: "black",
                                                fontWeight: "500",
                                                fontFamily: "Poppins_400Regular",
                                            }}>
                                                Cancel
                                            </Text>
                                        </Pressable> : null}
                                <Pressable style={[styles.Button, {backgroundColor: "black", marginStart: 10,}]}
                                           onPress={() => {
                                               if (  isEnable.current) {
                                                   isEnable.current = false;
                                                   props.UpdateRideState();
                                                   setTimeout(()=>isEnable.current=true,3000)
                                               }
                                           }}
                                >
                                    <Text
                                        style={{color: "white", fontWeight: "500", fontFamily: "Poppins_400Regular",}}>
                                        {
                                            getText()
                                        }
                                    </Text>
                                </Pressable>

                            </View>

                        </View>
                    </View>

                </View>
            </ScrollView>
        </RBSheet>


    )
}