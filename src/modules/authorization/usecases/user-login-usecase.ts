import { UserLogInDto } from '../models/user-login.dto';
import { IAuthorizationService } from '../services/authorization.service';
import { JwtPayload } from '../types/jwt-payload.type';

export interface IUserLogInUseCase {
  call(dto: UserLogInDto): Promise<JwtPayload>;
}

export class UserLogInUseCase implements IUserLogInUseCase {
  constructor(private readonly authorizationService: IAuthorizationService) {}

  call(dto: UserLogInDto): Promise<JwtPayload> {
    return this.authorizationService.logIn(dto);
  }
}
