import { useDispatch } from 'react-redux'
import Api_Hits from '../../apis/Api'
import { useNavigate } from 'react-router-dom'
import { startLoading, stopLoading } from '../../redux/slices/userSlice'

export default function useUsers() {
    const dispatch = useDispatch()
    const userProfile =async () => {
        await Api_Hits.userProfile()
        .then((res)=>{
            localStorage.setItem('adminDetail' , JSON.stringify(res.data.data))
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    
    const navigate = useNavigate()
    const usersTableApi = async (setUsersData,  limit = 10, offset = 0) => {
        dispatch(startLoading())
        const data = {
            offset,
            limit
        }
        await Api_Hits.users(data.offset, data.limit)
            .then((res) => {
                    setUsersData(res.data.data)               
            })
            .catch((error) => {
                console.log(error);
                if(error?.response?.status === 401){
                    localStorage.clear()
                    navigate('/login')
                }
            })
            .finally(() => {
                dispatch(stopLoading())
            })

    }

    const userByName = async (name , setUsersData) => {
        dispatch(startLoading())
        await Api_Hits.userByName(name)
            .then((res) => {
                setUsersData(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                dispatch(stopLoading())
            })
    }
    const userBlockApi = async (id) => {
        await Api_Hits.userBlock(id)
            .then((res) => {
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const userUnBlockApi = async (id) => {
        await Api_Hits.userUnBlock(id)
            .then((res) => {
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return { usersTableApi, userBlockApi, userUnBlockApi , userByName , userProfile}
}
