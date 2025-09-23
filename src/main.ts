import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { SuccessInterceptor } from './interceptor/success/success.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:"http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials:true
  })
  app.use(cookieParser());
  app.setGlobalPrefix('api')
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true
  }))
  app.useGlobalInterceptors(new SuccessInterceptor())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
