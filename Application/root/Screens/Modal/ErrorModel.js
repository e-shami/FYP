import {View, StyleSheet, Modal, Alert, ImageBackground, Text} from "react-native";
import {useState} from "react";
import RideEnded from "../../Components/RideEnded";
import image from "../../../assets/img/Basemapimage.png";
import {MaterialIcons} from "@expo/vector-icons";
import UberButtonBlack from "../../Components/uberButton";


export default function ErrorModel(props) {
    const modalVisible = props.errors.length > 0;
    const setModalVisible = props.setErrors;
    const ErrorsArray = props.errors;
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "row",

        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,

        },

        Card: {
            padding: 10,
            paddingTop:20,
            borderRadius: 10,
            shadowOffset: {width: -10, height: 4},
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 30,
            backgroundColor: "white",
            width: "80%",
            alignItems: "center",

        },
        error: {}
    })


    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible([]);
                }}>

                <ImageBackground source={require("../../../assets/img/blur2.png")} blurRadius={8}
                                 style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <View style={styles.Card}>
                        <MaterialIcons name="error" size={50} color="black"/>
                        <View style={
                            {marginTop: 10,
                            marginBottom:20,
                            }
                        }>
                            {
                                ErrorsArray.map((item, index) => {
                                    return (
                                        <Text key={index} style={styles.error}>
                                            {item}
                                        </Text>)
                                })
                            }

                        </View>

                        <UberButtonBlack text={"Ok"} style={{height:50,}} onPress={()=>{
                            setModalVisible([]);
                        }}/>
                    </View>

                </ImageBackground>
            </Modal>
        </View>
    )
}