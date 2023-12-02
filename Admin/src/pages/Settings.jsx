import React, {useContext} from "react";
import ChangePassword from "../components/ChangePassword";
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import ApiUrls from "../others/Urls";
import {NotificationContext} from "../Context/NotificationContext";
import {SessionContext} from "../Context/SessionContext";
import MySwitch from "../components/Switch";


function SettingPage(props) {
    const [hidden, sethidden] = React.useState(true);
    const noti = useContext(NotificationContext);
    const session = useContext(SessionContext);

    function uploadDp(file) {
        if (file === null)
            return
        let form = new FormData();
        form.append("dp", file)
        fetch(ApiUrls.changeDp, {
            method: "POST",
            headers: {
                Authorization: "Token " + session.SessionData.token
            },

            body: form
        }).then(res => res.json()).then(data => {
            console.log(data)
            if (data.status === 200) {
                noti.setData(
                    {
                        ...data,
                        show: true
                    }
                )
                session.addEntry({dp: data.url});
            } else {
                noti.setData(
                    {
                        ...data,
                        show: true
                    }
                )
            }

        }).catch(err => {
            console.log(err)
            noti.setData(
                {
                    status: 400,
                    msg: "An Network Error occurred while updating dp ",
                    show: true
                }
            )
        })
    }

    return (
        <div className={`p-20`}>
            <ChangePassword hidden={hidden} sethidden={sethidden}/>
            <p className={`p-4  text-2xl font-semibold `}>
                Settings
            </p>
            <p className={`p-8  text-xl font-semibold `}>
                Security
            </p>
            <div className={`bg-gray-200 w-full mx-2 `} style={{height: 1}}></div>
            <div onClick={() => sethidden(false)}
                 className={`flex cursor-pointer justify-center p-2 px-8 items-center  flex-row`}>
                <p className={`p-8 flex-1  text-xl font-normal  `} style={{color: "#989898"}}>Change Password</p>
                <LockIcon/>
            </div>
            <p className={`p-8  text-xl font-semibold `}>
                General
            </p>
            <div className={`bg-gray-200 w-full mx-2 `} style={{height: 1}}></div>
            <div className={`flex cursor-pointer justify-center p-2 px-8 items-center  flex-row`}>
                <p className={`p-8 flex-1  text-xl font-normal  `} style={{color: "#989898"}}>Notifications</p>
                <MySwitch isEnable={session.SessionData.isNotification} setIsEnable={() => {
                    let no = session.SessionData.isNotification ? 0 : 1;
                    fetch(ApiUrls.notifcationOn + "/" + no, {
                        method: "GET",
                        headers: {
                            Authorization: "Token " + session.SessionData.token,
                        }
                    }).then(res => res.json()).then(e => {
                            let no2 = !session.SessionData.isNotification;
                            if (e.status === 200) {
                                session.addEntry({isNotification: no2})
                                noti.setData({
                                    ...e,
                                    show: true,
                                })

                            }

                        }
                    )

                }}/>
            </div>
            <div className={`bg-gray-200 w-full mx-2 `} style={{height: 1}}></div>
            <div className={`flex cursor-pointer justify-center p-2 px-8 items-center  flex-row`}>
                <input
                    onChange={(e) => {
                        uploadDp(e.target.files[0]);
                    }}
                    type={"file"} accept="image/*" hidden={true} id={"ok"}/>
                <label htmlFor="ok" className={`p-8 flex-1  cursor-pointer text-xl font-normal  `}
                       style={{color: "#989898"}}>Change Profile Picture</label>
                <EditIcon/>
            </div>
        </div>
    )
}


const Settings = () => {
    return <SettingPage/>;
};

export default Settings;
