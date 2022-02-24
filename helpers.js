import Tile from './classes/Tile.js'


export const calculateNeighbours = (board) => {
    const DIRECTIONS = [
        [-1, -1], // top-left
        [-1, 0], // top-middle
        [-1, 1], // top-right
        [0, -1], // left
        [0, 1], // right
        [1, -1], // bot-left
        [1, 0], // bot-middle
        [1, 1] // bot-right
    ]

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            let numOfMines = 0
            DIRECTIONS.forEach(dir => {
                const checkRow = dir[0]
                const checkCol = dir[1]

                if (i + checkRow >= 0 && i + checkRow < board.length && j + checkCol >= 0 && j + checkCol < board.length) {
                    const tileBeingChecked = board[i + checkRow][j + checkCol]
                    if (tileBeingChecked != -1 && tileBeingChecked.isMine) {
                        numOfMines += 1
                    }
                }
            })
            board[i][j].mineNeighbours = numOfMines

        }
    }
}

export const createBoard = (rows, cols) => {
    const board = []
    for (let i = 0; i < rows; i++) {
        const row = []
        for (let j = 0; j < cols; j++) {
            const tmp = new Tile(i, j)
            row.push(tmp)
        }
        board.push(row)
    }
    return board
}

const setInnerTextOfTilePiece = tile => {
    if (tile.isMine) {
        return `X`
    } else if (tile.mineNeighbours == 0) {
        return ` `
    } else {
        return `${tile.mineNeighbours}`
    }
}

export const renderBoard = (screenBoard, board) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            const tmpDiv = document.createElement('button')
            tmpDiv.classList.add('tile-piece')
            tmpDiv.classList.add('hidden')
            tmpDiv.innerText = setInnerTextOfTilePiece(board[i][j])
            tmpDiv.data = board[i][j]
            tmpDiv.addEventListener('click', (e) => clickHandler(e, board))
            screenBoard.appendChild(tmpDiv)
        }
    }
}

const clickHandler = (e, board) => {
    e.target.data.hidden = false
    e.target.classList.remove('hidden')
    const tileClicked = e.target.data

    revealTile(tileClicked, board)
    console.log(board)
}

export const generateMines = board => {
    const rndPositions = generateArrayOfRandomPositions(board)

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            const currPos = [i, j]
            if (checkIfArrayInArrayOfArrays(currPos, rndPositions)) {
                board[i][j].isMine = true
            }
        }
    }
}

const generateArrayOfRandomPositions = (board, numMines = 10) => {
    const randomNumbersArray = []

    while (randomNumbersArray.length < numMines) {
        const rndRow = Math.floor(Math.random() * (board.length))
        const rndCol = Math.floor(Math.random() * (board.length))
        const position = [rndRow, rndCol]
        if (!(checkIfArrayInArrayOfArrays(position, randomNumbersArray))) {
            randomNumbersArray.push(position)
        }
    }
    return randomNumbersArray
}

const checkIfArrayInArrayOfArrays = (pos, arrayOfArrays) => {
    for (let i = 0; i < arrayOfArrays.length; i++) {
        let matches = 0
        for (let j = 0; j < 2; j++) {
            if (arrayOfArrays[i][j] == pos[j]) matches += 1
        }
        if (matches == 2) return true
    }
    return false
}

// NOT SCREEN BOARD (ONLY AFFECTING BTS BOARD)
const revealTile = (board, tile) => {
    console.log('revealtile!')

    if (tile.hidden) return
    if (tile.isMine) return
    tile.hidden = false

    const nearbyTiles = surroundingTiles(board, tile)
    if (tile.mineNeighbours == 0) {
        nearbyTiles.forEach(tmpTile => {
            revealTile(board, tmpTile)
        })
    }
}

const surroundingTiles = (board, tile) => {
    const DIRECTIONS = [
        [-1, -1], // top-left
        [-1, 0], // top-middle
        [-1, 1], // top-right
        [0, -1], // left
        [0, 1], // right
        [1, -1], // bot-left
        [1, 0], // bot-middle
        [1, 1] // bot-right
    ]

    const tiles = []

    DIRECTIONS.forEach(dir => {
        const checkRow = dir[0]
        const checkCol = dir[1]

        if (tile.row + checkRow >= 0 && tile.row + checkRow < board.length && tile.col + checkCol >= 0 && tile.col + checkCol < board.length) {
            const tileBeingChecked = board[tile.row + checkRow][tile.col + checkCol]
            tiles.push(tileBeingChecked)
        }
    })

    return tiles
}

const updateScreenBoard = (board, screenBoard) => {
    const children = screenBoard.children
    children.forEach(child => {
        console.log(child)
    })
}