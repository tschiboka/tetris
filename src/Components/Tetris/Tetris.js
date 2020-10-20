import React, { Component } from 'react';
import TetrisHeader from "../TetrisHeader/TetrisHeader";
import GameArea from "../GameaArea/GameArea";
import GameControl from "../GameControl/GameControl";
import "./Tetris.scss";



export default class Tetris extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: Array(22).fill(Array(15).fill(0))
        }
    }



    render() {
        const grid = [...this.state.grid]
        grid[2] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4];
        console.log(this.state.grid);
        return (
            <div className="Tetris">
                <TetrisHeader />

                <GameArea grid={grid} />

                <GameControl />
            </div>
        );
    }
}