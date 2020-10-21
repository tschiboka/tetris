import React, { Component } from 'react';
import Block from "../Block/Block";
import "./GameArea.scss";


export default class GameArea extends Component {
    constructor(props) {
        super(props);

        const ROW_NUM = 20;
        const COL_NUM = 14;

        this.state = {
            grid: Array(ROW_NUM).fill().map(row => Array(COL_NUM).fill(0)),
            currentShape: this.getRandomShape(),
            currentRow: 0,
            currentColumn: 8,
            currentDirection: 0,
            nextShape: this.getRandomShape(),
            maxRow: ROW_NUM,
            maxColumn: COL_NUM,
            activeKey: undefined,
            allowKey: true,
            step: 0,
            time: 0,
        }
    }



    componentDidMount() {
        document.addEventListener("keydown", event => this.handleKeyDown(event.key));

        this.startTimer();
    }



    handleKeyDown(key) {
        const { currentRow, currentColumn, currentShape, currentDirection } = { ...this.state };

        if (this.state.allowKey) {
            switch (key) {
                case "ArrowLeft": {
                    const isValidMove = this.isValidMove(currentRow, currentColumn - 1, currentShape, currentDirection);
                    if (isValidMove) this.setState({ ...this.state, currentColumn: this.state.currentColumn - 1 });
                    break;
                }
                case "ArrowRight": {
                    const isValidMove = this.isValidMove(currentRow, currentColumn + 1, currentShape, currentDirection);
                    if (isValidMove) this.setState({ ...this.state, currentColumn: this.state.currentColumn + 1 });
                    break;
                }
                case "ArrowUp": {
                    const nextDirection = currentDirection === 3 ? 0 : currentDirection + 1;
                    const isValidMove = this.isValidMove(currentRow, currentColumn, currentShape, nextDirection);
                    if (isValidMove) this.setState({ ...this.state, currentDirection: nextDirection });
                    break;
                }
                default: { }
            }
        }
    }



    startTimer() {
        let time = 0;
        console.log(time);
        const timer = setInterval(() => {
            time += 10;

            if (time % 1000 === 0) console.log(time / 1000);

            if (time % this.props.speedInMs === 0) this.drop();

            if (!this.props.gameOn) clearInterval(timer);
        }, 10);
    }




    drop() {
        const { currentRow, currentColumn, currentShape, currentDirection } = { ...this.state };
        const isValidMove = this.isValidMove(currentRow + 1, currentColumn, currentShape, currentDirection);

        if (isValidMove) this.setState({ ...this.state, currentRow: this.state.currentRow + 1 });
        else {
            // UPDATE GRID
            const updatedGrid = [...this.state.grid.map(row => [...row])];
            const coords = this.getShapeCoordinates(currentRow, currentColumn, currentShape, currentDirection);


            coords.map(coord => updatedGrid[coord[0]][coord[1]] = this.state.currentShape);
            this.setState({
                ...this.state,
                grid: updatedGrid,
                currentShape: this.state.nextShape,
                currentRow: 0,
                currentColumn: 8,
                currentDirection: 0,
                nextShape: this.getRandomShape()
            });
        }
    }




    getRandomShape() {
        const SHAPES = "IOSZLJT";
        return SHAPES[Math.floor(Math.random() * 7)];
    }



    getShapeCoordinates(row, column, shape, direction) {
        let coefficients = this.getShapeCoefficients(shape, direction);

        return coefficients.map(coords => [row + coords[0], column + coords[1]]);
    }



    getShapeCoefficients(shape, direction) {
        switch (shape) {
            case "O": { return [[0, -1], [0, 0], [1, -1], [1, 0]]; }
            case "I": {
                if (direction === 0 || direction === 2) {
                    return [[0, -2], [0, -1], [0, 0], [0, 1]];
                }
                else {
                    return [[0, 0], [1, 0], [2, 0], [3, 0]];
                }
            }
            case "S": {
                if (direction === 0 || direction === 2) {
                    return [[0, 0], [0, 1], [1, 0], [1, -1]];
                }
                else {
                    return [[0, 0], [-1, 0], [0, 1], [1, 1]];
                }
            }
            case "Z": {
                if (direction === 0 || direction === 2) {
                    return [[0, 0], [0, -1], [1, 0], [1, 1]];
                }
                else {
                    return [[0, 0], [1, 0], [0, 1], [-1, 1]];
                }
            }
            case "L": {
                switch (direction) {
                    case 0: { return [[0, -1], [0, 0], [0, 1], [1, -1]]; }
                    case 1: { return [[-1, 0], [0, 0], [1, 0], [1, 1]]; }
                    case 2: { return [[0, -1], [0, 0], [0, 1], [-1, 1]]; }
                    case 3: { return [[0, 0], [-1, 0], [-1, -1], [1, 0]]; }
                }
            }
            case "J": {
                switch (direction) {
                    case 0: { return [[0, -1], [0, 0], [0, 1], [1, 1]]; }
                    case 1: { return [[-1, 0], [0, 0], [1, 0], [-1, 1]]; }
                    case 2: { return [[0, -1], [0, 0], [0, 1], [-1, -1]]; }
                    case 3: { return [[0, 0], [-1, 0], [1, 0], [1, -1]]; }
                }
            }
            case "T": {
                switch (direction) {
                    case 0: { return [[0, -1], [0, 0], [0, 1], [1, 0]]; }
                    case 1: { return [[-1, 0], [0, 0], [1, 0], [0, 1]]; }
                    case 2: { return [[0, -1], [0, 0], [0, 1], [-1, 0]]; }
                    case 3: { return [[0, 0], [-1, 0], [1, 0], [0, -1]]; }
                }
            }
            default: { }
        }
    }



    isValidMove(row, column, shape, direction) {
        let coefficients = this.getShapeCoefficients(shape, direction);

        const valid = coefficients.map(coords => {
            return (this.state.grid[row + coords[0]] || [])[column + coords[1]] === 0
                && row + coords[0] >= 0 && row + coords[0] < this.state.maxRow
                && column + coords[1] >= 0 && column + coords[1] < this.state.maxColumn
        });

        return valid.every(el => !!el);
    }



    renderGrid() {
        const { currentRow, currentColumn, currentShape, currentDirection } = { ...this.state };
        const coords = this.getShapeCoordinates(currentRow, currentColumn, currentShape, currentDirection);
        const grid = this.state.grid.map(row => [...row]);

        coords.map(coord => grid[coord[0]][coord[1]] = this.state.currentShape);

        return grid.map((row, ri) => (
            <div key={`row_${ri}`}>
                {row.map((block, bi) => (
                    <div key={`block_${ri}_${bi}`}>{<Block type={block} />}</div>
                ))}
            </div>));
    }



    render() {
        return (
            <div className="GameArea">{this.renderGrid()}</div>
        );
    }
}