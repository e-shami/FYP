import React, {useContext, useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import KeyIcon from "@mui/icons-material/Key";
import ApiUrls from "../others/Urls";
import LoadingComponent from "./LoadingComponent";
import {NotificationContext} from "../Context/NotificationContext";
import {SessionContext} from "../Context/SessionContext";

function ChangePassword({hidden, sethidden}) {
    const [error, setError] = useState("");
    const [newPass, setNewPass] = useState("");
    const [oldPass, setOldPass] = useState("");
    const [loading, setLoading] = useState(false);
    const noti = useContext(NotificationContext);
    const Session = useContext(SessionContext);
    function UpdatePassword() {
        setError("")
        setLoading(true);
        if (oldPass.length === 0 || newPass.length === 0) {
            setLoading(false);
            setError("Old or new password filed can't be left empty");
            return;
        }
        fetch(ApiUrls.changePassword, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization:"Token "+Session.SessionData.token
            },
            body: JSON.stringify({
                newPass: newPass,
                oldPass: oldPass,
            })
        }).then(res => res.json()).then(data => {
            if (data.status === 200) {
                noti.setData(
                    {
                        ...data,
                        show: true
                    }
                )
                setOldPass("");
                setNewPass("");
                setLoading(false)
                sethidden(true);
            } else {
                if (data.msg) {

                    setError(data.msg);
                }else {
                    setError(data.detail)
                }
                setLoading(false)
            }


        }).catch(err => {

            setLoading(false)
            setError(err.message)
        })
    }

    return (
        <div
            style={{backdropFilter: "blur(2px)", width: "85%", height: "85%"}}
            className={`absolute flex items-center justify-center  bg-white bg-opacity-60 bg-clip-padding z-10 min-w-screen w-screen h-screen   ${
                hidden ? "hidden" : ""
            }`}
        >
            {loading ? <LoadingComponent/> :
                <div
                    className=" w-[45rem] h-[31.315rem] min-w-[45rem] min-h-[31.315rem] max-w-[45rem] max-h-[31.315rem] bg-[white] border-[2px] flex flex-col justify-center items-center z-20 relative">
                    <div
                        className="absolute top-0 right-0 p-4 cursor-pointer"
                        onClick={() => sethidden(true)}
                    >
                        <CloseIcon/>
                    </div>
                    <div className="font-Poppins font-semibold text-[2rem] text-[#2f2f2f] leading-[3rem]">
                        Change Password
                    </div>
                    <div className="relative  ">
          <span>
            <KeyIcon
                className="text-[#2f2f2f] text-2xl flex-1 h-[100%] absolute left-[0.9rem] bottom-[1.5rem] "
                style={{transform: "rotate(-60.21deg)"}}
            />
          </span>
                        <input
                            type="password"
                            value={oldPass}
                            onChange={e => setOldPass(e.target.value.trim())}
                            name=""
                            id="2"
                            placeholder="Enter Old Password"
                            className="bg-[#f4f4f4] w-[23.688rem] h-[4.563rem] rounded-[0.625rem] p-2 mt-[3rem] border-none pl-[2.8rem] flex-[7] outline-none"
                        />
                        <button
                            className="text-[#2f2f2f] text-2xl flex-1 h-[100%] absolute right-[0.9rem] top-[1.2rem]">
                            <VisibilityOffIcon/>
                        </button>
                    </div>
                    <div className="relative ">
          <span>
            <KeyIcon
                className="text-[#2f2f2f] text-2xl flex-1 h-[100%] absolute left-[0.9rem] bottom-[1.5rem] "
                style={{transform: "rotate(-60.21deg)"}}
            />
          </span>
                        <input
                            type="password"
                            name=""
                            id="1"
                            value={newPass}
                            onChange={e => setNewPass(e.target.value.trim())}
                            placeholder="Enter new password"
                            className="bg-[#f4f4f4] w-[23.688rem] h-[4.563rem] rounded-[0.625rem] p-2 mt-[1rem] border-none pl-[2.8rem] flex-[7] outline-none"
                        />
                    </div>
                    <p className={"text-red-500 mt-2"}>{error}</p>
                    <div>
                        <button
                            onClick={() => UpdatePassword()}
                            className="h-[4.5rem] w-[23.688rem] bg-[#2f2f2f] rounded-[0.625rem] text-white mt-[2rem]">
                            Send confirmation email
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

export default ChangePassword;
