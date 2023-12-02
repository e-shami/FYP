import {createContext, useState} from "react";

const PickUpDropOffData = {
    isPickUp: false,
    isDropOff:false,
    PickUpData: {
        Address: "",
        longitude: 0,
        latitude: 0,
    },
    DropOffData: {
        Address: "",
        longitude: 0,
        latitude: 0,
    },
    distance : 0,
    Duration : 0,

}


const PickUpDropOffContext = createContext({
    UpdateData: (data) => {
    },
    PickUpDropOffData: PickUpDropOffData,

});


export default function PickUpDropOffProvider({children}) {
    const [data, setData] = useState(PickUpDropOffData);


    function UpdateData(data) {
        console.log(data)
        var dataCopy = Object.assign({}, data);
        setData(dataCopy);
    }


    var value = {
        UpdateData: UpdateData,
        PickUpDropOffData: data,

    }


    return (
        <PickUpDropOffContext.Provider value={value}>
            {children}
        </PickUpDropOffContext.Provider>

    )

}

export {
    PickUpDropOffContext
}
