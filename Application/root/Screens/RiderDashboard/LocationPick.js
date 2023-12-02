import React, {useState} from "react";
import {View, StyleSheet, Text, Pressable, Image, ImageBackground, TextInput, ScrollView} from "react-native";

function LocationSuggestions() {
    const style = StyleSheet.create({
        Suggestion: {

            flexDirection: 'column',
            marginTop: 19,
            paddingStart: 10,



            paddingLeft: 15,
            borderRadius: 5,
            height: 60,
            width: "100%",

        },
    })
    return <View>
        <View style={style.Suggestion}>
            <Text style={{fontWeight:"400",fontSize:13,lineHeight:19,fontFamily:"Poppins_400Regular"}}>Abc tower, Rawal Road</Text>
            <Text style={{fontWeight:"400",fontSize:10,lineHeight:15,color:"#00000080",fontFamily:"Poppins_400Regular"}}>Abc tower, Rawal Road</Text>

        </View>
        <View style={{
            height: 0.5,
            width: "94%",
            alignSelf:"center",
            backgroundColor: "#00000038",
            marginTop: -18,
            marginBottom: 7
        }}/>

    </View>;
}
export default function LocationPick(props) {

    const styles2 = StyleSheet.create({
        container: {
            flexDirection: "column",
            width: "100%",
            justifyContent: "flex-start",
            padding: 20,
            height:"100%",
            alignContent:"center"
        },
        shadowProp: {
            shadowColor: '#504e4e',
            shadowOffset: {width: -18, height: 4},
            shadowOpacity: 0.5,
            shadowRadius: 3,
            elevation:10
        },
        card: {
            alignSelf:"center",
            marginTop:"auto",
            marginBottom:"auto",

            backgroundColor: '#35B368',
            borderRadius: 22,
            padding:18,
            width: '100%',
            fontSize:5,
            marginVertical: 10,
        },
        buttonBlack: {
            backgroundColor: "black",
            padding:8,
            paddingVertical:10,

            alignItems:"center",
            borderRadius: 10,
            marginTop: 30,
            width:"50%",

            alignSelf:"center"
        },
        buttonWhite: {
            backgroundColor: "white",
            padding:8,
            paddingVertical:10,

            alignItems:"center",
            borderRadius: 35,
            marginTop: 30,
            width:"50%",
            marginBottom:10,
            alignSelf:"center"
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

            flexDirection: "row",

            
        },
        ButtonFlex: {

            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        logo: {
            fontWeight: "bold",
            fontSize: 25,
            marginTop:"10%",
            alignSelf:"center",
        },

    })
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "white",

        },
        mainConatiner: {
            justifyContent: "center",
            alignItems: "center",
            width: "70%",
            marginTop: -200,

        },
        heading: {
            fontWeight: "600",
            fontSize: 24,
            marginTop: 10
            ,fontFamily:"Poppins_400Regular",
        },
        detail: {
        fontFamily:"Poppins_400Regular",
            fontWeight: "500",
            fontSize: 16,
            marginTop: 10,
            textAlign: "center"

        },
        InputSection: {
            flexDirection: 'row',
            marginTop:35,

            paddingStart:10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',

            paddingLeft:5,
            borderRadius:5,
            height:60,
            width:"100%",

        },

        input: {

            flex:1,
            margin:10,
            paddingTop: 10,
            paddingRight: 20,
            width:"100%",
            paddingBottom: 10,
            lineHeight:21,
            fontWeight:"400",
            fontFamily:"Poppins_400Regular",
            fontSize:14,
            paddingLeft: 5,
            backgroundColor: '#fff',
            color: '#424242',
        },



    });
    return (
        <View style={styles.container}>
            <View style={styles.InputSection}>
                <View style={{marginLeft:5}}>
                    <Image source={require("../../../assets/img/bluepin.png")} />
                </View>
                <TextInput

                    style={styles.input}
                    placeholder="Enter Location"
                    keyboardType={"email-address"}
                    underlineColorAndroid="transparent"
                />
            </View>
            <View style={{
                height: 0.5,
                width: "90%",
                alignSelf:"center",
                backgroundColor: "#00000038",
                marginTop: -10,
                marginBottom: 7
            }}/>
            <ScrollView >
            <LocationSuggestions />
            <LocationSuggestions />
            <LocationSuggestions />
            <LocationSuggestions />
            <LocationSuggestions />
            <LocationSuggestions />
            <LocationSuggestions />
            <LocationSuggestions />
            <LocationSuggestions />
            <LocationSuggestions />
            <LocationSuggestions />
            <LocationSuggestions />
            </ScrollView>
            <View style={{height:"18%",alignItems:"center"}}>
                
                <Pressable style={{height:64,width:250,backgroundColor:"white",justifyContent:"center",alignItems:"center",flexDirection:"row",elevation:4,borderRadius:10,lineHeight:30}}>
                    <Image source={require("../../../assets/img/locatinPin.png")} />
                    <Text style={{fontWeight:"400",fontSize:16,lineHeight:24,paddingLeft:10,fontFamily:"Poppins_400Regular"}}>Choose on map</Text>
                </Pressable>
            </View>


        </View>
    )


}