export const CELL_SIZE = 30;

export const Renderer = {
    draw(board, container, handleLeftClick, handleRightClick) {
        this.clearContainer(container);
        this.setupGridLayout(container, board.cols);
        this.createCells(board, container, handleLeftClick, handleRightClick);
    },

    clearContainer(container) {
        container.innerHTML = "";
    },

    setupGridLayout(container, cols) {
        container.style.gridTemplateColumns = `repeat(${cols}, ${CELL_SIZE}px)`;
    },

    createCells(board, container, handleLeftClick, handleRightClick) {
        for (let r = 0; r < board.rows; r++) {
            for (let c = 0; c < board.cols; c++) {
                const cell = this.createCell(r, c, handleLeftClick, handleRightClick);
                container.appendChild(cell);
            }
        }
    },

    createCell(row, col, handleLeftClick, handleRightClick) {
        const cell = document.createElement("div");
        
        this.setCellProperties(cell, row, col);
        this.attachCellEventListeners(cell, row, col, handleLeftClick, handleRightClick);
        
        return cell;
    },

    setCellProperties(cell, row, col) {
        cell.className = "cell";
        cell.dataset.row = row;
        cell.dataset.col = col;
    },

    attachCellEventListeners(cell, row, col, handleLeftClick, handleRightClick) {
        cell.addEventListener("click", () => handleLeftClick(row, col));
        cell.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            handleRightClick(row, col);
        });
    },

    getCell(r, c) {
        return document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
    }
};