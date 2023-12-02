import {StyleSheet, Pressable, Image, Text,TextInput, View} from 'react-native';
import {Entypo, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import {Picker} from "@react-native-picker/picker";
import { MaterialIcons } from '@expo/vector-icons';
import React, {useContext, useState} from "react";
import {ApiUrl} from "../../Urls/ApiUrls";
import {SessionContext} from "../../Context/SessionContext";
import LoadingModel from "../Modal/loadingModel";
import ErrorModel from "../Modal/ErrorModel";

export default function ChangeCity(props) {
    const [city, setCity] = useState("");

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
            fontFamily: 'Poppins_400Regular',
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
        input: {
            fontFamily: 'Poppins_400Regular',
            flex: 1,
            margin: 10,
            paddingRight: 20,
            lineHeight: 21,
            fontWeight: "400",
            fontSize: 14,
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

        }
    });
    const [errors, setErrors] = useState([]);
    const [isLoadingOpen, setLoading] = useState(false);
    const session = useContext(SessionContext);

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


            <Text style={{fontSize:16,fontWeight:"500",fontFamily:"Poppins_400Regular",lineHeight:24}}>Change City</Text>
            <View style={styles.InputSection}>
                <FontAwesome5 name="city" size={24} color="black"/>
                <TextInput
                    style={[styles.input, {marginLeft: 15}]}
                    placeholder="City"
                    underlineColorAndroid="transparent"
                    onChangeText={(e) => {
                        setCity(e)
                    }}
                    value={city}

                />
            </View>
            <Pressable onPress={async () => {
                setLoading(true)
                let data = {
                    "name":city.trim()
                }
                await fetch(ApiUrl.changeCity, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Token " + session.SessionData.Token
                    },
                    body: JSON.stringify(data)
                }).then(response => response.json()
                ).then(data => {

                    setLoading(false)

                    if (data.status <= 200) {
                        setLoading(false)
                        setErrors(["City successfully changed to "+city.trim()+"."])

                    } else {
                        setLoading(false)
                        setErrors([data.msg])
                    }
                }).catch(function (error) {
                    setLoading(false)

                    setErrors(["Network Error" + error])
                });
            }} style={styles.buttonBlack}><Text style={{color:"white",paddingVertical:15,fontSize:12,lineHeight:18,fontWeight:"500",fontFamily:"Poppins_400Regular",}}>Change</Text></Pressable>
            <LoadingModel modalVisible={isLoadingOpen} setModalVisible={setLoading}/>
            <ErrorModel errors={errors} setErrors={setErrors} />
        </View>


    )
}