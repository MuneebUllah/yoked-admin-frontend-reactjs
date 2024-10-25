import React from "react";
import { BsFillChatDotsFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import dummyImg from '../../assets/images/images.png';
import dummyProfilePic from '../../assets/images/dummy-profile-pic.png';

const CommunintPost = ({ data }) => {
  const navigate = useNavigate();

  const trimText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };
  return (
    <div
      className="bg-white shadow-2xl rounded-3xl w-[250px] h-auto my-2 p-4 cursor-pointer"
      onClick={() => {
        navigate("/community/post", { state: { postData: data } });
      }}
    >
      <img
        src={data?.communityPostImages[0]?.image || dummyImg}
        alt="post"
        className="h-[209px] w-full rounded-t-3xl"
      />
      <div className="flex flex-row justify-between pt-4">
        <div className="flex flex-row items-center gap-4 w-48">
          <div className="border border-[#2E4D55] rounded-full p-[1px]">
            <img
              src={data.user.image ? data.user.image : dummyProfilePic}
              alt="avatar"
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div className="w-3/5">
            <h1 className="text-base font-semibold">{data?.user?.name}</h1>
            <p className="text-xs font-normal break-words">{data?.user?.username}</p>
          </div>
        </div>
        <div className="bg-[#e5774f54] rounded-full h-7 w-7 flex justify-center items-center">
          <BsFillChatDotsFill color="#E4774F" size={15} />
        </div>
      </div>
      <p className="text-xs font-normal break-words w-48 p-1 my-2 text-wrap">
        {trimText(data?.title, 10)}
      </p>
      
    </div>
  );
};

export default CommunintPost;
