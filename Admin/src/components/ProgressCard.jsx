import { Tooltip } from "@mui/material";
import Arrows from "../SVGs/Arrows";
const ProgressCard = ({ id,index, done, pickup, dropoff,groupid, touchable = false, shadow = true, handleClicked, show=false }) => {
//   const [visible, setVisible] = useState(false);

    const handleClick = (id)=>{
        // setVisible(true);
        handleClicked(id,index);
    }


  return (
    <div onClick={()=>handleClick(id)} className={`flex items-center bg-[#FFFFFF] h-full rounded-[16px] ${shadow && 'shadow-[0px_9px_29px_5px_#0000000A]'}`}>
      <div
        className={`${
          touchable && show ? "bg-[#35B368]" : "bg-[#fFF]"
        }  min-w-1 w-1 max-w-1 h-[70px] rounded-[5px]`}
      />
      <div className="flex flex-col h-full w-full  py-5  pl-4 pr-5 ">
        <div className="flex justify-between">
          <p className="flex font-Play font-normal leading-7 text-[1.45rem]">
            ID {id}{groupid}
          </p>
          <div
            className={`${
              done ==="CMP" ?  "bg-[#77B255]" : done === "CN_DR" || done === "CN_RI" ? "bg-red-500" :"bg-[#FFB545]" 
            } rounded-[20px] font-normal px-4 py-1 font-Poppins text-[0.938rem] leading-[22.496px] text-[#FFFFFF] flex justify-center items-center`}
          >
            {done ==="CMP" ?  "Completed" : done === "CN_DR" || done === "CN_RI" ? "canceled" : "In Progress" }
          </div>
        </div>
        <div className="flex items-center">
          <div className="self-end pb-2 flex flex-col items-center justify-center">
            <div className="flex justify-center items-center w-[1.063rem] h-[1.063rem] bg-[#0066FF] rounded-[50%] ">
              <div className=" w-[0.5315rem] h-[0.5315rem] bg-[#FFFFFF] rounded-full"></div>
            </div>
            <div className="rotate-[-90] bg-[#161616] h-[1.5rem] w-[0.01rem]" />
            <div className="flex justify-center items-center w-[1.063rem] h-[1.063rem] bg-[#161616] rounded-[50%]">
              <div className="w-[0.5315rem] h-[0.5315rem] bg-[#FFFFFF] rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-col max-w-[65%] ml-2">
            <p className="whitespace-nowrap	 text-[0.813rem] font-[400] text-[#2F2F2F80] leading-[1.219rem]">
              Pickup
            </p>
            <Tooltip title={pickup}>
              <p className="font-Poppins text-[1rem] font-[400] text-[#2F2F2F] leading-[1.5rem] overflow-hidden text-ellipsis line-clamp-1">
                {pickup}
              </p>
            </Tooltip>
            <p className="whitespace-nowrap	text-[0.813rem] font-[400] text-[#2F2F2F80] leading-[1.219rem]">
              Dropoff
            </p>
            <Tooltip title={dropoff}>
              <p className="font-Poppins text-[1rem] font-[400] text-[#2F2F2F] leading-[1.5rem] overflow-hidden text-ellipsis line-clamp-1">
                {dropoff}
              </p>
            </Tooltip>
          </div>
          <div className="flex justify-center items-center h-full ml-3">
            <Arrows />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
