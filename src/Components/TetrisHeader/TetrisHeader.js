import React, { Component } from 'react';
import "./TetrisHeader.scss";



export default class TetrisHeader extends Component {
    render() {
        return (
            <div className="TetrisHeader">
                <div className="TetrisHeader__time">
                    {this.props.time}
                </div>

                <div className="TetrisHeader__points">
                    {this.props.points}
                </div>

                <div className="TetrisHeader__time">
                    {this.props.speed}
                </div>

                <div className="TetrisHeader__time">
                    {this.props.nextShape}
                </div>
            </div>
        );
    }
}