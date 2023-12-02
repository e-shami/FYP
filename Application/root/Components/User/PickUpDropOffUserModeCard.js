import {View, StyleSheet, Text, Image, Pressable} from "react-native";
import {useContext} from "react";
import {PickUpDropOffContext} from "../../Context/PickUpDropOff";

export default function PickUpDropOffUserModeCard(props) {
    const CirlceSize = 12;
    var PickUpDropOffData = useContext(PickUpDropOffContext);
    const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            marginTop: 0,
        },
        Box: {
            backgroundColor: "white",
            shadowOffset: {width: -10, height: 4},
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 5,
            borderRadius: 10,
            flexDirection: "row",
            marginStart: 36,
            marginEnd: 36,
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
            fontWeight: "400",
            fontFamily: "Poppins_400Regular",
        }
        ,
        Address: {
            fontWeight: "400",
            fontSize: 13,
            fontFamily: "Poppins_400Regular",
        },
        titleAddressContainer: {
            paddingStart: 20,
            flex: 1
        },

    })

    return (
        <View style={[styles.container]}>
            <View style={[styles.Box, {margin: 10,}]}>
                <View style={{flex: 1, padding: 10, flexDirection: 'row'}}>
                    <View style={{flexDirection: "column", alignItems: "center"}}>
                        <View style={[styles.Circle]}>
                            <View style={[styles.innerCircle]}/>
                        </View>
                        <View style={{width: 1, backgroundColor: "#161616", height: 30}}/>
                        <View style={[styles.Circle, {backgroundColor: "black"}]}>
                            <View style={[styles.innerCircle]}/>
                        </View>

                    </View>
                    <View style={styles.titleAddressContainer}>
                        <Pressable
                            onPress={() => {
                                var  data = PickUpDropOffData.PickUpDropOffData;
                                data.isPickUp = true;

                                PickUpDropOffData.UpdateData(data);
                                props.navigation.navigate("SearchLocation")
                            }}
                        >
                            <Text style={styles.title}>
                                Pickup
                            </Text>
                            <Text style={styles.Address}>
                                {PickUpDropOffData.PickUpDropOffData.PickUpData.Address}
                            </Text>
                        </Pressable>
                        <View style={{backgroundColor: "rgba(0,0,0,0.1)", height: 1, marginTop: 5, marginBottom: 5}}/>
                        <Pressable
                            onPress={() => {
                                var  data = PickUpDropOffData.PickUpDropOffData;
                                data.isPickUp = false;
                                data.isDropOff = true;
                                PickUpDropOffData.UpdateData(data);
                                props.navigation.navigate("SearchLocation")
                            }}
                        >
                            <Text style={styles.title}>
                                Drop-off
                            </Text>
                            <Text style={styles.Address}>
                                {PickUpDropOffData.PickUpDropOffData.DropOffData.Address}
                            </Text>
                        </Pressable>
                    </View>
                    <Image source={require("../../../assets/img/UpdownArrow.png")}
                           style={{marginStart: 10, alignSelf: "center"}}/>

                </View>

            </View>
        </View>
    )
}