import React, { Component } from 'react';
import TetrisHeader from "../TetrisHeader/TetrisHeader";
import GameArea from "../GameaArea/GameArea";
import GameControl from "../GameControl/GameControl";
import "./Tetris.scss";



export default class Tetris extends Component {
    constructor(props) {
        super(props);

        const ROW_NUM = 22;
        const COL_NUM = 15;
        const SHAPES = "IOSZLJT";

        this.state = {
            grid: Array(ROW_NUM).fill().map(row => Array(COL_NUM).fill(0)),
            currentShape: SHAPES[Math.ceil(Math.random() * 7)],
            currentRow: 0,
            currentColumn: 8,
            currentDirection: 0,
            nextShape: SHAPES[Math.ceil(Math.random() * 7)],
        }
    }



    render() {
        return (
            <div className="Tetris">
                <TetrisHeader />

                <GameArea
                    grid={this.state.grid}
                    currentShape={this.state.currentShape}
                    currentRow={this.state.currentRow}
                    currentColumn={this.state.currentColumn}
                    currentDirection={this.state.currentDirection}
                />

                <GameControl />
            </div>
        );
    }
}