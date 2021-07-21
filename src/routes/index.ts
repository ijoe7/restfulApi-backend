import express, { Request, Response, NextFunction } from "express";
import {movieData, getMovieCharacters, postMovieComment, getMovieComments} from "../controllers/movieInfo"

var router = express.Router();

router.get("/getMovieData", movieData);
router.get("/characters/:id", getMovieCharacters);
router.post("/postComment/:movieId", postMovieComment);
router.get("/getComments", getMovieComments);


export default router;
