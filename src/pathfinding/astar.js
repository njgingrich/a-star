import Queue from 'tinyqueue'
import Grid from './grid'
import Node from './node'

class AStar {
  constructor (rows, cols) {
    this.rows = rows
    this.cols = cols
    this.grid = new Grid(rows, cols)
  }

  search (from, to, type = 'bfs') {
    if (type === 'bfs') {
      return this.bfs(from, to)
    }
    else if (type === 'astar') {
      return this.findPath(from, to)
    }
  }

  bfs (from, to) {
    let frontier = new Queue()
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

  findPath (from, to) {
    let openQueue = new Queue()

    let start = new Node(null, from, 0, this.manhattanDistance(from, to))
    this.grid.markDirty(start)
    openQueue.push(start)

    while (openQueue.length > 0) {
      var arr = []
      while (openQueue.length) arr.push(openQueue.pop())
      openQueue = new Queue(arr)
      this.printQueue(arr)
      const currentNode = openQueue.pop()
      console.log('LOOKING AT COORDINATE', currentNode.coord)

      if (currentNode.coord.sameAs(to)) {
        return this.retracePath(currentNode)
      }
      currentNode.closed = true

      const neighbors = this.grid.findNeighbors(currentNode.coord)
      console.log('Found neighbors:', neighbors)
      neighbors.forEach(neighbor => {
        console.log('###############')
        console.log('neighbor', neighbor.coord)
        if (neighbor.closed || !this.grid.isWalkable(neighbor.coord)) {
          return
        }
        const mdist = this.manhattanDistance(currentNode.coord, neighbor.coord)
        let gScore = currentNode.g + mdist
        console.log(`g score: ${gScore} (from cur.g = ${currentNode.g} and mdist=${mdist}`)
        const beenVisited = neighbor.visited

        console.log(`gscore vs neighbor.g: ${gScore} vs ${neighbor.g}`)
        console.log(`cond1: ${!beenVisited}, cond2: ${gScore < neighbor.g}`)
        if (!beenVisited || gScore < neighbor.g) {
          neighbor.visited = true
          neighbor.parent = currentNode

          neighbor.g = gScore
          neighbor.h = this.manhattanDistance(neighbor.coord, to)
          neighbor.f = neighbor.g + neighbor.h
          console.log(`G: ${neighbor.g}, H: ${neighbor.h}, F: ${neighbor.f}`)
          this.grid.markDirty(neighbor)

          if (!beenVisited) {
            console.log('pushing neighbor to queue')
            openQueue.push(neighbor)
          }
          else {
            console.log('reflowing queue')
            // reflow queue
            var arr = []
            while (openQueue.length) arr.push(openQueue.pop())
            openQueue = new Queue(arr)
          }
        }
      })
    }
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

  printQueue (array) {
    console.log('Current Queue:')
    console.log(array.map(el => el.coord))
  }

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

export default AStar
