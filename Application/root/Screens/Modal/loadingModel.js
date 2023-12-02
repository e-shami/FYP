import {View, StyleSheet, Modal, Alert, ImageBackground, Text} from "react-native";

import LottieView from 'lottie-react-native';

export default function LoadingModel(props) {
    const modalVisible = props.modalVisible;
    const setModalVisible = props.setModalVisible;
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
            paddingTop: 20,
            borderRadius: 10,
            width: "70%",

            alignItems: "center",
            justifyContent: "center"

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
                    setModalVisible(false);
                }}>

                <ImageBackground source={require("../../../assets/img/blur3.png")} blurRadius={8}
                                 style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <View style={styles.Card}>
                        <LottieView
                            autoPlay
                            style={{
                                width: 200,
                                height: 200,
                            }}
                            // Find more Lottie files at https://lottiefiles.com/featured
                            source={require('../../../assets/anim/laoding.json')}
                        />
                    </View>

                </ImageBackground>
            </Modal>
        </View>
    )
}