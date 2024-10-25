import React, { useEffect } from 'react'
import { bodyDynamicData } from '../../../../helpers/dummydata';
import dummy from '../../../../assets/images/dummyProfileImg.svg'
import { colors } from '../../../../helpers/constants';
export default function BodyDynamic({ bodyDynamicApiData }) {

  useEffect(()=>{
    bodyDynamicData(bodyDynamicApiData)
  })
  
  return (
    <div className='flex justify-around items-center pt-4 gap-16'>
<div className='flex flex-col gap-10 w-9/12'>
      <div className='w-full flex gap-4 items-center ps-5 flex-col'>
        {bodyDynamicData(bodyDynamicApiData).bodyDynamics.length > 0 ? (
          bodyDynamicData(bodyDynamicApiData).bodyDynamics.map((item, index) => {
            return (
              <div className='w-full flex gap-4 items-end' key={index}>
                <img src={item.image} alt='img' />
                <div className='w-full'>
                  <h5 className='w-32 text-xs text-[#2E4D55] cursor-pointer' >{item.name}</h5>
                  <div className="h-2 w-full bg-gray-200 rounded">
                    <div
                      className={`h-full bg-[${item.Color}] rounded`} style={{ width: `${item.percentage}%` }}
                      role="progressbar"

                      aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="100"

                    ></div>
                  </div>
                </div>
                <h5 className='text-xs text-[#2E4D55] '>{item.percentage}%</h5>
              </div>
            )
          })) :
          <div className='h-100 d-flex align-items-center'>
            <h1 className='text-center align-items-center'>No Data Found</h1>
          </div>
        }
      </div>
      <div className='flex gap-16 ps-10'>
        {
          bodyDynamicData(bodyDynamicApiData)?.bodyDynamicsLower.map((item, index) => {
            return (
              <div key={index} className='flex gap-4 items-center'>
                <div>
                  <img src={item.image} alt='img' />
                </div>
                <div>
                  <p className={`text-[${colors.orange}] font-extrabold text-lg`}>{item.percentage}</p>
                  <h4 className='text-xs text-[#2E4D55]'>{item.name}</h4>
                </div>
              </div>
            )

          })
        }
      </div>
      </div>
      <div className='flex flex-col h-full gap-4'>
        <h1 className='font-semibold text-lg text-center'>Athlete Profile Image</h1>
        <img src={bodyDynamicApiData?.athleteProfile?.image ? bodyDynamicApiData?.athleteProfile?.image : dummy} className='rounded w-80' />
      </div>
    </div>
  )
}
