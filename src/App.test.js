// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
import * as api from './selectors'
import snakeGame from './snakeGame'



const gameBoard = [
  ['.', '.', '.', '.'],
  ['.', '<', '*', '*'],
  ['.', '.', '.', '*']
]

const test6problem = [
  [ '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
  [ '.', '.', '*', '*', '*', '*', '*', '.', '.' ],
  [ '.', '.', '*', 'v', '.', '.', '*', '.', '.' ],
  [ '.', '.', '.', '.', '*', '*', '*', '.', '.' ],
  [ '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
  [ '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
  [ '.', '.', '.', '.', '.', '.', '.', '.', '.' ]
]


// it('returns right side bounds', () => {
//   expect(api.getBoundaryIndexes(gameBoard).right).toEqual([3,7,11])
//   expect(api.getBoundaryIndexes(gameBoard).left).toEqual([0,4,8])
//   expect(api.getBoundaryIndexes([
//     [".",".","^",".","."],
//    [".",".","*","*","."],
//    [".",".",".","*","*"]
//  ]).left).toEqual([0,5,10])
//   expect(api.getBoundaryIndexes([
//     [".",".","^",".","."],
//    [".",".","*","*","."],
//    [".",".",".","*","*"]
//  ]).right).toEqual([4,9,14])
// });
//
// it('moves snake 1 spot forward', () => {
//   expect(snakeGame(gameBoard,"F")).toEqual([
//      ['.', '.', '.', '.'],
//      ['<', '*', '*', '*'],
//      ['.', '.', '.', '.']
//   ])
// });
// it('moves snake 1 spot left', () => {
//   expect(snakeGame(gameBoard,"L")).toEqual([
//      ['.', '.', '.', '.'],
//      ['.', '*', '*', '*'],
//      ['.', 'v', '.', '.']
//   ])
// });
//
// it('ends game if out of bounds', () => {
//   expect(snakeGame([
//      ['.', '.', '.', '.'],
//      ['<', '*', '*', '*'],
//      ['.', '.', '.', '.']
//   ],"F")).toEqual([
//      ['.', '.', '.', '.'],
//      ['X', 'X', 'X', '.'],
//      ['.', '.', '.', '.']
//   ])
// });
//
// it('ends game if out of bounds', () => {
//   expect(snakeGame([
//      ['.', '.', '.', '^'],
//      ['.', '*', '*', '*'],
//      ['.', '.', '.', '.']
//   ],"R")).toEqual([
//      ['.', '.', '.', 'X'],
//      ['.', '.', 'X', 'X'],
//      ['.', '.', '.', '.']
//   ])
// });
//
// // 3
// // 7, 6
xit('should find neighbor cell', () => {
  const board = ['.', '.', '.', '^','.', '*', '*', '*','.', '.', '.', '.']
  expect(
    api.getNeighborCell(
      board,
      3, [], 4
    )
).toEqual(7)

  expect(
    api.getNeighborCell(
      board,
      3, [7], 4
    )
  ).toEqual(6)

  expect(
    api.getNeighborCell(
      board,
      3, [7,6], 4
    )
  ).toEqual(5)
});

xit('should find neighbor cell', () => {
  const flattened = api.flattenBoard(gameBoard)
  expect(
    api.getNeighborCell(
      flattened,
      5, [], 4
    )// [".", ".", ".", ".", ".", "<", "*", "*", ".", ".", ".", "*"]
  ).toEqual(6)

  expect(
    api.getNeighborCell(
      flattened,
      5, [6], 4
    )// [".", ".", ".", ".", ".", "<", "*", "*", ".", ".", ".", "*"]
  ).toEqual(7)

  expect(
    api.getNeighborCell(
      flattened,
      5, [6,7], 4
    )// [".", ".", ".", ".", ".", "<", "*", "*", ".", ".", ".", "*"]
  ).toEqual(11)
});


xit('test4 should find neighbor cell', () => {
  const flattened = api.flattenBoard([
    ["*","*",">"],
    ["*",".","."],
    [".",".","."],
    [".",".","."],
    [".",".","."],
    [".",".","."],
    [".",".","."]
  ])
  expect(
    api.getNeighborCell(
      flattened,
      2, [], 3
    )
  ).toEqual(1)

  expect(
    api.getNeighborCell(
      flattened,
      2, [1], 3
    )
  ).toEqual(0)

  expect(
    api.getNeighborCell(
      flattened,
      2, [1,0], 3
    )
  ).toEqual(3)

  expect(
    api.getNeighborCell(
      flattened,
      2, [1,0,3], 3
    )
  ).toEqual(undefined)

  // expect(
  //   api.getNeighborCell(
  //     flattened,
  //     2, [5,2,1], 3
  //   )
  // ).toEqual(4)//4,5,2
});

xit('test4 should find neighbor cell', () => {
  const flattened = api.flattenBoard([
    ["*","*",">"],
    ["*",".","."],
    [".",".","."],
    [".",".","."],
    [".",".","."],
    [".",".","."],
    [".",".","."]
  ])

  expect(
    api.getTailIndexes(
      flattened,
      2, 3
    )
  ).toEqual([1,0,3])
});


xit('test4 issue should get tail', () => {
var board = [
[ '*', '*', '*' ],
[ '.', '<', '*' ],
[ '.', '.', '.' ],
[ '.', '.', '.' ],
[ '.', '.', '.' ],
[ '.', '.', '.' ],
[ '.', '.', '.' ] ]

  expect(
    api.getNextPosition(
      5,
      3,
      api.flattenBoard(board),
      [5]//TODO add to tailIndexes
    )
  ).toEqual([2])

  expect(
    api.getNextPosition(
      2,//lastTailIndex
      3,//cols
      api.flattenBoard(board),
      [5, 2]//state.tailIndexes
    )
  ).toEqual([1])

  expect(
    api.getNextPosition(
      1,//lastTailIndex
      3,//cols
      api.flattenBoard(board),
      [5, 2, 1]//state.tailIndexes
    )
  ).toEqual([0])

  expect(
    api.getNextPosition(
      0,//lastTailIndex
      3,//cols
      api.flattenBoard(board),
      [5, 2, 1, 0]//state.tailIndexes
    )
  ).toEqual([])//TODO handle if empty
var board = [
         [ '.', '.', '*', '>', '.' ],
         [ '*', '*', '*', '.', '.' ],
         [ '.', '.', '.', '.', '.' ] ]
   expect(
     api.getNextPosition(
       2,//lastTailIndex
       5,//cols
       api.flattenBoard(board),
       [2]//state.tailIndexes
     )
   ).toEqual([7])

   expect(
     api.getNextPosition(
       7,//lastTailIndex
       5,//cols
       api.flattenBoard(board),
       [2,7]//state.tailIndexes
     )
   ).toEqual([6])

  expect(
    api.getNextPosition(
      6,//lastTailIndex
      5,//cols
      api.flattenBoard(board),
      [2,7,6]//state.tailIndexes
    )
  ).toEqual([5])
});

xit('should get tail indexes', () => {
  var board =
           [[".",".","*",">","."],
           ["*","*","*",".","."],
           [".",".",".",".","."]]
    expect(
      api.getTailIndexes(
        // 2,//lastTailIndex
        5,//cols
        api.flattenBoard(board),
        [2]//state.tailIndexes
      )
    ).toEqual([2,7,6,5])


});
//
//
// it('ends game if out of bounds', () => {
//   expect(snakeGame([
//      ['.', '.', '.', '.'],
//      ['.', '*', '*', '*'],
//      ['.', 'v', '.', '.']
//   ],"F")).toEqual([
//      ['.', '.', '.', '.'],
//      ['.', 'X', 'X', '.'],
//      ['.', 'X', '.', '.']
//   ])
// });
//
//
// it('ends game if out of bounds', () => {
//   expect(snakeGame([
//      ['.', '^', '.', '.'],
//      ['.', '*', '*', '*'],
//      ['.', '.', '.', '.']
//   ],"F")).toEqual([
//      ['.', 'X', '.', '.'],
//      ['.', 'X', 'X', '.'],
//      ['.', '.', '.', '.']
//   ])
// });

xit('test1', () => {
  expect(snakeGame([
    [".",".",".","."],
    [".",".","<","*"],
    [".",".",".","*"]
  ],"FFFFFRFFRRLLF")).toEqual([
    [".",".",".","."],
    ["X","X","X","."],
    [".",".",".","."]])
  });

  xit('test2 tail', () => {
    expect(snakeGame([
      [".",".","^",".","."],
      [".",".","*","*","."],
      [".",".",".","*","*"]
    ],"RFRF")).toEqual([
      [".",".","X","X","."],
      [".",".","X","X","."],
      [".",".",".","X","."]
    ])
  });


  it('test3',()=>{
    const gameBoard = [[".",".","*",">","."],
    [".","*","*",".","."],
    [".",".",".",".","."]]
    const commands= "FRFFRFFRFLFF"

    const output = [
    [".",".",".",".","."],
    ["<","*","*",".","."],
    [".",".","*",".","."]]
    expect(snakeGame(gameBoard,commands)).toEqual(output)
  })

  xit('test4 failing',()=>{
    const gameBoard = [
    ["*","*",">"],
    ["*",".","."],
    [".",".","."],
    [".",".","."],
    [".",".","."],
    [".",".","."],
    [".",".","."]]
    const commands= "RFRFFLFLFFRFRFFLFLFFRFRFFLFF"

    const output =  [[".",".","."],
    [".",".","."],
    [".",".","."],
    [".",".","."],
    [".",".","."],
    ["X","X","X"],
    ["X",".","."]]
    expect(snakeGame(gameBoard,commands)).toEqual(output)
  })

  xit('test5',()=>{
    const gameBoard = [[".",".",".",".",".",".",".",".","."],
    [".",".","<","*","*","*","*",".","."],
    [".",".",".",".",".",".","*",".","."],
    [".",".",".",".","*","*","*",".","."],
    [".",".",".",".","*",".",".",".","."],
    [".",".",".",".","*",".",".",".","."],
    [".",".",".",".",".",".",".",".","."]]
    const commands= "FFFFFRFFRRLLF"

    const output = [
    [".",".",".",".",".",".",".",".","."],
    ["X","X","X","X","X","X","X",".","."],
    [".",".",".",".",".",".","X",".","."],
    [".",".",".",".","X","X","X",".","."],
    [".",".",".",".",".",".",".",".","."],
    [".",".",".",".",".",".",".",".","."],
    [".",".",".",".",".",".",".",".","."]]
    expect(snakeGame(gameBoard,commands)).toEqual(output)
  })

  xit('test6',()=>{
    const gameBoard = [
    [".",".",".",".",".",".",".",".","."],
    [".",".","<","*","*","*","*",".","."],
    [".",".",".",".",".",".","*",".","."],
    [".",".",".",".","*","*","*",".","."],
    [".",".",".",".","*",".",".",".","."],
    [".",".",".",".","*",".",".",".","."],
    [".",".",".",".",".",".",".",".","."]]
    const commands= "LFLFRFLFRFFF"

    const output = [
    [".",".",".",".",".",".",".",".","."],
    [".",".","*","*","*","*",".",".","."],
    [".",".","*","*",".",".",".",".","."],
    [".",".",".","*","*",".",".",".","."],
    [".",".",".",".","*",".",".",".","."],
    [".",".",".",".","*",".",".",".","."],
    [".",".",".",".","v",".",".",".","."]]
    expect(snakeGame(gameBoard,commands)).toEqual(output)
  })

  xit('test7',()=>{
    const gameBoard = [
    [".",".",".",".",".",".",".",".","."],
    [".",".","<","*","*","*",".",".","."],
    [".",".",".",".",".","*",".",".","."],
    [".",".",".",".","*","*",".",".","."],
    [".",".",".",".","*",".","*","*","."],
    [".",".",".",".","*","*","*",".","."],
    [".",".",".",".",".",".",".",".","."]]
    const commands= "LFLFLFFFF"

    const output = [
    [".",".",".",".",".",".",".",".","."],
    [".",".","X","X","X","X",".",".","."],
    [".",".","X","X",".","X",".",".","."],
    [".",".",".",".","X","X",".",".","."],
    [".",".",".",".","X",".",".",".","."],
    [".",".",".",".","X","X","X",".","."],
    [".",".",".",".",".",".",".",".","."]]
    expect(snakeGame(gameBoard,commands)).toEqual(output)
  })
