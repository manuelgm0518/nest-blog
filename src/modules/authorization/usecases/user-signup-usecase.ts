import { UserSignUpDto } from '../models/user-signup.dto';
import { IAuthorizationService } from '../services/authorization.service';
import { JwtPayload } from '../types/jwt-payload.type';

export interface IUserSignUpUseCase {
  call(dto: UserSignUpDto): Promise<JwtPayload>;
}

export class UserSignUpUseCase implements IUserSignUpUseCase {
  constructor(private readonly authorizationService: IAuthorizationService) {}

  async call(dto: UserSignUpDto): Promise<JwtPayload> {
    return this.authorizationService.signUp(dto);
  }
}
