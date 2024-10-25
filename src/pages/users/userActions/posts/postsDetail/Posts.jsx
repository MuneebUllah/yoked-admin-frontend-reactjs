import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import Pagination from "../../../../../components/pagination/Pagination";
import dummyImage from '../../../../../assets/images/images.png'

export default function PostsDetail({ postData, fetchNextRecordsForPost, limit }) {

  const navigate = useNavigate()

  const trimText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  return (
    <div className='flex flex-col gap-8 relative'>

      <div className={`flex gap-6 w-full pb-4 rounded flex-wrap`}>
        {postData?.posts?.length > 0 ? (
          postData?.posts?.map((items, index) => {
            return (
              <div className='bg-white flex flex-col gap-2  shadow-2xl rounded-3xl w-[250px] h-auto my-2 p-4 cursor-pointer' key={index} onClick={() => (navigate(`/users/actions/posts/story/${items?.id}`))}>
                <img src={items.postImages[0].image !== null ? items.postImages[0].image : dummyImage} alt='img' className='h-[209px] w-full rounded-t-3xl' />
                <p className="text-xs font-normal break-words p-1 my-2">
                  {trimText(items.caption, 10)}
                </p>
              </div>

            )

          })) : (
          <h1 className='text-center text-lg font-semibold'>No Data Found</h1>
        )

        }
      </div>
      <div className='absolute -bottom-28 pb-6 w-full'>
        <Fragment>
          <Pagination totalRecords={postData.count} perPage={limit} handleFetchNextRecords={fetchNextRecordsForPost} />
        </Fragment>
      </div>
    </div>

  )
}
