import React, { useEffect } from 'react'
import { athleteData } from '../../../../helpers/dummydata';
import dummy from '../../../../assets/images/dummyProfileImg.svg'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Athlete({athleteApiData}) {
  useEffect(()=>{
    athleteData(athleteApiData?.athleteProfile)
  })

  return (
    <>
      <div className='flex justify-around items-center gap-12'>
        <div className='flex flex-col h-60 gap-4 w-9/12'>
          <div className='w-full  flex gap-3  items-center ps-5 flex-col '>
            {athleteData(athleteApiData?.athleteProfile)?.AthleteUperData?.length > 0 ? (
              athleteData(athleteApiData?.athleteProfile)?.AthleteUperData?.map((item, index) => {
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
             athleteData(athleteApiData?.athleteProfile)?.AthleteData.map((item, index) => {
                return (
                  <div className='text-center flex flex-col gap-3' key={index}>
                    <div className='w-16'>
                      <CircularProgressbarWithChildren value={item.percentage} styles={buildStyles({                    // Colors
                        pathColor: item.color,
                        textColor: item.color,
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                        textSize: '19px',


                      })}
                        minValue={0}
                        maxValue={1000} >
                        <p className={`text-[${item.color}] font-semibold`}>{item.percentage}</p>
                      </CircularProgressbarWithChildren>
                    </div>
                    <h2 className={`text-[10px] text-[${item.color}]`}>{item.name}</h2>
                  </div>
                )
              })
            }
          </div>

        </div>
        <div className='flex flex-col gap-4'>
          <h1 className='font-semibold text-lg text-center'>Athlete Profile Image</h1>
          <img src={dummy} alt='img' className='rounded-xl w-80 h-80' />
        </div>
      </div>
    </>

  )
}
