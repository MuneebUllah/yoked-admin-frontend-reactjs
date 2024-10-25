import React, { useState, useEffect, useRef } from "react";
import { colors } from "../../helpers/constants";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import medal from "../../assets/images/medal.png";
import { MdDoNotDisturbAlt } from "react-icons/md";
import ReportedPerson from "../../components/reports/ReportedPerson";
import useReport from "./useHook";
import Loader from "../../components/loader/Loader";
import usePost from "../users/userActions/posts/useHook";
import { useSelector } from "react-redux";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './report.css';

const ReelReports = () => {
  const [postData, setPostData] = useState(null);
  const [postDataById, setPostDataById] = useState([])
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { reportReelById } = useReport()
  const { postBlockApi, postUnBlockApi, reelByIdApi } = usePost()
  const { isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (state) {
      reelByIdApi(state?.id, setPostData)
    }
  }, [state]);

  useEffect(() => {
    if (state) {
      reportReelById(state?.id, setPostDataById)
    }
  }, [postData])

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
        setPostDataById((prevPostData) => ({
          ...prevPostData,
          isBlocked: true
        }));
      });
    }
  };
  console.log(postDataById);
  return (
    <div className="w-full min-h-full flex justify-center items-center pb-11">
      {isLoading ?
        <Loader /> :
        postData && (
          <div className="w-11/12 min-h-full pt-10 flex flex-col gap-4 ">
            <div className="flex flex-row items-center gap-4">
              <div
                onClick={() => {
                  navigate(-1);
                }}
                className={`bg-[${colors.orange}] h-9 w-9 rounded-full flex justify-center items-center cursor-pointer`}
              >
                <FaArrowLeft size={22} color="white" />
              </div>
              <h1 className="text-lg font-medium">Posts</h1>
            </div>
            <h1 className="text-lg font-medium mt-5">{`Total Reports (${postDataById?.count})`}</h1>
            <div className="w-full min-h-[85%] bg-white rounded-lg gap-8  py-16 flex flex-row ">
              <div className=" w-[40%] min-h-full overflow-y-auto px-5 2xl:px-16 ">
                <video
                  src={postData?.mediaUrl}
                  alt="avatar "
                  className="h-64 w-full object-contain"
                />
                  <div className="w-full pt-8 px-1 flex flex-col pb-2">
                    <p className="text-black text-xs font-medium montserrat">
                      {postData?.caption}.
                    </p>
                </div>
   
                  <div
                    className="py-6 flex flex-row gap-6 items-center px-2 cursor-pointer"

                  >
                    <img src={medal} alt="avatar " className="h-9 w-7 " />
                    <h1 className="text-[#FFBA57] text-base font-semibold montserrat">
                      Liked
                      <span className="text-[#808D9E]">{` (${postData?.totalPRs})`}</span>
                    </h1>
                  </div>
                </div>
                <div className=" w-1/2 h-full montserrat ">
                  <div className="flex flex-row justify-between items-center py-1 px-10">
                    <h1 className="text-base font-semibold montserrat">
                      People who Reported
                    </h1>
                  </div>
                  <div className="max-h-[80%] overflow-y-auto w-full px-10 py-5 divide-y divide-[#EAECF0]">
                    {postDataById?.reportedReels?.map((element, index) => {
                      return <ReportedPerson data={element} key={index} />;
                    })}
                  </div>
                </div>
              {/* </div> */}
              <div className="w-56  text-end mr-8">
                <button
                  onClick={() => blockUnblockToggle(postData?.id, postData?.isBlocked)}
                  className={`text-white inline-flex items-center gap-2 text-sm font-semibold rounded-full border py-3 px-7 ${postData?.isBlocked ? "bg-[#808D9E]" : "bg-[#252D31]"
                    }`}
                >
                  <MdDoNotDisturbAlt size={15} color="white" />
                  {postData?.isBlocked ? "Unblock Post" : "Block Post"}
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default ReelReports;
