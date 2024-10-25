import React, { Fragment } from "react";
import { HiOutlineFlag } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useReport from "../../pages/reports/useHook";
import Pagination from "../pagination/Pagination";
import dummyPost from '../../assets/images/images.png'

const CommunintyPost = ({ reportCommunityPostData, setReportCommunityData }) => {
  const navigate = useNavigate();
  const { reportCommunityPosts } = useReport()

  const limit = 10;

  function fetchNextRecords(offset) {
    reportCommunityPosts(setReportCommunityData,  limit, offset)
  }

  const trimText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };
  
  return (
    <div className="w-full relative">
      <div className="w-full flex flex-wrap gap-4 pb-2 px-4">
        {reportCommunityPostData?.reportedCommunityPosts?.map((post , index) => {
          return (
            <div key={index}>
              <div
                className="bg-white  shadow-2xl rounded-3xl w-[320px] h-[430px] my-2 p-4 cursor-pointer"
                onClick={() => {
                  navigate("/reports/community-post", { state: { id: post?.id } });
                }}
              >
                <img
                  src={post?.communityPostImages[0]?.image ||dummyPost}
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
                      <h1 className="text-base font-semibold">{post?.user?.name}</h1>
                      <p className="text-xs font-normal">{post?.title}</p>
                    </div>
                  </div>
                  <div className="bg-[#E6ABA6] rounded-full h-10 w-10 flex justify-center items-center">
                    <HiOutlineFlag color="#ffffff" size={20} />
                  </div>
                </div>
                <p className="text-xs font-normal p-1 my-2">
                  {post?.description && trimText(post?.description, 10)}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      <div className='absolute -bottom-28 pb-6 w-full'>
        <Fragment >
          <Pagination totalRecords={reportCommunityPostData?.count} perPage={limit} handleFetchNextRecords={fetchNextRecords} />
        </Fragment>
      </div>
    </div>
  );
};

export default CommunintyPost;
