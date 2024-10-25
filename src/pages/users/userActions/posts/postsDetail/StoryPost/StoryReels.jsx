import React, { useEffect, useState } from 'react';
import PR from '../../../../../../assets/images/PR.svg';
import { colors } from '../../../../../../helpers/constants';
import { FaArrowLeft } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import dummyImage from '../../../../../../assets/images/dummy-profile-pic.png';
import useHook from '../../../../useHook';
import { MdDoNotDisturbAlt } from 'react-icons/md';
import PropTypes from 'prop-types';

const getObjectFromLocalStorage = (key) => {
    try {
        const serializedObj = localStorage.getItem(key);
        return serializedObj ? JSON.parse(serializedObj) : null;
    } catch (e) {
        console.error('Error retrieving from localStorage', e);
        return null;
    }
};

const StoryReels = () => {
    const [user, setUser] = useState(null);
    const [reelData, setReelData] = useState(null);
    const { userBlockApi, userUnBlockApi } = useHook();

    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = getObjectFromLocalStorage('userDetail');
        if (storedUser) setUser(storedUser);
    }, []);

    useEffect(() => {
        if (state?.reelData) {
            setReelData(state.reelData);
        }
    }, [state]);

    const blockUnblockToggle = (id, isBlocked) => {
        if (isBlocked) {
            userUnBlockApi(id).then(() => {
                setReelData((prevPostData) => ({
                    ...prevPostData,
                    isBlocked: false,
                }));
            });
        } else {
            userBlockApi(id).then(() => {
                setReelData((prevPostData) => ({
                    ...prevPostData,
                    isBlocked: true,
                }));
            });
        }
    };

    if (!reelData) {
        return null;
    }
    
    return (
        <div className="w-full flex justify-center align-middle h-full">
            <div className="w-10/12 h-full flex justify-center flex-col gap-4">
                <div
                    onClick={() => navigate(-1)}
                    className={`bg-[${colors.orange}] h-9 w-9 rounded-full flex justify-center items-center cursor-pointer`}
                >
                    <FaArrowLeft size={22} color="white" />
                </div>
                <div className='w-full bg-white flex p-6 rounded gap-6'>
                    <video
                        src={reelData.mediaUrl || dummyImage}
                        autoPlay
                        muted
                        className='rounded w-96 h-[500px]'
                        onError={(e) => e.target.src = dummyImage}
                    />
                    <div className='w-4/5'>
                        <div className='flex flex-col gap-3 w-full'>
                            <div className='flex justify-between p-4'>
                                <div className='flex gap-4'>
                                    <div className='w-10 h-10'>
                                        <img src={user?.image || dummyImage} className='rounded-full' alt="User" />
                                    </div>
                                    <div className='flex flex-col'>
                                        <h1 className='font-medium text-base'>{user?.name}</h1>
                                        <h5 className='text-xs'>{user?.username}</h5>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={() => blockUnblockToggle(reelData?.id, reelData?.isBlocked)}
                                        className={`text-white inline-flex items-center gap-2 text-sm font-semibold rounded-full border py-3 px-7 ${reelData.isBlocked ? "bg-[#808D9E]" : "bg-[#252D31]"}`}
                                    >
                                        <MdDoNotDisturbAlt size={15} color="white" />
                                        {reelData.isBlocked ? "Unblock Post" : "Block Post"}
                                    </button>
                                </div>
                            </div>
                            <div className='w-2/3 px-4' >
                                <p className='text-sm text-[#434343] h-36 overflow-hidden'>{reelData?.caption}</p>
                            </div>
                            <div className="p-4 flex flex-row gap-6 items-center cursor-pointer">
                                <h1 className="text-[#2E4D55] text-xs font-semibold montserrat">PR Points</h1>
                                <img src={PR} alt="avatar" className="h-9 w-7" />
                                <span className="text-[#808D9E] text-xs">{`(${reelData?.totalPRs})`}</span>
                            </div>
                            <div>
                                <p className='font-medium text-xs mb-4 montserrat'>Filter by Flair</p>
                                <div className='flex gap-4 flex-wrap'>
                                    {reelData?.flairs?.map((items, index) => (
                                        <button
                                            key={index}
                                            style={{ backgroundColor: colors.orange }}
                                            className="text-white px-4 rounded-3xl montserrat h-8 text-sm"
                                        >
                                            {items?.flair}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h2 className='text-s mb-2 montserrat'>Location</h2>
                                <p className='font-medium montserrat'>{reelData?.location}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

StoryReels.propTypes = {
    postReactionData: PropTypes.array,
};

export default StoryReels;
