export const generateMines = (board, numMines) => {
    const rndPositions = generateArrayOfRandomPositions(board, numMines)

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