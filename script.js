import Tile from './classes/Tile.js'

// board
const ROWS = 3
const COLS = 3

const board = document.querySelector('.board')

const a = []
for (let i = 0; i < ROWS; i++) {
    const tmp_row = []
    for (let j = 0; j < COLS; j++) {
        const tmp = new Tile(i, j)
        const tmpDiv = document.createElement('button')
        tmpDiv.classList.add('tile-piece')
        tmpDiv.innerText = `${tmp.mineNeighbours}`
        tmpDiv.data = tmp
        board.appendChild(tmpDiv)
        tmp_row.push(tmp)
        tmpDiv.addEventListener('click', e => clickHandler(e))
    }
    a.push(tmp_row)
}
console.log(a)

const clickHandler = e => {
    console.log(e.target.data)
    e.target.data.hidden = !e.target.data.hidden
    e.target.innerText = e.target.data.hidden
    console.log(e.target.data)
}