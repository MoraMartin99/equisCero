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

    #submitEventHandler = ({ senderId, fields }) => {
        const playerIdList = ["player1", "player2"];
        const tokenList = [
            { tokenId: "token1", order: 1 },
            { tokenId: "token2", order: 2 },
        ];
        const roleList = ["user", "CPU", undefined];
        let player1TokenId = tokenList[0].tokenId;
        let player2TokenId = tokenList[1].tokenId;

        const setPlayer = (id, name, role, tokenId) => {
            name = name ? name : id;
            const order = tokenList.find(({ tokenId: target }) => tokenId === target).order;
            this.#model.setGame({ players: { id: { id, name, role, tokenId, order } } });
        };

        if (senderId === "homeMenu") {
            const { totalRounds, type } = fields.gameTypeRadio;
            this.#model.setGame({ type, totalRounds });
        }

        if (senderId === "player1NameMenu") {
            const name = fields.playerName;
            const type = this.#model.type.getType();

            if (type === "PVSCPU") {
                player1TokenId = tokenList[Math.round(Math.random() * (tokenList.length - 1))].tokenId;
                player2TokenId = tokenList.find(({ tokenId }) => tokenId !== player1TokenId).tokenId;
                setPlayer(playerIdList[0], name, roleList[0], player1TokenId);
                setPlayer(playerIdList[1], roleList[1], roleList[1], player2TokenId);
            }

            if (type === "PVSP") setPlayer(playerIdList[0], name, roleList[2], player1TokenId);
        }

        if (senderId === "player2NameMenu") {
            const name = fields.playerName;
            player2TokenId = tokenList[1].tokenId;
            setPlayer(playerIdList[1], name, roleList[2], player2TokenId);
        }

        if (senderId === "difficultyMenu") {
            const difficultyLevel = fields.difficultyRadio;
            this.#model.setGame({ difficultyLevel });
        }
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

        cellId = String(cellId).toLocaleUpperCase();
    #moveEventHandler = ({ type, targetCell: { id: cellId }, player: { tokenId } }) => {
        if (type === "invalid") this.#view.setInvalidCell(cellId);
        if (type === "valid") this.#view.dropToken(cellId, tokenId);
    };

    #roundEndEventHandler = (data) => this.#view.endRound(data);

    #gameEndEventHandler = (data) => this.#view.endGame(data);
}
