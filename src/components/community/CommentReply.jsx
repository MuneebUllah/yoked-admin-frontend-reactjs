import React, { useEffect, useState } from "react";
import { MdDoNotDisturbAlt } from "react-icons/md";
import useCommunity from "../../pages/community/useHook";
import moment from "moment";

const CommentReply = ({ data, isFromReportsPage }) => {
  const [postData , setPostData] = useState()
  const {commentPostBlockApi , commentPostUnBlockApi} = useCommunity() 

  useEffect(()=>{
    if(data){
      setPostData(data)
    }
  },[])

  const blockUnblockToggle = (id, isBlocked) => {
    if (isBlocked) {
      commentPostUnBlockApi(id).then(() => {
        setPostData((prevPostData) => ({
          ...prevPostData,
          isBlocked: false
        }));
      });
    } else {
      commentPostBlockApi(id).then(() => {
        setPostData((prevPostData) => ({
          ...prevPostData,
          isBlocked: true
        }));
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 ml-12 ">
      <div className="flex flex-row justify-between pt-4 ">
        <div className="flex flex-row items-center gap-4">
          <img
            src="https://picsum.photos/200"
            alt="avatar "
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h1 className="text-base font-normal ">{data?.user?.name}</h1>
            <p className=" font-light text-[10px] montserrat">{moment(postData?.updatedAt).fromNow()}</p>
          </div>
        </div>
        {!isFromReportsPage && (
          <button
                onClick={() => blockUnblockToggle(postData?.id, postData.isBlocked)}
                className={`text-white inline-flex items-center gap-2 text-sm font-semibold rounded-full h-12 border py-1 px-5 ${postData?.isBlocked ? "bg-[#808D9E]" : "bg-[#252D31]"
                  }`}
              >
                <MdDoNotDisturbAlt size={15} color="white" />
                {postData?.isBlocked ? "Unblock" : "Block"}
              </button>
        )}
      </div>
      <p className="text-sm text-start font-normal w-52 montserrat ms-14 mt-2">
        {data.comment}
      </p>
    </div>
  );
};

export default CommentReply;
