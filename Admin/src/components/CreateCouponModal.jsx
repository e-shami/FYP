import CancelIcon from "@mui/icons-material/Cancel";
import {useContext, useState} from "react";
import LoadingComponent from "./LoadingComponent";
import ApiUrls from "../others/Urls";
import {NotificationContext} from "../Context/NotificationContext";
import {SessionContext} from "../Context/SessionContext";

const InpuputContainer = ({type, max, value, onChange, placeholder, icon: ICON}) => {
    return (
        <div
            className={`flex flex-row flex-1 pr-8 ${
                !ICON && "pl-7"
            } py-6 border border-[#2F2F2F] rounded-lg justify-between items-center font-Poppins font-[400] text-lg leading-7`}
        >
            <input
                type={type}
                value={value}
                max={max}
                min={1}
                onChange={onChange}
                placeholder={placeholder}
                className="outline-none w-[100%] "
            />
            {ICON && <ICON/>}
        </div>
    );
};

const CreateCouponModal = (props) => {
    const [data, setData] = useState({
        Code: "",
        validFrom: "",
        validTill: "",
        discount: null,
        NoOfRides: null,
    })

    function MyNewSetData(entry) {
        var dataCopy = Object.assign({}, data);
        for (const [key, value] of Object.entries(entry)) {
            dataCopy[key] = value;
        }
        setData(dataCopy);
    }

    const [error, setError] = useState("");
    const [loading, ShowLoading] = useState(false);
    let noti = useContext(NotificationContext);
    const  SESSSION  = useContext(SessionContext);
    async function Validate() {
        setError("");
        ShowLoading(true);
        let Errors = "";
        if (data.discount === 0 ||data.discount === null|| data.discount > 100) Errors += "Discount should be in range 0-100\n";
        if (data.Code.length === 0) Errors += "Title can't be empty\n"
        if (data.validTill.length === 0) Errors += "Start date can't be empty\n"
        if (data.validFrom.length === 0) Errors += "End date can't be empty\n"
        if (data.NoOfRides === null) Errors+="No Of rides could not be empty\n"
        if (data.validTill.length !== 0 && data.validFrom.length !== 0) {
            if (new Date(data.validFrom).getTime() > new Date(data.validTill))
                Errors += "Start date must be before end date\n";
        }
        if (Errors.length > 0) {
            setError(Errors);
            ShowLoading(false);
            return;
        }
        if (data.NoOfRides === null)
            MyNewSetData({NoOfRides:0})
        await fetch(ApiUrls.CreateCopen, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization:"Token "+SESSSION.SessionData.token
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(data => {
            if (data.status === 200) {
                noti.setData({
                    status: 200,
                    msg: data.msg,
                    show: true,
                })
                props.handleClick(true);
            } else {
                setError(data.msg);
                ShowLoading(false);
            }
        }).catch(err => {
            console.log(err)
            setError("Network request error occurred ");
            ShowLoading(false);

        })

    }


    return (
        <div className="absolute flex-1 flex items-center justify-center w-full h-full bg-[#00000066] z-[100]">
            {loading ? <LoadingComponent/> :
                <div className="bg-[#fff] rounded-3xl w-[40%]">
                    {/* heading and close button container */}
                    <div
                        className="flex flex-row justify-between items-center py-7 px-8 border-b-[1px] border-[#00000038]">
                        <p className="font-medium font-Poppins text-[1.5rem]">
                            Create Coupon
                        </p>
                        <div onClick={() => props.handleClick()}>
                            <CancelIcon sx={{width: 25, height: 25}}/>
                        </div>
                    </div>
                    {/* Middle container */}

                    <div className="py-7 px-8">
                        <div className="mb-7">
                            <p className="font-Poppins font-[500] text-lg leading-7">
                                Enter Details given below
                            </p>
                        </div>
                        {/* Inputs Container */}
                        <div className="grid grid-cols-2 gap-3 mb-20">
                            <InpuputContainer type={"text"} value={data.Code} onChange={(e) => {
                                MyNewSetData({
                                    Code: e.target.value,
                                })
                            }} placeholder={"Title"}/>
                            <InpuputContainer type={"Number"} value={data.discount} onChange={(e) => {
                                MyNewSetData({
                                    discount: e.target.value,
                                })
                            }} placeholder={"Percentage off"}/>
                            <InpuputContainer type={"date"} value={data.validFrom} onChange={(e) => {
                                MyNewSetData({
                                    validFrom: e.target.value,
                                })
                            }} placeholder={"Start Date"}/>
                            <InpuputContainer type={"date"} value={data.validTill} onChange={(e) => {
                                MyNewSetData({
                                    validTill: e.target.value,
                                })
                            }} placeholder={"End Date"}/>
                            <InpuputContainer type={"Number"} max={100} value={data.NoOfRides} onChange={(e) => {
                                MyNewSetData({
                                    NoOfRides: e.target.value,
                                })
                            }} placeholder={"No of rides"}/>
                        </div>
                        <div>
                            {error}
                        </div>
                        {/* Button Container */}
                        <div className="flex justify-center mb-8">
                            <button
                                onClick={() => Validate()}

                                className="bg-[#161616] text-[#fff] px-12 py-5 rounded-md">
                                Create
                            </button>
                        </div>
                    </div>
                </div>}
        </div>
    );
};

export default CreateCouponModal;
