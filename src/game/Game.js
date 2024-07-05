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
    board = new Board();
    players = new Players(this.#namePattern);
    difficulty = new Difficulty();
    results = new Results();
    rounds = new Rounds();
    turns = new Turns();
    type = new Type();
    ai = new AI();

    setNamePattern(namePattern) {
        this.#namePattern = namePattern;
    }

    getNamePattern() {
        return this.#namePattern;
    }
}
