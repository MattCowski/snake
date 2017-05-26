  export const flattenBoard = (board) =>board.reduce(( acc, cur ) => acc.concat(cur),[])

  export const partitionArray = (array, size) => array.map( (e,i) => (i % size === 0) ? array.slice(i, i + size) : null ) .filter( (e) => e )

  const findHead = (cell)=> ['^','>','v','<'].includes(cell)
  export const getHead = (arr) => arr.findIndex(findHead)

  export const getTailCells = (arr) => arr.filter(f=>f=="*")

  export const getDirection = (board, i)=> board[i]

  export const getNextHeadIndex = (action, direction, index, cols) => {
    if (action!='F') return index
    switch(direction) {
      case '<': return index-1
      case '>': return index+1
      case '^': return index-cols
      case 'v': return index+cols
      default: throw new Error('direction is not defined')
    }
  }

  export const getNextHead = (direction, command) => {
    const up = {head:'^',direction:'up'}
    const down = {head:'v', direction:'down'}
    const left = {head:'<',direction:'left'}
    const right = {head:'>',direction:'right'}
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
      default: throw new Error('direction not defined')
    }
  }

  export const isOutOfBounds = (state, nextHeadIndex, leftOrRight, currHeadIndex)=>{
    return (leftOrRight == 'right'&&getBoundaryIndexes(state).right.includes(currHeadIndex))
    || (leftOrRight == 'left'&&getBoundaryIndexes(state).left.includes(currHeadIndex))
    || (nextHeadIndex < 0)
    || (nextHeadIndex >= flattenBoard(state.board).length)
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

  export const getFirstTailCellIndex = (flatBoard, cols) => {
    const head = getHead(flatBoard)
    const direction = getDirection(flatBoard, head)
    switch(direction){
      case '<': return head+1
      case '>': return head-1
      case 'v': return head-cols
      case '^': return head+cols
    }
  }

  export const getNextPosition = (neckBodyTailIndex, cols, flatBoard, tailIndexes)=> {
    const availablePositions = [
      neckBodyTailIndex-1,
      neckBodyTailIndex+1,
      neckBodyTailIndex-cols,
      neckBodyTailIndex+cols,
    ]
    const result = availablePositions.filter((position)=>{
      return flatBoard[position]=="*"&&!tailIndexes.includes(position)
    })
    return (result.length>1) ? [result[0]]: result
}
//ln 255
  export const getTailIndexes = ( cols, flatBoard, tailIndexes, neckIndex)=>{
    return getTailCells(flatBoard).reduce((acc,cur,index)=>{
      var neckBodyTailIndex = acc[acc.length-1]
      const val = getNextPosition(
        neckBodyTailIndex,
        cols,
        flatBoard,
        acc//tailIndexes
      )
      const result = [...acc, ...val]
      return result
    },[neckIndex])
  }
