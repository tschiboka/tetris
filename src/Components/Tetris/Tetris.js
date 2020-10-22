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


    setTetrisState(key, value) {
        const newState = { ...this.state };
        newState[key] = value;
        this.setState(newState);
    }



    render() {
        return (
            <div className="Tetris">
                <TetrisHeader
                    time={this.state.time || 0}
                    points={this.state.points}
                    speed={this.state.speed}
                    nextShape={this.state.nextShape}
                />

                <GameArea
                    dropCount={this.state.dropCount}
                    speed={this.state.speed}
                    speedInMs={this.state.speedInMs}
                    gameOn={this.state.gameOn}
                    points={this.state.points}
                    setTetrisState={this.setTetrisState.bind(this)}
                />

                <GameControl />
            </div>
        );
    }
}