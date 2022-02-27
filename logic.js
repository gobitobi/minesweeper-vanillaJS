import Tile from "./classes/Tile.js"
import { generateMines } from "./generateMines.js"
import { calculateNeighbours } from './calculateNeighbours.js'
import { getNearbyTiles } from "./getNearbyTiles.js"

const STATUSES = {
    HIDDEN: 'hidden',
    MINE: 'mine',
    REVEALED: 'revealed',
    MARKED: 'marked'
}

export const createBoard = (boardSize, numOfMines) => {
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
        console.log(tile.getStatus())
    } else {
        tile.setStatus('marked')
        console.log(tile.getStatus())
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
    console.log('checkGameEnd')
    if (e.target.dataset.status == "mine") {
        console.log('game lose')
        revealAllMines(board)
        disableClicks(board)
    }

    console.log(allNonMinesRevealed(board))
    console.log(allMinesFlagged(board))
    if (allNonMinesRevealed(board) && allMinesFlagged(board)) {
        console.log('win!')
        disableClicks(board)
    }

}

const checkWin = () => {
    return
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