import Api_Hits from '../../apis/Api'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function LoginUseHook() {
    const navigate = useNavigate()
    
    const SignIn =async (data) => {
        await Api_Hits.login(data)
        .then((res)=>{
            localStorage.setItem('token', res.data.data.token)
            localStorage.setItem('adminDetail' , JSON.stringify(res.data.data.user))
            if(res.data.status && res.data.data.user.role === 'admin'){
                navigate('/')
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please Enter The Correct Email & Password",
                  });
            }
        })
        .catch((error)=>{
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Enter The Correct Email & Password",
              });
        })
    }
  return { SignIn }
}
