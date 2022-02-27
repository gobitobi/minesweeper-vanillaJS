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
            const element = document.createElement('div')
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