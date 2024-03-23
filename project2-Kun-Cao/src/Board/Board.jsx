import React, { useContext } from 'react';
import { useState } from "react";
import Cell from '../Cell/Cell';
import "./Board.css"
import { GameContext } from '../GameContextProvider';
import { useEffect } from 'react';

const ToggleButton = ({ startText, stopText, onStart, onStop }) => {
    const [isActive, setIsActive] = useState(false);
    const handleClick = () => {
        setIsActive(!isActive);
        if (isActive) {
            onStop();
        } else {
            onStart();
        }
    };
    const className = isActive ? "toggleButton buttonAlive" : "toggleButton"
    return (
        <button  className= {className} onClick={handleClick}>
            {isActive ? stopText : startText}
        </button>
    );
};

// this is the auto play component.
const AutoPlayButton = ({ startAutoPlay, stopAutoPlay }) => {
    return (
        <ToggleButton
            startText="Start Auto Play"
            stopText="Stop Auto Play"
            onStart={startAutoPlay}
            onStop={stopAutoPlay}
        />
    );
};


const Board = () => {

    const overallState = useContext(GameContext);

    const gameState = overallState.gameState;

    const setGameState = overallState.setGameState;

    const repaintBoard = overallState.repaintBoard;

    const [width, setWidth] = useState(gameState.width)
    const [height, setHeight] = useState(gameState.height)
    const [boardGrid, setBoardGrid] = useState([]);
    const [autoPlayInterval, setAutoPlayInterval] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(() => {
        const initializedBoardGrid = creat_board();
        setBoardGrid(initializedBoardGrid);
    }, []);
    const creat_board = () => {
        const newBoardGrid = [];
        for (let i = 0; i < width; i++) {
            const row = [];
            for (let j = 0; j < height; j++) {
                const cell = <Cell x={i} y={j}></Cell>
                row.push(cell);
            }
            // newBoardGrid.push(<div className="BoardRow"><span>{i + 1}{row}</span></div>);
            newBoardGrid.push(<div className="BoardRow">{row}</div>);
        }
        return newBoardGrid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (width < 3  || width > 40 || height < 3  || height > 40) {
            setErrorMessage('Width and height must be between 3 and 40.');
            console.log("Erro Out of range")
            return;
        }
        // // Handle form submission with width and height values
        // console.log("Here Im handleling Submit")
        // console.log('Width:', width, 'Height:', height);
        repaintBoard(width, height)
        setBoardGrid(creat_board());
        setErrorMessage('');
    };

    function getNeighbors(x, y) {
        const neighbors = []
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) {
                    continue
                } else if (inbound(x, y, i, j)) {
                    neighbors.push([x + i, y + j])
                }
            }
        }
        return neighbors;
    }

    function inbound(x, y, i, j) {

        if (x + i >= 0 && x + i < width &&
            y + j >= 0 && y + j < height) {
            return true
        } else {
            return false
        }
    }

    function changeStatus(x, y) {
        let className = "cell"
        const newIsAlive = !gameState.gridBoard[x][y].isAlive
        let newCount = gameState.count
        let newPreviousAliveIteration = gameState.gridBoard[x][y].previousAliveIteration
        if (newIsAlive) {
            className += " alive"
            newCount += 1
            newPreviousAliveIteration = 0;
        } else {
            className = "cell"
            newCount = (newCount > 0) ? newCount - 1 : 0
            newPreviousAliveIteration += 1;
        }

        gameState.gridBoard[x][y] = {
            isAlive: newIsAlive,
            previousAliveIteration: newPreviousAliveIteration
        }

        gameState.count = newCount

        setGameState({
            ...gameState,
            count: gameState.count,
            gridBoard: gameState.gridBoard
        })
    }

    function alterItself(neighbors, x2, y2) {
        const isAlive = gameState.gridBoard[x2][y2].isAlive
        let alive_neighbor_count = 0

        for (let i = 0; i < neighbors.length; i++) {
            const neighbor_x = neighbors[i][0], neighbor_y = neighbors[i][1];

            if (gameState.gridBoard[neighbor_x][neighbor_y].isAlive) {
                alive_neighbor_count++;
            }
        }

        if (isAlive) {
            if (alive_neighbor_count < 2 || alive_neighbor_count > 3) {
                return true
            } else {
                return false
            }
        } else {
            if (alive_neighbor_count == 3) {
                // console.log(x2, y2, "change it")
                return true
            } else {
                return false
            }
        }
    }

    function changingIteration() {
        let xBoardGrid = gameState.gridBoard;
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const prev = gameState.gridBoard[i][j].previousAliveIteration
                const isAlive = gameState.gridBoard[i][j].isAlive
                if (isAlive) {
                    continue;
                }
                const newPreviousAliveIteration = prev + 1
                xBoardGrid[i][j] = {
                    isAlive: isAlive,
                    previousAliveIteration: newPreviousAliveIteration
                }
            }
        }

      
        setGameState({
            ...gameState,
            gridBoard: xBoardGrid
        })

    }

    function checkingBoard() {
        // console.log(gameState.currentIteration)
     
        const needsToChange = [];
        let newIteration = gameState.currentIteration;
        let newColorShowed = gameState.showColor;
        changingIteration();
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const neighbors = getNeighbors(i, j);
                if (alterItself(neighbors, i, j)) {
                    needsToChange.push([i, j]);
                }
            }
        }

        // console.log(needsToChange);
      

        for (let m = 0; m < needsToChange.length; m++) {
            const x3 = needsToChange[m][0], y3 = needsToChange[m][1]
            changeStatus(x3, y3)
        }
        newIteration += 1;
        gameState.currentIteration = newIteration;
        gameState.showColor = newColorShowed;
        setGameState({
            ...overallState.gameState,
            currentIteration: gameState.currentIteration,
            showColor : gameState.showColor
        })

    }



    

    const startAutoPlay = () => {
        const intervalId = setInterval(checkingBoard, 100);
        setAutoPlayInterval(intervalId);
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
        setAutoPlayInterval(null);
    };



    function showColor() {
        setGameState({
            ...gameState,
            showColor: true
        })
    }

 

    function offColor() {
        setGameState({
            ...overallState.gameState,
            showColor: false
        })
        setColorShowed(false);
    }

    return (
        <>
            <div className="count-container">
                Living Cell Count: {gameState.count}
                
                <ToggleButton startText={"Color On"} stopText={"Color Off"} onStart={showColor} onStop={offColor} ></ToggleButton>
            </div>
          
            <div className="container">
                {boardGrid}
            </div>
            <div className="count-container">
                Current Iteration: {gameState.currentIteration}
            </div>
            <div>
                <button className='toggleButton' onClick={checkingBoard}>Next Iteration</button>
                <AutoPlayButton startAutoPlay={startAutoPlay} stopAutoPlay={stopAutoPlay} />
            </div>
            <div class="button-container" >
                {errorMessage && 
                    <div>{errorMessage}</div>
                }
                <form onSubmit={handleSubmit} class="form-container">
                    <div class="input-container">
                        <label>
                            Width:
                            <input
                                type="text"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                            />
                        </label>
                        <label>
                            Height:
                            <input
                                type="text"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                        </label>
                    </div>
                    <button className='toggleButton' type="submit">Reset</button>
                </form>
            </div>
            
        </>
        
    );
}



export default Board;