import React, { Fragment, useEffect } from "react";
import { HiOutlineFlag } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import dummyImage from '../../assets/images/images.png'
import Pagination from "../pagination/Pagination";
import useReport from "../../pages/reports/useHook";

const Reel = ({ reportReelData, setReportReelData }) => {
  
  const navigate = useNavigate();
  const { reportReel } = useReport()

  const limit = 10;

  function fetchNextRecords(offset) {
    reportReel(setReportReelData, limit, offset)
  }

  const trimText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  return (
    <div className=" w-full flex-wrap gap-4 pb-2 px-4 relative">
      <div className="w-full flex flex-wrap gap-4 pb-2 px-4">
      {
        reportReelData?.reportedReels&&
        reportReelData?.reportedReels?.map((post , index) => {
          return (
            <div key={index}>
              <div
                className="bg-white  shadow-2xl rounded-3xl w-[320px] h-[430px] my-2 p-4 cursor-pointer"
                onClick={() => {
                  navigate("/reports/reel", { state: { id: post?.id } });
                }}
              >
                <video
                  src={post?.mediaUrl? post?.mediaUrl: dummyImage}
                  alt="post "
                  className="h-[70%] w-full rounded-t-3xl"
                />
                <div className="flex flex-row justify-between pt-4">
                  <div className="flex flex-row items-center gap-4">
                    <div className="border border-[#2E4D55] rounded-full p-[1px]">
                      <img
                        src={post?.user?.image}
                        alt="avatar "
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                    <div>
                      <h1 className="text-base font-semibold">{post?.user.name}</h1>
                      <p className="text-xs font-normal">{post?.user.username}</p>
                    </div>
                  </div>
                  <div className="bg-[#E6ABA6] rounded-full h-10 w-10 flex justify-center items-center">
                    <HiOutlineFlag color="#ffffff" size={20} />
                  </div>
                </div>
                 <p className="text-xs font-normal w-52 break-words p-1 my-2">
        {post?.caption && trimText(post?.caption , 10)}
      </p>
              </div>
            </div>
          )
        })}</div>
        <div className='absolute -bottom-28 pb-6 w-full'>
      <Fragment >
        <Pagination totalRecords={reportReelData?.count} perPage={limit} handleFetchNextRecords={fetchNextRecords} />
      </Fragment>
    </div>
    </div>
  );
};

export default Reel;
