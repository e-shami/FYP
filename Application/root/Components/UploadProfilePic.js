import {Image, Pressable, StyleSheet, Text} from "react-native";
import {View} from "react-native";
import {ProgressBar, Colors} from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import UberButtonBlack from "./uberButton";
import * as ImagePicker from "expo-image-picker";

export default function UploadProfilePic(props) {
    const imageSize = 50;
    const CirlceSize = 20;

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            backgroundColor: "white",
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
        <View style={styles.container}>

            <View style={[styles.MainContainer]}>
                <Text style={{textAlign:"center",fontWeight:"500",fontFamily:"Poppins_400Regular",fontSize:16,lineHeight:24,margin:10}}>Upload Profile Picture</Text>
                <View style={{
                    height: 2,
                    width: "100%",
                    backgroundColor: "rgba(185,185,185,0.2)",
                    marginTop: 7,
                    marginBottom: 7
                }}/>
                <Pressable><Text style={{textAlign:"center",fontWeight:"400",fontFamily:"Poppins_400Regular",fontSize:22,lineHeight:24,margin:8}}>Choose a Photo</Text></Pressable>
                <View style={{
                    height: 2,
                    width: "100%",
                    backgroundColor: "rgba(185,185,185,0.2)",
                    marginTop: 7,
                    marginBottom: 7
                }}/>
                <Pressable><Text style={{textAlign:"center",fontWeight:"400",lineHeight:24,fontFamily:"Poppins_400Regular",fontSize:22,margin:8}}>Take a Photo</Text></Pressable>
            </View>

        </View>
    )
}