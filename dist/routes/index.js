"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var movieInfo_1 = require("../controllers/movieInfo");
var router = express_1.default.Router();
/* GET home page. */
// router.get("/", function (req: Request, res: Response, next: NextFunction) {
//   res.render("index", { title: "Express" });
// });
router.get("/", movieInfo_1.movieData);
router.get("/characters/:id", movieInfo_1.getMovieCharacters);
exports.default = router;
