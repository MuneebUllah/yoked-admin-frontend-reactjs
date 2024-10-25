import Api_Hits from '../../../apis/Api'
import { useDispatch } from 'react-redux'
import { startLoading, stopLoading } from '../../../redux/slices/userSlice'

export default function useUserAction() {
    const dispatch = useDispatch()
    const userActionsApi =async (id , setUserActionsData ) =>{
        
        dispatch(startLoading())
        await Api_Hits.userById(id)
        .then((res)=>{
            setUserActionsData(res.data.data)
            localStorage.setItem('userDetail',JSON.stringify(res.data.data))

        })
        .catch((error)=>{
            console.log(error);
        })
        .finally(()=>{
            dispatch(stopLoading())
        })
    }
  return {userActionsApi}
}
