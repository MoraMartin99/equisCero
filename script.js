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

        return {
            reset,
            getCurrentRound,
            setTotalRounds,
            getTotalRounds,
            next,
            validRounds,
        };
    })();

    const _players = (() => {
        const _playerArr = [];
        const basePlayers = (() => {
            const _base = {
                player1: { id: "player1", token: "x" },
                player2: { id: "player2", token: "0" },
            };
            const getPlayer = (id) => {
                return { ..._base[id] };
            };
            const getAllPlayersId = () => {
                return Object.values(_base).map(({ id }) => {
                    return id;
                });
            };
            const getAllPlayersToken = () => {
                return Object.values(_base).map(({ token }) => {
                    return token;
                });
            };
            return { getPlayer, getAllPlayersId, getAllPlayersToken };
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

        return {
            basePlayers,
            reset,
            getAllPlayers,
            getPlayerById,
            getPlayerByToken,
            setPlayer,
            isValidName,
        };
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
            const hasRequiredLength = keys.length === requiredRecordList.length && keys.length === _rounds.getTotalRounds();
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
                result["player1TotalWins"] = _countPropertyValue({
                    winnerId: "player1",
                });
                result["player2TotalWins"] = _countPropertyValue({
                    winnerId: "player2",
                });
                result["totalDraws"] = _countPropertyValue({
                    resultType: "draw",
                });
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

        return {
            setRecord,
            reset,
            getRecord,
            getTotal,
            validResultType,
            getAllRecords,
        };
    })();

    const _board = (() => {
        /* mejorar este modulo, deberia haber un metodo que permita testear si una jugada es valida o invalida, tambien valorar si es posible incluir el id en cada cells. tiene mas sentido que getSCore sea getStatus  */
        const _cells = {};

        const validCells = (() => {
            const _rowList = [1, 2, 3];
            const _columnList = ["a", "b", "c"];
            const getRowList = () => {
                return [..._rowList];
            };
            const getColumnList = () => {
                return [..._columnList];
            };
            return { getRowList, getColumnList };
        })();

        const getCell = (cellId) => {
            if (!_cells[cellId]) return {};
            return { ..._cells[cellId] };
        };

        const _isEmpty = (cellId) => {
            return Object.is(getCell(cellId).value, null);
        };

        const _isValidToken = (token) => {
            return _players.basePlayers.getAllPlayersToken().includes(token);
        };

        const setCell = (cellId, token) => {
            const cell = _cells[cellId];
            if (!cell || !_isValidToken(token)) return;
            if (_isEmpty(cellId)) {
                cell.value = token;
            }
        };

        const reset = () => {
            const columnList = validCells.getColumnList();
            const rowList = validCells.getRowList();
            columnList.forEach((columnId) => {
                rowList.forEach((rowId) => {
                    const key = `${columnId}${rowId}`;
                    const value = { value: null, column: columnId, row: rowId };
                    _cells[key] = value;
                });
            });
        };

        const _getGroupByProperty = (property) => {
            const group = {};
            const _cellsEntries = Object.entries(_cells);

            for (const [key, value] of _cellsEntries) {
                if (Object.hasOwn(value, property)) {
                    const recordId = `${property}${value[property]}`;
                    const recordValue = { [key]: { ...value } };

                    if (!group[recordId]) {
                        group[recordId] = { ...recordValue };
                    } else {
                        group[recordId] = {
                            ...group[recordId],
                            ...recordValue,
                        };
                    }
                }
            }

            return group;
        };

        const getAllRows = () => {
            return _getGroupByProperty("row");
        };

        const getAllColumns = () => {
            return _getGroupByProperty("column");
        };

        const _getGroupByCellIds = (cellIdList = []) => {
            const group = {};
            if (utilities.isIterable(cellIdList)) {
                for (const cellId of cellIdList) {
                    const value = getCell(cellId);
                    if (Object.keys(value).length) {
                        group[cellId] = { ...value };
                    }
                }
            }
            return group;
        };

        const getAllDiagonals = () => {
            const group = {};
            group["diagonal1"] = _getGroupByCellIds(["a1", "b2", "c3"]);
            group["diagonal2"] = _getGroupByCellIds(["a3", "b2", "c1"]);
            return { ...group };
        };

        const getScore = () => {
            const _currentTurn = _turns.getCurrentTurn();
            const _currentRound = _rounds.getCurrentRound();
            const score = {
                /* deberia llamarse isDone */
                done: false,
                turn: _currentTurn,
                round: _currentRound,
                resultType: null,
                winnerId: null,
                move: {},
            };
            const _isEachCellFilled = Object.keys(_cells).every((key) => {
                return !_isEmpty(key);
            });
            const _groupGettersList = [getAllRows, getAllColumns, getAllDiagonals];
            const _getWinner = (cellGroup = {}) => {
                const winner = {};
                const _moveList = Object.values(cellGroup);
                const _isWinnerMove = (move) => {
                    const cellList = Object.values(move);
                    return cellList.every((cell, index) => {
                        const referenceToken = index === 0 ? cellList[index + 1].value : cellList[index - 1].value;
                        const currentToken = cell.value;
                        return referenceToken === currentToken && currentToken != null;
                    });
                };
                const _getWinnerId = (move) => {
                    const _token = Object.values(move)[0].value;
                    return _players.getPlayerByToken(_token).getId();
                };
                for (const currentMove of _moveList) {
                    if (_isWinnerMove(currentMove)) {
                        winner["move"] = { ...currentMove };
                        winner["winnerId"] = _getWinnerId(winner["move"]);
                        break;
                    }
                }
                return winner;
            };

            if (_currentTurn > 4) {
                if (_isEachCellFilled) {
                    score.done = true;
                    score.resultType = "draw";
                }
                for (const groupGetter of _groupGettersList) {
                    const winner = _getWinner(groupGetter());
                    if (Object.keys(winner).length) {
                        score.done = true;
                        score.resultType = "win";
                        score.winnerId = winner.winnerId;
                        score.move = { ...winner.move };
                        break;
                    }
                }
            }

            return { ...score };
        };

        const print = () => {
            const getCellASCIIValue = (cellId) => {
                const value = getCell(cellId).value;
                return value != null ? value : " ";
            };
            const asciiBoard = `   a     b     c
      |     |     
1  ${getCellASCIIValue("a1")}  |  ${getCellASCIIValue("b1")}  |  ${getCellASCIIValue("c1")}  
 _____|_____|_____
      |     |     
2  ${getCellASCIIValue("a2")}  |  ${getCellASCIIValue("b2")}  |  ${getCellASCIIValue("c2")}  
 _____|_____|_____
      |     |     
3  ${getCellASCIIValue("a3")}  |  ${getCellASCIIValue("b3")}  |  ${getCellASCIIValue("c3")}  
      |     |  `;
            console.log(asciiBoard);
        };

        return {
            validCells,
            getCell,
            setCell,
            reset,
            getAllRows,
            getAllColumns,
            getAllDiagonals,
            getScore,
            print,
        };
    })();
})();

