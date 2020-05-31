# Creating Puzzle - Coding Challenge

> Welcome to the Mckinley & Rice Coding Challenge!


## Overview

To complete this challenge, you will need to write a simple [React](https://facebook.github.io/react/) web app, and provide us the source files to be built.

This challenge is expected to take about 2-4 hours.

    1`

# 15 Puzzle Challenge
This challenge is designed to help us understand how you write code. The execution is intentionally open and there's no one right way to solve it. Focus on the code as the visual appearance will not be under review.

<pre>
+--------------------
|     ||     ||     |
|     ||     ||     |
+--------------------
|     ||     ||     |
|     ||     ||     |
+--------------------
|     ||     |      |
|     ||     |      |
+-------------------+
</pre>

## Objective
Create a tile puzzle interface that consists of a frame divided into even tiles with one tile missing. These tiles should then be randomised so that user interaction is required to resolve the original frame. Tiles may only be moved into the empty position.


### Technology recommendations
- ES6, React & SASS

### Criteria
- Code quality (includes elegance, consistency & readability)
- Usability (operates without error and responsive to browser/device)
- Reusability (bonus points for any reusable elements)

## Reference
<https://en.wikipedia.org/wiki/15_puzzle>

## [Checkout Demo](http://pawanrana1992.github.io/puzzle-test)

### Hierarchy of project
<pre>
=> root
     |
     |->public
     |  |  
     |  |-->  favicon.ico
     |  |-->  index.html
     |  |-->  manifest.json
     |->src
     |  |
     |  |--> App
     |  |    |
     |  |    |--> assets
     |  |    |--> sass
     |  |    |     |
     |  |    |     |--> mixins
     |  |    |     |--> utility
     |  |    |     |--> _variable.scss
     |  |    |     |--> _export_to_component.scss  it is exporting variable and mixins for use in seperate component
     |  |    |     |--> app-style.scss  //main style for application
     |  |    |--> component
     |  |          |
     |  |          |--> Board
     |  |          |--> Tile
     |  |          |--> Pages
     |  |
     |-> app.js
     |-> index.js
     |-> serviceWorkey.js // for handle PWA type of application

</pre>

### To run this project
Note: min node version required `latest`, React version required `16.8.6`, `NPM` greater than `5.0`
```bash
npm install
```
-After all modules successfully installed in local project.
```bash
npm run start
```
or
```bash
npm start
```

### To build this project for production use
```bash
npm run build
```
 -After build - check `./build` directory inside root folder. This build directory has all the compiled files included. Take this folder and point your domain to `build` directory.



### Styled with sass processor with scss extension
-For dynamic and re-usable css on particular component style, it is best practice to use sass processor

### Detailed information about components

-Main Puzzle wrapper component <br>
-path `./src/components/pages/Puzzle.js`

```jsx
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
                    <input type='submit' className={'btn'} value='Shuffle' onClick={this.newGame.bind(this, 4)} />
                </div>
            </div>

        );
    }
}


export default Puzzle;
```

-let's break above component class and it's methods here
- `class Puzzle extends React.Component {}`

-- Initialize constructor for initial state of this game so when game is started it will be show default layout.
```jsx
class Puzzle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { board: [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,15, 0], size: 4 };
    }

```

--Created `newGame()` method for refresh layout. It will take param to create board and add tiles in a row or column as per given size. `ex: newGame(4)`
```jsx

//create new game or reset layout

    newGame(size) {
        let board = new Array(size * size);
        for (let i = 0; i < size * size; ++i) board[i] = i;
        board = this.shuffle(board);
        this.updateBoard(board, size);
        this.setState({ size: size });
    }

```

-- Helper method to update state `updateBoard()` It is taking two parameters `board` and `size`

```jsx

 //update board
    updateBoard(board, size) {
        this.setState({ board: board });
    }

```

--When `newGame(oldArray)` executed make tiles will be shuffle with new position.

`shuffle()` method take old array and return new array with new index. So tiles will be change position when user click on `shuffle`
button.

```jsx
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
```

--Lets render main component. It has two more component `Board` and `Tile` it helps `Puzzle` component to handle user action.
  
```jsx
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
```

#### It is possible that if we need more than 4X4 size of Puzzle
-Yes as component is created for dynamic use it should be handled by passing params to the `newGame()` method.
<br>
it is Easy
```jsx
<input type='submit' className={'btn'} value='Shuffle' onClick={this.newGame.bind(this, 4)} />

