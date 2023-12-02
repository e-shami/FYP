import {Alert, BackHandler, Image, RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";
import DPCircle from "../../Components/DPCircle";
import UberButtonBlack from "../../Components/uberButton";
import ErrorModel from "../Modal/ErrorModel";
import LoadingModel from "../Modal/loadingModel";
import {useCallback, useContext, useEffect, useState} from "react";
import {SessionContext} from "../../Context/SessionContext";
import {SwitchUserContext} from "../../Context/SwitchUserContext";
import {ApiUrl} from "../../Urls/ApiUrls";
import {Entypo} from "@expo/vector-icons";
import app from "react-native/template/App";
import ReasonModal from "../Modal/ReasonModal";
import RateDriver from "../../Components/User/RateDriver";
import RateDriverModal from "../Modal/RateDriverModal";
import RideEndedModal from "../Modal/RideEndedModal";
import * as React from "react";


export default function RideDetailScreen(props) {

    const navigation = props.navigation;
    const CirlceSize = 15;

    const [Rating,setRating] = useState(0)
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "white",
        },
        title: {
            fontWeight: "500",fontFamily:"Poppins_400Regular",
            fontSize: 16,
            color: "#161616",

        },
        mainContainer: {
            padding: 22,
        }, Circle: {
            width: CirlceSize,
            height: CirlceSize,
            borderRadius: CirlceSize / 2,
            backgroundColor: "blue",
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
        key: {
            fontWeight: "500",
            fontSize: 13,
            flex: 1,

            color: "#161616",fontFamily:"Poppins_400Regular",
        }, value: {
            fontWeight: "400",
            fontSize: 12,
            color: "#161616",fontFamily:"Poppins_400Regular",
        },
        image: {
            marginTop: 18,
            width: 331,
            height: 217,
            borderRadius: 20,
            alignSelf: "center"
        }, Line: {
            borderColor: "#0000004F",
            borderWidth: 0.3,
            borderStyle: "dashed"
        },PicContainer: {
            alignItems: "center",
            justifyContent: "center",
            padding: 8,
            flexDirection: "row",

        },


    })
    const [errors, setErrors] = useState([]);
    const [rideDetails, setRideDetails] = useState({
        "pickUpAddress": {"description":"XYZ"},
        "dropOffAddress":{"description":"ABC"},
        "pickUpTime":"10:00 AM",
        "dropOffTime":"10:05 AM",
        "Date":"00-00-0000",
        "fare":"10",
        "rider":{
            "dp":"../../assets/img/personimage.png",
            "user":{
                "first_name":"ABC"
            }
        },
        "driver":{
            "dp":"../../assets/img/personimage.png",
            "user":{
                "first_name":"ABC"
            }
        }

    });
    function toMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString('en-US', {
            month: 'long',
        });
    }
    function tConvert(time) {
        // Check correct time format and split into components
        let x = time.split(":")
        if(x[0].length===1)
            x[0] = "0"+x[0]
        if(x[1].length===1)
            x[1] = "0"+x[1]
        time=x[0]+":"+x[1]
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1); // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join('');
    }



    const [person,setPerson] = useState({})
    const [vehicle,setVehicle] = useState({})
    const [id,setID] = useState(props.route.params.id)
    const [isLoadingOpen, setLoading] = useState(true);
    const session = useContext(SessionContext);
    let appMode = useContext(SwitchUserContext);
    let type= ""
    if (appMode.SwitchUserDefaultData.isUserDriver) {
        type = "asDriver"
    } else {
        type = "asRider"
    }
    async function getRide() {

        let data = {
            "type": type,
            "RideID": id
        }
        await fetch(ApiUrl.RideDetail, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Token " + session.SessionData.Token
            },
            body: JSON.stringify(data)
        }).then(response => response.json()
        ).then(data => {

            setLoading(false)

            if (data.status <= 200) {
                console.log(data.ride)
                let year = data.ride.creationDate.split("-")[0]
                let month = data.ride.creationDate.split("-")[1]
                let m = parseInt(month)
                month = toMonthName(m).split(" ")[1]

                let d = data.ride.creationDate.split("-")[2]
                let day = d.substring(0,2)
                let time = d.substring(3,8)
                time = tConvert(time)
                let pickup = data.ride.pickUpTime
                console.log(data.ride)
                pickup = pickup.substring(0,5)
                pickup = tConvert(pickup)
                let dropOff = data.ride.dropOffTime
                dropOff = dropOff.substring(0,5)
                dropOff = tConvert(dropOff)
                data.ride.datetime=time+" | "+month+" "+day+","+" "+year
                data.ride.pickUpTime = pickup
                data.ride.dropOffTime = dropOff
                setRideDetails(data.ride)
                if(props.route.params.showEndModal)
                {
                    if(appMode.SwitchUserDefaultData.isUserDriver)
                    {
                        setFareModal(true)
                    }
                }
                if(!appMode.SwitchUserDefaultData.isUserDriver)
                {

                    setVehicle(data.vehicle)
                    if(data.ride.rating === null)
                    {
                        setRateModal(true)
                    }
                }




            } else {
                setErrors(["Error Occurred.\nCouldn't fetch ride details."])
            }
        })
    }
    async function doneRating() {

        if (Rating !== 0) {
            let DATA = new FormData()
            DATA.append("id",id)
            DATA.append("rating",Rating)
            await fetch(ApiUrl.updateRideRating, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: "Token " + session.SessionData.Token
                },
                body: DATA
            }).then(response => response.json()
            ).then(data => {

                setRateModal(false)

            }).catch(function (error) {
                console.log(error)
                setRateModal(false)
            });


        }
        else {
            Alert.alert("Rating is Required", "Please share us your experience.")
        }

    }
    useEffect(() => {
    getRide()
        setLoading(false)
    },[id])
    if(props.route.params.id !== id)
    {
        setLoading(true)
        setID(props.route.params.id)
    }
    const [DriverRateModal,setRateModal] = useState(false)
    const [showFareModal,setFareModal] = useState(false)

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setID(props.route.params.id)
        getRide()
        wait(2000).then(() => setRefreshing(false));
    }, []);
    return (

        <View style={styles.container}>

            <View style={{borderColor: "#00000038", borderWidth: 0.3}}/>

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
            />
            }
                        >
                <View style={styles.container}>
                    <View style={styles.mainContainer}>
                        <Text style={styles.title}>
                            Location and Timing {rideDetails.rating}
                        </Text>
                    </View>
                    <View style={styles.Line}/>
                    <View style={styles.mainContainer}>

                        {/*Circle */}
                        <View style={{backgroundColor: "white", flexDirection: "column", alignItems: "center"}}>
                            <View style={{flexDirection: "row"}}>
                                <View style={[styles.Circle]}>
                                    <View style={[styles.innerCircle]}/>
                                </View>
                                <Text style={{fontWeight: "500", fontSize: 14, marginStart: 5, flex: 1,fontFamily:"Poppins_400Regular",}}>
                                    {rideDetails.pickUpAddress.description}
                                </Text>
                                <Text style={{fontWeight: "400", fontSize: 13, marginStart: 5, marginEnd: 4,fontFamily:"Poppins_400Regular",}}>
                                    {rideDetails.PickupTime}
                                </Text>
                            </View>
                            <View style={{flexDirection: "row"}}>
                                <View style={{
                                    width: 1,
                                    backgroundColor: "black",
                                    height: 40,
                                    marginTop: -5,
                                    marginStart: CirlceSize / 2
                                }}/>
                                <Text style={{fontWeight: "bold", marginStart: 5, flex: 1,fontFamily:"Poppins_400Regular",}}>
                                </Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                marginTop: -2,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>

                                <View style={[styles.Circle, {backgroundColor: "black"}]}>
                                    <View style={[styles.innerCircle]}/>
                                </View>
                                <Text style={{fontWeight: "500", fontSize: 14, marginStart: 5, flex: 1,fontFamily:"Poppins_400Regular",}}>
                                    {rideDetails.dropOffAddress.description}
                                </Text>
                                <Text style={{fontWeight: "400", fontSize: 13, marginStart: 5, marginEnd: 4,fontFamily:"Poppins_400Regular",}}>
                                    {rideDetails.DropOffTime}
                                </Text>
                            </View>
                        </View>

                        <View style={{flexDirection: "row", marginTop: 15, alignItems: "center"}}>
                            <Text style={styles.key}>
                                Pickup Time
                            </Text>
                            <Text style={styles.value}>
                                {rideDetails.pickUpTime}
                            </Text>
                        </View>
                        <View style={{flexDirection: "row", marginTop: 15, alignItems: "center"}}>
                            <Text style={styles.key}>
                                Drop Off Time
                            </Text>
                            <Text style={styles.value}>
                                {rideDetails.dropOffTime}
                            </Text>
                        </View>
                        <View style={{flexDirection: "row", marginTop: 15, alignItems: "center"}}>
                            <Text style={styles.key}>
                                Ride Started @
                            </Text>
                            <Text style={styles.value}>
                                {rideDetails.datetime}
                            </Text>
                        </View>


                        <View style={{flexDirection: "row", marginTop: 25, alignItems: "center"}}>
                            <Text style={styles.key}>
                                {appMode.SwitchUserDefaultData.isUserDriver ? "Rider" : "Driver"}
                            </Text>
                            <Text style={styles.value}>
                            </Text>
                        </View>

                    </View>
                    <View style={styles.Line}/>
                    <View style={styles.mainContainer}>
                        <View style={{flexDirection: "row", alignItems: "center",backgroundColor: "#fff",
                            flex: 1,
                            justifyContent: "center",
                            marginStart: 10,
                            }}>
                            <View style={styles.PicContainer}>
                                <DPCircle source={appMode.SwitchUserDefaultData.isUserDriver ? {uri:ApiUrl.dp+rideDetails.rider.dp} : {uri:ApiUrl.dp+rideDetails.driver.dp} } imageSize={46}/>
                                <View style={{
                                    backgroundColor: "#fff",
                                    flex: 1,
                                    justifyContent: "center",
                                    marginStart: 10,
                                    flexDirection: "row",
                                }}>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: "column",
                                    }}>
                                        <Text style={{
                                            fontWeight: "500",
                                            flex: 1,
                                            fontFamily: "Poppins_400Regular",
                                            fontSize: 14
                                        }}>
                                            {appMode.SwitchUserDefaultData.isUserDriver ? rideDetails.rider.user.first_name : rideDetails.driver.user.first_name}
                                        </Text>
                                        <View style={{flexDirection:"row",alignItems:"center"}}>
                                            <Entypo name="star" size={14} color="#F4C01E" />
                                            <Text style={{fontWeight:"400",fontSize:12,marginStart:4}}>
                                                {parseFloat(rideDetails.driver.rating).toFixed(2)}
                                            </Text>
                                        </View>

                                    </View>

                                    {appMode.SwitchUserDefaultData.isUserDriver ? null:
                                        <View style={{flexDirection: "column",right:0}}>
                                            <Image source={{uri:ApiUrl.dp+vehicle.vehicleImg}}
                                                   style={{width: 40, height: 23, alignSelf: "flex-end"}}/>
                                            <Text style={{fontWeight: "300", fontSize: 10, marginTop: 4,}}>
                                                {vehicle.company} ({vehicle.model}) - <Text style={{fontWeight: "500", fontSize: 10}}>{vehicle.numberPlate}</Text>
                                            </Text>

                                        </View>
                                    }
                                </View>
                            </View>
                        </View>

                        <Text style={{fontWeight: "500", fontSize: 16, marginStart: 10, marginTop: 38}}>
                            Pricing
                        </Text>

                    </View>
                    <View style={styles.Line}/>
                    <View style={styles.mainContainer}>
                        <View style={{flexDirection: "row", marginTop: 13, alignItems: "center"}}>
                            <Text style={styles.key}>
                                Total Fare
                            </Text>
                            <Text style={[styles.value, {fontWeight: "600", fontSize: 14}]}>
                                {parseFloat(rideDetails.fare).toFixed(2)} R
                            </Text>
                        </View>


                    </View>
                    {props.route.params.showEndModal ? <View style={{alignItems:"center"}}>
                        <UberButtonBlack onPress={()=>{
                            props.navigation.reset({
                                index: 0,
                                routes: [{name: 'Map'}],
                            })
                        }} text={"Done"} ></UberButtonBlack>
                    </View> : null}
                </View>
            </ScrollView>
            <LoadingModel modalVisible={isLoadingOpen} setModalVisible={setLoading}/>
            <ErrorModel errors={errors} setErrors={setErrors} />
            <RateDriverModal setModalVisible={setRateModal} modalVisible={DriverRateModal} done={()=>{doneRating()}} setRating={setRating} name={rideDetails.driver.user.first_name} dp={rideDetails.driver.dp} ></RateDriverModal>
            <RideEndedModal setModalVisible={setFareModal} modalVisible={showFareModal} fare={parseFloat(rideDetails.fare).toFixed(2)}/>
        </View>
    )

}