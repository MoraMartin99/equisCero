import Cell from "./Cell.js";

export default class Board {
    #cells = {};
    #columnList = ["A", "B", "C"];
    #rowList = [1, 2, 3];

    constructor() {
        for (const column of this.#columnList) {
            for (const row of this.#rowList) {
                const cell = new Cell(column, row);
                this.#cells[cell.getProperty("id")] = cell;
            }
        }
    }

    reset() {
        Object.values(this.#cells).forEach((item) => item.reset());
    }

    getCell(id) {
        return Object(Object(this.#cells[id]).getAllProperties?.());
    }

    #getGroupByProperty(property) {
        const cellEntries = Object.entries(this.#cells);
        const group = {};

        for (const [key, value] of cellEntries) {
            if (value.getProperty(property) === undefined) continue;
            const cell = value.getAllProperties();
            const subGroupKey = `${cell[property]}`;
            if (!group[subGroupKey]) group[subGroupKey] = {};
            group[subGroupKey][key] = cell;
        }

        return group;
    }

    getAllRows() {
        return this.#getGroupByProperty("row");
    }

    getAllColumns() {
        return this.#getGroupByProperty("column");
    }

    getAllDiagonals() {
        const getDiagonalGroup = (columnList, rowList) => {
            const group = {};
            columnList.forEach((column, index) => {
                const id = `${column}${rowList[index]}`;
                if (this.#cells[id] !== undefined) {
                    group[id] = this.getCell(id);
                }
            });
            return group;
        };

        return {
            diagonal1: getDiagonalGroup(this.#columnList, this.#rowList),
            diagonal2: getDiagonalGroup(this.#columnList, this.#rowList.toReversed()),
        };
    }

    getCenter() {
        return this.getCell("B2");
    }

    getCorners() {
        return {
            topLeft: this.getCell("A1"),
            topRight: this.getCell("C1"),
            bottomLeft: this.getCell("A3"),
            bottomRight: this.getCell("C3"),
        };
    }

    getEdges() {
        return { top: this.getCell("B1"), right: this.getCell("C2"), bottom: this.getCell("B3"), left: this.getCell("A2") };
    }

    getAllGroups = () => {
        return {
            rows: this.getAllRows(),
            columns: this.getAllColumns(),
            diagonals: this.getAllDiagonals(),
            center: this.getCenter(),
            corners: this.getCorners(),
            edges: this.getEdges(),
        };
    };

    isCellEmpty(id) {
        return Object(this.#cells[id]).getProperty?.("token") === undefined ? true : false;
    }

    setCell(id, token) {
        if (this.isCellEmpty(id)) Object(this.#cells[id]).setToken?.(token);
    }

    #isFull() {
        return Object.keys(this.#cells).every((key) => {
            return !this.isCellEmpty(key);
        });
    }

    #getWinnerMove() {
        const areEqualTokens = (tokenArray) => {
            if (!tokenArray.length) return false;
            return tokenArray.every((item) => (item === undefined ? false : item === tokenArray[0]));
        };

        for (const groupGetter of [this.getAllColumns, this.getAllRows, this.getAllDiagonals]) {
            for (const group of Object.values(groupGetter.bind(this)())) {
                const tokenArray = Object.values(group).map(({ token }) => token);
                if (areEqualTokens(tokenArray)) return group;
            }
        }

        return {};
    }

    getStatus() {
        const winnerMove = this.#getWinnerMove();
        const winnerToken = Object(Object.values(winnerMove)[0]).token;
        const result = winnerToken !== undefined ? "win" : this.#isFull() ? "draw" : "noResult";
        return { winnerMove, winnerToken, result };
    }

    print() {
        const getToken = (cellId) => {
            const token = this.#cells[cellId].getProperty("token");
            if (typeof token === "string" && token !== "") return token[0];
            return " ";
        };
        const asciiBoard = `     A     B     C
        |     |     
  1  ${getToken("A1")}  |  ${getToken("B1")}  |  ${getToken("C1")}  
   _____|_____|_____
        |     |     
  2  ${getToken("A2")}  |  ${getToken("B2")}  |  ${getToken("C2")}  
   _____|_____|_____
        |     |     
  3  ${getToken("A3")}  |  ${getToken("B3")}  |  ${getToken("C3")}  
        |     |     `;

        console.log(asciiBoard);
    }
}
