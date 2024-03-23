import { useState } from 'react'

import './App.css'
import Board from './Board/Board'
import Header from './Header/Header'
import { GameContextProvider } from './GameContextProvider'

function App() {

  return (
    <>
     <GameContextProvider>
     <Header title1="Conways Way of Life" title2="Scroll Down to Play the Game"  />
     <Board/>
     </GameContextProvider>
    </>
  )
}

export default App
