import BaseRegistration from "./BaseRegistration";
import {Alert, StyleSheet, Text, TextInput, ToastAndroid, View} from "react-native";
import TitleSubTitle from "./TitleSubTitle";
import {Entypo, FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import {Foundation} from '@expo/vector-icons';
import React, {useState} from "react";
import {FontAwesome} from '@expo/vector-icons';
import {useContext} from "react";
import {RiderModeSignUpContext} from "../../Context/RiderModeSignUpContext";

import {Picker} from '@react-native-picker/picker';
import {SwitchUserContext} from "../../Context/SwitchUserContext";
import {ApiUrl} from "../../Urls/ApiUrls";
import LoadingModel from "../Modal/loadingModel";

export default function SignUpPageOne(props) {
    let appMode = useContext(SwitchUserContext);
    let mode = ""
    if(appMode.SwitchUserDefaultData.isUserDriver)
    {
        mode="Driver"
    }
    else
    {
        mode = "Customer"
    }
    const UserData = useContext(RiderModeSignUpContext);
    const [city, setcity] = useState("");
    const [errors, setErrors] = useState([]);

    const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            width: "100%",
            justifyContent: "flex-start",
            paddingHorizontal: 20,
            marginTop: 10
        },
        InputSection: {
            fontFamily: 'Poppins_400Regular',
            flexDirection: 'row',
            marginTop: 20,
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


    })
    function proceedToPageTwo()
    {

        props.navigation.navigate('SignUpPageTwo')
    }

    function submitRiderRequest() {
        let data = UserData.getFormData()

        setLoading(true);
        async function PostData() {
            await fetch(ApiUrl.signupAsRider, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
                body: data
            })
                .then(response => response.json()
                ).then(data => {
                    if (data.status <= 200) {
                        ToastAndroid.showWithGravity(
                            'Account Created Successfully',
                            ToastAndroid.SHORT, //can be SHORT, LONG
                            ToastAndroid.CENTER //can be TOP, BOTTON, CENTER
                        );
                        UserData.ClearForm();
                        props.navigation.reset({
                            index: 0,
                            routes: [{name: 'LoginScreen'},
                            ],
                        })

                    } else {
                        setErrors([data.msg]);
                    }
                    setLoading(false);
                }).catch(err => {
                    console.log(err.message)
                    setLoading(false);
                })

        }
        console.log(UserData.DriverSignUpData)
        PostData();
    }
    const [isLoadingOpen, setLoading] = useState(false);
    const [mailInputRef, passwordInputRef, phoneInputRef, cityInputRef] = Array.from({ length: 4 }, () => React.useRef());


    return (

        <BaseRegistration page={1} errors={errors} navigation={props.navigation} setErrors={setErrors} onPress={() => {
            let error = [];
            if (!UserData.Validator.isNameValid())
                error.push("Enter a valid name")
            if (!UserData.Validator.isEmailValid())
                error.push("Enter a valid email")
            if (!UserData.Validator.isPasswordValid())
                error.push("Enter a valid password")
            if (!UserData.Validator.isPhoneNoValid())
                error.push("Enter a valid phone no")
            if (!UserData.Validator.isCityValid())
                error.push("Enter valid city name")
            if (error.length > 0) {
                setErrors(error);
                return;
            }
            if(mode==="Driver")
            {
                proceedToPageTwo()
            }
            else{
                submitRiderRequest()
            }
        }
        }>
            <LoadingModel modalVisible={isLoadingOpen} setModalVisible={setLoading}/>
            <View style={styles.container}>
                <TitleSubTitle mainTitile={"Signup as "+mode} subTitle={"Enter your details to proceed further"}/>
                <View style={styles.InputSection}>
                    <FontAwesome name="user-circle-o" size={24} color="black"/>
                    <TextInput
                        onChangeText={(e) => {

                            UserData.addEntry({name: e});
                        }}
                        value={UserData.DriverSignUpData.name}
                        style={styles.input}
                        placeholder="Name"
                        underlineColorAndroid="transparent"
                        maxLength={32}
                        onSubmitEditing={() => {
                            mailInputRef.current.focus();
                        }}
                        returnKeyType="next"
                    />

                </View>
                <View style={styles.InputSection}>
                    <Entypo name="mail" size={24} color="black"/>
                    <TextInput
                        ref={mailInputRef}
                        onChangeText={(e) => {

                            UserData.addEntry({email: e});
                        }}
                        value={UserData.DriverSignUpData.email}
                        style={styles.input}
                        placeholder="Email"
                        keyboardType={"email-address"}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        onSubmitEditing={() => {
                            passwordInputRef.current.focus();
                        }}
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.InputSection}>
                    <MaterialCommunityIcons name="form-textbox-password" size={24} color="black"/>
                    <TextInput
                        ref={passwordInputRef}
                        style={styles.input}
                        onChangeText={(e) => {

                            UserData.addEntry({password: e});
                        }}
                        value={UserData.DriverSignUpData.password}
                        placeholder="Password"
                        secureTextEntry={true}
                        underlineColorAndroid="transparent"
                        onSubmitEditing={() => {
                            phoneInputRef.current.focus();
                        }}
                        returnKeyType="next"
                    />

                </View>
                <View style={styles.InputSection}>
                    <Foundation name="telephone" size={24} color="black"/>
                    <TextInput
                        ref={phoneInputRef}
                        style={[styles.input, {marginLeft: 15}]}
                        placeholder="Phone no [+923xxxxxxxxx]"
                        keyboardType="phone-pad"
                        underlineColorAndroid="transparent"
                        onChangeText={(e) => {

                            UserData.addEntry({phoneNo: e});
                        }}
                        value={UserData.DriverSignUpData.phoneNo}
                        maxLength={13}
                        onSubmitEditing={() => {
                            cityInputRef.current.focus();
                        }}
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.InputSection}>
                    <FontAwesome5 name="city" size={24} color="black"/>
                    <TextInput
                        ref={cityInputRef}
                        style={[styles.input, {marginLeft: 15}]}
                        placeholder="City"
                        underlineColorAndroid="transparent"
                        onChangeText={(e) => {

                            UserData.addEntry({city: e});
                        }}
                        value={UserData.DriverSignUpData.city}
                        maxLength={16}
                        returnKeyType="done"
                    />
                </View>
            </View>
        </BaseRegistration>

    )
}