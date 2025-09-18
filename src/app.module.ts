import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ArticleModule } from './modules/article/article.module';
import { TripModule } from './modules/trip/trip.module';
import { ParticipantModule } from './modules/participant/participant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env'
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    ArticleModule,
    TripModule,
    ParticipantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
