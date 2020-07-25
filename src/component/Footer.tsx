import React, { FC } from 'react'

interface FooterProps {

}

const Footer: FC<FooterProps> = () => {

  return (
    <div className="bg-black h-10 w-100">
      <div className="flex justify-center items-center h-full">
        <span className="font-medium text-teal-300">
          Made By Peng Chong
        </span>
      </div>
    </div>
  )
}


export default Footer