async function bfs(startNode, targetNode, tm) {
	let queue = [startNode];

	grid.setAlgo(bfs);

	for (let row of grid.nodes) {
		for (let currentNode of row) {
			currentNode.previous = null;
			currentNode.visited = false;
			currentNode.removeColor();
		}
	}

	while (queue.length !== 0) {
		let v = queue.pop();
		v.visited = true;
		v.setColour("#3f51b5");
		if (v === targetNode) {
			await retracePath(v, tm);
			break;
		}

		for (let neighbourNode of v.neighbors) {
			if (!neighbourNode.visited && !neighbourNode.obstacle) {
				neighbourNode.visited = true;
				neighbourNode.previous = v;
				queue.unshift(neighbourNode);
				await sleep(tm);
			}
		}
	}
}