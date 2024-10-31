import React from 'react'
import Join from "@/public/images/join.png"
import Image from 'next/image'


const DownloadRider = () => {
  return (
    <div className='flex justify-center py-[20px] lg:py-[70px]'>
        <Image src={Join} alt="join" width={800} height={800}  className="w-[350] h-[200] md:w-[600] md:h-[300] lg:w-[900] lg:h-[400]" />
    </div>
  )
}

export default DownloadRider