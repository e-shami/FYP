import {StyleSheet, Pressable, ScrollView, Text, View, TextInput} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import {useContext, useEffect, useRef, useState} from "react";
import UberButtonBlack from "../../Components/uberButton";
import {ApiUrl} from "../../Urls/ApiUrls";
import {SwitchUserContext} from "../../Context/SwitchUserContext";
import LoadingModel from "../Modal/loadingModel";
import ErrorModel from "../Modal/ErrorModel";
import {SessionContext} from "../../Context/SessionContext";

function DigitInput(props) {
    const error = props.error;
    const BorderColor = error.length > 0 ? "red" : "#000000";
    const style = StyleSheet.create({
        MainContainer: {
            flexDirection: "column"
        }, errorText: {
            color: "red",
            marginTop: 20,
            fontFamily: "Poppins_400Regular",
            fontSize: 14,
            textAlign: "center",

        },
        container: {
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 25,
        },
        border: {
            borderColor: BorderColor,
            width: 40,
            height: 40,
            borderRadius: 4,
            borderWidth: 1,
            marginStart: 5,
            marginEnd: 5,
        },
        Input: {
            flex: 1,
            color: "#000000",
            paddingStart: 14,
            fontWeight: "500",
            fontSize: 18,

        }

    })
    const PinCount = props.pinCount;
    let [Pin, setPin] = useState(new Array(PinCount));
    const onCodeChange = props.onCodeChange;
    let TextInputRef = []
    for (let i = 0; i < PinCount; i++) {
        TextInputRef.push(new useRef())
    }
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current === false) {
            didMountRef.current = true;
            return;
        }

        onCodeChange(Pin);
    }, [Pin])

    function getInputs() {
        let inp = []
        for (let i = 0; i < PinCount; i++) {
            if (i === 0) {
                inp.push(<View key={i} style={style.border}>
                        <TextInput autoFocus={props.autoFocusOnLoad} keyboardType={"numeric"} maxLength={1}
                                   onChangeText={text => {
                                       let Copy = [...Pin]
                                       Copy[i] = text;
                                       setPin(Copy);
                                       if (text.length === 0) {
                                           return
                                       }

                                       TextInputRef[i + 1].current.focus();


                                   }
                                   }
                                   style={style.Input}/>
                    </View>
                )
            } else {
                inp.push(
                    <View key={i} style={style.border}>
                        <TextInput keyboardType={"numeric"}
                                   maxLength={1}
                                   onChangeText={text => {
                                       props.setError()
                                       let Copy = [...Pin]
                                       Copy[i] = text;
                                       setPin(Copy);
                                       if (text.length === 0) {

                                           return
                                       }

                                       try {
                                           TextInputRef[i + 1].current.focus();
                                       } catch (Ex) {
                                       }

                                   }

                                   }
                                   ref={TextInputRef[i]}
                                   style={style.Input}/>
                    </View>)
            }

        }
        return inp
    }

    return (

        <View style={style.MainContainer}>
            <View style={style.container}>

                {
                    getInputs()

                }


            </View>

            {error.length > 0 ? <Text style={style.errorText}>{error}</Text> : null}
        </View>
    )
}


