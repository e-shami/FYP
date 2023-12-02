import BaseRegistration from "./BaseRegistration";
import {StyleSheet, ScrollView, Text, TextInput, View, Pressable, Image, Platform} from "react-native";
import TitleSubTitle from "./TitleSubTitle";
import {Feather} from "@expo/vector-icons";
import {Picker} from "@react-native-picker/picker";
import {AntDesign} from '@expo/vector-icons';
import React, {useContext, useRef, useState} from "react";
import * as ImagePicker from "expo-image-picker";
import {RiderModeSignUpContext} from "../../Context/RiderModeSignUpContext";
import LoadingModel from "../Modal/loadingModel";
import axios from "axios";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {ApiUrl} from "../../Urls/ApiUrls";


export default function SignUpPageFourBackup(props) {
    const [driverLicense, setDriverLicense] = useState(null);
    const [selfie, setSelfie] = useState(null);
    const [vehicleRegistration, setVehicleRegistration] = useState(null);
    const [vehiclePic, setVehiclePic] = useState(null);
    const [isLoadingOpen, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const UserData = useContext(RiderModeSignUpContext);
    const filed = useRef({
        DriversLicenseImg: "",
        selfie: "",
        vehicalRegisterationDocs: "",
        vehicalPicture: "",
    })
    const pickDriverLicense = async () => {


        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setDriverLicense(result.uri);
            var dataCopy = Object.assign({}, filed.current);
            dataCopy.DriversLicenseImg =
                {
                    uri: Platform.OS === 'android' ? result.uri : result.uri.replace('file://', ''),
                    name: result.uri.split("/")[result.uri.split("/").length - 1],

                    type:"multipart/form-data",


                }
            filed.current = dataCopy;

        }
    };
    const takeSelfie = async () => {

        // No permissions request is necessary for launching the image library
        let permission = await ImagePicker.requestCameraPermissionsAsync();
        console.log("-------------------------" + permission)
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setSelfie(result.uri);
            var dataCopy = Object.assign({}, filed.current);
            dataCopy.selfie =
                {
                    uri: Platform.OS === 'android' ? result.uri : result.uri.replace('file://', ''),
                    name: result.uri.split("/")[result.uri.split("/").length - 1],

type:"multipart/form-data"

                }
            filed.current = dataCopy;
        }
    };
    const pickVehicleRegistration = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setVehicleRegistration(result.uri);
            var dataCopy = Object.assign({}, filed.current);
            dataCopy.vehicalRegisterationDocs =
                {
                    uri: Platform.OS === 'android' ? result.uri : result.uri.replace('file://', ''),
                    name: result.uri.split("/")[result.uri.split("/").length - 1],

                    
                    type:"multipart/form-data"

                }
            filed.current = dataCopy;
            console.log(filed.current.vehicalRegisterationDocs)
        }
    };
    const pickVehiclePic = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });


        if (!result.cancelled) {
            setVehiclePic(result.uri);
            var dataCopy = Object.assign({}, filed.current);
            dataCopy.vehicalPicture =
                {
                    uri: Platform.OS === 'android' ? result.uri : result.uri.replace('file://', ''),
                    name: result.uri.split("/")[result.uri.split("/").length - 1],

type:"multipart/form-data"
                    
                }
            filed.current = dataCopy;
        }
    };

    const [date, setDate] = useState("Select License Expiry Date");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        let d = date.toString()
        setDate(d)
        UserData.addEntry({DriversLicenseExpiry: d});
        hideDatePicker();
    };

    const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            width: "100%",
            justifyContent: "flex-start",
            padding: 20,
            marginTop: 30,
        },
        shadowProp: {
            shadowColor: '#757272',
            shadowOffset: {width: -15, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 20
        },
        card: {
            backgroundColor: 'white',
            borderRadius: 8,
            padding: 10,
            width: '100%',
            fontSize: 5,
            marginVertical: 10,
        },
        buttonBlack: {
            backgroundColor: "black",
            padding: 8,
            paddingVertical: 10,
            height: 47,
            alignItems: "center",
            borderRadius: 10,
            marginTop: 20,
            width: 146,

            alignSelf: "flex-end"
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
        inp: {
            color: "white",
            fontSize: 14,
            lineHeight: 21,
            fontWeight: "400",
            marginStart: 10,
            textAlign: "center",
            fontFamily: "Poppins_400Regular",
        },
        input: {
            fontFamily: "Poppins_400Regular",

            paddingTop: 10,
            paddingRight: 10,
            width: "100%",
            paddingBottom: 10,
            paddingLeft: 5,
            fontWeight: "400",
            lineHeight: 21,

        },
        title: {
            fontSize: 20, fontWeight: "500", lineHeight: 30, fontFamily: "Poppins_400Regular",
        },
        rowFlex: {
            width:"100%",
            marginTop: 30,
        },
        ButtonFlex: {

            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        }


    })

    return (
        <BaseRegistration page={4} errors={errors} setErrors={setErrors} onPress={() => {

            let error = [];
            if (!UserData.Validator.isValid(UserData.DriverSignUpData.DriversLicenseExpiry))
                error.push("Enter a valid  License Expiry Date")
            if (driverLicense == null)
                error.push("Please upload your  License Image ")
            if (selfie == null)
                error.push("Please upload your selfie ")
            if (vehicleRegistration == null)
                error.push("Please upload your vehicle registration documentation ")
            if (vehiclePic == null)
                error.push("Please upload your vehicle Image ")
            if (error.length > 0) {
                setErrors(error);
                return;
            }


            UserData.addEntry(filed.current)

            console.log("\n\n\nUser Form Data",UserData.getFormData())
            console.log("\n\n\nUser  Data",UserData.DriverSignUpData)

            async function PostData() {
                await fetch(ApiUrl.signUp, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                    },
                    body: UserData.getFormData()
                })
                    .then(response => console.log(response.json())).catch(err =>{
                        console.log(err.message)
                    })

            }

            PostData();

        }}>
            <View style={styles.container}>
                <LoadingModel modalVisible={isLoadingOpen} setModalVisible={setLoading}/>
                <TitleSubTitle mainTitile={"Documents"}
                               subTitle={"We are legally required to ask you for some documents to sign you up as driver."}/>
                <View style={[styles.card, styles.shadowProp]}>
                    <Text style={styles.title}>Driver's License *</Text>
                    <View style={styles.rowFlex}>
                        <View style={styles.InputSection}>

                            <Pressable onPress={showDatePicker}><Text style={styles.input}>{date}</Text></Pressable>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        </View>

                    </View>
                    <View style={{alignItems: "center", borderRadius: 15, margin: 10}}>
                        {driverLicense && <Image source={{uri: driverLicense}} style={{width: 200, height: 200}}/>}
                    </View>
                    <Pressable onPress={pickDriverLicense} style={[styles.buttonBlack, styles.ButtonFlex]}>
                        <AntDesign name="upload" size={22} color="white"/>
                        <Text style={{
                            color: "white",
                            fontSize: 14,
                            lineHeight: 21,
                            fontWeight: "500",
                            marginStart: 10,
                            textAlign: "center",
                            fontFamily: "Poppins_400Regular",
                        }}>
                            Upload
                        </Text>
                    </Pressable>
                </View>
                <View style={[styles.card, styles.shadowProp]}>
                    <Text style={styles.title}>Take Selfie *</Text>
                    <View style={{alignItems: "center", borderRadius: 15, margin: 10}}>
                        {selfie && <Image source={{uri: selfie}} style={{width: 200, height: 200}}/>}
                    </View>
                    <Pressable onPress={takeSelfie} style={[styles.buttonBlack, styles.ButtonFlex]}>
                        <Feather name="camera" size={22} color="white"/>
                        <Text style={{
                            color: "white",
                            fontSize: 14,
                            lineHeight: 21,
                            fontWeight: "500",
                            marginStart: 10,
                            textAlign: "center",
                            fontFamily: "Poppins_400Regular",
                        }}>
                            Take Selfie
                        </Text>
                    </Pressable>
                </View>
                <View style={[styles.card, styles.shadowProp]}>
                    <Text style={styles.title}>Vehicle Registration Docs *</Text>
                    <View style={{alignItems: "center", borderRadius: 15, margin: 10}}>
                        {vehicleRegistration &&
                            <Image source={{uri: vehicleRegistration}} style={{width: 200, height: 200}}/>}
                    </View>
                    <Pressable onPress={pickVehicleRegistration} style={[styles.buttonBlack, styles.ButtonFlex]}>
                        <AntDesign name="upload" size={22} color="white"/>
                        <Text style={{
                            color: "white",
                            fontSize: 14,
                            lineHeight: 21,
                            fontWeight: "500",
                            marginStart: 10,
                            textAlign: "center",
                            fontFamily: "Poppins_400Regular",
                        }}>
                            Upload
                        </Text>
                    </Pressable>
                </View>
                <View style={[styles.card, styles.shadowProp]}>
                    <Text style={styles.title}>Vehicle Picture *</Text>
                    <View style={{alignItems: "center", borderRadius: 15, margin: 10}}>
                        {vehiclePic && <Image source={{uri: vehiclePic}} style={{width: 200, height: 200}}/>}
                    </View>
                    <Pressable onPress={pickVehiclePic} style={[styles.buttonBlack, styles.ButtonFlex]}>
                        <AntDesign name="upload" size={22} color="white"/>
                        <Text style={{
                            color: "white",
                            fontSize: 14,
                            lineHeight: 21,
                            fontWeight: "500",
                            marginStart: 10,
                            textAlign: "center",
                            fontFamily: "Poppins_400Regular",
                        }}>
                            Upload
                        </Text>
                    </Pressable>
                </View>
            </View>
        </BaseRegistration>

    )
}