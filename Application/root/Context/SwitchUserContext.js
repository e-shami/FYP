import {createContext, useEffect, useState} from "react";
import * as SecureStore from 'expo-secure-store';
import * as Updates from 'expo-updates';

import AsyncStorage from "@react-native-async-storage/async-storage";
import {SessionData} from "./SessionContext";


const SwitchUserDefaultData = {

    isUserDriver: false,

}


const SwitchUserContext = createContext({
    setUserData: () => {

    },
    SwitchUserDefaultData: SwitchUserDefaultData,

});


export default function SwitchUserContextProvider({children}) {
    const [user, setUser] = useState(SwitchUserDefaultData);
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('userData')
            if(value !== null) {
                let val = JSON.parse(value);
                setUser(val)

            }
        } catch(e) {
            console.log("Couldn't get User Data")
        }
    }
    useEffect(()=>{

        getData().then(r => ()=>{
            console.log("Got User Data")
        })
    },[])
    const storeData = async (data) => {
        try {
            await AsyncStorage.setItem('userData',JSON.stringify(data));
        } catch (e) {
            console.log("Couldn't save User Data")
        }
    }
    function setData(data) {
        setUser(data);
        console.log(data.isUserDriver)
        storeData(data).then(()=>{
            Updates.reloadAsync()

        })
    }

    let value = {
        setUserData: setData,
        SwitchUserDefaultData: user,
    }
    return (
        <SwitchUserContext.Provider value={value}>
            {children}
        </SwitchUserContext.Provider>
    )

}

export {
    SwitchUserContext
}