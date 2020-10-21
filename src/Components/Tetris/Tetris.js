import React, { Component } from 'react';
import TetrisHeader from "../TetrisHeader/TetrisHeader";
import GameArea from "../GameaArea/GameArea";
import GameControl from "../GameControl/GameControl";
import "./Tetris.scss";



export default class Tetris extends Component {
    constructor(props) {
        super(props);

        this.state = {
            points: 0,
            gameOn: true,
            speedInMs: 200,
            speed: 1,
            shapesLanded: 0,
        }
    }



    render() {
        return (
            <div className="Tetris">
                <TetrisHeader />

                <GameArea
                    dropCount={this.state.dropCount}
                    speed={this.state.speed}
                    speedInMs={this.state.speedInMs}
                    gameOn={this.state.gameOn}
                />

                <GameControl />
            </div>
        );
    }
}