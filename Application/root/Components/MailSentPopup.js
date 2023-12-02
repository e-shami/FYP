import {Image, Pressable, StyleSheet, Text} from "react-native";
import {View} from "react-native";
import {ProgressBar, Colors} from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UberButtonBlack from "./uberButton";


export default function MailSentPopup(props) {
    const imageSize = 50;
    const CirlceSize = 20;

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            backgroundColor: "white",
            alignItems: 'center',
            padding: 20,
            justifyContent: 'center',
        },
        MainContainer: {
            width: "100%",
            backgroundColor: "#fff",
            flexDirection: "column",
            borderRadius: 20,
            padding: 15,
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
            marginTop:45,
            marginBottom:15,
            height: 50,
            alignContent: "center",
            justifyContent: "center",
            alignSelf:"center",
            alignItems: "center",
        }
    });

    return (
        <View style={styles.container}>

            <View style={[styles.MainContainer]}>
                <Pressable style={styles.Right}><Entypo name="cross" size={24} color="black" /></Pressable>

                <View style={styles.PicContainer}>
                    <Image style={styles.pic} source={require("../../assets/img/EmailIcon.png")}/>
                </View>
                <Text style={{fontSize:22,textAlign:"center",fontWeight:"500",paddingHorizontal:15,marginTop:20,fontFamily:"Poppins_400Regular",}}>A confirmation email has been
                    sent on your email. Check email
                    to confirm the change</Text>

                <Pressable style={styles.Button}><Text style={{color:"white",fontSize:18}}>Done</Text></Pressable>
            </View>

        </View>
    )
}