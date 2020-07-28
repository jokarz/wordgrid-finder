import React, { FC } from "react"

type WordInputProps = {
  word: string,
  setWord: Function,
  clicked: Function,
  isMulti: boolean
}


const WordInput: FC<WordInputProps> = ({ word = '', setWord = () => { }, clicked = () => { }, isMulti = false }) => {
  return (
    <>
      <h1 className="font-medium text-white text-xl text-center mb-4">Character(s) to find</h1>
      <div className="mb-4 flex justify-center w-full">
        <input
          style={{ maxWidth: '600px' }}
          className=" p-2 rounded focus:outline-none w-full focus:border-green-500 border-2 "
          placeholder="Separate each word by ,"
          type="text" value={word} onChange={e => setWord(e.target.value)} />
      </div>
      <div className="flex justify-center w-full mb-4">
        <button
          onClick={() => clicked()}
          className="p-2 rounded border-transparent hover:border-green-600 border-2 focus:outline-none bg-green-500 font-bold hover:bg-green-600 text-white"
        >
          <i className="fas fa-search"></i>{' '}
          Find {isMulti ? 'them' : 'this'} </button>
      </div>
    </>
  )
}

export default WordInput