// este modulo sera el encargado de traer datos externos como las src de las imágenes de los avatares
const externalResource = (() => {
    //debo crear una funcion que obtenga los avatars a demanda, de esta manera podre usar en pageLoad y tambien si el usuraio decide regresar a home
})();

// este modulo sera el encargado de manejar utilidades generales
const utilities = (() => {
    const isFunction = (value) => typeof value === "function";

    const isElement = (element) => element instanceof Element || element instanceof HTMLDocument;

    const isIterable = (obj) => {
        if (obj == null) return false;
        return isFunction(obj[Symbol.iterator]);
    };

    const isObjectLiteral = (value) => {
        if (typeof value === "object" && value !== null) return Object.getPrototypeOf(value) === Object.prototype;
        return false;
    };

    const basicDeepCopy = (value) => {
        const isValidIterable = (value) => isIterable(value) && typeof value !== "string";
        const unpack = (value) => {
            const unpackObjectLiteral = (object) => ({ ...object });
            const unpackIterable = (iterable) => [...Array.from(iterable)];
            if (isObjectLiteral(value)) return unpackObjectLiteral(value);
            if (isValidIterable(value)) return unpackIterable(value);
            return value;
        };
        value = unpack(value);
        if (isValidIterable(value)) {
            return value.map((item) => {
                if (isObjectLiteral(value) || isValidIterable(value)) return basicDeepCopy(item);
                return item;
            });
        }
        if (isObjectLiteral(value)) {
            Object.keys(value).forEach((key) => {
                if (isObjectLiteral(value[key]) || isValidIterable(value[key])) value[key] = basicDeepCopy(value[key]);
            });
        }
        return value;
    };

    const isDescendantOf = (element, ancestorElement) => {
        const areElements = [element, ancestorElement].every((currentElement) => utilities.isElement(currentElement));
        if (areElements) return ancestorElement.contains(element);
        return false;
    };

    const isInPage = (element) => isDescendantOf(element, document.body);

    return {
        isIterable,
        isObjectLiteral,
        isFunction,
        basicDeepCopy,
        isElement,
        isDescendantOf,
        isInPage,
    };
})();

