import React from 'react'
import Api_Hits from '../../apis/Api'
import { dispatch } from '../../redux/store/store';
import { startLoading, stopLoading } from '../../redux/slices/userSlice';

export default function useNotification() {
    const getNotification = async (setNotificationData , offset = 0 , limit = 10) =>{
        dispatch(startLoading())
        await Api_Hits.getNotification(offset , limit)
        .then((res)=>{
            setNotificationData(res.data.data);
        })
        .catch((error)=>{console.log(error)})
        .finally(()=>{dispatch(stopLoading())})
    }
    const readAllNotification = async () =>{
        dispatch(startLoading())
    await Api_Hits.readAllNotification()
    .then((res)=>{})
    .catch((error)=>{console.log(error)})
    .finally(()=>{dispatch(stopLoading())})    

    }
  return {getNotification , readAllNotification}
}
