import {StyleSheet, Text, TextInput, View, Pressable, Image} from "react-native";
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import React, {useContext} from "react";
import {SessionContext} from "../../Context/SessionContext";


export default function Finish(props) {

    const session = useContext(SessionContext);
    let status = props.route.params.status
    const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            width: "100%",
            justifyContent: "flex-start",
            padding: 20,
            height: "100%",
            alignContent: "center"
        },
        shadowProp: {
            shadowColor: '#504e4e',
            shadowOffset: {width: -10, height: 4},
            shadowOpacity: 0.5,
            shadowRadius: 3,
            elevation: 40
        },
        card: {
            alignSelf: "center",
            marginTop: "auto",
            marginBottom: "auto",
            alignItems: "center",
            backgroundColor: 'white',
            borderRadius: 8,
            padding: 10,
            width: '100%',
            fontSize: 5,
            marginVertical: 10,
        },
        buttonBlack: {
            backgroundColor: "black",
            padding: 8,
            paddingVertical: 10,

            alignItems: "center",
            borderRadius: 10,
            marginTop: 30,
            width: "50%",

            alignSelf: "center"
        },
        InputSection: {

            flexDirection: 'row',
            marginTop: 10,
            paddingStart: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderStyle: "solid",
            borderColor: "black",
            paddingLeft: 5,
            borderRadius: 5,
            height: 60,
            width: "100%",
            borderWidth: 1
        },
        PickerSection: {

            flexDirection: 'row',
            margin: 2,
            padding: 0,

            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderStyle: "solid",
            borderColor: "black",
            paddingLeft: 5,
            borderRadius: 10,
            height: 60,
            width: "50%",
            borderWidth: 1
        },
        input: {

            flex: 1,
            paddingTop: 10,
            paddingRight: 10,
            width: "100%",
            paddingBottom: 10,
            paddingLeft: 5,
            backgroundColor: '#fff',
            color: '#424242',
        },
        rowFlex: {
            paddingStart: 60,
            paddingEnd: 60,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
        },
        ButtonFlex: {

            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        logo: {
            width:"90%",
            height:"70%",
            marginTop: "10%",
            alignSelf: "center",

        },

    })
    let statusColor = "red"
    if(status === "PENDING")
        statusColor="blue"
    return (
        <View style={styles.container}>
            <View style={{height:100,width:"100%"}}>
            <Image style={styles.logo} source={require("../../../assets/logo/logo.png")} />
            </View>

            <View style={[styles.card, styles.shadowProp]}>
                {
                    props.route.params.status === "PENDING"?
                    <MaterialIcons name="email" size={35} color="black"/>:
                    <MaterialCommunityIcons name="emoticon-sad" size={35} color="black" />
                }
                <Text style={{
                    textAlign: "center",
                    fontSize: 16,
                    marginTop: 15,

                    lineHeight: 24,
                    fontWeight: "700",
                    fontFamily: "Poppins_400Regular",
                }}>Current Status : <Text style={{color:statusColor }}>{props.route.params.status}</Text></Text>
                <Text style={{
                    marginTop: 10,
                    textAlign: "center",
                    fontSize: 16,
                    lineHeight: 24,
                    fontWeight: "500",
                    fontFamily: "Poppins_400Regular",
                }}>{status === "PENDING" ? " We've received your information wait while our team analyze your documents.":
                    "Your request for City go Driver has been declined. "
                }</Text>
                <Pressable
                    onPress={() => {
                        session.ClearSession()
                        props.navigation.reset({
                            index: 0,
                            routes: [{name: 'LoginScreen'}],
                        });
                    }}

                    style={styles.buttonBlack}><Text
                    style={{color: "white", fontWeight: "500", fontSize: 12, lineHeight: 18}}>Done</Text></Pressable>
            </View>
        </View>


    )
}