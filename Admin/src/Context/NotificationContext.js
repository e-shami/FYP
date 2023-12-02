import {createContext, useState} from "react";

const dataC = {
    status:200,
    msg:"",
    show:false,
}


const NotificationContext = createContext({
    setData: () => {
    },
    data: dataC,
    showError:(msg)=>{}

});


export default function NotificationProvider({children}) {
    const [data, setData] = useState(dataC);


    function setData2(data) {
        setData({...data});
        setTimeout(() => setData(dataC), 4000);
    }


    function  showError(msg){
        setData2({
            msg:msg,
            status:300,
            show:true,
        })
    }

    var value = {
        data: data,
        setData: setData2,
        showError:showError,
    }


    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>

    )

}

export {
    NotificationContext,

}
