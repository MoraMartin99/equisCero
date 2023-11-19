const game = (() => {
    const _type = (() => {
        let _gameType;
        const _validTypeList = ["PVSP", "PVSCPU"];

        const reset = () => {
            _gameType = null;
        };

        const isValidType = (type) => {
            return _validTypeList.includes(type);
        };

        const setType = (type) => {
            if (!isValidType(type)) return;
            _gameType = type;
        };

        const getType = () => {
            return _gameType;
        };

        return { reset, isValidType, setType, getType };
    })();
    const _rounds = (() => {
        let _totalRounds;
        let _currentRound;

        const getCurrentRound = () => {
            return _currentRound;
        };

        const getTotalRounds = () => {
            return _totalRounds;
        };

        const setTotalRounds = (totalRounds) => {
            _totalRounds = totalRounds;
        };

        const next = () => {
            if (_currentRound < _totalRounds) {
                _currentRound++;
            }
        };

        const reset = () => {
            setTotalRounds(null);
            _currentRound = 1;
        };

        return { reset, getCurrentRound, setTotalRounds, getTotalRounds, next };
    })();
    let _players = [];
    let _turns;
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

    const setDifficultyLevel = (level = null) => {
        _difficultyLevel = level;
    };

    const _setTurns = () => {
        _turns = ((playerArr) => {
            let _queue = [playerArr[0]];
            const getCurrentPlayer = () => {
                return _queue[_queue.length - 1];
            };
            const next = () => {
                const currentPlayerIndex = playerArr.findIndex((player) => {
                    return player.getId() == getCurrentPlayer().getId();
                });
                const nextPlayerIndex = currentPlayerIndex == 0 ? 1 : 0;

                _queue.push(playerArr[nextPlayerIndex]);
            };

            return { getCurrentPlayer, next };
        })(_players);
    };

    const _setResults = () => {
        _results = ((totalRounds) => {
            const _records = {};
            const setRecord = (recordId, type = null, winnerId = null) => {
                _records[recordId] = { type, winnerId };
            };
            const _setTotalRecord = ({
                type = null,
                winnerId = null,
                player1TotalWins = null,
                player2TotalWins = null,
                totalDraws = null,
            } = {}) => {
                const recordId = "total";

                _records[recordId] = { type, winnerId, player1TotalWins, player2TotalWins, totalDraws };
            };
            const getRecord = (recordId) => {
                return { ..._records[recordId] };
            };
            const getTotal = () => {
                const recordId = "total";

                return getRecord(recordId);
            };
            let _recordId;

            for (let currentRound = 1; currentRound <= totalRounds; currentRound++) {
                _recordId = `round${currentRound}`;
                setRecord(_recordId);

                if (currentRound == totalRounds) {
                    _setTotalRecord();
                }
            }

            return { setRecord, getRecord, getTotal };
        })();
    };

    const _setBoard = () => {
        _board = (() => {
            const _cells = {};

            const reset = () => {
                const rowsIdArr = [1, 2, 3];
                const columnsIdArr = ["a", "b", "c"];

                columnsIdArr.forEach((columnId) => {
                    rowsIdArr.forEach((rowId) => {
                        _cells[`${columnId}${rowId}`] = { value: null, columnId, rowId };
                    });
                });
            };

            const _isEmpty = (cellId) => {
                return Object.is(getCell(cellId).value, null);
            };

            const getCell = (cellId) => {
                return { ..._cells[cellId] };
            };

            const setCell = (cellId, token) => {
                const cell = _cells[cellId];
                if (_isEmpty(cellId)) {
                    cell.value = token;
                } else {
                    //throw error o algo asi, llamar al modulo encargado de la animación
                }
            };

            reset();

            return { getCell, setCell, reset };
        })();
    };

    const _setNewGame = (initialConditions) => {
        _setTurns();
        _setResults();
        _setBoard();
    };

    const start = () => {};

    return {
        setPlayer,
        start,
        setGameType,
        setDifficultyLevel,
    };
})();

// este modulo sera el encargado de traer datos externos como las src de las imágenes de los avatares
const externalResource = (() => {})();
