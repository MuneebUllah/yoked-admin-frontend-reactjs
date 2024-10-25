import React, { Fragment, useEffect, useState } from "react";
import { colors } from "../../helpers/constants";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import medal from "../../assets/images/medal.png";
import like100 from "../../assets/images/100.png";
import buildReacton from "../../assets/images/buildReaction.png";
import dummyImg from '../../assets/images/dummy-profile-pic.png';
import { MdDoNotDisturbAlt } from "react-icons/md";
import useCommunity from "./useHook";
import dummyPost from '../../assets/images/images.png';
import Pagination from "../../components/pagination/Pagination";

const CommunityPostReactions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {};
  const [postData, setPostData] = useState(null);
  const [postReactionData, setPostReactionData] = useState(null);
  const { communityPostBlockApi, communityPostUnBlockApi, communityPostReaction } = useCommunity();

  useEffect(() => {
    if (state) {
      setPostData(state.postData);
    }
  }, [state]);

  useEffect(() => {
    if (postData) {
      communityPostReaction(postData?.id, setPostReactionData);
    }
  }, [postData, communityPostReaction]);

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

  const limit = 100;
  const fetchNextRecords = (offset) => {
    communityPostReaction(postData?.id, setPostReactionData, limit, offset);
  };

  const filteredReactions = (reactionType) => {
    return postReactionData?.communityPostReaction?.filter(reaction => reaction.reaction === reactionType) || [];
  };

  return (
    <div className="w-full h-full flex justify-center items-center pb-11">
      {postData && (
        <div className="w-11/12 h-full pt-10 flex flex-col gap-4 ">
          <div className="flex flex-row items-center gap-4">
            <div
              onClick={() => navigate(-1)}
              className={`bg-[${colors.orange}] h-9 w-9 rounded-full flex justify-center items-center cursor-pointer`}
            >
              <FaArrowLeft size={22} color="white" />
            </div>
            <h1 className="text-lg font-medium">Community Post</h1>
          </div>
          <h1 className="text-lg font-medium mt-5">{postData?.user?.name}</h1>
          <div className="w-full bg-white rounded-lg px-6 overflow-y-auto pb-5">
            <div className=" w-full px-2 flex flex-row border-b-2 border-b-[#F1F5F9] py-6">
              <div className="w-1/12 h-full">
                <img
                  src={postData?.communityPostImages[0]?.image || dummyPost}
                  className="w-32 h-32 rounded-xl"
                  alt="avatar"
                />
              </div>
              <div className="w-9/12 h-full montserrat px-4 py-4 flex flex-row">
                <div className="flex flex-col gap-6 ">
                  <div className="flex flex-row gap-4 items-center ">
                    <div className="border border-[#2E4D55] rounded-full p-[1px]">
                      <img
                        src={postData?.user?.image}
                        alt="avatar"
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                    <div className="text-black">
                      <h1 className="text-xl font-semibold">{postData?.user?.name}</h1>
                      <p className="text-sm font-normal">{postData?.user?.username}</p>
                    </div>
                  </div>
                  <p className="text-lg font-medium text-[#434343]">
                    {postData?.description}
                  </p>
                </div>
              </div>
              <div className="h-full flex justify-end">
                <button
                  onClick={() => blockUnblockToggle(postData.id, postData.isBlocked)}
                  className={`text-white inline-flex items-center gap-2 text-sm font-semibold rounded-full border py-3 px-7 ${postData?.isBlocked ? "bg-[#808D9E]" : "bg-[#252D31]"}`}
                >
                  <MdDoNotDisturbAlt size={15} color="white" />
                  {postData?.isBlocked ? "Unblock Post" : "Block Post"}
                </button>
              </div>
            </div>
            <div className="w-full ">
              <div className="w-full h-[90%] flex flex-row p-custom-scrollbar-8 gap-12 overflow-auto">
                {['champ', 'hundred', 'lift', 'muscle', 'bulk'].map((reactionType, index) => (
                  <div key={index} className="w-1/3 h-full flex flex-col items-center">
                    <div className="py-6 flex w-full flex-row gap-4 items-start px-2 cursor-pointer">
                      <img src={
                        reactionType === 'champ' ? medal :
                        reactionType === 'hundred' ? like100 :
                        buildReacton
                      } alt="avatar" className="h-9 w-9" />
                      <h1 className={`text-${reactionType === 'champ' ? '[#FFBA57]' : reactionType === 'hundred' ? '[#EC1C24]' : '[#214469]'} text-base font-semibold montserrat`}>
                        Liked
                        <span className="text-[#808D9E]"> {`(${filteredReactions(reactionType).length})`}</span>
                      </h1>
                    </div>
                    <div className="flex w-full flex-col gap-2">
                      {filteredReactions(reactionType).map((reaction, index) => (
                        <div key={index} className="flex flex-row gap-4 items-center montserrat">
                          <img
                            src={reaction?.user?.image || dummyImg}
                            alt="avatar"
                            className="h-8 w-8 rounded-full"
                          />
                          <div className="text-black">
                            <h1 className="text-sm font-medium">{reaction?.user?.name}</h1>
                            <p className="text-xs font-normal">{reaction?.user?.username}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Fragment>
            <Pagination totalRecords={postReactionData?.count} perPage={limit} handleFetchNextRecords={fetchNextRecords} />
          </Fragment>
        </div>
      )}
    </div>
  );
};

export default CommunityPostReactions;
