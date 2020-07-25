import React, { FC, useState, useEffect, useRef } from 'react'
import findWord from '../helper/wordSearch'


interface WordGridProps {
  test?: string,
}

interface DirectionProps {
  direction: number
}

const Direction: FC<DirectionProps> = ({ direction = 0 }) => {
  switch (direction) {
    case 1:
      return (
        <i className="fas fa-arrow-up" style={{ transform: 'rotate(315deg)' }}></i>
      )
    case 2:
      return (
        <i className="fas fa-arrow-up"></i>
      )
    case 3:
      return (
        <i className="fas fa-arrow-up" style={{ transform: 'rotate(45deg)' }}></i>
      )
    case 4:
      return (
        <i className="fas fa-arrow-up fa-rotate-270"></i>
      )
    case 6:
      return (
        <i className="fas fa-arrow-up fa-rotate-90"></i>
      )
    case 7:
      return (
        <i className="fas fa-arrow-up" style={{ transform: 'rotate(225deg)' }}></i>
      )
    case 8:
      return (
        <i className="fas fa-arrow-up fa-rotate-180"></i>
      )
    case 9:
      return (
        <i className="fas fa-arrow-up" style={{ transform: 'rotate(135deg)' }}></i>
      )
    default:
      return (
        <i className="fas fa-arrow-up"></i>
      )

  }
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

  const [showResults, setShowResults] = useState<any[]>([])
  const [selection, setSelection] = useState<any[]>([])
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
    let newWords: string[] = word.trim().split(',').filter(w => w.trim()).map(word => word.trim().toUpperCase())
    newWords = Array.from(new Set(newWords))
    setWordArr(newWords)
  }, [word])



  const findHandler = (): void => {
    setShowResults(wordArr.map(word => findWord(gridArr, word)))
  }

  return (
    <div ref={elementGridRef} className="flex flex-col lg:flex-row ">

      <div className="lg:w-1/2">
        {
          gridArr.length && gridArr[0].length && gridArr[0][0] ?
            <div
              ref={wordGridRef}
              className={`mx-auto flex flex-col lg:p-4 text-white text-center overflow-x-auto sticky top-0 
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
                                ${selection.length && selection.findIndex(item => item.x === x && item.y === y) > -1 ? 'bg-green-500' : ''}
                              select-none w-8 h-8
                                 md:w-12 md:h-12 md:text-lg
                                 lg:w-16 lg:h-16 lg:text-xl
                                 xl:w-20 xl:h-20 xl:text-3xl
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
      </div>
      <div className="lg:w-1/2 ">
        <h1 className="text-xl font-thin text-center text-white mb-4"> Enter your characters below</h1>
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
                let text: string = `${res.word}`
                if (res.valid) {
                  let { x, y } = res
                  console.log(res)
                  text += ` can be found at row ${y + 1}, column ${x + 1}`
                } else {
                  text += ` cannot be found`
                }
                return (
                  <div
                  style={{maxWidth: '600px'}}
                    onClick={(): void => {
                      if (res.valid) {
                        setSelection(res.mapping)
                      }
                    }}
                    onMouseEnter={(): void => {
                      if (res.valid) {
                        setSelection(res.mapping)
                      }
                    }}
                    className={`p-3 rounded mb-3 font-bold text-white bg-gray-600 select-none ${res.valid ? 'hover:bg-teal-500 cursor-pointer' : 'hover:bg-red-500'}`}>
                    {text}{' '}
                    {
                      res.valid ?
                        <Direction direction={res.direction} /> : null
                    }
                  </div>
                )
              }) :
              null
          }
        </div>
      </div>
    </div>
  )
}

export default WordGrid