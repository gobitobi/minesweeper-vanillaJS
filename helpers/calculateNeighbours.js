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
                    if (tileBeingChecked.isMine) {
                        numOfMines += 1
                    }
                }
            })
            board[i][j].mineNeighbours = numOfMines

        }
    }
}