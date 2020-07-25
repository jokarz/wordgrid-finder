interface ResolvingParameter {
  x: number,
  y: number,
  charAt: number,
  word: string,
  puzzle: string[][],
  direction?: number
}

interface CallBackParameter {
  counter?: number,
  x: number,
  y: number
}

const findWord = (puzzle: string | any, word: string): string => {
  if (typeof (puzzle) === 'string') {
    puzzle = puzzle.trim().split(/\n+/).map(line => line.trim().split(''))
  }
  for (let y = 0; y < puzzle.length; y++) {
    for (let x = 0; x < puzzle[y].length; x++) {
      if (puzzle[y][x] === word[0]) {
        if (word.length === 1) {
          return `${word} was not found`
        }
        let res = pathing({ x, y, charAt: 1, word, puzzle })
        if (res.result) {
          return `${word} can be found at row ${y + 1}, column ${x + 1}, ${directionToWords(res.answer)}`
        }
      }

    }
  }
  return `${word} was not found`
}

const pathing = ({ x, y, charAt, word, puzzle }: ResolvingParameter): any => {
  return surroundingBlock({ x, y, charAt, word, puzzle }, ({ counter, x, y }) => {
    let res = tracing({ x, y, charAt: charAt + 1, word, puzzle, direction: counter })
    if (res.result) {
      return {
        result: true,
        answer: counter
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
      console.log(puzzle[i][j], counter)
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

const tracing = ({ x, y, charAt, word, puzzle, direction }: ResolvingParameter): any => {
  return surroundingBlock({ x, y, charAt, word, puzzle, direction }, ({ x, y }) => {
    if (charAt === word.length - 1) {
      return {
        result: true
      }
    } else {
      return tracing({ x, y, charAt: charAt + 1, word, puzzle, direction })
    }
  })
}

const directionToWords = (val: number): string => {
  switch (val) {
    case 1:
      return '⭦ direction'
    case 2:
      return '⭡ direction'
    case 3:
      return '⭧ direction'
    case 4:
      return '⭠ direction'
    case 6:
      return '⭢ direction'
    case 7:
      return '⭩ direction'
    case 8:
      return '⭣ direction'
    case 9:
      return '⭨ direction'
    default:
      return 'unknown'
  }
}

export default findWord