import React, { FC } from "react";
import Direction from "./Direction";

type SearchResultProps = {
  result: any[],
  selection: { word: string, mapping: { x: number; y: number; }[] }
  setSelection: Function
}

const SearchResult: FC<SearchResultProps> = ({ result = [], selection = { word: '', mapping: [] }, setSelection = () => { } }) => {
  return (
    <div className="lg:m-4 flex-none">
      <h1 className="font-bold text-white text-xl text-center">Results</h1>
      <h6 className="font-thin text-white text-center mb-4">(click on result to highlight it in the grid)</h6>
      <div className="flex flex-col w-full mb-4 items-center">
        {result.map(res => {
          let { valid, x = 0, y = 0, mapping = [] } = res
          return (
            <div
              key={res.word + x + y}
              style={{ maxWidth: '600px' }}
              onClick={(): void => {
                if (res.valid) {
                  if (selection.word === res.word) {
                    setSelection({
                      word: '',
                      mapping: []
                    })
                  } else {
                    setSelection({
                      word: res.word,
                      mapping
                    })
                  }

                }
              }}
              className={`w-full p-3 rounded mb-3 text-white select-none border-2 ${!valid ? 'hover:bg-red-500 border-red-500' : selection.word === res.word ? 'bg-green-600 cursor-pointer border-green-600' : 'hover:bg-green-500 hover:border-green-500 cursor-pointer border-green-400'} `}>
              <div className="block text-center"><span className="font-bold">{res.word}</span></div>
              <div className="block text-xs text-center">
                {
                  valid ?
                    <>
                      <span>{` at row ${y + 1}, column ${x + 1}`}
                        {res.direction === 0 ?
                          ''
                          :
                          <span>
                            {' in '}<Direction direction={res.direction} /> {` direction`}
                          </span>}
                      </span>
                    </> : <span>was not found</span>
                }
              </div>

            </div>

          )
        })
        }
      </div>
    </div>
  )
}


export default SearchResult