const pubSub = (() => {
    const _subscribers = {};

    const _validator = (() => {
        const _validEvents = [];
        const isValidEvent = (event) => {
            return _validEvents.includes(event);
        };
        const isValidHandler = (handler) => {
            return typeof handler === "function";
        };
        return { isValidEvent, isValidHandler };
    })();

    const subscribe = (event, handler) => {
        if (!_validator.isValidEvent(event) || !_validator.isValidHandler(handler)) return;
        if (_subscribers[event]) {
            _subscribers[event].push(handler);
        } else {
            _subscribers[event] = [handler];
        }
    };

    const unsubscribe = (event, handler) => {
        if (!utilities.isIterable(_subscribers[event])) return;
        _subscribers[event] = Array.from(_subscribers[event]).filter((item) => {
            return item !== handler;
        });
    };

    const publish = (event, data) => {
        if (!utilities.isIterable(_subscribers[event])) return;
        const handlerList = Array.from(_subscribers[event]);
        handlerList.forEach((handler) => {
            handler(data);
        });
    };

    const getAllSubscribers = () => {
        const entries = Object.entries(_subscribers).map(([key, value]) => {
            value = value.map((handler) => {
                return handler.name;
            });
            return [key, value];
        });
        return Object.fromEntries(entries);
    };

    return { subscribe, unsubscribe, publish, getAllSubscribers };
})();

