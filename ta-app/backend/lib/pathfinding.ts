var PF = require('pathfinding');

// Define your matrix
// const matrix = [
//   [0, 0, 0, 1, 0],
//   [1, 0, 0, 0, 1],
//   [0, 0, 1, 0, 0],
// ];
const matrix = [
    [1, 1, 1, 1, 1,1, 1, 1, 1, 1,1, 1, 1, 1, 1],
]

// Create grid from the matrix
const grid = new PF.Grid(matrix);

// Create pathfinder instance using A* algorithm
var finder = new PF.AStarFinder({
    allowDiagonal: true
});

// Find the path
const path = finder.findPath(1, 2, 4, 2, grid.clone());

// Output the path to the console
console.log(path);
