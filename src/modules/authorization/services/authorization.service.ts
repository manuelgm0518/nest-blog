import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  IUsersService,
  UsersService,
} from 'src/modules/users/services/users.service';
import { UserSignUpDto } from '../models/user-signup.dto';
import { UserLogInDto } from '../models/user-login.dto';
import { JwtPayload, Payload } from '../types/jwt-payload.type';
import { UserCreateDto } from 'src/modules/users/models/user-create.dto';

export interface IAuthorizationService {
  logIn(dto: UserLogInDto): Promise<JwtPayload>;
  signUp(dto: UserSignUpDto): Promise<JwtPayload>;
}

@Injectable()
export class AuthorizationService implements IAuthorizationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async logIn(dto: UserLogInDto): Promise<JwtPayload> {
    const user = await this.usersService.getByEmail(dto.email);
    const passwordHash = dto.password; // encriptar

    if (user?.passwordHash !== passwordHash) throw new UnauthorizedException();

    const payload: Payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      token: await this.jwtService.signAsync(payload),
      payload,
    };
  }

  async signUp(dto: UserSignUpDto): Promise<JwtPayload> {
    const checkEmail = await this.usersService.getByEmail(dto.email);
    if (checkEmail)
      throw new Error(`An user with the email ${dto.email} already exists.`);

    if (dto.password !== dto.confirmPassword)
      throw new ForbiddenException(
        `The password and confirmPassword fields don't match`,
      );

    const newUser = await this.usersService.create(<UserCreateDto>{
      name: dto.name,
      email: dto.email,
      passwordHash: dto.password,
    });
    const payload = await this.logIn(<UserLogInDto>{
      email: dto.email,
      password: dto.password,
    });
    return payload;
  }

  //   async signUp(dto: UserSignUpDto) {
  //     const user = await this.usersService.getByEmail(dto.email);

  //     if (user && user.password !== pass) {
  //       throw new UnauthorizedException();
  //     }

  //     const payload = { username: user.username, sub: user.userId };
  //     return {
  //       access_token: await this.jwtService.signAsync(payload),
  //     };
  //   }
}
