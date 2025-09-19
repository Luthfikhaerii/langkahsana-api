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
import { UploadService } from './modules/upload/upload.service';
import { UploadModule } from './modules/upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    MulterModule.register({
      storage: diskStorage({
          destination:'./upload',
        })
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    ArticleModule,
    TripModule,
    ParticipantModule,
    UploadModule],
  controllers: [AppController],
  providers: [AppService, UploadService],
})
export class AppModule { }
