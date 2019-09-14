import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



function Square(props) {
    return (
        <button className="square" onClick={ () => props.onClick_board() }>
            {props.value_board}
        </button>
    );
}


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares_board: Array(9).fill(null),
            xIsNext: true,
        };
    }

    renderSquare(i) {
        return (
            <Square
             value_board={this.state.squares_board[i]}
             onClick_board={ () => this.handleClick(i) }
            />
        );
    }

    handleClick(i) {
        const squares_arr = this.state.squares_board.slice();
        if (calculateWinner(squares_arr) || squares_arr[i]) {
            return;
        }
        squares_arr[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares_board: squares_arr,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const winner = calculateWinner(this.state.squares_board);
        let status;
        if (winner) {
            status = 'winner is ' + winner;
        } else {
            status = 'Next player is ' + (this.state.xIsNext ? 'X' : 'O');
        }
        
        return (
            <div>
                <div className="status"> {status} </div>

                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}


class Game extends React.Component {

    render() {

        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>

                <div className="game-info">
                    {/* status */}
                    {/* TODO */}
                </div>
            </div>
        );
    }

}


// ========================================

ReactDOM.render(
    <Game />, document.getElementById('root')
);


function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
