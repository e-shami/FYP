import React, {useContext} from 'react';
import {useRef} from 'react';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {
    Image,
    Pressable, SafeAreaView,
    ScrollView,
    SectionList,
    StyleSheet,
    Text,
    TextInput,
    View,
    VirtualizedList
} from "react-native";
import {ScreenContainer} from "react-native-screens";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {PickUpDropOffContext} from "../../Context/PickUpDropOff";

const GooglePlacesInput = (props) => {
    const ref = useRef();
    const PickUpDropOffData = useContext(PickUpDropOffContext);

    return (
        <SafeAreaProvider styles={{width: "100%", height: "100%"}}>
            <Text style={{
                marginTop: 50,
                fontSize: 18,
                textAlign: "center",
                fontWeight: "500",
                fontFamily: "Poppins_400Regular"
            }}>Select {PickUpDropOffData.PickUpDropOffData.isPickUp ? "Pick-up" : "Drop-off"} Location</Text>
            <GooglePlacesAutocomplete
                ref={ref}
                placeholder="Search"
                fetchDetails={true}
                styles={{
                    container: {
                        marginTop: 10,
                    },
                    listView: {
                        marginHorizontal: 15,
                        fontSize: 15,
                        lineHeight: 20,
                        fontFamily: "Poppins_400Regular",

                    },
                    textInput: {
                        height: 55,
                        fontSize: 15,
                        lineHeight: 20,
                        fontFamily: "Poppins_400Regular",
                        marginHorizontal: 15
                    },
                    poweredContainer: {
                        width: 0,
                        height: 0,
                        marginLeft: -50,
                    }
                }}

                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    if (PickUpDropOffData.PickUpDropOffData.isPickUp) {
                        let Copy  = PickUpDropOffData.PickUpDropOffData;
                        Copy.PickUpData.Address = data.description;
                        Copy.PickUpData.latitude = details?.geometry?.location.lat;
                        Copy.PickUpData.longitude = details?.geometry?.location.lng;
                        PickUpDropOffData.UpdateData(Copy);
                        ref.current?.setAddressText("")
                        props.navigation.goBack();
                    } else {
                        let Copy  = PickUpDropOffData.PickUpDropOffData;
                        Copy.DropOffData.Address = data.description;
                        Copy.DropOffData.latitude = details?.geometry?.location.lat;
                        Copy.DropOffData.longitude = details?.geometry?.location.lng;
                        PickUpDropOffData.UpdateData(Copy);
                        ref.current?.setAddressText("")
                        props.navigation.goBack();
                    }

                }}

                query={{
                    key: 'AIzaSyDPvCZmeGuN-y_pJ3ug7PYrwp6BHyKnNUY',
                    language: 'en',
                    components: 'country:pk',
                }}
            />
            <View style={{height: "18%", alignItems: "center"}}>

                <Pressable
                    onPress={()=>{
                        props.navigation.navigate("ChooseFromMap")
                    }}
                    style={{
                    height: 64,
                    width: 250,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    elevation: 4,
                    borderRadius: 10,
                    lineHeight: 30
                }}>
                    <Image source={require("../../../assets/img/locatinPin.png")}/>
                    <Text style={{
                        fontWeight: "400",
                        fontSize: 16,
                        lineHeight: 24,
                        paddingLeft: 10,
                        fontFamily: "Poppins_400Regular"
                    }}>Choose on map</Text>
                </Pressable>
            </View>
        </SafeAreaProvider>
    );
};

export default GooglePlacesInput;