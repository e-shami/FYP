import {View, StyleSheet, Text, Button, Pressable, Image, Dimensions} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import {useContext, useEffect, useRef, useState} from "react";
import {ProgressBar} from "react-native-paper";
import {AntDesign, Entypo} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';
import {ScrollView} from "react-native";
import DPCircle from "../DPCircle";
import UberButtonBlack from "../uberButton";
import {RideAcceptedContext} from "../../Context/RideAcceptedContext";
import {Linking} from 'react-native'


export default function UserCardBookedBottomSheet(props) {
    const [state, setState] = useState(0);
    let rideInfo = props.rideinfo
    let locations = props.locations
    const refRBSheet = useRef();
    function tConvert(time) {
        let x = time.split(":")
        if(x[0].length===1)
            x[0] = "0"+x[0]
        if(x[1].length===1)
            x[1] = "0"+x[1]
        time=x[0]+":"+x[1]
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1); // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join('');
    }
    const ride = useContext(RideAcceptedContext);
    let duration = parseFloat(props.times.duration)
    let Rduration=duration.toFixed(2)
    let date = new Date()

    let current = new Date(date.getTime() + duration*60000);
    let currentTime= new Date()
    currentTime = currentTime.getHours()+":"+currentTime.getMinutes()
    currentTime = tConvert(currentTime)
    let pickupDuration = current.getHours()+":"+current.getMinutes()
    pickupDuration = tConvert(pickupDuration)
    let rideDuration = ride.RideData.duration
    rideDuration = parseFloat(rideDuration).toFixed(2)
    let dropOffDuration = new Date(date.getTime() + rideDuration*60000);
    dropOffDuration = dropOffDuration.getHours()+":"+dropOffDuration.getMinutes()
    dropOffDuration = tConvert(dropOffDuration)
    current = current.getHours()+":"+current.getMinutes()
    let pickupTime = ""
    if(ride.RideData.pickUpTime)
    {
        pickupTime = ride.RideData.pickUpTime
        pickupTime = pickupTime.substring(0,5)
        pickupTime = tConvert(pickupTime)
    }
    current = tConvert(current)
    const imageSize = 46;
    const CirlceSize = 15;
    const Status = [
        "I’ve Arrived",
        "Start Ride",
        "End RIde",
    ]
    useEffect(() => {
        if (props.isOpen)
            refRBSheet.current.open()
        else
            refRBSheet.current.close()

    },[props.isOpen])
    const styles = StyleSheet.create({
        container: {
            padding: 10,
            flexDirection: "column"
        },
        StyleSheetConainer: {
            backgroundColor: "#fff",
            borderTopLeftRadius: 27,
            marginBottom:1,
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
    return (

        <RBSheet
            ref={refRBSheet}
            openDuration={250}
            height={410}

            onClose={()=>props.setOpen(false)}
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
                container: styles.StyleSheetConainer,
                wrapper: {
                    backgroundColor: "transparent"

                },
                draggableIcon: {
                    width: 93,
                    backgroundColor: "#0101011F"
                }
            }}
        >

            <ScrollView>
                <View style={styles.container}>
                    <Text style={{fontSize: 14, fontWeight: "400", fontFamily: "Poppins_400Regular",}}>
                        {ride.RideData.rideStatus ==="IP"? "Driver is "+Rduration+" minutes Away.": ride.RideData.rideStatus ==="DR_AR"? "Driver has arrived.":"Ride Started."}
                    </Text>
                    <View style={{
                        height: 0.3,
                        width: "100%",
                        backgroundColor: "#00000038",
                        marginTop: 7,
                        marginBottom: 7
                    }}/>
                    <View style={styles.PicContainer}>
                        <DPCircle source={rideInfo.DriverDP}  imageSize={46}/>
                        <View style={{
                            backgroundColor: "#fff",
                            flex: 1,
                            justifyContent: "center",
                            marginStart: 10,
                            flexDirection: "row",
                        }}>
                            <View style={{
                                flex: 1,
                                flexDirection: "column",
                            }}>
                                <Text style={{
                                    fontWeight: "500",
                                    flex: 1,
                                    fontFamily: "Poppins_400Regular",
                                    fontSize: 14
                                }}>
                                    {rideInfo.DriverName}
                                </Text>
                                <View style={{flexDirection:"row",alignItems:"center"}}>
                                    <Entypo name="star" size={14} color="#F4C01E" />
                                    <Text style={{fontWeight:"400",fontSize:12,marginStart:4}}>
                                        {parseFloat(rideInfo.DriverRating).toFixed(1)}
                                    </Text>
                                </View>

                            </View>

                            <View style={{flexDirection: "column"}}>
                                <Image source={rideInfo.VehicleImg}
                                       style={{width: 40, height: 23, alignSelf: "flex-end"}}/>
                                <Text style={{fontWeight: "300", fontSize: 10, marginTop: 4,}}>
                                    {rideInfo.Company} ({rideInfo.model}) - <Text style={{fontWeight: "500", fontSize: 10}}>{rideInfo.NumberPlate}</Text>
                                </Text>

                            </View>
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
                                    {ride.RideData.pickUpAddress.description}
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
                                    marginTop: -10,
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
                                marginTop: -8,
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
                                    {ride.RideData.dropOffAddress.description}
                                </Text>
                                <Text style={{
                                    fontWeight: "400",
                                    fontSize: 13,
                                    marginStart: 5,
                                    fontFamily: "Poppins_400Regular",
                                    marginEnd: 4
                                }}>
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
                                        {ride.RideData.rideStatus === "IP"? pickupDuration : ride.RideData.rideStatus==="DR_AR" ? currentTime : pickupTime}
                                    </Text>
                                </View>
                                <Image source={require("../../../assets/img/Arrow).png")}
                                       style={{marginStart: 30, marginEnd: 30, flex: 1}}
                                />
                                <View>
                                    <Text style={{
                                        fontWeight: "500",
                                        fontSize: 13,
                                        marginBottom: 5,
                                        fontFamily: "Poppins_400Regular",
                                    }}>
                                        Drop off
                                    </Text>
                                    <Text style={{fontFamily: "Poppins_400Regular",}}>
                                        {ride.RideData.rideStatus === "IP"? dropOffDuration: current}
                                    </Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                padding: 10,
                                alignSelf: "auto",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>


                                <Pressable
                                    onPress={() => {
                                        props.msgScreen()
                                    }}
                                    style={[styles.button]}>
                                    <AntDesign name="message1" size={24} color="#BCC3FF"/>
                                </Pressable>
                                <Pressable onPress={()=>{
                                    Linking.openURL(`tel:`+ride.RideData.driver.phoneNumber)

                                }} style={[styles.button, {marginLeft: 10, marginRight: 10}]}>
                                    <FontAwesome name="phone" size={24} color="#BCC3FF"/>
                                </Pressable>
                                <UberButtonBlack
                                    onPress={props.cancel}
                                    textStyle={{color: "black"}}
                                    style={{backgroundColor: "#E0E0E0", height: 45,}}
                                    text={"Cancel"}/>
                            </View>

                        </View>
                    </View>

                </View>
            </ScrollView>
        </RBSheet>


    )
}