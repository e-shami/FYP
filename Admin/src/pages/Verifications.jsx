import React, {useState, useEffect, useRef, useContext} from "react";
import SearchIcon from "@mui/icons-material/Search";
import SubcribeCardTime from "../components/SubcribeCardTime";
import "../components/Scrollbar.css";
import VerificationCard from "../components/VerificationCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ApiUrls from "../others/Urls";
import LoadingComponent from "../components/LoadingComponent";
import {SessionContext} from "../Context/SessionContext";

const Verifications = () => {
    const [progressCards, setProgressCards] = useState([]);
    const [Credentials, setCredentials] = useState(-1);
    const [noData, setNoData] = useState("");
    const [query, setQuery] = useState("");
    const SESSION = useContext(SessionContext);

    const pageNumber = useRef(1);

    function fetchUser() {
        fetch(ApiUrls.getVerfiUser, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Token " + SESSION.SessionData.token
            },
            body: JSON.stringify({
                page: pageNumber.current,
                count: 10,
                query: query,
            })
        }).then(res => res.json()).then(data => {
            if (data.status === 200) {
                if (data.data.length === 0) {
                    setNoData("No data found");
                    setCredentials(-1);
                }
                setProgressCards([...data.data])

                console.log(data)

            }
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        let mount = true;
        if (mount) {
            fetchUser();
            return () => (mount = false);
        }
    }, []);

    useEffect(() => {
        if (progressCards.length > 0) {

            setCredentials(0);
        } else {
            setCredentials(-1)
        }
    }, [progressCards]);
    const [show, setshow] = useState(false);

    const handleClick = () => {
        setshow(true);
        console.log(show);
    };

    function removeItem(item) {
        let data = []
        for (let i = 0; i < progressCards.length; i++) {
            if (progressCards[i].id !== item.id) {
                data.push(progressCards[i]);
            }

        }
        if (data.length === 0) setCredentials(-1);
        else setCredentials(0);
        setProgressCards(data);
    }

    function search() {
        fetchUser();
    }

    return (
        // side bar code

        <div className="flex flex-1 font-Poppins bg-[white] max-h-screen min-h-screen overflow-hidden ">
            {/* side bar main div */}
            <div
                className={`flex flex-col bg-[#f6f6f6f] min-h-full px-[1rem] pt-[2rem] pl-[2rem]  xs:w-full xs:${
                    !show ? "flex" : "hidden"
                } md:flex md:w-[30%]  `}
                style={{background: "#f6f6f6"}}
            >
                <p className="text-[2rem] text-[#2f2f2f] font-Poppins leading-[3rem] font-semibold">
                    Verification Center
                </p>
                {/* text input */}
                <div className="relative mb-4 w-full ">
          <span>
            <SearchIcon className="text-[#2f2f2f] text-3xl  absolute left-[0.9rem] bottom-[1.29rem] "/>
          </span>
                    <input
                        type="text"
                        name=""
                        value={query}
                        onKeyDown={e => {
                            if (e.key === "Enter")
                                search();
                        }}
                        onChange={(e) => {
                            setQuery(e.target.value)
                        }}
                        placeholder="Search drivers request"
                        className="bg-[#ffffff] w-full h-[4rem] rounded-[0.625rem] p-2 mt-[1rem] border-none pl-[2.8rem] flex-[7] outline-none"
                    />
                </div>
                {/* text input end */}

                <div className="overflow-y-auto">
                    {/* mapping cards */}
                    {progressCards.length === 0 && noData.length === 0 ?
                        <LoadingComponent/> : progressCards.length === 0 ?
                            <p className="text-[2rem] text-[#2f2f2f] text-center	 font-Poppins leading-[3rem] font-semibold">{noData}</p>
                            : progressCards.map(
                                (item, index) => {
                                    return (
                                        <div
                                            className="mt-4"
                                            onClick={() => setCredentials(index)}>
                                            <SubcribeCardTime
                                                name={item.user.first_name + " " + item.user.last_name}
                                                email={item.user.email}
                                                source={ApiUrls.dp + item.dp}
                                                time={item.creationDate.split("T")[1].slice(0, 5)}
                                                index={index}
                                                slected={Credentials}
                                                handleClick={handleClick}
                                            />
                                        </div>
                                    );
                                }
                            )}
                </div>
            </div>
            {/* verification card div (right div) below */}
            <div
                className={`xs:${show ? "flex" : "hidden"} md:flex flex-col w-full   `}
            >
                <div className="font-Poppins leading-10 text-[2rem] font-semibold mt-[2.2rem] pl-6 ">
                    <div onClick={() => setshow(false)} className="md:hidden mr-3">
                        <ArrowBackIosIcon/>
                    </div>
                    Details
                    
                </div>
                {Credentials !== -1 ?
                    < VerificationCard
                        removeItem={removeItem}
                        item={progressCards[Credentials]}
                        name={progressCards[Credentials].user.first_name + " " + progressCards[Credentials].user.last_name}
                        email={progressCards[Credentials].user.email}
                        source={ApiUrls.dp + progressCards[Credentials].dp}
                        username={progressCards[Credentials].user.email}
                        ph={progressCards[Credentials].phoneNumber}
                        Cnic={progressCards[Credentials].driver_id.cnic}
                        Cnic2={progressCards[Credentials].driver_id.cnic}
                        date={progressCards[Credentials].creationDate.split("T")[0]}
                        location={progressCards[Credentials].cityName}
                    /> : <VerificationCard/>
                }
            </div>
        </div>
    );
};

export default Verifications;