```

### Create Board Component to handle Board of Puzzle
-path `./src/components/Board/Board.js`

```jsx
import React from "react";
import Tile from "../Tile/Tile";
import PropTypes from 'prop-types';
import './_board.scss'
class Board extends React.Component {
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
            index === this.state.possiblBottomIdx || index === this.state.possibleLeftIdx) this.nextBoard(index);
    }

    nextBoard(index) {
        const board = this.props.board.slice();
        const temp = board[index];
        board[index] = board[this.state.zero];
        board[this.state.zero] = temp;
        this.props.updateBoard(board);
    }

    render() {
        const squares = this.props.board.map((val, index) => {
            if ((index + 1) % this.props.size === 0) {
                return (
                    <Tile key={index} value={val} clickHandler={this.tileClickHandler.bind(this, index)}/>

                );
            }
            return <Tile key={index} value={val} clickHandler={this.tileClickHandler.bind(this, index)}/>;
        });
        return (
            <div className='wrap-box'>
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
```
#####Board class component
--Let's break `Board` class Component and its methods. 

Here we don't need any initial state to manage it self. So don't create useless Constructor.

-- This component is taking props from parent component which is `Puzzle` component. So we need to validate it's props type to get verified props from parent.

```jsx 
Board.propTypes = {
    size: PropTypes.number.isRequired,
    board:PropTypes.array.isRequired,
    updateBoard:PropTypes.func.isRequired,
};

```

-Create some methods inside `Board` component to manage runtime co-ordinates and events and update back `Puzzle` component.

##### Get Clickables element
-- It will be get clickable tile with its index and check position of all `left`,`right`,`top` and `bottom` elements around it. 
-- after get all details it will set new state for indexing.
```jsx
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
```

Separate  method to get coordinates from index.

```jsx
getCoordFromIndex(idx, size) {
        return {row: Math.floor(idx / size) + 1, column: (idx % size) + 1};
    }

```

get index from coordinates
```jsx
 getIndexFromCoord(row, col, size) {
        return (size * (row - 1)) + col - 1;
    }

```

Add click event handler in this component and pass this event to `Tile` component.

```jsx
 tileClickHandler(index) {
        if (index === this.state.possibleTopIdx || index === this.state.possiblRightIdx ||
            index === this.state.possiblBottomIdx || index === this.state.possibleLeftIdx) this.nextBoard(index);
    }

```

Helper method to Update board when user click on any tile

```jsx
nextBoard(index) {
        const board = this.props.board.slice();
        const temp = board[index];
        board[index] = board[this.state.zero];
        board[this.state.zero] = temp;
        this.props.updateBoard(board);
    }
```
-let manage lifecycle when user did any action.
<br>
When component mounted execute helper method to check clickable tile `this.getClickables(this.props.board, this.props.size);`

-After mounted check runtime props from parent and update `Board` accordingly.

-Also check upcoming props is it same event. Compare and update it with `shouldComponentUpdate(nextProps) {}`

```jsx
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

```

#### Render Board Component
-- Now It will render tiles after all true.
```jsx
render() {
        const squares = this.props.board.map((val, index) => {
            if ((index + 1) % this.props.size === 0) {
                return (
                    <Tile key={index} value={val} clickHandler={this.tileClickHandler.bind(this, index)}/>

                );
            }
            return <Tile key={index} value={val} clickHandler={this.tileClickHandler.bind(this, index)}/>;
        });
        return (
            <div className='wrap-box'>
                {squares}
            </div>
        );
    }
```



### Handle Single tile 
-Create single `Tile` class component to handle each Tile event separately.

```jsx
import React from "react";
import PropTypes from 'prop-types';
import './_tile.scss'
class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.tileRef = React.createRef();
        this.state = {
            width: '100%',
            height:'100%'
        };
        this.handleSize = this.handleSize.bind(this)
    }
    componentDidMount(){
        this.handleSize();
        window.addEventListener('resize',this.handleSize,false)
    }
    handleSize = ()=>{
        let elm = this.tileRef.current.clientWidth;
        this.setState({
            height: elm+'px'
        })
    };
    componentWillUnmount(){
        window.removeEventListener('resize',this.handleSize);
    }
    render() {
        const {height} = this.state;
        const cls = this.props.value === 0 ? 'tile zero' : 'tile';
        return (
            <span style={{height:height, lineHeight:height}} ref={this.tileRef} className={cls} onClick={() => this.props.clickHandler()}>{this.props.value}</span>
        );
    }
}
Tile.propTypes = {
    value: PropTypes.number.isRequired,
    clickHandler: PropTypes.func.isRequired,
};
export default Tile;

```

-Let's Break `Tile` Component rendering and its events or methods.

-Need to manage responsiveness so add `state` in constructor with `ref` of particular tile. Also need to bind method because Asynchronously it will update height of particular tile.

```jsx
constructor(props) {
        super(props);
        this.tileRef = React.createRef();
        this.state = {
            width: '100%',
            height:'100%'
        };
        this.handleSize = this.handleSize.bind(this)
    }

``` 
-Also this component will share event to the parent and get index value form parent so need to check prop types to validate props.

```jsx
Tile.propTypes = {
    value: PropTypes.number.isRequired,
    clickHandler: PropTypes.func.isRequired,
};

```
-let's add `resize` event handler to this component to check width and set height to this `Tile` component.<br>

Need to add event listener after component is initialized in dom. To work this event properly.<br>

also Initially need to call `handleSize()` method to update `Tile` height.  

```jsx 
 componentDidMount(){
        this.handleSize();
        window.addEventListener('resize',this.handleSize,false)
    }
    
    handleSize = ()=>{
            let elm = this.tileRef.current.clientWidth;
            this.setState({
                height: elm+'px'
            })
        };
``` 

-Remove event listener after component will un-mount. If Don't remove listener it will get memory leak and app goes down.

```jsx
componentWillUnmount(){
        window.removeEventListener('resize',this.handleSize);
    }

```

-Now render `Tile` component

```jsx
render() {
        const {height} = this.state;
        const cls = this.props.value === 0 ? 'tile zero' : 'tile';
        return (
            <span style={{height:height, lineHeight:height}} ref={this.tileRef} className={cls} onClick={() => this.props.clickHandler()}>{this.props.value}</span>
        );
    }

```

All good lets run the project and check it in your browser `http://localhost:3000`