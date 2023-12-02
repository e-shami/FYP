import {Image, Pressable, StyleSheet, Text} from "react-native";
import {View} from "react-native";
import {ProgressBar, Colors} from 'react-native-paper';
import UberButtonBlack from "./uberButton";
import * as ImagePicker from 'expo-image-picker';

import DPCircle from "./DPCircle";
import {useState} from "react";

export default function UploadPic(props) {
    const imageSize = 32;
    const CirlceSize = 12;

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            backgroundColor: "transparent",
            alignItems: 'center',
            padding: 14,
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
            elevation: 5
        },
        PicContainer: {
            padding: 10,
            alignItems: 'center',
            flexDirection: "row",

        },
        dp: {
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize / 2,
            alignSelf: "flex-start"
        }, Circle: {
            width: CirlceSize,
            height: CirlceSize,
            borderRadius: CirlceSize / 2,
            backgroundColor: "#0066FF",
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
            fontSize: 10,
            fontWeight:"400"
        }
        ,
        Address: {
            fontWeight: "400",
            fontSize: 13,
        },
        titleAddressContainer: {
            paddingStart: 20,
            flex:1
        },
        Button: {
            backgroundColor: "black",
            width: 150,
            borderRadius: 10,
            height: 150,
            alignContent: "center",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
        }
    });
    const [image, setImage] = useState(null);
    const captureImage = async () => {

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
            setImage(result.uri);
        }
    };
    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    return (
        <View style={styles.container}>

            <View style={styles.MainContainer}>
                <View style={{alignItems:"center"}}>
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </View>
                <View style={{flexDirection: "row", padding: 10, width: "100%", justifyContent: "center"}}>

                    <Pressable style={[styles.Button, {backgroundColor: "#E0E0E0"}]}
                               onPress={pickImage}
                    >
                        <Text style={{color: "black",fontFamily:"Poppins_400Regular", fontWeight: "500"}}>
                            Open Gallery
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={captureImage}
                        style={[styles.Button, {backgroundColor: "#E0E0E0", marginStart: 10}]}
                    >
                        <Text style={{color: "black",fontFamily:"Poppins_400Regular", fontWeight: "500"}}>
                            Open Camera
                        </Text>
                    </Pressable>

                </View>


            </View>

        </View>
    )
}