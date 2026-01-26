import React from 'react'

const MainContextHolder = ( {open, setOpen ,children }) => {
  return (
     <main
      className={`transition-all duration-300 p-6
      ${open ? "ml-[260px]" : "ml-[72px]"}`}
    >
      {children}
    </main>
  )
}

export default MainContextHolder