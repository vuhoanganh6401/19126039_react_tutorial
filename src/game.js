import React from "react";
import { Board } from "./board";
export class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{ squares: Array(3).fill(Array(3).fill(null)), click: null}],
            xIsNext: true,
            click: null,
            stepNumber: 0,
            squareNumber: 3,
            sort: "Asc"
        }
    }
    
    calculateWinnner = (x, y, squares) => {
        const n = this.state.squareNumber
        const player = squares[x][y]
        const square = squares
        let col = 0, row = 0, diag = 0, rdiag = 0
        for( let i = 0; i < n; i++) {
            if(square[x][i] === player) { col ++ }
            if(square[i][y] === player) { row ++ }
            if(square[i][i] === player) { diag ++ }
            if(square[i][n-i-1] === player) { rdiag ++ }
        }
        if(row === n || col === n || diag === n || rdiag === n) {
            return player
        }
        return null
    }

    handleClick = (i,j) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const squares = history[this.state.stepNumber].squares.map((square) => square.slice())
        if(squares[i][j] != null || (this.state.click && this.calculateWinnner(this.state.click[0], this.state.click[1], squares))){
            return
        }
        squares[i][j] = this.state.xIsNext ? "X" : "O"
        this.setState({
            history: history.concat([{squares: squares, click: [i, j]}]), 
            xIsNext: !this.state.xIsNext, 
            click: [i, j], 
            stepNumber: history.length
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            click: this.state.history[step].click,
            xIsNext: (step % 2) === 0
        })
    }

    changeRule(){
        const squareNumber = this.state.squareNumber === 3 ? 5 : 3
        this.setState({
            history: [{ squares: Array(squareNumber).fill(Array(squareNumber).fill(null)), click: null}],
            xIsNext: true,
            click: null,
            stepNumber: 0,
            squareNumber: squareNumber
        })
    }
    sortBy(){
        this.setState({
            sort: this.state.sort === "Asc" ? "Des" : "Asc"
        })
    }
    render() {
        const history = this.state.history
        const { squares, click } = history[this.state.stepNumber]
        let isRaw = true
        squares.forEach((square) => {
            square.forEach((s) => {
                if(!s){
                    isRaw = false
                }
            })
        })
        const winner = click ? 
            this.calculateWinnner(click[0], click[1], squares) 
            : null
        const gameInfo = {
            winner: winner,
            lastClick: click
        }
        const moves = history.map(( _ , step) => {
            const sort = this.state.sort
            const sortStep = sort === "Asc" ? step : (history.length - step - 1)
            const desc = sortStep ? `Move to step #${sortStep} - (${history[sortStep].click[0]} - ${history[sortStep].click[1]})` : "Move to start"
            return (
                <li key={sortStep}>
                    <button onClick={() => this.jumpTo(sortStep)}>{desc}</button>
                </li>
            )
        })
        
        return (
            <div className="game">
                <div className="switch-button">
                    <div>
                        <button onClick={() => this.changeRule()}>
                            Change to {this.state.squareNumber === 3 ? 5 : 3} x {this.state.squareNumber === 3 ? 5 : 3}
                        </button>
                    </div>
                </div>
                <div className="game-board">
                    <Board 
                    squares={squares} 
                    onClick = {(i, j) => this.handleClick(i, j)}
                    click={click}
                    number={Array(this.state.squareNumber).fill(Array(this.state.squareNumber).fill(null))}
                    gameInfo={gameInfo}
                    />
                </div>
                <div className="game-info">
                    <div>{isRaw ? "Raw" : winner ? `Winner: ${winner}` : `Next player: ${this.state.xIsNext ? "X" : "Y"}` }</div>
                    <button onClick={() => this.sortBy()}>Sort {this.state.sort === "Asc" ? "Des" : "Asc"}</button>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}