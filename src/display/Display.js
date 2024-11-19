import CustomizedEvent from "../CustomizedEvent.js";
import Carrousel from "./Carrousel.js";
import Screen from "./Screen.js";
import State from "./State.js";
import AnimationEndObserver from "./AnimationEndObserver.js";
import AnimationIterationObserver from "./AnimationIterationObserver.js";
import TransitionEndObserver from "./TransitionEndObserver.js";
import SessionForm from "./SessionForm.js";
import AvatarImage from "./AvatarImage.js";
import AvatarManager from "./AvatarManager.js";
import PlayerNameInput from "./PlayerNameInput.js";
import Board from "./Board.js";
import Cell from "./Cell.js";
import createToken from "./createToken.js";
import OverlayMenu from "./OverlayMenu.js";
import PauseMenu from "./PauseMenu.js";
import ConfirmationMenu from "./ConfirmationMenu.js";
import WinnerAvatarDisplayElementFactory from "./WinnerAvatarDisplayElementFactory.js";
import AvatarImageElementFactory from "./AvatarImageElementFactory.js";
import createResultButton from "./createResultButton.js";
import ResultMenu from "./ResultMenu.js";
import createMessageElement from "./createMessageElement.js";
import PlayerCardContainer from "./PlayerCardContainer.js";
import PlayersContainer from "./PlayersContainer.js";
import RoundIndicatorContainer from "./RoundIndicatorContainer.js";
import RoundIndicator from "./RoundIndicator.js";
import createRoundIndicatorElement from "./createRoundIndicatorElement.js";
import PromiseQueue from "./PromiseQueue.js";

export default class Display {
    #navigationEvent;
    #interactionEvent;
    #submitEvent;
    #carrousel;
    #homeSessionForm;
    #player1NameSessionForm;
    #player2NameSessionForm;
    #difficultySessionForm;
    #board;
    #stateQueue;
    #confirmationMenu;
    #pauseMenu;
    #resultMenu;
    #playersContainer;
    #roundIndicatorContainer;
    #winnerAvatarDisplayElementFactory;
    #avatarPlaceHolderSrc;

