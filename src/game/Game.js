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
    moveEvent = new CustomizedEvent();
    nextPlayerEvent = new CustomizedEvent();
    roundEndEvent = new CustomizedEvent();
    gameEndEvent = new CustomizedEvent();
    #namePattern;
    #board = new Board();
    #players = new Players(this.#namePattern);
    #difficulty = new Difficulty();
    #results = new Results();
    #rounds = new Rounds();
    #turns = new Turns();
    #type = new Type();
    #ai = new AI();

    constructor(namePattern) {
        this.#namePattern = namePattern;
    }

    getNamePattern() {
        return this.#namePattern;
    }

    getPlayerById(id) {
        return this.#players.getPlayerById(id);
    }

    getType() {
        return this.#type.getType();
    }

    getTotalRounds() {
        return this.#rounds.getTotalRounds();
    }

    init() {
        this.moveEvent.subscribe(this.#moveEventHandler);
        this.#board.init();
    }

    navigationEventHandler = (data) => {
        const { status, targetScreen } = Object(data);

        if (status !== "end" || targetScreen.id !== "gameScreen") return;
        if (this.#type.getType() === "PVSCPU") {
            this.#ai.init({
                player: this.#players.getCPUPlayer(),
                difficultyLevel: this.#difficulty.getLevel(),
                cellGroupGetter: this.#board.getAllGroups,
                triggerEvent: this.nextPlayerEvent,
                dropToken: this.#tryToDropToken,
            });
        }
        this.#turns.setPlayersIdList(this.#players.getPlayersIdList());
        this.#initRound();
    };

    interactionEventHandler = (data) => {
        const { type, cellId } = Object(data);

        if (type === "selectCell") this.#tryToDropToken(cellId);
        if (type === "nextRound") this.#nextRound();
        if (type === "restartRound") this.#initRound();
        if (type === "restartGame") this.#restart();
        if (type === "goHome") this.#reset();
    };

    sessionEventHandler = (data) => {
        const { changes } = Object(data);

        for (const [key, value] of Object.entries(changes)) {
            if (key === "type") this.#type.setType(value);
            if (key === "totalRounds") this.#rounds.setTotalRounds(value);
            if (key === "difficultyLevel") this.#difficulty.setLevel(value);
            if (key === "players") for (const settings of Object.values(value)) this.#players.setPlayer(settings);
        }
    };

    responseEventHandler = (data) => {
        const { resource } = Object(data);
        this.#players.setAvatarSource(resource);
    };

    #reset() {
        this.#players.reset();
        this.#ai.disconnect();
        this.#board.reset();
        this.#results.reset();
        this.#rounds.reset();
        this.#turns.reset();
        this.#type.reset();
        this.#difficulty.reset();
    }

    #restart() {
        this.#rounds.resetCurrentRound();
        this.#results.reset();
        this.#initRound();
    }

    #nextPlayerEmitter() {
        this.#turns.nextTurn();
        const currentPlayer = this.#players.getPlayerById(this.#turns.getCurrentPlayerId());
        this.nextPlayerEvent.trigger({ eventName: "nextPlayerEvent", currentPlayer });
    }

    #roundEndEmitter(winnerMove, winnerId, result) {
        this.roundEndEvent.trigger({
            eventName: "roundEndEvent",
            currentRound: this.#rounds.getCurrentRound(),
            winnerMove,
            winnerId,
            result,
            players: this.#players.getAllPlayers(),
        });
    }

    #gameEndEmitter(winnerMove) {
        const { totalWins, totalDraws, winnerId, result } = this.#results.getTotal();
        this.gameEndEvent.trigger({
            eventName: "gameEndEvent",
            currentRound: this.#rounds.getCurrentRound(),
            winnerMove,
            totalWins,
            totalDraws,
            result,
            winnerId,
            players: this.#players.getAllPlayers(),
        });
    }

    #initRound() {
        this.#board.reset();
        this.#turns.resetQueue();
        this.#nextPlayerEmitter();
    }

    #nextRound() {
        this.#rounds.next();
        this.#initRound();
    }

    #tryToDropToken = (cellId) => {
        const targetCell = this.#board.getCell(cellId);
        const currentPlayer = this.#players.getPlayerById(this.#turns.getCurrentPlayerId());
        let type;

        if (targetCell.id === undefined) return;

        if (this.#board.isCellEmpty(cellId)) {
            this.#board.setCell(cellId, currentPlayer.token);
            type = "valid";
        } else {
            type = "invalid";
        }

        this.moveEvent.trigger({ eventName: "moveEvent", type, targetCell, player: currentPlayer });
    };

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
                if (currentRound < totalRounds) this.#roundEndEmitter(winnerMove, winnerId, result);
                if (currentRound === totalRounds) this.#gameEndEmitter(winnerMove);
            }
        }
    };
}
