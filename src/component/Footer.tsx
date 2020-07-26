import React, { FC } from 'react'

interface FooterProps {

}

const Footer: FC<FooterProps> = () => {

  return (
    <div className="bg-black h-10 w-100">
      <div className="flex justify-center items-center h-full">
        <span className="font-medium text-white">
          Made with <i className="fas fa-heart text-red-500"></i> by {' '}
          <a 
          className="underline"
          rel="noopener noreferrer"
          href="https://github.com/jokarz" target="_blank">Peng Chong</a>
          
        </span>
      </div>
    </div>
  )
}


export default Footer