import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
//import * as session from 'express-session';
//import * as passport from 'passport';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.use(
  //   session({
  //     secret: process.env.SESSION_SECRET_KEY,
  //     resave: false, //in prod remember to use REDIS or any other database to save data because this session handler will definitely cause memory leaks
  //     saveUninitialized: false,
  //     cookie: { maxAge: process.env.SESSION_COOKIE_EXP }, //any logged in user will get a cookie which represent a store to where there data is saving(express session management)
  //   }),
  // );

  // //use of sessions with passport requires these additional initializer
  // app.use(passport.initialize());
  // app.use(passport.session());

  const port = process.env.PORT;
  await app.listen(port);

  logger.log(`Tekana-E-Wallet application listening on port ${port}`);
}
bootstrap();
