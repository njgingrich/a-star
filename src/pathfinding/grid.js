import Node from './node'
import Coord from './coord'

class Grid {
  constructor (rows, cols) {
    this.rows = rows
    this.cols = cols
    this.grid = this.setupGrid()
  }

  setupGrid () {
    let grid = []
    for (let r = 0; r < this.rows; r++) {
      let row = []
      for (let c = 0; c < this.cols; c++) {
        row[c] = new Node(null, new Coord(c, r))
      }
      grid.push(row)
    }
    return grid
  }

  /**
   * Find the (up to) 4 adjacent coordinates to the given coordinate.
   *
   * @param {Coord} coord The coordinate to look around
   * @return Node[]
   */
  findNeighbors (coord) {
    const north = coord.north()
    const south = coord.south()
    const east = coord.east()
    const west = coord.west()

    let neighbors = [north, south, east, west]
    neighbors = neighbors.filter(c => {
      return this.isWalkable(c) && this.withinBounds(c)
    })
    return neighbors.map(n => {
      return this.grid[n.x][n.y].coord
    })

    // if (this.isWalkable(north) && this.withinBounds(north)) {
    //   neighbors.push(this.grid[north.x][north.y])
    // }
    // if (this.isWalkable(south) && this.withinBounds(south)) {
    //   neighbors.push(this.grid[south.x][south.y])
    // }
    // if (this.isWalkable(east) && this.withinBounds(east)) {
    //   neighbors.push(this.grid[east.x][east.y])
    // }
    // if (this.isWalkable(west) && this.withinBounds(west)) {
    //   neighbors.push(this.grid[west.x][west.y])
    // }
    // return neighbors
  }

  /**
   * Check if a coordinate is passable or not.
   *
   * @param {Coord} coord The coordinate to check
   */
  isWalkable (coord) {
    // let node = this.grid[coord.x][coord.y]
    // return (node.weight !== 1) && this.withinBounds(coord)
    return this.withinBounds(coord)
  }

  /**
   * Check if a coordinate is within the map bounds.
   *
   * @param {Coord} coord The coordinate to check
   */
  withinBounds (coord) {
    return (coord.x >= 0 && coord.x < this.cols) &&
            (coord.y >= 0 && coord.y < this.rows)
  }

  cleanDirty (node) {
    this.dirty = []
  }

  markDirty (node) {
    this.dirty.push(node)
    node.isDirty = true
  }

  toString () {
    for (let x = 0; x < this.rows; x++) {
      console.log(this.grid[x])
    }
  }
}

export default Grid
