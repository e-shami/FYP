import {Image, Pressable, StyleSheet,ImageBackground, Text} from "react-native";
import {View} from "react-native";
import {ProgressBar, Colors} from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import UberButtonBlack from "../uberButton";
const image = require("../../../assets/img/blur3.png");


export default function CancelRide(props) {
    const imageSize = 50;
    const CirlceSize = 20;

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
            paddingHorizontal:50,
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
            width:122,
            borderRadius: 10,
            marginTop:35,
            marginBottom:15,
            height: 37.22,
            alignContent: "center",
            justifyContent: "center",
            alignSelf:"center",
            alignItems: "center",
        }
    });

    return (
        <ImageBackground source={image} blurRadius={3} resizeMode="cover" style={styles.container}>

            <View style={[styles.MainContainer]}>
                <View style={{alignItems:"center",alignContent:"center",marginTop:16,marginBottom:16}}>
                    <AntDesign name="questioncircleo" size={38} color="black" />
                </View>
                <Text style={{fontSize:16,lineHeight:24,textAlign:"center",fontWeight:"500",fontFamily:"Poppins_400Regular",}}>Are you sure you want to cancel your ride?</Text>

                <Pressable
                    onPress={()=>props.cancel()}
                    style={styles.Button}><Text style={{color:"white",fontFamily:"Poppins_400Regular",fontWeight:"500",fontSize:12,lineHeight:18}}>Cancel Ride</Text></Pressable>
            </View>

        </ImageBackground>
    )
}