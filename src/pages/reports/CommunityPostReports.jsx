import React, { useState, useEffect, useRef } from "react";
import { colors } from "../../helpers/constants";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import medal from "../../assets/images/medal.png";
import Comment from "../../components/community/Comment";
import CommentReply from "../../components/community/CommentReply";
import useCommunity from "../community/useHook";
import { MdDoNotDisturbAlt } from "react-icons/md";
import useReport from "./useHook";
import ReportedPersonCommunityPost from "./../../components/reports/ReportedPersonCommunityPost";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './report.css';

const CommunityPostReports = () => {
  const swiperRef = useRef();
  const [postData, setPostData] = useState();
  const [postReactionData, setPostReactionData] = useState([]);
  const [communityPostDataById, setCommunityDataById] = useState([]);
  const [postCommentsData, setPostCommentsData] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { communityPostBlockApi, communityPostUnBlockApi, communityPostReaction } = useCommunity();
  const { reportCommunityPostById } = useReport();
  const { communityPostComments ,communityPostByIdApi} = useCommunity();
  useEffect(()=>{
    if(state){
    communityPostByIdApi(state?.id , setPostData)
}},[])

  useEffect(() => {
    if (state) {
      communityPostComments(state?.id, setPostCommentsData);
    }
  }, [state]);

  useEffect(() => {
    if (state) {
      communityPostReaction(postData?.id, setPostReactionData);
      reportCommunityPostById(postData?.id, setCommunityDataById);
    }
  }, [postData]);

  const blockUnblockToggle = (id, isBlocked) => {
    if (isBlocked) {
      communityPostUnBlockApi(id).then(() => {
        setPostData((prevPostData) => ({
          ...prevPostData,
          isBlocked: false,
        }));
      });
    } else {
      communityPostBlockApi(id).then(() => {
        setPostData((prevPostData) => ({
          ...prevPostData,
          isBlocked: true,
        }));
      });
    }
  };


  return (
    <div className="w-[calc(100%-90px)] h-auto flex justify-center items-center montserrat pb-11">
      {postData && (
        <div className="w-11/12 h-full pt-10 flex flex-col gap-4 ">
          <div className="flex flex-row items-center gap-4">
            <div
              onClick={() => {
                navigate(-1);
              }}
              className={`bg-[${colors.orange}] h-9 w-9 rounded-full flex justify-center items-center cursor-pointer`}
            >
              <FaArrowLeft size={22} color="white" />
            </div>
            <h1 className="text-lg font-medium">Community Post</h1>
          </div>
          <h1 className="text-lg font-medium mt-5">{postData?.user?.name}</h1>
          <div className="w-full h-auto justify-between bg-white rounded-lg py-16 flex flex-col">
            <div className="flex flex-row justify-between">
              <div className="w-1/6 h-full mx-16 flex-col justify-start">
                <Swiper
                      spaceBetween={50}
                      centeredSlides={true}
                      autoplay={{
                        autoplay: true,
                        disableOnInteraction: false,
                      }}
                      modules={[Autoplay, Navigation, Pagination, Scrollbar]}
                      navigation
                      pagination={{ clickable: true }}
                      scrollbar={{ draggable: true }}
                      slidesPerView={1}
                      loop={true}
                      onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                      }}
                    >
                    {postData?.communityPostImages?.map((item, index) => (
                      <SwiperSlide key={index} style={{ display: "flex" }}>
                        <div className="featured-project-cart">
                          <img src={item.image} alt={`Slide ${index}`} />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                <div className="w-[23rem] pt-8 px-2 flex flex-col gap-5">
                  <h1 className="text-black text-xl font-semibold montserrat">
                    {postData?.title}
                  </h1>
                  <p className="text-black text-base font-medium montserrat">
                    {postData?.description}
                  </p>
                </div>
                <div
                  className="py-6 flex flex-row gap-6 items-center px-2 cursor-pointer"
                  onClick={() => {
                    navigate("/reports/community-post/reactions", {
                      state: { postData: postData, postReactionData },
                    });
                  }}
                >
                  <img src={medal} alt="avatar" className="h-9 w-7" />
                  <h1 className="text-[#FFBA57] text-base font-semibold montserrat">
                    Liked
                    <span className="text-[#808D9E]">{` (${postData?.totalReactions})`}</span>
                  </h1>
                </div>
              </div>
              <div className="w-3/5 h-full">
                <div className="flex flex-row justify-between items-center py-1 px-10">
                  <h1 className="text-xl font-semibold">All Comments (3)</h1>
                  <button
                    onClick={() => blockUnblockToggle(postData.id, postData.isBlocked)}
                    className={`text-white inline-flex items-center gap-2 text-sm font-semibold rounded-full border py-3 px-7 ${
                      postData.isBlocked ? "bg-[#808D9E]" : "bg-[#252D31]"
                    }`}
                  >
                    <MdDoNotDisturbAlt size={15} color="white" />
                    {postData.isBlocked ? "Unblock Post" : "Block Post"}
                  </button>
                </div>
                <div className="overflow-y-auto h-[29rem] w-full px-10 py-5">
                  {postCommentsData?.map((item, index) => (
                    <Comment data={item} key={index} />
                  ))}
                  <CommentReply
                    data={{
                      comment: "This is a reply to analyze the design.",
                    }}
                    isFromReportsPage={true}
                  />
                </div>
              </div>
            </div>
            <hr className="mx-20 bg-gray-[#E2E8F0]" />
            <div className="w-2/3 h-full montserrat">
              <div className="flex flex-row justify-between items-center pt-14 pb-6 px-14">
                <h1 className="text-base font-semibold montserrat">
                  People who Reported
                </h1>
              </div>
              <div className="max-h-[80%] overflow-y-auto w-full px-14">
                {communityPostDataById?.reportedCommunityPosts?.map(
                  (element, index) => (
                    <ReportedPersonCommunityPost data={element} key={index} />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPostReports;
