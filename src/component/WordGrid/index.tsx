import React, { FC, useState, useEffect, useRef, useCallback } from 'react'
import findWord from '../../helper/wordSearch'
import SearchResult from './SearchResult'
import WordInput from './WordInput'
import GridInput from './GridInput'
import Grid from './Grid'

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
              <Grid gridArr={gridArr} valid={gridValid} mapping={selection.mapping} />
            </div>
            : null
        }
        <div className="hidden lg:block">
          <GridInput grid={grid} setGrid={setGrid} />
          {
            gridValid ?
              <WordInput word={word} setWord={setWord} clicked={findHandler} isMulti={wordArr.length > 1} />
              :
              <h1 className="font-medium text-red-500 text-xl text-center mb-4">Ensure that the number of the characters in each row is the same</h1>
          }
        </div>
      </div>

      {
        showResults.length ?
          < SearchResult result={showResults} setSelection={setSelection} selection={selection} />
          :
          null
      }
      <div className="block lg:hidden">
        <GridInput grid={grid} setGrid={setGrid} />
        {
          gridValid ?
            <WordInput word={word} setWord={setWord} clicked={findHandler} isMulti={wordArr.length > 1} />
            :
            <h1 className="font-medium text-red-500 text-xl text-center mb-4">Ensure that the number of the characters in each row is the same</h1>
        }
      </div>

    </div>
  )
}

export default WordGrid