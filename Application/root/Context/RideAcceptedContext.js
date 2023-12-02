import {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultData = {
    initalScreen: "Map2",
    rideStatus: undefined
}
const RideAcceptedContext = createContext({
    setData: () => {
    },
    RideData: null,
    ClearData: () => {
    },
});


export default function RideAcceptedProvider({children}) {
    const [RideData, setData] = useState(defaultData);
    function setData2(data) {
        let dataCopy = Object.assign({}, data);
        dataCopy = {
            ...dataCopy,
            initalScreen: "RideBottomSheet"
        }
        setData(dataCopy);
    }
    function ClearData() {
        setData(defaultData);

    }

    var value = {
        setData: setData2,
        RideData: RideData,
        ClearData: ClearData,
    }


    return (
        <RideAcceptedContext.Provider value={value}>
            {children}
        </RideAcceptedContext.Provider>

    )

}

export {
    RideAcceptedContext,
}
