import {Image, Pressable, StyleSheet, ImageBackground, Text, Alert} from "react-native";
import {View} from "react-native";
import {ProgressBar, Colors} from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import UberButtonBlack from "../uberButton";
import {RadioButton } from "react-native-paper";
import {useState} from "react";
const image = require("../../../assets/img/blur3.png");

export default function CancelReason(props) {
    const imageSize = 50;
    const CirlceSize = 20;
    const [reason, setReason] = useState(0);
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "transparent",

            flex:1,
            alignItems: 'center',
            padding: 20,
            justifyContent: 'center',
        },
        MainContainer: {
            width: "100%",
            backgroundColor: "#fff",
            flexDirection: "column",
            borderRadius: 20,
            padding: 10,
            paddingHorizontal:20,
            shadowOffset: {width: -10, height: 4},
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 30
        },
        PicContainer: {
            padding: 10,
            alignItems: 'center',
            alignSelf:"center",

        },
        pic: {
            textAlign:"center",
            alignSelf: "center"
        },
        Right:{

            alignSelf:"flex-end"
        }
        ,
        Circle: {
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
        title: {
            color: "rgba(0, 0, 0, 0.5)",
            fontSize: 14,
        }
        ,
        Address: {
            fontWeight: "bold",
            fontSize: 18,
        },
        titleAddressContainer: {
            paddingStart: 20,
        },
        Button: {
            backgroundColor: "black",
            width:177,
            borderRadius: 8,
            marginTop:35,
            marginBottom:15,
            height: 54,
            alignContent: "center",
            justifyContent: "center",
            alignSelf:"center",
            alignItems: "center",
        },
        text:{width:"90%",marginTop:6,
        color:"#00000080",


}
    });

    return (
        <ImageBackground source={image} blurRadius={3} resizeMode="cover" style={styles.container}>

            <View style={[styles.MainContainer]}>
                <Text style={{marginTop:13,marginBottom:9,textAlign:"center",fontWeight:"500",fontSize:16,lineHeight:24,fontFamily:"Poppins_400Regular"}}>I'm cancelling because</Text>
                <View style={{
                    height: 0.3,
                    width:"100%",
                    backgroundColor: "#00000038",

                    marginTop: 7,
                    marginBottom: 7
                }
                }/>
                <RadioButton.Group onValueChange={newValue => setReason(newValue)} value={reason}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={styles.text}>Driver is too far away</Text>
                        <RadioButton value="Driver is too far away"
                        color="black"
                        />
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <Text style={styles.text}>Driver is irresponsive</Text>
                        <RadioButton value="Driver is irresponsive"
                                     color="black"
                        />
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <Text style={styles.text}>Don't need the ride anymore</Text>
                        <RadioButton value="Don't need the ride anymore"
                                     color="black"
                        />
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <Text style={styles.text}>Too high fare</Text>
                        <RadioButton value="Too high fare"
                                     color="black"
                        />
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <Text style={styles.text}>Emergency</Text>
                        <RadioButton value="Emergency"
                                     color="black"
                        />
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <Text style={styles.text}>Driver asked me to cancel</Text>
                        <RadioButton value="Driver asked me to cancel"
                                     color="black"
                        />
                    </View>

                </RadioButton.Group>

                <Pressable
                    onPress={reason !== 0? ()=>{
                        props.setReason(reason)
                        props.cancel() } : ()=>{
                        Alert.alert("Select A Reason","Please Select a reason for your ride cancellation.")
                    }}
                    style={styles.Button}><Text style={{color:"white",fontFamily:"Poppins_400Regular",fontWeight:"500",fontSize:12,lineHeight:18}}>Cancel Ride</Text></Pressable>
            </View>

        </ImageBackground>
    )
}