export default class Controller {
    #model;
    #view;
    #avatarProvider;

    constructor(model, view, avatarProvider) {
        this.#model = Object(model);
        this.#view = Object(view);
        this.#avatarProvider = Object(avatarProvider);

        this.#view.setPlayerNamePattern(this.#model.getNamePattern());
        this.#avatarProvider.responseEvent.subscribe(this.#avatarGetterHandler);
        this.#view.submitEvent.subscribe(this.#submitEventHandler);
        this.#view.navigationEvent.subscribe(this.#navigationEventHandler);
        this.#model.gameStartEvent.subscribe(this.#gameStartEventHandler);
        this.#model.roundStartEvent.subscribe(this.#roundStartEventHandler);
        this.#model.nextPlayerEvent.subscribe(this.#nextPlayerEventHandler, true);
        this.#view.interactionEvent.subscribe(this.#interactionEventHandler);
        this.#model.moveEvent.subscribe(this.#moveEventHandler, true);
        this.#model.roundEndEvent.subscribe(this.#roundEndEventHandler);
        this.#model.gameEndEvent.subscribe(this.#gameEndEventHandler);

        this.#requestAvatars();
    }

    #getQueryString(type) {
        const avatarStyles = { player: "notionists-neutral", cpu: "bottts-neutral" };
        const seed = `seed=${self.crypto.randomUUID()}`;
        if (type) type = String(type).toLowerCase();
        const getRandomHexColor = () => {
            const [l, s] = [0.85, 100];
            const h = Math.round(Math.random() * 360);
            const a = (s * Math.min(l, 1 - l)) / 100;
            const f = (n) => {
                const k = (n + h / 30) % 12;
                const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
                return Math.round(255 * color)
                    .toString(16)
                    .padStart(2, "0");
            };
            return `${f(0)}${f(8)}${f(4)}`;
        };

        let queryString = `${avatarStyles[type]}/svg?${seed}`;

        if (type === "player") {
            const colorCount = Math.max(3, Math.round(Math.random() * 5));
            const colorList = [];

            do {
                const item = getRandomHexColor();
                if (!colorList.includes(item)) colorList.push(item);
            } while (colorList.length < colorCount);

            queryString = `${queryString}&backgroundType=gradientLinear&backgroundColor=${colorList.toString()}`;
        }

