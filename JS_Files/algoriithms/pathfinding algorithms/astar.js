function astar(startNode, targetNode, t) {
    grid.setAlgo(astar);
    // grid.resetPath();
    let openset = [startNode];
    drawing = false;
    grid.drawing = false;
    grid.removeEventListeners();
    
    for (let row of grid.nodes) {
        for (let currentNode of row) {
            currentNode.g = Infinity;
            currentNode.f = Infinity;
            currentNode.h = 0;
            currentNode.visited = false;
            currentNode.removeColor();
            currentNode.previous = null;
        }
    }

    startNode.g = 0;
    startNode.f = getHuristicValue(startNode, targetNode);
    let currentNode = null;

    if (t != 0) {
        let int = setInterval(() => {
            if (openset.length != 0) {
                let currentNode = getLowestF();

                if (currentNode == targetNode) {
                    console.log("done");
                    retracePath(currentNode, 100);
                    clearInterval(int);
                    return;
                }

                openset.splice(openset.indexOf(currentNode), 1);
                currentNode.visited = true;
                currentNode.setColour("#3f51b5"); 

                for (let neighbor of currentNode.neighbors) {
                    if (!neighbor.visited && !neighbor.obstacle) {
                        let tempG = currentNode.g + getHuristicValue(currentNode, neighbor);
                        if (tempG < neighbor.g) {
                            neighbor.previous = currentNode;
                            neighbor.g = tempG;
                            neighbor.f = tempG + getHuristicValue(neighbor, targetNode);
                            if (!openset.includes(neighbor)) openset.push(neighbor);
                        }
                    }
                }
            } else {
                clearInterval(int);
                return false;   
            }
        }, t);
    } else {
        while (openset.length != 0) {
            let currentNode = getLowestF();

            if (currentNode == targetNode) {
                console.log("done");
                retracePath(currentNode, 0);
                break;
                return;
            }

            openset.splice(openset.indexOf(currentNode), 1);
            currentNode.visited = true;
            currentNode.setColour("#3f51b5", true); 

            for (let neighbor of currentNode.neighbors) {
                if (!neighbor.visited && !neighbor.obstacle) {
                    let tempG = currentNode.g + getHuristicValue(currentNode, neighbor);
                    if (tempG < neighbor.g) {
                        neighbor.previous = currentNode;
                        neighbor.g = tempG;
                        neighbor.f = tempG + getHuristicValue(neighbor, targetNode);
                        if (!openset.includes(neighbor)) openset.push(neighbor);
                    }
                }
            }
        }
    }

    function getLowestF() {
        let lowestF = Infinity;
        let res;
        for (let node of openset) {
            if (node.f < lowestF) {
                lowestF = node.f;
                res = node;
            }
        }
        return res;
    }

    function getHuristicValue(currentNode, targetNode) {
        return Math.abs(currentNode.x - targetNode.x) + Math.abs(currentNode.y - targetNode.y);
    }
}