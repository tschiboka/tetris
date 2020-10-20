import React, { Component } from 'react';
import Block from "../Block/Block";
import "./GameArea.scss";


export default class GameArea extends Component {
    renderGrid() {
        return this.props.grid.map((row, ri) => (
            <div key={`row_${ri}`}>
                {row.map((block, bi) => (
                    <div key={`block_${ri}_${bi}`}>{<Block type={block} />}</div>
                ))}
            </div>));
    }



    getShapeCoordinates(row, column, shape, direction) {
        console.log(row, column, shape, direction);
    }




    render() {
        this.getShapeCoordinates(this.props.currentRow, this.props.currentColumn, this.props.currentShape, this.props.currentDirection);
        return (
            <div className="GameArea">{this.renderGrid()}</div>
        );
    }
}