        return queryString;
    }

    #requestAvatars() {
        const requestList = [
            { id: "player1", type: "player", fallbackPath: "../img/avatar1.svg" },
            { id: "player2", type: "player", fallbackPath: "../img/avatar2.svg" },
            { id: "CPU", type: "cpu", fallbackPath: "../img/avatar3.svg" },
        ];

        requestList.forEach(({ id, type, fallbackPath }) => {
            this.#avatarProvider.getAvatar(id, this.#getQueryString(type), fallbackPath);
        });
    }

    #avatarGetterHandler = ({ resource: { url, id } }) => {
        this.#view.setAvatarSource(url, id);
        this.#model.setGame({ avatarSources: { [id]: url } });
    };

    #homeMenuHandler = ({ gameTypeRadio: { totalRounds, type } }) => this.#model.setGame({ type, totalRounds });

    #playerNameMenuHandler(senderId, { playerName: name }) {
        const type = this.#model.type.getType();
        const playerIdList = ["player1", "player2"];
        const tokenIdList = ["token1", "token2"];
        const roleList = ["user", "CPU", undefined];
        let player1TokenId = tokenIdList[0];
        let player2TokenId = tokenIdList[1];
        const setPlayer = (id, name, role, tokenId) => {
            name = name ? name : String(role).toUpperCase() === "CPU" ? role : id;
            const order = tokenId === "token1" ? 1 : 2;
            this.#model.setGame({ players: { id: { id, name, role, tokenId, order } } });
        };

        if (senderId === "player1NameMenu") {
            if (type === "PVSCPU") {
                player1TokenId = tokenIdList[Math.round(Math.random() * (tokenIdList.length - 1))];
                player2TokenId = tokenIdList.find((tokenId) => tokenId !== player1TokenId);
                setPlayer(playerIdList[0], name, roleList[0], player1TokenId);
                setPlayer(playerIdList[1], undefined, roleList[1], player2TokenId);
            }

            if (type === "PVSP") setPlayer(playerIdList[0], name, roleList[2], player1TokenId);
        }

        if (senderId === "player2NameMenu") setPlayer(playerIdList[1], name, roleList[2], player2TokenId);
    }

    #difficultyMenuHandler = ({ difficultyRadio: difficultyLevel }) => this.#model.setGame({ difficultyLevel });

    #submitEventHandler = ({ senderId, fields }) => {
        if (senderId === "homeMenu") this.#homeMenuHandler(fields);
        if (senderId === "player1NameMenu" || senderId === "player2NameMenu") {
            this.#playerNameMenuHandler(senderId, fields);
        }
        if (senderId === "difficultyMenu") this.#difficultyMenuHandler(fields);
    };

    #navigationEventHandler = ({
        status,
        targetScreen: { id: targetScreenId },
        currentScreen: { id: currentScreenId },
        type,
    }) => {
        const playersList = Object.values(this.#model.players.getAllPlayers()).map(
            ({ name, id, avatarSource, order }) => {
                return { name, id, avatarSource, slot: order };
            }
        );
        const totalRounds = this.#model.rounds.getTotalRounds();
        const player2NameScreenId = "player2NameScreen";
        const difficultyScreenId = "difficultyScreen";
        const gameType = this.#model.type.getType();

        if (status === "start" && targetScreenId === "gameScreen") this.#view.setGame(totalRounds, playersList);
        if (status === "end" && targetScreenId === "gameScreen") this.#model.start();
        if (status === "end" && currentScreenId === "homeScreen" && gameType === "PVSCPU") {
            this.#view.disableScreenNavigation(player2NameScreenId);
        }
        if (status === "end" && currentScreenId === "homeScreen" && gameType === "PVSP") {
            this.#view.disableScreenNavigation(difficultyScreenId);
        }
        if (type !== "goTo" && targetScreenId === "homeScreen" && status === "end") {
            [player2NameScreenId, difficultyScreenId].forEach((item) => this.#view.enableScreenNavigation(item));
        }
    };

    #gameStartEventHandler = () => this.#view.restartRoundIndicatorContainer();

    #roundStartEventHandler = ({ currentRound: round }) => this.#view.initRound(round);

    #nextPlayerEventHandler = ({ currentPlayer: { id, role, tokenId } }) => {
        const cellSelectionIsEnable = role === "CPU" ? false : true;
        this.#view.switchCurrentPlayer(id, tokenId, cellSelectionIsEnable);
    };

    #selectCellHandler = (cellId) => {
        this.#model.dropToken(cellId);
    };

    #nextRoundHandler = () => this.#model.nextRound();

    #restartRoundHandler = () => this.#model.initRound();

    #restartGameHandler = () => this.#model.restart();

    #goHomeHandler = () => {
        this.#model.reset();
        this.#requestAvatars();
    };

    #interactionEventHandler = ({ type, cellId }) => {
        if (type === "selectCell") this.#selectCellHandler(String(cellId).toUpperCase());
        if (type === "nextRound") this.#nextRoundHandler();
        if (type === "restartRound") this.#restartRoundHandler();
        if (type === "restartGame") this.#restartGameHandler();
        if (type === "goHome") this.#goHomeHandler();
    };

    #moveEventHandler = ({ type, targetCell: { id: cellId }, player: { tokenId } }) => {
        cellId = String(cellId).toUpperCase();
        if (type === "invalid") this.#view.setInvalidCell(cellId);
        if (type === "valid") this.#view.dropToken(cellId, tokenId);
    };

    #roundEndEventHandler = (data) => this.#view.endRound(data);

    #gameEndEventHandler = (data) => this.#view.endGame(data);
}
