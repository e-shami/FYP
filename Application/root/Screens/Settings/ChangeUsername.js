import {StyleSheet, Pressable, Image, Text,TextInput, View} from 'react-native';
import {AntDesign, Entypo, MaterialCommunityIcons} from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import React from "react";

export default function ChangeUsername(props) {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#fff',
            height:"100%",

            flexDirection:"column",
            width:"100%",

            paddingHorizontal:"5%",
            paddingTop:30

        },

        logo: {
            fontWeight: "bold",
            fontSize: 25,
            marginTop:25,
            textAlign:"center"
        },
        greetings: {
            fontWeight: "bold",
            fontSize: 35,
            marginTop: 60,


        },
        switch: {
            fontWeight: "bold",
            fontSize: 25,
            marginTop:"auto"



        },

        minidisc: {
            fontWeight: "normal",

            fontSize: 15,
            marginTop: 10,


        },
        buttonBlack: {
            backgroundColor: "black",
            padding:8,
            paddingVertical:10,

            alignItems:"center",
            borderRadius: 10,
            marginTop: 35,
            width:"100%",

            alignSelf:"center"
        },
        InputSection: {
            padding:15,
            flexDirection: 'row',
            marginTop:15,
            paddingStart:20,
            borderRadius:15,
            paddingEnd:10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F4F4F4',



            height: 80,

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
        confirm: {
            backgroundColor: "black",
            paddingLeft: 50,
            paddingRight: 50,
            paddingTop: 20,
            textAlign:"center",
            paddingBottom: 20,
            borderRadius: 10,
            marginTop: 20,

            justifyContent: "center"
        },
        cancel: {
            backgroundColor: "white",
            paddingLeft: 50,
            paddingRight: 50,
            paddingTop: 20,
            textAlign:"center",
            paddingBottom: 20,
            borderRadius: 10,
            borderWidth:1,
            marginTop: 10,

            justifyContent: "center"
        },
        helpingRegister:{
            fontWeight: "normal",
            textAlign:"center",
            fontSize: 15,
            marginTop: 10,
        },
        bold:{
            fontWeight: "bold",

            fontSize: 15,
            marginTop: 10,
        },
        flex:{

        }
    });


    const styles2 = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    return (
        <View style={styles.container}>


            <Text style={{fontSize:16,lineHeight:16,fontWeight:"500",fontFamily:"Poppins_400Regular",}}>Change Username</Text>
            <View style={styles.InputSection}>
                <FontAwesome name="user-circle" size={24} color="black" />
                <TextInput
                    style={styles.input}
                    placeholder="Enter new username"

                    underlineColorAndroid="transparent"
                />
            </View>
            <Pressable style={styles.buttonBlack}><Text style={{color:"white",paddingVertical:15,fontSize:12,lineHeight:18,fontWeight:"500",fontFamily:"Poppins_400Regular",}}>Send confirmation email</Text></Pressable>
        </View>


    )
}