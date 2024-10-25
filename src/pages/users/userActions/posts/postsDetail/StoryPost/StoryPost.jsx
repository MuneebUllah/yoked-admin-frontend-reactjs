import React, { useEffect, useState, useRef } from 'react';
import medal from "../../../../../../assets/images/medal.png";
import { colors } from "../../../../../../helpers/constants";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import dummyImage from '../../../../../../assets/images/dummy-profile-pic.png';
import useHook from '../../useHook';
import { MdDoNotDisturbAlt } from "react-icons/md";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../../../../reports/report.css';
import { useSelector } from 'react-redux';
import Loader from '../../../../../../components/loader/Loader';

export default function StoryPost() {
    const swiperRef = useRef();
    const [postData, setPostData] = useState(null);
    const { postBlockApi, postUnBlockApi, postByIdApi } = useHook();
    const navigate = useNavigate();
    const { id } = useParams();
    const { isLoading } = useSelector((state) => state.user)
    useEffect(() => {
        if (id) {
            postByIdApi(id, setPostData);
        }
    }, [id]);

    const blockUnblockToggle = (id, isBlocked) => {
        if (isBlocked) {
            postUnBlockApi(id).then(() => {
                setPostData((prevPostData) => ({
                    ...prevPostData,
                    isBlocked: false
                }));
            });
        } else {
            postBlockApi(id).then(() => {
                setPostData((prevPostData) => ({
                    ...prevPostData,
                    isBlocked: true
                }));
            });
        }
    };
    return (
        <div className="w-full flex pt-6 justify-center align-middle h-auto">
            {
                isLoading ?
                    <Loader />
                    : (
                        postData && (
                            <div className="w-10/12 h-full flex justify-center flex-col gap-4">
                                <div className='flex items-center gap-2'>
                                    <div
                                        onClick={() => {
                                            navigate(-1);
                                        }}
                                        style={{ backgroundColor: colors.orange }} // Apply styles directly
                                        className="h-9 w-9 rounded-full flex justify-center items-center cursor-pointer"
                                    >
                                        <FaArrowLeft size={22} color="white" />
                                    </div>
                                    <h1 className='text-lg font-medium'>{`${postData?.user?.name ? postData?.user?.name : localStorage.getItem('name')}'s Post`}</h1>
                                </div>
                                <div className='w-full bg-white flex p-6 rounded gap-10'>
                                    <div className='h-[605px] w-[447px] border-r border-[#E2E8F0] pr-6'>
                                        <div>
                                            <Swiper
                                                spaceBetween={50}
                                                centeredSlides={true}
                                                autoplay={{
                                                    autoplay: true,
                                                    disableOnInteraction: false,
                                                }}
                                                modules={[Autoplay, Navigation, Pagination, Scrollbar]}
                                                navigation
                                                // pagination={{ clickable: true }}
                                                scrollbar={{ draggable: true }}
                                                slidesPerView={1}
                                                loop={true}
                                                onBeforeInit={(swiper) => {
                                                    swiperRef.current = swiper;
                                                }}
                                            >
                                                {postData?.postImages?.map((item, index) => {
                                                    return (

                                                        <SwiperSlide key={index} style={{ display: "flex" }}>
                                                            <div className="featured-project-cart">
                                                                <img src={item.image} alt={`Slide ${index}`} />
                                                            </div>
                                                        </SwiperSlide>
                                                    )
                                                })}
                                            </Swiper>
                                        </div>
                                    </div>
                                    <div className='w-4/5 flex flex-col gap-6'>
                                        <div className='flex justify-between items-start py-4'>
                                            <div className='flex gap-4'>
                                                <div>
                                                    <img src={postData?.user?.image !== null ? postData?.user?.image : dummyImage} alt='img' className='rounded-full h-10 w-10' />
                                                </div>

                                                <div className='flex flex-col'>
                                                    <h1 className='font-semibold text-base montserrat'>{postData?.user?.name}</h1>
                                                    <h5 className='text-xs'>{postData?.user?.username}</h5>
                                                </div>
                                            </div>
                                            <div>
                                                <button
                                                    onClick={() => blockUnblockToggle(postData.id, postData.isBlocked)}
                                                    className={`text-white montserrat inline-flex items-center gap-2 text-sm font-semibold rounded-full border py-3 px-7 ${postData.isBlocked ? "bg-[#808D9E]" : "bg-[#252D31]"
                                                        }`}
                                                >
                                                    <MdDoNotDisturbAlt size={15} color="white" />
                                                    {postData.isBlocked ? "Unblock Post" : "Block Post"}
                                                </button>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <p className='text-sm text-[#434343] h-auto mb-8 overflow-hidden'>{postData.caption}</p>
                                        </div>
                                        <div className='flex flex-col gap-3'>
                                            {postData?.taggedPeople.length > 0 && (
                                                <>
                                                    <h1 className='font-semibold montserrat'>Tagged Users</h1>
                                                    <div className='flex justify-between px-2'>
                                                        <div className='flex gap-4'>
                                                            {postData?.taggedPeople.map((tagged, index) => (
                                                                <div key={index} className='flex gap-2'>
                                                                    <div className='w-10 h-10'>
                                                                        <img src={tagged?.TaggedUser?.image ? tagged?.TaggedUser?.image : dummyImage} alt='img' className='h-full w-full rounded-full' />
                                                                    </div>
                                                                    <div className='flex flex-col'>
                                                                        <h1 className='font-medium montserrat text-base'>{tagged?.TaggedUser?.name || 'Name'}</h1>
                                                                        <h5 className='text-xs montserrat'>{tagged?.TaggedUser?.role || "Role"}</h5>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <div
                                            className="py-2 flex flex-row gap-6 items-center cursor-pointer"
                                            onClick={() => navigate(`/users/actions/posts/story/reactions/${postData.id}`, { state: postData })}
                                        >
                                            <img src={medal} alt="avatar " className="h-9 w-7 " />
                                            <h1 className="text-[#FFBA57] text-base font-semibold montserrat">
                                                Liked
                                                <span className="text-[#808D9E]"> {`(${postData.totalReactions})`}</span>
                                            </h1>
                                        </div>
                                        <div>
                                            <p className='font-medium text-xs mb-4 montserrat'>Filter by Flair</p>
                                            <div className='flex gap-4 flex-wrap'>
                                                {postData.flairs.map((items, index) => (
                                                    <button
                                                        key={index}
                                                        style={{ backgroundColor: colors.orange }}
                                                        className="text-white px-4 rounded-3xl montserrat h-8 text-sm"
                                                    >
                                                        {items.flair}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className='text-s mb-2 montserrat'>Location</h2>
                                            <p className='font-medium montserrat'>{postData.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
        </div>
    );
}
