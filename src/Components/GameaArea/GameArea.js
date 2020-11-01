import React, { Component } from 'react';
import Block from "../Block/Block";
import "./GameArea.scss";


export default class GameArea extends Component {
    constructor(props) {
        super(props);

        const ROW_NUM = 20;
        const COL_NUM = 14;
        const pointRates = { drop: 0.5, hitBottom: 5, clearLine: [50, 120, 200, 300] };
        const grid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I"],
            [0, "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I"],
            [0, "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I"],
            [0, "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I"],
        ]

        this.state = {
            dimension: { row: ROW_NUM, column: COL_NUM },
            grid: grid,//Array(ROW_NUM).fill().map(row => Array(COL_NUM).fill(0)),
            currentShape: "I" || this.getRandomShape(),
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
            runTimer: true,
            droppingShape: false,
            pointRates: pointRates,
            partialPoints: 0,
        }
    }



    componentDidMount() {
        document.addEventListener("keydown", event => this.handleKeyDown(event.key));

        this.props.setTetrisState("nextShape", this.state.nextShape);

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
                case "ArrowDown": {
                    this.setState({ ...this.state, droppingShape: true });
                    break;
                }
                default: { }
            }
        }
    }



    startTimer() {
        let time = 0;

        const timer = setInterval(() => {
            if (this.state.runTimer) {
                time += 5;

                if (time % 1000 === 0) this.props.setTetrisState("time", time);

                if (time % this.props.speedInMs === 0) this.dropOne();

                if (this.state.droppingShape) {
                    this.dropOne();
                    this.setState({ ...this.state, partialPoints: this.state.partialPoints + this.state.pointRates.drop });
                }
            }

            if (!this.props.gameOn) clearInterval(timer);
        }, 5);
    }




    async dropOne() {
        const { currentRow, currentColumn, currentShape, currentDirection } = { ...this.state };
        const isValidMove = this.isValidMove(currentRow + 1, currentColumn, currentShape, currentDirection);

        if (isValidMove) this.setState({ ...this.state, currentRow: this.state.currentRow + 1 });
        // REACHED BOTTOM
        else {
            // UPDATE GRID
            const updatedGrid = [...this.state.grid.map(row => [...row])];
            const coords = this.getShapeCoordinates(currentRow, currentColumn, currentShape, currentDirection);
            coords.map(coord => updatedGrid[coord[0]][coord[1]] = this.state.currentShape);
            this.setState({ ...this.state, grid: updatedGrid });

            let partialPoints = this.state.partialPoints;
            const nextShape = this.getRandomShape();

            // CHECK IF THERE ARE ROWS TO DESTROY
            const completeRows = updatedGrid.map((row, ri) => row.every(block => !!block) ? ri : false).filter(ind => ind !== false);

            if (completeRows.length) {
                await this.destroyRows(completeRows);
                partialPoints += this.state.pointRates.clearLine[completeRows.length - 1];
            }

            this.setState({
                ...this.state,
                currentShape: this.state.nextShape,
                currentRow: 0,
                currentColumn: 8,
                currentDirection: 0,
                nextShape: nextShape,
                droppingShape: false,
                runTimer: true,
            }, () => {
                // SET POINTS AND SPEED
                this.props.setTetrisState(
                    {
                        "points": Math.floor(this.props.points + partialPoints + this.state.pointRates.hitBottom),
                        "nextShape": this.state.nextShape
                    });

                // CHECK IF NEXT SHAPE HAS ENOUGH SPACE
                const { currentRow, currentColumn, currentShape, currentDirection } = { ...this.state };
                const isValidMove = this.isValidMove(currentRow + 1, currentColumn, currentShape, currentDirection);

                if (!isValidMove) this.props.setTetrisState("gameOn", false);
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



    async destroyRows(rowsToDestroy) {
        this.setState({ ...this.state, runTimer: false });

        const animTime = 400;
        let rowsDestroyed = 0;

        const setRowToAnimation = () => {
            // set all bloks of rows class to destroy animation "D" plus its color
            if (rowsDestroyed < rowsToDestroy.length) {
                const updatedGrid = [...this.state.grid];
                updatedGrid[rowsToDestroy[rowsDestroyed]] = updatedGrid[rowsToDestroy[rowsDestroyed]].map(bl => "D" + bl);
                this.setState({ ...this.state, grid: updatedGrid, currentShape: undefined });
            }

            // clear previous line after its animation and drop all blocks above line with 1 row
            if (rowsDestroyed - 1 >= 0) {
                let dropTill = [rowsToDestroy[rowsDestroyed - 1]];
                const droppedGrid = [...this.state.grid];
                for (let i = dropTill; i >= 0; i--) {
                    if (i === 0) Array(this.state.dimension.column).fill().map(bl => 0);
                    else droppedGrid[i] = droppedGrid[i - 1];
                }
                this.setState({ ...this.state, grid: droppedGrid });
            }
            rowsDestroyed++;
        }

        const waitUntilDestroyed = async () => {
            return await new Promise(resolve => {
                const interval = setInterval(() => {
                    setRowToAnimation();

                    if (rowsDestroyed >= rowsToDestroy.length + 1) {
                        resolve('');
                        clearInterval(interval);
                    };
                }, animTime);
            });
        }

        const go = await waitUntilDestroyed();
    }



    renderGrid() {
        const grid = this.state.grid.map(row => [...row]);
        if (this.state.currentShape) {
            const { currentRow, currentColumn, currentShape, currentDirection } = { ...this.state };
            const coords = this.getShapeCoordinates(currentRow, currentColumn, currentShape, currentDirection);
            coords.map(coord => grid[coord[0]][coord[1]] = this.state.currentShape);
        }


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