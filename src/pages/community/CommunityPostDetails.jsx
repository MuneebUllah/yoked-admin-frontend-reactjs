import React, { useEffect, useState } from "react";
import { colors } from "../../helpers/constants";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import medal from "../../assets/images/medal.png";
import Comment from "../../components/community/Comment";
import { MdDoNotDisturbAlt } from "react-icons/md";
import useCommunity from "./useHook";
import dummyImg from '../../assets/images/images.png'

const CommunityPostDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { communityPostBlockApi, communityPostUnBlockApi ,communityPostComments ,  communityPostReaction} = useCommunity()
  const [postData, setPostData] = useState(null);
  const [postCommentsData , setPostCommentsData] = useState([])

  useEffect(() => {
    if (state?.postData) {
      setPostData(state.postData);
    }
  }, [state]);
  useEffect(()=>{
    if(postData){
      communityPostComments(postData?.id , setPostCommentsData)
    }
  },[postData])

  const blockUnblockToggle = (id, isBlocked) => {
    if (isBlocked) {
      communityPostUnBlockApi(id).then(() => {
        setPostData((prevPostData) => ({
          ...prevPostData,
          isBlocked: false
        }));
      });
    } else {
      communityPostBlockApi(id).then(() => {
        setPostData((prevPostData) => ({
          ...prevPostData,
          isBlocked: true
        }));
      });
    }
  };  
  
  return (
    <div className="w-full min-h-full flex justify-center items-center pb-11">
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
        <h1 className="text-lg font-medium mt-5">{state.postData?.user?.name}</h1>
        <div className="w-full h-[85%] bg-white rounded-lg  py-16 flex flex-row divide-x divide-[#E2E8F0]">
          <div className="  w-2/5  h-full px-10">
            <img
              src={state?.postData?.communityPostImages[0]?.image ? state?.postData?.communityPostImages[0]?.image: dummyImg}
              alt="avatar "
              className="h-64 w-full object-contain"
            />
            <div className="w-full pt-8 px-2 flex flex-col gap-5">
              <h1 className="text-black text-xl font-semibold montserrat">
                {state.postData?.title}
              </h1>
              <p className="text-black text-base break-words font-medium montserrat">
                {state.postData?.description}
              </p>
            </div>
            <div
              className="py-6 flex flex-row gap-6 items-center px-2 cursor-pointer"
              onClick={() => {
                navigate("/community/post/reactions", { state: { postData  } });
              }}
            >
              <img src={medal} alt="avatar " className="h-9 w-7 " />
              <h1 className="text-[#FFBA57] text-base font-semibold montserrat">
                Liked
                <span className="text-[#808D9E]"> {`(${state.postData?.totalReactions})`}</span>
              </h1>
            </div>
          </div>
          <div className=" w-3/5 2xl:w-1/2 h-full">
            <div className="flex flex-row justify-between items-center py-1 px-10">
              <h1 className="text-xl font-semibold">{`All Comments (${postData?.totalComments})`}</h1>
              <button
                onClick={() => blockUnblockToggle(state.postData.id, postData.isBlocked)}
                className={`text-white inline-flex items-center gap-2 text-sm font-semibold rounded-full border py-3 px-7 ${postData?.isBlocked ? "bg-[#808D9E]" : "bg-[#252D31]"
                  }`}
              >
                <MdDoNotDisturbAlt size={15} color="white" />
                {postData?.isBlocked ? "Unblock Post" : "Block Post"}
              </button>
            </div>
            <div className="h-[29rem] overflow-y-auto w-full px-5 2xl:px-10 py-5 ">
            {
              postCommentsData?.map((item ,index)=>{
                return <Comment  data={item} key={index}/>
              })
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostDetails;
