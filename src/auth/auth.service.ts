import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthInput } from './dto/auth.input';
import { UserService } from 'src/user/user.service';
import { compareSync } from 'bcrypt';
import { AuthType } from './dto/auth.type';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }
    async validateUser(data: AuthInput): Promise<AuthType>{
        const user = await this.userService.findUserByEmail(data.email);

        const validPassword = compareSync(data.password, user.password)

        if (!validPassword) {
            throw new UnauthorizedException("Senha inválida!");

        }

        return {
            user,
            token: 'token'
        }
    }
}
