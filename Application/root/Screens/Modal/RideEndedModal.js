import {View, StyleSheet, Modal, Alert} from "react-native";
import {useState} from "react";
import RideEnded from "../../Components/RideEnded";


export default function RideEndedModal(props) {
    const modalVisible = props.modalVisible;
    let fare = props.fare
    const  setModalVisible = props.setModalVisible;

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
    })


    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {

                    setModalVisible(!modalVisible);
                }}>
                <RideEnded fare={fare}  setModalVisible={setModalVisible}/>
            </Modal>
        </View>
    )
}