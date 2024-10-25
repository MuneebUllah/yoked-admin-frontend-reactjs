import { useDispatch } from 'react-redux';
import Api_Hits from '../../apis/Api';
import Swal from 'sweetalert2';
import { startLoading, stopLoading } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export default function useProfile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const profileUpdate = async (body) => {
        
            await Api_Hits.patchUserProfile(body)
            .then((res)=>{
                if (res.data.status) {
                    Swal.fire({
                        title: "Good job!",
                        text: "Your Profile Has Been Updated Successfully",
                        icon: "success"
                    }
                ).then(()=>{
                    navigate('/')
                })
                }
            })
         .catch ((error)=>{
            console.error(error);
        })
    };
    const userProfile =async () => {
        dispatch(startLoading())
        await Api_Hits.userProfile()
        .then((res)=>{
            localStorage.setItem('adminDetail' , JSON.stringify(res.data.data))
        })
        .catch((error)=>{
            console.log(error);
        })
        .finally(()=>{
            dispatch(stopLoading())
        })
    }

    return { profileUpdate , userProfile};
}
