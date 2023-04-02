import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  IUserLogInUseCase,
  UserLogInUseCase,
} from '../../usecases/user-login-usecase';
import {
  IUserSignUpUseCase,
  UserSignUpUseCase,
} from '../../usecases/user-signup-usecase';
import { UserLogInDto } from '../../models/user-login.dto';
import { JwtPayload } from '../../types/jwt-payload.type';
import { AuthGuard } from '../../guard/authentication.guard';
import { AuthorizationService } from '../../services/authorization.service';
import { UserSignUpDto } from '../../models/user-signup.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('authorization')
export class AuthorizationController {
  private readonly userLogInUseCase: IUserLogInUseCase;
  private readonly userSignUpUseCase: IUserSignUpUseCase;

  constructor(private readonly authorizationService: AuthorizationService) {
    this.userLogInUseCase = new UserLogInUseCase(authorizationService);
    this.userSignUpUseCase = new UserSignUpUseCase(authorizationService);
  }

  @Post('login')
  async logIn(@Body() dto: UserLogInDto): Promise<JwtPayload> {
    try {
      const res = await this.userLogInUseCase.call(dto);
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('signup')
  async signUp(@Body() dto: UserSignUpDto): Promise<JwtPayload> {
    try {
      const res = await this.userSignUpUseCase.call(dto);
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('user-profile')
  async userProfile(): Promise<any> {
    return {
      message: 'Authorized',
    };
  }
}
