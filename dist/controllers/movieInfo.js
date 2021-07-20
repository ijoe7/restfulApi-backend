"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovieCharacters = exports.getMovieComments = exports.postMovieComment = exports.movieData = void 0;
var axios_1 = __importDefault(require("axios"));
var movieData = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, allMovieInfo, specificMovieInfo, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("https://swapi.dev/api/films/")];
            case 1:
                data = _a.sent();
                allMovieInfo = data.data.results;
                specificMovieInfo = allMovieInfo.map(function (info, index) {
                    return {
                        "id": index + 1,
                        "movie_name": info.title,
                        "opening_crawl": info.opening_crawl
                    };
                });
                return [2 /*return*/, res.status(200).json({ message: ' Data retrieved successfully', specificMovieInfo: specificMovieInfo })];
            case 2:
                error_1 = _a.sent();
                console.log(error_1.message);
                return [2 /*return*/, res.status(400).json({ message: 'Error retrieving Data' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.movieData = movieData;
var postMovieComment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("https://swapi.dev/api/films")];
            case 1:
                data = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.postMovieComment = postMovieComment;
var getMovieComments = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("https://swapi.dev/api/films")];
            case 1:
                data = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMovieComments = getMovieComments;
var getMovieCharacters = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var name_1, height, gender_1, id, data, info, characterList, characterLink, sortedData, heightCount, heightInfo, result, i, characterBio, characterData, totalNumberOfCharacters, i, totalNumberOfCharacters, i, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                name_1 = req.query.nameSort;
                height = req.query.heightSort;
                gender_1 = req.query.genderFilter;
                id = req.params.id;
                if (id > 6 || id < 1)
                    return [2 /*return*/, res.status(404).json({ message: ' Number specified is incorrect. Data not Found' })];
                return [4 /*yield*/, axios_1.default.get("https://swapi.dev/api/films/" + id)];
            case 1:
                data = _a.sent();
                info = data.data;
                characterList = [];
                characterLink = '';
                sortedData = void 0;
                heightCount = 0;
                heightInfo = void 0;
                result = void 0;
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < info.characters.length)) return [3 /*break*/, 5];
                characterLink = info.characters[i];
                return [4 /*yield*/, axios_1.default.get(characterLink)];
            case 3:
                characterBio = _a.sent();
                characterData = characterBio.data;
                characterList.push(characterData);
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5:
                if (gender_1) {
                    characterList = characterList.filter(function (item) {
                        return item.gender.toLocaleLowerCase() === gender_1.toLocaleLowerCase();
                    });
                }
                if (name_1 || height) {
                    if (name_1 === 'ASC' || name_1 === 'asc') {
                        sortedData = characterList.sort(function (a, b) { return a.name[0].charCodeAt(0) - b.name[0].charCodeAt(0); });
                    }
                    if (name_1 === 'DESC' || name_1 === 'desc') {
                        sortedData = characterList.sort(function (a, b) { return b.name[0].charCodeAt(0) - a.name[0].charCodeAt(0); });
                    }
                    if (height === 'ASC' || height === 'asc') {
                        sortedData = characterList.sort(function (a, b) { return parseInt(a.height) - parseInt(b.height); });
                    }
                    if (height === 'DESC' || height === 'desc') {
                        sortedData = characterList.sort(function (a, b) { return parseInt(b.height) - parseInt(a.height); });
                    }
                    totalNumberOfCharacters = sortedData.length;
                    for (i = 0; i < sortedData.length; i++) {
                        heightCount += parseInt(sortedData[i].height);
                    }
                    heightInfo = heightCount + "cm makes " + Math.round(heightCount / 30.48) + "ft and " + (heightCount / 2.54).toFixed(2) + " inches";
                    result = {
                        totalNumberOfCharacters: totalNumberOfCharacters,
                        totalHeightOfCharacters: heightInfo,
                        characterInfo: sortedData
                    };
                    return [2 /*return*/, res.status(201).json(result)];
                }
                else {
                    totalNumberOfCharacters = characterList.length;
                    for (i = 0; i < characterList.length; i++) {
                        heightCount += parseInt(characterList[i].height);
                    }
                    heightInfo = heightCount + "cm makes " + Math.round(heightCount / 30.48) + "ft and " + (heightCount / 2.54).toFixed(2) + " inches";
                    result = {
                        totalNumberOfCharacters: totalNumberOfCharacters,
                        totalHeightOfCharacters: heightInfo,
                        characterInfo: characterList
                    };
                    return [2 /*return*/, res.status(200).json(result)];
                }
                return [3 /*break*/, 7];
            case 6:
                error_4 = _a.sent();
                console.log(error_4.message);
                return [2 /*return*/, res.status(400).json({ message: 'Error retrieving Data' })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.getMovieCharacters = getMovieCharacters;
// export const movieData = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const data = await axios.get(`https://swapi.dev/api/films`);
//     } catch (error) {
//     }
// }
