import React, { FC, useState, useEffect, useRef } from 'react'
import findWord from '../helper/wordSearch'


interface WordGridProps {
  test?: string,
}


const WordGrid: FC<WordGridProps> = ({ test = 'default' }) => {
  const elementGridRef = useRef<any>({ scrollWidth: 0 })
  const wordGridRef = useRef<any>({ scrollWidth: 0 })
  const [grid, setGrid] = useState<string>("HFGP\nQAIO\nPNVN\nGGEE")
  const [gridArr, setGridArr] = useState<string[][]>(grid.split(/\n+/).map(line => line.split('').filter(c => c.trim())))
  const [gridOverflow, setgridOverflow] = useState<boolean>(false);
  const [gridValid, setGridValid] = useState<boolean>(true)

  const [word, setWord] = useState<string>('have, ping, give, fang')
  const [wordArr, setWordArr] = useState<string[]>([])

  const [showResults, setShowResults] = useState<string[]>([])

  useEffect(() => {

    setGridArr(grid.split(/\n+/).filter(l => l.trim()).map(line => line.split('').filter(c => c.trim()).map(c => c.toUpperCase())))
  }, [grid])

  useEffect(() => {
    if (
      wordGridRef.current && elementGridRef.current
    ) {
      if (wordGridRef.current.scrollWidth > wordGridRef.current.clientWidth) {
        setgridOverflow(true)
      } else {
        setgridOverflow(false)
      }
    }
    let counter: number | undefined = undefined
    let check: boolean = true
    for (let line of gridArr) {
      if (counter === undefined) {
        counter = line.length
      }
      if (counter !== undefined && counter !== line.length) {
        check = false
        break
      }
    }
    setGridValid(check)
  }, [gridArr])

  useEffect(() => {
    setWordArr(word.trim().split(',').filter(w => w.trim()).map(word => word.trim().toUpperCase()))
  }, [word])

  useEffect(() => {
    console.log(wordArr)
  }, [wordArr])


  const findHandler = (): void => {
    setShowResults(wordArr.map(word => findWord(gridArr, word)))
  }

  return (
    <div ref={elementGridRef}>

      {
        gridArr.length && gridArr[0].length && gridArr[0][0] ?
          <div
            ref={wordGridRef}
            className={`mx-auto flex flex-col mb-4 p-2 text-white text-center overflow-x-auto 
            ${gridOverflow ? 'items-start' : 'items-center'}`}>
            {
              gridArr.map(
                (line, y) => {
                  return (
                    <div className="flex">
                      {
                        line.map(
                          (char, x) => {
                            return (
                              <div className={`
                                 w-8
                                 h-8
                                 md:w-12
                                 md:h-12
                                 md:text-lg
                                 lg:w-16
                                 lg:h-16
                                 lg:text-xl
                                 xl:w-20
                                 xl:h-20
                                 xl:text-3xl
                                flex items-center justify-center
                                 ${gridValid ? 'border-green-500' : 'border-red-500'}
                                 ${y === 0 ? 'border-t-2' : 'border-t'}
                                 ${y === gridArr.length - 1 ? 'border-b-2' : 'border-b'}
                                 ${x === 0 ? 'border-l-2' : ''} border-r-2
                                 ${y === 0 && x === 0 ? 'rounded-tl-lg' : ''}
                                 ${y === 0 && x === line.length - 1 ? 'rounded-tr-lg' : ''}
                                 ${y === gridArr.length - 1 && x === 0 ? 'rounded-bl-lg' : ''}
                                 ${y === gridArr.length - 1 && x === line.length - 1 ? 'rounded-br-lg' : ''}
                                 `}>
                                {char.toUpperCase()}
                              </div>
                            )
                          }
                        )
                      }
                    </div>
                  )
                }
              )
            }
          </div>
          : null
      }

      <h1 className="text-xl font-thin text-center text-white pt-4 mb-4 "> Enter your word grid below</h1>
      <div className="mb-4 flex justify-center w-full">
        <textarea
          rows={4}
          style={{ maxWidth: '600px' }}
          className=" w-full p-2 rounded focus:outline-none focus:border-teal-500 border-2 font-bold leading-tight"
          value={grid}
          onChange={e => setGrid(e.target.value)}>

        </textarea>
      </div>
      <h1 className="font-thin text-white text-xl text-center mb-4">Words to find in the word grid</h1>
      <div className="mb-4 flex justify-center w-full">
        <input
          style={{ maxWidth: '600px' }}
          className=" p-2 rounded focus:outline-none font-bold w-full"
          type="text" value={word} onChange={e => setWord(e.target.value)} />
      </div>
      <div className="flex justify-center w-full mb-4">
        <button
          onClick={findHandler}
          className="p-2 rounded border-transparent hover:border-teal-700 border-2 focus:outline-none bg-teal-600 font-bold hover:bg-teal-700 text-white"
        >Find the word{wordArr.length > 1 ? 's' : ''} </button>
      </div>
      <div className="flex flex-col items-center w-full mb-4">
        {
          showResults.length ?
            showResults.map(res => {
              return (
                <div className="p-2 rounded mb-3 font-bold text-white bg-gray-600">
                  {res}
                </div>
              )
            }) :
            null
        }
      </div>
    </div>
  )
}

export default WordGrid