import {View, StyleSheet, Modal, Alert} from "react-native";
import {useState} from "react";
import MailSentPopup from "../../Components/MailSentPopup";
import CancelRide from "../../Components/User/CancelRide";
import RateDriver from "../../Components/User/RateDriver";


export default function RateDriverModal(props) {
    const modalVisible = props.modalVisible;
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
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {

                    setModalVisible(!modalVisible);
                }}>
                <RateDriver name={props.name} done={props.done} setRating={props.setRating} dp={props.dp} setVisible={setModalVisible}></RateDriver>
            </Modal>
        </View>
    )
}