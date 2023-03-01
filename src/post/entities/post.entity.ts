import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Post {

  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn([{name: 'user_id', referencedColumnName: 'id'}])
  user: User;

  @Field()
  @Column()
  content: string;

  @Column({name: 'user_id'})
  userId: string;
}
