import {Image, StyleSheet, Text} from "react-native";
import {View} from "react-native";
import React, {useState} from "react";
import {Rating} from "react-native-ratings";


export default function RideHistoryCard(props) {
    const imageSize = 50;
    let data = props.data
    const CirlceSize = 12;
    const [rating, setRating] = useState(0);


    const styles = StyleSheet.create({
        container: {
            width: "100%",
            backgroundColor: "white",
            alignItems: 'center',
            padding: 20,
            marginTop: 50,
            justifyContent: 'center',
        },
        MainContainer: {
            width: "100%",
            backgroundColor: "#fff",
            flexDirection: "row",
            borderRadius: 20,
            marginTop: 10,
            marginBottom: 10,
            padding: 10,
            shadowOffset: {width: -10, height: 4},
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 2
        },
        PicContainer: {
            padding: 10,
            alignItems: 'center',
            alignSelf: "center",

        },
        pic: {
            textAlign: "center",
            alignSelf: "center"
        },
        Right: {

            alignSelf: "flex-end"
        }
        ,
        Circle: {
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
        title: {
            color: "rgba(0, 0, 0, 0.5)",
            fontSize: 10,
            fontFamily:"Poppins_400Regular",
            fontWeight: "400",

        },
        dateFare: {


            marginEnd: 10,
            textAlign: "right",

        }
        ,
        Address: {
            fontWeight: "400",
            fontFamily:"Poppins_400Regular",
            fontSize: 10,
        },
        titleAddressContainer: {
            paddingStart: 3,
            flexDirection: "column",
        },
        dp:{
            width:129,
            height:102,

        },
        Button: {
            backgroundColor: "black",
            width: "45%",
            borderRadius: 10,
            marginTop: 35,
            marginBottom: 15,
            height: 50,
            alignContent: "center",
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
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


    let year = data.creationDate.split("-")[0]
    let month = data.creationDate.split("-")[1]
    let m = parseInt(month)
    month = toMonthName(m).split(" ")[1]

    let d = data.creationDate.split("-")[2]
    let day = d.substring(0,2)
    let time = d.substring(3,8)
    time = tConvert(time)

    return (

        <View style={[styles.MainContainer]}>

            <View style={{flexDirection:"row",flex:1}}>
                <View style={{backgroundColor: "#fff", padding: 10, flexDirection: 'row'}}>
                    <View style={{flexDirection: "column", alignItems: "center"}}>
                        <View style={[styles.Circle]}>
                            <View style={[styles.innerCircle]}/>
                        </View>
                        <View style={{width: 2, backgroundColor: "black", height: 40}}/>
                        <View style={[styles.Circle, {backgroundColor: "black"}]}>
                            <View style={[styles.innerCircle]}/>
                        </View>

                    </View>
                        <View style={styles.titleAddressContainer}>
                            <View>
                                <Text style={styles.title}>
                                    Pickup
                                </Text>
                                <Text style={styles.Address}>
                                    {data.pickUpAddress.description}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.title}>
                                    Dropoff
                                </Text>
                                <Text style={styles.Address}>
                                    {data.dropOffAddress.description}
                                </Text>
                            </View>
                            <Rating
                                ratingCount={5}
                                imageSize={13}
                                ratingBackgroundColor="#D9D9D9"
                                readonly={true}
                                startingValue={data.rating}


                            />
                        </View>


                </View>
            </View>
            <View style={styles.dateFare}>
                <Text style={[styles.title, {flex: 1}]}>{time+" | "+month+" "+day+","+" "+year}</Text>
                <Text style={{
                    fontSize: 13,
                    textAlign: "right",
                    fontWeight: "500",
                    alignSelf: "flex-end",
                    marginBottom: 0,
                    marginTop: "auto",
                    fontFamily:"Poppins_400Regular",
                    margin: 10,
                    marginEnd: 15
                }}>{parseFloat(data.fare).toFixed(2)} R</Text>

            </View>
        </View>

    )
}