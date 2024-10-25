import React from "react";

const ReportedPerson = ({ data }) => {
  return (
    <div className="flex flex-col gap-3 montserrat px-2 py-2">
      <div className="flex flex-row justify-between pt-4 w-2/3">
        <div className="flex flex-row items-center gap-4">
          <img
            src="https://picsum.photos/200"
            alt="avatar "
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h1 className="text-base font-medium ">{data?.user?.name}</h1>
            <p className=" font-normal text-xs text-[#696969]">
              {data?.user?.username}
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className=" font-normal text-xs text-[#696969]">Associated with</p>
        <h1 className="text-base font-semibold text-[#FF4755] my-1">
          {data.reason}
        </h1>
      </div>
    </div>
  );
};

export default ReportedPerson;
