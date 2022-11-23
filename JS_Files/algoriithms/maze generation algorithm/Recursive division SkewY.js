async function recursiveDivisionMazeSkewY(X1, X2, Y1, Y2, currentOrientation, surroundingWalls, visualizationTime) {
    if (X2 < X1 || Y2 < Y1) return;

    let animate = false
    if (!surroundingWalls) {
        let rows = grid.rows;
        let cols = grid.cols;

        for (let i = 1; i < cols - 1; i++) {
            grid.nodes[0][i].setWall();
            await sleep(visualizationTime);
        }

        for (let i = 0; i < rows - 1; i++) {
            grid.nodes[i][0].setWall();
            grid.nodes[i][cols - 1].setWall();
            await sleep(visualizationTime);
        }

        for (let i = 0; i < cols; i++) {
            grid.nodes[rows - 1][i].setWall();
            await sleep(visualizationTime);
        }
        animate = true;
        surroundingWalls = true;
    }

    if (currentOrientation === "horizontal") {
        let possibleRows = [];
        for (let number = X1; number <= X2; number += 2) possibleRows.push(number);
        
        let possibleCols = [];
        for (let number = Y1 - 1; number <= Y2 + 1; number += 2) possibleCols.push(number);

        let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
        let randomColIndex = Math.floor(Math.random() * possibleCols.length);
        let currentRow = possibleRows[randomRowIndex];
        let colRandom = possibleCols[randomColIndex];

        for (let row of grid.nodes) {
            for (let node of row) {
                let r = node.y;
                let c = node.x;
                if (r === currentRow && c !== colRandom && c >= Y1 - 1 && c <= Y2 + 1) {
                    let currentHTMLNode = node.node;
                    if (!node.start && !node.end) {
                        node.setWall();
                        await sleep(visualizationTime);
                    }
                }
            }
        }

        if (currentRow - 2 - X1 > Y2 - Y1) {
            await recursiveDivisionMazeSkewY(X1, currentRow - 2, Y1, Y2, currentOrientation, surroundingWalls, visualizationTime);
        } else {
            await recursiveDivisionMazeSkewY(X1, currentRow - 2, Y1, Y2, "vertical", surroundingWalls, visualizationTime);
        }
        
        if (X2 - (currentRow + 2) > Y2 - Y1) {
            await recursiveDivisionMazeSkewY(currentRow + 2, X2, Y1, Y2, "vertical", surroundingWalls, visualizationTime);
        } else {
            await recursiveDivisionMazeSkewY(currentRow + 2, X2, Y1, Y2, "vertical", surroundingWalls, visualizationTime);
        }
    } else {
        let possibleCols = [];
        for (let number = Y1; number <= Y2; number += 2) {
            possibleCols.push(number);
        }
        
        let possibleRows = [];
        for (let number = X1 - 1; number <= X2 + 1; number += 2) {
            possibleRows.push(number);
        }
        
        let randomColIndex = Math.floor(Math.random() * possibleCols.length);
        let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
        let currentCol = possibleCols[randomColIndex];
        let rowRandom = possibleRows[randomRowIndex];
        
        for (let row of grid.nodes) {
            for (let node of row) {
                let r = node.y;
                let c = node.x;
                if (c === currentCol && r !== rowRandom && r >= X1 - 1 && r <= X2 + 1) {
                    let currentHTMLNode = node.node;
                    if (!node.start && !node.end) {
                        // wallsToAnimate.push(node);
                        node.setWall();
                        await sleep(visualizationTime);
                    }
                }
            }
        }
        
        if (X2 - X1 > currentCol - 2 - Y1) {
            await recursiveDivisionMazeSkewY(X1, X2, Y1, currentCol - 2, "vertical", true, visualizationTime);
        } else {
            await recursiveDivisionMazeSkewY(X1, X2, Y1, currentCol - 2, currentOrientation, true, visualizationTime);
        }
        
        if (X2 - X1 > Y2 - (currentCol + 2)) {
            await recursiveDivisionMazeSkewY(X1, X2, currentCol + 2, Y2, "horizontal", true, visualizationTime);
        } else {
            await recursiveDivisionMazeSkewY(X1, X2, currentCol + 2, Y2, currentOrientation, true, visualizationTime);
        }
    }
}