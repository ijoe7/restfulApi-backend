"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var movieInfo_1 = require("../controllers/movieInfo");
var router = express_1.default.Router();
router.get("/", movieInfo_1.movieData);
router.get("/characters/:id", movieInfo_1.getMovieCharacters);
router.post("/postComment/:movieId", movieInfo_1.postMovieComment);
router.get("/getComments", movieInfo_1.getMovieComments);
exports.default = router;
