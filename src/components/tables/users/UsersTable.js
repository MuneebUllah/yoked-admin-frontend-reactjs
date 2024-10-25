/* eslint-disable array-callback-return */
import React from "react";
import { colors } from "../../../helpers/constants";
import { FaRegEye } from "react-icons/fa";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import { setActiveButton, setActiveButtonReel, setActiveButtonSaved } from "../../../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const UsersTable = ({ usersData, setUsersData, isLoading, userBlockApi, userUnBlockApi }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const userDetail = (id) => {
    dispatch(setActiveButton('Posts'))
    dispatch(setActiveButtonSaved('Posts'))
    dispatch(setActiveButtonReel('Posts'))
    // dispatch(setActive('Posts'))
    navigate(`/users/actions/${id}`);
  };

  const blockUnblockToggle = (id, isBlocked) => {
    if (isBlocked) {
      userUnBlockApi(id)?.then(() => {
        setUsersData((prevUsersData) => ({
          ...prevUsersData,
          users: (prevUsersData.users ?? []).map((user) =>
            user.id === id ? { ...user, isBlocked: false } : user
          ),
        }));
      });
    } else {
      userBlockApi(id)?.then(() => {
        setUsersData((prevUsersData) => ({
          ...prevUsersData,
          users: (prevUsersData.users ?? []).map((user) =>
            user.id === id ? { ...user, isBlocked: true } : user
          ),
        }));
      });
    }
  };

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-start text-base font-bold text-[${colors.primary}]`}
                    >
                      Full Name
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-start text-base font-bold text-[${colors.primary}]`}
                    >
                      User Name
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-start text-base font-bold text-[${colors.primary}]`}
                    >
                      Phone no.
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-start text-base font-bold text-[${colors.primary}]`}
                    >
                      Email Address
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-start text-base font-bold text-[${colors.primary}]`}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {
                    usersData?.users &&
                      usersData?.users?.length > 0 ? (
                      usersData?.users?.filter(index => index.id != 1).map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="px-6 py-8 whitespace-nowrap text-sm font-normal text-[#1C1C27]">
                              {item.name ? item.name : "Name"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-[#1C1C27]">
                              {item.username ? item.username : "User Name"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-[#1C1C27]">
                              {item.phone ? item.phone : "Phone"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-[#1C1C27]">
                              {item.email ? item.email : "Email"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap justify-start text-sm font-normal text-[#1C1C27] flex flex-row gap-3 items-center">
                              <button
                                className="bg-[#84C1C2] h-9 w-9 rounded-full flex justify-center items-center"
                                onClick={() => {
                                  userDetail(item.id);
                                }}
                              >
                                <FaRegEye size={20} color="white" />
                              </button>
                              <button
                                onClick={() => blockUnblockToggle(item.id, item.isBlocked)}
                                className={`text-white inline-flex items-center gap-2 text-sm font-semibold rounded-full border py-3 px-7 ${item.isBlocked ? "bg-[#808D9E]" : "bg-[#252D31]"
                                  }`}
                              >
                                <MdDoNotDisturbAlt size={15} color="white" />
                                {item.isBlocked ? "Unblock" : "Block"}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-lg font-semibold text-[#1C1C27] text-center">
                          No Data Found
                        </td>
                      </tr> 
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
