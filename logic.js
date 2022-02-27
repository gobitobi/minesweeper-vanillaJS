import Tile from "./classes/Tile.js"

const STATUSES = {
    HIDDEN: 'hidden',
    MINE: 'mine',
    NUMBER: 'number',
    MARKED: 'marked'
}

export const createBoard = (boardSize, numOfMines) => {
    const board = []
    for (let i = 0; i < boardSize; i++) {
        const row = []
        for (let j = 0; j < boardSize; j++) {
            const element = document.createElement('div')
            element.classList.add('tile-piece')
            element.dataset.status = STATUSES.HIDDEN

            const tile = {
                element,
                i,
                j,
                get status() {
                    return element.dataset.status
                },
                set status(value) {
                    this.element.dataset.status = value
                }
            }
            row.push(tile)
        }
        board.push(row)
    }
    return board
}

const deleteEvenLater = () => {
    return 5 + 5
}