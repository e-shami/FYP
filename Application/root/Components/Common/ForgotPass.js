import {Image, Pressable, StyleSheet, ImageBackground, Text, TextInput} from "react-native";
import {View} from "react-native";
import {ProgressBar, Colors} from 'react-native-paper';
import {Entypo, Foundation} from '@expo/vector-icons';
import UberButtonBlack from "../uberButton";
import DPCircle from "../DPCircle";
import { Rating } from 'react-native-ratings';
import {ApiUrl} from "../../Urls/ApiUrls";
import {useState} from "react";

const image = require("../../../assets/img/blur2.png");

export default function ForgotPass(props) {
    const imageSize = 50;
    const CirlceSize = 20;
    const [phone,setPhone] = useState("")
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
            padding: 5,
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
            marginEnd:5,
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
        InputSection: {
            padding:5,
            flexDirection: 'row',
            marginTop:10,
            marginHorizontal:10,
            paddingStart:10,
            borderRadius:15,
            paddingEnd:10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F4F4F4',



            height: 60,

        },

        searchIcon: {
            width:10,
            height:20,
            padding: 10,
        },
        input: {
            fontFamily:"Poppins_400Regular",
            flex:1,
            paddingTop: 10,
            paddingRight: 10,
            width:"100%",
            paddingBottom: 10,
            paddingLeft: 20,
            fontSize:14,
            lineHeight:21,
            fontWeight:"400",
            color: '#424242',
        },
        Button: {
            backgroundColor: "black",
            width: 152,
            borderRadius: 8,
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
                <Pressable onPress={()=>{
                    props.setVisible(false)
                }} style={styles.Right}><Entypo name="cross" size={24} color="black" /></Pressable>
                <Text style={{marginStart:10,fontSize:16,lineHeight:18,fontWeight:"500",fontFamily:"Poppins_400Regular",}}>Forgot password?</Text>
                <View style={styles.InputSection}>
                    <Foundation name="telephone" size={24} color="black"/>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Phone No."
                        keyboardType={"phone-pad"}
                        value={phone}
                        onChangeText={(e) => {
                            setPhone(e)
                        }}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <Pressable
                    onPress={()=>{
                        props.forgot(phone)
                    }}
                    style={styles.Button}><Text style={{color:"white"}}>Reset my Password</Text></Pressable>
            </View>

        </ImageBackground>
    )
}