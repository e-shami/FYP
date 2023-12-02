import * as React from 'react';
import {View, Image, Pressable, StyleSheet} from 'react-native';
import {StatusBar} from "expo-status-bar";
import DriverHeader from "../../Components/DriverHeader";
import ChangeStatus from "../../Components/ChangeStatus";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import RideEnded from "../../Components/RideEnded";
import RideRequest from "../../Components/RideRequest";

export default function RideRequestScreen({navigation}) {
    const ButtonSize = 47;
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
            marginBottom: 10,
            shadowOffset: {width: -10, height: 4},
            shadowOpacity: 0.8,
            shadowRadius: 20,
            elevation: 5,
            alignSelf: "flex-end",
            marginEnd: 20,

        }
    });

    return (
        <View style={{flex: 1}}>
            <StatusBar backgroundColor={"#fff"}/>

            <Image style={{width: "100%", height: "100%"}} source={require("../../../assets/img/Basemapimage.png")}/>
            <View style={styles.container}>
                <DriverHeader style={{alignSelf: "flex-start"}} navigation={navigation}/>
                <View style={{
                    flex: 1,
                    flexDirection: "column-reverse",

                }}>

                    <RideRequest navigation={navigation} time={30} />

                    <Pressable style={styles.button}>
                        <Image source={require("../../../assets/img/dotmap.png")} style={{width: 24, height: 24}}/>
                    </Pressable>
                    <Pressable style={[styles.button, {marginBottom: 24}]}>
                        <MaterialCommunityIcons name="navigation-variant" size={24} color="#0066FF"/>
                    </Pressable>
                </View>


            </View>
        </View>
    );
}

