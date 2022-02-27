import { createBoard, flagTile, initializeBoard, revealTile, checkGameEnd } from './logic.js'


// board
// const ROWS = 10
// const COLS = 10

// const screenBoard = document.querySelector('.board')
// const board = helpers.createBoard(ROWS, COLS)

// helpers.generateMines(board)
// helpers.calculateNeighbours(board)
// helpers.renderBoard(screenBoard, board)
// console.log(board)

const BOARD_SIZE = 15
const NUMBER_OF_MINES = 20

let board = createBoard(BOARD_SIZE)
const restartBtn = document.querySelector('.restart-btn')
    // console.log(board)
const boardElement = document.querySelector('.board')
boardElement.style.setProperty('--boardSize', BOARD_SIZE)

const handleLeftClick = (e, tile, board) => {
    revealTile(board, tile)
    checkGameEnd(e, board)
}

const gameStart = () => {
    initializeBoard(board, NUMBER_OF_MINES)
    board.forEach(row => {
        row.forEach(tile => {
            boardElement.append(tile.element)

            // left click event listener
            tile.element.addEventListener('click', e => {
                handleLeftClick(e, tile, board)
            })

            // right click event listener 
            tile.element.addEventListener('contextmenu', e => {
                e.preventDefault()
                flagTile(tile)
            })
        })
    });
}

const refreshGame = () => {
    removeAllChildNodes(boardElement)
    board = createBoard(BOARD_SIZE)
}

const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

restartBtn.addEventListener("click", () => {
    refreshGame()
    gameStart()
})

gameStart()