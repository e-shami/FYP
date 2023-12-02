import {Dimensions,StatusBar, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {FontAwesome5, Ionicons, Octicons} from '@expo/vector-icons';
import React, {useContext} from "react";
import {ApiUrl, WsUrls} from "../../Urls/ApiUrls";
import STATUS_CODE from "../../Urls/StatusCode";
import {SessionContext} from "../../Context/SessionContext";
import {RideAcceptedContext} from "../../Context/RideAcceptedContext";

const ImageSize = 46;
const messageGape = 20;
function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join('');
}
function ReceiverMessage(props) {
    let time = props.time
    time = time.substring(0,5)
    time = tConvert(time)
    const styles = StyleSheet.create({
        container: {
            width: "80%",
            flexDirection: "row",
            marginStart: 15,
            marginBottom: messageGape,
        },
        image: {
            width: ImageSize,
            height: ImageSize,
            borderRadius: ImageSize / 2,
            margin: 5,
        },
        message: {
            flexDirection: "column",
            fontFamily: "Poppins_400Regular",

        },
        title: {
            fontWeight: "500",
            fontSize: 12,
            marginTop: ImageSize / 4,
            fontFamily: "Poppins_400Regular",
            marginEnd: 5,
        },
        time: {
            fontWeight: "300",
            fontSize: 11,
            marginTop: ImageSize / 4,
            fontFamily: "Poppins_400Regular",
            color: "#00000070",
        },
        messageBox: {
            backgroundColor: "#F4F5FF",
            padding: 10,
            margin: 5,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,

        }
    })

    return (
        <View style={styles.container}>
            <Image source={{uri:ApiUrl.dp+props.dp}} style={styles.image}/>
            <View style={styles.message}>
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.title}>
                        {props.sender}
                    </Text>
                    <Text style={[styles.time]}>
                        {time}
                    </Text>
                </View>
                <View style={styles.messageBox}>
                    <Text>
                        {props.message}

                    </Text>

                </View>


            </View>
        </View>

    )
}

function SenderMessage(props) {
    const session = useContext(SessionContext);


    let time = props.time
    time = time.substring(0,5)
    time = tConvert(time)
    const styles = StyleSheet.create({
        container: {
            width: "100%",
            flexDirection: "row-reverse",
            marginBottom: messageGape,


        },
        image: {
            width: ImageSize,
            height: ImageSize,
            borderRadius: ImageSize / 2,
            margin: 5,
            marginEnd: 15,

        },
        message: {
            flexDirection: "column",
            flex: 1,

            paddingStart: 40,
            marginEnd: 10,

        },
        title: {
            fontWeight: "500",
            fontSize: 12,
            marginTop: ImageSize / 4,
            marginStart: 5,
        },
        time: {
            fontWeight: "300",
            fontSize: 11,
            marginTop: ImageSize / 4,
            color: "#00000070",
        },
        messageBox: {
            backgroundColor: "#242424",
            padding: 10,
            margin: 5,
            marginEnd: 5,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            color: "white",
            alignSelf: "flex-end",

        }
    })

    return (
        <View style={styles.container}>
            <Image source={{uri:ApiUrl.dp+session.SessionData.dp}} style={styles.image}/>
            <View style={styles.message}>
                <View style={{flexDirection: "row-reverse", alignSelf: "flex-end"}}>
                    <Text style={styles.title}>
                        {props.sender}
                    </Text>
                    <Text style={[styles.time]}>
                        {time}
                    </Text>
                </View>
                <Text style={styles.messageBox}>
                    {props.message}
                </Text>


            </View>
        </View>

    )
}

function SuggestedMessages(props) {

    const styles = StyleSheet.create({
        conatiner: {
            padding: 25,
        },
        title: {
            width: "100%",
            textAlign: "center",
            fontSize: 14,
            fontWeight: "500",
            padding: 10,
            fontFamily: "Poppins_400Regular",
            marginBottom: 20
        },
        messagesContainer: {
            flexDirection: "column"


        },
        message: {
            borderRadius: 100,
            padding: 10,
            paddingStart: 15,
            paddingEnd: 15,
            backgroundColor: "#ECECEC",
            fontFamily: "Poppins_400Regular",
            margin: 5,
            flex: 2
        },
        messageTextSize: {
            fontWeight: "400",
            fontSize: 14,
            fontFamily: "Poppins_400Regular",
            textAlign: "center"
        }

    })

    return (
        <View style={styles.conatiner}>
            <Text style={styles.title}>
                Suggested Messages
            </Text>
            <View style={styles.messagesContainer}>
                <View style={{flexDirection: "row"}}>
                    <Pressable
                        onPress={() => props.setMessage("I’m Coming")}

                        style={[styles.message, {flex: 1}]}>
                        <Text style={styles.messageTextSize}>
                            I’m Coming
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => props.setMessage("I will be there in 5 mins")}

                        style={[styles.message, {backgroundColor: "#35B36882"}]}>
                        <Text style={styles.messageTextSize}>
                            I will be there in 5 mins
                        </Text>
                    </Pressable>
                </View>
                <View style={{flexDirection: "row", marginTop: 7}}>

                    <Pressable
                        onPress={() => props.setMessage(" Thank you so much!")}
                        style={[styles.message, {backgroundColor: "#35B36882"}]}>
                        <Text style={styles.messageTextSize}>
                            Thank you so much!
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => props.setMessage("Hurry Up !")}

                        style={[styles.message, {flex: 1}]}>
                        <Text style={styles.messageTextSize}>
                            Hurry Up !
                        </Text>
                    </Pressable>
                </View>
                <View style={{flexDirection: "row", marginTop: 7, justifyContent: "center"}}>

                    <Pressable
                        onPress={() => props.setMessage("Call me")}

                        style={[styles.message, {flex: 0, paddingStart: 30, paddingEnd: 30}]}>
                        <Text style={styles.messageTextSize}>
                            Call me
                        </Text>
                    </Pressable>
                </View>
            </View>

        </View>
    )
}


