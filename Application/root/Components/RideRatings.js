import {Image, Pressable, StyleSheet, Text} from "react-native";
import {View} from "react-native";
import React, { useState } from "react";
import DPCircle from "./DPCircle";
import {Rating} from "react-native-ratings";



export default function RideRatings(props) {
    const imageSize = 50;
    const CirlceSize = 15;
    const [rating, setRating] = useState(0);


    const styles = StyleSheet.create({
        container: {
            width: "100%",
            backgroundColor: "white",
            alignItems: 'center',
            marginTop:100,

            justifyContent: 'center',
        },
        MainContainer: {
            width: "100%",
            backgroundColor:"rgba(235, 235, 235, 0.29)",
            flexDirection: "row",

            padding: 10,
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
            fontSize: 10,
            fontFamily:"Poppins_400Regular",
        },
        dateFare: {


            marginStart:40,
            textAlign:"right",

        }
        ,
        Name: {
            fontFamily:"Poppins_400Regular",
            fontWeight:"500",
            fontSize: 15,
        },


    });

    return (
        <View style={styles.container}>

            <View style={[styles.MainContainer]}>
               <View style={{alignItems:"center",alignContent:"center",alignSelf:"center"}}>
                   <DPCircle />
               </View>
                <View style={{marginStart:15,alignSelf:"center",}}>
                    <Text style={styles.Name}>
                        Dave
                    </Text>
                    <Rating
                        ratingCount={5}
                        imageSize={15}
                        ratingBackgroundColor="rgba(235, 235, 235, 0.29)"
                        readonly
                        startingValue={5}


                    />


                </View>

            </View>

        </View>
    )
}