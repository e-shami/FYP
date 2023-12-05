import React, {useContext, useEffect, useRef, useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Chats from "./pages/Chats";
import Rides from "./pages/Rides";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Coupons from "./pages/Coupons";
import SignOut from "./pages/SignOut";
import Login from "./pages/Login";
import Verifications from "./pages/Verifications";
import MenuIcon from "@mui/icons-material/Menu";
import "./main.css";
import Notifications from "./pages/Notifications";
import NotificationProvider, {NotificationContext} from "./Context/NotificationContext";
// import dotenv from 'dotenv';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import SessionProvider, {SessionContext, SessionData} from "./Context/SessionContext";
import LoadingComponent from "./components/LoadingComponent";
import {getSessionData} from "./others/SessionStorage";

// dotenv.config();

function NotificationBox() {
    const data = useContext(NotificationContext);
    const status = data.data.status <= 200;
    const msg = data.data.msg;
    const show = data.data.show;

    return (
        <div style={{width: "99%"}}
             className={`${!show && "hidden"} anim bg-white flex-row flex m-4 drop-shadow-lg rounded-lg h-24`}>
            <div
                className={` ${status && "bg-green-500"} ${!status && "bg-red-500"} justify-center flex    w-20 rounded-l-lg `}>
                {status ? <CheckCircleIcon style={{color: "white", width: 30, height: 30, margin: "auto"}}/>
                    : <NewReleasesIcon style={{color: "white", width: 30, height: 30, margin: "auto"}}/>}
            </div>
            <div className={"flex flex-col mt-2 px-8 py-2 "}>
                <p className={`font-bold text-xl ${status && "text-green-700"} ${!status && "text-red-700"} `}>
                    {status ? "Success" : "Error"}
                </p>
                <p className={"text-lg font-normal mt-1 text-xl text-gray-700 "}>
                    {msg}
                </p>
            </div>
        </div>

    )
}

function MainApp() {
    const session = useContext(SessionContext);

    const [visible, setVisible] = useState(false);
    const authenticated = session.SessionData.token.length !== 0;
    const FIRST = useRef(true)
    useEffect(() => {
        if (FIRST) {
            FIRST.current = false;
            let data = getSessionData();

            if (data === null)
                session.setUserData(SessionData);
            else
                session.setUserData(data);
        }

    }, [])

    const handleVisible = () => {
        setVisible(!visible);
    };

    if (FIRST.current)
        return <LoadingComponent/>

    return authenticated ? (
        <NotificationProvider>
            <div
                className="flex min-w-screen max-w-screen w-screen min-h-screen overflow-x-hidden overflow-y-auto max-h-screen font-Poppins">
                {/* <div className=""> */}
                <SideBar visible={visible} handleVisible={handleVisible}/>
                {/* </div> */}
                <div className="bg-[#F6F6F6] flex-1  min-h-screen">
                    <div
                        onClick={() => setVisible(true)}
                        className={` ${
                            !visible ? "sm:absolute" : "sm:hidden"
                        } lg:hidden top-14 left-3`}
                    >
                        <MenuIcon/>
                    </div>
                    <NotificationBox/>
                    <Routes>
                        <Route path="/" element={<Navigate to="/Dashboard"/>}/>
                        <Route path="/Dashboard" element={<Dashboard/>}/>
                        <Route path="/Clients" element={<Clients/>}/>
                        <Route path="/Chats" element={<Chats/>}/>
                        <Route path="/Rides" element={<Rides/>}/>
                        <Route path="/History" element={<History/>}/>
                        <Route path="/Settings" element={<Settings/>}/>
                        <Route path="/Coupons" element={<Coupons/>}/>
                        <Route path="/Notifications" element={<Notifications/>}/>
                        <Route path="/Signout" element={<SignOut/>}/>
                        <Route path="/Verifications" element={<Verifications/>}/>   
                    </Routes>
                </div>
            </div>
        </NotificationProvider>
    ) : (
        <div className={"w-full h-full"}>
            <Login/>
        </div>
    );
}


function App() {

    return <SessionProvider>
        <MainApp/>
    </SessionProvider>


}

export default App;
