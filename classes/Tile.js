class Tile {
    constructor(element, row, col) {

        this.element = element;
        this.row = row;
        this.col = col;
        this.status = element.dataset.status
        this.isMine = false;
        this.mineNeighbours = 0;
    }

    getStatus() {
        return this.status
    }

    setStatus(value) {
        this.element.dataset.status = value
        this.status = value
    }
}

export default Tile