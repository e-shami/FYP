import React, {useContext, useEffect, useState} from 'react'
import Lock from "../SVGs/Lock";
import ApiUrls from "../others/Urls";
import PersonIcon from '@mui/icons-material/Person';
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import {SessionContext} from "../Context/SessionContext";

const SettingListItem = ({iconColor, icon: ICON, text, time}) => {
    return <div className='flex flex-1 flex-row justify-between items-center py-8 border-b border-[#98989847]'>
        <div className='flex flex-row items-center'>
            <div className='max-w-6 w-6 min-w-6'><ICON color={iconColor}/></div>
            <p className='ml-10 font-normal text-lg font-Poppins text-[#232323]'>{text}</p>
        </div>
        <p className='font-DMsans font-normal text-base text-[#23232380]'>{time.split("T")[0]} {time.split("T")[1].slice(0, 5)}</p>

    </div>
}


const Notifications = () => {
    const [noti, setNoti] = useState([]);
    const SESSION = useContext(SessionContext);

    function fetchUser() {
        fetch(ApiUrls.notifications, {
            method: "GET",
            headers: {
                Authorization: "Token " + SESSION.SessionData.token,
            }
        }).then(res => res.json()).then(data => {
            console.log(data.msg)
            setNoti(data.msg)
        })

    }

    useEffect(() => {
        let mount = true;
        if (mount) {
            fetchUser();
            return () => (mount = false);
        }
    }, []);

    function getNoti(item) {
        let o = item.logType;
        let NEW_CLIENT = "NC"
        let PASSWORD_CHANGE = "PC"
        let DP_CHANGE = "DP"
        let OTHER = "OT"
        switch (o) {
            case  NEW_CLIENT:
                return PersonIcon
            case PASSWORD_CHANGE:
                return Lock
            case DP_CHANGE:
                return PictureInPictureIcon
            case OTHER:
                return CircleNotificationsIcon
        }
        return CircleNotificationsIcon
    }

    return (
        <div className="flex flex-1  font-Poppins bg-[#F6F6F6]  max-h-screen min-h-screen overflow-hidden ">
            {/* Main Heading */}
            <div className={" flex-1 p-8 overflow-y-scroll"}>


                <div className='flex-1'><p
                    className='pl-12 font-Poppins font-semibold text-3xl leading-10'>Notifications</p></div>
                {/* Second Heading and Fields Container */}
                <div className='flex flex-1  flex-col mt-12'>
                    {/* Heading div */}
                    <div className='border-b-[1px] border-[#98989847] pl-12 flex-1 pb-6'>
                        <p className='font-Poppins font-medium text-2xl'>Security</p>
                    </div>
                    {/* Items Div */}
                    <div className='flex-1 max-h-full   pl-12'>
                        {noti.length > 0 ? noti.map((item, index) => (
                                <SettingListItem iconColor={"#232323"} icon={getNoti(item)} text={<>{item.log}</>}
                                                        time={item.DateTime}/>
                        )) : <div className='flex flex-1 flex-col justify-center items-center'>
                            <p className='font-Poppins font-medium text-2xl'>No Notifications</p>
                        </div>}


                    </div>

                </div>
            </div>

        </div>
    )
}

export default Notifications