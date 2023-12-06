import React, {useContext, useEffect, useState} from "react";
import ChatUser from "../components/ChatUser";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ApiUrls from "../others/Urls";
import {SessionContext} from "../Context/SessionContext";

const Chats = ({setChat,id}) => {
    const [messages, setMessages] = useState([]);
    const [visible, setVisible] = useState(false);
    const SESSION = useContext(SessionContext);

    useEffect(() => {
        let mount = true;

        if (mount) {

            fetch(ApiUrls.GetALLChats+"/"+id,{
                method:"GET",
                headers:{
                    Authorization: "Token " + SESSION.SessionData.token
                }
            }).then(re=>re.json()).then(data=> {
                if (data.status===200){
                    setMessages([...data.msg])
                }
            }).catch(err=>{
                console.log(err)
            })
        }

        return () => (mount = false);
    }, []);


    return (
        <>
            <div className="flex flex-1 max-h-full min-h-full ">

                {/* ///////////////////////////////       Rigth Side Messages Div    ////////////////////////////////////////// */}

                <div
                    className={`flex flex-col xs:${
                        visible ? "flex" : "hidden"
                    } md:flex w-full pt-[24px]`}
                >
                    {/* /////// Inside Rider image, Email And Rider etc status Div ///////// */}
                    <div className="flex items-center px-[32px] justify-between mb-[24px]">
                        <div className="flex  cursor-pointer items-center">

                            <ArrowBackIosIcon onClick={() => setChat(false)}/>


                        </div>
                    </div>
                    <hr/>
                    {/* //////////  Messages Map Div  ///////////// */}
                    <div className="max-w-full flex-1 px-[32px]  pt-[30.008px] overflow-y-auto">
                        <div className="w-full flex-1 flex items-center justify-center px-[128px] mb-6">
                        <div className="flex-1 h-[1px] bg-[#e5e7eb]"/>
                        <div
                            className="w-[6.25rem] text-center font-Poppins font-normal text-[0.938rem] lg:text-[1.5rem] leading-[22.496px]">
                            Today
                        </div>
                        <div className="flex-1 h-[1px] bg-[#e5e7eb]"/>
                        </div> 
                        {messages.map(({src, text, name, time,isDriver}) => (
                            <ChatUser
                                src={ApiUrls.dp+src}
                                name={name}
                                text={text}
                                time={time}
                                isDriver={isDriver}
                                chat={true}
                            />
                        ))}
                    </div>
                    {/* ////////// For Last Line in Figma  ///////////// */}
                    <hr className="mb-[80px]"/>
                </div>

            </div>
        </>
    );
};

export default Chats;
