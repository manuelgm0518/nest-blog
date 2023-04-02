import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example_password@localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthorizationModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
