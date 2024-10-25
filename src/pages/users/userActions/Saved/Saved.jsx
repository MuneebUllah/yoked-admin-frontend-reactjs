import React, { useEffect, useState } from 'react';
import SavedPostDetail from './SavedDetail/SavedPostDetail';
import SavedReelsDetail from './SavedDetail/SavedReelsDetail';
import useSaved from './useHook';
import { useParams } from 'react-router-dom';
import Loader from '../../../../components/loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveButtonSaved } from '../../../../redux/slices/userSlice';

export default function Saved() {
  const [savedPostData, setSavedPostData] = useState({});
  const [savedReelData, setSavedReelData] = useState({});
  const { savedUserPostsApi, savedUserReelsApi } = useSaved();
  const { id } = useParams();
  const { isLoading, activeButtonSaved } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    savedUserPostsApi(id, setSavedPostData);
    savedUserReelsApi(id, setSavedReelData);
  }, [id, savedUserPostsApi, savedUserReelsApi]);

  return (
    <div className='flex flex-col gap-4'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className='flex gap-10 text-gray-300 px-6'>
            <button
              className={activeButtonSaved === 'Posts' ? 'text-[#E4774F] border-b-2 px-8 py-2 border-solid border-1 border-[#E4774F] font-semibold text-lg' : 'px-8 py-2'}
              onClick={() => dispatch(setActiveButtonSaved('Posts'))}
            >
              Posts
            </button>
            <button
              className={activeButtonSaved === 'Reels' ? 'text-[#E4774F] border-b-2 px-8 py-2 border-solid border-1 border-[#E4774F] font-semibold text-lg' : 'px-8 py-2'}
              onClick={() => dispatch(setActiveButtonSaved('Reels'))}
            >
              Reels
            </button>
          </div>
          <div>
            {activeButtonSaved === 'Posts' ? (
              <SavedPostDetail savedPostData={savedPostData} setSavedPostData={setSavedPostData} />
            ) : (
              <SavedReelsDetail savedReelData={savedReelData} setSavedReelData={setSavedReelData} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
