import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import faverate from '../../../../../assets/images/Favrate.svg'
import dummyImage from '../../../../../assets/images/images.png'
import useHook from '../useHook';
import Pagination from '../../../../../components/pagination/Pagination';

export default function SavedPostDetail({ savedPostData, setSavedPostData }) {
  const navigate = useNavigate()



  const limit = 10;
  const { savedPostApi } = useHook()

  function fetchNextRecords(offset) {
    savedPostApi(setSavedPostData,  limit, offset);
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

      <div className={`flex gap-5 w-full pb-4  rounded flex-wrap`}>
        {
          savedPostData?.savedPosts?.length > 0 ?
            (savedPostData?.savedPosts?.map((items, index) => {

              return (
                <div className='bg-white flex flex-col relative gap-2 cursor-pointer  shadow-2xl rounded-3xl w-[250px] h-auto my-2 p-4' key={index} onClick={() => (navigate(`/users/actions/posts/story/${items?.postId}`, { state: { itemId: items.id, postData: items.post } }))}>
                  <img src={items?.post?.postImages ? items?.post?.postImages[0].image : dummyImage} alt='img' className='h-[209px] w-full rounded-t-3xl' />
                  <div className='flex'>
                    <p className="text-xs font-normal p-1 w-11/12 my-2">
                      {trimText(items.post.caption, 10)}
                    </p>
                    <img src={faverate} alt='img' className='absolute right-5 pt-4' />
                  </div>
                </div>
              )

            }))
            : <h1 className='text-center text-lg font-semibold'>No Data Found</h1>

        }
      </div>
      <div className='absolute -bottom-28 pb-6 w-full'>
        <Fragment>
          <Pagination totalRecords={savedPostData.count} perPage={limit} handleFetchNextRecords={fetchNextRecords} />
        </Fragment>
      </div>
    </div>
  )
}
