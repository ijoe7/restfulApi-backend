import express, { Request, Response, NextFunction } from "express";
import {movieData, getMovieCharacters} from "../controllers/movieInfo"

var router = express.Router();

/* GET home page. */
// router.get("/", function (req: Request, res: Response, next: NextFunction) {
//   res.render("index", { title: "Express" });
// });

router.get("/", movieData);
router.get("/characters/:id", getMovieCharacters);


export default router;
