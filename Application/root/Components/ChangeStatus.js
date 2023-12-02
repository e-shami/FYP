import {View, Text} from "react-native";
import {StyleSheet} from "react-native";
import {Switch} from "react-native-paper";
import {useState} from "react";


export default function ChangeStatus(props) {

    const styles = StyleSheet.create({
        container: {
            shadowOffset: {width: -10, height: 4},
            shadowOpacity: 0.8,
            shadowRadius: 3,
            borderRadius: 10,
            backgroundColor: "#fff",
            padding:10,
            alignItems:"center",
            flexDirection:"row",
            elevation: 20
        },
        text: {
            fontWeight: "500",
            flex:1,
            fontSize: 15,

        },
        Switch:{

        }

    })
    const  isEnable =  props.isEnable;
    const setEnable = props.setEnable;

    return (
            <View style={[styles.container,props.style]}>

                <Text style={styles.text}>
                    Change Status
                </Text>
                <Switch


                    trackColor={{ false: "#2F2F2F", true: "#2F2F2F" }}
                    thumbColor={isEnable ? "#35B368" : "#f4f3f4"}
                    onValueChange={()=>{setEnable(!isEnable)}}
                    value={isEnable}
                    style={styles.Switch}/>


            </View>
    )

}