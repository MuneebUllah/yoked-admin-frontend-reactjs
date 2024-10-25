import React, { useEffect, useState } from "react";
import { colors } from "../../helpers/constants";
import Post from "../../components/reports/Post";
import Story from "../../components/reports/Story";
import CommunintyPost from "../../components/reports/CommunityPost";
import useReport from "./useHook";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setActiveReportButton } from "../../redux/slices/userSlice";
import DatePicker from "react-datepicker";

export const Report = () => {
  const [reportPostData, setReportPostData] = useState({})
  const [reportReelData, setReportReelData] = useState({})
  const [reportStoriesData, setReportStoriesData] = useState([])
  const [reportCommunityPostData, setReportCommunityData] = useState([])
  const { reportPost, reportStories, reportCommunityPosts } = useReport()
  const { isLoading } = useSelector((state) => state.user);
  const { activeReportButton } = useSelector((state) => state.user);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    reset()
  }, [])
  const dispatch = useDispatch()

  const handleButtonClick = (title) => {
    dispatch(setActiveReportButton(title));
  };

  const search = () => {
    reportPost(setReportPostData, startDate, endDate)
    reportStories(setReportStoriesData, startDate, endDate)
    reportCommunityPosts(setReportCommunityData, startDate, endDate)
  }
  const reset = () => {
    setEndDate(null)
    setStartDate(null)
    reportPost(setReportPostData)
    reportStories(setReportStoriesData)
    reportCommunityPosts(setReportCommunityData)
    // reportReel(setReportReelData, startDate,endDate)
  }

  console.log(reportCommunityPostData , reportPostData , reportStoriesData);
  return (
    <div className="w-full h-auto flex justify-center items-center">
      {
        isLoading ? <Loader /> : (
          <div className="w-11/12 h-auto pt-10 flex flex-col gap-4 ">
            <div className="bg-white h-24 w-full rounded-lg flex flex-row px-5 gap-1 items-center">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy/MM/dd"
                placeholderText="Select start date"
                className="border border-[#E2E8F0] bg-none outline-none p-3.5 rounded-md w-full bg-transparent text-[#808D9E] pe-2"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="yyyy/MM/dd"
                placeholderText="Select end date"
                className="border border-[#E2E8F0] bg-none outline-none p-3.5 rounded-md w-full bg-transparent text-[#808D9E] pe-2"
              />
              <button
                className={`bg-[${colors.orange}] text-white rounded-full p-3.5 w-1/6 h-14 font-bold ms-1`}
                onClick={search}
              >
                Filter
              </button>
              <button
                className={`bg-[#E2E8F0] text-[#808D9E] rounded-full p-3.5 w-1/6 h-14  font-bold`}
                onClick={reset}
              >
                Reset
              </button>
            </div>
            <h1 className="text-lg font-medium">Reports</h1>
            <div className="bg-white w-full rounded-lg flex flex-col px-5 gap-2 ">
              <div className=" py-10 flex items-end gap-3">
                <button
                  onClick={() => {
                    handleButtonClick('posts')
                  }}
                  className={`py-3.5 px-7 ${activeReportButton === "posts"
                    ? "bg-[#84C1C2] text-white font-semibold"
                    : "bg-[#EAECF0] text-[#ADB5BD] font-normal"
                    } rounded-md  text-lg `}
                  activeReportButton={activeReportButton === 'posts'}
                >
                  Posts
                </button>
                <button
                  onClick={() => {
                    handleButtonClick('communityPosts')
                  }}
                  className={`py-3.5 px-7 ${activeReportButton === "communityPosts"
                    ? "bg-[#84C1C2] text-white font-semibold"
                    : "bg-[#EAECF0] text-[#ADB5BD] font-normal"
                    } rounded-md  text-lg `}
                  activeReportButton={activeReportButton === 'communityPosts'}
                >
                  Stories
                </button>
                <button
                  onClick={() => {
                    handleButtonClick('stories')
                  }}
                  activeReportButton={activeReportButton === 'stories'}
                  className={`py-3.5 px-7 ${activeReportButton === "stories"
                    ? "bg-[#84C1C2] text-white font-semibold"
                    : "bg-[#EAECF0] text-[#ADB5BD] font-normal"
                    } rounded-md  text-lg `}
                >
                  Community Posts
                </button>
              </div>
              <div className="flex flex-wrap gap-4 pb-2 px-4">
                {activeReportButton === "posts" &&
                  (
                    reportPostData?.reportedPosts?.length > 0 ?
                     ( <Post reportPostData={reportPostData} setReportPostData={setReportPostData} />
                     ) : (<div className="w-full text-center">
                          <h1 className='text-lg font-semibold text-center pb-4'>No Data Found</h1>
                        </div>)
                  )}
                {activeReportButton === "stories" &&
                  (reportCommunityPostData?.reportedCommunityPosts?.length > 0 ?
                   ( <CommunintyPost reportCommunityPostData={reportCommunityPostData} setReportCommunityData={setReportCommunityData} />
                   ) :( <div className="w-full text-center">
                          <h1 className='text-lg font-semibold text-center pb-4'>No Data Found</h1>
                        </div>))
                }
                {activeReportButton === "communityPosts" &&
                  (
                    reportStoriesData?.reportedStories?.length > 0 ?
                     ( <Story reportStoriesData={reportStoriesData} setReportStoriesData={setReportStoriesData} />
                      ):( <div className="w-full text-center">
                          <h1 className='text-lg font-semibold text-center pb-4'>No Data Found</h1>
                        </div>))
                }
              </div>
            </div>
          </div>
        )}
    </div>
  );
};