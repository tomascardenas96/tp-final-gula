import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import * as bodyParser from 'body-parser';
//Para poder utilizar las variables de entorno.
import { config } from 'dotenv';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //Para modificar el limite permitido de carga de archivos por parte del usuario.
  app.use(bodyParser.json({ limit: '10000mb' }));
  app.use(bodyParser.urlencoded({ limit: '10000mb', extended: true }));
  await app.listen(3070);
}
bootstrap();
