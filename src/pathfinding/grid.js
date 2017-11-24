import Node from './node'
import Coord from './coord'

class Grid {
  constructor (rows, cols, obstacles) {
    this.rows = rows
    this.cols = cols
    this.obstacles = obstacles
    this.weights = {}
    this.grid = this._setupGrid()
  }

  /**
   * Initialize the grid as a 2D array of Nodes.
   */
  _setupGrid () {
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
   * @return An array of walkable coordinates adjacent to the given coordinate
   */
  findNeighbors (coord) {
    const north = coord.north()
    const south = coord.south()
    const east = coord.east()
    const west = coord.west()

    let neighbors = [north, south, east, west]
    neighbors = neighbors.filter(c => {
      return this.isWalkable(c)
    })
    return neighbors.map(n => {
      // y = rows, x = cols
      return this.grid[n.y][n.x].coord
    })
  }

  /**
   * Check if a coordinate is walkable or not.
   *
   * @param {Coord} coord The coordinate to check
   * @return Whether or not the coord is walkable
   */
  isWalkable (coord) {
    const isObstacle = this.obstacles.filter(obstacle => {
      return (coord.x === obstacle.x && coord.y === obstacle.y)
    }).length > 0
    return this.withinBounds(coord) && !isObstacle
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

  /**
   * Get the cost to travel from 'from' to 'to'.
   *
   * @param {Coord} from The starting coordinate
   * @param {Coord} to The ending coordinate
   */
  cost (from, to) {
    if (!this.weights.hasOwnProperty(to)) return 1
    return this.weights[to]
  }
}

export default Grid
