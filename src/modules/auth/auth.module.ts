import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  providers: [AuthService],
  imports:[
    JwtModule.register({
      secret:process.env.JWT_SECRET,
      signOptions:{expiresIn:'3h'}
    })
  ],
  exports:[AuthService]
})
export class AuthModule {}
