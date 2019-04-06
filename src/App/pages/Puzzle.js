import React from "react";
import Board from "../components/Board/Board";
import './_Puzzle.scss';
class Puzzle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { board: [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,15, 0], size: 4 };
    }


    newGame(size) {
        let board = new Array(size * size);
        for (let i = 0; i < size * size; ++i) board[i] = i;
        board = this.shuffle(board);
        this.updateBoard(board, size);
        this.setState({ size: size });
    }

    //update board
    updateBoard(board, size) {
        this.setState({ board: board });
    }

    //manage shuffle

    shuffle= (o) =>{
        const tempV = o.slice();
        for(let j, x, i = tempV.length; i; j = Math.floor(Math.random() * i), x = tempV[--i], tempV[i] = tempV[j], tempV[j] = x)
        return tempV;
    };
    render() {
        return (
            <div className="page">
                <div className='wrap-pz'>
                    <div className="body-wrap">
                        <div className="header">
                            <h3>Finish puzzle</h3>
                        </div>
                        {
                            this.state && this.state.board ?
                                <Board size={this.state.size} board={this.state.board} updateBoard={this.updateBoard.bind(this)}/>
                                : null
                        }
                    </div>

                    <input type='submit' className={'btn'} value='Shuffle' onClick={this.newGame.bind(this, 4)} />
                </div>
            </div>

        );
    }
}


export default Puzzle;