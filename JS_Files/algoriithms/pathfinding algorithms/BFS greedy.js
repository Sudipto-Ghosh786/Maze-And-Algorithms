async function greedyBfs(startNode, targetNode, tm) {
	let q = [startNode];

	grid.setAlgo(greedyBfs);

	for (let row of grid.nodes) {
		for (let node of row) {
			node.previous = null;
			node.visited = false;
			node.h = Infinity;
			node.removeColor();
		}
	}

	while (q.length !== 0) {
		let v = q.pop();
		v.visited = true;
		v.setColour("#3f51b5");
		if (v === targetNode) {
			await retracePath(v, tm);
			break;
			return;
		}

		calculateNeighbourH(v);

		for (let neighbour of v.neighbors) {
			if (!neighbour.visited && !neighbour.obstacle) {
				neighbour.visited = true;
				neighbour.previous = v;
				q.push(neighbour);
				q.sort((a, b) => b.h - a.h);
				await sleep(tm);
			}
		}
	}

	function calculateNeighbourH(node) {
		for (let neighbour of node.neighbors) {
			if (!neighbour.obstacle && !neighbour.visited) neighbour.h = heruistic(neighbour, targetNode);
		}
		node.neighbors.sort((a, b) => b.h - a.h)
	}

	function heruistic(current, targetNode) {
        return Math.abs(current.x - targetNode.x) + Math.abs(current.y - targetNode.y);
    }
}