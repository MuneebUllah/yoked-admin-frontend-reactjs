import Swal from 'sweetalert2';
import Api_Hits from '../../apis/Api'

export default function useSetting() {
    const changePassword = (password) => {
        const body = {
            oldPassword : password.oldPassword,
            newPassword: password.newPassword
        }
        Api_Hits.changePassword(body)
        .then((res)=>{
            if (res.data.status) {
                Swal.fire({
                    title: "Good job!",
                    text: "Your Password Has Been Updated Successfully",
                    icon: "success"
                });
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                  });
            }
        })
        .catch((error)=>{
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!"
              });
        })
    }
    const privacyPolicy = (data) => {
        Api_Hits.privacyPolicy(data)
        .then((res)=>{
            if (res.data.status) {
                Swal.fire({
                    title: "Good job!",
                    text: "Your Privacy Policy Has Been Updated Successfully",
                    icon: "success"
                });
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    const patchPrivacyPolicy = (data) => {
        Api_Hits.patchPrivacyPolicy(data)
        .then((res)=>{
            if (res.data.status) {
                Swal.fire({
                    title: "Good job!",
                    text: "Your Privacy Policy Has Been Updated Successfully",
                    icon: "success"
                });
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    const getPrivacyPolicy = (setData) => {
        Api_Hits.getPrivacyPolicy()
        .then((res)=>{
            setData(res.data.data.data[0]);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

  return { changePassword , privacyPolicy,getPrivacyPolicy,patchPrivacyPolicy }
}
