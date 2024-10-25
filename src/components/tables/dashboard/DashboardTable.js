import { useNavigate } from "react-router-dom";
import { colors } from "../../../helpers/constants";
import { MessageButton } from "../../buttons/PrimaryButton";
import dummyImg from '../../../assets/images/dummyImg.svg'
import Loader from "../../loader/Loader";

export const Table = ({ tableData , isLoading }) => {
    
    const navigate = useNavigate()


    const userDetail = (id) => {
        navigate(`/users/actions/${id}`)        
    }
    return (
        <div>
            {isLoading? <Loader/>:(
            <table className="table w-full p-4 text-sm overflow-x-auto min-w-[40rem]">
                <>
                <thead>
                    <tr>
                        <th className={`text-[${colors.orange}] text-start font-semibold text-xl pb-4`} scope="col" >Name</th>
                        <th className={`text-[${colors.orange}] text-start font-semibold text-xl pb-4`} scope="col">Username</th>
                        <th className={`text-[${colors.orange}] text-start font-semibold text-xl pb-4`} scope="col" >Phone</th>
                        <th className={`text-[${colors.orange}] text-start flex justify-between items-center pb-4 font-semibold text-xl`} scope="col">
                        Email
                        <span className="text-xs font-normal">
                        <MessageButton title='View Users' width='91px' height='28px' onclick={()=>{navigate('/users')}}/>
                        </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tableData?.length > 0 ? tableData?.filter(index => index.id != 1)?.map((item , index)=>{
                        return(
                    <tr className="border-b border-[#EAECF0] text-sm" key={index}>

                        <td className="flex cursor-pointer gap-4 items-center" onClick={()=>{userDetail(item.id)}}><img src={item.image !== null ? item.image : dummyImg} className="w-10 h-10 rounded-full" />{item.name}</td>
                        <td className="cursor-pointer" onClick={()=>{userDetail(item.id)}}>{item.username}</td>
                        <td className="cursor-pointer" onClick={()=>{userDetail(item.id)}}>{item.phone}</td>
                        <td className="cursor-pointer" onClick={()=>{userDetail(item.id)}}>{item.email}</td>
                    </tr>
                        )

                    })
                    :
                    <h1>No data Found</h1>

                    }
                </tbody>
                </>
            </table>
                )}
         </div>
    )
} 