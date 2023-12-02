import {View, StyleSheet, Modal, Alert} from "react-native";
import {useState} from "react";
import MailSentPopup from "../../Components/MailSentPopup";


export default function EmailSentModal(props) {
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
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {

                    setModalVisible(!modalVisible);
                }}>
                <MailSentPopup  setModalVisible={setModalVisible}/>
            </Modal>
        </View>
    )
}