import * as api from './selectors'

export default function snakeGame(gameBoard, commands) {
  const firstTailIndex = api.getFirstTailCellIndex(gameBoard)
  const actions = commands.split('') // e.g. ["F","R","L"]
  const initialState = {
    board: gameBoard,
    cols: gameBoard[0].length,
    rows: gameBoard.length,
    firstTailIndex,
    tailIndexes: [firstTailIndex]
  }
  // console.log(initialState)

  const reducer = (state = initialState, action) => {
    if (state.gameOver) return state
    const flatGameBoard = api.flattenBoard(state.board)
    const headIndex = api.getHead(flatGameBoard)
    const direction = api.getDirection(flatGameBoard, headIndex)

    const lastTail = state.tailIndexes[state.tailIndexes.length-1]
    const tailIndexes = api.getTailIndexes(
      state.cols,//cols
      api.flattenBoard(flatGameBoard),
      state.tailIndexes//state.tailIndexes
    )
    console.log('state',state, 'tails:',tailIndexes)


    const next = api.getFutureCell(direction,headIndex, action, state.cols)

    const nextState = {
      ...state,
      // headIndex:next.index,
      tailIndexes
    }


    if (
      api.isOutOfBounds(state, direction, next.index, action, next.direction, headIndex)
      || tailIndexes.includes(next.index)
    ) {
      const deadSnakeBoard = flatGameBoard.map(c=>['^','>','v','<','*'].includes(c)?c="X":c)
      nextState.board = api.partitionArray(deadSnakeBoard, state.cols)
      nextState.gameOver = true
      // console.log(nextState)
      return nextState
    }


    flatGameBoard[next.index]=next.head
    if (action=="F"){
      const nextTailEnd = tailIndexes[tailIndexes.length-1]
      flatGameBoard[nextTailEnd]='.'
      // console.log('nextTailEnd',nextTailEnd)
      flatGameBoard[headIndex]='*'
    }
    nextState.board = api.partitionArray(flatGameBoard, state.cols)
    // console.log(nextState)
    return nextState

  }

  const store = actions.reduce(reducer, undefined)
  // console.log(store)
  return store.board
}
