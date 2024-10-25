import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import dummyImage from '../../../../../assets/images/images.png'
import Pagination from '../../../../../components/pagination/Pagination';

export default function Reels({ reelsData , fetchNextRecordsForReels , limit}) {

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

      <div className={`flex gap-5 w-full pb-4 rounded flex-wrap`}>
        {reelsData?.reels?.length > 0 ?
          (reelsData?.reels?.map((items, index) => {
            return (
              <div className='bg-white flex flex-col gap-2  shadow-2xl rounded-3xl w-[300px] h-[370px] my-2 p-4 cursor-pointer' key={index} onClick={() => (navigate(`/users/actions/reels/story/${reelsData?.id}`, { state: { itemId: items.id, reelData: items } }))}>
                <video src={items.mediaUrl ? items.mediaUrl : dummyImage} className='h-[90%] w-full rounded-t-3xl' autoPlay muted loop />
                <p className="text-xs font-normal p-1 my-2">
                  {trimText(items.caption, 10)}
                </p>

              </div>

            )

          })
          ) :
          <h1 className='text-lg font-semibold text-center'>No Data Found</h1>
        }
      </div>
      <div className='absolute -bottom-28 pb-6 w-full'>
        <Fragment >
          <Pagination totalRecords={reelsData.count} perPage={limit} handleFetchNextRecords={fetchNextRecordsForReels} />
        </Fragment>
      </div>
    </div>
  )
}
