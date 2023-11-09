import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { User } from 'src/user/user.entity';

@Resolver((of) => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) { }

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'post' })
  findAll() {
    return this.postService.findAllPosts({ options: null });
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.postService.findPostById(id);
  }

  @ResolveField()
  user(@Parent() post: Post): Promise<User> {
    return this.postService.findUser(post.userId);
  }


  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput.content, updatePostInput);
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => Int }) id: string) {
    return this.postService.delete(id);
  }
}
