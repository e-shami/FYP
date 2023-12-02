import {Image, Pressable, StyleSheet,ImageBackground, Text} from "react-native";
import {View} from "react-native";
import {ProgressBar, Colors} from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import UberButtonBlack from "./uberButton";
const image = require("../../assets/img/blur2.png");

export default function RideEnded(props) {
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
            width: "45%",
            borderRadius: 10,
            marginTop:35,
            marginBottom:15,
            height: 50,
            alignContent: "center",
            justifyContent: "center",
            alignSelf:"center",
            alignItems: "center",
        }
    });

    return (
        <ImageBackground source={image} blurRadius={3} resizeMode="cover" style={styles.container}>

            <View style={[styles.MainContainer]}>
                <Pressable style={styles.Right}><Entypo name="cross" size={24} color="black" /></Pressable>
                <Text style={{fontSize:18,textAlign:"center",fontFamily:"Poppins_400Regular",}}>Ride Ended</Text>
                <View style={styles.PicContainer}>
                    <Image style={styles.pic} source={require("../../assets/img/RideEnded.png")}/>
                </View>
                <Text style={{fontSize:13,textAlign:"center",fontFamily:"Poppins_400Regular",}}>Total fare was</Text>
                <Text style={{fontSize:25,textAlign:"center",fontFamily:"Poppins_400Regular",fontWeight:"500"}}>{props.fare} P</Text>
                <Pressable
                    onPress={()=>
                        props.setModalVisible(false)
                }
                    style={styles.Button}><Text style={{color:"white"}}>Done</Text></Pressable>
            </View>

        </ImageBackground>
    )
}