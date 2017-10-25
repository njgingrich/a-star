class Node {
  constructor (parent, coord) {
    this.parent = parent
    this.coord = coord
  }

  toString () {
    return `[${this.coord.x}, ${this.coord.y}]`
  }
}

export default Node
