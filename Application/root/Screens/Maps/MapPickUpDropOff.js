import React, {useContext, useRef} from "react";
import {Alert, Image, StyleSheet, Text, View} from "react-native";
import {PickUpDropOffContext} from "../../Context/PickUpDropOff";
import MapView, {Marker} from "react-native-maps";
import generatedMapStyle from "./MapStyle";
import MapViewDirections from "react-native-maps-directions";
import GOOGLE_MAP_API_KEY from "../../Config/GoogleApiConfig";
import { PROVIDER_GOOGLE } from "react-native-maps"
import * as Location from "expo-location";
import {getCurrentPositionAsync} from "expo-location";

function Circle(props) {
    let text = props.text;
    let color = "blue";
    if (props.color)
        color = props.color;
    const CirlceSize = 15;

    const styles = StyleSheet.create({
        Circle: {
            width: CirlceSize,
            height: CirlceSize,
            borderRadius: CirlceSize / 2,
            backgroundColor: color,
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
        text: {
            color: "black",
            fontWeight: "500",
            fontSize: 12,
        }

    })

    return (
        <View style={{alignItems: "center", justifyContent: "center"}}>
            <Text style={styles.text}>{text}</Text>
            <View style={[styles.Circle]}>
                <View style={[styles.innerCircle]}/>
            </View>
        </View>
    )
}


class MapPickUpDropOff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],

        };
    }

    ResetView() {
        this.forceUpdate();

    }

    async GetCurrentLocation() {
        let {status} = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            Alert.alert(
                "Permission not granted",
                "Allow the app to use location service.",
                [{text: "OK"}],
                {cancelable: false}
            );
            return;

        }
        let {coords} = await Location.getCurrentPositionAsync();
        if (coords) {

            const {latitude, longitude} = coords;
            let PickUpDropOffData = this.context;
            if(PickUpDropOffData.PickUpDropOffData.PickUpData.Address.length<=1)
            {
                let Copy = PickUpDropOffData.PickUpDropOffData;
                Copy.PickUpData.latitude = latitude;
                Copy.PickUpData.longitude = longitude;
                PickUpDropOffData.UpdateData(Copy);
                this.forceUpdate();

            }
            else{
                this.forceUpdate();
            }
        }
    }

    DropRegion = null;
    preRegion = {
        latitude: 0,
        longitude: 0,
        latitudeDelta: this.props.latitudeDelta != null ? this.props.latitudeDelta : 0.0922,
        longitudeDelta: this.props.longitudeDelta != null ? this.props.latitudeDelta : 0.0922,
    };

    componentDidMount() {
        let PickUpDropOffData = this.context.PickUpDropOffData;
        this.preRegion = {
            latitude: PickUpDropOffData.PickUpData.latitude,
            longitude: PickUpDropOffData.PickUpData.longitude,
            latitudeDelta: this.props.latitudeDelta != null ? this.props.latitudeDelta : 0.0922,
            longitudeDelta: this.props.longitudeDelta != null ? this.props.latitudeDelta : 0.0922,
        };
        this.GetCurrentLocation();
    }

    componentDidUpdate(prev) {
        let PickUpDropOffData = this.context.PickUpDropOffData;
        this.preRegion = {
            latitude: PickUpDropOffData.PickUpData.latitude,
            longitude: PickUpDropOffData.PickUpData.longitude,
            latitudeDelta: this.props.latitudeDelta != null ? this.props.latitudeDelta : 0.0922,
            longitudeDelta: this.props.longitudeDelta != null ? this.props.latitudeDelta : 0.0922,
        };

    }

    render() {
        let PickUpDropOffData = this.context.PickUpDropOffData;
        if (PickUpDropOffData.DropOffData.latitude !== 0) {
            this.DropRegion = {
                latitude: PickUpDropOffData.DropOffData.latitude,
                longitude: PickUpDropOffData.DropOffData.longitude,
                latitudeDelta: 0.1922,
                longitudeDelta: 0.1921,
            }

        }

        return (
            <MapView style={this.props.style}
                     provider={PROVIDER_GOOGLE}
                     customMapStyle={generatedMapStyle}
                     region={this.preRegion}
                     showsMyLocationButton={false}
            >
                <Marker
                    key={1}
                    tracksViewChanges={false}
                    coordinate={this.preRegion}
                >
                    {this.props.showCar === true  ?
                         <Image source={require("../../../assets/img/car.png")} style={{width: 20, height: 20}}/>
                        :<Circle text={this.props.MarkerText != null ? this.props.MarkerText : "PickUp"}/>
                    }
                </Marker>

                {
                    this.DropRegion !== null ?
                        <>
                            <Marker
                                key={2}
                                tracksViewChanges={false}
                                coordinate={this.DropRegion}

                            >
                                <Circle text={"Drop Off"} color={"black"}/>
                            </Marker>
                            <MapViewDirections
                                onReady={result => {
                                    let distance = result.distance
                                    let duration = result.duration
                                    PickUpDropOffData.distance = distance;
                                    PickUpDropOffData.Duration = duration;
                                    this.context.UpdateData(PickUpDropOffData);
                                    this.forceUpdate()
                                }}
                                strokeWidth={2}
                                origin={this.preRegion}
                                destination={this.DropRegion}
                                apikey={GOOGLE_MAP_API_KEY}
                            />

                        </>
                        : null
                }


            </MapView>

        )
    }
}

MapPickUpDropOff.contextType = PickUpDropOffContext;
export default MapPickUpDropOff;
