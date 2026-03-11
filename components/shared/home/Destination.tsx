import Containers from '@/components/ui/Containers'
import React from 'react'

const Destination = () => {
  return (
    <Containers>
      <div className="w-[300px] rounded-[22px] bg-white shadow-[0_6px_20px_rgba(0,0,0,0.08)] p-[7px]">

        <div className="overflow-hidden rounded-[16px]">
          <img
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
            className="w-full h-[180px] object-cover"
          />
        </div>

        <div className="pt-[14px] px-[6px] pb-[6px]">

          <h3 className="text-[20px] font-semibold text-black leading-[24px]">
            Paris
          </h3>

          <p className="text-[13px] text-gray-500 mt-[4px]">
            Wed, 11 Mar - Wed, 18 Mar
          </p>

          <div className="flex items-center justify-between mt-[16px]">

            <span className="text-[16px] font-semibold text-black">
              from $120
            </span>

            <button
              className="px-[18px] py-[8px] cursor-pointer text-[14px] font-semibold text-white rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 transition"
            >
              Find hotels
            </button>

          </div>
        </div>
      </div>
    </Containers>
  )
}

export default Destination
