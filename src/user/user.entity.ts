import { Field, HideField, ID, ObjectType } from "@nestjs/graphql";
import { hashPasswordTransform } from "src/common/crypto";
import { Post } from "../post/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];
}