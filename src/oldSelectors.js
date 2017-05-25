export const flattenBoard = (board) =>board.reduce(( acc, cur ) => acc.concat(cur),[])

export const partitionArray = (array, size) => array.map( (e,i) => (i % size === 0) ? array.slice(i, i + size) : null ) .filter( (e) => e )

const findHead = (cell)=> ['^','>','v','<'].includes(cell)
export const getHead = (arr) => arr.findIndex(findHead)

export const getTailCells = (arr) => arr.filter(f=>f=="*")

export const getDirection = (board, i)=> board[i]

export const getNeighborCell = (board, head, ignoredCells, rowLen)=> {
  // check possible cells that arent already acounted for

  const newIndex = ignoredCells.length?ignoredCells[ignoredCells.length-1]:head//
  // if (!ignoredCells.length) console.log('no ignoredCells')
  // console.log('head'+head,'ignoredCells'+ignoredCells, 'newIndex'+newIndex, 'rowLen'+rowLen)//[]
  // console.log(i, ignoredCells, newIndex)
  if (board[newIndex-1]=="*"&&!ignoredCells.includes(newIndex-1)) return newIndex-1
  if (board[newIndex+1]=="*"&&!ignoredCells.includes(newIndex+1)) return newIndex+1
  if (board[newIndex+rowLen]=="*"&&!ignoredCells.includes(newIndex+rowLen)) return newIndex+rowLen
  if (board[newIndex-rowLen]=="*"&&!ignoredCells.includes(newIndex-rowLen)) return newIndex-rowLen
  console.log('returning null')
  return undefined
}
export const getFutureCell =(direction,index, command, rowLen)=>{
  const v = command=='F'?rowLen:0
  const h = command=='F'?1:0
  const up = {index:index-v,head:'^',direction:'up'}
  const down = {index:index+v,head:'v', direction:'down'}
  const left = {index:index-h,head:'<',direction:'left'}
  const right = {index:index+h,head:'>',direction:'right'}
  switch(direction) {
    case '<':
      if(command=='F') return left
      if(command=='R') return up
      if(command=='L') return down
      return
    case '>':
      if(command=='F') return right
      if(command=='R') return down
      if(command=='L') return up
      return
    case '^':
      if(command=='F') return up
      if(command=='R') return right
      if(command=='L') return left
      return
    case 'v':
      if(command=='F') return down
      if(command=='R') return left
      if(command=='L') return right
      return
    default: return index
  }
}

export const isOutOfBounds = (state, dir, index, command, leftOrRight, headIndex)=>{
  return (leftOrRight == 'right'&&getBoundaryIndexes(state).right.includes(headIndex))
  || (leftOrRight == 'left'&&getBoundaryIndexes(state).left.includes(headIndex))
  || (index < 0)
  || (index >= flattenBoard(state.board).length)
}
export const getBoundaryIndexes = ({rows,cols})=>{
  const result = {
    left:[0],
    right:[]
  }
  for (var i = 1; i < rows+1; i++) {
    result.left.length<rows && result.left.push(cols*i)
    result.right.push(cols*i-1)
  }
  return result
}

// export const getTailIndexes = (board,headIndex,rowLen)=>{
//   return getTailCells(board).reduce((acc, cur, curIndex)=>{
//     const tailindex = getNeighborCell(board, headIndex,acc,rowLen)
//     const result = tailindex==undefined?acc:[...acc, tailindex]
//     // console.log(headIndex, result, tailindex==undefined?'undefined':'')
//     return result
//   },[])// return [6,7,11]
// }

export const getFirstTailCellIndex = (board) => {
  const flatBoard = flattenBoard(board)
  const head = getHead(flatBoard)
  const direction = getDirection(flatBoard, head)
  const cols = board[0].length
  switch(direction){
    case '<': return head+1
    case '>': return head-1
    case 'v': return head-cols
    case '^': return head+cols
  }
}

export const getNextPosition = (lastTailIndex, cols, flatBoard, tailIndexes)=> {
  // console.log(lastTailIndex, 'cols', 'flatBoard', tailIndexes)
  const availablePositions = [
    lastTailIndex-1,
    lastTailIndex+1,
    lastTailIndex-cols,
    lastTailIndex+cols,
  ]
  return availablePositions.filter((position)=>{
    return flatBoard[position]=="*"&&!tailIndexes.includes(position)
  })
}
//ln 255
export const getTailIndexes = ( cols, flatBoard, tailIndexes)=>{
  var lastTailIndex = tailIndexes[tailIndexes.length-1]
  console.log('issue here? lastTail:',lastTailIndex)
  return getTailCells(flatBoard).reduce((acc,cur,index)=>{
    var lastTail = acc[acc.length-1]||lastTailIndex
    // console.log('acc is', acc)
    const val = getNextPosition(
      lastTail,//lastTailIndex,
      cols,
      flatBoard,
      acc//tailIndexes
    )
    const result = [...acc, ...val]
    console.log('returns',result)
    return result
  },[lastTailIndex])//.reverse()



}
