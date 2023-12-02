import {Image, Pressable, StyleSheet, Text} from "react-native";
import {View} from "react-native";
import {ProgressBar, Colors} from 'react-native-paper';
import UberButtonBlack from "./uberButton";
import DPCircle from "./DPCircle";
import ApiUrls, {ApiUrl} from "../Urls/ApiUrls";
import {useEffect, useRef, useState} from "react";

export default function RideRequest(props) {
    const imageSize = 40;
    const CirlceSize = 12;
    const timing = useRef(props.time);
    const [progress,setProgress] = useState(props.time);
    const  interval = useRef(null);
    useEffect(()=>{
        if (interval.current == null){
            interval.current = setInterval(()=>{
                let per = (timing.current/props.time);
                timing.current = timing.current -1;
                setProgress(per)
                if (timing.current<=0){
                    clearInterval(interval.current);
                    setProgress(0);
                }
            },1000)
        }


    },[])

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            backgroundColor: "transparent",
            alignItems: 'center',
            padding: 14,
            justifyContent: 'center',
        },
        MainContainer: {
            width: "100%",
            backgroundColor: "#fff",
            flexDirection: "column",
            borderRadius: 20,
            padding: 10,
            shadowOffset: {width: -10, height: 4},
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 5
        },
        PicContainer: {
            padding: 10,
            width:"50%",
            flex:3,
            alignItems: 'center',
            flexDirection: "row",

        },
        dp: {
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize / 2,
            alignSelf: "flex-start"
        }, Circle: {
            width: CirlceSize,
            height: CirlceSize,
            borderRadius: CirlceSize / 2,
            backgroundColor: "#0066FF",
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
        title: {
            color: "rgba(0, 0, 0, 0.5)",
            fontSize: 10,
            fontWeight:"400",
            fontFamily:"Poppins_400Regular",
        }
        ,
        Address: {
            fontWeight: "400",
            fontSize: 13,
            fontFamily:"Poppins_400Regular",
        },
        titleAddressContainer: {
            paddingStart: 20,
            flex:1
        },
        Button: {
            backgroundColor: "black",
            width: "45%",
            borderRadius: 10,
            height: 50,
            alignContent: "center",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.MainContainer}>
                <View style={{flexDirection:"row",width:"100%"}}>
                    <View style={styles.PicContainer}>
                        <DPCircle source={{uri:ApiUrl.dp+props?.data?.rider?.dp}} imageSize={imageSize}  />
                        <View style={{width: "100%", marginStart: 10, flexDirection: "column",}}>
                            <Text  style={{fontWeight: "500",fontFamily:"Poppins_400Regular", fontSize: 15}}>
                                {props.data.rider.user.first_name } {props.data.rider.user.last_name }
                            </Text>
                            <ProgressBar style={{marginTop: 3, borderRadius: 30, height: 5,}} progress={progress}
                                         color={"#0066FF"}/>

                        </View>
                    </View>
                    <View style={{paddingTop:25,paddingRight:0,marginLeft:55,marginRight:1,width:"40%",flexDirection:"row",flex:2}}>
                        <View style={{alignSelf:"center",padding:8,backgroundColor:"black",marginRight:3,borderRadius:10,flexDirection:"row"}}>

                            <Text style={{color:"white",fontSize:8,alignSelf:"flex-end"}}>R</Text>
                            <Text style={{color:"white",fontSize:12}}>{parseFloat(props.data.fare).toFixed(1)}</Text>

                        </View>
                        <Text style={{fontWeight:"400",alignSelf:"flex-end",fontSize:12,color:"rgba(0, 0, 0, 0.5)"}}>Est fare</Text>
                    </View>
                </View>

                <View style={{backgroundColor: "#fff", padding: 10, flexDirection: 'row'}}>
                    <View style={{flexDirection: "column", alignItems: "center"}}>
                        <View style={[styles.Circle]}>
                            <View style={[styles.innerCircle]}/>
                        </View>
                        <View style={{width: 1, backgroundColor: "black", height: 40}}/>
                        <View style={[styles.Circle, {backgroundColor: "black"}]}>
                            <View style={[styles.innerCircle]}/>
                        </View>

                    </View>
                    <View style={styles.titleAddressContainer}>
                        <View>
                            <Text style={styles.title}>
                                Pickup
                            </Text>
                            <Text  numberOfLines={1} style={styles.Address}>
                                {props.data.pickUpAddress.description}
                            </Text>
                        </View>
                        <View style={{backgroundColor: "rgba(0,0,0,0.1)", height: 1, marginTop: 5, marginBottom: 5}}/>
                        <View>
                            <Text style={styles.title}>
                                Dropoff
                            </Text>
                            <Text  numberOfLines={1} style={styles.Address}>
                                {props.data.dropOffAddress.description}
                            </Text>
                        </View>
                    </View>
                    <Image source={require("../../assets/img/UpdownArrow.png")}
                           style={{marginStart: 10, alignSelf: "center"}}/>
                    <View style={{alignSelf:"center",backgroundColor:"lightgreen",padding:5,borderRadius:8,marginLeft:5}}>
                        <Text>{parseFloat(props.data.distance).toFixed(1)} Km</Text>
                    </View>

                </View>
                <View style={{flexDirection: "row", padding: 10, width: "100%", justifyContent: "center"}}>
                    <Pressable style={[styles.Button, {backgroundColor: "#E0E0E0"}]}
                    >
                        <Text style={{color: "black",fontFamily:"Poppins_400Regular", fontWeight: "500"}}>
                            Reject
                        </Text>
                    </Pressable>
                    <Pressable style={[styles.Button, {backgroundColor: "black", marginStart: 10}]}
                               onPress={()=>props.onAccept(props.data)}
                    >
                        <Text style={{color: "white",fontFamily:"Poppins_400Regular", fontWeight: "500"}}>
                            Accept
                        </Text>
                    </Pressable>

                </View>


            </View>

        </View>
    )
}