import {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SessionData = new Object({
    id:-1,
    name: "",
    dp: "",
    Token: "",
})


const SessionContext = createContext({
    setUserData: () => {
    },
    SessionData: SessionData,
    addEntry: () => {
    },
    ClearSession: () => {
    },
});


export default function SessionProvider({children}) {
    const [session, setSession] = useState(SessionData);

    function setSession2(data) {

        var dataCopy = Object.assign({}, data);
        setSession(dataCopy);
        storeData(dataCopy).then(r => {

        })
    }

    function addEntry(values) {

        var dataCopy = Object.assign({}, session);
        console.log("SESSION STORE",values)
        for (const [key, value] of Object.entries(values)) {
            dataCopy[key] = value;
        }
        setSession(dataCopy);

        storeData(dataCopy).then(r =>{
        } )


    }

    const storeData = async (data) => {
        try {

            await AsyncStorage.setItem('sessionData',JSON.stringify(data))


        } catch (e) {
            console.log("Couldn't save User Data")
        }
    }
    function ClearSession() {

        storeData(SessionData).then(r =>{
            setSession(SessionData);
        } )
    }

    var value = {
        setUserData: setSession2,
        SessionData: session,
        addEntry: addEntry,
        ClearSession: ClearSession,
    }


    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>

    )

}

export {
    SessionContext,
    SessionData,
}
