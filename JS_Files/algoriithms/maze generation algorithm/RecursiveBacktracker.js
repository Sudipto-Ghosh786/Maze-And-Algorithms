let next = false;	

async function recursiveBacktracker(visualizationTime) {
	let nodeSet = grid.nodes;
	let currentSelectedNode = nodeSet[1][1];
	let callStack = [currentSelectedNode];
	let visited = [currentSelectedNode];

	for (let node of grid.getAllNodes()) {
		if (!node.obj.start && !node.obj.end) {
			node.obj.setWall();
			node.obj.visited = false;
		}
	}

	while (callStack.length > 0) {
		let neighbours = getNeighbours(currentSelectedNode);
		currentSelectedNode.removeColor();
		if (neighbours.length > 0) {
			currentSelectedNode.removeWall();
			let index = Math.floor(Math.random() * neighbours.length);
			let neighbour = neighbours[index];
			callStack.push(currentSelectedNode);
			visited.push(neighbour);
			removeWall(currentSelectedNode, neighbour);
			currentSelectedNode = neighbour;
			currentSelectedNode.removeWall();
			currentSelectedNode.visited = true;
		} else if (callStack.length > 0) {
			currentSelectedNode = callStack.pop();
		}
		currentSelectedNode.setColour("green");
		await sleep(visualizationTime);
	}

	for (let node of grid.getAllNodes()) {
		if (!node.obj.start && !node.obj.end) {
			node.obj.visited = false;
		}
	}
}

