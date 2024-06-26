import Utilities from "../Utilities.js";

export default class AI {
    #player;
    #difficultyLevel;
    #cellGroupGetter;
    #triggerEvent;
    #dropToken;

    init({ player, difficultyLevel, cellGroupGetter, triggerEvent, dropToken }) {
        const isFunction = new Utilities().isFunction;
        this.#player = Object(player);
        this.#difficultyLevel = difficultyLevel;
        this.#cellGroupGetter = cellGroupGetter;
        this.#triggerEvent = Object(triggerEvent);
        this.#dropToken = dropToken;

        if (!isFunction(this.#cellGroupGetter) || !isFunction(this.#dropToken)) return;
        Object(this.#triggerEvent).subscribe?.(this.#playTurn);
    }

    disconnect() {
        Object(this.#triggerEvent).unsubscribe?.(this.#playTurn);
        this.#player = undefined;
        this.#difficultyLevel = undefined;
        this.#cellGroupGetter = undefined;
        this.#triggerEvent = undefined;
        this.#dropToken = undefined;
    }

    #playTurn = ({ currentPlayer }) => {
        if (currentPlayer.id !== this.#player.id) return;
        const self = this;
        const chance = this.#difficultyLevel === "hard" ? 100 : 60;
        const getRandomItemByWeight = new Utilities().getRandomItemByWeight;
        const cellId = getRandomItemByWeight([
            { item: self.#getIdealCellId, weight: chance },
            { item: self.#getRandomEmptyCellId, weight: 100 - chance },
        ])();
        this.#dropToken(cellId);
    };

    #getRandomEmptyCellId = () => {
        const emptyCellIdList = Object.values(this.#cellGroupGetter().rows)
            .map((item) => Object.values(item))
            .flat()
            .filter(({ token }) => token === undefined)
            .map(({ id }) => id);
        return emptyCellIdList[Math.round((emptyCellIdList.length - 1) * Math.random())];
    };

    #getBoardChoiceIndex() {
        if (!this.#cellGroupGetter) return {};
        const playerToken = Object(this.#player).token;
        const { rows, columns, diagonals, center, corners, edges } = this.#cellGroupGetter();
        const isCenter = (id) => center.id === id;
        const isCorner = (id) => {
            return Object.values(corners)
                .map(({ id }) => id)
                .includes(id);
        };
        const isEdge = (id) => {
            return Object.values(edges)
                .map(({ id }) => id)
                .includes(id);
        };
        const getDiagonal = (id) => {
            return Object(
                Object.values(diagonals).find((item) => {
                    return Object.values(item)
                        .map(({ id }) => id)
                        .includes(id);
                })
            );
        };

        const getCellSiblingsLineList = (id) => {
            //devuelve la fila, columna y diagonal (en caso que aplica) de cell, excluyendo cell
            const cell = Object(cells[id]);
            return [rows[cell.row], columns[cell.column], getDiagonal(id)]
                .map((item) => Object.values(Object(item)).filter((item) => item.id !== id))
                .filter((item) => item.length);
        };

        const cells = Object.fromEntries(
            Object.values(rows)
                .map((item) => Object.values(item))
                .flat()
                .map(({ id, token, row, column }) => {
                    const choiceIndex = Boolean(isCenter(id) || isCorner(id)) ? 1 : 0;
                    return [id, { id, choiceIndex, token, row, column }];
                })
        );

        const completesWinnerMove = (id, siblingLineMatcher) => {
            const cell = Object(cells[id]);
            if (cell.token !== undefined) return false;
            return getCellSiblingsLineList(id).some(siblingLineMatcher);
        };

        const completesEnemyWinnerMove = (id) => {
            //regla 3 del algoritmo
            const matcher = (siblingLineList) => {
                return siblingLineList.every(({ token }) => {
                    return token === siblingLineList[0].token && token !== playerToken && token !== undefined;
                });
            };
            return completesWinnerMove(id, matcher);
        };

        const completesPlayerWinnerMove = (id) => {
            //regla 4 del algoritmo
            const matcher = (siblingLineList) => {
                return siblingLineList.every(({ token }) => {
                    return token === siblingLineList[0].token && token === playerToken && token !== undefined;
                });
            };
            return completesWinnerMove(id, matcher);
        };

        const isCenterSurroundedByEnemyTokens = (id) => {
            // regla 5 del algoritmo
            if (!isCenter(id)) return false;
            return [corners, edges]
                .map((item) => Object.values(item))
                .flat()
                .some(({ token }) => token !== playerToken && token !== undefined);
        };

        const isOppositeExclusiveCorner = (id) => {
            // regla 6 del algoritmo
            const cornersList = Object.values(corners).filter(({ token }) => token === playerToken);

            switch (true) {
                case !isCorner(id):
                case center.token === undefined || center.token === playerToken:
                case cornersList.length !== 1:
                    return false;
            }

            const corner1 = cornersList[0];
            const corner2 = cells[id];

            return corner1.row !== corner2.row && corner1.column !== corner2.column;
        };

        const isAxisEnemyFreeCorner = (id) => {
            // regla 7 del algoritmo
            const boardHasEnemyTokens = Object.values(rows)
                .map((item) => Object.values(item))
                .flat()
                .some(({ token }) => token !== playerToken && token !== undefined);
            const cell = Object(cells[id]);

            if (!boardHasEnemyTokens || !isCorner(id)) return false;

            return [rows[cell.row], columns[cell.column]]
                .map((item) => Object.values(item).filter((item) => item.id !== id))
                .flat()
                .every(({ token }) => token === playerToken || token === undefined);
        };

        const isEdgeLineEnemyFreeCorner = (id) => {
            // regla 8 y 9 del algoritmo
            if (!isCorner(id)) return false;
            const cell = Object(cells[id]);
            const cellSiblingsLineList = [rows[cell.row], columns[cell.column]].map((item) => {
                return Object.values(item).filter((item) => item.id !== id);
            });
            const isValid = (siblingsList) => {
                const corner = Object(siblingsList.find((item) => isCorner(item.id)));
                const edge = Object(siblingsList.find((item) => isEdge(item.id)));
                if (corner.token !== playerToken || edge.token !== undefined) return false;
                const edgeLine = corner.row === edge.row ? columns[edge.column] : rows[edge.row];
                return Object.values(edgeLine).every(({ token }) => token === undefined);
            };

            return cellSiblingsLineList.some(isValid);
        };

        const cornerSetsDoubleWinnerMove = (id) => {
            // regla 10 del algoritmo
            if (!isCorner(id)) return false;
            const cellSiblingsLineList = getCellSiblingsLineList(id);
            let winnerMoveCount = cellSiblingsLineList.reduce((count, siblingsList) => {
                const hasPlayerToken = siblingsList.some(({ token }) => token === playerToken);
                const hasEmptyCell = siblingsList.some(({ token }) => token === undefined);
                if (hasPlayerToken && hasEmptyCell) count++;
                return count;
            }, 0);

            if (winnerMoveCount >= 2) return true;
            return false;
        };

        for (const id of Object.keys(cells)) {
            const currentCell = cells[id];
            const { token } = currentCell;
            if (token === undefined) {
                if (isCenterSurroundedByEnemyTokens(id)) currentCell.choiceIndex = 3;
                if (isOppositeExclusiveCorner(id)) currentCell.choiceIndex = 3;
                if (cornerSetsDoubleWinnerMove(id)) currentCell.choiceIndex = 10;
                if (completesEnemyWinnerMove(id)) currentCell.choiceIndex = 15;
                if (completesPlayerWinnerMove(id)) currentCell.choiceIndex = 20;
                if (isAxisEnemyFreeCorner(id)) currentCell.choiceIndex++;
                if (isEdgeLineEnemyFreeCorner(id)) currentCell.choiceIndex += 3;
            } else {
                currentCell.choiceIndex = -10;
            }
        }

        return cells;
    }

    #getIdealCellId = () => {
        const boardChoiceIndex = this.#getBoardChoiceIndex();
        const maxChoiceIndex = Math.max(...Object.values(boardChoiceIndex).map(({ choiceIndex }) => choiceIndex));
        const idealCellIdList = Object.values(boardChoiceIndex)
            .filter(({ choiceIndex }) => choiceIndex === maxChoiceIndex)
            .map(({ id }) => id);
        return idealCellIdList[Math.round(Math.random() * (idealCellIdList.length - 1))];
    };

    printChoiceIndex() {
        const cells = Object(this.#getBoardChoiceIndex());
        const getChoiceIndex = (cellId) => {
            const choiceIndex = cells[cellId]?.choiceIndex;
            if (!choiceIndex) return " ";
            return String(cells[cellId]?.choiceIndex);
        };
        const asciiBoard = `     A     B     C
        |     |     
  1  ${getChoiceIndex("A1")}  |  ${getChoiceIndex("B1")}  |  ${getChoiceIndex("C1")}  
   _____|_____|_____
        |     |     
  2  ${getChoiceIndex("A2")}  |  ${getChoiceIndex("B2")}  |  ${getChoiceIndex("C2")}  
   _____|_____|_____
        |     |     
  3  ${getChoiceIndex("A3")}  |  ${getChoiceIndex("B3")}  |  ${getChoiceIndex("C3")}  
        |     |     `;

        console.log(asciiBoard);
    }
}
