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

    return {
        setPlayer,
        start,
        setGameType,
        setDifficultyLevel,
    };
})();
