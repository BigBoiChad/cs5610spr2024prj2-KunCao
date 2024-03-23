import React, { useContext } from 'react';
import "./Cell.css"

import { GameContext} from '../GameContextProvider';



const Cell = (props) =>{
    
    const x = props.x
    const y = props.y
    const overallState = useContext(GameContext);
    const gameState = overallState.gameState;
    const setGameState =  overallState.setGameState;

    const cellInfo = gameState.gridBoard[x][y]
    const gridBoard = gameState.gridBoard

    const width = gameState.width, height = gameState.height
    // console.log(cellInfo)
    const isAlive = cellInfo.isAlive

    const previousAliveIteration = cellInfo.previousAliveIteration;

    
    const color_render = gameState.showColor;

    const getColorClass = (iterations)=>{
        let newClassName = "cell";
        let adding = "heat-color-"
        if (iterations >= 10){
            return newClassName;
        }else if (color_render){
            adding = adding + (10 - iterations)
            return newClassName += " " + adding;
        }else if (iterations  == 0){
            return newClassName += " alive";
        }else{
            return newClassName;
        }
        
    }

    let className =  getColorClass(previousAliveIteration)

    
    // console.log(className)
    function inbound(x, y, i ,j){
    
        if (x + i >= 0 && x + i < width &&
            y + j >= 0 && y + j < height){
            return true
        }else{
            return false
        }
    }

    function getNeighbors (x, y){

        const neighbors = []
        for (let i = -1; i <= 1; i ++){
            for (let j = -1; j <= 1; j ++){
                if (i === 0 && j === 0){
                    continue
                }else if (inbound(x, y, i , j)){
                    neighbors.push([x + i, y + j])
                }
            }
        }
        return neighbors;
    }
   

    function changeStatus (x, y){ 
       
        const newIsAlive = !isAlive
        // console.log(newIsAlive)
        let newCount = gameState.count
        let newPreviousAliveIteration = previousAliveIteration
        if(newIsAlive){
            className += " alive"
            newCount += 1
            newPreviousAliveIteration = 0;
        }else{
            className = "cell"
            newCount = (newCount > 0)? newCount - 1: 0
            newPreviousAliveIteration = previousAliveIteration + 1;
        }

        gridBoard[x][y] = {
            isAlive : newIsAlive,
            previousAliveIteration : newPreviousAliveIteration
        }

        gameState.count = newCount

        setGameState({
            ...gameState,
            count : gameState.count,
            gridBoard : gridBoard
        })
        
        const neighbors = getNeighbors(x, y);
      
        // console.log(neighbors)
        // checkingNeighbors(neighbors);
        // checkingOthers();
        // console.log(gameState)
        // console.log(gameState.count)
        // console.log(className)
    }
    

    

   

    function alterItself(neighbors, x2, y2){
        const isAlive = gridBoard[x2][y2].isAlive
        const prev = gridBoard[x2][y2].previousAliveIteration
        let alive_neighbor_count = 0
        
        for (let i = 0; i <neighbors.length; i ++){
            const neighbor_x = neighbors[i][0], neighbor_y = neighbors[i][1];
            
            if (gridBoard[neighbor_x][neighbor_y].isAlive){
                alive_neighbor_count ++;
            }
        }
        // console.log(x2, y2)
        // console.log(alive_neighbor_count)
        if (isAlive){
            if (alive_neighbor_count < 2 || alive_neighbor_count > 3){
                // console.log(x2, y2, "change it")
                return true
            }else{
                return false
            }
        }else{
            if (alive_neighbor_count == 3){
                // console.log(x2, y2, "change it")
                return true
            }else{
                return false
            }
        }
    }

    function changeStatusOnce(x, y){
       
        // console.log("changing", x , y)
        const newIsAlive = !gridBoard[x][y].isAlive
        // console.log(newIsAlive)
        let newCount = gameState.count
        let newPreviousAliveIteration = previousAliveIteration
        if(newIsAlive){
            className += " alive"
            newCount += 1
            newPreviousAliveIteration = 0;
        }else{
            className = "cell"
            newCount = (newCount > 0)? newCount - 1: 0
            newPreviousAliveIteration = previousAliveIteration + 1;
        }

        gridBoard[x][y] = {
            isAlive : newIsAlive,
            previousAliveIteration : newPreviousAliveIteration

        }
        gameState.count = newCount
        setGameState({
            ...gameState,
            gridBoard : gridBoard,
            count : gameState.count,
        })
    
    }

    // function checkingNeighbors(neighbors){
    //     let newIterationGridBoard = gameState.gridBoard;

    //     const needsToChange = [];
    //     for (let i = 0; i <neighbors.length; i ++){
    //            const neighbor_x = neighbors[i][0], neighbor_y = neighbors[i][1];
    //            const second_neighbors = getNeighbors(neighbor_x, neighbor_y);
    //         //    console.log(neighbor_x, neighbor_y)
    //         //    console.log(second_neighbors)
    //            if (alterItself(second_neighbors, neighbor_x, neighbor_y)){
    //                 console.log(neighbor_x, neighbor_y)
    //                 needsToChange.push([neighbor_x, neighbor_y]);
    //             }
    //     }

    //     console.log(needsToChange)
    //     for (let m = 0; m < needsToChange.length; m ++){
    //         const x3 = needsToChange[m][0], y3 = needsToChange[m][1]
    //         changeStatusOnce(x3, y3)
            
    //     }
        
        
    //     setGameState({
    //         ...gameState,
    //         currentIteration : gameState.currentIteration + 1,
    //     })
    //     // console.log(gameState.currentIteration)
    // }
    function checkingOthers( ){
        let newIterationGridBoard = gameState.gridBoard;

        const needsToChange = [];
        for (let i = 0; i <gridBoard.length; i ++){
            for (let j = 0; j < gridBoard[i].length; j ++){
                if (i === x && j === y){
                    continue
                }
                const neighbor_x = i, neighbor_y = j
                const second_neighbors = getNeighbors(neighbor_x, neighbor_y);
                if (alterItself(second_neighbors, neighbor_x, neighbor_y)){
                    //  console.log(neighbor_x, neighbor_y)
                     needsToChange.push([neighbor_x, neighbor_y]);
                 }
            }
               
        }

        // console.log(needsToChange)
        for (let m = 0; m < needsToChange.length; m ++){
            const x3 = needsToChange[m][0], y3 = needsToChange[m][1]
            changeStatusOnce(x3, y3)
            
        }
        
        
        setGameState({
            ...gameState,
            currentIteration : gameState.currentIteration + 1,
        })
        // console.log(gameState.currentIteration)
    }

    return (
     <>
       <div onClick={()=> changeStatus(x, y)} className = {className}>
       </div>
     </>
    );
}

export default Cell;