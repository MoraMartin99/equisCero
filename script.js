const game = (() => {
    let _players = [];
    let _turns;
    let _gameType; //type, totalRounds
    let _rounds;
    let _results;
    let _initialConditions;
    let _board;
    let _control;
    let _canvas;
    let _difficultyLevel;
    const _tokens = (() => {
        const _token = { token1: "x", token2: "0" };
        const getToken = (tokenId) => {
            return _token[tokenId];
        };
        return { getToken };
    })();

    const setPlayer = (name) => {
        const playerArr = _players;
        const createPlayer = (name) => {
            let _id, _token, _avatarImageURL;
            const _name = name;
            const getName = () => {
                return _name;
            };
            const getId = () => {
                return _id;
            };
            const getToken = () => {
                return _token;
            };
            const getAvatarImageURL = () => {
                return _avatarImageURL;
            };

            if (!playerArr.length) {
                _id = "player1";
                _token = _tokens.getToken("token1");
                _avatarImageURL; //aquí debe ocurrir alguna lógica que obtenga el recurso de externalResource
            } else {
                _id = "player2";
                _token = _tokens.getToken("token2");
                _avatarImageURL; //aquí debe ocurrir alguna lógica que obtenga el recurso de externalResource
            }

            return { getName, getId, getToken, getAvatarImageURL };
        };

        if (playerArr.length < 2) {
            playerArr.push(createPlayer(name));
        }
    };

    const setGameType = (type = null, totalRounds = null) => {
        _gameType = { type, totalRounds };
    };
    return {
        setPlayer,
        start,
        setGameType,
        setDifficultyLevel,
    };
})();
