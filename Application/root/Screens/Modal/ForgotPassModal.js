import {View, StyleSheet, Modal, Alert} from "react-native";
import {useState} from "react";
import MailSentPopup from "../../Components/MailSentPopup";
import CancelRide from "../../Components/User/CancelRide";
import RateDriver from "../../Components/User/RateDriver";
import ForgotPass from "../../Components/Common/ForgotPass";


export default function ForgotPassModal(props) {
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
                <ForgotPass forgot={props.forgot} setVisible={setModalVisible}></ForgotPass>
            </Modal>
        </View>
    )
}