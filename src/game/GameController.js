import Game from "./Game.js";

export default class GameController {
    #game = new Game();
    moveEvent = this.#game.moveEvent;
    nextPlayerEvent = this.#game.nextPlayerEvent;
    roundEndEvent = this.#game.roundEndEvent;
    gameEndEvent = this.#game.gameEndEvent;
    board = { print: () => this.#game.board.print(), getAllGroups: () => this.#game.board.getAllGroups() };
    players = { getAllPlayers: () => this.#game.players.getAllPlayers() };
    difficulty = { getLevel: () => this.#game.difficulty.getLevel() };
    results = { getAllRecords: () => this.#game.results.getAllRecords(), getTotal: () => this.#game.results.getTotal() };
    rounds = {
        getTotalRounds: () => this.#game.rounds.getTotalRounds(),
        getCurrentRound: () => this.#game.rounds.getCurrentRound(),
    };
    turns = {
        getCurrentTurn: () => this.#game.turns.getCurrentTurn(),
        getCurrentPlayerId: () => this.#game.turns.getCurrentPlayerId(),
    };
    type = { getType: () => this.#game.type.getType() };
    ai = { printChoiceIndex: () => this.#game.ai.printChoiceIndex() };
    #validPlayerSettings = {
        playerIds: ["player1", "player2"],
        tokens: { token1: "x", token2: "0" },
        roles: ["CPU", "user", undefined],
        namePattern: "^\\w{1,10}$",
    };
    #validTypeList = ["PVSP", "PVSCPU"];
    #validDifficultyLevelList = ["normal", "hard"];

    constructor() {
        this.moveEvent.subscribe(this.#moveEventHandler);
    }

    #moveEventHandler = (data) => {
        const { type } = Object(data);

        if (type !== "valid") return;

        if (this.#game.turns.getCurrentTurn() < 5) {
            this.#nextPlayerEmitter();
        } else {
            const { winnerMove, winnerToken, result } = this.#game.board.getStatus();
            const winnerId = this.#game.players.getPlayerByToken(winnerToken).id;
            const currentRound = this.#game.rounds.getCurrentRound();
            const totalRounds = this.#game.rounds.getTotalRounds();

            if (result === "noResult") {
                this.#nextPlayerEmitter();
            } else {
                this.#game.results.setRecord(currentRound, result, winnerId);
                if (currentRound < totalRounds) this.#roundEndEmitter(winnerMove, winnerId, result);
                if (currentRound === totalRounds) this.#gameEndEmitter(winnerMove);
            }
        }
    };

    #nextPlayerEmitter() {
        this.#game.turns.nextTurn();
        const currentPlayer = this.#game.players.getPlayerById(this.#game.turns.getCurrentPlayerId());
        this.nextPlayerEvent.trigger({ currentPlayer });
    }

    #roundEndEmitter(winnerMove, winnerId, result) {
        this.roundEndEvent.trigger({
            currentRound: this.#game.rounds.getCurrentRound(),
            winnerMove,
            winnerId,
            result,
            players: this.#game.players.getAllPlayers(),
        });
    }

    #gameEndEmitter(winnerMove) {
        const { totalWins, totalDraws, winnerId, result } = this.#game.results.getTotal();
        this.gameEndEvent.trigger({
            currentRound: this.#game.rounds.getCurrentRound(),
            winnerMove,
            totalWins,
            totalDraws,
            result,
            winnerId,
            players: this.#game.players.getAllPlayers(),
        });
    }

    setGame(settings) {
        let { type, totalRounds, difficultyLevel, players, avatarSources } = Object(settings);
        type = String(type).toUpperCase();
        players = Object(players);
        avatarSources = Object(avatarSources);

        const isValidPlayerSettings = ({ id, name, role, tokenId }) => {
            const regex = new RegExp(this.#validPlayerSettings.namePattern);
            switch (true) {
                case !this.#validPlayerSettings.playerIds.includes(id):
                case !regex.test(name):
                case !this.#validPlayerSettings.roles.includes(role):
                case !this.#validPlayerSettings.tokens[tokenId]:
                    return false;
            }
            return true;
        };

        if (typeof namePattern === "string") this.#game.setNamePattern(namePattern);
        if (this.#validTypeList.includes(type)) this.#game.type.setType(type);
        this.#game.rounds.setTotalRounds(totalRounds);
        if (this.#validDifficultyLevelList.includes(difficultyLevel)) this.#game.difficulty.setLevel(difficultyLevel);
        for (const settings of Object.values(players)) if (isValidPlayerSettings(settings)) this.#setPlayer(settings);
        for (const [id, url] of Object.entries(avatarSources)) this.#game.players.setAvatarSource({ id, url });
    }

    dropToken(cellId) {
        if (!this.#isGameSet()) return;
        const targetCell = this.#game.board.getCell(cellId);
        const currentPlayer = this.#game.players.getPlayerById(this.#game.turns.getCurrentPlayerId());
        let type;

        if (targetCell.id === undefined) return;

        if (this.#game.board.isCellEmpty(cellId)) {
            this.#game.board.setCell(cellId, currentPlayer.token);
            type = "valid";
        } else {
            type = "invalid";
        }

        this.moveEvent.trigger({ type, targetCell, player: currentPlayer });
    }

    nextRound() {
        if (!this.#isGameSet()) return;
        this.#game.rounds.next();
        this.initRound();
    }

    initRound() {
        if (!this.#isGameSet()) return;
        this.#game.board.reset();
        this.#game.turns.resetQueue();
        this.#nextPlayerEmitter();
    }

    restart() {
        this.#game.rounds.resetCurrentRound();
        this.#game.results.reset();
        this.initRound();
    }

    reset() {
        this.#game.players.reset();
        this.#game.ai.disconnect();
        this.#game.board.reset();
        this.#game.results.reset();
        this.#game.rounds.reset();
        this.#game.turns.reset();
        this.#game.type.reset();
        this.#game.difficulty.reset();
        this.#game.setNamePattern(undefined);
    }

    getNamePattern() {
        return this.#game.getNamePattern();
    }

    start() {
        if (!this.#isGameSet()) return;
        if (this.#game.type.getType() === "PVSCPU") {
            this.#game.ai.init({
                player: this.#game.players.getCPUPlayer(),
                difficultyLevel: this.#game.difficulty.getLevel(),
                cellGroupGetter: this.#game.board.getAllGroups,
                triggerEvent: this.nextPlayerEvent,
                dropToken: this.dropToken,
            });
        }
        this.#game.turns.setPlayersIdList(this.#game.players.getPlayersIdList());
        this.initRound();
    }

    #isGameSet() {
        switch (true) {
            case this.#game.getNamePattern() === undefined:
            case this.#game.type.getType() === undefined:
            case this.#game.rounds.getTotalRounds() === undefined:
            case this.#game.difficulty.getLevel() === undefined:
            case this.#game.players.getPlayersIdList().length !== 2:
            case Object.keys(this.#game.players.getAllAvatarSources()).length < 2:
                return false;
        }
        return true;
    }

    #setPlayer({ id, name, role, tokenId }) {
        const token = this.#validPlayerSettings.tokens[tokenId];
        const order = token === "x" ? 1 : token === "0" ? 2 : undefined;
        this.#game.players.setPlayer({ id, name, role, token, order });
    }
}
