import {View, StyleSheet, ScrollView, Text, Pressable, Image, Button, TextInput} from "react-native";
import React, {useContext, useEffect, useRef, useState} from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import UberButtonBlack, {UberButtonHallow} from "../uberButton";
import {PickUpDropOffContext} from "../../Context/PickUpDropOff";
import ApiUrls, {ApiUrl} from "../../Urls/ApiUrls";
import LoadingModel from "../../Screens/Modal/loadingModel";
import ErrorModel from "../../Screens/Modal/ErrorModel";
import {SessionContext} from "../../Context/SessionContext";
import LoadingSplash from "../loading";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function RideCard({style, titleStyle, imageStyle, source, onClick, selected, data}) {

    let SelectedColor = selected.id === data.id ?  "#181818" : "#CEF6FF";

    let TextColor = selected.id === data.id ?  "#FFFFFF" : "#161616";
    const styles = StyleSheet.create({
        container: {
            margin: 7,
            padding: 10,
            backgroundColor: SelectedColor,
            width: "45%",
            height: 118,
            borderRadius: 12,
            justifyContent: "center",
            alignItems: 'center'
        },
        image: {
            width: 92,
            height: 50,
        },
        title: {
            marginTop: 10,
            alignSelf: "center",
            fontSize: 14,
            fontWeight: "500",
            color: TextColor,
            textAlign: "center",
            fontFamily: "Poppins_400Regular",

        }


    })
    let src = data.image === null ? source : {uri: ApiUrl.dp + data.image}

    return (
        <Pressable style={[styles.container, style]} onPress={() => onClick(data)}>
            <Image source={src} style={[styles.image, imageStyle]}/>
            <Text style={[styles.title, titleStyle]}>{data.Title}</Text>
        </Pressable>
    )
}

