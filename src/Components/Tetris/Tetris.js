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
            time: 0,
        }
    }



    render() {
        return (
            <div className="Tetris">
                <TetrisHeader />

                <GameArea />

                <GameControl />
            </div>
        );
    }
}