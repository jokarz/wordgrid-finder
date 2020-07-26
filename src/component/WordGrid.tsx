import React, { FC, useState, useEffect, useRef, useCallback, Fragment } from 'react'
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
        <i className="fas fa-question"></i>
      )

  }
}

const WordGrid: FC<WordGridProps> = () => {
  const elementGridRef = useRef<any>({ scrollWidth: 0 })
  const wordGridRef = useRef<any>({ scrollWidth: 0 })
  const [grid, setGrid] = useState<string>("agecshmauc\nlbyscfrsgw\nreanisscpa\neaagccxndo\ngrnrnarvoc\nbuewdieeaw\nservernmxr\nnpirtapnse\nncfuiftmug\neierieehgr")
  const [gridArr, setGridArr] = useState<string[][]>(grid.split(/\n+/).map(line => line.split('').filter(c => c.trim())))
  const [gridOverflow, setgridOverflow] = useState<boolean>(false);
  const [gridValid, setGridValid] = useState<boolean>(true)

  const [word, setWord] = useState<string>('advert, advice, bear, branch, exercise, fire, mistake, running, server, screen')
  const [wordArr, setWordArr] = useState<string[]>([])

  const [showResults, setShowResults] = useState<any[]>([])
  const [selection, setSelection] = useState<{ word: string, mapping: { x: number, y: number }[] }>({ word: '', mapping: [] })
  const [loaded, setLoaded] = useState<boolean>(false)
  useEffect(() => {

    setGridArr(grid.split(/\n+/).filter(l => l.trim()).map(line => line.split('').filter(c => c.trim()).map(c => c.toUpperCase())))
  }, [grid])

  useEffect(() => {
    gridFlowHandler()
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
    setShowResults([])
  }, [gridArr])

  useEffect(() => {
    let newWords: string[] = word.trim().split(',').filter(w => w.trim()).map(word => word.trim().toUpperCase())
    newWords = Array.from(new Set(newWords))
    setWordArr(newWords)
  }, [word])



  const gridFlowHandler = () => {
    if (
      wordGridRef.current && elementGridRef.current
    ) {
      if (wordGridRef.current.scrollWidth > wordGridRef.current.clientWidth) {
        setgridOverflow(true)
      } else {
        setgridOverflow(false)
      }
    }
  }

  useEffect(() => {
    setSelection({ word: '', mapping: [] })
  }, [wordArr])

  const findHandler = useCallback(() => {
    setShowResults(wordArr.map(word => findWord(gridArr, word)))
  }, [wordArr, gridArr])

  useEffect(() => {
    if (loaded === false && wordArr.length && gridArr.length) {
      findHandler()
      setLoaded(true)
    }
  }, [loaded, wordArr, gridArr, findHandler])

  useEffect(() => {
    gridFlowHandler()
  }, [showResults])

  return (
    <div ref={elementGridRef} className="flex flex-col lg:flex-row mb-8">

      <div className={`flex-grow overflow-x-auto `}>
        {
          gridArr.length && gridArr[0].length && gridArr[0][0] ?
            <div
              ref={wordGridRef}
              className={`mx-auto flex flex-col p-4 text-white text-center overflow-x-auto 
            ${gridOverflow ? 'items-start' : 'items-center'}`}>
              {
                gridArr.map(
                  (line, y) => {
                    return (
                      <Fragment key={line.join() + y}>
                        {y === 0 ?
                          <div className="flex">
                            {
                              [...line, 'x'].map((x, i) => {
                                return (
                                  <div key={x + i} className={` ${i === 0 ? 'mr-2 opacity-0' : 'mb-2 w-8 md:w-12 text-xs lg:w-16 lg:text-sm xl:w-20'} select-none  xl:text-base flex items-center justify-center `}>
                                    {('00' + i).substr(-2)}
                                  </div>
                                )
                              })
                            }
                          </div>
                          : null
                        }
                        <div className="flex">
                          <div className="mr-2 select-none h-8 md:h-12 text-xs lg:h-16 lg:text-sm xl:h-20 xl:text-base flex items-center justify-center">
                            {('00' + (y + 1)).substr(-2)}
                          </div>
                          {
                            line.map(
                              (char, x) => {
                                return (
                                  <div key={char + x} className={`
                                ${selection.mapping.length && selection.mapping.findIndex(item => item.x === x && item.y === y) > -1 ? 'bg-green-500 font-bold' : ''}
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
                      </ Fragment>
                    )
                  }
                )
              }
            </div>
            : null
        }
        <h1 className="text-xl font-medium text-center text-white mb-4"> Grid structure</h1>
        <div className="mb-4 flex justify-center w-full">
          <textarea
            rows={4}
            style={{ maxWidth: '600px' }}
            className=" w-full p-2 rounded focus:outline-none focus:border-teal-500 border-2 leading-tight"
            value={grid}
            onChange={e => setGrid(e.target.value)}>
          </textarea>
        </div>
        {
          gridValid ? <>
            <h1 className="font-medium text-white text-xl text-center mb-4">Character(s) to find</h1>
            <div className="mb-4 flex justify-center w-full">
              <input
                style={{ maxWidth: '600px' }}
                className=" p-2 rounded focus:outline-none w-full"
                placeholder="Separate each word by ,"
                type="text" value={word} onChange={e => setWord(e.target.value)} />
            </div>
            <div className="flex justify-center w-full mb-4">
              <button
                onClick={findHandler}
                className="p-2 rounded border-transparent hover:border-green-700 border-2 focus:outline-none bg-green-600 font-bold hover:bg-green-700 text-white"
              >Find {wordArr.length > 1 ? 'them' : 'this'} </button>
            </div>
          </> :
            <>
              <h1 className="font-medium text-red-500 text-xl text-center mb-4">Ensure that the number of the characters in each row is the same</h1>
            </>
        }

      </div>

      {
        showResults.length ?
          <div className="lg:m-4 flex-none">
            <h1 className="font-bold text-white text-xl text-center">Results</h1>
            <h6 className="font-thin text-white text-center mb-4">(click on result to highlight it in the grid)</h6>
            <div className="flex flex-col w-full mb-4 items-center">
              {showResults.map(res => {
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
                    className={`w-full p-3 rounded mb-3 text-white select-none ${!valid ? 'hover:bg-red-500 bg-red-500' : selection.word === res.word ? 'bg-green-700 cursor-pointer' : 'hover:bg-green-600 cursor-pointer bg-green-500'} `}>
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
                                  {' '}<Direction direction={res.direction} /> {` direction`}
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
          :
          null
      }



    </div>
  )
}

export default WordGrid