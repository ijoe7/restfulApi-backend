import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Movie } from "./Movie";

@Entity("comments")
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
        id!: number
    
    @ManyToOne(
        () => Movie,
        movie => movie.comments,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn({
        name: "movie_id"
    })
    movies!: Movie;

    @Column({
        type: "varchar",
        length: 500
    }) 
    movieComment!: string;

    @CreateDateColumn()
    created_at!: Date;
}