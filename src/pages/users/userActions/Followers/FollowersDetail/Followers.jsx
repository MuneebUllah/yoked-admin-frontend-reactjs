import React, { Fragment} from 'react'
import useHook from '../useHook';
import { useParams } from 'react-router-dom';
import Pagination from '../../../../../components/pagination/Pagination';
import profileImg from '../../../../../assets/images/dummy-profile-pic.png'

export default function FollowersDetail({ followersData , setFollowersData }) {
  const limit = 10;
  const { FollowersApi } = useHook()
  const { id } = useParams()

  function fetchNextRecords(offset) {
    FollowersApi(id , setFollowersData , limit , offset)
  }

  return (
    <div className='flex flex-col gap-4 relative'>

      <div className='flex flex-col gap-4 h-[17rem] overflow-hidden rounded flex-wrap'>
        {followersData?.followers?.length > 0 ?
          followersData?.followers?.map((items, index) => {
          return (
            <div className='flex gap-3' key={index}>
            <div className='w-10  h-10'>
              <img src={items?.image ||profileImg} alt='img' className='w-full  h-full rounded-full' />
            </div>
              <div>
              <h2 className='font-medium text-sm'>{items?.name}</h2>
                <p className='text-xs font-normal text-[#696969]'>{items?.username}</p>
              </div>
            </div>

          )

        })
: <h1 className='text-lg font-semibold text-center'>No Data Found</h1>
        }
      </div>
      <div className='absolute -bottom-28 pb-6 w-full'>
      <Fragment>
          <Pagination totalRecords={followersData.count} perPage={limit} handleFetchNextRecords={fetchNextRecords} />
        </Fragment>
    </div>
    </div>
  )
}
