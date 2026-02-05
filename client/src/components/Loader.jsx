import React from 'react'
import { BRAND_NAME } from '../../config/default'

const Loader = ({info = "loading" ,className}) => {
    
  return (
    <div className={`h-full w-[89%] z-[999] fixed top-0 flex items-center justify-center bg-[#f4f5f7] ${className}`}>
        <h1 className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] font-extrabold neo text-5xl uppercase loading-text-effect'>
            {BRAND_NAME}
        </h1>
    </div>
  )
}


export default Loader