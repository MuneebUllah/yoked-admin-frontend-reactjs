import React, { useState, useEffect } from "react";
import { colors } from "../../helpers/constants";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDoNotDisturbAlt } from "react-icons/md";
import ReportedPerson from "../../components/reports/ReportedPerson";
import dummyImg from '../../assets/images/dummy-profile-pic.png'
import useReport from "./useHook";

const StoryReports = () => {
  const [postData, setPostData] = useState()
  const [storyDataById, setStoryDataById] = useState()
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { storiesBlockApi, storiesUnBlockApi , reportStoriesById } = useReport()

  useEffect(() => {
    if (state?.postData) {
      setPostData(state.postData);
    }
  }, [state]);


  const blockUnblockToggle = (id, isBlocked) => {
    if (isBlocked) {
      storiesUnBlockApi(id).then(() => {
        setPostData((prevPostData) => ({
          ...prevPostData,
          isBlocked: false
        }));
      });
    } else {
      storiesBlockApi(id).then(() => {
        setPostData((prevPostData) => ({
          ...prevPostData,
          isBlocked: true
        }));
      });
    }
  };

  useEffect(() => {
    if(postData?.id){
      reportStoriesById(postData?.id ,setStoryDataById )
    }
  }, [postData?.id]);
  return (
    <div className="w-full min-h-full flex justify-center items-center pb-8">
      {
        postData && (
          <div className="w-11/12 pt-10 flex flex-col gap-4 ">
            <div className="flex flex-row items-center gap-4">
              <div
                onClick={() => {
                  navigate(-1);
                }}
                className={`bg-[${colors.orange}] h-9 w-9 rounded-full flex justify-center items-center cursor-pointer`}
              >
                <FaArrowLeft size={22} color="white" />
              </div>
              <h1 className="text-lg font-medium">Stories</h1>
            </div>
            <h1 className="text-lg font-medium mt-5">{`Total Reports (${storyDataById?.count})`}</h1>
            <div className="w-full min-h-[85%] bg-white rounded-lg  py-6 flex flex-row ">
              <div className=" w-[30%] h-full  px-6 ">
                <video
                  src={postData?.mediaUrl ? postData?.mediaUrl : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                  alt="avatar"
                  muted
                  autoPlay
                  className="h-[30rem] w-full object-contain"
                />
                <div className="flex flex-row gap-4 items-center my-7 ms-4">
                  <img
                    src={postData?.user?.image ? postData?.user?.image : dummyImg}
                    alt="avatar "
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="text-black">
                    <h1 className="text-base font-semibold ">{postData?.user?.name}</h1>
                    <p className="text-xs font-normal ">{postData?.user?.username}</p>
                  </div>
                </div>
              </div>
              <div className=" w-[55%] h-full montserrat ">
                <div className="flex flex-row justify-between items-center pt-10  ps-10">
                  <h1 className="text-base font-semibold montserrat">
                    People who Reported
                  </h1>
                </div>
                <div className="min-h-[90%] w-full ps-10 divide-y divide-[#EAECF0]">
                  {storyDataById?.reportedStories?.map((element , index) => {
                    return <ReportedPerson data={element} key={index}/>;
                  })}
                </div>
              </div>
              <div className="w-[15%] mr-8">
                <button
                  onClick={() => blockUnblockToggle(postData?.id, postData?.isBlocked)}
                  className={`text-white inline-flex items-center gap-2 text-sm font-semibold rounded-full border py-3 px-7 ${postData?.isBlocked ? "bg-[#808D9E]" : "bg-[#252D31]"
                    }`}
                >
                  <MdDoNotDisturbAlt size={15} color="white" />
                  {postData?.isBlocked ? "Unblock Story" : "Block Story"}
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default StoryReports;
