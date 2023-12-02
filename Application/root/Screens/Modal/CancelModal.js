import {View, StyleSheet, Modal, Alert} from "react-native";
import {useState} from "react";
import MailSentPopup from "../../Components/MailSentPopup";
import CancelRide from "../../Components/User/CancelRide";


export default function CancelModal(props) {
    const modalVisible = props.modalVisible;
    const cancel = props.cancel
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
                <CancelRide cancel={cancel}/>
            </Modal>
        </View>
    )
}