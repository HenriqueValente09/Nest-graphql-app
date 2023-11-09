import { Field, HideField, ID, ObjectType } from "@nestjs/graphql";
import { hashPasswordTransform } from "src/common/crypto";
import { Post } from "../post/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

console.log(Post)

@ObjectType()
@Entity()
export class User{

    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: string;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column({
        transformer: hashPasswordTransform
    })
    @HideField()
    password:string;

    @Field({
        nullable: "items"
    })
    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];
}