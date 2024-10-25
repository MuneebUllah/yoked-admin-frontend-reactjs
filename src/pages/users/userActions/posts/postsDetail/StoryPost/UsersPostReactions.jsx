import React, { Fragment, useEffect, useState } from "react";
import { colors } from "../../../../../../helpers/constants";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import medal from "../../../../../../assets/images/medal.png";
import like100 from "../../../../../../assets/images/100.png";
import buildReacton from "../../../../../../assets/images/buildReaction.png";
import useHook from "../../useHook";
import { MdDoNotDisturbAlt } from "react-icons/md";
import Loader from "../../../../../../components/loader/Loader";
import dummyImg from '../../../../../../assets/images/dummy-profile-pic.png'
import { useSelector } from "react-redux";
import Pagination from "../../../../../../components/pagination/Pagination";

const UsersPostReactions = () => {
  const [postReactionData, setPostReactionData] = useState([])
  const [postData, setPostData] = useState([])
  const { postBlockApi, postUnBlockApi } = useHook();
  const { isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { postReactionApi, postByIdApi } = useHook()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      postReactionApi(id, setPostReactionData)
      postByIdApi(id, setPostData)
    }
  }, [])

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

  if (!postReactionData) {
    // Handle the case where postData is null or undefined
    return <div>No post data available</div>;
  }

  const limit = 100;
  function fetchNextRecords(offset) {
    postReactionApi(id, setPostData, limit, offset);
  }


  const filteredReactions100 = postReactionData?.data?.filter(reaction => reaction?.reaction === "hundred");
  const filteredReactionsmedal = postReactionData?.data?.filter(reaction => reaction?.reaction === "champ");
  const filteredReactionsbuild = postReactionData?.data?.filter(reaction => reaction?.reaction === "lift");
  const filteredReactionsMuscle = postReactionData?.data?.filter(reaction => reaction?.reaction === "muscle");
  const filteredReactionsBulk = postReactionData?.data?.filter(reaction => reaction?.reaction === "bulk");

  // Calculate the total number of items in the filtered array
  const totalFilteredReactions100 = filteredReactions100?.length;
  const totalFilteredReactionsmedal = filteredReactionsmedal?.length;
  const totalFilteredReactionsbuild = filteredReactionsbuild?.length;
  const totalFilteredReactionsMuscle = filteredReactionsMuscle?.length;
  const totalFilteredReactionsBulk = filteredReactionsBulk?.length;

  return (
    <div className="w-full h-auto pt-6 flex justify-center items-center">
      {isLoading ?
        <Loader /> :
        (
          <div className="w-11/12 h-full pt-10 flex flex-col gap-4 " >
            <div className="flex flex-row items-center gap-4">
              <div
                onClick={() => {
                  navigate(-1);
                }}
                className={`bg-[${colors.orange}] h-9 w-9 rounded-full flex justify-center items-center cursor-pointer`}
              >
                <FaArrowLeft size={22} color="white" />
              </div>
              <h1 className="text-lg font-medium">Post</h1>
            </div>
            <h1 className="text-lg font-medium mt-5">{postData?.user?.name}</h1>
            <div className="w-full h-3/4 bg-white rounded-lg px-8 pb-8">
              <div className=" w-full px-2 flex flex-row border-b-2 border-b-[#E2E8F0] py-6">
                  <div className="w-1/12 h-full">
                    <img
                      src={postData?.postImages ? postData?.postImages[0]?.image : dummyImg}
                      className="w-[130px] h-[132px] rounded-xl"
                      alt="avatar"
                    />
                  </div>
                  <div className="w-3/4 h-full montserrat px-8 py-4 flex flex-row">
                    <div className="flex flex-col gap-6 pe-6 w-1/2">
                      <div className="flex flex-row gap-4 items-center ">
                        <div className="border border-[#2E4D55] rounded-full p-[1px]">
                          <img
                            src={postData?.user?.image ? postData?.user?.image : dummyImg}
                            alt="avatar "
                            className="h-10 w-10 rounded-full"
                          />
                        </div>
                        <div className="text-black">
                          <h1 className="text-base font-semibold ">{postData?.user?.name}</h1>
                          <p className="text-xs font-normal ">{postData?.user?.username}</p>
                        </div>
                      </div>
                      <p className="text-lg font-medium break-words text-[#434343]">
                        {postData.caption}
                      </p>
                    </div>
                    <div className="my-auto w-1/2">
                      {
                        postData?.taggedPeople?.length > 0 ?
                          <>
                            <h1 className="text-xl font-semibold mx-1 my-2">
                              Tagged Users
                            </h1>
                            <div className="flex flex-row gap-4 items-center flex-wrap">
                              {postData?.taggedPeople?.map((items, index) => {
                                return (
                                  <div key={index} className="flex gap-4">
                                    <img
                                      src={items?.TaggedUser?.image || dummyImg}
                                      alt="avatar "
                                      className="h-10 w-10 rounded-full"
                                    />
                                    <div className="text-black">
                                      <h3 className="text-lg font-semibold ">{items?.TaggedUser?.name ? items?.TaggedUser?.name : 'Name'}</h3>
                                      <p className="text-sm font-normal ">{items?.TaggedUser?.username ? items?.TaggedUser?.username : 'User Name'}</p>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </> : ''
                      }
                    </div>
                  </div>
                  <div>
                      <button
                        onClick={() => blockUnblockToggle(postData.id, postData.isBlocked)}
                        className={`text-white inline-flex items-center gap-2 text-sm font-semibold rounded-full border py-3 px-7 ${postData.isBlocked ? "bg-[#808D9E]" : "bg-[#252D31]"
                          }`}
                      >
                        <MdDoNotDisturbAlt size={15} color="white" />
                        {postData.isBlocked ? "Unblock Post" : "Block Post"}
                      </button>
                    </div>
              </div>
              <div className="w-full h-auto overflow-y-auto">
                  <div className="w-full h-[90%]  flex flex-row p-custom-scrollbar-8 gap-12 overflow-auto">
                    <div className="w-1/3 h-full flex flex-col items-center">
                      <div className="py-6 flex w-full flex-row gap-4 items-start px-2 cursor-pointer">
                        <img src={medal} alt="avatar " className="h-9 w-7" />
                        <h1 className="text-[#FFBA57] text-base font-semibold montserrat">
                          Liked
                          <span className="text-[#808D9E]"> {`(${totalFilteredReactionsmedal})`}</span>
                        </h1>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        {filteredReactionsmedal
                          ?.map((reaction, index) => {
                            return (
                              <div className="flex flex-row gap-4 items-center montserrat" key={index}>
                                <img
                                  src={reaction?.user.image}
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
                    <div className="w-1/3 h-full flex flex-col items-center">
                      <div className="py-6 flex flex-row gap-4 items-center px-2 cursor-pointer">
                        <img src={like100} alt="avatar " className="h-8 w-9 " />
                        <h1 className="text-[#EC1C24] text-base font-semibold montserrat">
                          Liked
                          <span className="text-[#808D9E]">{` (${totalFilteredReactions100})`}</span>
                        </h1>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        {filteredReactions100
                          ?.map((reaction, index) => {
                            return (
                              <div className="flex flex-row gap-4 items-center montserrat" key={index}>
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
                    <div className="w-1/3 h-full flex flex-col items-center">
                      <div className="py-6 flex flex-row gap-4 items-center px-2 cursor-pointer">
                        <img
                          src={buildReacton}
                          alt="avatar "
                          className="h-9 w-9 "
                        />
                        <h1 className="text-[#214469] text-base font-semibold montserrat">
                          Liked
                          <span className="text-[#808D9E]">{` (${totalFilteredReactionsbuild})`}</span>
                        </h1>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        {filteredReactionsbuild
                          ?.map((reaction, index) => {
                            return (
                              <div className="flex flex-row gap-4 items-center montserrat" key={index}>
                                <img
                                  src={reaction?.user?.image ? reaction?.user?.image : dummyImg}
                                  alt="avatar "
                                  className="h-8 w-8 rounded-full"
                                />
                                <div className="text-black">
                                  <h1 className="text-sm font-medium ">
                                    {reaction.name}
                                  </h1>
                                  <p className="text-xs font-normal ">
                                    {reaction.username}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className="w-1/3 h-full flex flex-col items-center">
                      <div className="py-6 flex flex-row gap-4 items-center px-2 cursor-pointer">
                        <img src={like100} alt="avatar " className="h-8 w-9 " />
                        <h1 className="text-[#EC1C24] text-base font-semibold montserrat">
                          Liked
                          <span className="text-[#808D9E]">{` (${totalFilteredReactionsMuscle})`}</span>
                        </h1>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        {filteredReactionsMuscle
                          ?.map((reaction, index) => {
                            return (
                              <div className="flex flex-row gap-4 items-center montserrat" key={index}>
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
                    <div className="w-1/3 h-full flex flex-col items-center">
                      <div className="py-6 flex flex-row gap-4 items-center px-2 cursor-pointer">
                        <img
                          src={buildReacton}
                          alt="avatar "
                          className="h-9 w-9 "
                        />
                        <h1 className="text-[#214469] text-base font-semibold montserrat">
                          Liked
                          <span className="text-[#808D9E]">{` (${totalFilteredReactionsBulk})`}</span>
                        </h1>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        {filteredReactionsBulk
                          ?.map((reaction, index) => {
                            return (
                              <div className="flex flex-row gap-4 items-center montserrat" key={index}>
                                <img
                                  src={reaction?.user?.image ? reaction?.user?.image : dummyImg}
                                  alt="avatar "
                                  className="h-8 w-8 rounded-full"
                                />
                                <div className="text-black">
                                  <h1 className="text-sm font-medium ">
                                    {reaction.name}
                                  </h1>
                                  <p className="text-xs font-normal ">
                                    {reaction.username}
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
            <Fragment>
          <Pagination totalRecords={postReactionData.count} perPage={limit} handleFetchNextRecords={fetchNextRecords} />
        </Fragment>
          </div>
        )
      }
    </div>
  );
};

export default UsersPostReactions;
