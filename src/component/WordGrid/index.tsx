import React, { FC, useState, useEffect, useRef, useCallback, Fragment } from 'react'
import findWord from '../../helper/wordSearch'
import SearchResult from './SearchResult'
import WordInput from './WordInput'
import GridInput from './GridInput'

interface WordGridProps {
  test?: string,
}

const WordGrid: FC<WordGridProps> = () => {
  const elementGridRef = useRef<any>({ scrollWidth: 0 })
  const wordGridRef = useRef<any>({ scrollWidth: 0 })
  const [grid, setGrid] = useState<string>("egecshma\nlsyscfrs\nreitissa\neaucccde\nglnrrver\ncuegieai\nsaucerxf\nmpereape")
  const [gridArr, setGridArr] = useState<string[][]>(grid.split(/\n+/).map(line => line.split('').filter(c => c.trim())))
  const [gridOverflow, setgridOverflow] = useState<boolean>(false);
  const [gridValid, setGridValid] = useState<boolean>(true)

  const [word, setWord] = useState<string>('advice, clutch, exercise, fire, range, saucer, seal, tier')
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

  const findHandler = useCallback(() => {
    setShowResults(wordArr.map(word => findWord(gridArr, word)))
  }, [wordArr, gridArr])

  useEffect(() => {
    if (loaded === false && wordArr.length && gridArr.length) {
      findHandler()
      setLoaded(true)
    }
    setSelection({ word: '', mapping: [] })
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
                              transition ease-in-out duration-500
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
        <GridInput grid={grid} setGrid={setGrid} />
        {
          gridValid ?
            <WordInput word={word} setWord={setWord} clicked={findHandler} isMulti={wordArr.length > 1} />
            :
            <h1 className="font-medium text-red-500 text-xl text-center mb-4">Ensure that the number of the characters in each row is the same</h1>
        }

      </div>

      {
        showResults.length ?
          < SearchResult result={showResults} setSelection={setSelection} selection={selection} />
          :
          null
      }



    </div>
  )
}

export default WordGrid