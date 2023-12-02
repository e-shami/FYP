import React, {useContext, useEffect, useState} from "react";
import Table from "../components/Table";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ApiUrls from "../others/Urls";
import LoadingComponent from "../components/LoadingComponent";
import {NotificationContext} from "../Context/NotificationContext";
import {SessionContext} from "../Context/SessionContext";

const Clients = () => {
    const [choice, setChoice] = useState("drivers");
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const noti = useContext(NotificationContext);
    const [clients, setClients] = useState([])
    const SESSION = useContext(SessionContext);

    function deleteUser(id) {
        fetch(ApiUrls.deleteUser + "/" + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Token " + SESSION.SessionData.token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status <= 200) {
                    getClients()
                    noti.setData({
                        status: 200,
                        msg: "User Deleted",
                        show: true,
                    })

                }
            })
    }

    function search() {
        let query = document.getElementById("search")
        query = query.value
        let data = {
            page: page,
            count: 6,
            type: choice,
            query: query
        }
        setLoading(true)
        fetch(ApiUrls.search, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Token " + SESSION.SessionData.token
            },

            body: JSON.stringify(data)
        }).then(res => res.json()).then(data => {
            setLoading(false)

            if (data.status === 200) {
                setClients(data.data)
                setMaxPages(parseInt(data.maxPages))
            } else {
                console.log(data.status)
            }

        }).catch(err => {
            console.log(err)
        })
    }

    function getClients() {
        let data = {
            page: page,
            count: 6,
            type: choice
        }
        setLoading(true)
        fetch(ApiUrls.getClients, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Token " + SESSION.SessionData.token
            },

            body: JSON.stringify(data)
        }).then(res => res.json()).then(data => {
            setLoading(false)

            if (data.status === 200) {
                setClients(data.data)
                setMaxPages(parseInt(data.maxPages))
            } else {
                console.log(data.status)
            }

        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getClients()
    }, [page])

    useEffect(() => {
            getClients()
        }
        , [choice])
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            alert("entered")
        }
    }
    return (
        <div className="flex max-w-full bg-[#F6F6F6]">
            <div className="flex-col px-12 py-11 xs:w-full lg:w-[70%]">
                <div>
                    <p className="font-Poppins font-semibold text-[2rem] mb-9">Clients</p>
                </div>
                <div className="flex">
                    {/* //////////  Search Bar///////////// */}
                    <div
                        className="flex items-center shadow-[0px_14px_39px_#0000000D] w-full border bg-[#ffffff] rounded-[10px] pl-5">
                        <SearchIcon className="text-[#2f2f2f] text-3xl"/>
                        <input
                            type="text"
                            name=""
                            id="search"

                            placeholder="Search Name, Email or Phone No."
                            className=" w-full h-[4rem] rounded-r-[10px] p-2  border-none  outline-none"
                        />
                    </div>
                    {/* ////////////// Search Button /////////// */}
                    <div onClick={search}
                         className="flex justify-center items-center bg-[#2F2F2F] text-[#FFF] rounded-[10px] font-Poppins font-medium text-[1.25rem] py-4 px-14 ml-5">
                        Search
                    </div>
                </div>
                {/* //////////// Slider Div ///////////// */}
                <div className="flex flex-col border-[#2F2F2F17] border-b px-3 my-14">
                    <div className="flex">
                        <div
                            onClick={() => setChoice("customers")}
                            className="text-[#2F2F2F] font-Poppins font-medium text-[1.25rem] leading-[30px] pb-[13px] mr-[2.138rem]"
                        >
                            Customers
                        </div>
                        <div
                            onClick={() => setChoice("drivers")}
                            className="text-[#2F2F2F] font-Poppins font-medium text-[1.25rem] leading-[30px] pb-[13px]"
                        >
                            Drivers
                        </div>
                    </div>
                    <div
                        className={` w-[6.938rem] h-[10px] rounded-[2px] bg-[#2F2F2F] relative ${
                            choice !== "customers" &&
                            "left-[8rem] ease-in-out transition transform duration-150"
                        }`}
                    ></div>
                </div>
                {loading ? <LoadingComponent/> :
                    <div className="flex flex-col">
                        <Table
                            data={clients}
                            deleteFun={deleteUser}
                            menu={
                                choice === "customers"
                                    ? ["Delete User"]
                                    : ["Delete User"]
                            }
                        />
                        <div
                            className="self-end mt-10 flex items-center justify-center text-[#2F2F2F] font-Poppins font-normal text-[1rem] leading-[24px]">
                            <div onClick={() => {
                                if (page > 1) {
                                    setPage(page - 1)
                                }
                            }
                            }>
                                <KeyboardArrowLeftIcon/>
                            </div>
                            Page {page}
                            <div onClick={() => {
                                if (page < maxPages) {
                                    setPage(page + 1)
                                }
                            }
                            }>
                                <KeyboardArrowRightIcon/>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Clients;
