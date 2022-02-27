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

export const getNearbyTiles = (tile, board) => {
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