export default function ResetPassOTP(props) {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        logo: {
            fontWeight: "500",
            fontSize: 16,
            resizeMode: 'contain',
        },
        main: {
            flex: 1,
            marginTop: 40,
            backgroundColor: '#fff',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        titleBar: {
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
        },
        steps: {
            paddingStart: 60,
            paddingEnd: 60,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
        },
        family: {
            fontFamily: "Poppins_400Regular",
        },
        underlineStyleBase: {
            width: 30,
            height: 45,
            borderWidth: 0,
            borderBottomWidth: 1,

        },

        underlineStyleHighLighted: {
            borderColor: "#03DAC6",
        },


    })
    const time = useRef(60);
    const [uptime, setUptime] = useState(60);
    const [reSend, setResend] = useState(false);
    const interval = useRef(null);
    const [error, setError] = useState("");
    const [OTP, setOTP] = useState("");
    const [ModalErrors, setModalErrors] = useState([]);

    var UserData = useContext(SwitchUserContext);
    const Session = useContext(SessionContext);
    const [isLoadingOpen, setLoading] = useState(false);


    function ok() {
        interval.current = setInterval(() => {
            time.current = time.current - 1;
            setUptime(time.current);
            if (time.current <= 0) {
                setUptime(0);
                clearInterval(interval.current);
                setResend(true);
            }
        }, 1000)
    }

    useEffect(() => {
        if (reSend === false)
            ok();
    }, [reSend])

    async function reSendOtp() {
        alert(props.route.params.token)
        setLoading(true)
        let response = await fetch(
            ApiUrl.resendOTP, {
                headers: {
                    Authorization: "Token " + props.route.params.token
                }
            }
        ).then(response => response.json()).then((data) => {
            console.log(data)
            setLoading(false)
            if (data.status === 200) {
                time.current = 60;
                setResend(false);

            }
        });
    }

    let RESEND_COLOR = reSend ? "#0066FF" : "#A4A4A4";

    return (
        <View style={styles.container}>

            <View style={styles.main}>

                <View style={styles.titleBar}>
                    <Pressable style={{}}>
                        <Ionicons name="chevron-back-outline" size={24} color="black"/>
                    </Pressable>
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <Text style={[styles.logo, styles.family]}>
                            Verification
                        </Text>
                    </View>
                </View>

                <ScrollView style={{width: "100%"}}>
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%"
                    }}>
                        <Text style={[{fontWeight: "500", fontSize: 24, marginTop: 80}, styles.family]}>
                            Enter Code
                        </Text>

                        <Text
                            style={[{fontWeight: "400", color: "#C27500", fontSize: 16, marginTop: 5}, styles.family]}>
                            {uptime} S
                        </Text>
                        <DigitInput
                            style={{width: '80%', height: 200, marginTop: 1}}
                            pinCount={4}
                            error={error}
                            setError={() => {
                                setError("")
                            }}
                            autoFocusOnLoad={true}

                            onCodeChange={(code => {
                                let otp = ""
                                let complete = true
                                for (let i = 0; i < 4; i++) {

                                    if (code[i] === "" || code[i] === undefined) {
                                        complete = false
                                    } else {
                                        otp = otp + code[i]
                                    }
                                }
                                if (complete) {
                                    setOTP(otp)
                                }

                            })}

                        />


                        <Text
                            style={[{
                                fontWeight: "400", color: "#A4A4A4", fontSize: 16,
                                textAlign: "center",
                                marginTop: 30, paddingStart: 50, paddingEnd: 50
                            }, styles.family]}>
                            A reset OTP has been sent to {props.route.params.phone}
                        </Text>

                        <View style={{flexDirection: 'row'}}>
                            <Text
                                style={[{
                                    fontWeight: "400", color: "#A4A4A4", fontSize: 16,
                                    textAlign: "center",
                                    marginTop: 30, paddingStart: 50, paddingEnd: 5
                                }, styles.family]}>
                                didn’t receive code?
                            </Text>
                            <Pressable
                                onPress={() => {
                                    if (reSend === true) {
                                        reSendOtp();

                                    }
                                }}
                            >
                                <Text
                                    style={[{
                                        fontWeight: "400", color: RESEND_COLOR, fontSize: 16,
                                        textAlign: "center",
                                        marginTop: 30, paddingEnd: 50
                                    }, styles.family]}>
                                    Resend
                                </Text>
                            </Pressable>

                        </View>

                        <UberButtonBlack text={"Verify"} onPress={async () => {
                            if (OTP.length === 0) {
                                setError("Please enter your received 4-digit OTP code")
                            } else {

                                let token = props.route.params.token


                                setLoading(true)
                                let data = new FormData()
                                data.append("OTP", OTP)
                                await fetch(ApiUrl.verifyOTP, {
                                    method: "POST",
                                    headers: {
                                        Authorization: "Token " + token,
                                        Accept: "application/json",

                                    },
                                    body: data
                                }).then(response => response.json()
                                ).then(data => {
                                    console.log(data.status);
                                    if (data.status <= 200) {
                                        Session.addEntry(data.data);
                                        clearInterval(interval.current);
                                        props.navigation.navigate("resetPassword")
                                    } else {
                                        setError(data.msg);
                                    }
                                    setLoading(false)

                                }).catch(function (error) {
                                    setLoading(false)

                                    setError("Invalid OTP")
                                })
                            }
                        }} style={{marginTop: 40,}}/>

                    </View>
                    <View style={{flex: 1, width: "100%"}}>
                        {props.children}
                        <LoadingModel modalVisible={isLoadingOpen} setModalVisible={setLoading}/>
                        <ErrorModel errors={ModalErrors} setErrors={setModalErrors}/>
                    </View>
                </ScrollView>

            </View>
        </View>
    )

}