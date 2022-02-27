// import * as helpers from './helpers.js'
import { calculateNeighbours } from './calculateNeighbours.js'
import { createBoard, flagTile, initializeBoard, revealTile } from './logic.js'


// board
// const ROWS = 10
// const COLS = 10

// const screenBoard = document.querySelector('.board')
// const board = helpers.createBoard(ROWS, COLS)

// helpers.generateMines(board)
// helpers.calculateNeighbours(board)
// helpers.renderBoard(screenBoard, board)
// console.log(board)

const BOARD_SIZE = 10 // 100 tiles
const NUMBER_OF_MINES = 10

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
    // console.log(board)
const boardElement = document.querySelector('.board')
boardElement.style.setProperty('--boardSize', BOARD_SIZE)

initializeBoard(board, NUMBER_OF_MINES)
    // console.log(board)
board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)

        // left click event listener
        tile.element.addEventListener('click', () => {
            revealTile(board, tile)
        })

        // right click event listener 
        tile.element.addEventListener('contextmenu', e => {
            e.preventDefault()
            flagTile(tile)
        })
    })
});