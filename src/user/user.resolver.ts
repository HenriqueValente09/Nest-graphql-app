import { Args, Mutation, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { Post } from 'src/post/entities/post.entity';
import { PostService } from 'src/post/post.service';

@Resolver(of => User)
export class UserResolver {
    constructor(
        private userService: UserService,
        private postService: PostService
    ) { }


    @Query(() => [User])
    async users(): Promise<User[]> {
        const users = await this.userService.findAllUsers();
        return users;
    }

    @Query(() => User)
    async findByEmail(@Args('email') email: string): Promise<User> {
        const user = await this.userService.findUserByEmail(email);
        return user;
    }

    @Query(() => User)
    async findUser(
        @Args('id') id: string
    ): Promise<User> {
        const user = await this.userService.findUserById(id);
        return user;
    }

    @ResolveField(() => Post)
    async posts(@Parent() user: User) {
        const { id } = user;
        return this.postService.findAllPosts({userId: id});
    }

    @Mutation(() => User)
    async createUser(
        @Args('data') data: CreateUserInput
    ): Promise<User> {
        const user = await this.userService.createUser(data);
        return user;
    }

    @Mutation(() => User)
    async updateUser(
        @Args('id') id: string,
        @Args('data') data: UpdateUserInput
    ): Promise<User> {
        const user = await this.userService.updateUser(id, data);
        return user;
    }

    @Mutation(() => Boolean)
    async deleteUser(
        @Args('id') id: string
    ): Promise<boolean> {
        const deleted = await this.userService.deleteUser(id)
        return deleted;
    }
}
