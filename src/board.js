import React from "react"
import { Square } from "./square"
export class Board extends React.Component {

    isRowWin = (square, row, winner) => {
        let count = 0
        for (let i = 0; i < square.length; i++){
            if(square[row][i] === winner){
                count++
            }
        }
        return count === square.length
    }

    isColumWin = (square, column, winner) => {
        let count = 0
        for (let i = 0; i < square.length; i++){
            if(square[i][column] === winner){
                count++
            }
        }
        return count === square.length
    }

    isContainWinLine = (squares, winner, x, y) => {
        const n = squares.length
        let col = 0, row = 0, diag = 0, rdiag = 0
        let isCorrect = false
        for( let i = 0; i < n; i++) {
            if(squares[x][i] === winner) { col ++ }
            if(squares[i][y] === winner) { row ++ }
            if(squares[i][i] === winner) { diag ++ }
            if(squares[i][n-i-1] === winner) { rdiag ++ }
        }
        if(row === n){
            for(let i = 0; i < squares.length; i++){
                if(() => this.isRowWin(squares, i, winner) && x === i){
                    isCorrect = true
                }
            }
        }

        if(col === n){
            for(let i = 0; i < squares.length; i++){
                if(() => this.isColumnWin(squares, i, winner) && y === i){
                    isCorrect = true
                }
            }
        }

        if(diag === n) {
            if(x === y){
                isCorrect = true
            }
        }

        if(rdiag === n) {
            for(let i = 0 ; i < n; i++){
                if(i === x && n - i - 1 === y){
                    isCorrect = true
                }
            }
        }
        return isCorrect
    }

    renderSquare = (i, j) => {
        const { winner, lastClick } = this.props.gameInfo
        return <Square key={`${i}${j}`}
            value={this.props.squares[i][j]} 
            onClick={() => this.props.onClick(i,j)}
            isSelected={winner && this.isContainWinLine(this.props.squares, winner, i, j) ? true : lastClick && lastClick[0] === i && lastClick[1]===j ? true : false}
        />
    }

    render() {
        return <div>{this.props.number.map((e, i) => {
            return <div className="board-row">{e.map((t, j) => this.renderSquare(i,j))}</div>
        })}</div>
    }
}