import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthType } from './dto/auth.type';
import { AuthInput } from './dto/auth.input';

@Resolver('Auth')
export class AuthResolver {
    constructor(private authService: AuthService) { }


    @Mutation(() => AuthType)
    public async login(
        @Args('data') data: AuthInput
    ): Promise<AuthType> {
        const response = await this.authService.validateUser(data);
        return {
            user: response.user,
            token: response.token
        }
    }
}
