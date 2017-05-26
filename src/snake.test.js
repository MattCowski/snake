import * as api from './selectors'
import snakeGame from './snakeGame'



it('test1', () => {
  expect(snakeGame([
    [".",".",".","."],
    [".",".","<","*"],
    [".",".",".","*"]
  ],"FFFFFRFFRRLLF")).toEqual([
    [".",".",".","."],
    ["X","X","X","."],
    [".",".",".","."]])
  });

  it('test2 tail', () => {
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

  it('test4 failing',()=>{
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

  it('test5',()=>{
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

  it('test6',()=>{
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

  it('test7',()=>{
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



it('should get tail indexes', () => {
    const gameBoard = [
    [".","*","*"],
    [".",".","*"],
    [".",".","v"],
    [".",".","."],
    [".",".","."],
    [".",".","."],
    [".",".","."]]
    expect(
      api.getTailIndexes(
        3,//cols
        api.flattenBoard(gameBoard),
        [5],//state.tailIndexes
        5
      )
    ).toEqual([5,2,1])
});

it('test4 issue should get tail', () => {
var board = [
  ["*","*",">"],
  ["*","*","."],
  [".",".","."],
  [".",".","."],
  [".",".","."],
  [".",".","."],
  [".",".","."]]

  expect(
    api.getNextPosition(
      1,//neckIndex
      3,
      api.flattenBoard(board),
      [1]//TODO add to tailIndexes
    )
  ).toEqual([0])

  expect(
    api.getNextPosition(
      0,//neckIndex
      3,//cols
      api.flattenBoard(board),
      [1, 0]//state.tailIndexes
    )
  ).toEqual([3])

  expect(
    api.getNextPosition(
      3,//neckIndex
      3,//cols
      api.flattenBoard(board),
      [1,0,3]//state.tailIndexes
    )
  ).toEqual([4])

  expect(
    api.getNextPosition(
      4,//neckIndex
      3,//cols
      api.flattenBoard(board),
      [1,0,3,4]//state.tailIndexes
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
