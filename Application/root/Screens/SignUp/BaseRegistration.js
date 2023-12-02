import {StyleSheet, Pressable, ScrollView, Text, View, Image} from "react-native";
import UberButtonBlack from "../../Components/uberButton";
import {UberButtonHallow} from "../../Components/uberButton";
import {Ionicons} from '@expo/vector-icons';
import {Dimensions} from 'react-native';
import RiderModeSignUpContextProvider from "../../Context/RiderModeSignUpContext";
import RideEndedModal from "../Modal/RideEndedModal";
import ErrorModel from "../Modal/ErrorModel";
import {useContext} from "react";
import {SwitchUserContext} from "../../Context/SwitchUserContext";


const DullCricle = "#D9D9D9"

function CircleNumber(props) {

    const CircleSize = 30;
    const styles = StyleSheet.create({
        circle: {
            backgroundColor: props.backgroundColor,
            alignItems: 'center',
            width: CircleSize,
            height: CircleSize,

            borderRadius: 100,
            justifyContent: 'center',
        },
    })


    return (
        <Pressable style={[styles.circle, props.style]}>
            <Text style={{color: props.textColor}}>{props.number}</Text>
        </Pressable>

    )

}


export default function BaseRegistration(props) {
    let appMode = useContext(SwitchUserContext);

    const logoRatio =  2.5;
    var page = props.page;
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        logo: {
            width:68 * logoRatio,
            height: 32 * logoRatio,
            resizeMode: 'contain',
        },
        main: {
            flex: 1,
            marginTop: 40,
            backgroundColor: '#fff',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        titleBar: {
            padding: 10,

            flexDirection: "row",
            alignItems: "center",
        },
        steps: {
            paddingStart: 60,
            paddingEnd: 60,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
        }


    })
    const margin = 3;
    const windowHeight = Dimensions.get('window').height * 0.85;


    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.titleBar}>
                    <Pressable onPress={()=>{
                        props.navigation.goBack()
                    }} style={{}}>
                        <Ionicons name="chevron-back-outline" size={30} color="black"/>
                    </Pressable>
                    <View style={{flex: 1,justifyContent:"center",alignItems:"center"}}>

                        <Image source={require("../../../assets/logo/logo.png")} style={styles.logo}/>
                    </View>
                </View>
                { appMode.SwitchUserDefaultData.isUserDriver?
                <View style={styles.steps}>
                    <CircleNumber number={'1'} backgroundColor={page === 1 ? "black" : DullCricle}
                                  textColor={page === 1 ? "white" : "black"}
                                  style={{marginStart: margin,}}/>
                    <View style={{backgroundColor: "black", flex: 1, height: 1, marginStart: margin,}}/>
                    <CircleNumber number={'2'} backgroundColor={page === 2 ? "black" : DullCricle}
                                  textColor={page === 2 ? "white" : "black"}
                                  style={{marginStart: margin,}}/>
                    <View style={{backgroundColor: "black", flex: 1, height: 1, marginStart: margin,}}/>
                    <CircleNumber number={'3'} backgroundColor={page === 3 ? "black" : DullCricle}
                                  textColor={page === 3 ? "white" : "black"}
                                  style={{marginStart: margin,}}/>
                    <View style={{backgroundColor: "black", flex: 1, height: 1, marginStart: margin,}}/>
                    <CircleNumber number={'4'} backgroundColor={page === 4 ? "black" : DullCricle}
                                  textColor={page === 4 ? "white" : "black"}
                                  style={{marginStart: margin,}}/>


                </View>
                :null}
                <ScrollView style={{width: "100%"}}>
                    <View style={{
                        flex: 1,
                        minHeight: windowHeight,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%"
                    }}>


                        <View style={{flex: 1, width: "100%"}}>
                            {props.children}
                            <ErrorModel errors={props.errors} setErrors={props.setErrors} />

                        </View>
                        <UberButtonBlack onPress={props.onPress} text={appMode.SwitchUserDefaultData.isUserDriver ? page === 4 ? "Finish" : "Next": "Finish"}
                                         style={{marginTop: 10, marginBottom: 10}}/>
                        <View style={{height: 10,}}/>
                        <UberButtonHallow onPress={()=>
                        {
                            props.navigation.reset({
                                index: 0,
                                routes: [{name: 'LoginScreen'}],
                            })
                        }} text={"Cancel"} style={{marginTop: 10, marginBottom: 10}}/>
                        <View style={{height: 50,}}/>
                    </View>
                </ScrollView>

            </View>
        </View>
    )

}