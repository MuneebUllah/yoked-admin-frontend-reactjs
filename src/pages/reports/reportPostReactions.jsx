import React, { useEffect, useState } from "react";
import { colors } from "../../helpers/constants";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import medal from "../../assets/images/medal.png";
import like100 from "../../assets/images/100.png";
import buildReacton from "../../assets/images/buildReaction.png";
import dummyImg from '../../assets/images/dummy-profile-pic.png'
import { MdDoNotDisturbAlt } from "react-icons/md";
import dummyPost from '../../assets/images/images.png'
import usePost from "../users/userActions/posts/useHook";

const ReportPostReactions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {  state } = location || {};
  const [postData, setPostData] = useState(null);
  const [postReactionData, setPostReactionData] = useState(null);
  const {postBlockApi , postUnBlockApi , postReactionApi , postByIdApi} = usePost()

  useEffect(() => {
    if(state){
    postReactionApi(state?.id, setPostReactionData);
    postByIdApi(state?.id , setPostData)
  }
}, [state]);

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
  
  const filteredReactions100 =postReactionData ? postReactionData?.data?.filter(reaction => reaction?.reaction === "hundred") : [];
  const filteredReactionsmedal =postReactionData ? postReactionData?.data?.filter(reaction => reaction?.reaction === "champ") : [];
  const filteredReactionsbuild =postReactionData ? postReactionData?.data?.filter(reaction => reaction?.reaction === "lift") : [];
  const filteredReactionsMuscle =postReactionData ? postReactionData?.data?.filter(reaction => reaction?.reaction === "muscle") : [];
  const filteredReactionsBulk =postReactionData ? postReactionData?.data?.filter(reaction => reaction?.reaction === "bulk") : [];
  
  // Calculate the total number of items in the filtered array
  const totalFilteredReactions100 = filteredReactions100?.length;
  const totalFilteredReactionsmedal = filteredReactionsmedal?.length;
  const totalFilteredReactionsbuild = filteredReactionsbuild?.length;
  const totalFilteredReactionsMuscle = filteredReactionsMuscle?.length;
  const totalFilteredReactionsBulk = filteredReactionsBulk?.length;

  return (
    <div className="w-full h-full flex justify-center items-center pb-11">
    {
      postReactionData && (
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
        <h1 className="text-lg font-medium mt-5">{postData?.user?.name || postReactionData?.communityPost?.user?.name}</h1>
        <div className="w-full min-h-[85%] bg-white rounded-lg px-2 2xl:px-8 overflow-y-auto pb-5">
          <div className=" w-full px-2 flex flex-row border-b-2 border-b-[#F1F5F9] py-6">
            <div className="w-1/12 h-full">
              <img
                src={postData?.postImages[0]?.image || dummyPost}
                className="w-32 h-32 rounded-xl"
                alt="avatar"
              />
            </div>
            <div className="w-9/12 h-full montserrat px-4 2xl:px-8 py-4 flex items-start justify-between flex-row">
              <div className="flex flex-col gap-6 2xl:pe-6">
                <div className="flex flex-row gap-4 items-center ">
                  <div className="border border-[#2E4D55] rounded-full p-[1px]">
                    <img
                      src={postData?.user?.image || postReactionData?.user?.image}
                      alt="avatar "
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div className="text-black">
                    <h1 className="text-xl font-semibold ">{postData?.user?.name || postReactionData?.user?.name}</h1>
                    <p className="text-sm font-normal ">{postData?.user?.username || postReactionData?.user?.username}</p>
                  </div>
                </div>
                <p className="text-lg font-medium text-[#434343]">
                {postData?.description || postData?.caption }
                </p>
              </div>
            </div>

            <div className="h-full flex justify-end">
              <button
                onClick={() => blockUnblockToggle(postData?.id, postData?.isBlocked )}
                className={`text-white inline-flex items-center gap-2 text-sm font-semibold rounded-full border py-3 px-7 ${postData?.isBlocked ? "bg-[#808D9E]" : "bg-[#252D31]"
                  }`}
              >
                <MdDoNotDisturbAlt size={15} color="white" />
                {postData?.isBlocked ? "Unblock Post" : "Block Post"}
              </button>
            </div>
          </div>
          <div className="w-full ">
              <div className="w-full h-[90%]  flex flex-row p-custom-scrollbar-8 gap-12 overflow-auto">
                <div className="w-1/3 h-full flex flex-col items-start px-2">
                  <div className="py-6 flex w-full flex-row gap-4 items-start px-2 cursor-pointer">
                    <img src={medal} alt="avatar " className="h-9 w-7" />
                    <h1 className="text-[#FFBA57] text-base font-semibold montserrat">
                      Liked
                      <span className="text-[#808D9E]"> {`(${totalFilteredReactionsmedal})`}</span>
                    </h1>
                  </div>
                  <div className="flex flex-col gap-2">
                    {
                      filteredReactionsmedal
                      ?.map((reaction , index) => {
                        return (
                          <div key={index} className="flex flex-row gap-4 items-center montserrat px-2">
                            <img
                              src={reaction?.user?.image ? reaction?.user?.image : dummyImg}
                              alt="avatar "
                              className="h-8 w-8 rounded-full"
                            />
                            <div className="text-black">
                              <h1 className="text-sm font-medium ">
                                {reaction?.user?.name}
                              </h1>
                              <p className="text-xs font-normal ">
                                {reaction?.user?.username}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="w-1/3 h-full flex flex-col items-start">
                  <div className="py-6 flex flex-row gap-4 items-center px-2 cursor-pointer">
                    <img src={like100} alt="avatar " className="h-8 w-9 " />
                    <h1 className="text-[#EC1C24] text-base font-semibold montserrat">
                      Liked
                      <span className="text-[#808D9E]">{` (${totalFilteredReactions100})`}</span>
                    </h1>
                  </div>
                  <div className="flex flex-col gap-2">
                    {filteredReactions100
                      ?.map((reaction , index) => {
                        return (
                          <div key={index} className="flex flex-row gap-4 items-center montserrat px-2">
                            <img
                              src={reaction?.user?.image ? reaction?.user?.image : dummyImg}
                              alt="avatar "
                              className="h-8 w-8 rounded-full"
                            />
                            <div className="text-black">
                              <h1 className="text-sm font-medium ">
                                {reaction?.user?.name}
                              </h1>
                              <p className="text-xs font-normal ">
                                {reaction?.user?.username}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="w-1/3 h-full flex flex-col items-start">
                  <div className="py-6 flex flex-row gap-4 items-center px-2 cursor-pointer">
                    <img
                      src={buildReacton}
                      alt="avatar "
                      className="h-9 w-9 "
                    />
                    <h1 className="text-[#214469] text-base font-semibold montserrat px-2">
                      Liked
                      <span className="text-[#808D9E]"> {`(${totalFilteredReactionsbuild})`}</span>
                    </h1>
                  </div>
                  <div className="flex flex-col gap-2">
                    {filteredReactionsbuild
                      ?.map((reaction , index) => {
                        return (
                          <div key={index} className="flex flex-row gap-4 items-center montserrat">
                            <img
                              src={reaction?.user?.image ? reaction?.user?.image : dummyImg}
                              alt="avatar "
                              className="h-8 w-8 rounded-full"
                            />
                            <div className="text-black">
                              <h1 className="text-sm font-medium ">
                                {reaction?.user?.name}
                              </h1>
                              <p className="text-xs font-normal ">
                                {reaction?.user?.username}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="w-1/3 h-full flex flex-col items-start">
                  <div className="py-6 flex flex-row gap-4 items-center px-2 cursor-pointer">
                    <img src={like100} alt="avatar " className="h-8 w-9 " />
                    <h1 className="text-[#EC1C24] text-base font-semibold montserrat">
                      Liked
                      <span className="text-[#808D9E]">{` (${totalFilteredReactionsMuscle})`}</span>
                    </h1>
                  </div>
                  <div className="flex flex-col gap-2">
                    {filteredReactionsMuscle
                      ?.map((reaction , index) => {
                        return (
                          <div key={index} className="flex flex-row gap-4 items-center montserrat px-2">
                            <img
                              src={reaction?.user?.image ? reaction?.user?.image : dummyImg}
                              alt="avatar "
                              className="h-8 w-8 rounded-full"
                            />
                            <div className="text-black">
                              <h1 className="text-sm font-medium ">
                                {reaction?.user?.name}
                              </h1>
                              <p className="text-xs font-normal ">
                                {reaction?.user?.username}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="w-1/3 h-full flex flex-col items-start">
                  <div className="py-6 flex flex-row gap-4 items-center px-2 cursor-pointer">
                    <img
                      src={buildReacton}
                      alt="avatar "
                      className="h-9 w-9 "
                    />
                    <h1 className="text-[#214469] text-base font-semibold montserrat px-2">
                      Liked
                      <span className="text-[#808D9E]"> {`(${totalFilteredReactionsBulk})`}</span>
                    </h1>
                  </div>
                  <div className="flex flex-col gap-2">
                    {filteredReactionsBulk
                      ?.map((reaction , index) => {
                        return (
                          <div key={index} className="flex flex-row gap-4 items-center montserrat">
                            <img
                              src={reaction?.user?.image ? reaction?.user?.image : dummyImg}
                              alt="avatar "
                              className="h-8 w-8 rounded-full"
                            />
                            <div className="text-black">
                              <h1 className="text-sm font-medium ">
                                {reaction?.user?.name}
                              </h1>
                              <p className="text-xs font-normal ">
                                {reaction?.user?.username}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    )
    }
    </div>
  );
};

export default ReportPostReactions;
