import {View, StyleSheet, Modal, Alert} from "react-native";
import {useState} from "react";
import MailSentPopup from "../../Components/MailSentPopup";
import CancelRide from "../../Components/User/CancelRide";
import CancelReason from "../../Components/User/CancelReason";


export default function ReasonModal(props) {
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
                <CancelReason reason={props.reason} setReason={props.setReason} cancel={cancel}/>
            </Modal>
        </View>
    )
}