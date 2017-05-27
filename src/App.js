import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import snakeGame from './snakeGame'
import { connect } from 'react-redux'

// // use this function to get end result of a game i.e.:
// const board = snakeGame(
//   [ //board array with dynamic rows/col amount
//     [".",".",".",".",".",".",".",".","."],
//     [".",".","<","*","*","*",".",".","."],
//     [".",".",".",".",".","*",".",".","."],
//     [".",".",".",".","*","*",".",".","."],
//     [".",".",".",".","*",".","*","*","."],
//     [".",".",".",".","*","*","*",".","."],
//     [".",".",".",".",".",".",".",".","."]
//   ],
//   "FFLFF" //commands
// )

const App = ({board, gameOver, directionStr, headIndex, completedMoves}) =>{
  const height = board.length
  const width = board[0].length
  const boundaryStyle = {border: 'medium dashed blue', height:'150px', width:'100%', background:'', position:'absolute'}
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Snake</h2>
      </div>
      {gameOver && <p>Game Over - refresh to play again</p>}
      {board.map((row)=><Row>{row}</Row>)}
      <h3>Stats</h3>
      <code>
        completed moves: {JSON.stringify(completedMoves)}
        <br/>
        direction: {directionStr}
        <br/>
        headIndex: {headIndex}
      </code>
    </div>
  )
}


// export default App
export default connect(
  state=>state
  // mapStateToProps,
  // mapDispatchToProps
)(App)


const Row = ({children}) =>
  <div style={{height:'20px', background:'lightgrey'}}>
    {children.map((c,i)=><Cell key={i} index={i}>{c}</Cell>)}
  </div>

const Head = ({children}) => <div style={{background: 'lightgreen', width:'100%'}}>{children}</div>
const Tail = () => <div style={{background: 'green', width:'100%'}}>*</div>

const Cell = ({children, index}) =>
  <div style={{position:'absolute', left:index+'0%'}}>
    {children=='.'?'':children=='*'?<Tail/>:<Head>{children}</Head>}
  </div>
