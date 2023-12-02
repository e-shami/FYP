import {Image, Pressable, StyleSheet,ImageBackground, Text} from "react-native";
import {View} from "react-native";
import {ProgressBar, Colors} from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import UberButtonBlack from "../uberButton";
import DPCircle from "../DPCircle";
import { Rating } from 'react-native-ratings';
import {ApiUrl} from "../../Urls/ApiUrls";
import {useState} from "react";

const image = require("../../../assets/img/blur2.png");

export default function RateDriver(props) {
    const imageSize = 50;
    const CirlceSize = 20;
    let id = props.id
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
        Button: {
            backgroundColor: "black",
            width: 122,
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
                <Text style={{fontSize:16,fontWeight:"500",lineHeight:24,textAlign:"center",fontFamily:"Poppins_400Regular",}}>How was your ride?</Text>
                <View style={styles.PicContainer}>
                    <DPCircle source={{uri:ApiUrl.dp+props.dp}}/>

                </View>
                <Text style={{textAlign:"center",marginTop:-2,marginBottom:18,fontWeight:"500",fontSize:12,fontFamily:"Poppins_400Regular"}}>{props.name}</Text>
                <Rating
                    ratingCount={5}
                    imageSize={20}
                    ratingBackgroundColor="#D9D9D9"
                    onFinishRating={(rating)=>{
                        props.setRating(rating)
                    }}


                />
                <Pressable
                    onPress={props.done}
                    style={styles.Button}><Text style={{color:"white"}}>Done</Text></Pressable>
            </View>

        </ImageBackground>
    )
}