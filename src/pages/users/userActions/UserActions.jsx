import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { FaArrowLeft } from 'react-icons/fa';

import user from '../../../assets/images/User.svg';
import phone from '../../../assets/images/phone.svg';
import mail from '../../../assets/images/Email.svg';
import calender from '../../../assets/images/Calendar.svg';
import weightScale from '../../../assets/images/Weighing scale.svg';
import height from '../../../assets/images/HeightScale.svg';

import { MessageButton, UserActionButtons } from '../../../components/buttons/PrimaryButton';
import Post from './posts/Post';
import BodyDynamic from './BodyDynamic/BodyDynamic';
import Saved from './Saved/Saved';
import Athlete from './Athlete/Athlete';
import Followers from './Followers/Followers';
import Loader from '../../../components/loader/Loader';

import useUserAction from './useHook';
import dummyImg from '../../../assets/images/dummyImg.svg';
import { colors } from '../../../helpers/constants';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveButton } from '../../../redux/slices/userSlice';

export default function UserActions() {
  const dispatch = useDispatch();
  const { activeButton } = useSelector((state) => state.user);
  const [userActionsData, setUserActionsData] = useState();
  const { isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const { userActionsApi } = useUserAction();

  const handleButtonClick = (title) => {
    dispatch(setActiveButton(title));
  };

  useEffect(() => {
    userActionsApi(id, setUserActionsData);
    console.log(activeButton);
  }, []);

  // Convert the DOB string to a moment object using strict parsing
  const birthDate = moment(userActionsData?.dob, 'YYYY-MM-DD', true);
  // Calculate the age
  const age = moment().diff(birthDate, 'years');

  return (
    <div className="w-full h-auto flex justify-center items-center">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-10/12 h-auto pt-6 flex flex-col gap-4 ">
          <div
            onClick={() => navigate(-1)}
            style={{ backgroundColor: colors.orange }}
            className="h-9 w-9 rounded-full flex justify-center items-center cursor-pointer"
          >
            <FaArrowLeft size={22} color="white" />
          </div>
          <div className="w-full bg-white flex p-5 rounded relative h-36">
            <div className="flex justify-between w-full">
              <div className="w-80 text-center flex justify-start items-center m-4 gap-4 font-medium text-[23px] text-[#2E4D55]">
                <img src={userActionsData?.image ? userActionsData?.image : dummyImg} alt="img" className="w-20 rounded-[50%] h-20" />
                <h1>{userActionsData?.name ? userActionsData?.name : 'User Name'}</h1>
              </div>
              <div className="w-10/12 text-center gap-3 m-2 flex flex-wrap flex-col">
                <div className="flex gap-3">
                  <img src={user} className="w-4 h-4" alt="user" />
                  <p className="text-sm text-gray-600">{userActionsData?.username}</p>
                </div>
                <div className="flex gap-3">
                  <img src={phone} className="w-4 h-4" alt="phone" />
                  <p className="text-sm text-gray-600">{userActionsData?.phone}</p>
                </div>
                <div className="flex gap-3">
                  <img src={mail} className="w-4 h-4" alt="mail" />
                  <p className="text-sm text-gray-600">{userActionsData?.email}</p>
                </div>
                <div className="flex gap-3">
                  <img src={calender} className="w-4 h-4" alt="calendar" />
                  <p className="text-sm text-gray-600">{age ? age : 0}</p>
                </div>
                <div className="flex gap-3">
                  <img src={weightScale} className="w-4 h-4" alt="weightScale" />
                  <p className="text-sm text-gray-600">
                    {userActionsData?.weight} {userActionsData?.weightUnit}
                  </p>
                </div>
                <div className="flex gap-3">
                  <img src={height} className="w-4 h-4" alt="height" />
                  <p className="text-sm text-gray-600">
                    {userActionsData?.height} {userActionsData?.heightUnit}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="flex items-center static left-24">
              <MessageButton title="Message" onclick={() => navigate('/messages/user', { state: { isBlocked: false } })} height="56px" width="207px" />
            </div> */}
          </div>
          <h1 className="font-semibold text-lg">Order Details</h1>
          <div className="w-full bg-white flex p-8 rounded flex-col gap-6">
            <div className="flex gap-3 flex-wrap">
              <UserActionButtons title="Posts" active={activeButton === 'Posts'} onClick={() => handleButtonClick('Posts')} />
              <UserActionButtons title="BodyDynamics" active={activeButton === 'BodyDynamics'} onClick={() => handleButtonClick('BodyDynamics')} />
              <UserActionButtons title="Athlete" active={activeButton === 'Athlete'} onClick={() => handleButtonClick('Athlete')} />
              <UserActionButtons title="Following/Followers" active={activeButton === 'Following/Followers'} onClick={() => handleButtonClick('Following/Followers')} />
              <UserActionButtons title="Saved" active={activeButton === 'Saved'} onClick={() => handleButtonClick('Saved')} />
            </div>
            {activeButton === 'Posts' ? (
              <Post />
            ) : activeButton === 'BodyDynamics' ? (
              <BodyDynamic bodyDynamicApiData={userActionsData} />
            ) : activeButton === 'Athlete' ? (
              <Athlete athleteApiData={userActionsData} />
            ) : activeButton === 'Following/Followers' ? (
              <Followers />
            ) : activeButton === 'Saved' ? (
              <Saved />
            ) : (
              <h1 className='text-lg font-semibold text-center'>No Data Found</h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
