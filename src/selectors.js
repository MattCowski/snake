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
    switch(true) {
      case (direction=='<') && (command=='R'):
      case (direction=='>') && (command=='L'):
      case (direction=='^') && (command=='F'):
        return {head:'^',direction:'up'}
      case (direction=='>') && (command=='R'):
      case (direction=='<') && (command=='L'):
      case (direction=='v') && (command=='F'):
        return {head:'v', direction:'down'}
      case (direction=='>') && (command=='F'):
      case (direction=='^') && (command=='R'):
      case (direction=='v') && (command=='L'):
        return {head:'>',direction:'right'}
      case (direction=='v') && (command=='R'):
      case (direction=='<') && (command=='F'):
      case (direction=='^') && (command=='L'):
        return {head:'<',direction:'left'}
      default: throw new Error('direction not defined')
    }
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
