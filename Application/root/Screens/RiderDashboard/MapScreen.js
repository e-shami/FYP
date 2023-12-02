import * as React from 'react';
    import MapView, {Marker, Polyline} from 'react-native-maps';
import {StyleSheet, Text, View, Dimensions, Image, Pressable} from 'react-native';
import generatedMapStyle from "../Maps/MapStyle";
import {useContext, useEffect, useRef, useState} from "react";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { MaterialIcons } from '@expo/vector-icons';
import {PickUpDropOffContext} from "../../Context/PickUpDropOff";




function getRegionForCoordinates(points) {
    console.log(points);
    // points should be an array of { latitude: X, longitude: Y }
    let minX, maxX, minY, maxY;

    // init first point
    ((point) => {
        minX = point.latitude;
        maxX = point.latitude;
        minY = point.longitude;
        maxY = point.longitude;
    })(points[0]);

    // calculate rect
    points.map((point) => {
        minX = Math.min(minX, point.latitude);
        maxX = Math.max(maxX, point.latitude);
        minY = Math.min(minY, point.longitude);
        maxY = Math.max(maxY, point.longitude);
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = (maxX - minX);
    const deltaY = (maxY - minY);

    return {
        latitude: midX,
        longitude: midY,
        latitudeDelta: deltaX,
        longitudeDelta: deltaY
    };
}
function Pin(props) {
    let address = props.address;
    let CircleDiameter = 23;
    let CircleColor = "#0066FF";
    const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            position: "absolute",
            paddingBottom: 80,
            justifyContent: "center",
            alignItems: "center",
        },
        address: {
            backgroundColor: CircleColor,
            padding: 4,
            borderRadius: 10,
        }
        ,
        Circle: {
            width: CircleDiameter,
            height: CircleDiameter,
            borderRadius: CircleDiameter / 2,
            backgroundColor: CircleColor,
            justifyContent: "center",
            marginTop: 7,
            alignItems: "center",
        }, InnerCircle: {
            width: CircleDiameter / 2,
            height: CircleDiameter / 2,
            borderRadius: CircleDiameter / 4,
            backgroundColor: "white",
        },
        Line: {
            width: 2,
            height: 20,
            backgroundColor: CircleColor,
        }

    })

    return (
        <View style={styles.container}>
            <View style={styles.address}>
                <Text style={{color: "white"}}>{address}</Text>
            </View>
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <View style={styles.Circle}>
                    <View style={styles.InnerCircle}/>
                </View>
                <View style={styles.Line}/>
            </View>

        </View>
    )

}
function CurrentLocation(props) {
    let address = props.address;
    let CircleDiameter = 23;
    let CircleColor = "#0066FF";
    const styles = StyleSheet.create({
        container: {


            position:"absolute",
            right:35,
            bottom:130,


        },
        address: {
            backgroundColor: CircleColor,
            padding: 4,
            borderRadius: 10,
        }
        ,
        Circle: {
            width: CircleDiameter,
            height: CircleDiameter,
            borderRadius: CircleDiameter / 2,
            backgroundColor: CircleColor,
            justifyContent: "center",
            marginTop: 7,
            alignItems: "center",
        }, InnerCircle: {
            width: CircleDiameter / 2,
            height: CircleDiameter / 2,
            borderRadius: CircleDiameter / 4,
            backgroundColor: "white",
        },
        Line: {
            width: 2,
            height: 20,
            backgroundColor: CircleColor,
        }

    })

    return (
        <View style={styles.container}>
            <Pressable style={{backgroundColor:"white",padding:5,borderRadius:8}} onPress={props.onPress} >
                <MaterialIcons name="my-location" size={30} color="black" />
            </Pressable>


        </View>
    )

}

function DoneButton(props) {

    let CircleDiameter = 23;
    let CircleColor = "#0066FF";
    const styles = StyleSheet.create({
        container: {


            position:"absolute",
            width:"83%",
            bottom:50,

        },

    })

    return (
        <View style={styles.container}>
            <Pressable style={{backgroundColor:"black",padding:5,borderRadius:8,alignItems:"center",justifyContent:"center"}} onPress={props.onPress} >
               <Text style={{color:"white",width:"100%",height:54,textAlign:"center",justifyContent:"center",top:15,fontWeight:"500",fontSize:15}}>Go</Text>
            </Pressable>


        </View>
    )

}
export default function MapScreen(props) {
    const PickUpDropOffData = useContext(PickUpDropOffContext);
    const [mapRegion, setmapRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.9421,
    });

    const [heading,setHeading] = useState("0");

    const reginons = [
        {
            "latitude": 33.668396052135535,
            "latitudeDelta": 0.1081527448,
            "longitude": 73.07490676441775,
            "longitudeDelta": 0.1048048423192
        }
        , mapRegion]

    const [address, setAddress] = useState("");

    async function getAddress(latitude, longitude) {
        let response = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
        });
        if (response.length > 0) {
            let item = response[0];
            let address = "";
            if (item.name !== null && !item.name.match("[A-Z0-9]{4}[+][A-Z0-9]{3}"))
                address += item.name + ", ";
            if (item.street !== null)
                address += item.street + ", ";
            if (item.city !== null)
                address += item.city;

            setAddress(address);
            console.log(address)
        }
    }



    async function getCurrentLocation(message) {
        let {status} = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            alert("Permission not granted", "Allow the app to use location service.", [{text: "OK"}], {cancelable: false});
        }
        let {coords} = await Location.getCurrentPositionAsync();
        if (coords) {
            const {latitude, longitude} = coords;
            getAddress(latitude, longitude);
            setmapRegion({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0042,
                longitudeDelta: 0.0041,

            })


        }
    }

    useEffect(() => {
        getCurrentLocation();

    }, [])




    return (
        <View style={styles.container}>


            <MapView style={styles.map}
                     customMapStyle={generatedMapStyle}
                     onRegionChangeComplete={(region,details)=>{

                            if(details.isGesture) {
                                setmapRegion(region)
                                getAddress(region.latitude, region.longitude)
                            }

                     }}

                     region={mapRegion}

            >

            </MapView>

            <Pin address={address}/>
            <CurrentLocation address={address} onPress={()=>{ getCurrentLocation()}}/>
            <DoneButton onPress={()=>{
                if (PickUpDropOffData.PickUpDropOffData.isPickUp) {
                    let Copy  = PickUpDropOffData.PickUpDropOffData;
                    Copy.PickUpData.Address = address;
                    Copy.PickUpData.latitude = mapRegion.latitude;
                    Copy.PickUpData.longitude = mapRegion.longitude;
                    PickUpDropOffData.UpdateData(Copy);


                } else {
                    let Copy  = PickUpDropOffData.PickUpDropOffData;
                    Copy.DropOffData.Address = address;
                    Copy.DropOffData.latitude = mapRegion.latitude;
                    Copy.DropOffData.longitude = mapRegion.longitude;
                    PickUpDropOffData.UpdateData(Copy);

                }
                props.navigation.goBack()

            }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
