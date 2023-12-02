import BaseRegistration from "./BaseRegistration";
import {StyleSheet, ScrollView, Text, TextInput, View} from "react-native";
import TitleSubTitle from "./TitleSubTitle";
import {Entypo, FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";

import {Foundation} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import React, {useContext, useState} from "react";
import {RiderModeSignUpContext} from "../../Context/RiderModeSignUpContext";


export default function SignUpPageThree(props) {
    const [errors, setErrors] = useState([]);
    const UserData = useContext(RiderModeSignUpContext);

    const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            width: "100%",
            justifyContent: "flex-start",
            padding: 20,
            marginTop: 30,
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
        input: {

            flex: 1,
            margin: 10,
            paddingTop: 10,
            paddingRight: 20,
            width: "100%",
            paddingBottom: 10,
            lineHeight: 21,
            fontWeight: "400",
            fontSize: 14,
            paddingLeft: 5,
            backgroundColor: '#fff',
            color: '#424242',
        },


    })

    return (
        <BaseRegistration errors={errors} navigation={props.navigation} setErrors={setErrors} page={3} onPress={() => {
            let error = [];
            if (!UserData.Validator.isValid(UserData.DriverSignUpData.NationIdCardNo))
                error.push("Enter a valid  national id card no ")
            if (!UserData.Validator.isValid(UserData.DriverSignUpData.DriversLicense))
                error.push("Enter a valid DriversLicense")
            if (error.length > 0) {
                setErrors(error);
                return;
            }

            props.navigation.navigate('SignUpPageFour')
        }}>
            <View style={styles.container}>
                <TitleSubTitle mainTitile={"Legal Details "}
                               subTitle={"Your national id and license details will be kept private"}/>
                <View style={styles.InputSection}>
                    <AntDesign name="idcard" size={24} color="black"/>
                    <TextInput
                        style={styles.input}
                        placeholder="Nation ID Card No."
                        onChangeText={(e) => {
                            UserData.addEntry({NationIdCardNo: e});
                        }}
                        value={UserData.DriverSignUpData.NationIdCardNo}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={styles.InputSection}>
                    <MaterialCommunityIcons name="license" size={24} color="black"/>
                    <TextInput
                        style={styles.input}
                        placeholder="Driver's License"
                        onChangeText={(e) => {
                            UserData.addEntry({DriversLicense: e});
                        }}
                        value={UserData.DriverSignUpData.DriversLicense}
                        underlineColorAndroid="transparent"
                    />
                </View>
            </View>
        </BaseRegistration>

    )
}