class Tile {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.isMine = false;
        this.mineNeighbours = 0;
        this.hidden = false;
    }
}

export default Tile