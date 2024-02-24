// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserService } from 'src/services/user.service';
import { UserModule } from 'src/model/user.module';
import { UserSchema } from 'src/model/user.model';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UserService,AuthService, LocalStrategy,UserModule],
  exports: [AuthService],
})
export class AuthModule {}
