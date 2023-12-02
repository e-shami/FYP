import {StyleSheet, Pressable, Image, Text, RefreshControl, View, Switch, ScrollView, Alert} from 'react-native';
import {Entypo, FontAwesome5, MaterialCommunityIcons,Octicons } from '@expo/vector-icons';
import {Picker} from "@react-native-picker/picker";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons,FontAwesome  } from '@expo/vector-icons';
import React, {useCallback, useContext, useEffect, useState} from "react";
import DPCircle from "../../Components/DPCircle";
import UploadPicModal from "../Modal/UploadPicModal";
import RideEndedModal from "../Modal/RideEndedModal";
import {SessionContext} from "../../Context/SessionContext";
import {ApiUrl} from "../../Urls/ApiUrls";
import LoadingModel from "../Modal/loadingModel";
import mime from "mime";
import {SwitchUserContext} from "../../Context/SwitchUserContext";


export default function Profile(props) {
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getProfileDetails()
        wait(2000).then(() => setRefreshing(false));
    }, []);
    const [profile,setProfile] = useState({
        "Name":"Name",
        "Email":"Email",
        "Phone":"Phone",
        "City":"City"
    })
    const [vehicle,setVehicle] = useState({
        "Company":"Company",
        "Year":"Year",
        "NumberPlate":"Number Plate",
        "Color":"Color"
    })
    async function getProfileDetails() {
        let response = await fetch(
            ApiUrl.userProfile, {
                headers: {
                    Authorization: "Token " + session.SessionData.Token
                }
            }
        ).then(response => response.json()).then((data) => {

            if (data.status === 200) {
                console.log(data.isDriver)
                setProfile({
                    "Name":data.user.user.first_name,
                    "Email":data.user.user.email,
                    "Phone":data.user.phoneNumber,
                    "City":data.user.cityName
                })
                if(data.isDriver === "true")
                {
                    console.log("setting Vehicle")
                    setVehicle({
                        "Company":data.vehicle.company,
                        "Year":data.vehicle.model,
                        "NumberPlate":data.vehicle.numberPlate,
                        "Color":data.vehicle.color
                    })
                }

            }
        });
    }
    useEffect(()=>{
        getProfileDetails()
    },[])
    const [isEnabled, setIsEnabled] = useState(false);
    const session = useContext(SessionContext);
    const [isLoadingOpen, setLoading] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    let appMode = useContext(SwitchUserContext);

    const [modalVisible, setModalVisible] = useState(false);
    const imageSize =100;
    const CirlceSize = 20;
    function  setModalVisible2(props){
        setModalVisible(false)
    }
    async function setImage(props) {
        setLoading(false)
        let data = new FormData()
        let dp =
            {
                uri: props,
                name: props.split("/").pop(),
                type: mime.getType(props),
            }
            data.append("dp",dp)
        await fetch(ApiUrl.updateDP, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "Token "+session.SessionData.Token,
                "Content-Type": "multipart/form-data",
            },
            body: data
        })
            .then(response => response.json()
            ).then(data => {
                if (data.status <= 200) {
                    session.addEntry({"dp":data.dp})
                } else {

                    Alert.alert("Error","Updating Profile Picture Failed.\nTry again")
                }
                setLoading(false);
            }).catch(err => {
                console.log("Error : ",err.message)
                Alert.alert("Error","Updating Profile Picture Failed.\nTry again")
                setLoading(false);
            })
    }
        const styles = StyleSheet.create({
            container: {
                backgroundColor: '#fff',
                height: "100%",

                flexDirection: "column",
                width: "100%",

                paddingHorizontal: "5%",
                paddingTop: 0

            },

            logo: {
                fontWeight: "bold",
                fontSize: 25,
                marginTop: 25,
                textAlign: "center"
            },
            greetings: {
                fontWeight: "bold",
                fontSize: 35,
                marginTop: 60,


            },
            switch: {
                fontWeight: "bold",
                fontSize: 25,
                marginTop: "auto"


            },

            minidisc: {
                fontWeight: "normal",

                fontSize: 15,
                marginTop: 10,


            },
            buttonBlack: {
                backgroundColor: "black",
                padding: 8,
                paddingVertical: 10,

                alignItems: "center",
                borderRadius: 10,
                marginTop: 35,
                width: "100%",

                alignSelf: "center"
            },
            PickerSection: {

                flexDirection: 'row',
                marginTop: 15,
                paddingStart: 20,
                borderRadius: 15,
                paddingEnd: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F4F4F4',


                height: 80,

            },
            InputSection: {

                flexDirection: 'row',
                marginTop: 10,

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

                flex: 1,
                paddingTop: 10,
                paddingRight: 10,
                width: "100%",
                paddingBottom: 10,
                paddingLeft: 5,
                fontFamily: "Poppins_400Regular",
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
                marginTop: 20,

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
                marginTop: 10,

                justifyContent: "center",
            },
            helpingRegister: {
                fontWeight: "normal",
                textAlign: "center",
                fontSize: 15,
                marginTop: 10,
                fontFamily: "Poppins_400Regular",
            },
            bold: {
                fontWeight: "bold",
                fontFamily: "Poppins_400Regular",
                fontSize: 15,
                marginTop: 10,
            },
            flex: {
                marginVertical: 10,
                flexDirection: "row"
            },
            title: {
                fontSize: 18, fontWeight: "500", marginTop: 15, fontFamily: "Poppins_400Regular",
            },
            pressableText: {
                padding: 10, fontSize: 18, paddingStart: 25, fontFamily: "Poppins_400Regular",
            }

        });


        const styles2 = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            }, dp: {
                borderWidth: 5,
                width: imageSize,

                height: imageSize,
                borderRadius: imageSize / 2,
                alignSelf: "flex-start"
            }
        });

        return (
            <ScrollView style={styles.container}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
            >
                <LoadingModel modalVisible={isLoadingOpen} setModalVisible={setLoading}/>
                <View style={{alignSelf: "center"}}>
                    <View style={styles.flex}>
                        <View style={[styles2.dp, {
                            justifyContent: "center",
                            borderColor: "#363636",
                            borderWidth: 2,
                            width: imageSize + 4,
                            height: imageSize + 1,
                        }]}>
                            <Image style={styles2.dp} source={{uri:ApiUrl.dp+session.SessionData.dp}}/>

                        </View>
                        <UploadPicModal modalVisible={modalVisible} setModalVisible={setModalVisible2}
                                        setImage={setImage}/>
                        <Pressable onPress={() => {
                            setModalVisible(true)
                        }} style={{
                            backgroundColor: "#0066FF",
                            alignSelf: "flex-end",
                            borderRadius: 100,
                            padding: 8,
                            marginLeft: -25
                        }}>
                            <Octicons name="pencil" size={11} color="white"/>
                        </Pressable>
                    </View>
                    <Text style={{
                        fontWeight: "400",
                        lineHeight: 22,
                        fontSize: 15,
                        alignSelf: "center",
                        fontFamily: "Poppins_400Regular",
                    }}>{session.SessionData.name.split(" ")[0]}</Text>
                    <Text style={{
                        fontWeight: "400",
                        lineHeight: 13,
                        fontSize: 12,
                        alignSelf: "center",
                        fontFamily: "Poppins_400Regular",
                    }}>@{profile.Email.split("@")[0]}</Text>
                </View>
                <Text style={styles.title}>Details</Text>

                <View style={styles.flex}>
                    <View style={{
                        backgroundColor: "rgba(217, 217, 217, 0.46)",
                        padding: 10,
                        borderRadius: 9,
                        height: 45
                    }}>
                        <FontAwesome name="user-circle" size={24} color="black"/>
                    </View>

                    <Text style={styles.pressableText}>{profile.Name}</Text>

                </View>

                <View style={styles.flex}>
                    <View style={{
                        backgroundColor: "rgba(217, 217, 217, 0.46)",
                        padding: 10,
                        paddingHorizontal: 10,
                        borderRadius: 9,
                        height: 45
                    }}>
                        <Entypo name="mail" size={24} color="black"/>
                    </View>
                    <Text style={styles.pressableText}>{profile.Email}</Text>

                </View>

                <View style={styles.flex}>
                    <View style={{
                        backgroundColor: "rgba(217, 217, 217, 0.46)",
                        padding: 10,
                        paddingHorizontal: 13,
                        borderRadius: 9,
                        height: 45
                    }}>
                        <FontAwesome name="phone" size={24} color="black"/>
                    </View>

                    <Text style={styles.pressableText}>{profile.Phone}</Text>

                </View>
                <View style={styles.flex}>
                    <View style={{
                        backgroundColor: "rgba(217, 217, 217, 0.46)",
                        padding: 10,
                        height: 45,
                        borderRadius: 9,
                        paddingHorizontal: 10
                    }}>
                        <MaterialIcons name="location-city" size={24} color="black"/>
                    </View>

                    <Text style={styles.pressableText}>{profile.City}</Text>

                </View>
                {appMode.SwitchUserDefaultData.isUserDriver ?
                    <View>
                    <Text style={styles.title}>Vehicle Details</Text>
                    <View style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "rgba(157, 208, 255, 0.2)",
                        marginVertical: 10
                    }}/>
                    <View style={styles.flex}>
                    <View style={{
                    backgroundColor: "rgba(217, 217, 217, 0.46)",
                    padding: 10,
                    paddingHorizontal: 10,
                    borderRadius: 9,
                    height: 45
                }}>
                    <FontAwesome5 name="car" size={24} color="black"/>
                    </View>

                    <Text style={styles.pressableText}>{vehicle.Company}</Text>

                    </View>
                    <View style={styles.flex}>
                    <View style={{
                    backgroundColor: "rgba(217, 217, 217, 0.46)",
                    padding: 10,
                    paddingHorizontal: 10,
                    borderRadius: 9,
                    height: 45
                }}>
                    <MaterialCommunityIcons name="steering" size={24} color="black"/>
                    </View>

                    <Text style={styles.pressableText}>{vehicle.Year}</Text>

                    </View>
                    <View style={styles.flex}>
                    <View style={{
                    backgroundColor: "rgba(217, 217, 217, 0.46)",
                    padding: 10,
                    paddingHorizontal: 10,
                    borderRadius: 9,
                    height: 45
                }}>
                    <MaterialCommunityIcons name="numeric" size={24} color="black"/>
                    </View>

                    <Text style={styles.pressableText}>{vehicle.NumberPlate}</Text>

                    </View>
                    <View style={styles.flex}>
                    <View style={{
                    backgroundColor: "rgba(217, 217, 217, 0.46)",
                    padding: 10,
                    paddingHorizontal: 10,
                    borderRadius: 9,
                    height: 45
                }}>
                    <Ionicons name="ios-color-palette" size={24} color="black"/>
                    </View>

                    <Text style={styles.pressableText}>{vehicle.Color}</Text>

                    </View>
                    </View>: null}

            </ScrollView>


        )
    }