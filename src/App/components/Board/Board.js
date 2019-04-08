import React from "react";
import Tile from "../Tile/Tile";
import PropTypes from 'prop-types';
import './_board.scss'
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zero: 0,
            possibleTopIdx: 0,
            possiblRightIdx: 0,
            possiblBottomIdx: 0,
            possibleLeftIdx: 0
        }
        this.boardRef = React.createRef();
    }

    componentWillMount() {
        this.getClickables(this.props.board, this.props.size);
    }
    componentWillReceiveProps(nextProps) {
        this.getClickables(nextProps.board, nextProps.size);
    }

    shouldComponentUpdate(nextProps) {
        const curr = this.props.board.join('');
        const next = nextProps.board.join('');
        return curr !== next;
    }

    getClickables(board, size) {
        const zeroIndex = board.indexOf(0);
        const zeroCoordinate = this.getCoordFromIndex(zeroIndex, size);
        const possibleTopIdx = zeroCoordinate.row > 0 ? this.getIndexFromCoord(zeroCoordinate.row - 1, zeroCoordinate.column, size) : null;
        const possiblRightIdx = zeroCoordinate.column < size ? this.getIndexFromCoord(zeroCoordinate.row, zeroCoordinate.column + 1, size) : null;
        const possiblBottomIdx = zeroCoordinate.row < size ? this.getIndexFromCoord(zeroCoordinate.row + 1, zeroCoordinate.column, size) : null;
        const possibleLeftIdx = zeroCoordinate.column > 0 ? this.getIndexFromCoord(zeroCoordinate.row, zeroCoordinate.column - 1, size) : null;
        this.setState({
            zero: zeroIndex,
            possibleTopIdx: possibleTopIdx,
            possiblRightIdx: possiblRightIdx,
            possiblBottomIdx: possiblBottomIdx,
            possibleLeftIdx: possibleLeftIdx
        });
    }

    getCoordFromIndex(idx, size) {
        return {row: Math.floor(idx / size) + 1, column: (idx % size) + 1};
    }

    getIndexFromCoord(row, col, size) {
        return (size * (row - 1)) + col - 1;
    }

    tileClickHandler(index) {
        if (index === this.state.possibleTopIdx || index === this.state.possiblRightIdx ||
            index === this.state.possiblBottomIdx || index === this.state.possibleLeftIdx){
            this.nextBoard(index);
        }

    }

    nextBoard(index) {
        const board = this.props.board.slice();
        const temp = board[index];
        board[index] = board[this.state.zero];
        board[this.state.zero] = temp;
        this.props.updateBoard(board);
        let animWrap = this.boardRef.current;
        console.log(animWrap);
        let Block = animWrap.children;
        let indexBlock = Array.from(Block);
        let animateIt = indexBlock[index];
        if(index === this.state.possibleTopIdx){
            animateIt.classList.add('top');
            console.log(animateIt);
        }if(index === this.state.possiblRightIdx){

            animateIt.classList.add('right');
            console.log(animateIt);
        }
        if(index === this.state.possiblBottomIdx){
                  animateIt.classList.add('bottom')
            console.log(animateIt);

        }
        if(index === this.state.possibleLeftIdx){
            animateIt.classList.add('left');
            console.log(animateIt);

        }
        //handle anim

    }

    render() {
        const {size,board} = this.props;

        const squares = board.map((val, index) => {
            if ((index + 1) % this.props.size === 0) {
                return (
                    <Tile key={index} value={val} clickHandler={this.tileClickHandler.bind(this, index)}/>

                );
            }
            return <Tile key={index} value={val} clickHandler={this.tileClickHandler.bind(this, index)}/>;
        });
        return (
            <div className='wrap-box' ref={this.boardRef} style={{gridTemplateColumns: `repeat(${size}, 1fr)`,}}>
                {squares}
            </div>
        );
    }
}

Board.propTypes = {
    size: PropTypes.number.isRequired,
    board:PropTypes.array.isRequired,
    updateBoard:PropTypes.func.isRequired,
};

export default Board;