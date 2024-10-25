import React, { useEffect, useState } from "react";
import { Table } from "../../components/tables/dashboard/DashboardTable";
import dropDownArrow from '../../assets/images/Arrow - Down 2.svg'
import useHook from "../users/useHook";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useDashboard from "./useHook";
import useComponentVisible from "../../helpers/hooks/click-outside-hook";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState()
  const [tableData, setTableData] = useState([]);
  const isLoading = useSelector((state) => state.user.isLoading);
  const { usersTableApi, userProfile } = useHook();
  const { dashboard } = useDashboard();
  const location = useLocation();
  const [selectedTimePeriod, setSelectedTimePeriod] = useState({
    title:'This Week',
    value: 'week'});
  const {
    isComponentVisible: isStatisticsVisible,
    ref: StatisticsRef,
    setIsComponentVisible: setIsStatisticsComponentVisible,
  } = useComponentVisible(false);

  useEffect(() => {
    usersTableApi(setTableData);
    if (location.pathname === "https://admin.yokedapp.com/") {
      userProfile();
    }
    fetchDashboardData(selectedTimePeriod.value);
  }, [location, selectedTimePeriod]);

  const fetchDashboardData = (timePeriod) => {
    dashboard(timePeriod, setDashboardData);
  };

  const timePeriod = (title, timePeriod) => {
    setSelectedTimePeriod({
      ...selectedTimePeriod,
      title: title,
      value: timePeriod
    });
  }

  const formatValue = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <div className="w-full h-auto flex justify-center items-center">
      <div className="w-10/12 h-auto pt-28 flex flex-col gap-4 ">
        <div className="w-full bg-white flex justify-around p-6 rounded h-auto">
          <div className="w-4/12 text-center border-r border-gray-300">
            <span className={`font-normal text-[28px]`}>{dashboardData?.totalMembers}</span>
            <p className="text-gray-500 text-xl">Total Members</p>
          </div>
          <div className="w-4/12 text-center border-r border-gray-300">
            <span className={`font-normal text-[28px]`}>{dashboardData?.mediaUploaded}</span>
            <p className="text-gray-500 text-xl">Media Uploaded</p>
          </div>
          <div className="w-4/12 text-center border-r border-gray-300">
            <span className={`font-normal text-[28px]`}>{dashboardData?.postLiked}</span>
            <p className="text-gray-500 text-xl">Post Liked</p>
          </div>
          <div className="w-4/12 text-center ">
            <span className={`font-normal text-[28px]`}>{dashboardData?.totalStories}</span>
            <p className="text-gray-500 text-xl">Stories</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-white w-2/5 rounded">
            <div className="flex p-3 gap-4 flex-col">
              <div className="flex justify-between p-4">
                <span className="text-xl font-normal">Statistics</span>
                <div className="relative">
                  <button
                    onClick={() => setIsStatisticsComponentVisible(!isStatisticsVisible)}
                    className="text-[#8A92A6] px-4 py-2 rounded inline-flex items-center"
                  >
                    <span>{selectedTimePeriod.title}</span>
                    <img src={dropDownArrow} alt="img" />
                  </button>
                  {isStatisticsVisible && (
                    <div
                      ref={StatisticsRef}
                      className="absolute right-0 mt-2 w-48 bg-white z-10 rounded shadow-lg"
                    >
                      <span
                        className="block px-4 py-2 text-[#202020] hover:bg-gray-200"
                        onClick={() => {
                          timePeriod('This Week',"week")
                          setIsStatisticsComponentVisible(!isStatisticsVisible)
                        }}
                      >
                        This Week
                      </span>
                      <span
                        className="block px-4 py-2 text-[#202020] hover:bg-gray-200"
                        onClick={() => {
                          timePeriod('Last 2 Weeks',"two-weeks")
                          setIsStatisticsComponentVisible(!isStatisticsVisible)
                        }}
                      >
                        Last 2 Weeks
                      </span>
                      <span
                        className="block px-4 py-2 text-[#202020] hover:bg-gray-200"
                        onClick={() => {
                          timePeriod('Last Month',"month")
                          setIsStatisticsComponentVisible(!isStatisticsVisible)
                        }}
                      >
                        Last Month
                      </span>
                      <span
                        className="block px-4 py-2 text-[#202020] hover:bg-gray-200"
                        onClick={() => {
                          timePeriod('Last Year',"year")
                          setIsStatisticsComponentVisible(!isStatisticsVisible)
                        }}
                      >
                        Last Year
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 graph-data-container flex-wrap">
                <div>
                  <div className="flex justify-center flex-wrap items-center gap-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2 justify-center">
                        <span className="bg-[#2E4D55] h-[120px] w-[125px] rounded text-white text-[66px] rubik text-center">
                          {formatValue(dashboardData?.newUsers)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-[#2E4D55] h-2 w-2 rounded-full"></span>
                        <div className="flex">
                          <span className="text-[#8A92A6]">New Users</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2 justify-center">
                        <span className="bg-[#E4774F] h-[120px] w-[125px] rounded text-white text-[66px] rubik text-center">
                          {formatValue(dashboardData?.blockedUsers)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-[#E4774F] h-2 w-2 rounded-full"></span>
                        <div className="flex">
                          <span className="text-[#8A92A6]">Blocked</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2 justify-center">
                        <span className="bg-[#84C1C2] h-[120px] w-[125px] rounded text-white text-[66px] rubik text-center">
                          {formatValue(dashboardData?.comments)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-[#84C1C2] h-2 w-2 rounded-full"></span>
                        <div className="flex">
                          <span className="text-[#8A92A6]">Comments</span>
                        </div>
                      </div>
                    </div>
                    {/* )
                      })} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white w-3/5 p-4 rounded h-[22rem] p-custom-scrollbar-8 overflow-auto">
            <Table tableData={tableData?.users} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
