import React, {useState} from "react";
import {View, StyleSheet, Text, Pressable, Image, ImageBackground} from "react-native";
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import UberButtonBlack from "../../Components/uberButton";
export default function Subscription(props) {
    const [isSubscribed, setIsSubscribed] = useState(2);

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
            justifyContent: "center",
            alignItems: "center"
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

        }


    });
    return (
        <View style={styles.container}>

            {isSubscribed === 2 ? <View style={styles.mainConatiner}>
                    <AntDesign name="checkcircle" size={65} color="#35B368"/>
                    <Text style={styles.heading}>
                        Already Subscribed
                    </Text>
                    <Text style={styles.detail}>
                        you’ve already subscribed to
                        monthly plan. For now driver subscription is <Text style={{fontWeight:"800"}}>0 P</Text>.
                        {/*You have 15 days*/}
                        {/*left in your monthly plan.*/}

                    </Text>
                </View> : isSubscribed ===0  ?




                <View style={styles.mainConatiner}>
                    <Entypo name="circle-with-cross" size={65} color="#EF0202" />
                    <Text style={styles.heading}>
                        Subcription Ended
                    </Text>
                    <Text style={styles.detail}>
                        your subscription has ended, please
                        renew your subscription to continue
                        using your account.
                    </Text>

                    <UberButtonBlack
                        onPress ={
                            ()=>setIsSubscribed(1)
                        }
                        style={{width: "100%",marginTop:50,}} text={"Renew"} />
                </View>
            :
                <View style={styles2.container}>
                    <View style={[ styles2.card,styles2.shadowProp]}>
                        <Text style={{color:"white",fontWeight:"500",fontSize:20,fontFamily:"Poppins_400Regular",}}>Subscribe</Text>
                        <Text style={{color:"rgba(255, 255, 255, 0.58)",fontFamily:"Poppins_400Regular",}}>Subscribe monthly to continue</Text>
                        <View style={{backgroundColor:"#2F2F2F",padding:15,borderRadius:22,marginTop:15,marginBottom:10,}}>
                            <View style={styles2.rowFlex}>
                                   <ImageBackground source={require("../../../assets/img/logoBack.png")} resizeMode="cover" style={{ justifyContent: 'center', padding:5,paddingHorizontal:10}}>
                                       <FontAwesome5 name="award" size={24} color="white" />
                                   </ImageBackground>
                                    <View style={{paddingHorizontal:10}}>
                                        <Text style={{color:"#BFCDDA",fontSize:16,fontWeight:"500",fontFamily:"Poppins_400Regular",}}>
                                            Premium
                                        </Text>
                                        <Text style={{color:"#BFCDDA",fontSize:12,fontWeight:"500",fontFamily:"Poppins_400Regular",}}>
                                            P 10 <Text style={{color:"#BFCDDA",fontSize:10,fontWeight:"400",fontFamily:"Poppins_400Regular",}}>/ month</Text>
                                        </Text>
                                    </View>

                                </View>
                            <View>
                                <View style={[styles2.rowFlex,{marginTop:18}]}>
                                    <AntDesign name="checkcircle" size={20} color="#35B368" />
                                    <Text style={{color:"rgba(191, 205, 218, 0.58)",paddingLeft:13,fontFamily:"Poppins_400Regular",}}> Unlimited Rides</Text>
                                </View>
                                <View style={[styles2.rowFlex,{marginTop:15}]}>
                                    <AntDesign name="checkcircle" size={20} color="#35B368" />
                                    <Text style={{color:"rgba(191, 205, 218, 0.58)",paddingLeft:13,fontFamily:"Poppins_400Regular",}}> No tax</Text>
                                </View>
                                <View style={[styles2.rowFlex,{marginTop:15}]}>
                                    <AntDesign name="checkcircle" size={20} color="#35B368" />
                                    <Text style={{color:"rgba(191, 205, 218, 0.58)",paddingLeft:13,fontFamily:"Poppins_400Regular",}}> All in one</Text>
                                </View>
                            </View>
                            <Pressable onPress={()=>
                            {
                                setIsSubscribed(2)
                            }
                            } style={styles2.buttonWhite}><Text style={{color:"#35B368",fontFamily:"Poppins_400Regular",}}>Subscribe</Text></Pressable>
                            </View>

                    </View>

                </View>

            }


        </View>
    )


}