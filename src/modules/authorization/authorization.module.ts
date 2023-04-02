import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthorizationService } from './services/authorization.service';
import { AuthorizationController } from './controllers/authorization/authorization.controller';
import { JWT_SECRETS } from 'src/core/secrets/jwt_secrets';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRETS.SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthorizationService],
  controllers: [AuthorizationController],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}
