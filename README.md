# Mckinley & Rice React Coding Challenge

> Welcome to the Mckinley & Rice Coding Challenge!


## Overview

To complete this challenge, you will need to write a simple [React](https://facebook.github.io/react/) web app, and provide us the source files to be built.

This challenge is expected to take about 2-4 hours.



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

### Hierarchy of project
<pre>
=> root
     |
     |->public
     |  |  
     |  |--->  favicon.ico
     |  |--->  index.html
     |  |-->  manifest.json
     |->src
     |  |
     |  |--> App
     |  |    |
     |  |    |--> assets
     |  |    |--> sass
     |  |          |
     |  |          |-->mixins
     |  |          |-->utility
     |  |          |-->_variable.scss
     |  |          |-->_export_to_component.scss  it is exporting variable and mixins for use in seperate component
     |  |          |- ->app-style.scss  //main style for application
     |  |    -> component
     |  |        |
     |  |         -> Board
     |  |         -> Tile
     |  |         -> Pages
     |  |
     |-> app.js
     |-> index.js
     |-> serviceWorkey.js // for handle PWA type of application

</pre>

### To run this project
```bash
npm install
```
-After all modules successfully installed in local project.
```bash
npm run start
```
or
```bash
npm install
```

### To build this project for production use
```bash
npm run build
```
 -After build - check "./build" directory in root folder. This build directory has all the compiled files included. Take this folder and point your domain to "build" directory.



### Styled with sass processor with scss extension
-For dynamic and re-usable css on particular component style, it is best practice to use sass processor

### Find component details

- Main Puzzle wrapper component
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
//manage shuffle

    shuffle= (o) =>{
        const tempV = o.slice();
        for(let j, x, i = tempV.length; i; j = Math.floor(Math.random() * i), x = tempV[--i], tempV[i] = tempV[j], tempV[j] = x)
        return tempV;
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



