import React, { FC } from 'react'

type GridInputProps = {
  grid: string,
  setGrid: Function
}

const GridInput: FC<GridInputProps> = ({ grid = '', setGrid = () => { } }) => {
  return (
    <>
      <h1 className="text-xl font-medium text-center text-white mb-4"> Grid structure</h1>
      <div className="mb-4 flex justify-center w-full">
        <textarea
          rows={4}
          style={{ maxWidth: '600px' }}
          className=" w-full p-2 rounded focus:outline-none focus:border-green-500 border-2 leading-tight"
          value={grid}
          onChange={e => setGrid(e.target.value)}>
        </textarea>
      </div>
    </>
  )
}

export default GridInput