import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Post } from 'src/post/entities/post.entity';
import { PostService } from 'src/post/post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Post]),
  ],
  providers: [UserService, UserResolver, PostService]
})
export class UserModule {}