export default function SelectRide(props) {
    const [discount,setDiscount] = useState("Select your ride")
    const [fare, setFare] = useState(0.0);
    const [CarType, setCarTypes] = useState(null);
    const [selected, setSelected] = useState({});
    const [error, setError] = useState([]);
    const [isLoadingOpen, setLoading] = useState(false);
    const Data = useContext(PickUpDropOffContext);
    const session = useContext(SessionContext);
    function CalculateRideFare(Discount) {
        if(Discount>0)
        {
            Discount = Discount/100
            Discount = 1-Discount
        }
        else {
            Discount = 1
        }
        console.log(selected);
        let d = Data.PickUpDropOffData.distance
        let e = Data.PickUpDropOffData.Duration
        let f = (d * selected.perKilo) + (e * selected.perMin)
        if (f < selected.minimumPrice) {
            selected.minimumPrice = parseFloat(selected.minimumPrice)

            let f = selected.minimumPrice * Discount
            setFare(f)
        } else {
            f = Math.round(f * 100) / 100
            f = f* Discount
            setFare(f)
        }
    }


    async function callFun() {
        setTimeout(function (){},
            5000
        )
        console.log("Session : ",session.SessionData)
        let response =await fetch(
            ApiUrl.getVehicleTypes, {
                headers: {
                    Authorization: "Token "+session.SessionData.Token
                }
            }
        ).then(response => response.json()).then((data) => {
            if (data.status === 200) {
                console.log(data.data)
                setCarTypes(data.data);
                if (data.data.length > 0) {
                    setSelected(data.data[0]);
                    CalculateRideFare(0);
                }
            }
        });

    }
    async function checkPromo() {
        let data = {
            promo:promo,

        }
        await fetch(ApiUrl.checkPromo, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Token " + session.SessionData.Token
            },
            body: JSON.stringify(data)
        }).then(response => response.json()
        ).then(data => {


            if (data.status <= 200) {


                setPromoResponse(parseFloat(data.msg))

                setTimeout(()=>{
                    setLoading(false)
                    setBorderColor("green")
                    setDiscount('Coupon Valid. Discount of "'+data.msg+'%" applied')

                    CalculateRideFare(parseFloat(data.msg))
                },1500)

            } else {
                setPromoResponse(0)
                setTimeout(()=>{
                    setLoading(false)
                    setBorderColor("red")
                    setDiscount("Coupon Invalid or expired.")

                    CalculateRideFare(0)
                },1500)

            }
        }).catch(function (error) {
            setPromoResponse(0)
            setTimeout(()=>{
                setLoading(false)
                setBorderColor("red")
                setDiscount("Coupon Invalid or expired.")

                CalculateRideFare(0)
            },1500)


        });
    }
    useEffect(() => {
        callFun()
    }, [])

    useEffect(() => {
        if (CarType === null)
            return;
        CalculateRideFare(0)

    }, [selected])
    const [borderColor,setBorderColor] = useState("black")
    const [promo,setPromo] = useState("")
    const [promoResponse,setPromoResponse] = useState(0)
    const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            flex: 1,
        },
        InputSection: {
            padding:5,
            flexDirection: 'row',
            marginTop:5,
            paddingStart:5,
            borderTopLeftRadius:20,
            borderBottomLeftRadius:20,
            borderStyle: 'dashed',

            borderColor:borderColor,
            borderWidth:1,
            paddingEnd:5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#eeeeee',



            height: 50,

        },

        searchIcon: {
            width:10,
            height:20,
            padding: 10,
        },
        input: {
            fontFamily:"Poppins_400Regular",
            flex:1,
            paddingTop: 10,
            paddingRight: 10,
            width:"100%",
            paddingBottom: 10,
            paddingLeft: 20,
            fontSize:11,
            lineHeight:21,
            fontWeight:"400",
            color: borderColor,
        },
        promoCode: {
            fontFamily:"Poppins_400Regular",
            flex:1,

            width:"100%",
            padding: 10,
            paddingLeft: 20,
            fontSize:11,
            lineHeight:12,
            fontWeight:"400",
            color: borderColor,
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
        },
        StyleSheetConainer: {
            backgroundColor: "#fff",
            borderTopLeftRadius: 27,
            borderTopRightRadius: 27,
            shadowOffset: {width: -8, height: 4},
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 10,
        },
        title: {

            fontWeight: "bold",
            fontSize: 14,
            fontFamily: "Poppins_400Regular",

        },
        CarSequence: {
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 10,

        }


    })
    const refRBSheet = useRef();

    useEffect(() => {
        if (props.isOpen) {
            refRBSheet.current.open()
        }
        if (CarType !== null) {


            CalculateRideFare(0)
        }
    }, [props.isOpen])


    return (
        <View style={styles.container}>
            <RBSheet
                ref={refRBSheet}
                openDuration={250}
                height={410}
                onClose={() => props.setOpen(false)}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    container: styles.StyleSheetConainer,
                    wrapper: {},
                    draggableIcon: {
                        width: 93,
                        backgroundColor: "#0101011F"
                    }
                }}
            >
                {
                    CarType === null ? <LoadingSplash/> :
                        <>
                            <ScrollView style={{padding: 22}}>
                                <Text style={[styles.title,{color:borderColor}]}>{discount}</Text>

                                <View style={styles.CarSequence}>

                                    {
                                        CarType.map((item, index) => {
                                            return <RideCard source={require("../../../assets/img/car1.png")}
                                                             data={item}
                                                             key={index}
                                                             selected={selected}
                                                             onClick={(data) => {
                                                                 setSelected(data);

                                                             }}/>
                                        })}

                                </View>
                                <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>

                                    <Text style={[styles.title, {marginTop: 10}]}>
                                        Estimated Fare in {selected.Title}
                                    </Text>
                                    <View style={{
                                        marginStart: 10,
                                        marginEnd: 10,
                                        marginTop: 9,
                                        borderWidth: 1,
                                        borderStyle: "dashed",
                                        height: 0,
                                        borderColor: "#161616",
                                        flex: 1,
                                        borderTopWidth: 0


                                    }}/>
                                    <Text style={[styles.title, {marginTop: 10, fontWeight: "500"}]}>
                                        {fare} R
                                    </Text>
                                </View>

                                <View style={{flexDirection:"row"}}>
                                    <View style={[styles.InputSection,{flex:4}]}>
                                        <MaterialCommunityIcons name="sale" size={24} color={borderColor} />
                                        <TextInput
                                            style={styles.input}

                                            placeholder="Promo Code (optional)"
                                            value={promo}
                                            onChangeText={(e) => {
                                                setPromo(e)
                                                setBorderColor("black")
                                                setDiscount("Select your ride")
                                            }}
                                            underlineColorAndroid="transparent"
                                        />
                                    </View>
                                    <Pressable style={{flex:1,alignItems:"center",justifyContent:"center",borderWidth:1,height:50,marginTop:5,
                                        borderColor:borderColor,borderTopRightRadius:20,borderBottomRightRadius:20,borderStyle:"dashed"
                                    }} onPress={
                                        ()=>{
                                            if(promo.length>0)
                                            {
                                                setLoading(true)
                                                checkPromo()

                                            }
                                        }
                                    }>
                                        <Text style={{textAlign: "center",color:borderColor}}>Apply</Text>
                                    </Pressable>
                                </View>
                                <UberButtonBlack onPress={async () => {

                                    let pickAddress = {
                                        "title": Data.PickUpDropOffData.PickUpData.Address,
                                        "lat": Data.PickUpDropOffData.PickUpData.latitude,
                                        "long": Data.PickUpDropOffData.PickUpData.longitude,
                                    }
                                    let dropAddress = {
                                        "title": Data.PickUpDropOffData.DropOffData.Address,
                                        "lat": Data.PickUpDropOffData.DropOffData.latitude,
                                        "long": Data.PickUpDropOffData.DropOffData.longitude,
                                    }
                                    let data = {
                                        "pickupAddress": pickAddress,
                                        "dropOffAddress": dropAddress,
                                        "distance": Data.PickUpDropOffData.distance,
                                        "duration":Data.PickUpDropOffData.Duration,
                                        "fare": fare,
                                        "rideType":selected.Title,

                                    }
                                    if(promoResponse>0)
                                    {
                                        data.promo = promo
                                    }
                                    else{
                                        data.promo = ""
                                    }

                                    console.log(data)
                                    await fetch(ApiUrl.bookRide, {
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
                                            props.setOpen(false)
                                           props.navigation.navigate('SearchingRide')


                                        } else {
                                            setError([data.msg])
                                        }
                                    }).catch(function (error) {
                                        setLoading(false)

                                        setError(["Network Error"+error])
                                    });

                                }} text={"Book Now"} style={{width: "auto", marginTop: 20,}}/>

                            </ScrollView>
                            <View style={{flex: 1, width: "100%"}}>
                                {props.children}
                                <LoadingModel modalVisible={isLoadingOpen} setModalVisible={setLoading}/>
                                <ErrorModel errors={error} setErrors={setError}/>
                            </View>


                        </>
                }

            </RBSheet>
        </View>
    )
}