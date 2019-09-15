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
    // handleClick(i) {
    //     const squares_arr = this.state.squares_board.slice();
    //     if (calculateWinner(squares_arr) || squares_arr[i]) {
    //         return;
    //     }
    //     squares_arr[i] = this.state.xIsNext ? 'X' : 'O';
    //     this.setState({
    //         squares_board: squares_arr,
    //         xIsNext: !this.state.xIsNext,
    //     });
    // }

    renderSquare(i) {
        return (
            <Square
             value_board={this.props.squares_game[i]}
             onClick_board={ () => this.props.onClick_game(i) }
            />
        );
    }

    render() {
        return (
            <div>
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
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares_game: Array(9).fill(null),
            }],
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history_arr = this.state.history;
        const current_arr = history_arr[ history_arr.length - 1 ];
        const squares_arr = current_arr.squares_game.slice();
        if (calculateWinner(squares_arr) || squares_arr[i]) {
            return;
        }
        // Borad上でクリックされたsquareボタンの位置が空白（既に X , O が登録されていない）
        // ならば、手番の駒（X or O）を state に記録する
        squares_arr[i] = this.state.xIsNext ? 'X' : 'O';

        // state の history に対して、上記の最新の手番を記録した配列を追加した history で上書きする。
        this.setState({
            history: history_arr.concat([{
                squares_game: squares_arr
            }]),
            // 手番を示すxIsNextの真偽値( true , false )の状態を反転させる。
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const history_arr = this.state.history;
        const current_arr = history_arr[ history_arr.length - 1 ];
        console.log(current_arr);
        const winner = calculateWinner(current_arr.squares_game);

        let status;
        if (winner) {
            status = 'Winner is ' + winner;
        } else {
            status = 'Next player is ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares_game={current_arr.squares_game}
                        onClick_game={ (i) => this.handleClick(i) } />
                </div>

                <div className="game-info">
                    {status}
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
