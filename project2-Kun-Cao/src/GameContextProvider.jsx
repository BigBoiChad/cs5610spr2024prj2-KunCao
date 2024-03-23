import { useState } from "react";
import { createContext } from "react";


export const GameContext = createContext();

export const GameContextProvider = (props) => {
    
    const cellInfo = {
        isAlive : false,
        previousAliveIteration: 10,
    }

    const defaultWidth = 20, defaultHeight = 20

    const gridBoard = []
    let newCount = 0;

    const clusteringProbability = (x, y, width, height) => {
        // Example: Increase probability for cells in a cluster around position (10, 10)
        const distance = Math.sqrt((x - width/2) ** 2 + (y - height/2) ** 2);
        return Math.max(0.05, 1/ distance);// Adjust 0.1 as needed for clustering intensity
    };

    for (let i = 0; i < defaultWidth; i ++){
        const row = [];
        for (let j = 0; j < defaultHeight; j ++){
            let randomAlive = Math.random() < clusteringProbability(i, j, defaultWidth, defaultHeight);
            let newPreviousAliveIteration = 10;
            if (randomAlive){
                newCount ++;
                newPreviousAliveIteration = 0
            }
            row.push( {isAlive : randomAlive,
            previousAliveIteration: newPreviousAliveIteration}); 
        }
        gridBoard.push(row);
    }


    const defaultObjContext = {
        gridBoard : gridBoard,
        width: defaultWidth,
        height: defaultHeight,
        count : newCount,
        currentIteration: 0,
        showColor: false
    }

    const [gameState, setGameState] = useState(defaultObjContext);

    const repaintBoard = (width, height) => {
        console.log("Repainting", width, height)
        const newGridBoard = []
        let newCount = 0;
        for (let i = 0; i < width; i ++){
            const row = [];
            for (let j = 0; j < height; j ++){
                let randomAlive = Math.random() < clusteringProbability(i, j, defaultWidth, defaultHeight);
                let newPreviousAliveIteration = 10;
                if (randomAlive){
                    newCount ++;
                    newPreviousAliveIteration = 0;
                }
                row.push( {isAlive : randomAlive,
                previousAliveIteration: newPreviousAliveIteration}); 
            }
            newGridBoard.push(row);
        }

       
        setGameState({
            gridBoard : newGridBoard,
            width : width,
            height: height,
            count : newCount,
            currentIteration: 0,
        })
        console.log("Success Created")

    }


    const overallContextObject = {
        gameState : gameState,
        setGameState : setGameState,
        repaintBoard : repaintBoard
    }

    


    return (
        <GameContext.Provider value = {overallContextObject}>
            {props.children}
        </GameContext.Provider>
    )

}