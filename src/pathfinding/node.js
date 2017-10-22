class Node {
  constructor (parent, coord, weight = 0, h = 0, g = 0) {
    this.parent = parent
    this.coord = coord
    this.weight = weight
    this.g = g
    this.h = h
    this.f = weight + h
    this.visited = false
    this.closed = false
  }

  toString () {
    return `[${this.coord.x}, ${this.coord.y}]`
  }
}

export default Node
