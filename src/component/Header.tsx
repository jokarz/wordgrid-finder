import React, { FC } from 'react'

const Header: FC = () => {
  return (
    <div className="bg-black w-full shadow-lg">
      <div className="container mx-auto ">
        <div className="mx-4">
          <h1 className="text-3xl font-bold text-center text-white py-2 flex justify-center items-center">
            <div className="flex flex-col mr-2 leading-tight">
              <span className="text-lg select-none">WordGrid</span>
              <span className="text-xs select-none">(or any character)</span>
            </div>
            <span className="text-4xl leading-tight select-none">
              Finder
        </span>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Header