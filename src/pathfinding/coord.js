class Coord {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  north () {
    return new Coord(this.x, this.y - 1)
  }

  south () {
    return new Coord(this.x, this.y + 1)
  }

  east () {
    return new Coord(this.x + 1, this.y)
  }

  west () {
    return new Coord(this.x - 1, this.y)
  }

  sameAs (coord) {
    return (this.x === coord.x && this.y === coord.y)
  }

  toString () {
    return `[${this.x}, ${this.y}]`
  }
}

export default Coord
