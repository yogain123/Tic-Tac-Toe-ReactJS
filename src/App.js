import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){

    super(props)
      this.state={
        board:Array(9).fill(),
        playerTurn : null,
        winner : null
      };

      this.winnerLines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ]
  }

  getBox(){
    return this.state.board.map((item,index)=>{
      return(
        <div className="box" key={index} onClick={event=>this.handleClick(index,item)}>{item}</div>
      );
    })
  }

  handleClick(index){

    if(this.state.board[index])
      return;

    if(this.state.winner){
      alert(`Game Is Over, Player ${this.state.winner} was Winner`);
      return;
    }
    let {playerTurn} = this.state;
    if(!playerTurn)
      playerTurn = "X";
    else if(playerTurn=="X")
      playerTurn = "O";
    else
      playerTurn = "X"

    let board = this.state.board;
    board[index] = playerTurn;
    this.setState({
      board,
      playerTurn
    });
    let checkWinner = this.winner();
    if(checkWinner){
      var winnerPlayer = this.state.playerTurn=="X"?"O":"X";
      alert(`Winner is player ${winnerPlayer}`);
      this.setState({winner:winnerPlayer});
    }
  }

  winner(){
    for(let item of this.winnerLines){
      let [a,b,c] = item;
      if(this.state.board[a] && this.state.board[b] && this.state.board[c] && this.state.board[a] == this.state.board[b] && this.state.board[a] == this.state.board[c])
        return true;
    }
    return false;
  }

  startGame(){
    this.setState({
      board:Array(9).fill(),
        playerTurn : null,
        winner : null
    });
  }

  render(){
    return(
      <div className="container">
      <div><h1>Tic Tac Toe</h1><button type="button" id="setMe" onClick={event=>this.startGame()} className="btn btn-success">Start</button></div>
      <div className="board">
        {this.getBox()}
      </div>
      </div>

    )
  }
}

export default App;
