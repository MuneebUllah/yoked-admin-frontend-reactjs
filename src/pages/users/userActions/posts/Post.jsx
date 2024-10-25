import React, { useState, useEffect } from 'react';
import PostsDetail from './postsDetail/Posts';
import Reels from './postsDetail/Reels';
import Loader from '../../../../components/loader/Loader';
import usePost from './useHook';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveButtonReel } from '../../../../redux/slices/userSlice';

export default function Post() {
  const [reelsData, setReelsData] = useState({});
  const [postData, setPostData] = useState({});
  const { activeButtonReel, isLoading } = useSelector((state) => state.user);
  const { id } = useParams();
  const { postApi, ReelApi } = usePost();
  const dispatch = useDispatch();
  
  const limit = 10;

  function fetchNextRecordsForPost(offset) {
    postApi(id, setPostData, limit, offset);
  }

  function fetchNextRecordsForReels(offset) {
    ReelApi(id, setReelsData, limit, offset);
  }

  useEffect(() => {
    postApi(id, setPostData);
    ReelApi(id, setReelsData);
  }, [id]);

  return (
    <div className='flex flex-col gap-6'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className='flex gap-6 text-gray-300 px-6'>
            <button
              className={activeButtonReel === 'Posts' ? 'text-[#E4774F] border-b-2 px-8 py-2 border-solid border-1 border-[#E4774F] font-semibold text-lg' : 'px-8 py-2'}
              onClick={() => dispatch(setActiveButtonReel('Posts'))}
            >
              Posts
            </button>
            <button
              className={activeButtonReel === 'Reels' ? 'text-[#E4774F] border-b-2 px-8 py-2 border-solid border-1 border-[#E4774F] font-semibold text-lg' : 'px-8 py-2'}
              onClick={() => dispatch(setActiveButtonReel('Reels'))}
            >
              Reels
            </button>
          </div>

          <div>
            {activeButtonReel === 'Posts' ? (
              <PostsDetail postData={postData} fetchNextRecordsForPost={fetchNextRecordsForPost} limit={limit} />
            ) : (
              <Reels reelsData={reelsData} fetchNextRecordsForReels={fetchNextRecordsForReels} limit={limit} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
