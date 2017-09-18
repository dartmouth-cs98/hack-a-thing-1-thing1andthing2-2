import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
      	<div className="board-row">
          {this.renderSquare(35)}
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
          {this.renderSquare(40)}
          {this.renderSquare(41)}
        </div>
       	<div className="board-row">
          {this.renderSquare(28)}
          {this.renderSquare(29)}
          {this.renderSquare(30)}
          {this.renderSquare(31)}
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
        </div>
        <div className="board-row">
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
        </div>
        <div className="board-row">
          {this.renderSquare(14)}
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
        </div>
        <div className="board-row">
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
        </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(){
    super();
    this.state = {
      history: [{
        squares: Array(42).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
      columns: Array(7).fill(0),
    };
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const columns = this.state.columns.slice();

    if (calculateWinner(squares)){
      return;
    }

    //get the column that we clicked
    var column = i % 7;
    //get the index of the lowest empty square in that column
    var square_index = column + columns[column]*7;

    //Set the square to the correct persons move
    squares[square_index] = this.state.xIsNext ? 'X' : 'O';

    //if we are not overflowing over the top
    if(columns[column] < 6){
	    //update the column array to reflect this
	    columns[column] += 1;


	    this.setState({
	      history: history.concat([{
	        squares: squares,
	      }]),
	      xIsNext: !this.state.xIsNext,
	      stepNumber: history.length,
	      columns: columns,
	    });    	
    }
  }


  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }


  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game Start';
      return (
        <li key ={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if (winner){
      status = "Winner: " + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); 
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

//calculate if we have a winner
function calculateWinner(squares){
  for(let i = 0; i < squares.length; i++){
 
  	if(i % 7 < 4 && squares[i]){
  		 // check for horizontal victory
  		if(squares[i] === squares[i+1] && squares[i] === squares[i+2] && squares[i] === squares[i+3]){
  			return squares[i];
  		}

  		//check for right diagonal victory
  		if(squares[i] === squares[i+8] && squares[i] === squares[i+16] && squares[i] === squares[i+24]){
  			return squares[i];
  		}
  	}

  	//check for vertical victory
  	if(i < 21 && squares[i]){
  		if(squares[i] === squares[i+7] && squares[i] === squares[i+14] && squares[i] === squares[i+21]){
  			return squares[i]
  		}
  	}

  	//check for left diagonal victory
  	if(i % 7 > 2 && squares[i]){
  		if(squares[i] === squares[i+6] && squares[i] === squares[i+12] && squares[i] === squares[i+18]){
  			return squares[i];
  		}
  	}
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
