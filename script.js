import Tile from './classes/Tile.js'
import * as helpers from './helpers.js'

// board
const ROWS = 10
const COLS = 10

const screenBoard = document.querySelector('.board')
const board = helpers.createBoard(ROWS, COLS)

helpers.generateMines(board)
helpers.calculateNeighbours(board)
helpers.renderBoard(screenBoard, board)
console.log(board)