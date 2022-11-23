async function dfs(startNode, targetNode, tm) {
	let stack = [startNode];

	grid.setAlgo(dfs);
	drawing = false;
	grid.drawing = false;
	for (let row of grid.nodes) {
		for (let currentNode of row) {
			currentNode.visited = false;
			currentNode.previous = null;
			currentNode.removeColor();
		}
	}

	let v;
	while (stack.length != 0) {
		v = stack.pop();
		if (v === targetNode) {
			retracePath(v, 100);
			break;
			return;
		}
		if (!v.visited) {
			v.setColour("#3f51b5");
			v.visited = true;
			for (let neighbourNode of v.neighbors) {
				if (!neighbourNode.visited && !neighbourNode.obstacle) {
					stack.push(neighbourNode);
					neighbourNode.previous = v;
					await sleep(tm);
				}
			}
		}
	}
}

