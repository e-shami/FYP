import React, {useContext, useEffect, useRef, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ProgressCard from "../components/ProgressCard";
import Tabs from "../components/Tabs";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "../components/Scrollbar.css";
import Maps from "../components/Maps";
import ApiUrls from "../others/Urls";
import LoadingComponent from "../components/LoadingComponent";
import Chats from "./Chats";
import "./anim.css"
import {SessionContext} from "../Context/SessionContext";

const Rides = () => {
    const [progressCards, setProgressCards] = useState([]);
    const [hidden, sethidden] = useState(true);
    const [show, setShow] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [route, setRoute] = useState({
        start: {lat: 0, lng: 0},
        end: {lat: 0, lng: 0},
    });
    const [move, setMove] = useState({lat: 49, lng: -70});
    const [showChat, setShowChat] = useState(false);
    const pageNumber = useRef(1);
    const [noData, setNoData] = useState("")
    const seletectedDrop = useRef("All");
    const selectedIndex = useRef(-1)
    const [query,setQuery] = useState("");
    const SESSION = useContext(SessionContext);

    function reset() {
        selectedIndex.current=-1;
        setSelectedId(null);
        setProgressCards([]);
        setNoData("");
        sethidden(true);
        setShow(false);
        setRoute({
            start: {lat: 0, lng: 0},
            end: {lat: 0, lng: 0},
        })
        setShowChat(false);
        pageNumber.current = 1;


    }
    function fetchActiveRides(selected) {

        reset();
        seletectedDrop.current = selected;
        fetch(ApiUrls.fetchActiveRides, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Token " + SESSION.SessionData.token
            },
            body: JSON.stringify({
                page: pageNumber.current,
                count: 10,
                filter: seletectedDrop.current,
                query:query,
            })
        }).then(res => res.json()).then(data => {
            if (data.status === 200) {
                console.log(data.data)
                setProgressCards([...data.data])
                selectedIndex.current = -1;
                if (data.data.length === 0) {
                    setNoData("No Data Found");
                }
                console.log(data)
            }
        }).catch(err => {
            console.log(err)
        })
    }


    useEffect(() => {
        let mount = true;
        if (mount) {
            fetchActiveRides("All");
            return () => (mount = false);
        }
    }, []);
    const handleClicked = (id, index) => {
        setSelectedId(id);
        selectedIndex.current = index;
        setRoute({
            start: {
                lat: progressCards[index].pickUpAddress.latitude,
                lng: progressCards[index].pickUpAddress.longitude
            },
            end: {
                lat: progressCards[index].dropOffAddress.latitude,
                lng: progressCards[index].dropOffAddress.longitude
            },
        })
        setShow(true);
        setShowChat(false);
    };

    const handleClose = () => {
        setSelectedId(null);
        setShow(false);
    };


    return (
        <div className="flex  flex-1">
            {/* left one */}
            <div
                className={`flex flex-col bg-[#f6f6f6f] min-w-[30%] w-[30%] max-h-screen px-[1rem] pt-[1rem] xs:w-full xs:${
                    !show ? "flex" : "hidden"
                } md:flex md:w-[30%]  `}
            >
                <p className="text-[2rem] text-[#2f2f2f] font-Poppins leading-[3rem] font-semibold">
                    All Rides
                </p>
                <div
                    className="flex items-center pl-4 rounded-[0.625rem] bg-[#ffffff]  flex-row mb-4  w-full min-w-[250px] ">

                    <SearchIcon className="text-[#2f2f2f] text-3xl   left-[0.9rem] bottom-[1.29rem] "/>
                    <input
                        type={query}
                        onChange={event => {
                            setQuery(event.target.value);
                        }}
                        onKeyDown={(e)=>{
                            if (e.key === "Enter")
                            fetchActiveRides(seletectedDrop.current);
                        }}
                        name=""
                        id=""
                        placeholder="Search City, Area"
                        className=" w-full h-[4rem] p-2  border-none pl-[2.8rem] flex-[7] outline-none"
                    />

                    <select

                        onChange={(event) => {
                            fetchActiveRides(event.target.value);
                        }}
                        name="RideStatus" className={"bg-black  text-white text-center h-full rounded-r-[0.625rem]"}
                        id="cars">
                        <option defaultChecked={true} value="all">All</option>
                        <option value="CMP">Completed</option>
                        <option value="IP">In Progress</option>
                        <option value="CN_DR">Canceled</option>
                    </select>

                </div>
                <div className="overflow-y-auto pr-4 min-w-[250px] pb-5">
                    {progressCards.length === 0 && noData.length === 0 ?
                        <LoadingComponent/> : progressCards.length === 0 ?
                            <p className="text-[2rem] text-[#2f2f2f] text-center	 font-Poppins leading-[3rem] font-semibold">{noData}</p>


                            : progressCards.map((item, index) => {
                                return (
                                    <div className="mt-4">
                                        <ProgressCard
                                            id={item.id}
                                            groupid={item.groupId}
                                            index={index}
                                            done={item.rideStatus}
                                            pickup={item.pickUpAddress.description}
                                            dropoff={item.dropOffAddress.description}
                                            touchable={true}
                                            handleClicked={handleClicked}
                                            show={selectedId === item.id ? true : false}
                                        />
                                    </div>
                                );
                            })}
                </div>
            </div>
            {/* Right one  */}
            <div
                className={`relative xs:${
                    show ? "flex" : "hidden"
                } md:flex flex-col w-full h-screen flex `}
            >
                {showChat ? <Chats setChat={setShowChat} id={selectedId}/> : <Maps ride route={route} move={move}/>}
                {selectedId !== null && showChat === false ? <div onClick={() => {
                        setShowChat(true)
                    }}
                                                                  className="bg-[#0066FF] rounded-[10px] font-Poppins font-medium text-[0.875rem] leading-[21px] text-[#FFFFFF] px-10 py-4 absolute bottom-16 left-10 cursor-pointer">Show
                        Chat
                    </div>

                    : null}
                <div
                    className={`absolute top-10 self-center  md:${
                        hidden ? "hidden" : ""
                    } flex flex-col `}
                >
                    <div onClick={handleClose} className="md:hidden mr-3">
                        <ArrowBackIosIcon/>
                    </div>
                    <Tabs

                        RiderImgSrc={
                            selectedIndex.current !== -1 ? ApiUrls.dp + progressCards[selectedIndex.current].rider.dp : ""
                        }
                        RiderCity={selectedIndex.current !== -1 ? progressCards[selectedIndex.current].rider.cityName : ""}
                        Ridername={selectedIndex.current !== -1 ? progressCards[selectedIndex.current].rider.user.first_name + " " + progressCards[selectedIndex.current].rider.user.last_name : ""}
                        RiderPhone={selectedIndex.current !== -1 ? progressCards[selectedIndex.current].rider.phoneNumber : ""}
                        RiderEmail={selectedIndex.current !== -1 ? progressCards[selectedIndex.current].rider.user.email : ""}
                        DriverImgSrc={
                            selectedIndex.current !== -1 ? ApiUrls.dp + progressCards[selectedIndex.current].driver.dp : ""
                        }
                        DriverCity={selectedIndex.current !== -1 ? progressCards[selectedIndex.current].driver.cityName : ""}
                        Drivername={selectedIndex.current !== -1 ? progressCards[selectedIndex.current].driver.user.first_name + " " + progressCards[selectedIndex.current].driver.user.last_name : ""}
                        DriverPhone={selectedIndex.current !== -1 ? progressCards[selectedIndex.current].driver.phoneNumber : ""}
                        DriverEmail={selectedIndex.current !== -1 ? progressCards[selectedIndex.current].driver.user.email : ""}
                        CarImg={

                            selectedIndex.current !== -1 ? ApiUrls.dp + progressCards[selectedIndex.current].driver.driver_id.vehicle.vehicleImg : ""
                        }
                        CarName={selectedIndex.current !== -1 ? progressCards[selectedIndex.current].driver.driver_id.vehicle.company : ""
                        }
                        License={selectedIndex.current !== -1 ? progressCards[selectedIndex.current].driver.driver_id.vehicle.numberPlate : ""
                        }
                        Year={selectedIndex.current !== -1 ? progressCards[selectedIndex.current].driver.driver_id.vehicle.model : ""
                        }
                        Color={selectedIndex.current !== -1 ? progressCards[selectedIndex.current].driver.driver_id.vehicle.color : ""
                        }
                    />
                </div>
                <div
                    className={`hamburger cursor-pointer ${
                        hidden || selectedIndex.current === -1 ? "" : "hidden"
                    } xs:hidden md:flex w-[2.2rem] h-[2.2rem] rounded-full bg-white flex items-center justify-center absolute top-6 right-5 `}
                    onClick={() => {
                        if (selectedIndex.current !== -1)
                            sethidden(!hidden);
                    }}
                >
                    <MenuIcon/>
                </div>
            </div>
        </div>
    );
};

export default Rides;
