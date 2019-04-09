import React from "react";
import Board from "../components/Board/Board";
import './_Puzzle.scss';
import PropTypes from 'prop-types';
import sfIcon from '../assets/img/shuffle.svg'
class Puzzle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { board: [], size: 0 };
    }
    componentDidMount(){
        const {puzzleSize} = this.props;
        let sizeArray = [];
        for (let idx = 0; idx<puzzleSize*puzzleSize; idx++){
            sizeArray.push(idx);
        }
        this.setState({
            board:sizeArray,
            size:puzzleSize,
        },()=>{
            this.newGame(puzzleSize)
        })
    }


    newGame(size) {
        let board = new Array(size * size);
        for (let i = 0; i < size * size; ++i) board[i] = i;
        board = this.shuffle(board);
        this.updateBoard(board, size);
        this.setState({ size: size });
    }

    //update board
    updateBoard(board) {
        this.setState({ board: board});
    }

    //manage shuffle

    shuffle= (array) =>{
        // const tempV = o.slice();
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
            return array;

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
                    <button className={'btn'} value='Shuffle' onClick={this.newGame.bind(this, this.props.puzzleSize)}> <span><img
                        src={sfIcon} alt=""/></span></button>
                </div>
            </div>
        );
    }
}

Puzzle.propTypes = {
    puzzleSize: PropTypes.number.isRequired,
};


export default Puzzle;