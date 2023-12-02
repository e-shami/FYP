import {View, StyleSheet, Image, TouchableHighlight, Pressable} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import {useContext} from "react";
import {SessionContext} from "../Context/SessionContext";
import ApiUrls, {ApiUrl} from "../Urls/ApiUrls";


export  default  function DriverHeader(props){
    const  CirlceSize = 37;
    const  ImageSize =  37;
    const  Session = useContext(SessionContext);
    const  styles = StyleSheet.create({
        container:{
            width:"100%",
            flexDirection:"row",
            backgroundColor:"transparent",
            padding:10,
            marginTop:40,

        },
        circle:{
            width:CirlceSize,
            height:CirlceSize,
            borderRadius:CirlceSize/2,
            backgroundColor:"white",
            justifyContent:"center",
            alignItems:"center",

        } ,
        image:{
            width:ImageSize,
            height:ImageSize,
            borderRadius:ImageSize/2,
            justifyContent:"center",
            alignItems:"center",
            alignSelf:"flex-end"

        }


    })

    return(
        <View style={[styles.container,props.style]}>
            <Pressable onPress={()=>props.navigation.openDrawer()} style={styles.circle}>
                <Ionicons name="ios-menu-outline" size={24} color="black" />
            </Pressable>
            <View style={{flex:1}} />
            <Pressable onPress={()=>{
                props.navigation.navigate("Profile")
            }}>
                <Image  style={styles.image} source={{uri:ApiUrl.dp+Session.SessionData.dp}} />
            </Pressable>

        </View>
    )

}