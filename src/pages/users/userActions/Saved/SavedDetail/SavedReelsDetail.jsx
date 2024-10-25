import React, { Fragment } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import faverate from '../../../../../assets/images/Favrate.svg'
import dummyImage from '../../../../../assets/images/images.png'
import useHook from '../useHook';
import Pagination from '../../../../../components/pagination/Pagination';

export default function SavedReelsDetail({ savedReelData, setSavedReelData }) {
  const { id } = useParams()
  const navigate = useNavigate()


  const { savedReelsApi } = useHook()
  const limit = 10;

  function fetchNextRecords(offset) {
    savedReelsApi(setSavedReelData,  limit, offset);
  }
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
        {savedReelData?.savedReels?.length > 0 ?
          (savedReelData?.savedReels?.map((items, index) => {
            return (
              <div key={index} className='bg-white flex flex-col gap-2  shadow-2xl rounded-3xl w-[300px] h-[370px] my-2 p-4 cursor-pointer' onClick={() => (navigate(`/users/actions/reels/story/${id}`, { state: { itemId: items.id, reelData: items.reel } }))}>
                <video src={items?.reel?.mediaUrl ? items?.reel?.mediaUrl : dummyImage} className='h-[80%] w-full rounded-t-3xl' />
                <div className='flex '>
                  <p className="text-xs font-normal w-full p-1 my-2">
                    {trimText(items?.reel?.caption, 10)}
                  </p>
                  <img src={faverate} alt='img' className='pt-4' />
                </div>
              </div>

            )

          })) : <h1 className='text-center text-lg font-semibold'>No Data Found</h1>

        }
      </div>
      <div className='absolute -bottom-28 pb-6 w-full'>
        <Fragment>
          <Pagination totalRecords={savedReelData?.count} perPage={limit} handleFetchNextRecords={fetchNextRecords} />
        </Fragment>
      </div>
    </div>
  )
}
