export default class Results {
    #records = new Map();

    reset() {
        this.#records.clear();
    }

    setRecord(round, result, winnerId) {
        if (!Number.isInteger(round) || Boolean(Object.keys(this.getRecord(round)).length)) return;
        this.#records.set(`round${round}`, { round, result, winnerId });
    }

    getRecord(round) {
        return { ...Object(this.#records.get(`round${round}`)) };
    }

    getAllRecords() {
        return structuredClone(Object.fromEntries(this.#records.entries()));
    }

    getTotal() {
        const totalWins = {};
        let totalDraws = 0;

        for (const [, { winnerId: currenWinnerId, result }] of this.#records) {
            if (result === "draw") totalDraws++;
            if (typeof currenWinnerId !== "string") continue;
            if (!totalWins[currenWinnerId]) {
                totalWins[currenWinnerId] = 1;
            } else {
                totalWins[currenWinnerId]++;
            }
        }

        const winnerId = (() => {
            const max = Math.max(...Object.values(totalWins));
            const winnerList = Object.entries(totalWins)
                .filter(([, value]) => value === max)
                .map(([key]) => key);
            if (winnerList.length === 1) return winnerList[0];
        })();

        return { totalWins, totalDraws, winnerId, result: winnerId === undefined ? "draw" : "win" };
    }
}
