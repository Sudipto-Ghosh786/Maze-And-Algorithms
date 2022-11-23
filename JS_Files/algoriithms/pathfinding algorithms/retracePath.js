function retracePath(previousNode, visualizationTime) {
    let temp = previousNode;
    let pathInMaze = [temp];
    while (temp.previous != undefined) {
        pathInMaze.unshift(temp.previous);
        temp = temp.previous;
    }
    let i = 0;
    console.log(pathInMaze.length);
    const interval = setInterval(() => {
        if (i === pathInMaze.length) {
            clearInterval(interval);
            return;
        }
        if (pathInMaze[i + 1]) {
            if (pathInMaze[i + 1].x > pathInMaze[i].x) pathInMaze[i].rotate(0);
            if (pathInMaze[i + 1].x < pathInMaze[i].x) pathInMaze[i].rotate(180);
            if (pathInMaze[i + 1].y > pathInMaze[i].y) pathInMaze[i].rotate(90);
            if (pathInMaze[i + 1].y < pathInMaze[i].y) pathInMaze[i].rotate(-90);
        }
        if (i > 0) pathInMaze[i - 1].removeIcon();
        pathInMaze[i].setColour("#15e653", true);

        pathInMaze[i].setIcon("img/start.png");
        grid.completed();
        i++;
    }, visualizationTime);
}
