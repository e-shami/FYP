import {StyleSheet, Pressable, Image, Text, TextInput, View, ScrollView} from 'react-native';
import {Entypo, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import {useContext, useEffect, useState} from "react";
import {SwitchUserContext} from "../Context/SwitchUserContext";
import axios from "axios";
import {ApiUrl} from "../Urls/ApiUrls";
import ErrorModel from "./Modal/ErrorModel";
import LoadingModel from "./Modal/loadingModel";
import {SessionContext} from "../Context/SessionContext";
import ForgotPassModal from "./Modal/ForgotPassModal";
import {NotificationContext} from "../Context/NotificationContext";


export default function LoginScreen(props) {
    const logoRatio = 3.5;
    var UserData = useContext(SwitchUserContext);
    const Session = useContext(SessionContext);
    const notificationData = useContext(NotificationContext);
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState([]);
    const [isLoadingOpen, setLoading] = useState(false);
    const [forgotModal, setForgotModel] = useState(false);
    const [isHidden, setHidden] = useState(true);
    const [icon, setIcon] = useState("eye-slash");



    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#fff',
            height: "100%",
            flexDirection: "column",
            width: "100%",
            padding: "5%"

        },

        logo: {
            width: 68 * logoRatio,
            height: 32 * logoRatio,
            resizeMode: 'contain',
        },
        greetings: {
            fontWeight: "600",
            fontSize: 28,
            marginTop: 30,
            fontFamily:"Poppins_400Regular",

        },
        switch: {
            fontWeight: "bold",
            marginTop:60,
            width:"100%",
            paddingBottom:30,
            fontFamily:"Poppins_400Regular",


        },

        minidisc: {
            fontWeight: "400",
            color: "#000000B2",
            fontSize: 15,
            marginTop: 45,
            fontFamily:"Poppins_400Regular",


        },

        forgot: {
            fontWeight: "400",
            fontSize: 12,
            textAlign: "right",
            marginTop: 10,

            fontFamily:"Poppins_400Regular",

        },
        InputSection: {

            flexDirection: 'row',
            marginTop: 20,
            fontFamily:"Poppins_400Regular",

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
        searchIcon: {
            width: 10,
            height: 20,
            padding: 10,
        },
        input: {
            fontFamily:"Poppins_400Regular",

            flex: 1,
            paddingTop: 10,
            paddingRight: 10,
            width: "100%",
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
            textAlign: "center",
            paddingBottom: 20,
            borderRadius: 10,
            marginTop: 30,
            fontFamily:"Poppins_400Regular",

            justifyContent: "center"
        },
        cancel: {
            backgroundColor: "white",
            paddingLeft: 50,
            paddingRight: 50,
            paddingTop: 20,
            textAlign: "center",
            paddingBottom: 20,
            borderRadius: 10,
            borderWidth: 1,
            marginTop: 20,
            fontFamily:"Poppins_400Regular",

            justifyContent: "center"
        },
        helpingRegister: {
            fontWeight: "400",
            textAlign: "center",
            color: "#000000B2",
            fontSize: 14,
            marginTop: 10,
            fontFamily:"Poppins_400Regular",

        },
        bold: {
            fontSize: 15,
            marginTop: 10,
            fontFamily:"Poppins_600SemiBold",
        },
        flex: {
            flex:1,


        }
    });


    async function forgot(phone) {
        setLoading(true)
        setForgotModel(false)
        let data = new FormData()
        data.append("phone", phone)

        console.log(data)
        await fetch(ApiUrl.resetPass, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: data
        }).then(response => response.json()
        ).then(data => {

            setLoading(false)

            if (data.status <= 200) {

                props.navigation.navigate('resetPassOTP',{token:data.token,phone:phone})



            } else {
                setError([data.msg])
            }
        }).catch(function(error) {
            setLoading(false)

            setError(["Network Error"])
        });
    }


    return (
        <ScrollView style={styles.container}>
            <View style={{flex: 1, width: "100%"}}>
                {props.children}
                <LoadingModel modalVisible={isLoadingOpen} setModalVisible={setLoading}/>
                <ErrorModel errors={error} setErrors={setError} />
            </View>
            <View style={styles.container}>

                <View style={styles.flex}>
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

                        <Image source={require("../../assets/logo/logo.png")} style={styles.logo}/>

                        <Text style={styles.greetings}>
                        Welcome &#128075;
                    </Text>
                    </View>

                    
                    <Text style={styles.minidisc}>
                        Login to continue using
                    </Text>

                    <View style={styles.InputSection}>
                        <Entypo name="mail" size={24} color="black"/>
                        <TextInput
                            style={styles.input}
                            placeholder="Email or Phone"
                            onChangeText={(e) => {
                                setEmail(e)
                            }}
                            keyboardType='email-address'
                            textContentType='emailAddress' 
                            autoComplete='email'
                            autoCapitalize='none'
                            returnKeyType='next'
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={styles.InputSection}>
                        <MaterialCommunityIcons name="form-textbox-password" size={24} color="black"/>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry={isHidden}
                            underlineColorAndroid="transparent"
                            onChangeText={(e) => {
                                setPass(e)
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



                        }}><View style={{paddingRight:8}}><FontAwesome5 name={icon} size={20} color="rgba(0, 0, 0, 0.47);" /></View></Pressable>
                    </View>

                    <Pressable onPress={()=>{
                        setForgotModel(true)
                    }} style={styles.forgot}>
                        <Text style={{color: "black", textAlign: "right"}}>
                            Forgot Password?
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={async () => {
                            let token  = notificationData.NotificationData.Token
                            setLoading(true)
                            let data = new FormData()
                            data.append("email", email)
                            data.append("password", pass)
                            if (token === undefined) {
                                token = ""
                            }
                            data.append("notificationToken",token)
                            console.log(data)
                            await fetch(ApiUrl.logIn, {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                },
                                body: data
                            }).then(response => response.json()
                            ).then(data => {

                                setLoading(false)

                                if (data.status <= 200) {

                                    props.navigation.navigate('OtpScreen',{token:data.token})



                                } else {
                                    setError([data.msg])
                                }
                            }).catch(function(error) {
                                setLoading(false)

                                setError(["Network Error"])
                                });
                        }
                        }

                        style={styles.confirm}>
                        <Text style={{color: "white", fontFamily:"Poppins_600SemiBold", textAlign: "center"}}>
                            Login
                        </Text>
                    </Pressable>
                    <Pressable style={styles.cancel}
                               onPress={() => props.navigation.navigate('SignUpPageOne')}

                    >
                        <Text style={{color: "black", fontFamily:"Poppins_600SemiBold", textAlign: "center"}}>
                            Register
                        </Text>
                    </Pressable>
                    <Text style={styles.helpingRegister}>
                        Don't have an account? <Text style={styles.bold}>tap on register</Text>
                    </Text>
                </View>
                <Pressable style={styles.switch}
                onPress={()=>{
                    var data = Object.assign({}, UserData.SwitchUserDefaultData);
                    data.isUserDriver = !data.isUserDriver;

                    Session.ClearSession()
                    UserData.setUserData(data);


                }}
                >

                    <Text style={{
                        color: "black",
                        width: "100%",
                        textAlign: "center",
                        textDecorationLine: "underline",
                        fontFamily:"Poppins_700Bold",
                        fontSize:16
                    }}>
                        {  !UserData.SwitchUserDefaultData.isUserDriver  ?"Switch to Driver Mode" : "Switch to Customer Mode"  }
                    </Text>
                </Pressable>
                <ForgotPassModal modalVisible={forgotModal} forgot={forgot} setModalVisible={setForgotModel} />

            </View>
        </ScrollView>

    )
}