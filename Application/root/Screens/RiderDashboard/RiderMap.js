import * as React from 'react';
import {View, Image, Pressable, StyleSheet, Text, Dimensions} from 'react-native';
import {StatusBar} from "expo-status-bar";
import DriverHeader from "../../Components/DriverHeader";
import ChangeStatus from "../../Components/ChangeStatus";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useContext, useEffect, useState} from "react";
import PickUpDropOffUserModeCard from "../../Components/User/PickUpDropOffUserModeCard";
import SelectRide from "../../Components/User/SelectRide";
import UserCardBookedBottomSheet from "../../Components/User/UserCardBookedBottomSheet";
import MapPickUpDropOff from "../Maps/MapPickUpDropOff";
import {PickUpDropOffContext} from "../../Context/PickUpDropOff";
import {SessionContext} from "../../Context/SessionContext";

import {ApiUrl} from "../../Urls/ApiUrls";
export default function  RiderMap({route,navigation}) {
    const ButtonSize = 47;
    const  Data = useContext(PickUpDropOffContext);
    const [isBottomSheetOpen,setIsBottomSheetOpen ] = useState(false);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",
            position: "absolute",
            width: "100%",
            height: "100%",
        },

        button: {
            width: ButtonSize,
            height: ButtonSize,
            borderRadius: 15,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 80,
            shadowOffset: {width: -10, height: 4},
            shadowOpacity: 0.8,
            shadowRadius: 20,
            elevation: 5,
            alignSelf: "flex-end",
            marginEnd: 20,

        }
    });
    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );


    return (
        <View style={{flex: 1}}>

            <MapPickUpDropOff style={{width: "100%", height: "100%"}} source={require("../../../assets/img/Basemapimage.png")}/>
            <View style={styles.container}>
                <DriverHeader style={{alignSelf: "flex-start"}} navigation={navigation}/>
                <View style={{
                    flex: 1,
                    flexDirection: "column",

                }}>
                    <PickUpDropOffUserModeCard navigation={navigation}  />
                    <View style={{flex:8}} />
                    {Data.PickUpDropOffData.isDropOff ?
                    <Pressable
                        onPress={()=>{
                            setIsBottomSheetOpen(true);
                        }}
                        style={{backgroundColor:"white",justifyContent:"center",alignItems:"center",borderRadius:10,width:40,height:40,alignSelf:"flex-end",marginEnd:15,}}>
                        <MaterialCommunityIcons name="arrow-up-thick" size={24} color="black" />
                    </Pressable> : null }
                    <SelectRide isOpen={isBottomSheetOpen} navigation={navigation}  setOpen={setIsBottomSheetOpen} />




                </View>


            </View>
        </View>
    );
}

