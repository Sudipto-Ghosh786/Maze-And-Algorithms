function dijkstra(startNode, targetNode, tm) {
    grid.setAlgo(dijkstra);
    grid.resetPath();
    let neighbourNodes = grid.nodes;
    let queue = [];
    let time = tm;
    let currentNode = undefined;
    let wallsurround = false;
    grid.drawing = false;
    drawing = false;
    grid.removeEventListeners();

    for (let row of neighbourNodes) {
        for (let currentNode of row) {
            currentNode.g = Infinity;
            currentNode.previous = undefined;
            if (!currentNode.obstacle) {
                queue.push(currentNode);
            }
            if (currentNode === startNode) {
                currentNode.g = 0;
            }
        }
    }

    let interval = setInterval(async () => {
        if (queue.length > 0) {
            let index = 0;
            for (let i = 0; i < queue.length; i++) {
                if (queue[i].g < queue[index].g) {
                    index = i;
                }
            }

            currentNode = queue[index];

            if (!currentNode.obstacle && currentNode.g !== Infinity) {
                queue.splice(queue.indexOf(currentNode), 1);
                if (currentNode === targetNode) {
                    grid.completed();
                    clearInterval(interval);
                    retracePath(currentNode, 100);
                    return;
                }
                for (let i = 0; i < currentNode.neighbors.length; i++) {
                    let neighbour = currentNode.neighbors[i];
                    if (!neighbour.obstacle) {
                        let tempG = currentNode.g + 1;
                        if (tempG < neighbour.g) {
                            neighbour.g = tempG;
                            neighbour.previous = currentNode;
                        }
                    } else {
                        continue;
                    }
                }
            } else {
                wallsurround = true;
                queue.length = 0;
            }
        } else {
            clearInterval(interval);
            grid.completed();
            return;
        }

        if (!wallsurround) {
            currentNode.setColour("#3f51b5");
        }
    }, time);
}
