import {Pressable, StyleSheet, Text} from "react-native";


export  default function  UberButtonBlack(props){
    const styles = StyleSheet.create({
        Button: {
            backgroundColor: "black",
            width:"75%",
            borderRadius:10,
            height:68,
            alignContent:"center",
            justifyContent: "center",
            textAlign:"center",
            alignItems:"center",
        }
    })

    return (
        <Pressable style={[styles.Button,props.style]}
        onPress={props.onPress}
        >
            <Text style={[{color: "white",fontFamily:"Poppins_400Regular",},props.textStyle]}>
                {props.text}
            </Text>
        </Pressable>
    );
}

function  UberButtonHallow(props){
    const styles = StyleSheet.create({
        Button: {
            backgroundColor: "transparent",
            width:"75%",
            borderRadius:10,
            height:68,
            alignContent:"center",
            justifyContent: "center",
            textAlign:"center",
            alignItems:"center",
            borderColor:"black",
            borderWidth:1,
        }
    })

    return (
        <Pressable style={styles.Button} onPress={props.onPress}>
            <Text style={{color: "black",fontFamily:"Poppins_400Regular",}}>
                {props.text}
            </Text>
        </Pressable>
    );
}

export {
    UberButtonHallow
}