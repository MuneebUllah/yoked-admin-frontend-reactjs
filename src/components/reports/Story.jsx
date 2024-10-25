import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineFlag } from "react-icons/hi2";
import useReport from "../../pages/reports/useHook";
import Pagination from "../pagination/Pagination";
import  dummyPosts  from "../../assets/images/images.png";

const Story = ({ reportStoriesData, setReportStoriesData }) => {
  const navigate = useNavigate();
  const { reportStories } = useReport()

  const limit = 10;

  function fetchNextRecords(offset) {
    reportStories(setReportStoriesData ,  limit , offset)
  }
  
  return (
    <div className="w-full relative">
    <div className="w-full flex flex-wrap gap-4 pb-2 px-4">
    {reportStoriesData?.reportedStories?.map((post , index) => {
                return(
    <div
      className="bg-white  border border-[#E2E8F0] rounded-3xl w-[420px] h-[520px] my-2 p-3 cursor-pointer"
      key={index}
      onClick={() => {
        navigate("/reports/story", { state: { postData: post } });
      }}
    >
      <video src={post?.mediaUrl ? post?.mediaUrl : dummyPosts} alt="post " className="h-[85%] w-full " muted autoPlay/>
      <div className="flex flex-row justify-between pt-4">
        <div className="flex flex-row items-center gap-4">
          <div className="border border-[#2E4D55] rounded-full p-[1px]">
            <img
              src={post?.user?.image ? post?.user?.image :dummyPosts }
              alt="avatar "
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div>
            <h1 className="text-base font-semibold">{post?.user?.name}</h1>
            <p className="text-xs font-normal">{post?.user?.username}</p>
          </div>
        </div>
        <div className="bg-[#E6ABA6] rounded-full h-10 w-10 flex justify-center items-center">
          <HiOutlineFlag color="#ffffff" size={20} />
        </div>
      </div>
    </div>
  )})}
    </div>
    <div className='absolute -bottom-28 pb-6 w-full'>
    <Fragment >
          <Pagination totalRecords={reportStoriesData?.count} perPage={limit} handleFetchNextRecords={fetchNextRecords} />
        </Fragment>
    </div>
    </div>
  );
};

export default Story;
