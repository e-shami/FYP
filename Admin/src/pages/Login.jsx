import React, {useContext} from "react";
import HandWave from "../SVGs/HandWave";
import Email from "../SVGs/Email";

import Password from "../SVGs/Password";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import logo from "../assest/logo.png"
import LoadingComponent from "../components/LoadingComponent";
import ApiUrls from "../others/Urls";
import StoreSessionData from "../others/SessionStorage";
import {SessionContext} from "../Context/SessionContext";

function Login() {
    const [credentials, setcredentials] = React.useState({name: "", pass: ""});
    const [showPass, setShowPass] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("")
    const SESSION = useContext(SessionContext);

    function Login() {
        setError("");
        if (credentials.name.length === 0 || credentials.pass.length === 0) {
            setError("username or password can't be left empty");
            return;
        }
        setLoading(true);
        fetch(ApiUrls.logIn, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials),
        }).then(res => res.json()).then(data => {
            if (data.status === 200) {
                setLoading(false);
                StoreSessionData(data.data);
                let lo = window.location + ""
                lo = lo.split("/")
                if (lo.length > 0) {
                    lo = lo[lo.length - 1]
                    if (lo === "SignOut" || lo === "login")
                        window.location.replace('/Dashboard');
                }
                SESSION.setUserData(data.data);

            } else {
                setError(data.msg)
                setLoading(false)
            }

        }).catch(net => {
            console.log(net)
            setError("An network error occurred")
            setLoading(false);
        })


    }


    if (loading) {
        return <LoadingComponent/>
    }


    return (
        <div className="flex flex-1  w-full h-screen justify-center items-center  ">
            <div className="flex flex-1 flex-col items-center   rounded-lg p-5 w-[60%]   ">
                <img
                    src={logo}
                    style={{width: 290}}
                    className=" h-auto "/>
                <div className="flex flex-row justify-center  mt-8 ml-[59px] ">
                    <text className="text-4xl font-Poppins font-bold text-[#2f2f2f] text-center my-auto mr-6  ">
                        Welcome Back Admin !
                    </text>
                    <HandWave/>
                </div>
                <div className="flex flex-row justify-center items-center mt-0 mb-8 ">
                    <text
                        className="text-[1.2rem] font-Poppins font-normal leading-[27px] text-[#2f2f2f] text-center  ">
                        Login to continue with activities
                    </text>
                </div>
                <div className="w-[27%] xs:min-w-[70%] md:min-w-[27%] ">
                    <div className="relative  flex mt-4 min-w-[12.5rem] w-full justify-center  self-center ">
            <span className="text-[#2f2f2f] text-4xl  absolute left-[0.9rem] bottom-[1.95rem] ">
              <Email/>
            </span>
                        <input
                            type="text"
                            value={credentials.name}
                            onChange={(e) => {
                                setcredentials({
                                    name: e.target.value,
                                    pass: credentials.pass,
                                })
                            }}
                            name=""
                            placeholder="Your Mail?"
                            className="bg-[#ffffff] min-h-[5.6rem] min-w-[12.5rem] w-full p-2 mt-[1rem]  pl-[4.8rem] flex-[7] border-2 border-[#2f2f2f] text-[1.2rem] font-Poppins font-normal rounded-[8px]"
                        />
                    </div>

                    <div className="relative  flex mt-4 min-w-[12.5rem] w-full justify-center  self-center ">
            <span className="text-[#2f2f2f] text-4xl  absolute left-[0.9rem] bottom-[1.58rem] ">
              <Password/>
            </span>
                        <span onClick={() => setShowPass(!showPass)}
                              className="text-[#2f2f2f] text-4xl  absolute right-[0.9rem] bottom-[1.98rem] ">
                   {showPass ? <VisibilityIcon/> :
                       <VisibilityOffIcon/>

                   }
            </span>
                        <input
                            type={showPass ? "text" : "password"}
                            name=""
                            value={credentials.pass}
                            onChange={(e) => {
                                setcredentials({
                                    pass: e.target.value,
                                    name: credentials.name,
                                })
                            }} placeholder="Your Passcode?"
                            className="bg-[#ffffff] min-h-[5.6rem] min-w-[12.5rem] w-full p-2 mt-[1rem]  pl-[4.8rem] flex-[7] border-2 border-[#2f2f2f] text-[1.2rem] font-Poppins font-normal rounded-[8px]"
                        />
                    </div>
                    <p className={"text-red-500 mt-2"}>{error}</p>
                    <text onClick={()=>{
                        window.location.replace(ApiUrls.ForgetPassword);
                    }} className="w-full mt-4  cursor-pointer font-semibold flex justify-end ">Forget Password?
                    </text>
                </div>
                <div className="w-[27%] xs:min-w-[70%] md:min-w-[27%] ">
                    <input
                        type="button"
                        value="Login"
                        onClick={() => Login()}
                        className="btn mt-[3rem] bg-[#2f2f2f] min-w-[12.5rem] w-full min-h-[5.6rem] rounded-[8px] text-white font-normal font-Poppins text-[18px]  hover:scale-[1.02]"
                    />
                    {/*<input*/}
                    {/*  type="button"*/}
                    {/*  value="Register"*/}
                    {/*  className="btn mt-7 bg-[white] min-w-[12.5rem] w-full min-h-[5.6rem] rounded-[8px] text-[#2f2f2f] border-2 border-[#2f2f2f] font-normal font-Poppins text-[18px]  hover:scale-[1.02]"*/}
                    {/*/>*/}
                </div>
                {/*<div className="flex flex-row justify-center items-center mt-4  ">*/}
                {/*  <text className="text-[1.2rem] font-Poppins font-normal leading-[27px] text-[#2f2f2f] text-center  ">*/}
                {/*    Don't have an account?{" "}*/}
                {/*    <span className="font-semibold">tap on register</span>*/}
                {/*  </text>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

export default Login;
