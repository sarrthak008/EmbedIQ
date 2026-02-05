import React from 'react'

const BlurBaground = ({children , className}) => {
  return (
    <div className={`bg-gradient-to-t to-transparent from-black/50  backdrop-blur-md h-screen w-screen fixed top-0 z-[999] flex items-center justify-center ${className}`}>{children}</div>
  )
}

export default BlurBaground