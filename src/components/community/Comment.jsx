import React, { useState } from "react";
import useCommunity from "../../pages/community/useHook";
import { MdDoNotDisturbAlt } from "react-icons/md";
import CommentReply from "./CommentReply";
import moment from "moment/moment";

const Comment = ({ data, isFromReportsPage = false }) => {
  const [postData , setPostData] = useState(data)
  const [postRepliesData , setPostRepliesData] = useState([])
  const [showReplies , setShowReplies] = useState(false)
  const {commentPostBlockApi , commentPostUnBlockApi , communityPostReplies } = useCommunity()

  const viewReplies = () => {
    communityPostReplies(data?.id , setPostRepliesData)
    setShowReplies(true)
  }
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
    <div className="flex flex-col gap-3 w-4/5">
      <div className="flex flex-row justify-between pt-4 w-4/5">
        <div className="flex flex-row items-center gap-4">
          <img
            src="https://picsum.photos/200"
            alt="avatar "
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h1 className="text-lg font-medium ">{data?.user?.name}</h1>
            <p className=" font-normal text-[10px] montserrat">{moment(postData.updatedAt).fromNow()}</p>
          </div>
        </div>
        <button
                onClick={() => blockUnblockToggle(postData?.id, postData.isBlocked)}
                className={`text-white inline-flex items-center gap-2 text-sm font-semibold rounded-full h-12 border py-1 px-5 ${postData?.isBlocked ? "bg-[#808D9E]" : "bg-[#252D31]"
                  }`}
              >
                <MdDoNotDisturbAlt size={13} color="white" />
                {postData?.isBlocked ? "Unblock" : "Block"}
              </button>
      </div>
      <p className="text-sm font-normal w-52 montserrat ms-14 mt-2">
        {data.comment}
      </p>
      <div className="text-center">
        {showReplies ?
        postRepliesData?.map((item , index)=>{
          return(

        <CommentReply data={item} key={index}/> 
          )
        }):
          (data?.replyCount > 0 ? <span className="text-center text-[#245c91] cursor-pointer" onClick={viewReplies}>view Replies</span> : '')
        }
      </div>
    </div>
  );
};

export default Comment;
