export const Renderer = {
    draw(board, container, handleLeftClick, handleRightClick) {
        container.innerHTML = "";
        container.style.gridTemplateColumns = `repeat(${board.cols}, 30px)`;

        for (let r = 0; r < board.rows; r++) {
            for (let c = 0; c < board.cols; c++) {
                const cell = document.createElement("div");
                cell.className = "cell";
                cell.dataset.row = r;
                cell.dataset.col = c;
                cell.addEventListener("click", () => handleLeftClick(r, c));
                cell.addEventListener("contextmenu", (e) => {
                    e.preventDefault();
                    handleRightClick(r, c);
                });
                container.appendChild(cell);
            }
        }
    },

    getCell(r, c) {
        return document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
    }
};
