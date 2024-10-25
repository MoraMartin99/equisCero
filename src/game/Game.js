import CustomizedEvent from "../CustomizedEvent.js";
import Board from "./Board.js";
import Players from "./Players.js";
import Difficulty from "./Difficulty.js";
import Results from "./Results.js";
import Rounds from "./Rounds.js";
import Turns from "./Turns.js";
import Type from "./Type.js";
import AI from "./AI.js";

export default class Game {
    #moveEvent = new CustomizedEvent("moveEvent");
    #nextPlayerEvent = new CustomizedEvent("nextPlayerEvent");
    #roundEndEvent = new CustomizedEvent("roundEndEvent");
    #gameEndEvent = new CustomizedEvent("gameEndEvent");
    #board = new Board();
    #players = new Players();
    #difficulty = new Difficulty();
    #results = new Results();
    #rounds = new Rounds();
    #turns = new Turns();
    #type = new Type();
    #ai = new AI();
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

        if (this.#turns.getCurrentTurn() < 5) {
            this.#nextPlayerEmitter();
        } else {
            const { winnerMove, winnerToken, result } = this.#board.getStatus();
            const winnerId = this.#players.getPlayerByToken(winnerToken).id;
            const currentRound = this.#rounds.getCurrentRound();
            const totalRounds = this.#rounds.getTotalRounds();

            if (result === "noResult") {
                this.#nextPlayerEmitter();
            } else {
                this.#results.setRecord(currentRound, result, winnerId);
                if (currentRound < totalRounds)
                    this.#roundEndEmitter(winnerMove, winnerId, result);
                if (currentRound === totalRounds)
                    this.#gameEndEmitter(winnerMove);
            }
        }
    };

    #nextPlayerEmitter() {
        this.#turns.nextTurn();
        const currentPlayer = this.#players.getPlayerById(
            this.#turns.getCurrentPlayerId()
        );
        this.nextPlayerEvent.trigger({ currentPlayer });
    }

    #roundEndEmitter(winnerMove, winnerId, result) {
        this.roundEndEvent.trigger({
            currentRound: this.#rounds.getCurrentRound(),
            winnerMove,
            winnerId,
            result,
            players: this.#players.getAllPlayers(),
        });
    }

    #gameEndEmitter(winnerMove) {
        const { totalWins, totalDraws, winnerId, result } =
            this.#results.getTotal();
        this.gameEndEvent.trigger({
            currentRound: this.#rounds.getCurrentRound(),
            winnerMove,
            totalWins,
            totalDraws,
            result,
            winnerId,
            players: this.#players.getAllPlayers(),
        });
    }

    setGame(settings) {
        let { type, totalRounds, difficultyLevel, players, avatarSources } =
            Object(settings);
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

        if (this.#validTypeList.includes(type)) this.#type.setType(type);
        this.#rounds.setTotalRounds(totalRounds);
        if (this.#validDifficultyLevelList.includes(difficultyLevel))
            this.#difficulty.setLevel(difficultyLevel);
        for (const settings of Object.values(players))
            if (isValidPlayerSettings(settings)) this.#setPlayer(settings);
        for (const [id, url] of Object.entries(avatarSources))
            this.#players.setAvatarSource({ id, url });
    }

    dropToken = (cellId) => {
        if (!this.#isGameSet()) return;
        const targetCell = this.#board.getCell(cellId);
        const currentPlayer = this.#players.getPlayerById(
            this.#turns.getCurrentPlayerId()
        );
        let type;

        if (targetCell.id === undefined) return;

        if (this.#board.isCellEmpty(cellId)) {
            this.#board.setCell(cellId, currentPlayer.token);
            type = "valid";
        } else {
            type = "invalid";
        }

        this.moveEvent.trigger({ type, targetCell, player: currentPlayer });
    };

    nextRound() {
        if (!this.#isGameSet()) return;
        this.#rounds.next();
        this.initRound();
    }

    initRound() {
        if (!this.#isGameSet()) return;
        this.#board.reset();
        this.#turns.resetQueue();
        this.#nextPlayerEmitter();
    }

    restart() {
        this.#rounds.resetCurrentRound();
        this.#results.reset();
        this.initRound();
    }

    reset() {
        this.#players.reset();
        this.#ai.disconnect();
        this.#board.reset();
        this.#results.reset();
        this.#rounds.reset();
        this.#turns.reset();
        this.#type.reset();
        this.#difficulty.reset();
    }

    getNamePattern() {
        return this.#validPlayerSettings.namePattern;
    }

    start() {
        if (!this.#isGameSet()) return;
        if (this.#type.getType() === "PVSCPU") {
            this.#ai.init({
                player: this.#players.getCPUPlayer(),
                difficultyLevel: this.#difficulty.getLevel(),
                cellGroupGetter: this.#board.getAllGroups,
                triggerEvent: this.nextPlayerEvent,
                dropToken: this.dropToken,
            });
        }
        this.#turns.setPlayersIdList(this.#players.getPlayersIdList());
        this.initRound();
    }

    #isGameSet() {
        switch (true) {
            case this.#type.getType() === undefined:
            case this.#rounds.getTotalRounds() === undefined:
            case this.#difficulty.getLevel() === undefined:
            case this.#players.getPlayersIdList().length < 2:
                return false;
        }
        return true;
    }

    #setPlayer({ id, name, role, tokenId, order }) {
        const token = this.#validPlayerSettings.tokens[tokenId];
        this.#players.setPlayer({ id, name, role, token, order });
    }

    get moveEvent() {
        return this.#moveEvent;
    }

    get nextPlayerEvent() {
        return this.#nextPlayerEvent;
    }

    get roundEndEvent() {
        return this.#roundEndEvent;
    }

    get gameEndEvent() {
        return this.#gameEndEvent;
    }

    get board() {
        return {
            print: () => this.#board.print(),
            getAllGroups: () => this.#board.getAllGroups(),
        };
    }

    get players() {
        return { getAllPlayers: () => this.#players.getAllPlayers() };
    }

    get difficulty() {
        return { getLevel: () => this.#difficulty.getLevel() };
    }

    get results() {
        return {
            getAllRecords: () => this.#results.getAllRecords(),
            getTotal: () => this.#results.getTotal(),
        };
    }

    get rounds() {
        return {
            getTotalRounds: () => this.#rounds.getTotalRounds(),
            getCurrentRound: () => this.#rounds.getCurrentRound(),
        };
    }

    get turns() {
        return {
            getCurrentTurn: () => this.#turns.getCurrentTurn(),
            getCurrentPlayerId: () => this.#turns.getCurrentPlayerId(),
        };
    }

    get type() {
        return { getType: () => this.#type.getType() };
    }

    get ai() {
        return { printChoiceIndex: () => this.#ai.printChoiceIndex() };
    }
}
