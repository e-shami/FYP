import {createContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NotificationData = new Object({
    Setting:true,
    Token: "",
})


const NotificationContext = createContext({
    setNotificationData: () => {
    },
    NotificationData: NotificationData,
    addEntry: () => {
    },
    clearNotificationContext: () => {
    },
});


export default function NotificationProvider({children}) {
    const [notifications, setNotifications] = useState(NotificationData);

    function setNotification2(data) {

        var dataCopy = Object.assign({}, data);
        setNotifications(dataCopy);
        console.log(dataCopy)
        storeData(dataCopy).then(r => {

        })
    }

    function addEntry(values) {

        let dataCopy = Object.assign({}, notifications);
        for (const [key, value] of Object.entries(values)) {
            dataCopy[key] = value;
        }
        setNotifications(dataCopy);

        storeData(dataCopy).then(r =>{
        } )


    }

    const storeData = async (data) => {
        try {

            await AsyncStorage.setItem('notificationData',JSON.stringify(data))


        } catch (e) {
            console.log("Couldn't save Notification Data")
        }
    }
    function clearNotificationContext() {

        storeData(NotificationData).then(r =>{
            setNotifications(NotificationData);
        } )
    }

    var value = {
        setNotificationData: setNotification2,
        NotificationData: notifications,
        addEntry: addEntry,
        clearNotificationContext: clearNotificationContext,
    }


    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>

    )

}

export {
    NotificationContext,
    NotificationData,
}
