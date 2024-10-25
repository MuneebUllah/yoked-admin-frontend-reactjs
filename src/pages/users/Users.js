import React, { Fragment, useState, useEffect } from "react";
import { colors } from "../../helpers/constants";
import Pagination from "../../components/pagination/Pagination";
import UsersTable from "../../components/tables/users/UsersTable";
import useUsers from "./useHook";
import { useSelector } from "react-redux";

const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { isLoading } = useSelector((state) => state.user);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
  };
  const { usersTableApi, userBlockApi, userUnBlockApi, userByName } = useUsers();
  const limit = 10;
  const offset = 0;

  useEffect(() => {
    usersTableApi(setUsersData, limit, offset);
  }, []);

  function fetchNextRecords(offset) {
    usersTableApi(setUsersData, limit, offset);
  }
  const search = () => {
    userByName(searchQuery, setUsersData)
  }

  const reset = () => {
    usersTableApi(setUsersData, limit, offset);
    setSearchQuery('')
  }
  return (
    <div className="w-full h-auto flex justify-center items-center">
      <div className="w-11/12 h-auto pt-10 flex flex-col gap-4 ">
        <h1 className="text-lg font-medium">User Management</h1>
        <div className="bg-white h-24 w-full rounded-lg flex flex-row px-5 gap-4 items-center">
          <input
            className="border border-[#E2E8F0] outline-none p-3.5 rounded-md w-11/12"
            placeholder="Search by Name"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button
            className={`bg-[${colors.orange}] text-white rounded-full p-3.5 w-1/6 h-14 font-bold ms-1`}
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
        </div>
        <div className="bg-white w-full rounded-lg flex flex-col p-5 gap-2 ">
          <div>
            <UsersTable usersData={usersData} setUsersData={setUsersData} isLoading={isLoading} userBlockApi={userBlockApi} userUnBlockApi={userUnBlockApi} />
          </div>
        </div>
        <Fragment>
          <Pagination totalRecords={usersData?.count} perPage={limit} handleFetchNextRecords={fetchNextRecords} />
        </Fragment>
      </div>
    </div>
  )
};

export default Users;
