export as namespace WordSearch
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
