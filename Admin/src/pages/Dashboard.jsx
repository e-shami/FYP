import React, {useContext, useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import ProgressCard from "../components/ProgressCard";
import SubcribeCard from "../components/SubcribeCard";
import BarChartComp from "../components/BarChartComp";
import RoundGraph from "../components/RoundGraph";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LoadingComponent from "../components/LoadingComponent";
import ApiUrls from "../others/Urls";
import {SessionContext} from "../Context/SessionContext";

(function () {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    Date.prototype.getMonthName = function () {
        return months[this.getMonth()];
    };
    Date.prototype.getDayName = function () {
        return days[this.getDay()];
    };
    Date.prototype.getGreeting = function () {
        let hour = this.getHours();
        console.log(hour)
        if (hour < 12) return "Morning"
        if (hour <= 17) return "Afternoon"
        if (hour <= 19) return "Evening"
        return "Night"
    };
    Date.prototype.getTimeData = function () {
        let hr = this.getHours();
        let min = this.getMinutes();
        let time = ""
        if (hr <= 12)
            time += hr + ":"
        else
            time += hr - 12 + ":"
        let amPm = hr <= 12 ? "am" : "pm"
        time += min + " " + amPm;
        return time;
    };

})();
const   Dashboard = () => {
    const [showLoading, setShowLoading] = useState(true);
    const [progressCards, setProgressCards] = useState([]);
    const [payments, setPayments] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [dropDown, setDropDown] = useState(false);
    const [dropOption, setDropOptions] = useState(["Monthly", "Yearly"]);
    const [dropSelected, setDropSelected] = useState("Monthly");
    const [donet, setDonet] = useState({
        series: "",
        labels: "",
    });
    const SESSION = useContext(SessionContext);
    const pageNumber = useRef(1);

    function fetchActiveRides() {
        fetch(ApiUrls.fetchActiveRides, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Token " + SESSION.SessionData.token
            },
            body: JSON.stringify({
                page: pageNumber.current,
                count: 3,
                filter: "IP",
            })
        }).then(res => res.json()).then(data => {
            if (data.status === 200) {
                setProgressCards([...data.data])
            }
        }).catch(err => {
            console.log(err)
        })
    }

    function fetchUser() {
        fetch(ApiUrls.getVerfiUser, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Token " + SESSION.SessionData.token
            },
            body: JSON.stringify({
                page: pageNumber.current,
                authStatus: "APPROVED",
                count: 3
            })
        }).then(res => res.json()).then(data => {
            if (data.status === 200) {
                setPayments([...data.data])
            }
        }).catch(err => {
            console.log(err)
        })
    }

    function fetchGraphData() {
        fetch(ApiUrls.getGraphData, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Token " + SESSION.SessionData.token
            },
            body: JSON.stringify({
                type: dropSelected
            })
        }).then(res => res.json()).then(data => {
            if (data.status) {
                setChartData(data.data);
                setDonet(data.do)
            }
        })

    }

    const handleLoaderShowing = () => {
        return showLoading ? <LoadingComponent/> : <><h3>No Data to Show</h3></>

    }

    useEffect(() => {
        
    })

        useEffect(() => {
            fetchGraphData()

        }, [dropSelected])


    useEffect(() => {
        let mount = true;
        if (mount) {
            fetchActiveRides()
            fetchUser()
            fetchGraphData()
        }

        setTimeout(() => {
            setShowLoading(false);
        }, 5000);

        return () => (mount = false);
    }, []);

    const handlePginationBackwards = () => {
        alert("Backwards Will be according to api");
    };

    const handlePginationForward = () => {
        alert("Forward Will be according to api");
    };

    const handleDropDown = () => {
        setDropDown(!dropDown);
    };
    var now = new Date();

    return (
        <div
            className="flex flex-col w-full max-w-full  min-w-full h-screen min-h-full pt-[2.938rem] px-[2.938rem] pb-[2.938rem] overflow-y-auto space-y-10">
            {/* //////////  Date Time Etc Div  ///////////// */}
            <div
                className="flex xs:justify-center md:justify-start font-Poppins font-medium text-[1.25rem] leading-[1.875rem]">
                <p className="pr-[2rem] py-[0.4rem]">{now.getDayName()}</p>
                <p className="px-[2rem] py-[0.4rem] border-x-[1px] border-[#2F2F2F]">
                    {now.getMonthName()} {now.getDate()},{now.getFullYear()}
                </p>
                <p className="px-[2rem] py-[0.4rem]">{now.getTimeData()}</p>
            </div>
            {/* Good Morning Div */}
            <div className="flex flex-col xs:items-center md:items-start justify-center text-[#2F2F2F] ">
                <p className="font-Poppins font-semibold text-[2rem] leading-[3rem]">
                    Good {now.getGreeting()} Admin
                </p>
                <p className="text-[#00000070] font-Poppins font-normal text-[1.25rem] leading-[1.875rem]">
                    Have a look at recent activities, trainings and clients
                </p>
            </div>
            {/* //////////  Progress Card Map Div  ///////////// */}
            <div className="flex flex-col xs:max-w-full xs:w-[90%] xs:self-center md:min-w-full md:max-w-full">
                <div className="flex justify-between items-center mb-[1.938rem]">
                    <p className="font-Poppins font-semibold text-[2rem] leading-[3rem]">
                        Active Orders
                    </p>
                    {/* /////// Link to go to Rides page ///////*/}
                    <Link
                        to={"/Rides"}
                        className="font-normal text-[1rem] leading-[1.5rem] font-Poppins"
                    >
                        Track More Orders
                    </Link>
                </div>
                {/* //////////// Progress cards /////////*/}
                <div
                    className="flex xs:flex-col xs:items-center md:flex-row xs:space-y-7  md:space-y-0 md:space-x-7 overflow-x-auto rounded-[16px]">
                    {progressCards.length === 0 ? handleLoaderShowing() : progressCards.map((item, index) => (
                        // //////Wrapped inside a div for further styling
                        <div key={index} className="xs:w-full md:w-[33.33%] rounded-[16px] ">
                            <ProgressCard
                                id={item.id}
                                done={item.rideStatus}
                                pickup={item.pickUpAddress.description}
                                dropoff={item.dropOffAddress.description}
                            />      
                        </div>
                    ))}
                </div>
                
            </div>

            <div
                className="flex xs:flex-col xs:items-center md:items-stretch md:flex-row min-w-full xs:space-y-10 md:space-y-0 md:space-x-10 max-w-full">
                {/* //////////// Payments Div ///////////*/}
                <div className="flex flex-col space-y-4  xs:max-w-full xs:w-[90%] md:flex-1 md:w-[25%] md:max-w-[25%]">
                    <p className="font-Poppins font-semibold text-[2rem] leading-[3rem]">
                        Payments
                    </p>
                    <div className="flex flex-col  h-[21.438rem] items-center overflow-y-auto">
                        {payments.length === 0 ? handleLoaderShowing() : payments.map((item, index) => (
                            <div className="w-full shadow-[0px_13px_21px_#0000000D]">
                                <SubcribeCard name={item.user.first_name + " " + item.user.last_name}
                                              email={item.user.email} source={ApiUrls.dp + item.dp}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="flex flex-col xs:flex-1 xs:max-w-full xs:w-[90%] md:flex-[3] md:w-[35%] md:max-w-[35%] justify-between">
                    <div
                        onClick={handleDropDown}
                        className="mt-2 relative p-[0.563rem] rounded-[0.313rem] self-end flex items-center justify-between w-[6.625rem] max-w-[6.625rem] min-w-[6.625rem] h-[2rem] max-h-[2rem] min-h-[2rem] bg-[#2F2F2F] font-DMsans font-medium text-[#FFFFFF] leading-[1.038rem] text-[0.938rem] z-[+100] cursor-pointer"
                    >
                        <p>{dropSelected}</p>
                        <ArrowDropDownIcon/>
                        {dropDown && (
                            <div
                                className="absolute top-[100%] left-0 bg-[#2F2F2F] text-[#FFFFF] w-[6.625rem] max-w-[6.625rem] min-w-[6.625rem] z-[+100000000000000000000000000000]">
                                <ul className="z-[+100]">
                                    {dropOption.map((option) => (
                                        <li
                                            className="border-b  border-[#FFFFFF] p-[0.563rem]  "
                                            onClick={() => {
                                                setDropSelected(option);
                                                setDropDown(false);
                                            }}
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    {/* //////////// BarChart Div ///////////*/}
                    <div
                        className="shadow-[0px_30px_18px_-11px_#00000005] py-[20px] px-[20px] rounded-[0.813rem] bg-[#FFF] h-[21.375rem] max-w-full">
                        <BarChartComp data={chartData}/>
                    </div>
                </div>
                <div
                    className="flex flex-col xs:flex-1 xs:max-w-full xs:w-[90%] md:flex-[3] md:w-[35%] md:max-w-[35%] h-full justify-between">
                    <p className="font-Poppins font-semibold text-[2rem] leading-[3rem] ">
                        Statistics
                    </p>
                    {/* //////////// RoundChart Div ///////////*/}

                    <div
                        className="shadow-[0px_30px_18px_-11px_#00000005] py-[20px] px-[20px] rounded-[0.813rem] bg-[#FFF] h-[21.375rem] max-w-full">
                        <RoundGraph labels={donet.labels} series={donet.series}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
