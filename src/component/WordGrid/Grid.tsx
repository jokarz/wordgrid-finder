import React, { FC, Fragment } from "react"

type GridProps = {
  gridArr: string[][],
  valid: boolean,
  mapping: { x: number, y: number }[]
}

const Grid: FC<GridProps> = ({ gridArr = [[]], valid = true, mapping = [] }) => {
  return (
    <>
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
                      ${mapping.length && mapping.findIndex(item => item.x === x && item.y === y) > -1 ? 'bg-green-500 font-bold' : 'hover:bg-dark-500 hover:duration-75'}
                      transition ease-in-out duration-500 flex items-center justify-center                       
                      select-none w-8 h-8 md:w-12 md:h-12 md:text-lg lg:w-16 lg:h-16 lg:text-xl xl:w-20 xl:h-20 xl:text-3xl
                       ${valid ? 'border-green-500' : 'border-red-500'}
                       ${y === 0 ? 'border-t-2' : 'border-t'}
                       ${y === gridArr.length - 1 ? 'border-b-2' : 'border-b'}
                       ${x === 0 ? 'border-l-2' : ''} border-r-2
                       ${y === 0 && x === 0 ? 'rounded-tl-lg' : ''}
                       ${y === 0 && x === line.length - 1 ? 'rounded-tr-lg' : ''}
                       ${y === gridArr.length - 1 && x === 0 ? 'rounded-bl-lg' : ''}
                       ${y === gridArr.length - 1 && x === line.length - 1 ? 'rounded-br-lg' : ''}
                       `}
                            title={`Row ${y + 1}, Column ${x + 1}`}
                          >
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
    </>
  )
}

export default Grid