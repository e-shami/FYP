import BaseRegistration from "./BaseRegistration";
import {StyleSheet, TextInput, View} from "react-native";
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {FontAwesome5} from '@expo/vector-icons';
import React, {useContext, useEffect, useState} from "react";
import {Picker} from '@react-native-picker/picker';
import TitleSubTitle from "./TitleSubTitle";
import {RiderModeSignUpContext} from "../../Context/RiderModeSignUpContext";
import ApiUrls, {ApiUrl} from "../../Urls/ApiUrls";


export default function SignUpPageTwo(props) {
    const [VehicleType, setVehicleType] = useState("");
    const [VehicleColor, setVehicleColor] = useState("");
    const [errors, setErrors] = useState([]);

    const UserData = useContext(RiderModeSignUpContext);
    const pickerRef = React.useRef();

    const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            width: "100%",
            justifyContent: "flex-start",
            padding: 20,
            marginTop: 30,
        },
        SwitchSection: {
            flexDirection: 'row',
            marginTop: 10,

            paddingStart: 10,

            backgroundColor: '#fff',
            borderStyle: "solid",
            borderColor: "black",
            paddingLeft: 5,

            height: 60,
            width: "100%",
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

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }
    const [vehicleYearInputRef, licensePlateInputRef] = Array.from({ length: 2 }, () => React.useRef());

    return (
        <BaseRegistration errors={errors} navigation={props.navigation} setErrors={setErrors} page={2} onPress={() => {
            let error = [];
            if (!UserData.Validator.isVehicleTypeValid())
                error.push(" Vehicle Type")
            if (!UserData.Validator.isModelValid())
                error.push("Enter a valid Vehicle Year")
            if (!UserData.Validator.isLicensePlateValid())
                error.push("Enter a valid License Plate")
            if (!UserData.Validator.isCarColorValid())
                error.push("Please Select a Car color")
            if (error.length > 0) {
                setErrors(error);
                return;
            }

            props.navigation.navigate('SignUpPageThree')
        }}>
            <View style={styles.container}>

                <TitleSubTitle mainTitile={"Vehicle Details"} subTitle={"Enter your vehicle details."}/>

                <View style={styles.InputSection}>
                    <View>
                        <FontAwesome5 name="car" size={24} color="black"/>
                    </View>
                    <Picker
                        ref={pickerRef}
                        selectedValue={VehicleType}
                        style={{ width: "90%"}}
                        onValueChange={(itemValue, itemIndex) => {
                            UserData.addEntry({vehicleType: itemValue})
                            setVehicleType(itemValue)
                        }}
                    >

                        {VehicleType.length === 0 ? <Picker.Item label="Vehicle Type" value=""/> : null}
                        <Picker.Item label="Half Tanker - EXPRESS" value="Half"/>
                        <Picker.Item label="Full Tanker - Premium" value="Full"/>
                    </Picker>
                </View>
                <View style={styles.InputSection}>
                    <MaterialCommunityIcons name="car-side" size={24} color="black" />
                    <TextInput
                        style={styles.input}
                        placeholder="Tanker's Associated Company"
                        onChangeText={(e) => {
                            UserData.addEntry({vehicleCompany: e});
                        }}
                        value={UserData.DriverSignUpData.vehicleCompany}
                        underlineColorAndroid="transparent"
                        maxLength={32}
                        onSubmitEditing={() => {
                            vehicleYearInputRef.current.focus();
                        }}
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.InputSection}>
                    <MaterialCommunityIcons name="steering" size={24} color="black"/>
                    <TextInput
                        ref={vehicleYearInputRef}
                        style={styles.input}
                        placeholder="Vehicle Year"
                        maxLength={4}
                        keyboardType="numeric"
                        onChangeText={(e) => {
                            UserData.addEntry({vehicleYear: e});
                        }}
                        value={UserData.DriverSignUpData.vehicleYear}
                        underlineColorAndroid="transparent"
                        onSubmitEditing={() => {
                            licensePlateInputRef.current.focus();
                        }}
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.InputSection}>
                    <MaterialCommunityIcons name="numeric" size={24} color="black"/>
                    <TextInput
                        ref={licensePlateInputRef}
                        style={styles.input}
                        placeholder="License Plate"
                        onChangeText={(e) => {
                            UserData.addEntry({licensePlate: e});
                        }}
                        value={UserData.DriverSignUpData.licensePlate}
                        underlineColorAndroid="transparent"
                        maxLength={8}
                        keyboardType="name-phone-pad"
                        returnKeyType="done"
                    />
                </View>
                <View style={styles.InputSection}>
                    <Ionicons name="ios-color-palette" size={24} color="black"/>
                    <Picker
                        selectedValue={VehicleColor}
                        style={{height: 50, width: "90%"}}
                        onValueChange={(itemValue, itemIndex) => {
                            UserData.addEntry({carColor: itemValue})
                            setVehicleColor(itemValue)
                        }}
                    >
                        {VehicleColor.length === 0 ? <Picker.Item label="Tanker's Color" value=""/> : null}
                        <Picker.Item label="White" value="White"/>
                        <Picker.Item label="Red" value="Red"/>
                        <Picker.Item label="Blue" value="Blue"/>
                        <Picker.Item label="Customized" value="Customized"/>
                    </Picker>
                </View>
            </View>
        </BaseRegistration>

    )
}