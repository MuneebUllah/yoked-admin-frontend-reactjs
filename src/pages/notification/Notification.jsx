import React, { useEffect, useState } from "react";
import useNotification from "./useHook";
import { useDispatch } from "react-redux";
import { setunReadNotificationCount } from "../../redux/slices/userSlice";

export const Notification = () => {
  const [notificationData , setNotificationData] = useState([])
  const { getNotification , readAllNotification } = useNotification()
  const dispatch = useDispatch();

  useEffect(()=>{
    getNotification(setNotificationData)
    readAllNotification()
    if(notificationData){
      dispatch(setunReadNotificationCount(0))
    }
  },[])

  return (
    <div className="w-full h-auto flex justify-center items-center ">
      <div className="w-11/12 h-auto pt-10 flex flex-col gap-4 pb-11 2xl:b-5">
        <div className="bg-white w-full min-h-[80vh] rounded-lg flex flex-col px-5 py-8 gap-4 ">
          {notificationData?.notifications?.map((item , index)=>{
            return(
          <div className="bg-[#FBFBFB] rounded-md w-full h-24 pt-3 ps-6" key={index}>             
            <h1 className="font-semibold text-xl text-[#0C3A2D]">
              {item?.title}
            </h1>
            <p className="font-normal text-sm text-[#808D9E] mt-2">
              {item?.description}
            </p>
          </div>
            )
          })          }
        </div>
      </div>
    </div>
  );
};