function ChattingScreen(props) {
    const ride = useContext(RideAcceptedContext);
    return <ChattingScreenContext ride={ride}  {...props} />
}

class ChattingScreenContext extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSuggestionAva: true,
            message: "",
            messagesArray: []
        }

    }

    scrollViewRef = null;
    WebSocket = null;
    session = null;

    componentDidMount() {

        this.session = this.context;
        if (this.WebSocket !== null)

            return;
        this.WebSocket = new WebSocket(WsUrls.Ride);
        this.WebSocket.onopen = () => {
            this.WebSocket.send(
                JSON.stringify({
                    "status": STATUS_CODE.CONNECTION_REQ,
                    "rideId": this.props.ride.RideData.id,
                    "GroupId": this.props.ride.RideData.groupId + JSON.stringify(this.props.ride.RideData.id)+"msg",
                })
            )
        }
        this.WebSocket.onmessage = (e) => {
            let response = JSON.parse(e.data)
            console.log("=================================",response);
            if (response.status === STATUS_CODE.IN_COMING_MSG) {
                this.setState({
                    messagesArray: [...this.state.messagesArray, response.msg]
                })
            } else if (response.status === STATUS_CODE.FETCH_OLD_MESSAGES && this.state.messagesArray.length === 0) {
                this.setState({
                    messagesArray: [...response.data]
                })
            }

        };
    }


    sendMessage() {

        if (this.WebSocket === null || this.state.message.length === 0)
            return
        this.WebSocket.send(JSON.stringify({
            status: STATUS_CODE.IN_COMING_MSG,
            msg: {
                id: this.session.SessionData.id,
                msg: this.state.message,
                rideId: this.props.ride.RideData.id,
            },
        }))
        this.setState({
            message: ""
        })

    }

    render() {
        return (
            <View style={styles.container}>

                <View style={[styles.header,{marginTop:StatusBar.currentHeight}]}>
                    <Pressable style={{marginStart:10,marginTop:5,}}>
                        <Octicons name="three-bars" size={24} color="black"/>
                    </Pressable>
                    <Text style={{flex:1,textAlign:"center",fontFamily:"Poppins_400Regular",fontWeight:"500",fontSize:16}}>
                        Chat
                    </Text>
                    <Pressable style={{marginEnd:10}}>
                        <Ionicons name="call-sharp" size={24} color="black" />
                    </Pressable>
                </View>
                <View style={{width:"100%",height:1,backgroundColor:"#00000038"}}/>
                <ScrollView
                    ref={ref => this.scrollViewRef = ref}
                    onContentSizeChange={() => this.scrollViewRef.scrollToEnd({animated: true})}
                >

                    {
                        this.state.messagesArray.map((value, index) => {
                            if (value.id === this.session.SessionData.id)
                                return <SenderMessage key={index} sender={this.session.SessionData.name} time={value.time} message={value.msg}/>
                            return <ReceiverMessage key={index} sender={value.sender} dp={value.dp} time={value.time} message={value.msg}/>
                        })
                    }

                </ScrollView>

                {this.state.isSuggestionAva ? <SuggestedMessages setMessage={(msg) => this.setState({
                    isSuggestionAva: false,
                    message: msg,
                })}/> : null}

                <View style={styles.messageContainer}>
                    <Pressable style={{padding: 10, marginStart: 5, marginEnd: 10,}}>
                        <FontAwesome5 name="pen" size={24} color="white"/>
                    </Pressable>
                    <TextInput multiline={true} value={this.state.message}
                               onChangeText={(text) => {
                                   this.setState({
                                       isSuggestionAva: text.length === 0,
                                       message: text,
                                   })
                               }}
                               placeholderTextColor={"white"} placeholder={"Type message"}
                               style={styles.textInput}/>
                    <Pressable
                        onPress={() => this.sendMessage()}
                        style={{padding: 10, marginStart: 5, marginEnd: 10,}}>
                        <Ionicons name="ios-send" size={24} color="white"/>
                    </Pressable>
                </View>

            </View>
        )
    }

}

ChattingScreenContext.contextType = SessionContext

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: "white",

    },
    header: {
        padding: 15,
        width:"100%",
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
    },

    messageContainer: {
        backgroundColor: "#000000D4",
        padding: 10,
        justifyContent: "center",

        margin: 15,
        borderRadius: 15,
        flexDirection: "row"
    },
    textInput: {
        color: "white",
        fontWeight: "400",
        fontSize: 14,
        flex: 1,
        textAlign: "auto",
        marginEnd: 10,
        maxHeight: 140,
    }


})
export default ChattingScreen;
