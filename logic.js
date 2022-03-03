import Tile from "./classes/Tile.js"
import { generateMines } from "./helpers/generateMines.js"
import { calculateNeighbours } from './helpers/calculateNeighbours.js'
import { getNearbyTiles } from "./helpers/getNearbyTiles.js"


export const createBoard = (boardSize) => {
    const board = []
    for (let i = 0; i < boardSize; i++) {
        const row = []
        for (let j = 0; j < boardSize; j++) {
            // create class with div element
            const element = document.createElement('button')
            element.classList.add('tile-piece')
            element.dataset.status = "hidden"

            const tile = new Tile(element, i, j)
            row.push(tile)
        }
        board.push(row)
    }
    return board
}


export const revealTile = (board, tile) => {
    if (tile.status != "hidden") return

    if (tile.isMine) {
        tile.setStatus("mine")
        tile.element.innerText = 'X'
        return
    }

    const adjTiles = getNearbyTiles(tile, board)
    const nearbyMines = countNearbyMines(adjTiles)
    if (nearbyMines == 0) {
        tile.setStatus("revealed")
        adjTiles.forEach(adjTile => {
            revealTile(board, adjTile)
        })
    } else {
        tile.setStatus("revealed")
        tile.element.innerText = `${tile.mineNeighbours}`
    }
}


export const flagTile = (tile) => {
    if (tile.status == "mine" || tile.status == "revealed") {
        return
    }
    if (tile.status == 'marked') {
        tile.setStatus('hidden')
    } else {
        tile.setStatus('marked')
    }
}

export const initializeBoard = (board, numOfMines) => {
    generateMines(board, numOfMines)
    calculateNeighbours(board)
}

const countNearbyMines = array => {
    let count = 0
    for (let i = 0; i < array.length; i++) {
        if (array[i].isMine) {
            count++
        }
    }
    return count
}

export const checkGameEnd = (e, board) => {
    if (e.target.dataset.status == "mine") {
        console.log('game lose')
        revealAllMines(board)
        disableClicks(board)
        return [true, false] // [isGameOver, didPlayerWin]
    }

    if (allNonMinesRevealed(board) && allMinesFlagged(board)) {
        console.log('win!')
        disableClicks(board)
        return [true, true] // [isGameOver, didPlayerWin]
    }
    return [false, false]

}


const allNonMinesRevealed = (board) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            const tile = board[i][j]
            if (!tile.isMine && tile.status != "revealed") return false
        }
    }
    return true
}

const allMinesFlagged = (board) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            const tile = board[i][j]
            if (tile.isMine && tile.status != "marked") return false
        }
    }
    return true
}

const revealAllMines = (board) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            const tile = board[i][j]
            if (tile.isMine) {
                tile.setStatus("mine")
            }
        }
    }
}

const disableClicks = (board) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            const tile = board[i][j]
            tile.element.disabled = true
        }
    }
}