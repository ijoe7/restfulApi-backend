import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Comment } from "./Comment";

@Entity("movies")
export class Movie extends BaseEntity {
    @PrimaryGeneratedColumn()
        id!: number

    @Column({
        type: "varchar"
    })
    movie_title!: string;

    @Column({
        type: "varchar"
    })
    opening_crawl!: string;

    @Column({
        type: "integer",
        default: 0
    })
    comment_count!: number;

    @OneToMany(
        () => Comment,
        comment => comment.movies
    )
    comments!: Comment[];


}