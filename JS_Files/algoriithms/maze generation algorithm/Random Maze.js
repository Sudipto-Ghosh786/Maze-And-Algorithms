async function randomMaze(animationTime) {
	for (let node of grid.getAllNodes()) {
		let currentRandomNumber = Math.random();
		if (currentRandomNumber < 0.3 && !node.obj.start && !node.obj.end) {
			node.obj.setWall();
			await sleep(animationTime);
		}
	}
}