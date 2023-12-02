import {Avatar} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import React, {useContext, useState} from "react";
import Documents from "./Documents";
import SupportIcon from "@mui/icons-material/Support";
import Car from "../SVGs/Car";
import Steering_wheel from "../SVGs/Steering_wheel";
import CarPlate from "../SVGs/CarPlate";
import Idcardfilled from "../SVGs/Idcardfilled";
import TransLoading from "./TransLoading";
import {NotificationContext} from "../Context/NotificationContext";
import ApiUrls from "../others/Urls";
import {SessionContext} from "../Context/SessionContext";

function VerificationCard({
                              source,
                              name,
                              email,
                              username,
                              ph,
                              location,
                              Cnic,
                              Cnic2,
                              date,
                              item,
                              removeItem,
                          }) {
    let data = useContext(NotificationContext);
    const SESSION = useContext(SessionContext);

    const [isLoading, setLoading] = useState(false);
    if (item === undefined)
        return <></>

    async  function  Approve(action){
        setLoading(true);
        await fetch(ApiUrls.ApproveDriver,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Token " + SESSION.SessionData.token
            },
            body: JSON.stringify({
                status: action,
                id: item.driver_id.id,
            })
        }).then(res=>res.json()).then(data2=>{
                data.setData({
                    ...data2,
                    show:true,
                })
        }).catch(err=>{
            console.error(err)
            data.setData({
                status:300,
                msg:"An network request error occurred",
                show:true,
            })
        })
        removeItem(item);
        setLoading(false);
    }
    return (
        <div className={" overflow-y-auto "}>
            {isLoading ? <TransLoading/> : null}
            <div style={isLoading ? {position: "relative"} : null}
                 className="min-h-full  max-h-full overflow-y-auto w-full">
                <div className={` mt-[1rem] pl-6 pr-7 flex flex-row w-[100%] font-Poppins ${isLoading && "blur-sm"}`}>
                    {/* main credentials div */}
                    <div
                        className="w-[13.25rem] max-w-[13.25rem] h-[13.1rem] max-h-[13.1rem] min-w-[13.25rem] min-h-[13.1rem] bg-[#181818] rounded-[0.75rem] ">
                        <Avatar
                            sx={{width: "100%", height: "100%", borderRadius: "0.625rem"}}
                            src={source}
                            variant="square"
                        />
                    </div>

                    <div className="w-full mt-4 font-Poppins ">
                        {/* Name and Date */}
                        <div className=" pl-3 flex flex-row justify-between  w-[33rem] h-[3rem] ">
                            <p className="leading-[3rem] text-[2rem] text-[#2f2f2f] font-medium font-Poppins ">
                                {name}
                            </p>
                            <p className="text-[1rem] font-normal leading-6 self-end mb-[6px] text-[#2f2f2f56] font-Poppins">
                                {date}
                            </p>
                        </div>
                        {/* below contains both coloumns */}
                        <div className="flex">
                            <div className="flex flex-col mt-7">
                                <div className="flex pl-3 ">
                                    <Avatar
                                        variant="circle"
                                        sx={{width: "1.6rem", height: "1.6rem"}}
                                    />
                                    <p className="ml-2 text-[1.12rem] text-[#2f2f2f84] font-normal font-Poppins">
                                        {username}
                                    </p>
                                </div>
                                <div className="flex pl-3 mt-4">
                                    <EmailIcon/>
                                    <p className="ml-2 text-[1.12rem] text-[#2f2f2f84] font-normal font-Poppins">
                                        {email}
                                    </p>
                                </div>
                                <div className="flex pl-3 mt-4">
                                    <Idcardfilled/>
                                    <p className="ml-2 text-[1.12rem] text-[#2f2f2f84] font-normal font-Poppins">
                                        {Cnic}
                                    </p>
                                </div>
                            </div>
                            {/* Coloumn 2 starts here */}
                            <div className="flex flex-col mt-7  ml-[6rem]">
                                <div className="flex pl-3 ">
                                    <PhoneIcon/>
                                    <p className="ml-2 text-[1.12rem] text-[#2f2f2f84] font-normal font-Poppins">
                                        {ph}
                                    </p>
                                </div>
                                <div className="flex pl-3 mt-4">
                                    <LocationCityIcon/>
                                    <p className="ml-2 text-[1.12rem] text-[#2f2f2f84] font-normal font-Poppins">
                                        {location}
                                    </p>
                                </div>
                                <div className="flex pl-3 mt-4">
                                    <Idcardfilled/>
                                    <p className="ml-2 text-[1.12rem] text-[#2f2f2f84] font-normal font-Poppins">
                                        {Cnic2}
                                    </p>
                                </div>
                            </div>
                            {/* coloumn 2 ends here */}
                        </div>
                        {/* both coloumns end here */}
                    </div>
                </div>
                <p className="font-Poppins leading-10 text-[2rem] font-semibold mt-[2.2rem] pl-6 ">
                    Documents
                </p>
                <div className="flex flex-col  ">
                    <div className="flex flex-row pl-6 mt-5">
                        <div>
                            <Documents url={item.driver_id.driverLicenseImg} fileName={"Driver License.png"}
                                       sizeinMb={"54"}/>
                        </div>
                        <div className="ml-6">
                            <Documents url={item.driver_id.vehicle.vehicleImg} fileName={"Vehicle Image.png"}
                                       sizeinMb={"100"}/>
                        </div>
                    </div>
                    <div className="flex flex-row pl-6 mt-5">
                        <div>
                            <Documents url={item.driver_id.vehicle.vehicleRegistrationFile}
                                       fileName={"vehicle Registration.png"} sizeinMb={"54"}/>
                        </div>
                        <div className="ml-6">
                            {/*<Documents fileName={"abdullah.png"} sizeinMb={"100"}/>*/}
                        </div>
                    </div>
                </div>
                <p className="font-Poppins leading-10 text-[2rem] font-semibold mt-[2.2rem] pl-6 ">
                    Vehicle Details
                </p>
                <div className="flex flex-row  w-[27rem] justify-between ">
                    {/* car company and color */}
                    <div className="flex flex-col pl-6 mt-5 justify-between h-[8.5rem]">
                        <div className="flex flex-row">
                            <div
                                className="w-[2.9rem] h-[2.9rem] rounded-[0.625rem] bg-[#d9d9d980] flex items-center justify-center ">
                                <Car/>
                            </div>
                            <p className="my-auto ml-3 text-[1.2rem] leading-7 font-Poppins font-normal text-[#161616]">
                                {item.driver_id.vehicle.company}
                            </p>
                        </div>
                        <div className="flex flex-row">
                            <div
                                className="w-[2.9rem] h-[2.9rem] rounded-[0.625rem] bg-[#d9d9d980] flex items-center justify-center ">
                                <Steering_wheel/>
                            </div>
                            <p className="my-auto ml-3 text-[1.2rem] leading-7 font-Poppins font-normal text-[#161616]">
                                Model {item.driver_id.vehicle.model}
                            </p>
                        </div>
                    </div>
                    {/* Model and Reg# */}
                    <div className="flex flex-col pl-6 mt-5 justify-between items-stretch  h-[8.5rem]  ">
                        <div className="flex flex-row">
                            <div
                                className="w-[2.9rem] h-[2.9rem] rounded-[0.625rem] bg-[#d9d9d980] flex items-center justify-center ">
                                <SupportIcon/>
                            </div>
                            <p className="my-auto ml-3 text-[1.2rem] leading-7 font-Poppins font-normal text-[#161616]">
                                White
                            </p>
                        </div>
                        <div className="flex flex-row">
                            <div
                                className="w-[2.9rem] h-[2.9rem] rounded-[0.625rem] bg-[#d9d9d980] flex items-center justify-center ">
                                <CarPlate/>
                            </div>
                            <p className="my-auto ml-3 text-[1.2rem] leading-7 font-Poppins font-normal text-[#161616]">
                                {item.driver_id.vehicle.numberPlate}
                            </p>
                        </div>
                    </div>
                </div>
                {/* button div */}
                <div className="flex flex-row mt-5 pl-6">
                    <button
                        onClick={async ()=>{
                            await  Approve("DECLINED");
                        }}

                        className="w-[12.4rem] h-[2.9rem] font-Poppins bg-[#dcdcdc] text-white text-[1.1rem] font-normal rounded-[0.52rem]  ">
                        Decline
                    </button>
                    <button
                        onClick={async ()=>{
                          await  Approve("APPROVED");
                        }}
                        className="w-[12.4rem] h-[2.9rem] font-Poppins bg-[#2f2f2f] text-white text-[1.1rem] font-normal rounded-[0.52rem] ml-4">
                        Approve
                    </button>
                </div>

                <div className="mt-[15rem]"></div>
            </div>

        </div>
    );
}

export default VerificationCard;
