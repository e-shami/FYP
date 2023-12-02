
import {StyleSheet, ScrollView, Text, TextInput, View, Pressable} from "react-native";


import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from "react";



export default function Subscription(props) {


    const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            width: "100%",
            justifyContent: "flex-start",
            padding: 20,
            height:"100%",
            alignContent:"center"
        },
        shadowProp: {
            shadowColor: '#504e4e',
            shadowOffset: {width: -10, height: 4},
            shadowOpacity: 0.5,
            shadowRadius: 3,
            elevation:40
        },
        card: {
            alignSelf:"center",
            marginTop:"auto",
            marginBottom:"auto",
            alignItems:"center",
            backgroundColor: 'white',
            borderRadius: 8,
            padding:10,
            width: '100%',
            fontSize:5,
            marginVertical: 10,
        },
        buttonBlack: {
            backgroundColor: "black",
            padding:8,
            paddingVertical:10,

            alignItems:"center",
            borderRadius: 10,
            marginTop: 30,
            width:"50%",

            alignSelf:"center"
        },
        InputSection: {

            flexDirection: 'row',
            marginTop: 10,
            paddingStart: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderStyle: "solid",
            borderColor: "black",
            paddingLeft: 5,
            borderRadius: 5,
            height: 60,
            width: "100%",
            borderWidth: 1
        },
        PickerSection: {

            flexDirection: 'row',
            margin: 2,
            padding: 0,

            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderStyle: "solid",
            borderColor: "black",
            paddingLeft: 5,
            borderRadius: 10,
            height: 60,
            width: "50%",
            borderWidth: 1
        },
        input: {

            flex: 1,
            paddingTop: 10,
            paddingRight: 10,
            width: "100%",
            paddingBottom: 10,
            paddingLeft: 5,
            backgroundColor: '#fff',
            color: '#424242',
        },
        rowFlex: {
            paddingStart: 60,
            paddingEnd: 60,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
        },
        ButtonFlex: {

            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        logo: {
            fontWeight: "bold",
            fontSize: 25,
            marginTop:"10%",
            alignSelf:"center",
        },

    })

    return (
                <View style={styles.container}>
                    <Text style={styles.logo}>
                        LOGO
                    </Text>
                <View style={[ styles.card,styles.shadowProp]}>
                    <MaterialIcons name="email" size={35} color="black" />
                    <Text style={{marginTop:25,textAlign:"center",fontSize:20,fontWeight:"210"}}>We've received your information wait while our team analyze your documents.</Text>
                    <Pressable style={styles.buttonBlack}><Text style={{color:"white"}}>Done</Text></Pressable>
                </View>
                </View>



    )
}