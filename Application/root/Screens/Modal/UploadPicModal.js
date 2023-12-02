import {View, StyleSheet, Modal, Text, Pressable, Alert} from "react-native";
import {useState} from "react";
import RideEnded from "../../Components/RideEnded";
import UploadProfilePic from "../../Components/UploadProfilePic";
import * as ImagePicker from "expo-image-picker";


export default function UploadPicModal(props) {
    const modalVisible = props.modalVisible;
    const  setModalVisible = props.setModalVisible;
    const imageSize =100;
    const CirlceSize = 20;
    const [DPImg, SetDP] = useState(null);
    const takeSelfie = async () => {

        // No permissions request is necessary for launching the image library
        let permission = await ImagePicker.requestCameraPermissionsAsync();
        console.log("-------------------------"+permission)
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            SetDP(result.uri);
            props.setModalVisible(false);
            props.setImage(result.uri)
        }
    };
    const pickDP = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            SetDP(result.uri);
            props.setModalVisible(false);
            props.setImage(result.uri)
        }
    };
    const styles2 = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "row",
        },
        centeredView: {
            position:"absolute"

        },
    })
    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height:"100%",

            alignItems: 'center',
            padding: 20,
            justifyContent: 'center',
        },
        MainContainer: {
            width: "100%",
            backgroundColor: "#fff",
            flexDirection: "column",
            borderRadius: 20,
            padding: 10,
            shadowOffset: {width: -10, height: 4},
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 30
        },
        PicContainer: {
            padding: 10,
            alignItems: 'center',
            alignSelf:"center",

        },
        pic: {
            textAlign:"center",
            alignSelf: "center"
        },
        Right:{

            alignSelf:"flex-end"
        }
        ,
        Circle: {
            width: CirlceSize,
            height: CirlceSize,
            borderRadius: CirlceSize / 2,
            backgroundColor: "blue",
            justifyContent: "center",
            alignItems: "center",
        },
        innerCircle: {
            width: CirlceSize / 2,
            height: CirlceSize / 2,
            borderRadius: CirlceSize / 4,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
        },
        title: {
            color: "rgba(0, 0, 0, 0.5)",
            fontSize: 14,
        }
        ,
        Address: {
            fontWeight: "bold",
            fontSize: 18,
        },
        titleAddressContainer: {
            paddingStart: 20,
        },
        Button: {
            backgroundColor: "black",
            width: "45%",
            borderRadius: 10,
            marginTop:35,
            marginBottom:15,
            height: 50,
            alignContent: "center",
            justifyContent: "center",
            alignSelf:"center",
            alignItems: "center",
        }
    });

    return (
        <View style={styles2.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {

                    setModalVisible(false);
                }}>
                <View style={styles.container}>

                    <View style={[styles.MainContainer]}>
                        <Text style={{textAlign:"center",fontWeight:"500",fontSize:16,fontFamily:"Poppins_600SemiBold",margin:10}}>Upload Profile Picture</Text>
                        <View style={{
                            height: 2,
                            width: "100%",
                            backgroundColor: "rgba(185,185,185,0.2)",
                            marginTop: 7,
                            marginBottom: 7
                        }}/>
                        <Pressable onPress={pickDP}
                        ><Text style={{textAlign:"center",fontWeight:"400",fontSize:16,fontFamily:"Poppins_400Regular",margin:8}}>Choose a Photo</Text></Pressable>
                        <View style={{
                            height: 2,
                            width: "100%",
                            backgroundColor: "rgba(185,185,185,0.2)",
                            marginTop: 7,
                            marginBottom: 7
                        }}/>
                        <Pressable
                            onPress={takeSelfie}
                        ><Text style={{textAlign:"center",fontWeight:"400",fontSize:16,fontFamily:"Poppins_400Regular",margin:8}}>Take a Photo</Text></Pressable>
                    </View>

                </View>
            </Modal>
        </View>
    )
}