import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ) { }

  async create(data: CreatePostInput): Promise<Post> {
    const post = this.postRepository.create(data)
    const postSaved = await this.postRepository.save(post)

    if (!postSaved) {
      throw new InternalServerErrorException('Problema para criar um post')
    }

    return postSaved;
  }

  async update(id: string, data: UpdatePostInput): Promise<Post> {
    const post = await this.findPostById(id)
    const toSave = this.postRepository.merge(post, data)

    const postUpdated = await this.postRepository.save(toSave)

    if (!postUpdated) {
      throw new InternalServerErrorException('Problema para criar um post')
    }

    return postUpdated;
  }

  async delete(id: string): Promise<boolean> {
    const post = await this.findPostById(id)
    const deleted = await this.postRepository.delete(post)

    if (deleted) {
      return true;
    }

    return false;
  }

  async findAllPosts(): Promise<Post[]> {
    const posts = await this.postRepository.find()
    return posts;
  }

  async findPostById(id: string): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id: id })

    if (!post) {
      throw new NotFoundException("Post não encontrado!");

    }
    return post;
  }
}
