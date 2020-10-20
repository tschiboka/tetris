import React, { Component } from 'react';
import Block from "../Block/Block";
import "./GameArea.scss";


export default class GameArea extends Component {
    renderGrid() {
        return this.props.grid.map((row, ri) => (
            <div key={`row_${ri}`}>
                {row.map((block, bi) => (
                    <div key={`block_${bi}`}>{<Block type={block} />}</div>
                ))}
            </div>));
    }


    render() {
        return (
            <div className="GameArea">{this.renderGrid()}</div>
        );
    }
}