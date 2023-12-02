import {StyleSheet, Pressable, Image, Text, TextInput, View, Switch} from 'react-native';
import { Entypo,MaterialCommunityIcons } from '@expo/vector-icons';
import {Picker} from "@react-native-picker/picker";
import { MaterialIcons,FontAwesome  } from '@expo/vector-icons';
import React, {useContext, useEffect, useState} from "react";
import {NotificationContext} from "../../Context/NotificationContext";

export default function SettingsPage(props) {
    const notificationData = useContext(NotificationContext);

    const toggleSwitch = () => {
        notificationData.addEntry({Setting:!notificationData.NotificationData.Setting})
    };
    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#fff',
            height:"100%",

            flexDirection:"column",
            width:"100%",

            paddingHorizontal:"5%",
            paddingTop:0

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
        PickerSection: {

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
        InputSection: {

            flexDirection: 'row',
            marginTop:10,

            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderStyle:"solid",
            borderColor:"black",
            paddingLeft:5,
            borderRadius:5,
            height:60,
            width:"100%",
            borderWidth:1
        },
        searchIcon: {
            width:10,
            height:20,
            padding: 10,
        },
        input: {

            flex:1,
            paddingTop: 10,
            paddingRight: 10,
            width:"100%",
            paddingBottom: 10,
            paddingLeft: 5,
            backgroundColor: '#fff',
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
            marginVertical:10,
            flexDirection:"row"
        },
        title: {
            fontSize:18,fontWeight:"500",marginTop:15,fontFamily:"Poppins_400Regular",
        },
        pressableText: {
        padding:10,fontSize:18,paddingStart:25,fontFamily:"Poppins_400Regular",
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


            <Text style={styles.title}>Contact Details</Text>
            <View style={{
                height: 1,
                width: "100%",
                backgroundColor: "rgba(157, 208, 255, 0.2)",
                marginVertical:10
            }}/>
            <Pressable onPress={()=>{props.navigation.navigate('Change Name')}}  style={styles.flex}>
                <View style={{backgroundColor:"rgba(217, 217, 217, 0.46)",padding:10,borderRadius:9,height:45}}>
                    <FontAwesome name="user-circle-o" size={24} color="black"/>
                </View>

                <Text style={styles.pressableText}>Name</Text>
                <View style={{padding:10,flex:1,borderRadius:9,alignSelf:"flex-end",alignContent:"flex-end",alignItems:"flex-end"}}>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
                </View>
            </Pressable>

            <Pressable onPress={()=>{props.navigation.navigate('Change Phone No')}} style={styles.flex}>
                <View style={{backgroundColor:"rgba(217, 217, 217, 0.46)",padding:10,paddingHorizontal:13,borderRadius:9,height:45}}>
                    <FontAwesome name="phone" size={24} color="black" />
                </View>
                <Text style={styles.pressableText}>Phone no</Text>
                <View style={{padding:10,flex:1,borderRadius:9,alignSelf:"flex-end",alignContent:"flex-end",alignItems:"flex-end"}}>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
                </View>
            </Pressable>

            <Text style={styles.title}>Security Details</Text>
            <View style={{
                height: 1,
                width: "100%",
                backgroundColor: "rgba(157, 208, 255, 0.2)",
                marginVertical:10
            }}/>
            <Pressable onPress={()=>{props.navigation.navigate('Change Password')}} style={styles.flex}>
                <View style={{backgroundColor:"rgba(217, 217, 217, 0.46)",padding:10,borderRadius:9,paddingHorizontal:11,height:45}}>
                    <Image  source={require("../../../assets/img/Password.png")} />
                </View>

                <Text style={styles.pressableText}>Change Password</Text>
                <View style={{padding:10,flex:1,borderRadius:9,alignSelf:"flex-end",alignContent:"flex-end",alignItems:"flex-end"}}>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
                </View>
            </Pressable>
            <Text style={styles.title}>App Settings</Text>
            <View style={{
                height: 1,
                width: "100%",
                backgroundColor: "rgba(157, 208, 255, 0.2)",
                marginVertical:10
            }}/>
            <Pressable style={styles.flex}>
                <View style={{backgroundColor:"rgba(217, 217, 217, 0.46)",padding:10,borderRadius:9,paddingHorizontal:16,height:45}}>
                    <Image  source={require("../../../assets/img/Ring.png")} />
                </View>
                <Text style={styles.pressableText}>App Notifications</Text>
                <Switch style={{flex:1,borderRadius:9,alignSelf:"flex-end",alignContent:"flex-end",alignItems:"flex-end"}}
                    trackColor={{ false: "black", true: "#c7c2c2" }}
                    thumbColor={notificationData.NotificationData.Setting ? "black" : "#c7c2c2"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={notificationData.NotificationData.Setting}
                />
            </Pressable>
            <Text style={styles.title}>Contact Details</Text>
            <View style={{
                height: 1,
                width: "100%",
                backgroundColor: "rgba(157, 208, 255, 0.2)",
                marginVertical:10
            }}/>
            <Pressable onPress={()=>{props.navigation.navigate('Change City')}} style={styles.flex}>
                <View style={{backgroundColor:"rgba(217, 217, 217, 0.46)",padding:10,height:45,borderRadius:9,paddingHorizontal:12}}>
                    <MaterialIcons  name="location-city" size={24} color="black" />
                </View>
                <Text style={styles.pressableText}>City</Text>
                <View style={{padding:15,flex:1,borderRadius:9,alignSelf:"flex-end",alignContent:"flex-end",alignItems:"flex-end"}}>
                    <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                </View>
            </Pressable>
        </View>


    )
}