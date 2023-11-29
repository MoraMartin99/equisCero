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

        const validRounds = (() => {
            const _totalRoundlist = [1, 3, 5];

            const getTotalRoundlist = () => {
                return [..._totalRoundlist];
            };

            const getRoundList = () => {
                const list = [];
                const _totalRounds = getTotalRounds();
                if (_totalRounds) {
                    for (let round = 1; round <= _totalRounds; round++) {
                        list.push(round);
                    }
                }
                return list;
            };

            return { getTotalRoundlist, getRoundList };
        })();

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

        return { reset, getCurrentRound, setTotalRounds, getTotalRounds, next, validRounds };
    })();
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

        const isValidName = (name) => {
            const regex = /^\S{1,10}$/;
            return regex.test(name);
        };

        return { basePlayers, reset, getAllPlayers, getPlayerById, getPlayerByToken, setPlayer, isValidName };
    })();

    const _difficultyLevel = (() => {
        let _level;

        const validLevel = (() => {
            const _list = ["noLevel", "normal", "hard"];
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

    const _state = (() => {
        let _currentState;

        const validState = (() => {
            const _stateList = ["setting", "playing", "pause", "waiting"];
            const getList = () => {
                return [..._stateList];
            };
            return { getList };
        })();

        const _isValidState = (state) => {
            return validState.getList().includes(state);
        };

        const setState = (state) => {
            if (!_isValidState(state)) return;
            _currentState = state;
        };

        const reset = () => {
            _currentState = null;
        };

        const getState = () => {
            return _currentState;
        };

        return { validState, setState, reset, getState };
    })();

    const _session = (() => {
        const _settings = {};
        const _preferredState = "setting";

        const _isPreferredStateActive = () => {
            return _state.getState() == _preferredState;
        };

        const _setSettingRecord = (settingId, values, handler) => {
            if (_settings[settingId]) return;
            _settings[settingId] = { values, handler };
        };

        const deleteSettingRecord = (settingId) => {
            if (!_settings[settingId]) return;
            delete _settings[settingId];
        };

        const reset = () => {
            const keys = Object.keys(_settings);
            keys.forEach((key) => {
                deleteSettingRecord(key);
            });
        };

        const setType = (type) => {
            const settingId = "type";
            const values = [{ type }];
            const handler = _type.setType;
            const isValid = (value) => {
                return _type.validTypes.getList().includes(value);
            };
            if (!_isPreferredStateActive() || !isValid(type)) return;
            _setSettingRecord(settingId, values, handler);
        };

        const setTotalRounds = (totalRounds) => {
            const settingId = "totalRounds";
            const values = [{ totalRounds }];
            const handler = _rounds.setTotalRounds;
            const isValid = (value) => {
                return _rounds.validRounds.getTotalRoundlist().includes(value);
            };
            if (!_isPreferredStateActive() || !isValid(totalRounds)) return;
            _setSettingRecord(settingId, values, handler);
        };

        const setDifficultyLevel = (level) => {
            const settingId = "difficultyLevel";
            const values = [{ level }];
            const handler = _difficultyLevel.setLevel;
            const isValid = (value) => {
                return _difficultyLevel.validLevel.getList().includes(value);
            };
            if (!_isPreferredStateActive() || !isValid(level)) return;
            _setSettingRecord(settingId, values, handler);
        };

        const setPlayerName = (playerId, name) => {
            const settingId = playerId;
            const values = [{ id: playerId }, { name }];
            const handler = _players.setPlayer;
            const isValid = (playerId, name) => {
                const isValidId = (id) => {
                    return _players.basePlayers.getAllPlayersId().includes(id);
                };
                const isValidName = (name) => {
                    return _players.isValidName(name);
                };
                return isValidId(playerId) && isValidName(name);
            };
            if (!_isPreferredStateActive() || !isValid(playerId, name)) return;
            _setSettingRecord(settingId, values, handler);
        };

        const getProperty = (settingId, property) => {
            let value;
            if (_settings[settingId]) {
                const targetElement = _settings[settingId].values.find((element) => {
                    return Object.hasOwn(element, property);
                });
                if (targetElement) {
                    value = targetElement[property];
                }
            }
            return value;
        };

        const isSet = () => {
            const requiredSettingIdList = ["type", "totalRounds", "difficultyLevel", "player1", "player2"];
            return requiredSettingIdList.every((settingId) => {
                return Object.hasOwn(_settings, settingId);
            });
        };

        const loadSession = () => {
            if (!isSet()) return;
            const settingsValueList = Object.values(_settings);
            for (const { values, handler } of settingsValueList) {
                const argumentList = values.map((value) => {
                    const key = Object.keys(value)[0];
                    return value[key];
                });
                handler(...argumentList);
            }
        };

        return {
            deleteSettingRecord,
            reset,
            setType,
            setTotalRounds,
            setDifficultyLevel,
            setPlayerName,
            getProperty,
            isSet,
            loadSession,
        };
    })();

    const _turns = (() => {
        const _queue = [];

        const _getPlayerById = (id) => {
            return _players.getPlayerById(id);
        };

        const reset = () => {
            _queue.splice(0);
            _queue.push(_getPlayerById("player1"));
        };

        const getCurrentTurn = () => {
            return _queue.length;
        };

        const getCurrentPlayer = () => {
            return _queue[_queue.length - 1];
        };

        const next = () => {
            if (_queue.length) {
                const nextPlayer =
                    getCurrentPlayer().getId() == "player1" ? _getPlayerById("player2") : _getPlayerById("player1");
                _queue.push(nextPlayer);
            }
        };

        return { reset, getCurrentTurn, getCurrentPlayer, next };
    })();

    const _results = (() => {
        const _records = {};

        const validResultType = (() => {
            const resultList = ["win", "draw"];
            const getList = () => {
                return [...resultList];
            };
            return { getList };
        })();

        const _isValid = (validList, value) => {
            return validList.includes(value);
        };

        const _isValidRound = (round) => {
            const validList = _rounds.validRounds.getRoundList();
            return _isValid(validList, round);
        };

        const _isValidResultType = (resultType) => {
            const validList = validResultType.getList();
            return _isValid(validList, resultType);
        };

        const _isValidWinnerId = (winnerId) => {
            const validList = [..._players.basePlayers.getAllPlayersId(), null];
            return _isValid(validList, winnerId);
        };

        const setRecord = (round, resultType, winnerId) => {
            const recordId = `round${round}`;
            const areValid = (round, resultType, winnerId) => {
                return _isValidRound(round) && _isValidResultType(resultType) && _isValidWinnerId(winnerId);
            };
            winnerId = resultType === "draw" ? null : winnerId;
            if (_records[recordId] || !areValid(round, resultType, winnerId)) return;
            _records[recordId] = { round, resultType, winnerId };
        };
        const reset = () => {
            const keys = Object.keys(_records);
            keys.forEach((key) => {
                delete _records[key];
            });
        };

        const getRecord = (round) => {
            return { ..._records[`round${round}`] };
        };

        const getAllRecords = () => {
            const result = {};
            const _recordEntries = Object.entries(_records);
            _recordEntries.forEach(([key, value]) => {
                result[key] = { ...value };
            });
            return result;
        };

        const _hasAllRecords = () => {
            const keys = Object.keys(_records);
            const requiredRecordList = _rounds.validRounds.getRoundList().map((round) => {
                return `round${round}`;
            });
            const hasRequiredLength =
                keys.length === requiredRecordList.length && keys.length === _rounds.getTotalRounds();
            const containsAllItems = keys.every((key) => {
                return requiredRecordList.includes(key);
            });
            return hasRequiredLength && containsAllItems;
        };

        const _countPropertyValue = (filterObj = {}) => {
            const recordsValuesList = Object.values(_records);
            const hasMatchedAllFilters = (obj) => {
                const filterList = Object.entries(filterObj).map(([key, value]) => {
                    if (value !== undefined) {
                        return [key, value];
                    }
                });
                return filterList.every(([filterKey, filterValue]) => {
                    return obj[filterKey] === filterValue;
                });
            };
            const count = recordsValuesList.reduce((accumulator, currentRecord) => {
                if (hasMatchedAllFilters(currentRecord)) {
                    accumulator++;
                }
                return accumulator;
            }, 0);
            return count;
        };

        const getTotal = () => {
            const result = {};
            if (_hasAllRecords()) {
                result["player1TotalWins"] = _countPropertyValue({ winnerId: "player1" });
                result["player2TotalWins"] = _countPropertyValue({ winnerId: "player2" });
                result["totalDraws"] = _countPropertyValue({ resultType: "draw" });
                result["resultType"] = "win";
                if (result["player1TotalWins"] > result["player2TotalWins"]) {
                    result["winnerId"] = "player1";
                } else if (result["player1TotalWins"] < result["player2TotalWins"]) {
                    result["winnerId"] = "player2";
                } else {
                    result["resultType"] = "draw";
                    result["winnerId"] = null;
                }
            }
            return result;
        };

        return { setRecord, reset, getRecord, getTotal, validResultType, getAllRecords };
    })();

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
