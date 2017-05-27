import * as api from './selectors'

  const gameBoard = [
    [".",".",".",".",".",".",".",".","."],
    [".","*","*","*","*",">",".",".","."],
    [".",".",".",".",".",".",".",".","."],
    [".",".",".",".",".",".",".",".","."],
    [".",".",".",".",".",".",".",".","."],
    [".",".",".",".",".",".",".",".","."],
    [".",".",".",".",".",".",".",".","."]
  ]


  const initialState = {
    board: gameBoard,
    cols: gameBoard[0].length,
    rows: gameBoard.length,
    tailIndexes: [],
    completedMoves: [],
    gameInProgress: false
  }

//shared for use by standalone snakeGame() or the playable redux implementation
  export const reducer = (state = initialState, action, turn) => {
    if (action.type) { //hack for redux compatibility
      action = action.type
      if ((action == '@@redux/INIT')) return state
    }
    if (state.gameOver) return state
    const flatGameBoard = api.flattenBoard(state.board)
    const headIndex = api.getHead(flatGameBoard) // the state's current / prev head index
    const direction = api.getDirection(flatGameBoard, headIndex)
    var tailIndexes = state.tailIndexes
    var neckIndex = state.neckIndex

    if (turn==0) {
      // initialize tailIndexes
      neckIndex = api.getFirstTailCellIndex(flatGameBoard, state.cols)
      // neckIndex = api.getNextHeadIndex('F',direction,headIndex,state.cols)
      tailIndexes = api.getTailIndexes(
        state.cols,
        flatGameBoard,
        [neckIndex],
        neckIndex
      )
    }

    const nextHeadIndex = api.getNextHeadIndex(action, direction, headIndex, state.cols)
    const nextDirectionStr = api.getNextHead(direction, action).direction
    const nextHeadSymbol = api.getNextHead(direction, action).head
    const nextHeadOutOfBounds = api.isOutOfBounds(
      state, nextHeadIndex, nextDirectionStr, headIndex
    )|| tailIndexes.includes(nextHeadIndex)
    const gameOver = nextHeadOutOfBounds
    const deadSnakeBoard = flatGameBoard.map(c=>['^','>','v','<','*'].includes(c)?c="X":c)
    const prevLastTailIndex = tailIndexes[tailIndexes.length-1]

    flatGameBoard[nextHeadIndex]=nextHeadSymbol

    const nextBoard = gameOver ? deadSnakeBoard : flatGameBoard

    if (action=="F"){ //only move for "F"
      flatGameBoard[headIndex]='*' //changing the prev head
      flatGameBoard[prevLastTailIndex]='.'
      neckIndex = headIndex //overwrite the neckIndex
    }

    const nextTailIndexes = api.getTailIndexes(
      state.cols,
      flatGameBoard,
      tailIndexes,
      neckIndex
    )
    const nextState = {
      ...state,
      completedMoves: [...state.completedMoves, action],
      board: api.partitionArray(nextBoard, state.cols),
      gameInProgress: true,
      gameOver,
      tailIndexes: nextTailIndexes,
      directionStr: nextDirectionStr,
      headIndex: nextHeadIndex,
      headSymbol: nextHeadSymbol,
      bounds: api.getBoundaryIndexes(state),
      neckIndex: neckIndex,
      action,
      turn,
      previous: { //for debugging
        tailIndexes: tailIndexes,
        removedTailIndex: prevLastTailIndex,
        overwrittenHeadIndex: headIndex,
        neckIndex: state.neckIndex,
        action: state.action
      }
    }

     if (turn) { //for debugging
      //  console.assert(state.tailIndexes[2]==5)
      //  console.log(state)
     }

    return nextState

  }

// standalone function used to get final result of the game
export default function snakeGame(gameBoard, commands) {
  const actions = commands.split('') // e.g. ["F","R","L"]

  initialState.board = gameBoard
  initialState.cols = gameBoard[0].length
  initialState.rows = gameBoard.length


  const store = actions.reduce(reducer, initialState)
  return store.board
}
