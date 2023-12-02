import {StyleSheet, Text, View} from "react-native";


export default function TitleSubTitle(props) {
    const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            width: "100%",
            justifyContent: "flex-start",
        }
        , MainTitle: {
            fontWeight: "600",
            fontSize: 28,
            fontFamily: 'Poppins_400Regular'
        }
        ,
        subTitle: {
            fontWeight: "400",
            fontSize: 15,
            lineHeight:22,
            color:"#000000B2",
            fontFamily: 'Poppins_400Regular'
        },


    })


    return (
        <View style={styles.container}>
            <Text style={styles.MainTitle}>
                {props.mainTitile}
            </Text>
            <Text style={styles.subTitle}>
                {props.subTitle}
            </Text>

        </View>
    )
}