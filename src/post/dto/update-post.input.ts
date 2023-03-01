import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePostInput } from './create-post.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @IsString()
  @IsNotEmpty({ message: "Este campo não pode estar vazio!" })
  content: string
}
