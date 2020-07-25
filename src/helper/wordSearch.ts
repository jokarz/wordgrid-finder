export interface ResolvingParameter {
  x: number,
  y: number,
  charAt: number,
  word: string,
  puzzle: string[][],
  direction?: number,
  mapping?: MappingObject[]
}

export interface MappingObject {
  x: number,
  y: number
}

export interface ResultObject {
  valid: boolean,
  word: string,
  x: number,
  y: number,
  mapping?: MappingObject[]
  direction: number
}

export interface CallBackParameter {
  counter?: number,
  x: number,
  y: number
}

const findWord = (puzzle: string | any, word: string): ResultObject => {
  if (typeof (puzzle) === 'string') {
    puzzle = puzzle.trim().split(/\n+/).map(line => line.trim().split(''))
  }
  for (let y = 0; y < puzzle.length; y++) {
    for (let x = 0; x < puzzle[y].length; x++) {
      if (puzzle[y][x] === word[0]) {
        if (word.length === 1) {
          return {
            valid: true,
            word,
            x,
            y,
            direction: 0
          }
        }
        let res = pathing({ x, y, charAt: 1, word, puzzle, mapping: [{ x, y }] })
        if (res.result) {
          return {
            valid: true,
            word,
            x,
            y,
            direction: res.direction,
            mapping: res.mapping
          }
        }
      }

    }
  }
  return {
    valid: false,
    word,
    x: 0,
    y: 0,
    direction: 0
  }
}

const pathing = ({ x, y, charAt, word, puzzle, mapping = [] }: ResolvingParameter): any => {
  return surroundingBlock({ x, y, charAt, word, puzzle }, ({ counter, x, y }) => {
    let res = tracing({ x, y, charAt: charAt + 1, word, puzzle, direction: counter, mapping: [...mapping, { x, y }] })
    if (res.result) {
      return {
        result: true,
        direction: counter,
        mapping: res.mapping
      }
    } else {
      return {
        result: false
      }
    }
  })
}

const surroundingBlock = ({ x, y, charAt, word, puzzle, direction = 0 }: ResolvingParameter, cb: ({ counter, x, y }: CallBackParameter) => any) => {
  let result = {
    result: false
  }
  let xRange = puzzle[0].length - 1
  let yRange = puzzle.length - 1
  let counter = 0
  for (let i = y - 1; i <= y + 1; i++) {
    for (let j = x - 1; j <= x + 1; j++) {
      counter++
      if ((i < 0 || j < 0 || i > yRange || j > xRange)) {
        continue
      }
      if ((direction && word[charAt] === puzzle[i][j] && counter === direction) ||
        (!direction && word[charAt] === puzzle[i][j])) {
        let res = cb({ counter, x: j, y: i })
        if (res && res.result) {
          return res
        }
      }
    }
  }
  return result
}

const tracing = ({ x, y, charAt, word, puzzle, direction, mapping = [] }: ResolvingParameter): any => {
  return surroundingBlock({ x, y, charAt, word, puzzle, direction }, ({ x, y }) => {
    if (charAt === word.length - 1) {
      return {
        result: true,
        mapping: [...mapping, { x, y }]
      }
    } else {
      let newMapping = [...mapping, { x, y }]
      return tracing({ x, y, charAt: charAt + 1, word, puzzle, direction, mapping: newMapping })
    }
  })
}

export default findWord