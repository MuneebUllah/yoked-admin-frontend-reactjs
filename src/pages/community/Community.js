import React, { Fragment, useEffect, useState } from "react";
import { colors } from "../../helpers/constants";
import Pagination from "../../components/pagination/Pagination";
import CommunintPost from "../../components/community/CommunintPost";
import useCommunity from "./useHook";
import Loader from '../../components/loader/Loader';
import { useSelector } from "react-redux";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

export const Community = () => {
  const { isLoading } = useSelector((state) => state.user);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [postDisplayType, setPostDisplayType] = useState("normal");
  const [communityPostData, setCommunityPostData] = useState()
  const [searchQuery, setSearchQuery] = useState('');
  const { communityPostsApi ,communityPostSearchApi } = useCommunity()

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
  };

  useEffect(() => {
    communityPostsApi(setCommunityPostData)
  }, [])
  const isValidDate = (date) => {
    return date && moment(date).isValid();
  }

  const search = () => {
    const formattedStartDate = isValidDate(startDate) ? moment(startDate).format('YYYY/MM/DD') : null;
    const formattedEndDate = isValidDate(endDate) ? moment(endDate).format('YYYY/MM/DD') : null;
    communityPostSearchApi(searchQuery, formattedStartDate, formattedEndDate , setCommunityPostData)

  }

  const reset = () => {
    communityPostsApi(setCommunityPostData)
    setSearchQuery('')
  }
  const limit = 10;
  function fetchNextRecords(offset) {
    communityPostsApi(setCommunityPostData, limit, offset)
  }
  return (
    <div className="w-full h-auto flex flex-col gap-6 justify-center items-center">
      {
        isLoading ?
          <Loader />
          : (
            <>
              <div className="w-11/12 h-auto pt-10 flex flex-col gap-4 ">
                <div className="bg-white h-24 w-full rounded-lg flex flex-row px-5 gap-4 items-center">
                  <input
                    className="border border-[#E2E8F0] outline-none p-3.5 rounded-md w-[28%]"
                    placeholder="User Name"
                    value={searchQuery}
                    onChange={handleInputChange}
                  />
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
                  {/* <div className="w-40"> */}
                  <button
                    className={`bg-[${colors.orange}] text-white rounded-full p-3.5 w-1/6 h-14 font-bold ms-1` }
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
                  {/* </div> */}
                </div>
                <h1 className="text-lg font-medium">Community Management</h1>
                <div className="bg-white w-full rounded-lg flex flex-col px-5 gap-2 ">
                  <div className=" py-10 flex items-end gap-3">
                    <button
                      onClick={() => {
                        setPostDisplayType("normal");
                      }}
                      className={`py-3.5 px-7 ${postDisplayType === "normal"
                        ? "bg-[#84C1C2] text-white font-semibold"
                        : "bg-[#EAECF0] text-[#ADB5BD] font-normal"
                        } rounded-md  text-lg `}
                    >
                      Community Posts
                    </button>
                    <button
                      onClick={() => {
                        setPostDisplayType("blocked");
                      }}
                      className={`py-3.5 px-7 ${postDisplayType === "blocked"
                        ? "bg-[#84C1C2] text-white font-semibold"
                        : "bg-[#EAECF0] text-[#ADB5BD] font-normal"
                        } rounded-md  text-lg `}
                    >
                      Blocked
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-6 pb-2 px-4  font-medium montserrat text-lg">
                    {
                      postDisplayType === 'normal' &&
                      (communityPostData?.data?.communityPosts.length > 0 ?
                        communityPostData?.data?.communityPosts
                          ?.map((post, index) => {
                            return <CommunintPost data={post} key={index} />;
                          })
                        : <div className="w-full text-center">
                          <h1 className='text-lg font-semibold text-center pb-4'>No Data Found</h1>
                        </div>)}
                    {
                      postDisplayType === "blocked" &&
                      (communityPostData.data.blockedCommunityPosts.length > 0 ?
                        communityPostData?.data?.blockedCommunityPosts
                          ?.map((post, index) => {
                            return <CommunintPost key={index} data={post} />
                          }) :
                        <div className="w-full text-center">
                          <h1 className='text-lg font-semibold text-center pb-4'>No Data Found</h1>
                        </div>
                      )}
                  </div>
                </div>

              </div>
              <div className="w-full px-5">
                {
                  postDisplayType === 'normal' ?
                    <Fragment >
                      <Pagination totalRecords={communityPostData?.counts?.communityPostsCount} perPage={limit} handleFetchNextRecords={fetchNextRecords} />
                    </Fragment>
                    :
                    <Fragment >
                      <Pagination totalRecords={communityPostData?.counts?.blockedCommunityPostsCount} perPage={limit} handleFetchNextRecords={fetchNextRecords} />
                    </Fragment>}
              </div>
            </>
          )
      }
    </div>
  );
};
