import {Image, Pressable, StyleSheet, Text} from "react-native";
import {View} from "react-native";
import {ProgressBar, Colors} from 'react-native-paper';
import UberButtonBlack from "./uberButton";

export default function DPCircle(props) {
    var imageSize = 50;

    if (props.imageSize)
        imageSize = props.imageSize
    const CirlceSize = 20;

    let source = require("../../assets/img/personimage.png");
    if (props.source)
        source = props.source;
    const styles = StyleSheet.create({

        dp: {
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize / 2,
            alignSelf: "flex-start"
        }
    });

    return (

        <Image style={[styles.dp,props.style]} source={source}/>


    )
}