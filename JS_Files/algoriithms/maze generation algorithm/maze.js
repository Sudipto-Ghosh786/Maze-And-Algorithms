async function sleep(visualizationTime) {
    return new Promise(resolve => setTimeout(resolve, visualizationTime));
}

function getNeighbours(node) {
	let neighbours = [];
	let cols = grid.cols;
	let rows = grid.rows;
	let g = grid.nodes;
	let x = node.y;
	let y = node.x;

	if (x - 2 >= 1 && !g[x - 2][y].visited) {
        neighbours.push(g[x - 2][y]);
    }
	if (y - 2 >= 1 && !g[x][y - 2].visited) {
        neighbours.push(g[x][y - 2]);
    }
    if (y + 2 < cols - 1 && !g[x][y + 2].visited) {
        neighbours.push(g[x][y + 2]);
	}
    if (x + 2 < rows - 1 && !g[x + 2][y].visited) {
		neighbours.push(g[x + 2][y]);
	}

	return neighbours;
}

function removeWall(currentNode, neighbourNode) {
	let currentX = currentNode.x;
	let currentY = currentNode.y;
	let nx = neighbourNode.x;
	let ny = neighbourNode.y;
	if (currentX == nx && ny > currentY) {
		grid.nodes[currentY + 1][currentX].removeWall();
	} else if (currentX == nx) {
		grid.nodes[currentY - 1][currentX].removeWall();
	} else if (nx < currentX) {
		grid.nodes[currentY][currentX - 1].removeWall();
	} else {
		grid.nodes[currentY][currentX + 1].removeWall();
	}
}