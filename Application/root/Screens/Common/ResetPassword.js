import {StyleSheet, Pressable, Image, Text,TextInput, View} from 'react-native';
import {AntDesign, Entypo, MaterialCommunityIcons} from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import React, {useContext, useState} from "react";
import LoadingModel from "../Modal/loadingModel";
import ErrorModel from "../Modal/ErrorModel";
import {ApiUrl} from "../../Urls/ApiUrls";
import {SessionContext} from "../../Context/SessionContext";

export default function ResetPassword(props) {
    const [isHidden, setHidden] = useState(true);
    const [icon, setIcon] = useState("eye-slash");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, confirmNewPass] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoadingOpen, setLoading] = useState(false);

    const session = useContext(SessionContext);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#fff',
            height:"100%",
            marginTop:10,
            flexDirection:"column",
            width:"100%",
            alignItems:"center",
            justifyContent:"center",
            alignContent:"center",
            paddingHorizontal:"5%",
            paddingTop:"50%"

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
            fontFamily:"Poppins_400Regular",
            borderRadius:15,
            paddingEnd:20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F4F4F4',



            height: 64,

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
            paddingLeft: 20,
            fontSize:14,
            color: '#424242'
            ,fontFamily:"Poppins_400Regular",
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


            <Text style={{fontSize:16,lineHeight:25,fontWeight:"500",fontFamily:"Poppins_400Regular",}}>Now you can reset your password! &#128513;</Text>

            <View style={styles.InputSection}>
                <FontAwesome5 name="key" size={24} color="black" />
                <TextInput
                    style={styles.input}
                    placeholder="Enter New Password"
                    secureTextEntry={isHidden}
                    underlineColorAndroid="transparent"
                    value={newPass}

                    onChangeText={(e) => {
                        setNewPass(e)
                    }}
                />
                <Pressable onPress={()=>{
                    if(isHidden){
                        setHidden(false)
                        setIcon("eye")
                    }
                    else {
                        setHidden(true)
                        setIcon("eye-slash")
                    }



                }}><View ><FontAwesome5 name={icon} size={25} color="rgba(0, 0, 0, 0.47);" /></View></Pressable>
            </View>
            <View style={styles.InputSection}>
                <FontAwesome5 name="key" size={20} color="black" />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm New Password"
                    secureTextEntry={isHidden}
                    value={confirmPass}
                    underlineColorAndroid="transparent"
                    onChangeText={(e) => {
                        confirmNewPass(e)
                    }}
                />

            </View>
            <Pressable onPress={async () => {
                setLoading(true)
                if(newPass.trim() !== confirmPass.trim())
                {
                    setErrors(["Passwords don't match."])
                    setLoading(false)

                }
                else if( newPass.trim()==="" || confirmPass.trim() ==="")
                {
                    setErrors(["Password fields cannot be empty."])
                    setLoading(false)

                }
                else {

                    let data={
                        "pass":newPass

                    }
                    console.log(data)
                    await fetch(ApiUrl.setNewPass, {
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
                            setErrors(["Password successfully changed.\nYou will be redirected into Login Screen"])

                            setNewPass("")
                            confirmNewPass("")
                            setTimeout(()=>{
                                props.navigation.reset({
                                    index: 0,
                                    routes: [{name: 'LoginScreen'}],
                                })
                            },2500)

                        } else {
                            setLoading(false)
                            setErrors([data.msg])
                        }
                    }).catch(function (error) {
                        setLoading(false)

                        setErrors(["Network Error" + error])
                    });
                }

            }} style={styles.buttonBlack}><Text style={{color:"white",paddingVertical:15,fontSize:18}}>Reset my Password</Text></Pressable>
            <LoadingModel modalVisible={isLoadingOpen} setModalVisible={setLoading}/>
            <ErrorModel errors={errors} setErrors={setErrors} />

        </View>


    )
}