const display = (() => {
    const _elements = (() => {
        const library = (() => {
            const _library = {};
            //elementId:{elementId, HTMLId, HTMLTag, classObject, attributes, events, styles, stateIDList, setElement(data)}
            const getElement = (elementId) => {
                if (isObjectLiteral(_library[elementId])) return utilities.basicDeepCopy(_library[elementId]);
                return {};
            };
            const getAllElements = () => {
                return utilities.basicDeepCopy(_library);
            };
            return { getElement, getAllElements };
        })();

        const _setClass = (element, settings = {}) => {
            if (!utilities.isObjectLiteral(settings)) return;
            const forEachClass = (element, classList, callback) => {
                if (utilities.isIterable(classList)) {
                    for (const currentClass of classList) {
                        if (typeof currentClass === "string") callback(element, currentClass);
                    }
                }
            };
            const { addList, removeList } = settings;
            forEachClass(element, addList, (element, currentClass) => element.classList.add(currentClass));
            forEachClass(element, removeList, (element, currentClass) => element.classList.remove(currentClass));
        };

        const _setAttribute = (element, settings = {}) => {
            if (!utilities.isObjectLiteral(settings)) return;
            Object.entries(settings).forEach(([name, value]) => {
                if (typeof value === "string") element.setAttribute(name, value);
            });
        };

        const _setContent = (element, settings = {}) => {
            if (!utilities.isObjectLiteral(settings)) return;
            const { textContent, innerHTML } = settings;
            if (typeof textContent === "string") {
                element.textContent = textContent;
            } else if (typeof innerHTML === "string") {
                element.innerHTML = innerHTML;
            }
        };

        const _setEvents = (element, settings = {}) => {
            if (!utilities.isObjectLiteral(settings)) return;
            const forEachEvent = (element, eventList, callback) => {
                if (utilities.isIterable(eventList)) {
                    for (const eventObject of eventList) {
                        const { event, handler } = utilities.isObjectLiteral(eventObject) ? eventObject : {};
                        if (!typeof event === "string" || !utilities.isFunction(handler)) return;
                        callback(element, event, handler);
                    }
                }
            };
            const { addEventList, removeEventList } = settings;
            forEachEvent(element, addEventList, (element, event, handler) => element.addEventListener(event, handler));
            forEachEvent(element, removeEventList, (element, event, handler) => {
                element.removeEventListener(event, handler);
            });
        };

        const _setStyle = (element, settings = {}) => {
            if (!utilities.isObjectLiteral(settings)) return;
            Object.entries(settings).forEach(([property, value]) => {
                if (typeof value === "string") element.style[property] = value;
            });
        };

        const updateElement = (element, settings = {}) => {
            if (!utilities.isElement(element || !utilities.isObjectLiteral(settings))) return;
            const { HTMLId, classObject, attributes, content, events, styles } = settings;
            if (typeof HTMLId === "string") element.id = HTMLId;
            _setEvents(element, events);
            _setClass(element, classObject);
            _setAttribute(element, attributes);
            _setContent(element, content);
            _setStyle(element, styles);
        };

        const _createElement = (settings = {}) => {
            if (!utilities.isObjectLiteral(settings)) return;
            const { HTMLTag } = settings;
            const element = document.createElement(`${HTMLTag}`);
            updateElement(element, settings);
            return element;
        };

        const _appendElement = (element, parentElement, order = {}) => {
            const isValid = (element, parentElement, order) => {
                const tests = [utilities.isElement(element), utilities.isInPage(parentElement), utilities.isObjectLiteral(order)];
                return tests.every((test) => test);
            };
            if (!isValid(element, parentElement, order)) return;
            const { type, before } = order;
            const appendBefore = (element, parentElement, referenceElement) => {
                parentElement.insertBefore(element, referenceElement);
            };
            const appendLast = (element, parentElement) => appendBefore(element, parentElement, null);
            const appendFirst = (element, parentElement) => {
                appendBefore(element, parentElement, parentElement.firstChild);
            };
            if (type === undefined || type === "lastChild") {
                appendLast(element, parentElement);
                return;
            }
            if (type === "firstChild") {
                appendFirst(element, parentElement);
                return;
            }
            if (utilities.isDescendantOf(before, parentElement)) appendBefore(element, parentElement, before);
        };

        const loadElement = (settings = {}) => {
            //pendiente conectar con state
            if (!utilities.isObjectLiteral(settings)) return;
            const { elementId, appendSettings = {}, data = {}, state = {} } = settings;
            const { parentElement, order } = utilities.isObjectLiteral(appendSettings) ? appendSettings : {};
            const elementObject = library.getElement(elementId);
            if (Object.hasOwn(elementObject, "setElement")) elementObject.setElement(data);
            const element = _createElement(elementObject);
            _appendElement(element, parentElement, order);
        };

        const removeElements = (elementList) => {
            if (!utilities.isIterable(elementList)) return;
            for (const element of elementList) if (utilities.isInPage(element)) element.remove();
        };

        return { library, updateElement, loadElement, removeElements };
    })();
    const _states = (() => {
        const library = (() => {
            const _library = {
                currentPlayer: {
                    stateId: "currentPlayer",
                    //debo revisar las transition en el caso de que se transisionen muchas propiedades
                },
                slideCenterToLeft: {
                    stateId: "slideCenterToLeft",
                    classList: ["inactiveLeftScreen", "slideCenterToLeft"],
                    type: "animation",
                    animationName: "slideCenterToLeft",
                },
                slideRightToCenter: {
                    stateId: "slideRightToCenter",
                    classList: ["activeScreen", "slideRightToCenter"],
                    type: "animation",
                    animationName: "slideRightToCenter",
                },
                slideLeftToCenter: {
                    stateId: "slideLeftToCenter",
                    classList: ["activeScreen", "slideLeftToCenter"],
                    type: "animation",
                    animationName: "slideLeftToCenter",
                },
                slideCenterToRight: {
                    stateId: "slideCenterToRight",
                    classList: ["inactiveRightScreen", "slideCenterToRight"],
                    type: "animation",
                    animationName: "slideCenterToRight",
                },
            };
            //stateId = {stateId,classList,type:(state, transition, animation),transitionPropertyName :(opcional de transition),animationName: (opcional de animation)}
            const getState = (stateId) => {
                if (!utilities.isObjectLiteral(_library[stateId])) return {};
                return utilities.basicDeepCopy(_library[stateId]);
            };
            const getAllStates = () => {
                return utilities.basicDeepCopy(_library);
            };

            return { getState, getAllStates };
        })();

        const _ObserveState = (target = {}) => {
            if (!utilities.isObjectLiteral(target)) return;
            const { element, state, hasToNotify, resolve, reject } = target;
            const { type } = state;
            const stateHandler = ({ element, hasToNotify, resolve, state }) => {
                const { classList } = state;
                const callback = ([{ target }], observer) => {
                    const hasAllClasses = (target, classList) => {
                        return classList.every((currentClass) => target.classList.contains(currentClass));
                    };
                    if (hasAllClasses(target, classList)) {
                        if (hasToNotify)
                            _notifications.sendEvent("stateChange", {
                                element,
                                state,
                            });
                        observer.disconnect();
                        resolve({ element, state });
                    }
                };
                const observer = new MutationObserver(callback);
                observer.observe(element, { attributeFilter: ["class"] });
            };
            const animationTransitionHandler = ({ state, resolve, element, hasToNotify }) => {
                const { type, transitionPropertyName, animationName } = state;
                const eventStartName = `${type}Start`;
                const eventEndName = `${type}End`;
                const stateProperty = (() => {
                    if (type === "transition") return transitionPropertyName;
                    if (type === "animation") return animationName;
                })();
                const getEventProperty = (e) => {
                    if (type === "transition") return e.propertyName;
                    if (type === "animation") return e.animationName;
                };
                const getSettings = (eventName, eventHandler, eventListName) => {
                    return {
                        events: {
                            [eventListName]: [{ event: eventName, handler: eventHandler }],
                        },
                    };
                };
                const createHandler = (eventName, eventHandler) => {
                    return (e) => {
                        if (getEventProperty(e) === stateProperty && typeof stateProperty === "string") {
                            if (hasToNotify)
                                _notifications.sendEvent(eventName, {
                                    element,
                                    state,
                                });
                            _elements.updateElement(element, getSettings(eventName, eventHandler, "removeEventList"));
                            if (eventName === eventEndName) resolve({ element, state });
                        }
                    };
                };
                const eventStartHandler = (e) => createHandler(eventStartName, eventStartHandler)(e);
                const eventEndHandler = (e) => createHandler(eventEndName, eventEndHandler)(e);
                const eventListenersArguments = {
                    start: {
                        eventName: eventStartName,
                        eventHandler: eventStartHandler,
                    },
                    end: {
                        eventName: eventEndName,
                        eventHandler: eventEndHandler,
                    },
                };
                for (const { eventName, eventHandler } in eventListenersArguments) {
                    _elements.updateElement(element, getSettings(eventName, eventHandler, "addEventList"));
                }
            };

            if (type === "state") {
                stateHandler({ element, hasToNotify, resolve, state });
            } else if (type === "transition" || type === "animation") {
                animationTransitionHandler({
                    state,
                    resolve,
                    element,
                    hasToNotify,
                });
            } else {
                reject({ element, state });
            }
        };

        const setState = (element, stateId, hasToNotify = false) => {
            const statePromise = new Promise((resolve, reject) => {
                const state = library.getState(stateId);
                const isValidCase = (element, state) => {
                    return utilities.isElement(element) && Boolean(Object.keys(state).length);
                };
                if (isValidCase(element, state)) {
                    _ObserveState({
                        element,
                        state,
                        hasToNotify,
                        resolve,
                        reject,
                    });
                    _elements.updateElement(element, {
                        classObject: { addList: state.classList },
                    });
                } else {
                    reject({ element, state });
                }
            });
            statePromise.catch((message) => console.log({ ...message, rejected: true }));
            return statePromise;
        };

        async function concatenateState(stateArgumentsList = []) {
            if (!utilities.isIterable(stateArgumentsList)) return;
            const isValidArgument = (argumentObject) => {
                if (utilities.isObjectLiteral(argumentObject)) {
                    return ["element", "stateId"].every((key) => Object.hasOwn(argumentObject, key));
                }
                return false;
            };
            for (const stateArgument of Array.from(stateArgumentsList)) {
                if (!isValidArgument(stateArgument)) continue;
                const { element, stateId, hasToNotify } = stateArgument;
                await setState(element, stateId, hasToNotify);
            }
        }

        const removeState = (element, stateId) => {
            const { classList } = library.getState(stateId);
            _elements.updateElement(element, {
                classObject: { removeList: classList },
            });
        };

        return { library, setState, concatenateState, removeState };
    })();
    const _carrousel = (() => {
        const _getScreenList = () => Array.from(document.querySelectorAll("#carrousel .screen"));

        const _getScreenByIndex = (index, screenList) => {
            if (!Number.isInteger(index)) return;
            const _getRelativeIndex = (index, screenList) => {
                const length = screenList.length;
                const lastIndex = length - 1;
                while (index > lastIndex) index - length;
                while (index < 0) index + length;
                return index;
            };
            return screenList[_getRelativeIndex(index, screenList)];
        };

        const _getScreenIndex = (screen, screenList) => {
            const index = screenList.findIndex((currentScreen) => currentScreen === screen);
            if (index === -1) return;
            return index;
        };

        const _getCurrentScreen = (screenList) => {
            return screenList.find((screen) => screen.classList.contains("activeScreen"));
        };

        const _getSiblingScreen = (currentScreen, screenList, indexOffset) => {
            const currentScreenIndex = _getScreenIndex(currentScreen, screenList);
            const targetScreenIndex = Number.isInteger(currentScreenIndex) ? currentScreenIndex + indexOffset : undefined;
            return _getScreenByIndex(targetScreenIndex, screenList);
        };

        const _getNextScreen = (currentScreen, screenList) => _getSiblingScreen(currentScreen, screenList, 1);

        const _getPreviousScreen = (currentScreen, screenList) => _getSiblingScreen(currentScreen, screenList, -1);

        const _getSlideSettings = (settings = {}) => {
            if (!utilities.isObjectLiteral(settings)) return;
            const { targetGetter, targetScreenNextStateId, currentScreenNextStateId } = settings;
            const screenList = _getScreenList();
            const currentScreen = _getCurrentScreen(screenList);
            const targetScreen = utilities.isFunction(targetGetter) ? targetGetter(currentScreen, screenList) : undefined;
            const currentStateIdList = ["slideCenterToLeft", "slideRightToCenter", "slideLeftToCenter", "slideCenterToRight"];
            return {
                currentScreen: {
                    screen: currentScreen,
                    currentStateIdList,
                    nextStateId: currentScreenNextStateId,
                },
                targetScreen: {
                    screen: targetScreen,
                    currentStateIdList,
                    nextStateId: targetScreenNextStateId,
                },
            };
        };

        const _notify = (slidePromise, currentScreen, targetScreen) => {
            const areValidScreenObject = (screenObjectList) => {
                return screenObjectList.every((screenObject) => {
                    if (!utilities.isObjectLiteral(screenObject)) return false;
                    return ["screen", "state"].every((property) => Object.hasOwn(screenObject, property));
                });
            };
            if (!areValidScreenObject([currentScreen, targetScreen])) return;
            slidePromise = Promise.resolve(slidePromise);
            const getData = (promiseResultList, currentScreen, targetScreen) => {
                const data = {
                    currentScreen: { screen: currentScreen.screen },
                    targetScreen: { screen: targetScreen.screen },
                };
                for (const { element, state } of promiseResultList) {
                    for (const screenObject in data) if (screenObject.screen === element) screenObject.state = state;
                }
                return data;
            };
            slidePromise.then((value) => {
                _notifications.sendEvent("slideScreen", getData(value, currentScreen, targetScreen));
            });
            slidePromise.catch((reason) => {
                console.log({
                    ...getData(reason, currentScreen, targetScreen),
                    rejected: true,
                    event: "slideScreen",
                });
            });
        };

        const _slideScreens = (settings = {}) => {
            if (!utilities.isObjectLiteral(settings)) return;
            const { currentScreen, targetScreen } = settings;
            const slideScreen = (screenObject = {}) => {
                if (!utilities.isObjectLiteral(screenObject)) return;
                const { screen, currentStateIdList, nextStateId } = screenObject;
                for (const stateId of currentStateIdList) _states.removeState(screen, stateId);
                return _states.setState(screen, nextStateId);
            };
            const slidePromise = Promise.all([slideScreen(currentScreen), slideScreen(targetScreen)]);
            _notify(slidePromise, currentScreen, targetScreen);
        };

        const nextScreen = () => {
            const targetGetter = _getNextScreen;
            const currentScreenNextStateId = "slideCenterToLeft";
            const targetScreenNextStateId = "slideRightToCenter";
            const settings = _getSlideSettings({
                targetGetter,
                targetScreenNextStateId,
                currentScreenNextStateId,
            });
            _slideScreens(settings);
        };

        const previousScreen = () => {
            const targetGetter = _getPreviousScreen;
            const currentScreenNextStateId = "slideCenterToRight";
            const targetScreenNextStateId = "slideLeftToCenter";
            const settings = _getSlideSettings({
                targetGetter,
                targetScreenNextStateId,
                currentScreenNextStateId,
            });
            _slideScreens(settings);
        };

        const goTo = (index) => {
            if (!Number.isInteger(index)) return;
            const targetScreen = _getScreenByIndex(index, _getScreenList());
            const currentScreenNextStateId = "slideCenterToLeft";
            const targetScreenNextStateId = "slideRightToCenter";
            const settings = _getSlideSettings({
                targetScreenNextStateId,
                currentScreenNextStateId,
            });
            settings.targetScreen.screen = targetScreen;
            _slideScreens(settings);
        };

        return { nextScreen, previousScreen, goTo };
    })();

    const _notifications = (() => {
        const sendEvent = (event, data) => pubSub.publish(event, data);
        return { sendEvent };
    })();

    const _actions = (() => {})(); // modulo responsable de  interactuar con pubsub
})();

const testToggle = () => {
    const arr = Array.from(document.querySelectorAll(".playerCardContainer"));
    arr.forEach((element) => {
        element.classList.toggle("currentPlayer");
    });
};

const testRadio = (CSSSelector) => {
    const arr = Array.from(document.querySelectorAll(CSSSelector));
    arr.forEach((element) => {
        console.log({ element, value: element.checked });
    });
};