    constructor(settings) {
        const { playerNamePattern } = Object(settings);

        this.#avatarPlaceHolderSrc = "../../img/avatarPlaceholder.svg";
        this.#stateQueue = new PromiseQueue();
        this.#navigationEvent = new CustomizedEvent("navigationEvent");
        this.#interactionEvent = new CustomizedEvent("interactionEvent");
        this.#submitEvent = new CustomizedEvent("submitEvent");

        const carrouselSettings = {
            element: document.querySelector("#carrousel"),
            screenList: Array.from(document.querySelectorAll("#carrousel > .screen")).map(
                (element) =>
                    new Screen({
                        element,
                        disableClass: "disable",
                        activeClass: "active",
                    })
            ),
            initialScreenId: "homeScreen",
            event: this.#navigationEvent,
            states: {
                slideLeftToCenterState: new State(
                    {
                        classList: ["slideLeftToCenter"],
                        animationName: "slideLeftToCenter",
                    },
                    new AnimationEndObserver()
                ),
                slideCenterToRightState: new State(
                    {
                        classList: ["slideCenterToRight"],
                        animationName: "slideCenterToRight",
                    },
                    new AnimationEndObserver()
                ),
                slideRightToCenterState: new State(
                    {
                        classList: ["slideRightToCenter"],
                        animationName: "slideRightToCenter",
                    },
                    new AnimationEndObserver()
                ),
                slideCenterToLeftState: new State(
                    {
                        classList: ["slideCenterToLeft"],
                        animationName: "slideCenterToLeft",
                    },
                    new AnimationEndObserver()
                ),
            },
        };

        this.#carrousel = Object(new Carrousel(carrouselSettings));

        const createSFSettings = (data) => {
            return {
                event: this.#submitEvent,
                nextScreenCallback: this.#carrousel.nextScreen,
                previousScreenCallback: this.#carrousel.previousScreen,
                ...data,
            };
        };

        const hsfSettings = createSFSettings({
            element: document.querySelector("#homeMenu"),
            fieldsExtractorCallback: (element) => {
                const fields = Object.fromEntries(new FormData(element));
                const id = Object.keys(fields)[0];
                const type = String(Array.of(fields[id]?.match(/(?<= )[a-zA-Z]+$/)).flat()[0]);
                const totalRounds = Number(Array.of(fields[id]?.match(/^\d(?= )/)).flat()[0]);

                return { [id]: { type, totalRounds } };
            },
            nextScreenTriggerList: Array.from(document.querySelectorAll("#homeMenu .unstyledRadio")),
            avatarManager: new AvatarManager(
                Array.from(document.querySelectorAll("#homeMenu .avatarImage")).map(
                    (item) => new AvatarImage(item, this.#avatarPlaceHolderSrc)
                )
            ),
        });

        const pnsfExtractorCallback = (element) => {
            const fields = Object.fromEntries(new FormData(element));
            const { playerName } = fields;

            return { playerName };
        };

        const pn1sfSettings = createSFSettings({
            element: document.querySelector("#player1NameMenu"),
            fieldsExtractorCallback: pnsfExtractorCallback,
            previousScreenTriggerList: Array.from(
                document.querySelectorAll("#player1NameMenu .navigationButton.previous")
            ),
            nextScreenTriggerList: Array.from(document.querySelectorAll("#player1NameMenu .navigationButton.next")),
            playerNameInputList: Array.from(document.querySelectorAll("#player1NameMenu .playerNameInput")).map(
                (item) => new PlayerNameInput(item, "activeTextInput")
            ),
            avatarManager: new AvatarManager([
                new AvatarImage(document.querySelector("#player1NameMenu .avatarImage", this.#avatarPlaceHolderSrc)),
            ]),
        });

        const pn2sfSettings = createSFSettings({
            element: document.querySelector("#player2NameMenu"),
            fieldsExtractorCallback: pnsfExtractorCallback,
            previousScreenTriggerList: Array.from(
                document.querySelectorAll("#player2NameMenu .navigationButton.previous")
            ),
            nextScreenTriggerList: Array.from(document.querySelectorAll("#player2NameMenu .navigationButton.next")),
            playerNameInputList: Array.from(document.querySelectorAll("#player2NameMenu .playerNameInput")).map(
                (item) => new PlayerNameInput(item, "activeTextInput")
            ),
            avatarManager: new AvatarManager([
                new AvatarImage(document.querySelector("#player2NameMenu .avatarImage"), this.#avatarPlaceHolderSrc),
            ]),
        });

        const dsfSettings = createSFSettings({
            element: document.querySelector("#difficultyMenu"),
            fieldsExtractorCallback: (element) => {
                const fields = Object.fromEntries(new FormData(element));
                const { difficultyRadio } = fields;

                return { difficultyRadio };
            },
            previousScreenTriggerList: Array.from(
                document.querySelectorAll("#difficultyMenu .navigationButton.previous")
            ),
            nextScreenTriggerList: Array.from(document.querySelectorAll("#difficultyMenu .navigationButton.next")),
        });

        const createCell = (element) => {
            const invalidMoveState = new State(
                {
                    classList: ["invalidMove"],
                    animationName: "nopeRotation",
                    iterationCount: 2,
                },
                new AnimationIterationObserver()
            );

            const vanishState = new State(
                {
                    classList: ["vanish"],
                    propertyNameList: ["opacity", "opacity"],
                },
                new TransitionEndObserver()
            );

            const smoothPopOutState = new State(
                { classList: ["smoothPopOut"], animationName: "smoothPopOut" },
                new AnimationEndObserver()
            );

            return new Cell({
                element,
                invalidMoveState,
                vanishState,
                smoothPopOutState,
                stateQueue: this.#stateQueue,
            });
        };

        const boardSettings = {
            element: document.querySelector("#board"),
            playingClass: "playing",
            event: this.#interactionEvent,
            stateQueue: this.#stateQueue,
            cellList: Array.from(document.querySelectorAll("#board .cell")).map((item) => createCell(item)),
            eventData: { type: "selectCell" },
        };

        const createOverlayMenu = (element) =>
            new OverlayMenu({
                element,
                showClass: "show",
                event: this.#interactionEvent,
            });

        const CMSettings = {
            overlayMenu: createOverlayMenu(document.querySelector("#confirmationOverlayMenu")),
            cancelElement: document.querySelector("#cancelButton"),
            confirmationElement: document.querySelector("#acceptButton"),
            titleElement: document.querySelector("#confirmationOverlayMenu .menuTitle"),
        };

        this.#confirmationMenu = new ConfirmationMenu(CMSettings);

        const PMSettings = {
            overlayMenu: createOverlayMenu(document.querySelector("#pauseOverlayMenu")),
            confirmationMenu: this.#confirmationMenu,
            options: {
                goHome: {
                    element: document.querySelector("#pauseOverlayMenu .goHomeButton"),
                    callback: this.reset,
                    title: "¿Ir al home?",
                },
                restartGame: {
                    element: document.querySelector("#pauseOverlayMenu .restartGameButton"),
                    callback: this.#restartGame,
                    title: "¿Reiniciar juego?",
                },
                restartRound: {
                    element: document.querySelector("#pauseOverlayMenu .restartRoundButton"),
                    callback: this.#restartRound,
                    title: "¿Reiniciar round?",
                },
            },
            hideTriggerElementList: [document.querySelector("#playButton")],
        };

        const RMSettings = {
            overlayMenu: createOverlayMenu(document.querySelector("#resultOverlayMenu")),
            optionsContainerElement: document.querySelector("#resultOverlayMenu .resultButtonContainer"),
            avatarDisplayContainerElement: document.querySelector("#winnerAvatarContainer"),
            messageContainerElement: document.querySelector("#resultMessageContainer"),
        };

        const createPlayersContainer = () => {
            const slot1CardElement = document.querySelector(".playerCardContainer.left");
            const slot2CardElement = document.querySelector(".playerCardContainer.right");

            const slot1Card = new PlayerCardContainer({
                element: slot1CardElement,
                avatarImage: new AvatarImage(
                    slot1CardElement.querySelector(".avatarImage"),
                    this.#avatarPlaceHolderSrc
                ),
                playerNameElement: slot1CardElement.querySelector(".playerName"),
            });

            const slot2Card = new PlayerCardContainer({
                element: slot2CardElement,
                avatarImage: new AvatarImage(
                    slot2CardElement.querySelector(".avatarImage"),
                    this.#avatarPlaceHolderSrc
                ),
                playerNameElement: slot2CardElement.querySelector(".playerName"),
            });

            const highlightState = new State(
                {
                    classList: ["currentPlayer"],
                    animationName: "highlightCurrentPlayer",
                },
                new AnimationEndObserver()
            );

            return new PlayersContainer({
                playerCardContainerList: [slot1Card, slot2Card],
                highlightState,
            });
        };

        const AIEFSettings = {
            baseClassList: ["skeleton", "winnerAvatar"],
            baseAttributeList: [{ name: "alt", value: "ganador" }],
        };

        const pauseButtonElementList = document.querySelectorAll(".pauseButton");

        this.#homeSessionForm = new SessionForm(hsfSettings);
        this.#player1NameSessionForm = new SessionForm(pn1sfSettings);
        this.#player2NameSessionForm = new SessionForm(pn2sfSettings);
        this.#difficultySessionForm = new SessionForm(dsfSettings);
        this.#board = new Board(boardSettings);

        this.#pauseMenu = new PauseMenu(PMSettings);
        this.#resultMenu = new ResultMenu(RMSettings);
        this.#playersContainer = createPlayersContainer();
        this.#roundIndicatorContainer = new RoundIndicatorContainer(document.querySelector("#roundIndicatorContainer"));
        this.#winnerAvatarDisplayElementFactory = new WinnerAvatarDisplayElementFactory(
            new AvatarImageElementFactory(AIEFSettings)
        );

        if (playerNamePattern) this.setPlayerNamePattern(playerNamePattern);
        pauseButtonElementList.forEach((item) => item.addEventListener("click", (e) => this.#pauseMenu.show()));
    }

    get navigationEvent() {
        return this.#navigationEvent;
    }

    get interactionEvent() {
        return this.#interactionEvent;
    }

    get submitEvent() {
        return this.#submitEvent;
    }

    setPlayerNamePattern(pattern) {
        [this.#player1NameSessionForm, this.#player2NameSessionForm].forEach((item) =>
            item.setPlayerNamePattern?.(pattern)
        );
    }

    reset = () => {
        const list = [
            this.#homeSessionForm,
            this.#player1NameSessionForm,
            this.#player2NameSessionForm,
            this.#difficultySessionForm,
            this.#board,
            ...[this.#pauseMenu, this.#resultMenu].map((item) => this.#getOverlayMenuResetAdapter(item)),
            this.#playersContainer,
            this.#roundIndicatorContainer,
            this.#carrousel,
        ];

        list.forEach((item) => Object(item).reset());
        this.#interactionEvent.trigger({ type: "goHome" });
    };

    setAvatarSource(source, id) {
        const list = [
            this.#homeSessionForm,
            this.#player1NameSessionForm,
            this.#player2NameSessionForm,
            this.#difficultySessionForm,
        ];

        list.forEach((item) => item.setAvatarSources?.(source, id));
    }

    setGame(totalRounds, playersList) {
        const roundIndicatorList = [];
        playersList = Object(playersList);

        if (Number.isInteger(totalRounds)) {
            this.#roundIndicatorContainer.reset();
            for (let round = 1; round <= totalRounds; round++) {
                roundIndicatorList.push(new RoundIndicator(createRoundIndicatorElement(round), round));
            }
            roundIndicatorList.forEach((item) => this.#roundIndicatorContainer.addIndicator(item));
        }

        playersList.forEach?.(({ name, id, avatarSource: source, slot }) => {
            this.#playersContainer.setCard(slot, { name, id, source });
        });
    }

    restartRoundIndicatorContainer() {
        this.#roundIndicatorContainer.restart();
    }

    #setIndicatorState(round, stateId) {
        const states = {
            current: new State(
                { classList: ["current"], animationName: "currentRoundIndicator" },
                new AnimationEndObserver()
            ),
            player1: new State(
                { classList: ["player1"], animationName: "player1RoundIndicator" },
                new AnimationEndObserver()
            ),
            player2: new State(
                { classList: ["player2"], animationName: "player2RoundIndicator" },
                new AnimationEndObserver()
            ),
            draw: new State({ classList: ["draw"], animationName: "drawRoundIndicator" }, new AnimationEndObserver()),
        };

        this.#roundIndicatorContainer.setIndicatorState(round, states[stateId]);
    }

    initRound(round) {
        this.#board.reset();
        this.#setIndicatorState(round, "current");
        this.#playersContainer.restart();
    }

    switchCurrentPlayer(playerId, cellSelectionIsEnable = true) {
        const playerStates = {
            player1: new State(
                { classList: ["player1"], animationName: "boardBackgroundColorToPlayer1Color" },
                new AnimationEndObserver()
            ),
            player2: new State(
                { classList: ["player2"], animationName: "boardBackgroundColorToPlayer2Color" },
                new AnimationEndObserver()
            ),
        };

        const callback = () => {
            const playersPromise = this.#playersContainer.highlightCard(playerId);
            const boardPromise = this.#board.setState(playerStates[playerId]);
            const promiseList = Promise.allSettled([playersPromise, boardPromise]);
            if (cellSelectionIsEnable) promiseList.then(() => this.#board.enableCellSelection());
            return promiseList;
        };

        this.#stateQueue.add(callback);
    }

    setInvalidCell(cellId) {
        return Promise.resolve(this.#board.setInvalidCell(cellId));
    }

    dropToken(cellId, playerId) {
        this.#board.disableCellSelection();
        const callback = () => this.#board.dropToken(cellId, createToken(playerId));
        return this.#stateQueue.add(callback);
    }

    #animateResult({ currentRound, winnerMove, winnerId, result }) {
        const stateId = result === "draw" ? "draw" : winnerId;
        const promise = result === "draw" ? this.#animateDraw() : this.#animateWinnerMove(winnerMove, winnerId);

        this.#setIndicatorState(currentRound, stateId);
        return promise;
    }

    endRound({ currentRound, winnerMove, winnerId, result, players }) {
        const promise = this.#animateResult({ currentRound, winnerMove, winnerId, result });

        this.#setResultMenu("roundEnd", { round: currentRound, winnerId, result, players });
        promise.finally(() => this.#resultMenu.show());
    }

    endGame({ roundResult, gameResult }) {
        const promise = this.#animateResult(roundResult);

        this.#setResultMenu("gameEnd", gameResult);
        promise.finally(() => this.#resultMenu.show());
    }

    disableScreenNavigation(screenId) {
        this.#carrousel.disableScreen(screenId);
    }

    enableScreenNavigation(screenId) {
        this.#carrousel.enableScreen(screenId);
    }

    #getOverlayMenuResetAdapter = (overLayMenu) => {
        return { reset: () => Object(overLayMenu).hide() };
    };

    #nextRound = () => this.interactionEvent.trigger({ type: "nextRound" });

    #restartRound = () => this.interactionEvent.trigger({ type: "restartRound" });

    #restartGame = () => this.interactionEvent.trigger({ type: "restartGame" });

    #animateDraw() {
        const state = new State(
            { classList: ["draw"], animationName: "boardBackgroundColorToDrawColor" },
            new AnimationEndObserver()
        );

        return this.#stateQueue.add?.(() => this.#board.setState(state));
    }

    #animateWinnerMove(move, playerId) {
        const cellStates = {
            player1: new State(
                { classList: ["player1"], propertyNameList: ["background-color"] },
                new TransitionEndObserver()
            ),
            player2: new State(
                { classList: ["player2"], propertyNameList: ["background-color"] },
                new TransitionEndObserver()
            ),
        };

        const promiseList = Object.values(Object(move))
            .sort(({ id: a }, { id: b }) => String(a).localeCompare(String(b)))
            .map(({ id }) => this.#stateQueue.add(() => this.#board.setCellState(id, cellStates[playerId])));

        return Promise.allSettled(promiseList);
    }

    #setResultMenu(type, settings) {
        const { round, winnerId, result, players } = Object(settings);
        const optionList = [];
        let avatarDisplayElement;
        let messageElement;
        const classList = [];

        if (type === "roundEnd") {
            optionList.push({ element: createResultButton("nextRound"), callback: this.#nextRound });
        }

        if (type === "gameEnd") {
            optionList.push(
                { element: createResultButton("restartGame"), callback: this.#restartGame },
                { element: createResultButton("goHome"), callback: this.reset }
            );
            classList.push("gameResult");
        }

        if (result === "draw") {
            avatarDisplayElement = this.#winnerAvatarDisplayElementFactory.create("mask", {
                sources: { left: players["player1"].avatarSource, right: players["player2"].avatarSource },
            });
            messageElement = createMessageElement("draw");
            classList.push("draw");
        }

        if (result === "win") {
            avatarDisplayElement = this.#winnerAvatarDisplayElementFactory.create("image", {
                source: players[winnerId].avatarSource,
            });
            classList.push(winnerId);
        }

        if (result === "win" && type === "roundEnd") {
            messageElement = createMessageElement("roundWin", {
                playerName: players[winnerId].name,
                round: round,
            });
        }

        if (result === "win" && type === "gameEnd") {
            messageElement = createMessageElement("gameWin", { playerName: players[winnerId].name });
        }

        this.#resultMenu.set({ optionList, avatarDisplayElement, messageElement, classList });
    }
}
