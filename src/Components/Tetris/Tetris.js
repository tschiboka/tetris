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
        return (
            <div className="Tetris">
                <TetrisHeader />

                <GameArea grid={this.state.grid} />

                <GameControl />
            </div>
        );
    }
}