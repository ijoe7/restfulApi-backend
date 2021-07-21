import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { Comment } from "../entities/Comment";
import { Movie } from "../entities/Movie";
import { createQueryBuilder } from "typeorm";
import { count } from 'console';

interface Character {
    characterInfo: Record<string,any>[],
    totalNumberOfCharacters: number,
    totalHeightOfCharacters: string,
}

export const movieData = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const databaseData = await createQueryBuilder(
            'movies'
        )
            .select('movies')
            .from(Movie, 'movies')
            .leftJoinAndSelect(
                'movies.comments', 'comments'
        )
            .getMany()
        

        if (!databaseData.length) {
            
            const data = await axios.get(`https://swapi.dev/api/films/`);
            const allMovieInfo = data.data.results
            
            const specificMovieInfo = allMovieInfo.map(async (info: Record<string, any>) => {
                    const movie = Movie.create({
                        movie_title: info.title,
                        opening_crawl: info.opening_crawl
                    })
                const movieData = await movie.save()
                
            })
            const result = await Promise.all(specificMovieInfo);
            const savedData = await Movie.find()
            return res.status(201).json({message: 'Data saved successfully', savedData})
        }
        
        
        return res.status(200).json({ message: ' Data retrieved successfully', databaseData});
    } catch (error) {
        console.log(error.message);
        
        return res.status(400).json({message: 'Error retrieving Data'})
    }
}


export const postMovieComment = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { movieId } = req.params;

        const { movieComment } = req.body;

        const movies = await Movie.findOne(parseInt(movieId));

        if (!movies) {
            return res.json({
                message: "Movie not found"
            })
        }

        const comment = Comment.create({
            movieComment,
            movies
        });

        await comment.save()

        
        if (comment) {
            movies.comment_count += 1
        }
        await movies.save()

        return res.json({ message: "Comment added"})

    } catch (error) {
        console.log(error.message);     
        return res.status(400).json({ message: 'Error posting Data' });
    }
}


export const getMovieComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commentData = await createQueryBuilder(
            'comments'
        )
            .select('comments')
            .from(Comment, 'comments')
            .getMany()
        
        return res.status(200).json({ message: ' Data retrieved successfully', commentData});

    } catch (error) {
        console.log(error.message);     
        return res.status(400).json({ message: 'Error getting Data' });
    }
}


export const getMovieCharacters = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const name = req.query.nameSort as string;
        const height = req.query.heightSort as string;
        const gender = req.query.genderFilter as string;

        

        const { id }: any = req.params;

        if (id > 6 || id < 1) return res.status(404).json({ message: ' Number specified is incorrect. Data not Found'});
        
        const data = await axios.get(`https://swapi.dev/api/films/${id}`);
        const info = data.data;
        
        let characterList = [];
        let characterLink: string = '';
        let sortedData: any;
        let heightCount = 0;
        let heightInfo: string;
        let result: Character;

        for (let i = 0; i < info.characters.length; i++){
            characterLink = info.characters[i]
            
            let characterBio = await axios.get(characterLink)
            let characterData = characterBio.data
            
            characterList.push(characterData)
        }
        if (gender) {
            characterList = characterList.filter((item: Record<string, any>) => {
                return item.gender.toLocaleLowerCase() === gender.toLocaleLowerCase()
            })
        }


        if (name || height) {

            if (name === 'ASC' || name === 'asc') {
                sortedData = characterList.sort((a: any, b: any) => a.name[0].charCodeAt(0) - b.name[0].charCodeAt(0))
            }
            if (name === 'DESC' || name === 'desc') {
                sortedData = characterList.sort((a: any, b: any) => b.name[0].charCodeAt(0) - a.name[0].charCodeAt(0))
            }
    
            if (height === 'ASC' || height === 'asc') {
                sortedData = characterList.sort((a: any, b: any) => parseInt(a.height) - parseInt(b.height))
            }
            if (height === 'DESC' || height === 'desc') {
                sortedData = characterList.sort((a: any, b: any) => parseInt(b.height) - parseInt(a.height))
            }
            
            let totalNumberOfCharacters = sortedData.length
            for (let i = 0; i < sortedData.length; i++) {
                heightCount += parseInt(sortedData[i].height)
            }
            heightInfo = `${heightCount}cm makes ${Math.round(heightCount / 30.48)}ft and ${(heightCount / 2.54).toFixed(2)} inches`

            result = {
                totalNumberOfCharacters: totalNumberOfCharacters,
                totalHeightOfCharacters: heightInfo,
                characterInfo: sortedData
            }

            return res.status(201).json(result);
            
        } else {

            let totalNumberOfCharacters = characterList.length
            for (let i = 0; i < characterList.length; i++) {
                heightCount += parseInt(characterList[i].height)
            }
            heightInfo = `${heightCount}cm makes ${Math.round(heightCount / 30.48)}ft and ${(heightCount / 2.54).toFixed(2)} inches`

            result = {
                totalNumberOfCharacters: totalNumberOfCharacters,
                totalHeightOfCharacters: heightInfo,
                characterInfo: characterList
            }
            return res.status(200).json(result);
        }
        
        


    } catch (error) {
        console.log(error.message);
        
        return res.status(400).json({message: 'Error retrieving Data'})
    }
}

