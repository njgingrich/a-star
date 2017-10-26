class Node {
  constructor (parent, coord, priority = Number.POSITIVE_INFINITY) {
    this.parent = parent
    this.coord = coord
    this.priority = priority
  }

  toString () {
    return `[${this.coord.x}, ${this.coord.y}]`
  }
}

export default Node
