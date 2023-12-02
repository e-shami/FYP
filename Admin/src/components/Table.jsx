import React from 'react'
import MenuDots from '../SVGs/MenuDots'
import TableItem from './TableItem'
import ApiUrls from "../others/Urls";


const Table = ({data,menu,deleteFun}) => {

  const handleMenuClick = ()=>{
    alert("ff")
  }

  return (
    <div className='flex flex-1 flex-col '>
        <div className='flex items-center border-b-[2px] border-[#2F2F2F] font-DMsans font-normal text-[1rem] text-[#2F2F2F80] pb-[18px] px-6 space-x-6'>
            <div className='w-[30%] '>Name</div>
            <div className='w-[30%] '>Email</div>
            <div className='w-[15%] '>Phone</div>
            <div className='w-[15%] '>City</div>
            <div className='w-[10%] '></div>
        </div>
        <div className='px-6 w-full mt-5 space-y-10 '>
            {
                data.map((user) => (

                <TableItem

                AvatarSrc={ApiUrls.dp+user.dp}
                name={user.user.first_name}
                id={user.user.id}
                email={user.user.email}
                phone={user.phoneNumber}
                city={user.cityName}
                icon={MenuDots}
                deleteUser={deleteFun}
                handleMenuClick={handleMenuClick}
                menuItems={menu}/>
                ))

            }

        </div>

    </div>
  )
}

export default Table