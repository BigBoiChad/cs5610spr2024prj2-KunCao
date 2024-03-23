import { useState } from 'react'
import { Link } from 'react-router-dom';
import './Home.css'
import Header from '../Header/Header'

function Home() {
    return (
        <>
           
            <Header title1="Conways Way of Life" title2="Scroll Down to See More"  className={""}/>
            <section>
                <div class="dual-language-container">
                    <div>
                        <h2>Conway's Game of Life</h2>

                        <p> Conway's Game of Life is a classic cellular automaton devised by the British mathematician John Horton Conway in 1970. It's a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. </p>
                        <p> The game is played on a grid of cells, each of which can be in one of two possible states: alive or dead. </p>

                        <p> The game evolves in discrete time steps according to a set of rules: </p>

                        <ol>
                            <li> <strong> Underpopulation: </strong> If a living cell has fewer than two living neighbors, it dies due to underpopulation. </li>
                            <li> <strong> Survival: </strong> If a living cell has two or three living neighbors, it survives to the next generation. </li>
                            <li> <strong> Overcrowding: </strong> If a living cell has more than three living neighbors, it dies due to overcrowding. </li>
                            <li> <strong> Reproduction: </strong> If a dead cell has exactly three living neighbors, it becomes alive due to reproduction. </li>
                        </ol>

                        <p> With these simple rules, complex patterns can emerge, including oscillators, gliders, and spaceships. Conway's Game of Life has applications in various fields, including computer science, biology, and artificial intelligence. </p>

                        <Link to="/app">
                            <div class="orbContainer">
                                <div class="orb">
                                    <h1>Start the game</h1>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>


            </section>


        </>
    )
}

export default Home
