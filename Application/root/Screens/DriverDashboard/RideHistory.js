import {Pressable, ScrollView, StyleSheet, RefreshControl, View, Text} from "react-native";
import RideHistoryCard from "../../Components/RideHistoryCard";
import RideRequest from "../../Components/RideRequest";
import * as React from "react";
import {useCallback, useContext, useEffect, useState} from "react";
import {ApiUrl} from "../../Urls/ApiUrls";
import {SessionContext} from "../../Context/SessionContext";
import {SwitchUserContext} from "../../Context/SwitchUserContext";
import LoadingModel from "../Modal/loadingModel";
import ErrorModel from "../Modal/ErrorModel";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function RideHistoryScreen(props) {
    const [RidesData, setRideData] = useState([])
    const [errors, setErrors] = useState([]);
    const [isLoadingOpen, setLoading] = useState(false);
    const session = useContext(SessionContext);
    let appMode = useContext(SwitchUserContext);
    let rides ={}
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAllRides()
        wait(2000).then(() => setRefreshing(false));
    }, []);
    async function getAllRides() {

        let type=""
        if(appMode.SwitchUserDefaultData.isUserDriver)
        {
            type="asDriver"
        }
        else {
            type="asRider"
        }
        let data ={
            "type":type
        }
        await fetch(ApiUrl.getAllRides, {
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
                setLoading(false)
               setRideData(data.rides)


            } else {
                setLoading(false)
                setErrors(["Error Occurred.\nCouldn't fetch rides."])
                return {}
            }
        }).catch(function (error) {
            setLoading(false)

            setErrors(["Network Error.\nCouldn't fetch rides."])
            return {}
        });
    }
    useEffect(()=>{getAllRides()
    },[])

    function ShiftScreen(id) {

        props.navigation.navigate("Ride Detail",{id:id})
    }

    return (
        <View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {
                    RidesData.length >0 ?
                        RidesData.map((item, index) => {
                            console.log(item)
                            return <Pressable key={index} onPress={()=>{
                            ShiftScreen(item.id)
                            }}>
                                <RideHistoryCard
                                    data={item}
                                />
                            </Pressable>
                        })
                        :<View>
                            <Text style={{textAlign:"center",fontSize:18,marginTop:150,fontFamily:"Poppins_400Regular"}}>
                                Ride History Empty
                            </Text>
                        </View>
                }

            </ScrollView>
            <LoadingModel modalVisible={isLoadingOpen} setModalVisible={setLoading}/>
            <ErrorModel errors={errors} setErrors={setErrors} />
        </View>

    )
}