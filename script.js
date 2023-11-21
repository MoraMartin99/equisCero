const game = (() => {
    const _type = (() => {
        let _gameType;

        const validTypes = (() => {
            const _typeList = ["PVSP", "PVSCPU"];
            const getList = () => {
                return [..._typeList];
            };
            return { getList };
        })();

        const reset = () => {
            setType(null);
        };

        const setType = (type) => {
            _gameType = type;
        };

        const getType = () => {
            return _gameType;
        };

        return { reset, setType, getType, validTypes };
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
    let _turns;
    let _results;
    let _initialConditions;
    let _board;
    let _control;
    let _canvas;

    const _players = (() => {
        const _playerArr = [];
        const basePlayers = (() => {
            const _base = { player1: { id: "player1", token: "x" }, player2: { id: "player2", token: "0" } };
            const getPlayer = (id) => {
                return { ..._base[id] };
            };
            const getAllPlayersId = () => {
                return Object.values(_base).map(({ id }) => {
                    return id;
                });
            };
            return { getPlayer, getAllPlayersId };
        })();

        const reset = () => {
            _playerArr.splice(0);
        };

        const getAllPlayers = () => {
            return _playerArr.map((player) => {
                return { ...player };
            });
        };

        const _getPlayerByProperty = (propertyGetterName, value) => {
            return getAllPlayers().find((player) => {
                return player[propertyGetterName]() == value;
            });
        };

        const getPlayerById = (id) => {
            return _getPlayerByProperty("getId", id);
        };

        const getPlayerByToken = (token) => {
            return _getPlayerByProperty("getToken", token);
        };

        const _createPlayer = (playerId, name) => {
            const _id = playerId;
            const _name = name;
            const _token = basePlayers.getPlayer(_id).token;
            const _avatarImageURL = undefined; //aqui se debe pedir el recurso a externalResources

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

            const dropToken = () => {}; //conectar con _board.setCell

            return { getName, getId, getToken, getAvatarImageURL, dropToken };
        };

        const setPlayer = (playerId, name) => {
            const player = _createPlayer(playerId, name);
            const idList = getAllPlayers().map((item) => {
                return item.getId();
            });
            if (idList.includes(player.getId()) || idList.length > 1) return;
            _playerArr.push(player);
        };

        return { basePlayers, reset, getAllPlayers, getPlayerById, getPlayerByToken, setPlayer };
    })();

    const _difficultyLevel = (() => {
        let _level;

        const validLevel = (() => {
            const _list = ["normal", "hard"];
            const getList = () => {
                return [..._list];
            };
            return { getList };
        })();

        const reset = () => {
            setLevel(null);
        };

        const setLevel = (level) => {
            _level = level;
        };

        const getLevel = () => {
            return _level;
        };

        return { validLevel, reset, setLevel, getLevel };
    })();

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
        start,
        setGameType,
        setDifficultyLevel,
    };
})();

// este modulo sera el encargado de traer datos externos como las src de las imágenes de los avatares
const externalResource = (() => {})();
