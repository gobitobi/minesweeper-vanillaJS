import { createBoard, flagTile, initializeBoard, revealTile, checkGameEnd } from './logic.js'
import { createPopup } from './helpers/createPopup.js'

const BOARD_SIZE = 15
const NUMBER_OF_MINES = 20

let closePopupBtn;
const mainContainer = document.querySelector('.main-container')
const overlay = document.querySelector('.overlay')
const losePopup = document.querySelector('#lose-popup')
const winPopup = document.querySelector('#win-popup')

let board = createBoard(BOARD_SIZE)
const restartBtn = document.querySelector('.restart-btn')
const boardElement = document.querySelector('.board')
boardElement.style.setProperty('--boardSize', BOARD_SIZE)

let didPlayerWin;
let isGameOver;
let playerWinStatus = false;
const gameStart = () => {
    initializeBoard(board, NUMBER_OF_MINES)
    board.forEach(row => {
        row.forEach(tile => {
            boardElement.append(tile.element)

            // left click event listener
            tile.element.addEventListener('click', e => {
                revealTile(board, tile)
                const res = checkGameEnd(e, board)
                isGameOver = res[0]
                didPlayerWin = res[1]
                if (isGameOver) {
                    const popupElement = createPopup(didPlayerWin)
                    closePopupBtn = popupElement.firstChild
                    mainContainer.appendChild(popupElement)
                    console.log(closePopupBtn)
                    closePopupBtn.addEventListener("click", () => {
                        refreshGame()
                        gameStart()
                        mainContainer.removeChild(popupElement)
                    })
                }

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



gameStart()