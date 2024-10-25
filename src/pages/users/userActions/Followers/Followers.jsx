import React,{useEffect, useState} from 'react'
import Following from './FollowersDetail/Following'
import FollowersDetail from './FollowersDetail/Followers'
import UseFollowers from './useHook'
import { useParams } from 'react-router-dom'
import Loader from '../../../../components/loader/Loader'
import { useSelector } from 'react-redux'

export default function Followers() {
  const [followingData, setFollowingData] = useState({})
  const [followersData, setFollowersData] = useState({})
  const [followingButton, setFollowingButton] = useState(false);
  const { isLoading } = useSelector((state) => state.user);  


  const { id } = useParams()
  const { FollowersApi , FollowingApi } = UseFollowers()

  useEffect(()=>{
    FollowersApi(id , setFollowersData )
    FollowingApi(id , setFollowingData )
  } , [])


  return (
    <div className='flex flex-col gap-10'>
    {
      isLoading ? 
      <Loader /> :(
        <>
    <div className='flex gap-10 text-gray-300'>
      <button className={followingButton ? 'px-6 py-2' : `text-[#E4774F] border-b-2 px-6 py-2 border-solid border-1 border-[#E4774F] font-semibold text-lg` } onClick={() => {
        setFollowingButton(false)
      }}>Followers</button>
      <button className={followingButton ? `text-[#E4774F] border-b-2 px-6 py-2 border-solid border-1 border-[#E4774F] font-semibold text-lg` : 'px-6 py-2'} onClick={() => {
        setFollowingButton(true)
      }}>Following</button>
    </div>
    <div>

    {
      followingButton ?
      <Following followingData={followingData} setFollowingData={setFollowingData}/>
      :
      <FollowersDetail followersData={followersData} setFollowersData={setFollowersData} />
    }
    </div>
    </>
  )
    }
    </div>
  )
}
