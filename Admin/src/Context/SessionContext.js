import {createContext, useState} from "react";
import StoreSessionData from "../others/SessionStorage";

const SessionData = new Object({
    email: "",
    name: "",
    dp: "",
    token: "",
    isNotification:true,
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
        let dataCopy = Object.assign({}, data);
        setSession(dataCopy);
        StoreSessionData(dataCopy);
    }

    function addEntry(values) {
        let dataCopy = Object.assign({}, session);
        for (const [key, value] of Object.entries(values)) {
            dataCopy[key] = value;
        }
        setSession(dataCopy);
        StoreSessionData(dataCopy);

    }


    var value = {
        setUserData: setSession2,
        SessionData: session,
        addEntry:addEntry,
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
