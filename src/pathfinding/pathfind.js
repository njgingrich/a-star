import Queue from 'tinyqueue'
import Grid from './grid'
import Node from './node'

class Pathfinder {
  constructor (rows, cols, obstacles) {
    this.rows = rows
    this.cols = cols
    this.obstacles = obstacles
    this.grid = new Grid(rows, cols, obstacles)
  }

  /**
   * Find the shortest path between two coordinates using
   * the specified algorithm.
   *
   * @param {Coord} from The starting coordinate
   * @param {Coord} to The ending coordinate
   * @param {String} type The type of search method to use
   */
  search (from, to, type = 'dijkstras') {
    if (type === 'bfs') {
      return this.bfs(from, to)
    }
    else if (type === 'dijkstras') {
      return this.dijkstras(from, to)
    }
    else if (type === 'astar') {
      return this.astar(from, to)
    }
    else {
      return this.bfs(from, to)
    }
  }

  /**
   * Give the Euclidian difference between two coordinates.
   *
   * @param {Coord} p
   * @param {Coord} q
   */
  distance (p, q) {
    return Math.sqrt(((p.x - q.x) ** 2) + ((p.y - q.y) ** 2))
  }

  /**
   * Perform breadth-first search from the starting to the goal coord.
   *
   * @param {Coord} from The starting coordinate
   * @param {Coord} to The ending coordinate
   * @returns An object of coordinates (as keys) that map to their parent
   */
  bfs (from, to) {
    let frontier = new Queue([], (a, b) => {
      const vectorA = this.distance(a, from)
      const vectorB = this.distance(b, from)

      return vectorA - vectorB
    })
    let cameFrom = {}

    frontier.push(from)
    cameFrom[from] = null

    while (frontier.length > 0) {
      let current = frontier.pop()
      if (current.x === to.x && current.y === to.y) break

      let neighbors = this.grid.findNeighbors(current)
      neighbors.forEach(neighbor => {
        if (!(neighbor in cameFrom)) {
          frontier.push(neighbor)
          cameFrom[neighbor] = current
        }
      })
    }
    return cameFrom
  }

  /**
   * Search from the starting to the goal coord using Dijkstra's algorithm.
   *
   * @param {Coord} from The starting coordinate
   * @param {Coord} to The ending coordinate
   * @returns An object of coordinates (as keys) that map to their parent
   */
  dijkstras (from, to) {
    let frontier = new Queue([], (a, b) => {
      return a.priority - b.priority
    })
    let cameFrom = {}
    let costsFor = {}

    frontier.push(new Node(null, from, 0))
    cameFrom[from] = null
    costsFor[from] = 0

    while (frontier.length > 0) {
      let current = frontier.pop().coord
      if (current.x === to.x && current.y === to.y) break

      let neighbors = this.grid.findNeighbors(current)
      neighbors.forEach(neighbor => {
        const newCost = costsFor[current] + this.grid.cost(current, neighbor)
        if (!(neighbor in costsFor) || newCost < costsFor[neighbor]) {
          costsFor[neighbor] = newCost
          frontier.push(new Node(current, neighbor, newCost))
          cameFrom[neighbor] = current
        }
      })
    }
    return cameFrom
  }

  /**
   * Search from the starting to the goal coord using the A* algorithm.
   *
   * @param {Coord} from The starting coordinate
   * @param {Coord} to The ending coordinate
   * @returns An object of coordinates (as keys) that map to their parent
   */
  astar (from, to) {
    let frontier = new Queue([], (a, b) => {
      return a.priority - b.priority
    })
    let cameFrom = {}
    let costsFor = {}

    frontier.push(new Node(null, from, 0))
    cameFrom[from] = null
    costsFor[from] = 0

    while (frontier.length > 0) {
      let current = frontier.pop().coord
      if (current.x === to.x && current.y === to.y) break

      let neighbors = this.grid.findNeighbors(current)
      neighbors.forEach(neighbor => {
        const newCost = costsFor[current] + this.grid.cost(current, neighbor)
        if (!(neighbor in costsFor) || newCost < costsFor[neighbor]) {
          const priority = newCost + this.manhattanDistance(neighbor, to)
          costsFor[neighbor] = newCost
          frontier.push(new Node(current, neighbor, priority))
          cameFrom[neighbor] = current
        }
      })
    }
    return cameFrom
  }

  /**
   * Reconstruct the path from the start to the goal.
   *
   * @param {Coord} start The starting coordinate
   * @param {Coord} goal The ending coordinate
   * @param {Object} cameFrom An object of Coords mapped to their parent Coords
   * @returns An object of coords making up the path
   */
  reconstructPath (start, goal, cameFrom) {
    let current = goal
    let path = {}
    path[current] = true

    while (!(start.x === current.x && start.y === current.y)) {
      current = cameFrom[current]
      path[current] = true
    }
    path[start] = true
    return path
  }

  /**
   * Calculate the manhattan distance between two coordinates.
   *
   * @param {Coord} from Starting location
   * @param {Coord} to Ending location
   */
  manhattanDistance (from, to) {
    return Math.abs(from.x - to.x) + Math.abs(from.y - to.y)
  }

  /**
   * Find the path of nodes, given the goal node and retracing
   * to find the starting node.
   *
   * @param {Node} node The starting node
   * @returns An array of Coords that represent the final path found
   */
  retracePath (node) {
    let cur = node
    let path = []
    while (cur !== null) {
      path.push(cur.coord)
      cur = cur.parent
    }
    return path
  }
}

export default Pathfinder
